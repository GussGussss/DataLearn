<?php
session_start();
require_once 'conexion_bd.php';
header('Content-Type: application/json; charset=utf-8');

$datos_recibidos = json_decode(file_get_contents("php://input"), true);
$accion = isset($_GET['accion']) ? $_GET['accion'] : '';

switch ($accion) {
    case 'registro':
        registrarUsuario($conexion, $datos_recibidos);
        break;
    case 'login':
        iniciarSesion($conexion, $datos_recibidos);
        break;
    case 'reset':
        restablecerPassword($conexion, $datos_recibidos);
        break;
    case 'google_login': 
        loginGoogle($conexion, $datos_recibidos);
        break;
    case 'obtener_alumnos':
        obtenerAlumnos($conexion);
        break;
    default:
        echo json_encode(["exito" => false, "mensaje" => "Acción no válida."]);
        break;
}

function registrarUsuario($conexion, $datos) {
    $usuario = trim($datos['username']);
    $contrasena = $datos['password'];

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{8,}$/', $contrasena)) {
        echo json_encode(["exito" => false, "mensaje" => "La contraseña no cumple con los requisitos mínimos de seguridad."]);
        return;
    }
    try {
        $consulta_existe = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
        $consulta_existe->execute([$usuario]);
        
        if ($consulta_existe->rowCount() > 0) {
            echo json_encode(["exito" => false, "mensaje" => "Este nombre de usuario ya está ocupado."]);
            return;
        }

        $contrasena_encriptada = password_hash($contrasena, PASSWORD_DEFAULT);
        $consulta_insertar = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, contrasena_hash) VALUES (?, ?)");
        $consulta_insertar->execute([$usuario, $contrasena_encriptada]);

        $id_nuevo_usuario = $conexion->lastInsertId();
        $_SESSION['id_usuario'] = $id_nuevo_usuario;
        $_SESSION['nombre_usuario'] = $usuario;
        $_SESSION['rol'] = 'alumno';

        echo json_encode([
            "exito" => true, 
            "mensaje" => "¡Cuenta creada!",
            "usuario" => ["username" => $usuario, "rol" => "alumno"]
        ]);

    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos."]);
    }
}

function iniciarSesion($conexion, $datos) {
    $usuario = trim($datos['username']);
    $contrasena_ingresada = $datos['password'];

    try {
        // Añadimos 'rol' a la consulta
        $consulta = $conexion->prepare("SELECT id_usuario, nombre_usuario, contrasena_hash, rol FROM usuarios WHERE nombre_usuario = ?");
        $consulta->execute([$usuario]);
        
        $usuario_db = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario_db && password_verify($contrasena_ingresada, $usuario_db['contrasena_hash'])) {
            $_SESSION['id_usuario'] = $usuario_db['id_usuario'];
            $_SESSION['nombre_usuario'] = $usuario_db['nombre_usuario'];
            $_SESSION['rol'] = $usuario_db['rol']; // Guardamos el rol en sesión

            echo json_encode([
                "exito" => true, 
                "mensaje" => "¡Bienvenido de vuelta!",
                "usuario" => [
                    "username" => $usuario_db['nombre_usuario'],
                    "rol" => $usuario_db['rol'] // Enviamos el rol al frontend
                ]
            ]);
        } else {
            echo json_encode(["exito" => false, "mensaje" => "Usuario o contraseña incorrectos."]);
        }
    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos."]);
    }
}

function loginGoogle($conexion, $datos) {
    $token = $datos['credential'];
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $token;
    $respuesta = @file_get_contents($url);
    if ($respuesta === false) {
        echo json_encode(["exito" => false, "mensaje" => "Token inválido."]);
        return;
    }
    $payload = json_decode($respuesta, true);
    $correo = $payload['email'];
    $google_id = $payload['sub'];
    $nombre_google = $payload['name'];
    
    try {
        // Agregamos 'rol' a la consulta
        $consulta = $conexion->prepare("SELECT id_usuario, nombre_usuario, rol FROM usuarios WHERE correo = ? OR google_id = ?");
        $consulta->execute([$correo, $google_id]);
        $usuario_db = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario_db) {
            $_SESSION['id_usuario'] = $usuario_db['id_usuario'];
            $_SESSION['nombre_usuario'] = $usuario_db['nombre_usuario'];
            $_SESSION['rol'] = $usuario_db['rol'];
            
            echo json_encode([
                "exito" => true, 
                "usuario" => ["username" => $usuario_db['nombre_usuario'], "rol" => $usuario_db['rol']]
            ]);
        } else {
            $username_base = strtolower(str_replace(' ', '', $nombre_google));
            $username_final = $username_base;
            $check_user = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
            $check_user->execute([$username_final]);
            if ($check_user->rowCount() > 0) { $username_final = $username_base . rand(1000, 9999); }

            $insertar = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, correo, auth_provider, google_id, rol) VALUES (?, ?, 'google', ?, 'alumno')");
            $insertar->execute([$username_final, $correo, $google_id]);
            
            $id_nuevo = $conexion->lastInsertId();
            $_SESSION['id_usuario'] = $id_nuevo;
            $_SESSION['nombre_usuario'] = $username_final;
            $_SESSION['rol'] = 'alumno';
            
            echo json_encode([
                "exito" => true, 
                "usuario" => ["username" => $username_final, "rol" => "alumno"]
            ]);
        }
    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error en login con Google."]);
    }
}

function obtenerAlumnos($conexion) {
    // Seguridad: Solo si es profesor o admin
    if (!isset($_SESSION['id_usuario']) || $_SESSION['rol'] !== 'profesor') {
        echo json_encode(["exito" => false, "mensaje" => "Acceso denegado."]);
        return;
    }
    try {
        $consulta = $conexion->query("SELECT id_usuario, nombre_usuario, auth_provider, fecha_registro FROM usuarios WHERE rol = 'alumno' ORDER BY fecha_registro DESC");
        $alumnos = $consulta->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["exito" => true, "alumnos" => $alumnos]);
    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error al obtener lista."]);
    }
}

function restablecerPassword($conexion, $datos) {
    $usuario = trim($datos['username']);
    $nueva_contrasena = $datos['password'];

    // Validar contraseña fuerte en backend (incluye guion bajo)
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{8,}$/', $nueva_contrasena)) {
        echo json_encode(["exito" => false, "mensaje" => "La contraseña no cumple con los requisitos."]);
        return;
    }

    try {
        $consulta_existe = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
        $consulta_existe->execute([$usuario]);
        
        if ($consulta_existe->rowCount() === 0) {
            echo json_encode(["exito" => false, "mensaje" => "El usuario no existe."]);
            return;
        }

        $contrasena_encriptada = password_hash($nueva_contrasena, PASSWORD_DEFAULT);
        $consulta_update = $conexion->prepare("UPDATE usuarios SET contrasena_hash = ? WHERE nombre_usuario = ?");
        $consulta_update->execute([$contrasena_encriptada, $usuario]);

        echo json_encode(["exito" => true, "mensaje" => "Contraseña actualizada exitosamente."]);

    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos."]);
    }
}
?>