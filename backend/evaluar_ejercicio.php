<?php
// evaluar_ejercicio.php -> Analizador Estático con Consola Virtual y Niveles de Dificultad
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
    $lenguaje     = $datos['lenguaje'] ?? 'python'; // <-- NUEVO
    
    // Validaciones básicas (Heurística Nielsen #5: Prevención de errores)
    if (empty($ejercicio_id) || empty(trim($codigo))) {
        echo json_encode(["exito" => false, "mensaje" => "El campo de código no puede estar vacío."]);
        exit;
    }

    if (strpos($codigo, 'pass') !== false) {
        echo json_encode(["exito" => false, "mensaje" => "Debes reemplazar la palabra 'pass' con tu propia lógica."]);
        exit;
    }

    $errores = [];
    $salida  = "";

    // =====================================================================
    // ANALIZADOR ESTÁTICO — Evaluación por ID ÚNICO de Ejercicio
    // =====================================================================
    switch ($ejercicio_id) {

        // ── MATRICES: NIVEL 1 ───────────────────────────────────────────
        case 'mat_1_1': // Acceso a un elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_elemento\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/return\s+/', $codigo)) $errores[] = "Usa 'return' para devolver el valor.";
                if (!preg_match('/\[.*\]\[.*\]/', $codigo)) $errores[] = "Debes acceder usando dos índices [][].";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+obtenerElemento\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/return\s+[a-zA-Z0-9_]+\s*\[[^\]]+\]\s*\[[^\]]+\]\s*;/', $codigo)) $errores[] = "Debes retornar el elemento accediendo a la matriz con [][].";
            }
            break;

        case 'mat_1_2': // Primera fila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+primera_fila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\[0\]/', $codigo)) $errores[] = "Debes acceder al índice [0] de la matriz.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\[\]\s+primeraFila\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/return\s+[a-zA-Z0-9_]+\s*\[0\]\s*;/', $codigo)) $errores[] = "Debes retornar la matriz en su índice [0].";
            }
            break;

        case 'mat_1_3': // Número de filas
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_filas\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa la función len() para contar las filas.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+contarFilas\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/\.length/', $codigo)) $errores[] = "Usa la propiedad .length para contar las filas.";
            }
            break;

        // ── MATRICES: NIVEL 2 ───────────────────────────────────────────
        case 'mat_2_1': // Suma de la diagonal
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_diagonal\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/for\s+/', $codigo) && !preg_match('/while\s+/', $codigo)) $errores[] = "Necesitas un bucle (for o while) para iterar.";
                if (!preg_match('/\[(.*?)\]\[\1\]/', $codigo) && !preg_match('/\[i\]\[i\]/', $codigo)) $errores[] = "Accede a los elementos de la diagonal usando el mismo índice, ej: [i][i].";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+sumaDiagonal\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/for\s*\(/', $codigo)) $errores[] = "Usa un bucle for para recorrer la matriz.";
                if (!preg_match('/\[\s*[a-zA-Z0-9_]+\s*\]\s*\[\s*[a-zA-Z0-9_]+\s*\]/', $codigo)) $errores[] = "Debes acceder a los elementos usando doble corchete [i][i].";
            }
            break;

        case 'mat_2_2': // Suma de todos los elementos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_total\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (substr_count($codigo, 'for ') < 2 && substr_count($codigo, 'while ') < 2) $errores[] = "Necesitas dos bucles anidados para recorrer todas las celdas.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+sumaTotal\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (substr_count($codigo, 'for') < 2) $errores[] = "Necesitas dos bucles 'for' anidados en Java.";
                if (!preg_match('/\+\=|\+\s*[a-zA-Z0-9_]+\[/', $codigo)) $errores[] = "Asegúrate de sumar acumulativamente cada valor al total.";
            }
            break;

        case 'mat_2_3': // Buscar un valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_en_matriz\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*valor/', $codigo)) $errores[] = "Debes comparar los elementos con el parámetro 'valor'.";
                if (!preg_match('/return\s+True/', $codigo)) $errores[] = "Retorna True si encuentras el valor.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+buscarEnMatriz\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/==\s*valor/', $codigo)) $errores[] = "Debes comparar cada celda con el 'valor'.";
                if (!preg_match('/return\s+true\s*;/', $codigo)) $errores[] = "Retorna true si encuentras el elemento.";
            }
            break;

        // ── MATRICES: NIVEL 3 ───────────────────────────────────────────
        case 'mat_3_1': // Transpuesta
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+transponer\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/append\s*\(/', $codigo)) $errores[] = "Usa .append() para ir llenando la nueva matriz.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\[\]\[\]\s+transponer\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/\[[^\]]+\]\s*\[[^\]]+\]\s*=\s*[a-zA-Z0-9_]+\s*\[[^\]]+\]\s*\[[^\]]+\]/', $codigo)) $errores[] = "Debes asignar los valores de forma invertida, ej: resultado[j][i] = matriz[i][j].";
            }
            break;

        case 'mat_3_2': // Máximo por fila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+maximo_por_fila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/max\s*\(/', $codigo)) $errores[] = "Te recomiendo usar la función max() en cada fila.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\[\]\s+maximoPorFila\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/Math\.max|>\s*[a-zA-Z0-9_]+/', $codigo)) $errores[] = "Compara los valores para encontrar el mayor (puedes usar Math.max o >).";
            }
            break;

        case 'mat_3_3': // Matriz identidad
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_identidad\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/!=\s*1/', $codigo) && !preg_match('/!=\s*0/', $codigo)) $errores[] = "Debes verificar que la diagonal sea 1 y el resto 0.";
                if (!preg_match('/return\s+False/', $codigo)) $errores[] = "Si alguna celda no cumple, retorna False inmediatamente.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esIdentidad\s*\(/', $codigo)) $errores[] = "No cambies la firma de la función.";
                if (!preg_match('/!=\s*1/', $codigo) && !preg_match('/!=\s*0/', $codigo)) $errores[] = "Verifica las condiciones de 1 (diagonal) y 0 (resto).";
                if (!preg_match('/return\s+false\s*;/', $codigo)) $errores[] = "Retorna false si encuentras una irregularidad.";
            }
            break;

