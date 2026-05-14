<?php
// backend/eliminar_cuenta.php
require 'conexion_bd.php';
header('Content-Type: application/json');

$datos = json_decode(file_get_contents('php://input'), true);

if (!isset($datos['username'])) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no proporcionado.']);
    exit;
}

$username = $datos['username'];

try {
    // 1. Primero obtenemos la ruta de la foto de perfil para borrarla del servidor físico
    $stmtFoto = $conexion->prepare("SELECT foto_perfil FROM usuarios WHERE nombre_usuario = :user");
    $stmtFoto->bindParam(':user', $username);
    $stmtFoto->execute();
    $usuarioInfo = $stmtFoto->fetch(PDO::FETCH_ASSOC);

    // Si tiene foto y el archivo existe, lo borramos con unlink() para no dejar basura en el servidor
    if ($usuarioInfo && !empty($usuarioInfo['foto_perfil'])) {
        if (file_exists($usuarioInfo['foto_perfil'])) {
            unlink($usuarioInfo['foto_perfil']);
        }
    }

    // 2. Eliminamos al usuario de la base de datos (DELETE)
    $stmt = $conexion->prepare("DELETE FROM usuarios WHERE nombre_usuario = :user");
    $stmt->bindParam(':user', $username);
    
    if ($stmt->execute()) {
        echo json_encode(['exito' => true, 'mensaje' => 'Cuenta y archivos eliminados correctamente.']);
    } else {
        echo json_encode(['exito' => false, 'mensaje' => 'No se pudo eliminar la cuenta.']);
    }

} catch (PDOException $e) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error de base de datos.']);
}
?>