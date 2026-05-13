<?php
// evaluar_ejercicio.php -> Analizador Estático Multilenguaje con Consola Virtual
require_once 'conexion_bd.php';
session_start();
header('Content-Type: application/json; charset=utf-8');

// SEGURIDAD: Bloqueamos si no hay sesión activa
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["exito" => false, "mensaje" => "No autorizado. Inicia sesión."]);
    die();
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'POST') {
    $datos        = json_decode(file_get_contents("php://input"), true);
    $tema         = $datos['tema'] ?? '';
    $ejercicio_id = $datos['ejercicio_id'] ?? '';
    $codigo       = $datos['codigo'] ?? '';
    $lenguaje     = $datos['lenguaje'] ?? 'python';
    
    // Validaciones básicas (Heurística Nielsen #5: Prevención de errores)
    if (empty($ejercicio_id) || empty(trim($codigo))) {
        echo json_encode(["exito" => false, "mensaje" => "El campo de código no puede estar vacío."]);
        exit;
    }

    if (strpos($codigo, 'pass') !== false && $lenguaje === 'python') {
        echo json_encode(["exito" => false, "mensaje" => "Debes reemplazar la palabra 'pass' con tu propia lógica."]);
        exit;
    }

    $errores = [];
    $salida  = "";

    // =====================================================================
    // ANALIZADOR ESTÁTICO — Evaluación Multilenguaje
    // Familia C: Agrupa Java, C, C++, C# bajo reglas estructurales flexibles
    // =====================================================================
    $es_familia_c = in_array($lenguaje, ['java', 'c', 'cpp', 'csharp']);

    switch ($ejercicio_id) {

        // ── MATRICES: NIVEL 1 ───────────────────────────────────────────
        case 'mat_1_1': // Acceso a un elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_elemento\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/return\s+/', $codigo)) $errores[] = "Usa 'return' para devolver el valor.";
                if (!preg_match('/\[.*\]\[.*\]/', $codigo)) $errores[] = "Debes acceder usando dos índices [][].";
            } elseif ($es_familia_c) {
                if (!preg_match('/obtenerElemento\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/return\s+[a-zA-Z0-9_]+\s*\[[^\]]+\]\s*\[[^\]]+\]\s*;/i', $codigo)) $errores[] = "Debes retornar el elemento accediendo a la matriz con [][].";
            }
            break;

        case 'mat_1_2': // Primera fila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+primera_fila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\[0\]/', $codigo)) $errores[] = "Debes acceder al índice [0] de la matriz.";
            } elseif ($es_familia_c) {
                if (!preg_match('/primeraFila\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/return\s+[a-zA-Z0-9_]+\s*\[0\]\s*;/i', $codigo)) $errores[] = "Debes retornar la matriz en su índice [0].";
            }
            break;

        case 'mat_1_3': // Número de filas
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_filas\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa la función len() para contar las filas.";
            } elseif ($es_familia_c) {
                if (!preg_match('/contarFilas\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.length|\.Length|\.size\(\)|sizeof/i', $codigo)) $errores[] = "Usa la propiedad de tamaño nativa de tu lenguaje para contar filas.";
            }
            break;

        // ── MATRICES: NIVEL 2 ───────────────────────────────────────────
        case 'mat_2_1': // Suma de la diagonal
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_diagonal\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/for\s+/', $codigo) && !preg_match('/while\s+/', $codigo)) $errores[] = "Necesitas un bucle (for o while) para iterar.";
                if (!preg_match('/\[(.*?)\]\[\1\]/', $codigo) && !preg_match('/\[i\]\[i\]/', $codigo)) $errores[] = "Accede a la diagonal usando el mismo índice, ej: [i][i].";
            } elseif ($es_familia_c) {
                if (!preg_match('/sumaDiagonal\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/for\s*\(/i', $codigo) && !preg_match('/while\s*\(/i', $codigo)) $errores[] = "Usa un bucle para recorrer la matriz.";
                if (!preg_match('/\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]/i', $codigo)) $errores[] = "Accede a los elementos usando doble corchete [i][i].";
            }
            break;

        case 'mat_2_2': // Suma de todos los elementos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_total\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (substr_count($codigo, 'for ') < 2 && substr_count($codigo, 'while ') < 2) $errores[] = "Necesitas dos bucles anidados para recorrer todas las celdas.";
            } elseif ($es_familia_c) {
                if (!preg_match('/sumaTotal\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (substr_count(strtolower($codigo), 'for') < 2 && substr_count(strtolower($codigo), 'while') < 2) $errores[] = "Necesitas dos bucles anidados.";
                if (!preg_match('/\+\=|\+\s*[a-zA-Z0-9_]+\[/i', $codigo)) $errores[] = "Asegúrate de sumar acumulativamente cada valor.";
            }
            break;

        case 'mat_2_3': // Buscar un valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_en_matriz\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*valor/', $codigo)) $errores[] = "Debes comparar los elementos con el parámetro 'valor'.";
                if (!preg_match('/return\s+True/', $codigo)) $errores[] = "Retorna True si encuentras el valor.";
            } elseif ($es_familia_c) {
                if (!preg_match('/buscarEnMatriz\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*valor/i', $codigo)) $errores[] = "Debes comparar cada celda con el 'valor'.";
                if (!preg_match('/return\s+(true|1)\s*;/i', $codigo)) $errores[] = "Retorna verdadero (true/1) si encuentras el elemento.";
            }
            break;

        // ── MATRICES: NIVEL 3 ───────────────────────────────────────────
        case 'mat_3_1': // Transpuesta
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+transponer\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/append\s*\(/', $codigo)) $errores[] = "Usa .append() para ir llenando la nueva matriz.";
            } elseif ($es_familia_c) {
                if (!preg_match('/transponer\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\[[^\]]+\]\s*\[[^\]]+\]\s*=\s*[a-zA-Z0-9_]+\s*\[[^\]]+\]\s*\[[^\]]+\]/i', $codigo)) $errores[] = "Asigna los valores invertidos, ej: resultado[j][i] = matriz[i][j].";
            }
            break;

        case 'mat_3_2': // Máximo por fila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+maximo_por_fila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/max\s*\(/', $codigo)) $errores[] = "Te recomiendo usar la función max() en cada fila.";
            } elseif ($es_familia_c) {
                if (!preg_match('/maximoPorFila\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/Math\.max|std::max|>\s*[a-zA-Z0-9_]+/i', $codigo)) $errores[] = "Compara los valores para encontrar el mayor.";
            }
            break;

        case 'mat_3_3': // Matriz identidad
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_identidad\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/!=\s*1/', $codigo) && !preg_match('/!=\s*0/', $codigo)) $errores[] = "Debes verificar que la diagonal sea 1 y el resto 0.";
                if (!preg_match('/return\s+False/', $codigo)) $errores[] = "Si alguna celda no cumple, retorna False inmediatamente.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esIdentidad\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/!=\s*1/', $codigo) && !preg_match('/!=\s*0/', $codigo)) $errores[] = "Verifica las condiciones de 1 (diagonal) y 0 (resto).";
                if (!preg_match('/return\s+(false|0)\s*;/i', $codigo)) $errores[] = "Retorna falso (false/0) si encuentras una irregularidad.";
            }
            break;

        // ── PILAS: NIVEL 1 ──────────────────────────────────────────────
        case 'pil_1_1': // Apilar y ver el tope
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+ver_tope\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() para apilar.";
                if (!preg_match('/\[-1\]/', $codigo)) $errores[] = "Retorna el tope con [-1].";
            } elseif ($es_familia_c) {
                if (!preg_match('/verTope\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.push\s*\(|\.Push\s*\(|push_back/i', $codigo)) $errores[] = "Usa el método de empuje de tu estructura (push/push_back).";
                if (!preg_match('/\.peek\s*\(\)|\.top\s*\(\)|\.Peek\s*\(\)|\[.*\]/i', $codigo)) $errores[] = "Retorna el elemento superior (peek/top).";
            }
            break;

        case 'pil_1_2': // Pila vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo) && !preg_match('/not\s+pila/', $codigo)) $errores[] = "Verifica si el tamaño es 0.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esVacia\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.isEmpty\s*\(\)|\.empty\s*\(\)|\.Count|size/i', $codigo)) $errores[] = "Verifica si la estructura está vacía.";
            }
            break;

        case 'pil_1_3': // Tamaño de la pila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tamanio_pila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len() para el tamaño.";
            } elseif ($es_familia_c) {
                if (!preg_match('/tamanioPila\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.size\s*\(\)|\.Count/i', $codigo)) $errores[] = "Usa el método de tamaño correspondiente.";
            }
            break;

        // ── PILAS: NIVEL 2 ──────────────────────────────────────────────
        case 'pil_2_1': // Paréntesis balanceados
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_balanceada\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Debes usar append y pop.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esBalanceada\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.push\s*\(|push_back/i', $codigo) || !preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Debes usar los métodos de apilar y desapilar.";
            }
            break;

        case 'pil_2_2': // Desapilar todo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+vaciar_pila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un while para extraer hasta que esté vacía.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Asegúrate de usar .pop() para extraer.";
            } elseif ($es_familia_c) {
                if (!preg_match('/vaciarPila\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s*\(/i', $codigo)) $errores[] = "Usa un ciclo while.";
                if (!preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Extrae y guarda los valores usando pop().";
            }
            break;

        case 'pil_2_3': // Invertir un arreglo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+invertir_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Usa la pila para invertir el orden (append y pop).";
            } elseif ($es_familia_c) {
                if (!preg_match('/invertirArreglo\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.push\s*\(|\.Push\s*\(|push_back/i', $codigo) || !preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Usa la pila para invertir (push y pop).";
            }
            break;

        // ── PILAS: NIVEL 3 ──────────────────────────────────────────────
        case 'pil_3_1': // Invertir cadena
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+invertir_cadena\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Mete los caracteres a la pila y sácalos con pop().";
            } elseif ($es_familia_c) {
                if (!preg_match('/invertirCadena\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.push\s*\(|push_back/i', $codigo) || !preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Mete los caracteres y sácalos.";
            }
            break;

        case 'pil_3_2': // Undo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+simular_undo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Usa .pop() para deshacer.";
            } elseif ($es_familia_c) {
                if (!preg_match('/simularUndo\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Debes llamar pop() n veces.";
            }
            break;

        case 'pil_3_3': // Postfija
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+evaluar_postfija\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Saca operandos con pop() cuando detectes un operador.";
            } elseif ($es_familia_c) {
                if (!preg_match('/evaluarPostfija\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/i', $codigo)) $errores[] = "Extrae los números cuando detectes un operador + - * /";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 1 ───────────────────────────────────
        case 'lis_1_1': // Recorrer e imprimir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+imprimir_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un bucle 'while' para recorrer los nodos.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Debes avanzar al siguiente nodo usando '.siguiente'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/imprimirLista\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s*\(/i', $codigo)) $errores[] = "Usa un bucle while.";
                if (!preg_match('/(->|\.)siguiente/i', $codigo)) $errores[] = "Avanza el puntero al siguiente nodo.";
            }
            break;

        case 'lis_1_2': // Primer elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_primero\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Accede al dato del nodo usando '.valor'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/obtenerPrimero\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/(->|\.)valor/i', $codigo)) $errores[] = "Retorna el valor de la cabeza.";
            }
            break;

        case 'lis_1_3': // Lista vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_lista_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/None/', $codigo)) $errores[] = "Compara la cabeza directamente con 'None'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esListaVacia\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/null|NULL|nullptr/i', $codigo)) $errores[] = "Compara la cabeza directamente con nulo.";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 2 ───────────────────────────────────
        case 'lis_2_1': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un bucle 'while'.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Avanza el puntero con '.siguiente'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/contarNodos\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s*\(/i', $codigo)) $errores[] = "Usa un bucle while para contar.";
                if (!preg_match('/(->|\.)siguiente/i', $codigo)) $errores[] = "Asegúrate de avanzar al siguiente nodo.";
            }
            break;

        case 'lis_2_2': // Buscar un valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_valor\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Necesitas un 'while' para revisar cada nodo.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Compara tu objetivo con el atributo '.valor'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/buscarValor\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s*\(/i', $codigo)) $errores[] = "Usa while para recorrer.";
                if (!preg_match('/(->|\.)valor/i', $codigo)) $errores[] = "Verifica el valor contra el objetivo.";
            }
            break;

        case 'lis_2_3': // Último elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_ultimo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+.*\.siguiente/', $codigo)) $errores[] = "El bucle debe detenerse cuando '.siguiente' sea None.";
            } elseif ($es_familia_c) {
                if (!preg_match('/obtenerUltimo\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/(->|\.)siguiente\s*!=\s*(null|NULL|nullptr)/i', $codigo)) $errores[] = "Detén el ciclo cuando el siguiente sea nulo.";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 3 ───────────────────────────────────
        case 'lis_3_1': // Suma de valores
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+sumar_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\+\=/', $codigo) && !preg_match('/total\s*\=\s*total\s*\+/', $codigo)) $errores[] = "Suma acumulativamente el '.valor' de cada nodo.";
            } elseif ($es_familia_c) {
                if (!preg_match('/sumarLista\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\+\=|\+\s*[a-zA-Z0-9_]+(->|\.)valor/i', $codigo)) $errores[] = "Suma el valor del nodo actual a tu variable total.";
            }
            break;

        case 'lis_3_2': // A lista
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+a_lista_python\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() para guardar cada '.valor' en tu nueva lista.";
            } elseif ($es_familia_c) {
                if (!preg_match('/aLista\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(|\.Add\s*\(|\.push_back\s*\(/i', $codigo)) $errores[] = "Guarda los valores en la colección de retorno.";
            }
            break;

        case 'lis_3_3': // Contiene duplicados
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tiene_duplicados\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/in\s+vistos/', $codigo) && !preg_match('/append\s*\(/', $codigo)) $errores[] = "Lleva un registro de los valores 'vistos'.";
            } elseif ($es_familia_c) {
                if (!preg_match('/tieneDuplicados\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.contains\s*\(|\.Contains\s*\(|\.add\s*\(|\.insert\s*\(/i', $codigo)) $errores[] = "Lleva un control de vistos con HashSet o similar.";
            }
            break;

        // ── COLAS: NIVEL 1 ──────────────────────────────────────────────
        case 'col_1_1': // Crear y encolar
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() de deque.";
            } elseif ($es_familia_c) {
                if (!preg_match('/crearCola\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(|\.offer\s*\(|\.push\s*\(|\.Enqueue\s*\(/i', $codigo)) $errores[] = "Usa el método de encolar nativo.";
            }
            break;

        case 'col_1_2': // Cola vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_cola_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo) && !preg_match('/not\s+cola/', $codigo)) $errores[] = "Verifica si la cola tiene tamaño 0.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esColaVacia\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.isEmpty\s*\(\)|\.empty\s*\(\)|\.Count|size/i', $codigo)) $errores[] = "Usa el método correspondiente para revisar si está vacía.";
            }
            break;

        case 'col_1_3': // Ver el frente
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+ver_frente\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\[0\]/', $codigo)) $errores[] = "Usa el índice [0] para ver el frente.";
            } elseif ($es_familia_c) {
                if (!preg_match('/verFrente\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.peek\s*\(\)|\.element\s*\(\)|\.front\s*\(\)|\.Peek\s*\(\)/i', $codigo)) $errores[] = "Usa el método que expone el primer elemento.";
            }
            break;

        // ── COLAS: NIVEL 2 ──────────────────────────────────────────────
        case 'col_2_1': // Simular atención
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+simular_atencion\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Usa .popleft() para extraer.";
            } elseif ($es_familia_c) {
                if (!preg_match('/simularAtencion\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.poll\s*\(\)|\.remove\s*\(\)|\.pop\s*\(\)|\.Dequeue\s*\(\)/i', $codigo)) $errores[] = "Usa el método para extraer del frente.";
            }
            break;

        case 'col_2_2': // Tamaño
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tamanio_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len().";
            } elseif ($es_familia_c) {
                if (!preg_match('/tamanioCola\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.size\s*\(\)|\.Count/i', $codigo)) $errores[] = "Retorna el tamaño de la colección.";
            }
            break;

        case 'col_2_3': // Transferir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+transferir\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.popleft\s*\(\)/', $codigo) || !preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa popleft() y append().";
            } elseif ($es_familia_c) {
                if (!preg_match('/transferir\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.poll|\.remove|\.pop|\.Dequeue/i', $codigo) || !preg_match('/\.add|\.offer|\.push|\.Enqueue/i', $codigo)) $errores[] = "Saca de una cola y mete a la otra.";
            }
            break;

        // ── COLAS: NIVEL 3 ──────────────────────────────────────────────
        case 'col_3_1': // Prioridad
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+cola_prioritaria\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/sorted\s*\(/', $codigo) || !preg_match('/reverse\s*=\s*True/', $codigo)) $errores[] = "Usa sorted() con reverse=True.";
            } elseif ($es_familia_c) {
                if (!preg_match('/colaPrioritaria\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.addAll\s*\(|\.add\s*\(|\.push\s*\(|\.Enqueue/i', $codigo)) $errores[] = "Añade los elementos a tu Cola de Prioridad.";
            }
            break;

        case 'col_3_2': // Buffer
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buffer_circular\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/maxlen\s*=/', $codigo)) $errores[] = "Usa maxlen en deque para el buffer.";
            } elseif ($es_familia_c) {
                if (!preg_match('/bufferCircular\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.size\s*\(\)|\.Count/i', $codigo) || !preg_match('/\.poll\s*\(\)|\.pop\s*\(\)|\.Dequeue\s*\(\)/i', $codigo)) $errores[] = "Verifica el tamaño y elimina el más viejo si se llena.";
            }
            break;

        case 'col_3_3': // Rotar
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+rotar_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Haz append() del resultado de popleft().";
            } elseif ($es_familia_c) {
                if (!preg_match('/rotarCola\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add|\.push|\.Enqueue/i', $codigo) || !preg_match('/\.poll|\.pop|\.Dequeue/i', $codigo)) $errores[] = "Añade al final lo que saques del principio.";
            }
            break;

        // ── ÁRBOLES: NIVEL 1 ────────────────────────────────────────────
        case 'arb_1_1': // Construir árbol
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq\s*=/', $codigo) || !preg_match('/\.der\s*=/', $codigo)) $errores[] = "Asigna valores a .izq y .der.";
            } elseif ($es_familia_c) {
                if (!preg_match('/crearArbol\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/(->|\.)izq\s*=/i', $codigo) || !preg_match('/(->|\.)der\s*=/i', $codigo)) $errores[] = "Asigna los hijos izq y der.";
            }
            break;

        case 'arb_1_2': // Árbol vacío
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_arbol_vacio\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/is\s+None|==\s*None/', $codigo)) $errores[] = "Compara la raíz con None.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esArbolVacio\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*(null|NULL|nullptr)/i', $codigo)) $errores[] = "Compara la raíz con nulo.";
            }
            break;

        case 'arb_1_3': // Es hoja
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_hoja\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Verifica tanto .izq como .der.";
            } elseif ($es_familia_c) {
                if (!preg_match('/esHoja\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/(->|\.)izq\s*==\s*(null|NULL|nullptr)/i', $codigo) || !preg_match('/(->|\.)der\s*==\s*(null|NULL|nullptr)/i', $codigo)) $errores[] = "Verifica que izq y der sean nulos.";
            }
            break;

        // ── ÁRBOLES: NIVEL 2 ────────────────────────────────────────────
        case 'arb_2_1': // Altura
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+calcular_altura\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/max\s*\(/', $codigo)) $errores[] = "Usa max() para la mayor altura de los subárboles.";
            } elseif ($es_familia_c) {
                if (!preg_match('/calcularAltura\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/max\s*\(/i', $codigo)) $errores[] = "Usa el método max() de tu lenguaje.";
            }
            break;

        case 'arb_2_2': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\+\s*1|1\s*\+/', $codigo)) $errores[] = "Suma 1 por el nodo actual.";
            } elseif ($es_familia_c) {
                if (!preg_match('/contarNodos\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/1\s*\+/i', $codigo) && !preg_match('/\+\s*1/i', $codigo)) $errores[] = "Asegúrate de sumar 1 por la raíz actual.";
            }
            break;

        case 'arb_2_3': // Buscar valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_en_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*objetivo/', $codigo)) $errores[] = "Compara el valor con el objetivo.";
            } elseif ($es_familia_c) {
                if (!preg_match('/buscarEnArbol\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*objetivo/i', $codigo)) $errores[] = "Compara el valor de la raíz con el objetivo.";
            }
            break;

        // ── ÁRBOLES: NIVEL 3 ────────────────────────────────────────────
        case 'arb_3_1': // In-orden
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+inorden\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Llama a la recursión para izq y der.";
            } elseif ($es_familia_c) {
                if (!preg_match('/inorden\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(|\.push_back\s*\(|\.Add\s*\(/i', $codigo)) $errores[] = "Añade el valor a la colección resultado.";
            }
            break;

        case 'arb_3_2': // Pre-orden
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+preorden\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Llama a la recursión para izq y der.";
            } elseif ($es_familia_c) {
                if (!preg_match('/preorden\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(|\.push_back\s*\(|\.Add\s*\(/i', $codigo)) $errores[] = "Añade el valor a la colección resultado.";
            }
            break;

        case 'arb_3_3': // Suma
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.valor\s*\+/', $codigo) && !preg_match('/\+\s*[^.]*\.valor/', $codigo)) $errores[] = "Suma el valor actual.";
            } elseif ($es_familia_c) {
                if (!preg_match('/sumaArbol\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/(->|\.)valor/i', $codigo)) $errores[] = "Asegúrate de sumar el valor de la raíz actual.";
            }
            break;

        // ── GRAFOS: NIVEL 1 ─────────────────────────────────────────────
        case 'gra_1_1': // Construir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_grafo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\{|\= dict/', $codigo)) $errores[] = "Usa un diccionario {}.";
            } elseif ($es_familia_c) {
                if (!preg_match('/crearGrafo\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.put\s*\(|\.Add\s*\(|\[.*?\]\s*=/i', $codigo)) $errores[] = "Asigna vecinos al diccionario/mapa de tu lenguaje.";
            }
            break;

        case 'gra_1_2': // Vecinos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_vecinos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.get\s*\(/', $codigo) && !preg_match('/\[nodo\]/', $codigo)) $errores[] = "Extrae el nodo del diccionario.";
            } elseif ($es_familia_c) {
                if (!preg_match('/obtenerVecinos\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.getOrDefault\s*\(|\.get\s*\(|\[.*?\]|\.GetValueOrDefault\s*\(/i', $codigo)) $errores[] = "Extrae los vecinos de la estructura.";
            }
            break;

        case 'gra_1_3': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos_grafo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len().";
            } elseif ($es_familia_c) {
                if (!preg_match('/contarNodos\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.size\s*\(\)|\.Count/i', $codigo)) $errores[] = "Devuelve el tamaño del grafo.";
            }
            break;

        // ── GRAFOS: NIVEL 2 ─────────────────────────────────────────────
        case 'gra_2_1': // BFS básico
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+recorrido_bfs\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+cola/', $codigo)) $errores[] = "Usa un while para vaciar la cola.";
                if (!preg_match('/\.pop\s*\(0\)/', $codigo) && !preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Extrae del frente de la cola.";
            } elseif ($es_familia_c) {
                if (!preg_match('/recorridoBFS\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.poll\s*\(\)|\.pop\s*\(\)|\.Dequeue\s*\(\)/i', $codigo)) $errores[] = "Saca de la cola en tu ciclo while.";
            }
            break;

        case 'gra_2_2': // Alcanzables
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+nodos_alcanzables\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade a tu 'set' de visitados.";
            } elseif ($es_familia_c) {
                if (!preg_match('/nodosAlcanzables\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(|\.insert\s*\(|\.Add\s*\(/i', $codigo)) $errores[] = "Añade los nodos a tu Set/colección de visitados.";
            }
            break;

        case 'gra_2_3': // Existe camino
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+existe_camino\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*destino/', $codigo)) $errores[] = "Compara el nodo actual con el destino.";
            } elseif ($es_familia_c) {
                if (!preg_match('/existeCamino\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.equals\s*\(|==\s*destino/i', $codigo)) $errores[] = "Compara el nodo actual con el destino.";
            }
            break;

        // ── GRAFOS: NIVEL 3 ─────────────────────────────────────────────
        case 'gra_3_1': // DFS recursivo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+recorrido_dfs\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/recorrido_dfs\s*\(/', $codigo)) $errores[] = "Asegúrate de hacer la llamada recursiva a recorrido_dfs.";
            } elseif ($es_familia_c) {
                if (!preg_match('/recorridoDFS\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/recorridoDFS\s*\(/i', $codigo)) $errores[] = "Asegúrate de hacer la llamada recursiva.";
            }
            break;

        case 'gra_3_2': // Componentes
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_componentes\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/dfs\s*\(/', $codigo)) $errores[] = "Debes llamar a la función dfs interna.";
            } elseif ($es_familia_c) {
                if (!preg_match('/contarComponentes\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.keySet\s*\(\)|\.Keys|\.first/i', $codigo)) $errores[] = "Itera sobre las llaves/nodos del grafo.";
            }
            break;

        case 'gra_3_3': // Detectar ciclo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tiene_ciclo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/!=\s*padre/', $codigo)) $errores[] = "Valida que el vecino visitado no sea el padre.";
            } elseif ($es_familia_c) {
                if (!preg_match('/tieneCiclo\s*\(/i', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/return\s+(true|1)/i', $codigo)) $errores[] = "Retorna verdadero al detectar el ciclo.";
            }
            break;
    }

    // =====================================================================
    // RESPUESTA AL FRONTEND
    // =====================================================================
    if (empty($errores)) {
        echo json_encode([
            "exito"   => true,
            "mensaje" => "Tu lógica es estructuralmente correcta. ¡Buen trabajo!",
            "salida"  => $salida
        ]);
    } else {
        echo json_encode([
            "exito"   => false,
            "mensaje" => $errores[0]
        ]);
    }

} else {
    echo json_encode(["exito" => false, "mensaje" => "Método no permitido."]);
}
?>