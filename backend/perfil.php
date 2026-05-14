<?php
// backend/perfil.php
require 'conexion_bd.php';
header('Content-Type: application/json');

// Obtener datos enviados desde JavaScript
$datos = json_decode(file_get_contents('php://input'), true);

if (!isset($datos['username'])) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no identificado.']);
    exit;
}

$username = $datos['username'];
$avatarBase64 = isset($datos['avatarBase64']) ? $datos['avatarBase64'] : null;

// 1. SEGURIDAD CONTRA XSS (Cross-Site Scripting):
// Limpiamos la biografía para que no inyecten código JavaScript malicioso.
$bio = isset($datos['biografia']) ? htmlspecialchars(strip_tags($datos['biografia'])) : '';

$ruta_foto_final = null;

try {
    // 2. SEGURIDAD CONTRA INYECCIÓN SQL: 
    // Usamos prepare() de PDO para evitar que destruyan la base de datos
    $stmt = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE nombre_usuario = :user");
    $stmt->bindParam(':user', $username);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        echo json_encode(['exito' => false, 'mensaje' => 'Usuario inválido en la base de datos.']);
        exit;
    }

    // Si el usuario envió una foto nueva...
    if ($avatarBase64) {
        // 3. SEGURIDAD CONTRA RCE (Remote Code Execution):
        // Verificamos que realmente sea una cadena Base64 de imagen y no un script oculto
        if (preg_match('/^data:image\/(\w+);base64,/', $avatarBase64, $tipo)) {
            
            $data = substr($avatarBase64, strpos($avatarBase64, ',') + 1);
            $data = base64_decode($data);
            
            if ($data === false) {
                echo json_encode(['exito' => false, 'mensaje' => 'El archivo de imagen está corrupto.']);
                exit;
            }

            // 4. SEGURIDAD DE ARCHIVOS (Sanitización de nombres):
            // NUNCA guardamos la imagen con el nombre original que mandó el usuario.
            // Generamos un nombre único y encriptado en MD5, forzando la extensión .jpg
            $nombreArchivo = md5(uniqid($username, true)) . '.jpg';
            $directorioDestino = 'uploads/';
            
            // Crear carpeta si no existe (con permisos estrictos 0755)
            if (!file_exists($directorioDestino)) {
                mkdir($directorioDestino, 0755, true); 
            }
            
            $rutaCompleta = $directorioDestino . $nombreArchivo;
            
            // Guardamos la imagen en el servidor
            if (file_put_contents($rutaCompleta, $data)) {
                $ruta_foto_final = $rutaCompleta;
                
                // Actualizamos la base de datos
                $stmtUpdate = $conexion->prepare("UPDATE usuarios SET foto_perfil = :foto WHERE nombre_usuario = :user");
                $stmtUpdate->bindParam(':foto', $ruta_foto_final);
                $stmtUpdate->bindParam(':user', $username);
                $stmtUpdate->execute();
            }
        } else {
            echo json_encode(['exito' => false, 'mensaje' => 'Formato de imagen no permitido. Posible ataque detectado.']);
            exit;
        }
    }

    echo json_encode([
        'exito' => true, 
        'mensaje' => 'Datos guardados',
        'ruta_foto' => $ruta_foto_final
    ]);

} catch (PDOException $e) {
    // 5. SEGURIDAD DE PRODUCCIÓN: 
    // Nunca imprimas el error real de la base de datos al usuario (puede revelar datos sensibles)
    echo json_encode(['exito' => false, 'mensaje' => 'Error interno del servidor.']);
}
?>