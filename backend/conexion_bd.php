<?php
/* conexion_bd.php -> conectar a la bd de mysql en producción */

$servidor = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "data_learn";

try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$base_datos;charset=utf8", $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $error) {
    echo "Fallo en la conexion: " . $error->getMessage();
}
?>