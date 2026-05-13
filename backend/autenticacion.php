<?php
// 1. SIEMPRE iniciamos la sesión en la primera línea de código ejecutable
session_start();

// 2. Requerimos la conexión
require_once 'conexion_bd.php';

// 3. Cabecera JSON
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
    case 'reset': // <--- NUEVO CASO AGREGADO
        restablecerPassword($conexion, $datos_recibidos);
        break;
    case 'google_login': 
        loginGoogle($conexion, $datos_recibidos);
        break;
    default:
        echo json_encode(["exito" => false, "mensaje" => "Acción no válida."]);
        break;
}

// =====================================================================
// FUNCIONES DE LÓGICA
// =====================================================================

function registrarUsuario($conexion, $datos) {
    $usuario = trim($datos['username']);
    $contrasena = $datos['password'];

    // UX + Seguridad: Validación estricta con Regex en el servidor
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{8,}$/', $contrasena)) {
        echo json_encode(["exito" => false, "mensaje" => "La contraseña no cumple con los requisitos mínimos de seguridad."]);
        return;
    }
    try {
        $consulta_existe = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
        $consulta_existe->execute([$usuario]);
        
        if ($consulta_existe->rowCount() > 0) {
            echo json_encode(["exito" => false, "mensaje" => "Este nombre de usuario ya está ocupado. ¡Intenta con otro!"]);
            return;
        }

        $contrasena_encriptada = password_hash($contrasena, PASSWORD_DEFAULT);

        $consulta_insertar = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, contrasena_hash) VALUES (?, ?)");
        $consulta_insertar->execute([$usuario, $contrasena_encriptada]);

        // AUTO-LOGIN: Obtenemos el ID recién creado
        $id_nuevo_usuario = $conexion->lastInsertId();

        // Guardamos los datos en la sesión
        $_SESSION['id_usuario'] = $id_nuevo_usuario;
        $_SESSION['nombre_usuario'] = $usuario;

        echo json_encode([
            "exito" => true, 
            "mensaje" => "¡Cuenta creada! Iniciando sesión...",
            "usuario" => ["username" => $usuario]
        ]);

    } catch(PDOException $e) {
        // Si hay un error SQL (ej. tabla no existe), PHP lo atrapa aquí
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos. Verifica que las tablas existan."]);
    }
}

function iniciarSesion($conexion, $datos) {
    $usuario = trim($datos['username']);
    $contrasena_ingresada = $datos['password'];

    try {
        $consulta = $conexion->prepare("SELECT id_usuario, nombre_usuario, contrasena_hash FROM usuarios WHERE nombre_usuario = ?");
        $consulta->execute([$usuario]);
        
        $usuario_db = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario_db && password_verify($contrasena_ingresada, $usuario_db['contrasena_hash'])) {
            
            $_SESSION['id_usuario'] = $usuario_db['id_usuario'];
            $_SESSION['nombre_usuario'] = $usuario_db['nombre_usuario'];

            echo json_encode([
                "exito" => true, 
                "mensaje" => "¡Bienvenido de vuelta!",
                "usuario" => ["username" => $usuario_db['nombre_usuario']]
            ]);

        } else {
            echo json_encode(["exito" => false, "mensaje" => "Usuario o contraseña incorrectos."]);
        }

    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos al iniciar sesión."]);
    }
}

