<?php
// progreso.php -> guarda y consulta el avance del usuario del curso

// 1. Requerimos la conexión a la base de datos
require_once 'conexion_bd.php';

// 2. Iniciamos la sesión para saber quién está haciendo la petición
session_start();

// 3. Formato de respuesta en JSON
header('Content-Type: application/json; charset=utf-8');

// SEGURIDAD: Si no hay un usuario logueado en la sesión, bloqueamos el acceso.
// UX: Enviamos un mensaje claro para que el Frontend sepa que debe mandarlo al Login.
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado. Inicia sesión primero."]);
    die();
}

// Obtenemos el ID del usuario directamente de la sesión segura del servidor
$id_usuario = $_SESSION['id_usuario'];

// 4. Identificamos qué tipo de petición nos están haciendo (GET para leer, POST para guardar)
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'POST') {
    // guardamos o actualizamos el progreso

    // Leemos los datos que nos mandó el Frontend en formato JSON
    $datos_recibidos = json_decode(file_get_contents("php://input"), true);
    
    // Extraemos las variables (usamos los nombres en inglés que manda tu JS actual)
    $tema = $datos_recibidos['topic'];
    $video_visto = $datos_recibidos['videoWatched'] ? 1 : 0; // Convertimos true/false a 1/0 para MySQL
    $ejercicio_resuelto = $datos_recibidos['exerciseDone'] ? 1 : 0;

    try {
        // PASO A: Verificamos si ya existe un registro de este usuario para este tema específico
        $consulta_existe = $conexion->prepare("SELECT id_progreso FROM progreso WHERE id_usuario = ? AND tema = ?");
        $consulta_existe->execute([$id_usuario, $tema]);
        
        if ($consulta_existe->rowCount() > 0) {
            // Si ya existe, ACTUALIZAMOS (UPDATE) el registro para no tener duplicados
            $actualizar = $conexion->prepare("UPDATE progreso SET video_visto = ?, ejercicio_resuelto = ? WHERE id_usuario = ? AND tema = ?");
            $actualizar->execute([$video_visto, $ejercicio_resuelto, $id_usuario, $tema]);
            
            echo json_encode(["exito" => true, "mensaje" => "Progreso actualizado correctamente."]);
        } else {
            // Si no existe, CREAMOS (INSERT) un nuevo registro
            $insertar = $conexion->prepare("INSERT INTO progreso (id_usuario, tema, video_visto, ejercicio_resuelto) VALUES (?, ?, ?, ?)");
            $insertar->execute([$id_usuario, $tema, $video_visto, $ejercicio_resuelto]);
            
            echo json_encode(["exito" => true, "mensaje" => "Nuevo progreso guardado."]);
        }

    } catch(PDOException $e) {
        // UX: Mensaje de error controlado sin exponer fallos técnicos de la base de datos
        echo json_encode(["exito" => false, "mensaje" => "Hubo un error al guardar tu avance."]);
    }

} elseif ($metodo === 'GET') {
    //consultar el progreso paara que se refleje en el dashboard

    try {
        // Buscamos todos los temas que el usuario ha avanzado
        $consulta = $conexion->prepare("SELECT tema, video_visto, ejercicio_resuelto FROM progreso WHERE id_usuario = ?");
        $consulta->execute([$id_usuario]);
        
        // Obtenemos todos los resultados en un arreglo
        $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
        // Devolvemos la información al Frontend para que llene las barras de progreso
        echo json_encode(["exito" => true, "datos" => $resultados]);

    } catch(PDOException $e) {
        echo json_encode(["exito" => false, "mensaje" => "No pudimos cargar tu historial."]);
    }
} else {
    // Si mandan otro método (PUT, DELETE) que no soportamos
    echo json_encode(["exito" => false, "mensaje" => "Método no soportado."]);
}
?>