case 'pil_1_1': // Apilar y ver el tope
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+ver_tope\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() para apilar.";
                if (!preg_match('/\[-1\]/', $codigo)) $errores[] = "Retorna el tope con [-1].";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+verTope\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.push\s*\(/', $codigo)) $errores[] = "Usa el método .push() de la clase Stack.";
                if (!preg_match('/\.peek\s*\(\)/', $codigo)) $errores[] = "Retorna el elemento superior con .peek().";
            }
            break;

        case 'pil_1_2': // Pila vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo) && !preg_match('/not\s+pila/', $codigo)) $errores[] = "Verifica si el tamaño es 0.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esVacia\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.isEmpty\s*\(\)/', $codigo) && !preg_match('/\.size\s*\(\)\s*==\s*0/', $codigo)) $errores[] = "Usa el método .isEmpty() o verifica el size().";
            }
            break;

        case 'pil_1_3': // Tamaño de la pila
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tamanio_pila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len() para el tamaño.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+tamanioPila\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.size\s*\(\)/', $codigo)) $errores[] = "Usa el método .size() de la pila.";
            }
            break;

        // ── PILAS: NIVEL 2 ──────────────────────────────────────────────
        case 'pil_2_1': // Paréntesis balanceados
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_balanceada\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Debes usar append y pop.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esBalanceada\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.push\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Debes usar los métodos .push() y .pop().";
            }
            break;

        case 'pil_2_2': // Desapilar todo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+vaciar_pila\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un while para extraer hasta que esté vacía.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Asegúrate de usar .pop() para extraer.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/List<Integer>\s+vaciarPila\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/while\s*\(/', $codigo)) $errores[] = "Usa un ciclo while.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Extrae y guarda los valores usando .pop().";
            }
            break;

        case 'pil_2_3': // Invertir un arreglo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+invertir_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Usa la pila para invertir el orden (append y pop).";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\[\]\s+invertirArreglo\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.push\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Usa la pila para invertir (push y pop).";
            }
            break;

        // ── PILAS: NIVEL 3 ──────────────────────────────────────────────
        case 'pil_3_1': // Invertir cadena
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+invertir_cadena\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Mete los caracteres a la pila y sácalos con pop().";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/String\s+invertirCadena\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.push\s*\(/', $codigo) || !preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Mete los caracteres y sácalos (ideal usar StringBuilder).";
            }
            break;

        case 'pil_3_2': // Undo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+simular_undo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Usa .pop() para deshacer.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Stack<String>\s+simularUndo\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Debes llamar .pop() n veces.";
            }
            break;

        case 'pil_3_3': // Postfija
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+evaluar_postfija\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Saca operandos con pop() cuando detectes un operador.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+evaluarPostfija\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.pop\s*\(\)/', $codigo)) $errores[] = "Haz pop() a dos números cuando detectes un operador + - * /";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 1 ───────────────────────────────────
        case 'lis_1_1': // Recorrer e imprimir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+imprimir_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un bucle 'while' para recorrer los nodos.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Debes avanzar al siguiente nodo usando '.siguiente'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/void\s+imprimirLista\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/while\s*\(/', $codigo)) $errores[] = "Usa un bucle while.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Avanza el puntero con actual = actual.siguiente.";
            }
            break;

        case 'lis_1_2': // Primer elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_primero\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Accede al dato del nodo usando '.valor'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+obtenerPrimero\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Retorna cabeza.valor.";
            }
            break;

        case 'lis_1_3': // Lista vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_lista_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/None/', $codigo)) $errores[] = "Compara la cabeza directamente con 'None'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esListaVacia\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/null/', $codigo)) $errores[] = "Compara la cabeza directamente con null.";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 2 ───────────────────────────────────
        case 'lis_2_1': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Usa un bucle 'while'.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Avanza el puntero con '.siguiente'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+contarNodos\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/while\s*\(/', $codigo)) $errores[] = "Usa un bucle while para contar.";
                if (!preg_match('/\.siguiente/', $codigo)) $errores[] = "Asegúrate de avanzar al siguiente nodo.";
            }
            break;

        case 'lis_2_2': // Buscar un valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_valor\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+/', $codigo)) $errores[] = "Necesitas un 'while' para revisar cada nodo.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Compara tu objetivo con el atributo '.valor'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+buscarValor\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/while\s*\(/', $codigo)) $errores[] = "Usa while para recorrer.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Verifica actual.valor contra el objetivo.";
            }
            break;

        case 'lis_2_3': // Último elemento
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_ultimo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+.*\.siguiente/', $codigo)) $errores[] = "El bucle debe detenerse cuando '.siguiente' sea None.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+obtenerUltimo\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.siguiente\s*!=\s*null/', $codigo)) $errores[] = "Detén el ciclo cuando actual.siguiente sea null.";
            }
            break;

        // ── LISTAS ENLAZADAS: NIVEL 3 ───────────────────────────────────
        case 'lis_3_1': // Suma de valores
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+sumar_lista\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\+\=/', $codigo) && !preg_match('/total\s*\=\s*total\s*\+/', $codigo)) $errores[] = "Suma acumulativamente el '.valor' de cada nodo.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+sumarLista\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\+\=|\+\s*actual\.valor/', $codigo)) $errores[] = "Suma el valor del nodo actual a tu variable total.";
            }
            break;

        case 'lis_3_2': // A lista
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+a_lista_python\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() para guardar cada '.valor' en tu nueva lista.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/List<Integer>\s+aLista\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Usa res.add(actual.valor) para guardar los valores.";
            }
            break;

        case 'lis_3_3': // Contiene duplicados
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tiene_duplicados\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/in\s+vistos/', $codigo) && !preg_match('/append\s*\(/', $codigo)) $errores[] = "Lleva un registro de los valores 'vistos'.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+tieneDuplicados\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.contains\s*\(/', $codigo) && !preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Lleva un control con un HashSet (métodos .contains o .add).";
            }
            break;