function restablecerPassword($conexion, $datos) {
    $usuario = trim($datos['username']);
    $nueva_contrasena = $datos['password'];

    // Validación estricta con Regex en el servidor (Seguridad Backend)
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{8,}$/', $nueva_contrasena)) {
        echo json_encode(["exito" => false, "mensaje" => "La nueva contraseña no cumple con los requisitos mínimos de seguridad."]);
        return;
    }

    try {
        // 1. Verificamos si existe el usuario en la BD
        $consulta = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
        $consulta->execute([$usuario]);
        
        if ($consulta->rowCount() === 0) {
            // UX: Mensaje amigable (Reconocer errores - Heurística #9)
            echo json_encode(["exito" => false, "mensaje" => "No encontramos ninguna cuenta con ese usuario. Verifica cómo lo escribiste."]);
            return;
        }

        // 2. Si existe, encriptamos la nueva contraseña
        $contrasena_encriptada = password_hash($nueva_contrasena, PASSWORD_DEFAULT);

        // 3. Actualizamos (UPDATE) la contraseña en MySQL
        $actualizar = $conexion->prepare("UPDATE usuarios SET contrasena_hash = ? WHERE nombre_usuario = ?");
        $actualizar->execute([$contrasena_encriptada, $usuario]);

        echo json_encode([
            "exito" => true, 
            "mensaje" => "¡Contraseña actualizada! Volviendo al inicio de sesión..."
        ]);

    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos al actualizar contraseña."]);
    }
}

function loginGoogle($conexion, $datos) {
    $token = $datos['credential']; // Este es el Token JWT que nos mandará tu frontend
    
    // 1. Validar el token directamente con los servidores de Google
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $token;
    $respuesta = @file_get_contents($url);
    
    if ($respuesta === false) {
        echo json_encode(["exito" => false, "mensaje" => "Token de Google inválido o caducado."]);
        return;
    }
    
    $payload = json_decode($respuesta, true);
    
    // Si no trae correo, algo salió mal
    if (!isset($payload['email'])) {
        echo json_encode(["exito" => false, "mensaje" => "No se pudo obtener la información de Google."]);
        return;
    }

    $correo = $payload['email'];
    $google_id = $payload['sub']; // 'sub' es el identificador único en Google
    $nombre_google = $payload['name']; // El nombre que tiene en su cuenta de Google
    
    try {
        // 2. Buscamos si este usuario ya existe en nuestra base de datos
        $consulta = $conexion->prepare("SELECT id_usuario, nombre_usuario FROM usuarios WHERE correo = ? OR google_id = ?");
        $consulta->execute([$correo, $google_id]);
        $usuario_db = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario_db) {
            // SI EXISTE: Le iniciamos sesión normal
            $_SESSION['id_usuario'] = $usuario_db['id_usuario'];
            $_SESSION['nombre_usuario'] = $usuario_db['nombre_usuario'];
            
            echo json_encode([
                "exito" => true, 
                "mensaje" => "¡Bienvenido de vuelta con Google!", 
                "usuario" => ["username" => $usuario_db['nombre_usuario']]
            ]);
        } else {
            // NO EXISTE: Le creamos una cuenta automáticamente (Registro silencioso)
            
            // Creamos un username a partir de su nombre (sin espacios y en minúsculas)
            $username_base = strtolower(str_replace(' ', '', $nombre_google));
            $username_final = $username_base;
            
            // Verificamos que ese username no lo tenga ya otra persona (ej. 'juanperez')
            $check_user = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?");
            $check_user->execute([$username_final]);
            if ($check_user->rowCount() > 0) {
                // Si ya existe, le pegamos un número aleatorio para que sea único
                $username_final = $username_base . rand(1000, 9999);
            }

            // Insertamos en la base de datos (Nota: contrasena_hash queda en NULL)
            $insertar = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, correo, auth_provider, google_id) VALUES (?, ?, 'google', ?)");
            $insertar->execute([$username_final, $correo, $google_id]);
            
            // Lo logueamos inmediatamente
            $id_nuevo = $conexion->lastInsertId();
            $_SESSION['id_usuario'] = $id_nuevo;
            $_SESSION['nombre_usuario'] = $username_final;
            
            echo json_encode([
                "exito" => true, 
                "mensaje" => "Cuenta creada con Google exitosamente.", 
                "usuario" => ["username" => $username_final]
            ]);
        }
    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "Error de base de datos durante el login con Google."]);
    }
}

?>