// ── COLAS: NIVEL 1 ──────────────────────────────────────────────
        case 'col_1_1': // Crear y encolar
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa .append() de deque.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Queue<String>\s+crearCola\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(|\.offer\s*\(/', $codigo)) $errores[] = "Usa .add() o .offer() en la cola.";
            }
            break;

        case 'col_1_2': // Cola vacía
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_cola_vacia\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo) && !preg_match('/not\s+cola/', $codigo)) $errores[] = "Verifica si la cola tiene tamaño 0.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esColaVacia\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.isEmpty\s*\(\)/', $codigo)) $errores[] = "Usa .isEmpty().";
            }
            break;

        case 'col_1_3': // Ver el frente
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+ver_frente\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\[0\]/', $codigo)) $errores[] = "Usa el índice [0] para ver el frente.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/String\s+verFrente\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.peek\s*\(\)/', $codigo) && !preg_match('/\.element\s*\(\)/', $codigo)) $errores[] = "Usa .peek() o .element().";
            }
            break;

        // ── COLAS: NIVEL 2 ──────────────────────────────────────────────
        case 'col_2_1': // Simular atención
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+simular_atencion\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Usa .popleft() para extraer.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/List<String>\s+simularAtencion\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.poll\s*\(\)/', $codigo) && !preg_match('/\.remove\s*\(\)/', $codigo)) $errores[] = "Usa .poll() o .remove() para extraer del frente.";
            }
            break;

        case 'col_2_2': // Tamaño
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tamanio_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len().";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+tamanioCola\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.size\s*\(\)/', $codigo)) $errores[] = "Usa .size().";
            }
            break;

        case 'col_2_3': // Transferir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+transferir\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.popleft\s*\(\)/', $codigo) || !preg_match('/\.append\s*\(/', $codigo)) $errores[] = "Usa popleft() y append().";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Queue<Integer>\s+transferir\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.poll\s*\(\)|\.remove\s*\(\)/', $codigo) || !preg_match('/\.add\s*\(|\.offer\s*\(/', $codigo)) $errores[] = "Saca de una cola (poll/remove) y mete a la otra (add/offer).";
            }
            break;

        // ── COLAS: NIVEL 3 ──────────────────────────────────────────────
        case 'col_3_1': // Prioridad
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+cola_prioritaria\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/sorted\s*\(/', $codigo) || !preg_match('/reverse\s*=\s*True/', $codigo)) $errores[] = "Usa sorted() con reverse=True.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/PriorityQueue<Integer>\s+colaPrioritaria\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.addAll\s*\(/', $codigo) && !preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade los elementos a la PriorityQueue.";
            }
            break;

        case 'col_3_2': // Buffer
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buffer_circular\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/maxlen\s*=/', $codigo)) $errores[] = "Usa maxlen en deque para el buffer.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Queue<Integer>\s+bufferCircular\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.size\s*\(\)/', $codigo) || !preg_match('/\.poll\s*\(\)/', $codigo)) $errores[] = "Verifica el size() y haz poll() si se llena la capacidad.";
            }
            break;

        case 'col_3_3': // Rotar
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+rotar_cola\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.append\s*\(/', $codigo) || !preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Haz append() del resultado de popleft().";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Queue<Integer>\s+rotarCola\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(/', $codigo) || !preg_match('/\.poll\s*\(\)/', $codigo)) $errores[] = "Haz add() de lo que devuelva poll().";
            }
            break;

        // ── ÁRBOLES: NIVEL 1 ────────────────────────────────────────────
        case 'arb_1_1': // Construir árbol
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq\s*=/', $codigo) || !preg_match('/\.der\s*=/', $codigo)) $errores[] = "Asigna valores a .izq y .der.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/NodoArbol\s+crearArbol\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.izq\s*=/', $codigo) || !preg_match('/\.der\s*=/', $codigo)) $errores[] = "Asigna los hijos izq y der.";
            }
            break;

        case 'arb_1_2': // Árbol vacío
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_arbol_vacio\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/is\s+None|==\s*None/', $codigo)) $errores[] = "Compara la raíz con None.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esArbolVacio\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/==\s*null/', $codigo)) $errores[] = "Compara la raíz con null.";
            }
            break;

        case 'arb_1_3': // Es hoja
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+es_hoja\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Verifica tanto .izq como .der.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+esHoja\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.izq\s*==\s*null/', $codigo) || !preg_match('/\.der\s*==\s*null/', $codigo)) $errores[] = "Verifica que izq y der sean null.";
            }
            break;

        // ── ÁRBOLES: NIVEL 2 ────────────────────────────────────────────
        case 'arb_2_1': // Altura
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+calcular_altura\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/max\s*\(/', $codigo)) $errores[] = "Usa max() para la mayor altura de los subárboles.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+calcularAltura\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/Math\.max\s*\(/', $codigo)) $errores[] = "Usa Math.max() para los subárboles.";
            }
            break;

        case 'arb_2_2': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\+\s*1|1\s*\+/', $codigo)) $errores[] = "Suma 1 por el nodo actual.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+contarNodos\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/1\s*\+/', $codigo)) $errores[] = "Asegúrate de sumar 1 por la raíz.";
            }
            break;

        case 'arb_2_3': // Buscar valor
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+buscar_en_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*objetivo/', $codigo)) $errores[] = "Compara el valor con el objetivo.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+buscarEnArbol\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/==\s*objetivo/', $codigo)) $errores[] = "Compara el valor de la raíz con el objetivo.";
            }
            break;

        // ── ÁRBOLES: NIVEL 3 ────────────────────────────────────────────
        case 'arb_3_1': // In-orden
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+inorden\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Llama a la recursión para izq y der.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/void\s+inorden\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade el valor a la lista res.";
            }
            break;

        case 'arb_3_2': // Pre-orden
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+preorden\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.izq/', $codigo) || !preg_match('/\.der/', $codigo)) $errores[] = "Llama a la recursión para izq y der.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/void\s+preorden\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade el valor a la lista res.";
            }
            break;

        case 'arb_3_3': // Suma
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+suma_arbol\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.valor\s*\+/', $codigo) && !preg_match('/\+\s*[^.]*\.valor/', $codigo)) $errores[] = "Suma el valor actual.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+sumaArbol\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.valor/', $codigo)) $errores[] = "Asegúrate de sumar raiz.valor.";
            }
            break;

        // ── GRAFOS: NIVEL 1 ─────────────────────────────────────────────
        case 'gra_1_1': // Construir
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+crear_grafo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\{|\= dict/', $codigo)) $errores[] = "Usa un diccionario {}.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Map<String,\s*List<String>>\s+crearGrafo\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.put\s*\(/', $codigo)) $errores[] = "Usa .put() para agregar nodos y vecinos.";
            }
            break;

        case 'gra_1_2': // Vecinos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+obtener_vecinos\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.get\s*\(/', $codigo) && !preg_match('/\[nodo\]/', $codigo)) $errores[] = "Extrae el nodo del diccionario.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/List<String>\s+obtenerVecinos\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.getOrDefault\s*\(/', $codigo) && !preg_match('/\.get\s*\(/', $codigo)) $errores[] = "Extrae los vecinos usando .getOrDefault o .get.";
            }
            break;

        case 'gra_1_3': // Contar nodos
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_nodos_grafo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/len\s*\(/', $codigo)) $errores[] = "Usa len().";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+contarNodos\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.size\s*\(\)/', $codigo)) $errores[] = "Usa el método .size() del Map.";
            }
            break;

        // ── GRAFOS: NIVEL 2 ─────────────────────────────────────────────
        case 'gra_2_1': // BFS básico
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+recorrido_bfs\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/while\s+cola/', $codigo)) $errores[] = "Usa un while para vaciar la cola.";
                if (!preg_match('/\.pop\s*\(0\)/', $codigo) && !preg_match('/\.popleft\s*\(\)/', $codigo)) $errores[] = "Extrae del frente de la cola.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/List<String>\s+recorridoBFS\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.poll\s*\(\)/', $codigo)) $errores[] = "Usa .poll() para sacar de la cola.";
                if (!preg_match('/while\s*\(/', $codigo)) $errores[] = "Usa un ciclo while para la cola.";
            }
            break;

        case 'gra_2_2': // Alcanzables
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+nodos_alcanzables\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade a tu 'set' de visitados.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/Set<String>\s+nodosAlcanzables\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.add\s*\(/', $codigo)) $errores[] = "Añade los nodos al Set de visitados.";
            }
            break;

        case 'gra_2_3': // Existe camino
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+existe_camino\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/==\s*destino/', $codigo)) $errores[] = "Compara el nodo actual con el destino.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+existeCamino\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.equals\s*\(/', $codigo) && !preg_match('/==\s*destino/', $codigo)) $errores[] = "Compara el nodo actual con el destino (usa .equals en Strings).";
            }
            break;

        // ── GRAFOS: NIVEL 3 ─────────────────────────────────────────────
        case 'gra_3_1': // DFS recursivo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+recorrido_dfs\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/recorrido_dfs\s*\(/', $codigo)) $errores[] = "Asegúrate de hacer la llamada recursiva a recorrido_dfs.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/void\s+recorridoDFS\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/recorridoDFS\s*\(/', $codigo)) $errores[] = "Asegúrate de hacer la llamada recursiva.";
            }
            break;

        case 'gra_3_2': // Componentes
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+contar_componentes\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/dfs\s*\(/', $codigo)) $errores[] = "Debes llamar a la función dfs interna.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/int\s+contarComponentes\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/\.keySet\s*\(\)/', $codigo)) $errores[] = "Itera sobre las llaves del grafo (grafo.keySet()).";
            }
            break;

        case 'gra_3_3': // Detectar ciclo
            if ($lenguaje === 'python') {
                if (!preg_match('/def\s+tiene_ciclo\s*\(/', $codigo)) $errores[] = "No cambies el nombre de la función.";
                if (!preg_match('/!=\s*padre/', $codigo)) $errores[] = "Asegúrate de validar que el vecino visitado no sea el padre inmediato.";
            } elseif ($lenguaje === 'java') {
                if (!preg_match('/boolean\s+tieneCiclo\s*\(/', $codigo)) $errores[] = "No cambies la firma del método.";
                if (!preg_match('/return\s+true/', $codigo)) $errores[] = "Debes retornar true si detectas el ciclo en el DFS.";
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