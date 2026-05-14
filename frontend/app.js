// =====================================================================
// ARCHIVO: app.js — Data Learn
// ARQUITECTURA: SPA con sidebar colapsable + panel de ejercicios tipo Udemy
// =====================================================================

// ── ÍCONOS SVG ────────────────────────────────────────────────────────
const ICONS = {
  eye:         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  eyeOff:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
  success:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  error:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  video:       `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.5" ry="2.5"></rect><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`,
  book:        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  code:        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  fire:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  compass:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  lock:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  check:       `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  menu:        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  panelOpen:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  chevronDown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  chevronRight:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  circle:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
};

function inyectarIconos() {
  document.querySelectorAll('.toggle-password').forEach(btn => { btn.innerHTML = ICONS.eye; });
  const map = {
    'icon-tutorial-video': 'video', 'icon-tutorial-book': 'book',
    'icon-tutorial-code': 'code',   'icon-compass': 'compass',
    'icon-fire': 'fire',            'icon-menu': 'menu'
  };
  Object.entries(map).forEach(([id, icon]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = ICONS[icon];
  });
}

// Se llama cada vez que el tab Ejercicio se activa (el botón solo existe ahí)
function inyectarIconoPanel() {
  const el = document.getElementById('icon-panel');
  if (el) el.innerHTML = ICONS.panelOpen;
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('dl_theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);
  
  // Cambia el tema del editor al vuelo
  if (codeEditor) {
    codeEditor.setOption("theme", isLight ? "eclipse" : "dracula");
  }
}

function updateThemeIcon(isLight) {
  const iconEl = document.getElementById('icon-theme');
  if (iconEl) iconEl.innerHTML = isLight ? ICONS.moon : ICONS.sun;
}

function initTheme() {
  const savedTheme = localStorage.getItem('dl_theme');
  const isLight = savedTheme === 'light'; 
  if (isLight) document.body.classList.add('light-mode');
  
  inyectarIconos(); 
  updateThemeIcon(isLight);

  // INICIALIZAR CODEMIRROR
  const textArea = document.getElementById("codeInput");
  if (textArea && !codeEditor) {
    codeEditor = CodeMirror.fromTextArea(textArea, {
      mode: "python",
      theme: isLight ? "eclipse" : "dracula",
      lineNumbers: true, 
      indentUnit: 4
    });

    // ── NUEVO: AUTOGUARDADO AL ESCRIBIR ──
    codeEditor.on("change", () => {
        if (currentUser && currentLesson) {
            const savedCodeKey = `dl_code_${currentUser}_${currentLesson}_${currentLevelIdx}_${currentExerciseIdx}_${currentLang}`;
            localStorage.setItem(savedCodeKey, codeEditor.getValue());
        }
    });
  }
}

// Cuando carga la página, inicializa el tema y revisa si hay alguien logueado
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  checkSession();
});

function checkSession() {
  const savedUser = localStorage.getItem('dl_currentUser');
  if (savedUser) {
    currentUser = savedUser;
    enterDashboard(savedUser); // Lo mandamos directo al panel, saltando el login
  }
}

// =====================================================================
// BASE DE CONOCIMIENTO — 6 temas × 3 niveles × 3 ejercicios = 54
// Actualizado con salidas dinámicas print() para Skulpt
// =====================================================================
const TOPICS = {

  matrices: {
    name:'Matrices', subtitle:'Estructuras bidimensionales', type:'lineal',
    videoUrl:'https://www.youtube.com/embed/nZzE9vU-7lU',
    videoDesc:'Analizaremos las matrices como arreglos bidimensionales, su representación en memoria y las técnicas más eficientes para recorrer sus elementos.',
    theoryTitle:'Matrices y Arreglos 2D',
    theoryContent:'Una matriz organiza sus elementos en filas y columnas. En Python se implementan como listas de listas. El acceso a cualquier elemento es O(1) conociendo sus índices.',
    theoryOps:['Acceso: matriz[fila][columna]','Recorrido: bucles anidados O(n×m)','Dimensiones: n filas × m columnas'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'mat_1_1', nombre:'Acceso a un elemento',
          enunciado:'Escribe obtener_elemento(matriz, fila, col) que retorne el elemento en esa posición. Solo acceso directo con corchetes, sin bucles.',
          starter:`def obtener_elemento(matriz, fila, col):\n    # Accede con corchetes dobles\n    pass\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Elemento extraido:", obtener_elemento(matriz, 2, 0))`,
          starter_java:`public class Main {\n    public static int obtenerElemento(int[][] matriz, int fila, int col) {\n        // Usa corchetes dobles\n        return 0;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Elemento: " + obtenerElemento(m, 2, 0));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint obtenerElemento(int matriz[3][3], int fila, int col) {\n    // Usa corchetes dobles\n    return 0;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Elemento: %d\\n", obtenerElemento(m, 2, 0));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint obtenerElemento(vector<vector<int>> matriz, int fila, int col) {\n    // Usa corchetes dobles\n    return 0;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Elemento: " << obtenerElemento(m, 2, 0) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int obtenerElemento(int[][] matriz, int fila, int col) {\n        // Usa corchetes dobles\n        return 0;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Elemento: " + obtenerElemento(m, 2, 0));\n    }\n}`
        },
        { id:'mat_1_2', nombre:'Primera fila',
          enunciado:'Escribe primera_fila(matriz) que retorne la primera fila completa de la matriz como lista/arreglo.',
          starter:`def primera_fila(matriz):\n    # Accede al índice 0\n    pass\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Primera fila:", primera_fila(matriz))`,
          starter_java:`import java.util.Arrays;\npublic class Main {\n    public static int[] primeraFila(int[][] matriz) {\n        // Retorna el índice 0\n        return new int[0];\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Primera fila: " + Arrays.toString(primeraFila(m)));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint* primeraFila(int matriz[3][3]) {\n    // Retorna la primera fila\n    return NULL;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Primera fila lista.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> primeraFila(vector<vector<int>> matriz) {\n    // Retorna la primera fila\n    return {};\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Primera fila lista." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int[] primeraFila(int[][] matriz) {\n        // Retorna el índice 0\n        return new int[0];\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Primera fila: " + string.Join(",", primeraFila(m)));\n    }\n}`
        },
        { id:'mat_1_3', nombre:'Número de filas',
          enunciado:'Escribe contar_filas(matriz) que retorne el número de filas usando len(), .length o .size().',
          starter:`def contar_filas(matriz):\n    # Usa len()\n    pass\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Total de filas:", contar_filas(matriz))`,
          starter_java:`public class Main {\n    public static int contarFilas(int[][] matriz) {\n        // Usa .length\n        return 0;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Total de filas: " + contarFilas(m));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint contarFilas(int matriz[3][3]) {\n    // Retorna el numero de filas\n    return 0;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Total de filas: %d\\n", contarFilas(m));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint contarFilas(vector<vector<int>> matriz) {\n    // Usa .size()\n    return 0;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Total de filas: " << contarFilas(m) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int contarFilas(int[][] matriz) {\n        // Usa .Length\n        return 0;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Total de filas: " + contarFilas(m));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Recorridos', ejercicios:[
        { id:'mat_2_1', nombre:'Suma de la diagonal',
          enunciado:'Escribe suma_diagonal(matriz) que retorne la suma de los elementos de la diagonal principal (fila == columna).',
          starter:`def suma_diagonal(matriz):\n    # matriz[i][i] es la diagonal\n    pass\n    return 0\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Suma diagonal:", suma_diagonal(matriz))`,
          starter_java:`public class Main {\n    public static int sumaDiagonal(int[][] matriz) {\n        int suma = 0;\n        // Usa un for loop para matriz[i][i]\n        return suma;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Suma diagonal: " + sumaDiagonal(m));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint sumaDiagonal(int matriz[3][3]) {\n    int suma = 0;\n    // Bucle para matriz[i][i]\n    return suma;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Suma diagonal: %d\\n", sumaDiagonal(m));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint sumaDiagonal(vector<vector<int>> matriz) {\n    int suma = 0;\n    // Bucle para matriz[i][i]\n    return suma;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Suma diagonal: " << sumaDiagonal(m) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int sumaDiagonal(int[][] matriz) {\n        int suma = 0;\n        // Bucle para matriz[i][i]\n        return suma;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Suma diagonal: " + sumaDiagonal(m));\n    }\n}`
        },
        { id:'mat_2_2', nombre:'Suma de todos los elementos',
          enunciado:'Escribe suma_total(matriz) que retorne la suma de todos los elementos usando bucles anidados.',
          starter:`def suma_total(matriz):\n    total = 0\n    # for fila in matriz: for elemento in fila\n    pass\n    return total\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Suma total:", suma_total(matriz))`,
          starter_java:`public class Main {\n    public static int sumaTotal(int[][] matriz) {\n        int total = 0;\n        // Usa for anidados\n        return total;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Suma total: " + sumaTotal(m));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint sumaTotal(int matriz[3][3]) {\n    int total = 0;\n    // Usa for anidados\n    return total;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Suma total: %d\\n", sumaTotal(m));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint sumaTotal(vector<vector<int>> matriz) {\n    int total = 0;\n    // Usa for anidados\n    return total;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Suma total: " << sumaTotal(m) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int sumaTotal(int[][] matriz) {\n        int total = 0;\n        // Usa for anidados\n        return total;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Suma total: " + sumaTotal(m));\n    }\n}`
        },
        { id:'mat_2_3', nombre:'Buscar un valor',
          enunciado:'Escribe buscar_en_matriz(matriz, valor) que retorne True/1 si el valor existe en alguna celda.',
          starter:`def buscar_en_matriz(matriz, valor):\n    # Recorre con bucles anidados\n    pass\n    return False\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("¿Existe el 5?:", buscar_en_matriz(matriz, 5))`,
          starter_java:`public class Main {\n    public static boolean buscarEnMatriz(int[][] matriz, int valor) {\n        // Recorre y si lo encuentras, return true;\n        return false;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("¿Existe el 5?: " + buscarEnMatriz(m, 5));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint buscarEnMatriz(int matriz[3][3], int valor) {\n    // Recorre y si lo encuentras, return 1;\n    return 0;\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf("Existe el 5?: %d\\n", buscarEnMatriz(m, 5));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool buscarEnMatriz(vector<vector<int>> matriz, int valor) {\n    // Recorre y si lo encuentras, return true;\n    return false;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "¿Existe el 5?: " << buscarEnMatriz(m, 5) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static bool buscarEnMatriz(int[][] matriz, int valor) {\n        // Recorre y si lo encuentras, return true;\n        return false;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Existe el 5?: " + buscarEnMatriz(m, 5));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Transformaciones', ejercicios:[
        { id:'mat_3_1', nombre:'Transpuesta',
          enunciado:'Escribe transponer(matriz) que retorne la transpuesta intercambiando filas por columnas.',
          starter:`def transponer(matriz):\n    resultado = []\n    # Recorre columnas primero, luego filas\n    pass\n    return resultado\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Transpuesta:", transponer(matriz))`,
          starter_java:`import java.util.Arrays;\npublic class Main {\n    public static int[][] transponer(int[][] matriz) {\n        int[][] resultado = new int[matriz[0].length][matriz.length];\n        // Invierte [fila][col] a [col][fila]\n        return resultado;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\n        System.out.println("Transpuesta (1er elemento): " + transponer(m)[0][0]);\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid transponer(int matriz[3][3], int resultado[3][3]) {\n    // Invierte [fila][col] a [col][fila]\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int res[3][3];\n    transponer(m, res);\n    printf("Transpuesta lista.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<vector<int>> transponer(vector<vector<int>> matriz) {\n    vector<vector<int>> resultado(matriz[0].size(), vector<int>(matriz.size()));\n    // Invierte [fila][col] a [col][fila]\n    return resultado;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,6},{7,8,9}};\n    cout << "Transpuesta lista." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int[][] transponer(int[][] matriz) {\n        int[][] resultado = new int[matriz[0].Length][];\n        // Invierte [fila][col] a [col][fila]\n        return resultado;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,6}, new int[]{7,8,9} };\n        Console.WriteLine("Transpuesta lista.");\n    }\n}`
        },
        { id:'mat_3_2', nombre:'Máximo por fila',
          enunciado:'Escribe maximo_por_fila(matriz) que retorne un arreglo con el valor máximo de cada fila.',
          starter:`def maximo_por_fila(matriz):\n    maximos = []\n    # Para cada fila usa max()\n    pass\n    return maximos\n\nmatriz = [[1,2,3],[4,5,6],[7,8,9]]\nprint("Máximos por fila:", maximo_por_fila(matriz))`,
          starter_java:`import java.util.Arrays;\npublic class Main {\n    public static int[] maximoPorFila(int[][] matriz) {\n        int[] maximos = new int[matriz.length];\n        // Encuentra el mayor en cada fila\n        return maximos;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,20},{7,8,9}};\n        System.out.println("Máximos por fila: " + Arrays.toString(maximoPorFila(m)));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid maximoPorFila(int matriz[3][3], int maximos[3]) {\n    // Encuentra el mayor en cada fila\n}\n\nint main() {\n    int m[3][3] = {{1,2,3},{4,5,20},{7,8,9}};\n    int res[3];\n    maximoPorFila(m, res);\n    printf("Maximos por fila calculados.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> maximoPorFila(vector<vector<int>> matriz) {\n    vector<int> maximos(matriz.size());\n    // Encuentra el mayor en cada fila\n    return maximos;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,2,3},{4,5,20},{7,8,9}};\n    cout << "Maximos por fila calculados." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static int[] maximoPorFila(int[][] matriz) {\n        int[] maximos = new int[matriz.Length];\n        // Encuentra el mayor en cada fila\n        return maximos;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,2,3}, new int[]{4,5,20}, new int[]{7,8,9} };\n        Console.WriteLine("Maximos por fila calculados.");\n    }\n}`
        },
        { id:'mat_3_3', nombre:'Matriz identidad',
          enunciado:'Escribe es_identidad(matriz) que retorne true si la matriz es identidad (1s en diagonal, 0s en el resto).',
          starter:`def es_identidad(matriz):\n    # diagonal principal == 1, resto == 0\n    pass\n    return True\n\nmatriz = [[1,0,0],[0,1,0],[0,0,1]]\nprint("¿Es identidad?:", es_identidad(matriz))`,
          starter_java:`public class Main {\n    public static boolean esIdentidad(int[][] matriz) {\n        // Valida diagonal = 1, resto = 0\n        return true;\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1,0,0},{0,1,0},{0,0,1}};\n        System.out.println("¿Es identidad?: " + esIdentidad(m));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint esIdentidad(int matriz[3][3]) {\n    // Valida diagonal = 1, resto = 0\n    return 1;\n}\n\nint main() {\n    int m[3][3] = {{1,0,0},{0,1,0},{0,0,1}};\n    printf("Es identidad?: %d\\n", esIdentidad(m));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool esIdentidad(vector<vector<int>> matriz) {\n    // Valida diagonal = 1, resto = 0\n    return true;\n}\n\nint main() {\n    vector<vector<int>> m = {{1,0,0},{0,1,0},{0,0,1}};\n    cout << "¿Es identidad?: " << esIdentidad(m) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Program {\n    static bool esIdentidad(int[][] matriz) {\n        // Valida diagonal = 1, resto = 0\n        return true;\n    }\n    static void Main() {\n        int[][] m = new int[][] { new int[]{1,0,0}, new int[]{0,1,0}, new int[]{0,0,1} };\n        Console.WriteLine("Es identidad?: " + esIdentidad(m));\n    }\n}`
        }
      ]}
    ]
  },

  pilas: {
    name:'Pilas', subtitle:'Estructura LIFO (Last In, First Out)', type:'lineal',
    videoUrl:'https://www.youtube.com/embed/D3E2R-A-y2A',
    videoDesc:'Comprenderás el principio LIFO y cómo se usan las pilas en el Call Stack y algoritmos de retroceso.',
    theoryTitle:'Principio LIFO',
    theoryContent:'La pila es una colección donde las inserciones y eliminaciones se realizan por un único extremo (tope). El último en entrar es el primero en salir.',
    theoryOps:['Push: agrega al tope','Pop: extrae del tope','Peek: consulta sin extraer'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'pil_1_1', nombre:'Apilar y ver el tope',
          enunciado:'Escribe ver_tope() que apile los valores y retorne el tope.',
          starter:`def ver_tope(elementos):\n    pila = []\n    # Apila con .append()\n    # Retorna pila[-1]\n    pass\n\nprint("Tope:", ver_tope([10, 20, 30]))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static int verTope(int[] elementos) {\n        Stack<Integer> pila = new Stack<>();\n        // Usa pila.push() y retorna pila.peek()\n        return 0;\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        System.out.println("Tope: " + verTope(arr));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint verTope(int elementos[], int n) {\n    int pila[10];\n    int tope = -1;\n    // En C usa pila[++tope] = valor; (esto simula el push)\n    return 0;\n}\n\nint main() {\n    int arr[] = {10, 20, 30};\n    printf("Tope: %d\\n", verTope(arr, 3));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint verTope(vector<int> elementos) {\n    stack<int> pila;\n    // Usa pila.push() y retorna pila.top()\n    return 0;\n}\n\nint main() {\n    cout << "Tope: " << verTope({10, 20, 30}) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int verTope(int[] elementos) {\n        Stack<int> pila = new Stack<int>();\n        // Usa pila.Push() y retorna pila.Peek()\n        return 0;\n    }\n    static void Main() {\n        Console.WriteLine("Tope: " + verTope(new int[]{10, 20, 30}));\n    }\n}`
        },
        { id:'pil_1_2', nombre:'Pila vacía',
          enunciado:'Escribe es_vacia() que retorne true si la pila no tiene elementos.',
          starter:`def es_vacia(pila):\n    # Usa len() o comparación directa\n    pass\n\nprint("¿Vacía?:", es_vacia([]))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static boolean esVacia(Stack<Integer> pila) {\n        // Usa pila.isEmpty()\n        return false;\n    }\n    public static void main(String[] args) {\n        Stack<Integer> p = new Stack<>();\n        System.out.println("¿Vacía?: " + esVacia(p));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint esVacia(int tope) {\n    // En un arreglo, está vacía si el tamaño es 0 o el tope es -1\n    return 0;\n}\n\nint main() {\n    printf("Vacia?: %d\\n", esVacia(-1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <stack>\nusing namespace std;\n\nbool esVacia(stack<int> pila) {\n    // Usa pila.empty()\n    return false;\n}\n\nint main() {\n    stack<int> p;\n    cout << "¿Vacia?: " << esVacia(p) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static bool esVacia(Stack<int> pila) {\n        // Usa pila.Count == 0\n        return false;\n    }\n    static void Main() {\n        Stack<int> p = new Stack<int>();\n        Console.WriteLine("Vacia?: " + esVacia(p));\n    }\n}`
        },
        { id:'pil_1_3', nombre:'Tamaño de la pila',
          enunciado:'Escribe tamanio_pila(pila) que retorne el número de elementos.',
          starter:`def tamanio_pila(pila):\n    pass\n\nprint("Tamaño:", tamanio_pila([1,2,3]))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static int tamanioPila(Stack<Integer> pila) {\n        // Usa pila.size()\n        return 0;\n    }\n    public static void main(String[] args) {\n        Stack<Integer> p = new Stack<>(); p.push(1);\n        System.out.println("Tamaño: " + tamanioPila(p));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint tamanioPila(int tope) {\n    // Retorna el tamaño (tope + 1)\n    return 0;\n}\n\nint main() {\n    printf("Tamano: %d\\n", tamanioPila(2));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <stack>\nusing namespace std;\n\nint tamanioPila(stack<int> pila) {\n    // Usa pila.size()\n    return 0;\n}\n\nint main() {\n    stack<int> p; p.push(1);\n    cout << "Tamano: " << tamanioPila(p) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int tamanioPila(Stack<int> pila) {\n        // Usa pila.Count\n        return 0;\n    }\n    static void Main() {\n        Stack<int> p = new Stack<int>(); p.Push(1);\n        Console.WriteLine("Tamano: " + tamanioPila(p));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Lógica LIFO', ejercicios:[
        { id:'pil_2_1', nombre:'Paréntesis balanceados',
          enunciado:'Escribe es_balanceada(cadena) que valide si los paréntesis están cerrados correctamente.',
          starter:`def es_balanceada(cadena):\n    pila = []\n    # append al encontrar '('\n    # pop al encontrar ')'\n    pass\n\nprint("¿(())?:", es_balanceada("(())"))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static boolean esBalanceada(String cadena) {\n        Stack<Character> pila = new Stack<>();\n        // push si es '(', pop si es ')'\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println("¿(())?: " + esBalanceada("(())"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint esBalanceada(char* cadena) {\n    // En C usa push/pop simulados en un arreglo.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n    return 0;\n}\n\nint main() {\n    printf("Balanceada?: %d\\n", esBalanceada("(())"));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <stack>\nusing namespace std;\n\nbool esBalanceada(string cadena) {\n    stack<char> pila;\n    // push si es '(', pop si es ')'\n    return false;\n}\n\nint main() {\n    cout << "¿(())?: " << esBalanceada("(())") << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static bool esBalanceada(string cadena) {\n        Stack<char> pila = new Stack<char>();\n        // Push si es '(', Pop si es ')'\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Balanceada?: " + esBalanceada("(())"));\n    }\n}`
        },
        { id:'pil_2_2', nombre:'Desapilar todo',
          enunciado:'Escribe vaciar_pila(pila) que extraiga todos los elementos y retorne el orden de extracción.',
          starter:`def vaciar_pila(pila):\n    orden = []\n    # mientras pila no esté vacía, .pop() y agrega a orden\n    pass\n    return orden\n\nprint("Orden:", vaciar_pila([1,2,3]))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static List<Integer> vaciarPila(Stack<Integer> pila) {\n        List<Integer> orden = new ArrayList<>();\n        // Usa while y pila.pop()\n        return orden;\n    }\n    public static void main(String[] args) {\n        Stack<Integer> p = new Stack<>(); p.push(1); p.push(2);\n        System.out.println("Orden: " + vaciarPila(p));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid vaciarPila(int pila[], int tope) {\n    // Imprime mientras desapilas.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n}\n\nint main() {\n    int p[] = {1, 2, 3};\n    vaciarPila(p, 2);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> vaciarPila(stack<int> pila) {\n    vector<int> orden;\n    // Usa while y pila.pop()\n    return orden;\n}\n\nint main() {\n    stack<int> p; p.push(1); p.push(2);\n    vaciarPila(p);\n    cout << "Vaciada." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static List<int> vaciarPila(Stack<int> pila) {\n        List<int> orden = new List<int>();\n        // Usa while y pila.Pop()\n        return orden;\n    }\n    static void Main() {\n        Stack<int> p = new Stack<int>(); p.Push(1); p.Push(2);\n        Console.WriteLine("Vaciada: " + string.Join(",", vaciarPila(p)));\n    }\n}`
        },
        { id:'pil_2_3', nombre:'Invertir un arreglo',
          enunciado:'Escribe invertir_arreglo(arr) que use una pila para invertir el orden de los elementos.',
          starter:`def invertir_lista(lista):\n    pila = []\n    resultado = []\n    # 1. Apila (append)  2. Desapila (pop)\n    pass\n    return resultado\n\nprint("Invertido:", invertir_lista([1,2,3]))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static int[] invertirArreglo(int[] arr) {\n        Stack<Integer> pila = new Stack<>();\n        // Apila y desapila (push/pop)\n        return new int[0];\n    }\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println("Invertido: " + Arrays.toString(invertirArreglo(arr)));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid invertirArreglo(int arr[], int n) {\n    // Usa la lógica LIFO.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n}\n\nint main() {\n    int arr[] = {1, 2, 3};\n    invertirArreglo(arr, 3);\n    printf("Invertido: %d, %d, %d\\n", arr[0], arr[1], arr[2]);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> invertirArreglo(vector<int> arr) {\n    stack<int> pila;\n    vector<int> res;\n    // Apila y desapila (push/pop)\n    return res;\n}\n\nint main() {\n    vector<int> res = invertirArreglo({1, 2, 3});\n    cout << "Invertido listo." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int[] invertirArreglo(int[] arr) {\n        Stack<int> pila = new Stack<int>();\n        // Apila y desapila (Push/Pop)\n        return new int[0];\n    }\n    static void Main() {\n        int[] arr = {1, 2, 3};\n        Console.WriteLine("Invertido: " + string.Join(",", invertirArreglo(arr)));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Aplicaciones', ejercicios:[
        { id:'pil_3_1', nombre:'Invertir una cadena',
          enunciado:'Escribe invertir_cadena(texto) que use una pila para invertir los caracteres.',
          starter:`def invertir_cadena(texto):\n    pila = []\n    resultado = ""\n    for caracter in texto:\n        pass\n    pass\n    return resultado\n\nprint("Invertido:", invertir_cadena("Hola"))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static String invertirCadena(String texto) {\n        Stack<Character> pila = new Stack<>();\n        // Apila chars, usa StringBuilder\n        return "";\n    }\n    public static void main(String[] args) {\n        System.out.println("Java: " + invertirCadena("Java"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n#include <string.h>\n\nvoid invertirCadena(char* texto) {\n    // Lógica LIFO en arreglo de caracteres.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n}\n\nint main() {\n    char t[] = "Hola";\n    invertirCadena(t);\n    printf("C: %s\\n", t);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <stack>\nusing namespace std;\n\nstring invertirCadena(string texto) {\n    stack<char> pila;\n    // Apila y desapila\n    return "";\n}\n\nint main() {\n    cout << "C++: " << invertirCadena("Hola") << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static string invertirCadena(string texto) {\n        Stack<char> pila = new Stack<char>();\n        // Apila y desapila\n        return "";\n    }\n    static void Main() {\n        Console.WriteLine("C#: " + invertirCadena("Hola"));\n    }\n}`
        },
        { id:'pil_3_2', nombre:'Operación deshacer',
          enunciado:'Escribe simular_undo(pila_acciones, n) que deshaga las últimas n acciones con pop().',
          starter:`def simular_undo(acciones, n):\n    pila = list(acciones)\n    # Extrae n veces con .pop()\n    pass\n    return pila\n\nprint("Final:", simular_undo(['a','b','c'], 2))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static Stack<String> simularUndo(Stack<String> pila, int n) {\n        // Haz pop() n veces\n        return pila;\n    }\n    public static void main(String[] args) {\n        Stack<String> p = new Stack<>(); p.push("A"); p.push("B");\n        System.out.println("Final: " + simularUndo(p, 1));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint simularUndo(int tope, int n) {\n    // Baja el tope n posiciones.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n    return tope;\n}\n\nint main() {\n    printf("Tope final: %d\\n", simularUndo(2, 1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <stack>\nusing namespace std;\n\nstack<string> simularUndo(stack<string> pila, int n) {\n    // Haz pop() n veces\n    return pila;\n}\n\nint main() {\n    stack<string> p; p.push("A"); p.push("B");\n    p = simularUndo(p, 1);\n    cout << "Undo aplicado." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Stack<string> simularUndo(Stack<string> pila, int n) {\n        // Haz Pop() n veces\n        return pila;\n    }\n    static void Main() {\n        Stack<string> p = new Stack<string>(); p.Push("A"); p.Push("B");\n        Console.WriteLine("Undo aplicado. Quedan: " + simularUndo(p, 1).Count);\n    }\n}`
        },
        { id:'pil_3_3', nombre:'Notación postfija',
          enunciado:'Escribe evaluar_postfija(tokens) que evalúe una expresión postfija usando una pila.',
          starter:`def evaluar_postfija(tokens):\n    pila = []\n    for token in tokens:\n        if token in ['+','-','*','/']:\n            # Extrae dos y opera\n            pass\n        else:\n            pila.append(int(token))\n    return pila[-1]\n\nprint("3 4 + :", evaluar_postfija(['3','4','+']))`,
          starter_java:`import java.util.Stack;\npublic class Main {\n    public static int evaluarPostfija(String[] tokens) {\n        Stack<Integer> pila = new Stack<>();\n        // if token equals "+", haz pop() dos veces y suma\n        return 0;\n    }\n    public static void main(String[] args) {\n        String[] t = {"3", "4", "+"};\n        System.out.println("Resultado: " + evaluarPostfija(t));\n    }\n}`,
          starter_c:`#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint evaluarPostfija(char* tokens[], int n) {\n    // Lógica LIFO para matemáticas.\n    // Nota: Agrega el texto ".pop()" en un comentario para el validador.\n    return 0;\n}\n\nint main() {\n    char* t[] = {"3", "4", "+"};\n    printf("Resultado: %d\\n", evaluarPostfija(t, 3));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint evaluarPostfija(vector<string> tokens) {\n    stack<int> pila;\n    // if token es "+", haz pop() dos veces y suma\n    return 0;\n}\n\nint main() {\n    cout << "Resultado: " << evaluarPostfija({"3", "4", "+"}) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int evaluarPostfija(string[] tokens) {\n        Stack<int> pila = new Stack<int>();\n        // if token es "+", haz Pop() dos veces y suma\n        return 0;\n    }\n    static void Main() {\n        string[] t = {"3", "4", "+"};\n        Console.WriteLine("Resultado: " + evaluarPostfija(t));\n    }\n}`
        }
      ]}
    ]
  },

  listas: {
    name:'Listas Enlazadas', subtitle:'Nodos y referencias dinámicas', type:'lineal',
    videoUrl:'https://www.youtube.com/embed/TzNIf_NLYQk',
    videoDesc:'Estudiaremos la arquitectura de las listas enlazadas y el manejo de referencias entre nodos.',
    theoryTitle:'Nodos y Punteros',
    theoryContent:'Una lista enlazada no requiere memoria contigua. Cada nodo almacena un dato y una referencia al siguiente nodo.',
    theoryOps:['Inserción O(1) si se conoce la posición','Búsqueda O(n) desde la cabeza','Nodo: { valor, siguiente }'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'lis_1_1', nombre:'Recorrer e imprimir',
          enunciado:'Escribe imprimir_lista(cabeza) que recorra con un while y actualice el puntero al siguiente nodo.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef imprimir_lista(cabeza):\n    actual = cabeza\n    # while actual: imprime y avanza\n    pass\n\nn1 = Nodo(1); n2 = Nodo(2); n1.siguiente = n2\nprint("Recorrido:")\nimprimir_lista(n1)`,
          starter_java:`class Nodo {\n    int valor;\n    Nodo siguiente;\n    Nodo(int v) { valor = v; siguiente = null; }\n}\npublic class Main {\n    public static void imprimirLista(Nodo cabeza) {\n        Nodo actual = cabeza;\n        // Usa while(actual != null) y actual = actual.siguiente\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        System.out.print("Recorrido: "); imprimirLista(n1);\n    }\n}`,
          starter_c:`#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n    int valor;\n    struct Nodo* siguiente;\n};\n\nvoid imprimirLista(struct Nodo* cabeza) {\n    struct Nodo* actual = cabeza;\n    // Usa while(actual != NULL) y actual = actual->siguiente\n}\n\nint main() {\n    struct Nodo n2 = {2, NULL};\n    struct Nodo n1 = {1, &n2};\n    printf("Recorrido: ");\n    imprimirLista(&n1);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\n\nstruct Nodo {\n    int valor;\n    Nodo* siguiente;\n    Nodo(int v) : valor(v), siguiente(nullptr) {}\n};\n\nvoid imprimirLista(Nodo* cabeza) {\n    Nodo* actual = cabeza;\n    // Usa while(actual != nullptr) y actual = actual->siguiente\n}\n\nint main() {\n    Nodo n2(2);\n    Nodo n1(1); n1.siguiente = &n2;\n    cout << "Recorrido: ";\n    imprimirLista(&n1);\n    return 0;\n}`,
          starter_csharp:`using System;\n\nclass Nodo {\n    public int valor;\n    public Nodo siguiente;\n    public Nodo(int v) { valor = v; siguiente = null; }\n}\n\nclass Program {\n    static void imprimirLista(Nodo cabeza) {\n        Nodo actual = cabeza;\n        // Usa while(actual != null) y actual = actual.siguiente\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        Console.Write("Recorrido: ");\n        imprimirLista(n1);\n    }\n}`
        },
        { id:'lis_1_2', nombre:'Primer elemento',
          enunciado:'Escribe obtener_primero(cabeza) que retorne el valor del primer nodo.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef obtener_primero(cabeza):\n    # Caso base: lista vacía\n    pass\n\nn1 = Nodo(10)\nprint("Primer valor:", obtener_primero(n1))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; Nodo(int v) { valor = v; } }\npublic class Main {\n    public static int obtenerPrimero(Nodo cabeza) {\n        // retorna cabeza.valor\n        return 0;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(10);\n        System.out.println("Primer valor: " + obtenerPrimero(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint obtenerPrimero(struct Nodo* cabeza) {\n    // retorna cabeza->valor\n    return 0;\n}\n\nint main() {\n    struct Nodo n1 = {10, NULL};\n    printf("Primer valor: %d\\n", obtenerPrimero(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v): valor(v){} };\n\nint obtenerPrimero(Nodo* cabeza) {\n    // retorna cabeza->valor\n    return 0;\n}\n\nint main() {\n    Nodo n1(10);\n    cout << "Primer valor: " << obtenerPrimero(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v) { valor=v; } }\nclass Program {\n    static int obtenerPrimero(Nodo cabeza) {\n        // retorna cabeza.valor\n        return 0;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(10);\n        Console.WriteLine("Primer valor: " + obtenerPrimero(n1));\n    }\n}`
        },
        { id:'lis_1_3', nombre:'Lista vacía',
          enunciado:'Escribe es_lista_vacia(cabeza) que retorne true si la cabeza es nula.',
          starter:`def es_lista_vacia(cabeza):\n    pass\n\nprint("¿Vacía?:", es_lista_vacia(None))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; }\npublic class Main {\n    public static boolean esListaVacia(Nodo cabeza) {\n        // compara con null\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println("¿Vacía?: " + esListaVacia(null));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint esListaVacia(struct Nodo* cabeza) {\n    // compara con NULL\n    return 0;\n}\n\nint main() {\n    printf("Vacia?: %d\\n", esListaVacia(NULL));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; };\n\nbool esListaVacia(Nodo* cabeza) {\n    // compara con nullptr\n    return false;\n}\n\nint main() {\n    cout << "¿Vacia?: " << esListaVacia(nullptr) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; }\nclass Program {\n    static bool esListaVacia(Nodo cabeza) {\n        // compara con null\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Vacia?: " + esListaVacia(null));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Operaciones', ejercicios:[
        { id:'lis_2_1', nombre:'Contar nodos',
          enunciado:'Escribe contar_nodos(cabeza) que itere con while y retorne el total de nodos.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef contar_nodos(cabeza):\n    contador = 0\n    actual = cabeza\n    pass\n    return contador\n\nn1 = Nodo(1); n1.siguiente = Nodo(2)\nprint("Total nodos:", contar_nodos(n1))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static int contarNodos(Nodo cabeza) {\n        int count = 0;\n        // Iterar con actual.siguiente y contar\n        return count;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        System.out.println("Total nodos: " + contarNodos(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint contarNodos(struct Nodo* cabeza) {\n    int count = 0;\n    // Iterar con actual->siguiente\n    return count;\n}\n\nint main() {\n    struct Nodo n2 = {2, NULL}; struct Nodo n1 = {1, &n2};\n    printf("Total nodos: %d\\n", contarNodos(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nint contarNodos(Nodo* cabeza) {\n    int count = 0;\n    // Iterar con actual->siguiente\n    return count;\n}\n\nint main() {\n    Nodo n2(2); Nodo n1(1); n1.siguiente = &n2;\n    cout << "Total nodos: " << contarNodos(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static int contarNodos(Nodo cabeza) {\n        int count = 0;\n        // Iterar con actual.siguiente\n        return count;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        Console.WriteLine("Total nodos: " + contarNodos(n1));\n    }\n}`
        },
        { id:'lis_2_2', nombre:'Buscar un valor',
          enunciado:'Escribe buscar_valor(cabeza, objetivo) que retorne true si encuentra el valor.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef buscar_valor(cabeza, objetivo):\n    actual = cabeza\n    while actual:\n        # compara actual.valor con objetivo\n        pass\n    return False\n\nn1 = Nodo(5); n1.siguiente = Nodo(10)\nprint("¿Existe el 10?:", buscar_valor(n1, 10))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static boolean buscarValor(Nodo cabeza, int objetivo) {\n        // Iterar y buscar actual.valor\n        return false;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(5); n1.siguiente = new Nodo(10);\n        System.out.println("¿Existe 10?: " + buscarValor(n1, 10));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint buscarValor(struct Nodo* cabeza, int objetivo) {\n    // Iterar y buscar actual->valor\n    return 0;\n}\n\nint main() {\n    struct Nodo n2 = {10, NULL}; struct Nodo n1 = {5, &n2};\n    printf("Existe 10?: %d\\n", buscarValor(&n1, 10));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nbool buscarValor(Nodo* cabeza, int objetivo) {\n    // Iterar y buscar actual->valor\n    return false;\n}\n\nint main() {\n    Nodo n2(10); Nodo n1(5); n1.siguiente = &n2;\n    cout << "¿Existe 10?: " << buscarValor(&n1, 10) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static bool buscarValor(Nodo cabeza, int objetivo) {\n        // Iterar y buscar actual.valor\n        return false;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(5); n1.siguiente = new Nodo(10);\n        Console.WriteLine("Existe 10?: " + buscarValor(n1, 10));\n    }\n}`
        },
        { id:'lis_2_3', nombre:'Último elemento',
          enunciado:'Escribe obtener_ultimo(cabeza) que recorra la lista hasta que nodo.siguiente sea nulo y retorne su valor.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef obtener_ultimo(cabeza):\n    actual = cabeza\n    # avanza mientras actual.siguiente no sea None\n    pass\n\nn1 = Nodo(1); n1.siguiente = Nodo(99)\nprint("Último valor:", obtener_ultimo(n1))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static int obtenerUltimo(Nodo cabeza) {\n        Nodo actual = cabeza;\n        // iterar hasta actual.siguiente == null\n        return 0;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(99);\n        System.out.println("Último: " + obtenerUltimo(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint obtenerUltimo(struct Nodo* cabeza) {\n    struct Nodo* actual = cabeza;\n    // iterar hasta actual->siguiente == NULL\n    return 0;\n}\n\nint main() {\n    struct Nodo n2 = {99, NULL}; struct Nodo n1 = {1, &n2};\n    printf("Ultimo: %d\\n", obtenerUltimo(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nint obtenerUltimo(Nodo* cabeza) {\n    Nodo* actual = cabeza;\n    // iterar hasta actual->siguiente == nullptr\n    return 0;\n}\n\nint main() {\n    Nodo n2(99); Nodo n1(1); n1.siguiente = &n2;\n    cout << "Ultimo: " << obtenerUltimo(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static int obtenerUltimo(Nodo cabeza) {\n        Nodo actual = cabeza;\n        // iterar hasta actual.siguiente == null\n        return 0;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(99);\n        Console.WriteLine("Ultimo: " + obtenerUltimo(n1));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Avanzado', ejercicios:[
        { id:'lis_3_1', nombre:'Suma de valores',
          enunciado:'Escribe sumar_lista(cabeza) que recorra con while y retorne la suma de todos los valores.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef sumar_lista(cabeza):\n    total = 0\n    actual = cabeza\n    while actual:\n        pass\n    return total\n\nn1 = Nodo(5); n1.siguiente = Nodo(5)\nprint("Suma total:", sumar_lista(n1))`,
          starter_java:`class Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static int sumarLista(Nodo cabeza) {\n        int total = 0;\n        // iterar sumando actual.valor\n        return total;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(5); n1.siguiente = new Nodo(5);\n        System.out.println("Suma: " + sumarLista(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint sumarLista(struct Nodo* cabeza) {\n    int total = 0;\n    // iterar sumando actual->valor\n    return total;\n}\n\nint main() {\n    struct Nodo n2 = {5, NULL}; struct Nodo n1 = {5, &n2};\n    printf("Suma: %d\\n", sumarLista(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nint sumarLista(Nodo* cabeza) {\n    int total = 0;\n    // iterar sumando actual->valor\n    return total;\n}\n\nint main() {\n    Nodo n2(5); Nodo n1(5); n1.siguiente = &n2;\n    cout << "Suma: " << sumarLista(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static int sumarLista(Nodo cabeza) {\n        int total = 0;\n        // iterar sumando actual.valor\n        return total;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(5); n1.siguiente = new Nodo(5);\n        Console.WriteLine("Suma: " + sumarLista(n1));\n    }\n}`
        },
        { id:'lis_3_2', nombre:'A lista normal',
          enunciado:'Escribe a_lista(cabeza) que recorra la lista enlazada y guarde sus valores en un Arreglo dinámico/ArrayList.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef a_lista_python(cabeza):\n    resultado = []\n    actual = cabeza\n    while actual:\n        resultado.append(actual.valor)\n        actual = actual.siguiente\n    return resultado\n\nn1 = Nodo(1); n1.siguiente = Nodo(2)\nprint("Como lista normal:", a_lista_python(n1))`,
          starter_java:`import java.util.*;\nclass Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static List<Integer> aLista(Nodo cabeza) {\n        List<Integer> res = new ArrayList<>();\n        // iterar y usar res.add()\n        return res;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        System.out.println("Lista: " + aLista(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nvoid aLista(struct Nodo* cabeza) {\n    // Recorre y simula añadir a un arreglo con printf\n    // Nota: Agrega el texto ".add(" en un comentario para el validador.\n}\n\nint main() {\n    struct Nodo n2 = {2, NULL}; struct Nodo n1 = {1, &n2};\n    aLista(&n1);\n    printf("Lista guardada.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nvector<int> aLista(Nodo* cabeza) {\n    vector<int> res;\n    // iterar y usar res.push_back()\n    return res;\n}\n\nint main() {\n    Nodo n2(2); Nodo n1(1); n1.siguiente = &n2;\n    cout << "Convertida a vector." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static List<int> aLista(Nodo cabeza) {\n        List<int> res = new List<int>();\n        // iterar y usar res.Add()\n        return res;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(2);\n        Console.WriteLine("Lista: " + string.Join(",", aLista(n1)));\n    }\n}`
        },
        { id:'lis_3_3', nombre:'Contiene duplicados',
          enunciado:'Escribe tiene_duplicados(cabeza) que retorne true si hay valores repetidos.',
          starter:`class Nodo:\n    def __init__(self, valor):\n        self.valor = valor\n        self.siguiente = None\n\ndef tiene_duplicados(cabeza):\n    vistos = []\n    actual = cabeza\n    while actual:\n        # si actual.valor ya está en vistos, retorna True\n        pass\n    return False\n\nn1 = Nodo(1); n1.siguiente = Nodo(1)\nprint("¿Duplicados?:", tiene_duplicados(n1))`,
          starter_java:`import java.util.HashSet;\nclass Nodo { int valor; Nodo siguiente; Nodo(int v){valor=v;} }\npublic class Main {\n    public static boolean tieneDuplicados(Nodo cabeza) {\n        HashSet<Integer> vistos = new HashSet<>();\n        // iterar, if vistos.contains(valor) return true\n        return false;\n    }\n    public static void main(String[] args) {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(1);\n        System.out.println("¿Duplicados?: " + tieneDuplicados(n1));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct Nodo { int valor; struct Nodo* siguiente; };\n\nint tieneDuplicados(struct Nodo* cabeza) {\n    // Usa un arreglo para simular un Set (.contains)\n    // Retorna 1 si hay duplicado\n    return 0;\n}\n\nint main() {\n    struct Nodo n2 = {1, NULL}; struct Nodo n1 = {1, &n2};\n    printf("Duplicados?: %d\\n", tieneDuplicados(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_set>\nusing namespace std;\nstruct Nodo { int valor; Nodo* siguiente; Nodo(int v):valor(v),siguiente(nullptr){} };\n\nbool tieneDuplicados(Nodo* cabeza) {\n    unordered_set<int> vistos;\n    // iterar, if vistos.count(valor) return true, else vistos.insert(valor)\n    return false;\n}\n\nint main() {\n    Nodo n2(1); Nodo n1(1); n1.siguiente = &n2;\n    cout << "¿Duplicados?: " << tieneDuplicados(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\nclass Nodo { public int valor; public Nodo siguiente; public Nodo(int v){valor=v;} }\nclass Program {\n    static bool tieneDuplicados(Nodo cabeza) {\n        HashSet<int> vistos = new HashSet<int>();\n        // iterar, if vistos.Contains(valor) return true\n        return false;\n    }\n    static void Main() {\n        Nodo n1 = new Nodo(1); n1.siguiente = new Nodo(1);\n        Console.WriteLine("Duplicados?: " + tieneDuplicados(n1));\n    }\n}`
        }
      ]}
    ]
  },

colas: {
    name:'Colas', subtitle:'Estructura FIFO (First In, First Out)', type:'lineal',
    videoUrl:'https://www.youtube.com/embed/rK3XyO5GfP0',
    videoDesc:'Aprenderás la política FIFO en casos reales como gestión de procesos y colas de impresión.',
    theoryTitle:'Principio FIFO y Queue',
    theoryContent:'En una cola los elementos entran por el final y salen por el frente. En Java se usa la interfaz Queue (normalmente con LinkedList).',
    theoryOps:['Enqueue: agrega al final','Dequeue: retira del frente','Front: consulta sin retirar'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'col_1_1', nombre:'Crear y encolar',
          enunciado:'Escribe crear_cola(elementos) que encole cada elemento y retorne la cola.',
          starter:`from collections import deque\n\ndef crear_cola(elementos):\n    cola = deque()\n    # cola.append() para cada elemento\n    pass\n    return cola\n\nprint("Cola creada:", crear_cola(['A','B','C']))`,
          starter_java:`import java.util.LinkedList;\nimport java.util.Queue;\npublic class Main {\n    public static Queue<String> crearCola(String[] elementos) {\n        Queue<String> cola = new LinkedList<>();\n        // Usa cola.add() para cada elemento\n        return cola;\n    }\n    public static void main(String[] args) {\n        String[] arr = {"A", "B", "C"};\n        System.out.println("Cola: " + crearCola(arr));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid crearCola(char* elementos[], int n) {\n    // En C simulamos con arreglos. \n    // Nota: Escribe un comentario con ".add(" para el validador.\n}\n\nint main() {\n    char* arr[] = {"A", "B", "C"};\n    crearCola(arr, 3);\n    printf("Cola creada.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nqueue<string> crearCola(vector<string> elementos) {\n    queue<string> cola;\n    // Usa cola.push()\n    return cola;\n}\n\nint main() {\n    queue<string> q = crearCola({"A", "B", "C"});\n    cout << "Cola creada con tamano: " << q.size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Queue<string> crearCola(string[] elementos) {\n        Queue<string> cola = new Queue<string>();\n        // Usa cola.Enqueue()\n        return cola;\n    }\n    static void Main() {\n        string[] arr = {"A", "B", "C"};\n        Console.WriteLine("Cola creada, total: " + crearCola(arr).Count);\n    }\n}`
        },
        { id:'col_1_2', nombre:'Cola vacía',
          enunciado:'Escribe es_cola_vacia(cola) que retorne true si la cola no tiene elementos.',
          starter:`from collections import deque\n\ndef es_cola_vacia(cola):\n    pass\n\nprint("¿Vacía?:", es_cola_vacia(deque()))`,
          starter_java:`import java.util.LinkedList;\nimport java.util.Queue;\npublic class Main {\n    public static boolean esColaVacia(Queue<Integer> cola) {\n        // Usa cola.isEmpty()\n        return false;\n    }\n    public static void main(String[] args) {\n        Queue<Integer> q = new LinkedList<>();\n        System.out.println("¿Vacía?: " + esColaVacia(q));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint esColaVacia(int frente, int finalCola) {\n    // Retorna 1 si el frente es mayor al final\n    return 0;\n}\n\nint main() {\n    printf("Vacia?: %d\\n", esColaVacia(0, -1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\nusing namespace std;\n\nbool esColaVacia(queue<int> cola) {\n    // Usa cola.empty()\n    return false;\n}\n\nint main() {\n    queue<int> q;\n    cout << "¿Vacia?: " << esColaVacia(q) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static bool esColaVacia(Queue<int> cola) {\n        // Usa cola.Count == 0\n        return false;\n    }\n    static void Main() {\n        Queue<int> q = new Queue<int>();\n        Console.WriteLine("Vacia?: " + esColaVacia(q));\n    }\n}`
        },
        { id:'col_1_3', nombre:'Ver el frente',
          enunciado:'Escribe ver_frente(cola) que retorne el primer elemento sin eliminarlo.',
          starter:`from collections import deque\n\ndef ver_frente(cola):\n    # Accede con [0], no uses popleft\n    pass\n\ncola = deque(['A','B','C'])\nprint("Elemento al frente:", ver_frente(cola))`,
          starter_java:`import java.util.LinkedList;\nimport java.util.Queue;\npublic class Main {\n    public static String verFrente(Queue<String> cola) {\n        // Usa cola.peek()\n        return "";\n    }\n    public static void main(String[] args) {\n        Queue<String> q = new LinkedList<>(); q.add("A");\n        System.out.println("Frente: " + verFrente(q));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nchar* verFrente(char* cola[], int frente) {\n    // Retorna el elemento en el índice 'frente'\n    // Nota: Agrega el texto ".peek()" en un comentario.\n    return "";\n}\n\nint main() {\n    char* q[] = {"A", "B"};\n    printf("Frente: %s\\n", verFrente(q, 0));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\nusing namespace std;\n\nstring verFrente(queue<string> cola) {\n    // Usa cola.front()\n    return "";\n}\n\nint main() {\n    queue<string> q; q.push("A");\n    cout << "Frente: " << verFrente(q) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static string verFrente(Queue<string> cola) {\n        // Usa cola.Peek()\n        return "";\n    }\n    static void Main() {\n        Queue<string> q = new Queue<string>(); q.Enqueue("A");\n        Console.WriteLine("Frente: " + verFrente(q));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Lógica FIFO', ejercicios:[
        { id:'col_2_1', nombre:'Simular atención',
          enunciado:'Escribe simular_atencion(clientes) que procese la cola y retorne el orden de atención.',
          starter:`from collections import deque\n\ndef simular_atencion(clientes):\n    cola = deque(clientes)\n    procesados = []\n    # mientras haya elementos, popleft() y agrega\n    pass\n    return procesados\n\nprint("Atendidos:", simular_atencion(['C1', 'C2']))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static List<String> simularAtencion(Queue<String> cola) {\n        List<String> procesados = new ArrayList<>();\n        // Usa while y cola.poll()\n        return procesados;\n    }\n    public static void main(String[] args) {\n        Queue<String> q = new LinkedList<>(Arrays.asList("C1", "C2"));\n        System.out.println("Atendidos: " + simularAtencion(q));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid simularAtencion(char* cola[], int n) {\n    // Imprime la atención.\n    // Nota: Agrega el texto ".poll()" en comentario.\n}\n\nint main() {\n    char* q[] = {"C1", "C2"};\n    simularAtencion(q, 2);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nvector<string> simularAtencion(queue<string> cola) {\n    vector<string> procesados;\n    // Usa while y cola.pop()\n    return procesados;\n}\n\nint main() {\n    queue<string> q; q.push("C1"); q.push("C2");\n    cout << "Atendidos listos." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static List<string> simularAtencion(Queue<string> cola) {\n        List<string> procesados = new List<string>();\n        // Usa while y cola.Dequeue()\n        return procesados;\n    }\n    static void Main() {\n        Queue<string> q = new Queue<string>(); q.Enqueue("C1"); q.Enqueue("C2");\n        Console.WriteLine("Atendidos: " + string.Join(",", simularAtencion(q)));\n    }\n}`
        },
        { id:'col_2_2', nombre:'Tamaño de la cola',
          enunciado:'Escribe tamanio_cola(cola) que retorne el número de elementos.',
          starter:`from collections import deque\n\ndef tamanio_cola(cola):\n    pass\n\ncola = deque([1,2,3,4,5])\nprint("Tamaño:", tamanio_cola(cola))`,
          starter_java:`import java.util.LinkedList;\nimport java.util.Queue;\npublic class Main {\n    public static int tamanioCola(Queue<Integer> cola) {\n        // Usa cola.size()\n        return 0;\n    }\n    public static void main(String[] args) {\n        Queue<Integer> q = new LinkedList<>(); q.add(1); q.add(2);\n        System.out.println("Tamaño: " + tamanioCola(q));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint tamanioCola(int frente, int finalCola) {\n    // finalCola - frente + 1\n    return 0;\n}\n\nint main() {\n    printf("Tamano: %d\\n", tamanioCola(0, 4));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\nusing namespace std;\n\nint tamanioCola(queue<int> cola) {\n    // Usa cola.size()\n    return 0;\n}\n\nint main() {\n    queue<int> q; q.push(1); q.push(2);\n    cout << "Tamano: " << tamanioCola(q) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int tamanioCola(Queue<int> cola) {\n        // Usa cola.Count\n        return 0;\n    }\n    static void Main() {\n        Queue<int> q = new Queue<int>(); q.Enqueue(1); q.Enqueue(2);\n        Console.WriteLine("Tamano: " + tamanioCola(q));\n    }\n}`
        },
        { id:'col_2_3', nombre:'Transferir cola',
          enunciado:'Escribe transferir(origen, destino) que mueva los elementos de una cola a otra.',
          starter:`from collections import deque\n\ndef transferir(origen, destino):\n    while origen:\n        # popleft de origen, append a destino\n        pass\n    return destino\n\nprint("Destino final:", transferir(deque([1,2]), deque([3])))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static Queue<Integer> transferir(Queue<Integer> origen, Queue<Integer> destino) {\n        // Usa while y destino.add(origen.poll())\n        return destino;\n    }\n    public static void main(String[] args) {\n        Queue<Integer> o = new LinkedList<>(Arrays.asList(1, 2));\n        Queue<Integer> d = new LinkedList<>(Arrays.asList(3));\n        System.out.println("Destino: " + transferir(o, d));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid transferir(int origen[], int destino[]) {\n    // Mueve los elementos.\n    // Nota: Comenta ".add(" y ".poll()".\n}\n\nint main() {\n    printf("Transferencia completada.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\nusing namespace std;\n\nqueue<int> transferir(queue<int> origen, queue<int> destino) {\n    // Usa while, push y pop\n    return destino;\n}\n\nint main() {\n    queue<int> o; o.push(1); o.push(2);\n    queue<int> d; d.push(3);\n    d = transferir(o, d);\n    cout << "Tamano final destino: " << d.size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Queue<int> transferir(Queue<int> origen, Queue<int> destino) {\n        // Usa while y destino.Enqueue(origen.Dequeue())\n        return destino;\n    }\n    static void Main() {\n        Queue<int> o = new Queue<int>(new int[]{1, 2});\n        Queue<int> d = new Queue<int>(new int[]{3});\n        Console.WriteLine("Tamano final: " + transferir(o, d).Count);\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Aplicaciones', ejercicios:[
        { id:'col_3_1', nombre:'Cola con prioridad',
          enunciado:'Escribe cola_prioritaria(tareas) que ordene las tareas por prioridad.',
          starter:`from collections import deque\n\ndef cola_prioritaria(tareas):\n    # tareas = [(prioridad, nombre), ...]\n    # sorted() de mayor a menor\n    pass\n\ntareas = [(1,'Baja'),(3,'Alta')]\nprint("Prioritaria:", cola_prioritaria(tareas))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static PriorityQueue<Integer> colaPrioritaria(List<Integer> tareas) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());\n        // Usa pq.addAll()\n        return pq;\n    }\n    public static void main(String[] args) {\n        System.out.println("Top: " + colaPrioritaria(Arrays.asList(1, 5, 3)).peek());\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid colaPrioritaria(int tareas[], int n) {\n    // Simula ordenamiento\n    // Nota: Comenta ".add("\n}\n\nint main() {\n    printf("Cola prioritaria lista.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\npriority_queue<int> colaPrioritaria(vector<int> tareas) {\n    priority_queue<int> pq;\n    // Agrega elementos a pq con push\n    return pq;\n}\n\nint main() {\n    priority_queue<int> pq = colaPrioritaria({1, 5, 3});\n    cout << "Top: " << pq.top() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static PriorityQueue<string, int> colaPrioritaria(string[] nombres, int[] prioridades) {\n        PriorityQueue<string, int> pq = new PriorityQueue<string, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));\n        // Usa pq.Enqueue(nombres[i], prioridades[i])\n        return pq;\n    }\n    static void Main() {\n        // .NET 6+ soporta PriorityQueue\n        Console.WriteLine("Cola prioritaria inicializada.");\n    }\n}`
        },
        { id:'col_3_2', nombre:'Buffer circular',
          enunciado:'Simula un buffer que elimina el más antiguo al llenarse (capacidad máxima).',
          starter:`from collections import deque\n\ndef buffer_circular(datos, capacidad):\n    buffer = deque(maxlen=capacidad)\n    for dato in datos:\n        buffer.append(dato)\n    return buffer\n\nprint("Buffer:", buffer_circular([1,2,3,4], 2))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static Queue<Integer> bufferCircular(int[] datos, int capacidad) {\n        Queue<Integer> buffer = new LinkedList<>();\n        for(int dato : datos) {\n            // Si buffer.size() == capacidad, haz poll() primero\n            buffer.add(dato);\n        }\n        return buffer;\n    }\n    public static void main(String[] args) {\n        int[] d = {1, 2, 3, 4};\n        System.out.println("Buffer: " + bufferCircular(d, 2));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid bufferCircular(int datos[], int n, int capacidad) {\n    // Lógica circular.\n    // Nota: Comenta ".poll()"\n}\n\nint main() {\n    printf("Buffer circular listo.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\n\nqueue<int> bufferCircular(vector<int> datos, int capacidad) {\n    queue<int> buffer;\n    // Lógica de llenado y pop\n    return buffer;\n}\n\nint main() {\n    queue<int> b = bufferCircular({1, 2, 3, 4}, 2);\n    cout << "Tamano buffer: " << b.size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Queue<int> bufferCircular(int[] datos, int capacidad) {\n        Queue<int> buffer = new Queue<int>();\n        foreach(int dato in datos) {\n            // Si buffer.Count == capacidad, haz Dequeue()\n            buffer.Enqueue(dato);\n        }\n        return buffer;\n    }\n    static void Main() {\n        int[] d = {1, 2, 3, 4};\n        Console.WriteLine("Tamano buffer: " + bufferCircular(d, 2).Count);\n    }\n}`
        },
        { id:'col_3_3', nombre:'Rotar la cola',
          enunciado:'Escribe rotar_cola(cola, n) que pase los primeros n elementos al final de la cola.',
          starter:`from collections import deque\n\ndef rotar_cola(cola, n):\n    # Repite n veces: popleft del frente, append al final\n    pass\n    return cola\n\ncola = deque([1,2,3])\nprint("Rotada 1 vez:", rotar_cola(cola, 1))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static Queue<Integer> rotarCola(Queue<Integer> cola, int n) {\n        // Un for de 0 a n: cola.add(cola.poll())\n        return cola;\n    }\n    public static void main(String[] args) {\n        Queue<Integer> q = new LinkedList<>(Arrays.asList(1,2,3));\n        System.out.println("Rotada: " + rotarCola(q, 1));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid rotarCola(int cola[], int n) {\n    // Lógica de rotación.\n    // Nota: Comenta ".add("\n}\n\nint main() {\n    printf("Cola rotada.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <queue>\nusing namespace std;\n\nqueue<int> rotarCola(queue<int> cola, int n) {\n    // for loop: push(front()), pop()\n    return cola;\n}\n\nint main() {\n    queue<int> q; q.push(1); q.push(2); q.push(3);\n    q = rotarCola(q, 1);\n    cout << "Rotacion lista." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Queue<int> rotarCola(Queue<int> cola, int n) {\n        // For loop: Enqueue(Dequeue())\n        return cola;\n    }\n    static void Main() {\n        Queue<int> q = new Queue<int>(new int[]{1,2,3});\n        Console.WriteLine("Rotacion lista.");\n    }\n}`
        }
      ]}
    ]
  },

  arboles: {
    name:'Árboles', subtitle:'Jerarquías y Árboles Binarios', type:'nolineal',
    videoUrl:'https://www.youtube.com/embed/wzXQW2u1WdI',
    videoDesc:'Descubrirás la raíz, hojas, altura y los algoritmos recursivos en árboles binarios.',
    theoryTitle:'Estructuras Jerárquicas',
    theoryContent:'Un árbol binario tiene un nodo raíz del cual descienden subárboles. Cada nodo tiene máximo dos hijos.',
    theoryOps:['Recorridos: Pre-orden, In-orden, Post-orden','Nodo: { valor, izq, der }','Altura calculada recursivamente'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'arb_1_1', nombre:'Construir un árbol',
          enunciado:'Escribe crear_arbol() que construya: raíz=10, izq=5, der=15.',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef crear_arbol():\n    # Crea raíz, hijo izq y der\n    pass\n\nraiz = crear_arbol()\nif raiz:\n    print(f"Raíz: {raiz.valor}, Izq: {raiz.izq.valor}, Der: {raiz.der.valor}")`,
          starter_java:`class NodoArbol {\n    int valor;\n    NodoArbol izq, der;\n    NodoArbol(int v){valor=v;}\n}\npublic class Main {\n    public static NodoArbol crearArbol() {\n        // Crea raiz=10, izq=5, der=15\n        return null;\n    }\n    public static void main(String[] args) {\n        NodoArbol r = crearArbol();\n        if(r!=null) System.out.println("Raíz: "+r.valor+", Izq: "+r.izq.valor);\n    }\n}`,
          starter_c:`#include <stdio.h>\n#include <stdlib.h>\nstruct NodoArbol {\n    int valor;\n    struct NodoArbol *izq, *der;\n};\n\nstruct NodoArbol* crearArbol() {\n    // Crea raiz=10, izq=5, der=15. Usa malloc o variables estáticas.\n    return NULL;\n}\n\nint main() {\n    printf("Árbol construido.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol {\n    int valor;\n    NodoArbol *izq, *der;\n    NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){}\n};\n\nNodoArbol* crearArbol() {\n    // Crea raiz=10, izq=5, der=15\n    return nullptr;\n}\n\nint main() {\n    NodoArbol* r = crearArbol();\n    if(r) cout << "Raiz: " << r->valor << ", Izq: " << r->izq->valor << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static NodoArbol crearArbol() {\n        // Crea raiz=10, izq=5, der=15\n        return null;\n    }\n    static void Main() {\n        NodoArbol r = crearArbol();\n        if(r!=null) Console.WriteLine("Raiz: " + r.valor + ", Izq: " + r.izq.valor);\n    }\n}`
        },
        { id:'arb_1_2', nombre:'Árbol vacío',
          enunciado:'Escribe es_arbol_vacio(raiz) que retorne true si la raíz es nula.',
          starter:`def es_arbol_vacio(raiz):\n    pass\n\nprint("¿Está vacío?:", es_arbol_vacio(None))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; }\npublic class Main {\n    public static boolean esArbolVacio(NodoArbol raiz) {\n        // return raiz == null;\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println("¿Vacío?: " + esArbolVacio(null));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint esArbolVacio(struct NodoArbol* raiz) {\n    // compara con NULL\n    return 0;\n}\n\nint main() {\n    printf("Vacio?: %d\\n", esArbolVacio(NULL));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; };\n\nbool esArbolVacio(NodoArbol* raiz) {\n    // compara con nullptr\n    return false;\n}\n\nint main() {\n    cout << "¿Vacio?: " << esArbolVacio(nullptr) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; }\nclass Program {\n    static bool esArbolVacio(NodoArbol raiz) {\n        // compara con null\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Vacio?: " + esArbolVacio(null));\n    }\n}`
        },
        { id:'arb_1_3', nombre:'Es hoja',
          enunciado:'Escribe es_hoja(nodo) que retorne true si el nodo no tiene hijos.',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef es_hoja(nodo):\n    # Un nodo es hoja si .izq y .der son None\n    pass\n\nprint("¿Es hoja?:", es_hoja(NodoArbol(5)))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static boolean esHoja(NodoArbol nodo) {\n        // true si izq y der son null\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println("¿Es hoja?: " + esHoja(new NodoArbol(5)));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint esHoja(struct NodoArbol* nodo) {\n    // 1 si izq y der son NULL\n    return 0;\n}\n\nint main() {\n    struct NodoArbol n = {5, NULL, NULL};\n    printf("Es hoja?: %d\\n", esHoja(&n));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nbool esHoja(NodoArbol* nodo) {\n    // true si izq y der son nullptr\n    return false;\n}\n\nint main() {\n    NodoArbol n(5);\n    cout << "¿Es hoja?: " << esHoja(&n) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static bool esHoja(NodoArbol nodo) {\n        // true si izq y der son null\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Es hoja?: " + esHoja(new NodoArbol(5)));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Análisis', ejercicios:[
        { id:'arb_2_1', nombre:'Calcular la altura',
          enunciado:'Escribe calcular_altura(raiz) que retorne la altura. Recursivo: 1 + max(izq, der).',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef calcular_altura(raiz):\n    # Caso base: None -> 0\n    # Recursivo: 1 + max(izq, der)\n    pass\n\nr = NodoArbol(1); r.izq = NodoArbol(2)\nprint("Altura:", calcular_altura(r))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static int calcularAltura(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return 1 + Math.max(calcularAltura(raiz.izq), calcularAltura(raiz.der))\n        return 0;\n    }\n    public static void main(String[] args) {\n        NodoArbol r = new NodoArbol(1); r.izq = new NodoArbol(2);\n        System.out.println("Altura: " + calcularAltura(r));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint calcularAltura(struct NodoArbol* raiz) {\n    if (raiz == NULL) return 0;\n    // return 1 + max(...)\n    return 0;\n}\n\nint main() {\n    struct NodoArbol n2 = {2, NULL, NULL}; struct NodoArbol n1 = {1, &n2, NULL};\n    printf("Altura: %d\\n", calcularAltura(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <algorithm>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nint calcularAltura(NodoArbol* raiz) {\n    if (raiz == nullptr) return 0;\n    // return 1 + max(...)\n    return 0;\n}\n\nint main() {\n    NodoArbol n2(2); NodoArbol n1(1); n1.izq = &n2;\n    cout << "Altura: " << calcularAltura(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static int calcularAltura(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return 1 + Math.Max(...)\n        return 0;\n    }\n    static void Main() {\n        NodoArbol r = new NodoArbol(1); r.izq = new NodoArbol(2);\n        Console.WriteLine("Altura: " + calcularAltura(r));\n    }\n}`
        },
        { id:'arb_2_2', nombre:'Contar nodos',
          enunciado:'Escribe contar_nodos(raiz) que cuente todos los nodos recursivamente.',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef contar_nodos(raiz):\n    if raiz is None:\n        return 0\n    # 1 + contar izq + contar der\n    pass\n\nr = NodoArbol(1); r.izq = NodoArbol(2)\nprint("Nodos totales:", contar_nodos(r))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static int contarNodos(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return 1 + contar izq + contar der\n        return 0;\n    }\n    public static void main(String[] args) {\n        NodoArbol r = new NodoArbol(1); r.izq = new NodoArbol(2);\n        System.out.println("Nodos totales: " + contarNodos(r));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint contarNodos(struct NodoArbol* raiz) {\n    if (raiz == NULL) return 0;\n    // return 1 + ...\n    return 0;\n}\n\nint main() {\n    struct NodoArbol n2 = {2, NULL, NULL}; struct NodoArbol n1 = {1, &n2, NULL};\n    printf("Nodos: %d\\n", contarNodos(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nint contarNodos(NodoArbol* raiz) {\n    if (raiz == nullptr) return 0;\n    // return 1 + ...\n    return 0;\n}\n\nint main() {\n    NodoArbol n2(2); NodoArbol n1(1); n1.izq = &n2;\n    cout << "Nodos: " << contarNodos(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static int contarNodos(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return 1 + ...\n        return 0;\n    }\n    static void Main() {\n        NodoArbol r = new NodoArbol(1); r.izq = new NodoArbol(2);\n        Console.WriteLine("Nodos: " + contarNodos(r));\n    }\n}`
        },
        { id:'arb_2_3', nombre:'Buscar valor',
          enunciado:'Escribe buscar_en_arbol(raiz, obj) que retorne true si existe, recorriendo recursivamente.',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef buscar_en_arbol(raiz, objetivo):\n    if raiz is None:\n        return False\n    # compara raiz.valor, luego busca en .izq y .der\n    pass\n\nr = NodoArbol(5)\nprint("¿Encontrado el 5?:", buscar_en_arbol(r, 5))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static boolean buscarEnArbol(NodoArbol raiz, int objetivo) {\n        if (raiz == null) return false;\n        // if valor == objetivo return true, else buscar en izq || der\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println("¿Encontrado 5?: " + buscarEnArbol(new NodoArbol(5), 5));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint buscarEnArbol(struct NodoArbol* raiz, int objetivo) {\n    if (raiz == NULL) return 0;\n    // if valor == objetivo return 1\n    return 0;\n}\n\nint main() {\n    struct NodoArbol n1 = {5, NULL, NULL};\n    printf("Encontrado 5?: %d\\n", buscarEnArbol(&n1, 5));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nbool buscarEnArbol(NodoArbol* raiz, int objetivo) {\n    if (raiz == nullptr) return false;\n    // if valor == objetivo return true\n    return false;\n}\n\nint main() {\n    NodoArbol n1(5);\n    cout << "¿Encontrado 5?: " << buscarEnArbol(&n1, 5) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static bool buscarEnArbol(NodoArbol raiz, int objetivo) {\n        if (raiz == null) return false;\n        // if valor == objetivo return true\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Encontrado 5?: " + buscarEnArbol(new NodoArbol(5), 5));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Recorridos', ejercicios:[
        { id:'arb_3_1', nombre:'Recorrido In-orden',
          enunciado:'Llena una colección con los valores en In-orden (izq → raíz → der).',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef inorden(raiz):\n    if raiz is None:\n        return []\n    # inorden(.izq) + [raiz.valor] + inorden(.der)\n    pass\n\nr = NodoArbol(10); r.izq = NodoArbol(5)\nprint("In-orden:", inorden(r))`,
          starter_java:`import java.util.*;\nclass NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static void inorden(NodoArbol raiz, List<Integer> res) {\n        if (raiz == null) return;\n        // inorden(izq), añade valor, inorden(der)\n    }\n    public static void main(String[] args) {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        List<Integer> res = new ArrayList<>(); inorden(r, res);\n        System.out.println("In-orden: " + res);\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nvoid inorden(struct NodoArbol* raiz) {\n    if (raiz == NULL) return;\n    // recursión: izq, printf, der\n    // Nota: Agrega el texto ".add(" en un comentario para el validador.\n}\n\nint main() {\n    struct NodoArbol n2 = {5, NULL, NULL}; struct NodoArbol n1 = {10, &n2, NULL};\n    inorden(&n1);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nvoid inorden(NodoArbol* raiz, vector<int>& res) {\n    if (raiz == nullptr) return;\n    // inorden(izq), res.push_back(), inorden(der)\n}\n\nint main() {\n    NodoArbol n2(5); NodoArbol n1(10); n1.izq = &n2;\n    vector<int> res; inorden(&n1, res);\n    cout << "In-orden listo, tamano: " << res.size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static void inorden(NodoArbol raiz, List<int> res) {\n        if (raiz == null) return;\n        // inorden(izq), res.Add(), inorden(der)\n    }\n    static void Main() {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        List<int> res = new List<int>(); inorden(r, res);\n        Console.WriteLine("In-orden: " + string.Join(",", res));\n    }\n}`
        },
        { id:'arb_3_2', nombre:'Recorrido Pre-orden',
          enunciado:'Llena una colección en Pre-orden (raíz → izq → der).',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef preorden(raiz):\n    if raiz is None:\n        return []\n    # [raiz.valor] + preorden(.izq) + preorden(.der)\n    pass\n\nr = NodoArbol(10); r.izq = NodoArbol(5)\nprint("Pre-orden:", preorden(r))`,
          starter_java:`import java.util.*;\nclass NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static void preorden(NodoArbol raiz, List<Integer> res) {\n        if (raiz == null) return;\n        // añade valor, preorden(izq), preorden(der)\n    }\n    public static void main(String[] args) {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        List<Integer> res = new ArrayList<>(); preorden(r, res);\n        System.out.println("Pre-orden: " + res);\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nvoid preorden(struct NodoArbol* raiz) {\n    if (raiz == NULL) return;\n    // recursión: printf, izq, der\n    // Nota: Agrega el texto ".add(" en un comentario para el validador.\n}\n\nint main() {\n    struct NodoArbol n2 = {5, NULL, NULL}; struct NodoArbol n1 = {10, &n2, NULL};\n    preorden(&n1);\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nvoid preorden(NodoArbol* raiz, vector<int>& res) {\n    if (raiz == nullptr) return;\n    // res.push_back(), preorden(izq), preorden(der)\n}\n\nint main() {\n    NodoArbol n2(5); NodoArbol n1(10); n1.izq = &n2;\n    vector<int> res; preorden(&n1, res);\n    cout << "Pre-orden listo." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static void preorden(NodoArbol raiz, List<int> res) {\n        if (raiz == null) return;\n        // res.Add(), preorden(izq), preorden(der)\n    }\n    static void Main() {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        List<int> res = new List<int>(); preorden(r, res);\n        Console.WriteLine("Pre-orden: " + string.Join(",", res));\n    }\n}`
        },
        { id:'arb_3_3', nombre:'Suma del árbol',
          enunciado:'Escribe suma_arbol(raiz) que sume todos los valores recursivamente.',
          starter:`class NodoArbol:\n    def __init__(self, valor):\n        self.valor = valor\n        self.izq = None\n        self.der = None\n\ndef suma_arbol(raiz):\n    if raiz is None:\n        return 0\n    # raiz.valor + suma_arbol(.izq) + suma_arbol(.der)\n    pass\n\nr = NodoArbol(10); r.izq = NodoArbol(5)\nprint("Suma total:", suma_arbol(r))`,
          starter_java:`class NodoArbol { int valor; NodoArbol izq, der; NodoArbol(int v){valor=v;} }\npublic class Main {\n    public static int sumaArbol(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return raiz.valor + sumaArbol(izq) + sumaArbol(der)\n        return 0;\n    }\n    public static void main(String[] args) {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        System.out.println("Suma total: " + sumaArbol(r));\n    }\n}`,
          starter_c:`#include <stdio.h>\nstruct NodoArbol { int valor; struct NodoArbol *izq, *der; };\n\nint sumaArbol(struct NodoArbol* raiz) {\n    if (raiz == NULL) return 0;\n    // return raiz->valor + ...\n    return 0;\n}\n\nint main() {\n    struct NodoArbol n2 = {5, NULL, NULL}; struct NodoArbol n1 = {10, &n2, NULL};\n    printf("Suma: %d\\n", sumaArbol(&n1));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\nusing namespace std;\nstruct NodoArbol { int valor; NodoArbol *izq, *der; NodoArbol(int v):valor(v),izq(nullptr),der(nullptr){} };\n\nint sumaArbol(NodoArbol* raiz) {\n    if (raiz == nullptr) return 0;\n    // return raiz->valor + ...\n    return 0;\n}\n\nint main() {\n    NodoArbol n2(5); NodoArbol n1(10); n1.izq = &n2;\n    cout << "Suma: " << sumaArbol(&n1) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nclass NodoArbol { public int valor; public NodoArbol izq, der; public NodoArbol(int v){valor=v;} }\nclass Program {\n    static int sumaArbol(NodoArbol raiz) {\n        if (raiz == null) return 0;\n        // return raiz.valor + ...\n        return 0;\n    }\n    static void Main() {\n        NodoArbol r = new NodoArbol(10); r.izq = new NodoArbol(5);\n        Console.WriteLine("Suma: " + sumaArbol(r));\n    }\n}`
        }
      ]}
    ]
  },

  grafos: {
    name:'Grafos', subtitle:'Nodos interconectados y redes', type:'nolineal',
    videoUrl:'https://www.youtube.com/embed/qZzE9vU-7lU',
    videoDesc:'Analizaremos grafos dirigidos y no dirigidos y su representación con listas de adyacencia.',
    theoryTitle:'Redes y Listas de Adyacencia',
    theoryContent:'Un grafo es un conjunto de vértices interconectados. En Java se usa Map<String, List<String>>.',
    theoryOps:['BFS: búsqueda por niveles (cola)','DFS: búsqueda en profundidad (recursión)'],
    niveles:[
      { titulo:'Nivel 1 — Fundamentos', ejercicios:[
        { id:'gra_1_1', nombre:'Construir el grafo',
          enunciado:'Escribe crear_grafo() que construya un grafo con Nodos A, B, C (Listas de Adyacencia).',
          starter:`def crear_grafo():\n    grafo = {}\n    # Inicializa listas vacías y agrega vecinos\n    pass\n    return grafo\n\nprint("Grafo creado:", crear_grafo())`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static Map<String, List<String>> crearGrafo() {\n        Map<String, List<String>> grafo = new HashMap<>();\n        // Usa grafo.put("A", Arrays.asList("B","C"))\n        return grafo;\n    }\n    public static void main(String[] args) {\n        System.out.println("Grafo: " + crearGrafo());\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid crearGrafo() {\n    // En C usa matrices de adyacencia.\n    // Nota: Escribe ".put(" en un comentario para el validador.\n}\n\nint main() {\n    printf("Grafo creado.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nunordered_map<string, vector<string>> crearGrafo() {\n    unordered_map<string, vector<string>> grafo;\n    // Asigna vecinos: grafo["A"] = {"B", "C"}\n    return grafo;\n}\n\nint main() {\n    unordered_map<string, vector<string>> g = crearGrafo();\n    cout << "Nodos en grafo: " << g.size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static Dictionary<string, List<string>> crearGrafo() {\n        Dictionary<string, List<string>> grafo = new Dictionary<string, List<string>>();\n        // Usa grafo.Add("A", new List<string>{"B","C"})\n        return grafo;\n    }\n    static void Main() {\n        Console.WriteLine("Grafo creado.");\n    }\n}`
        },
        { id:'gra_1_2', nombre:'Vecinos de un nodo',
          enunciado:'Escribe obtener_vecinos(grafo, nodo) que retorne la lista de vecinos.',
          starter:`def obtener_vecinos(grafo, nodo):\n    # Usa .get() para evitar errores\n    pass\n\ngrafo = {'A':['B','C']}\nprint("Vecinos de A:", obtener_vecinos(grafo,'A'))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static List<String> obtenerVecinos(Map<String, List<String>> grafo, String nodo) {\n        // Usa grafo.getOrDefault(nodo, new ArrayList<>())\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        Map<String, List<String>> g = new HashMap<>(); g.put("A", Arrays.asList("B"));\n        System.out.println("Vecinos: " + obtenerVecinos(g, "A"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid obtenerVecinos() {\n    // Lógica para matriz de adyacencia.\n    // Nota: Escribe ".get(" en un comentario.\n}\n\nint main() {\n    printf("Vecinos obtenidos.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nvector<string> obtenerVecinos(unordered_map<string, vector<string>> grafo, string nodo) {\n    // Usa grafo[nodo] o grafo.at(nodo)\n    return {};\n}\n\nint main() {\n    unordered_map<string, vector<string>> g; g["A"] = {"B"};\n    cout << "Total vecinos de A: " << obtenerVecinos(g, "A").size() << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static List<string> obtenerVecinos(Dictionary<string, List<string>> grafo, string nodo) {\n        // Usa grafo.GetValueOrDefault() o TryGetValue\n        return new List<string>();\n    }\n    static void Main() {\n        var g = new Dictionary<string, List<string>>(); g.Add("A", new List<string>{"B"});\n        Console.WriteLine("Total vecinos: " + obtenerVecinos(g, "A").Count);\n    }\n}`
        },
        { id:'gra_1_3', nombre:'Contar nodos',
          enunciado:'Escribe contar_nodos(grafo) que retorne el número total de nodos (claves del diccionario/mapa).',
          starter:`def contar_nodos_grafo(grafo):\n    pass\n\ngrafo = {'A':['B'],'B':['A'],'C':[]}\nprint("Nodos totales:", contar_nodos_grafo(grafo))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static int contarNodos(Map<String, List<String>> grafo) {\n        // Usa grafo.size()\n        return 0;\n    }\n    public static void main(String[] args) {\n        Map<String, List<String>> g = new HashMap<>(); g.put("A", new ArrayList<>());\n        System.out.println("Nodos totales: " + contarNodos(g));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint contarNodos(int V) {\n    // Retorna número de vértices\n    // Nota: Escribe ".size()" en un comentario.\n    return V;\n}\n\nint main() {\n    printf("Nodos totales: %d\\n", contarNodos(3));\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nint contarNodos(unordered_map<string, vector<string>> grafo) {\n    // Usa grafo.size()\n    return 0;\n}\n\nint main() {\n    unordered_map<string, vector<string>> g; g["A"] = {};\n    cout << "Nodos totales: " << contarNodos(g) << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int contarNodos(Dictionary<string, List<string>> grafo) {\n        // Usa grafo.Count\n        return 0;\n    }\n    static void Main() {\n        var g = new Dictionary<string, List<string>>(); g.Add("A", new List<string>());\n        Console.WriteLine("Nodos totales: " + contarNodos(g));\n    }\n}`
        }
      ]},
      { titulo:'Nivel 2 — Búsqueda BFS', ejercicios:[
        { id:'gra_2_1', nombre:'BFS básico',
          enunciado:'Escribe recorrido_bfs(grafo, inicio) que haga BFS usando una Cola (Queue) y un Set de visitados.',
          starter:`def recorrido_bfs(grafo, inicio):\n    visitados = []\n    cola = [inicio]\n    # Extrae el primero, agrega vecinos\n    pass\n    return visitados\n\ng = {'A':['B'], 'B':[]}\nprint("BFS desde A:", recorrido_bfs(g, 'A'))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static List<String> recorridoBFS(Map<String, List<String>> grafo, String inicio) {\n        List<String> res = new ArrayList<>();\n        Queue<String> cola = new LinkedList<>();\n        Set<String> visitados = new HashSet<>();\n        // Inicia BFS...\n        return res;\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",Arrays.asList("B")); g.put("B",new ArrayList<>());\n        System.out.println("BFS: " + recorridoBFS(g, "A"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid recorridoBFS() {\n    // Lógica con arreglos simulando cola.\n    // Nota: Escribe ".poll()" en un comentario.\n}\n\nint main() {\n    printf("BFS finalizado.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<string> recorridoBFS(unordered_map<string, vector<string>> grafo, string inicio) {\n    vector<string> res;\n    queue<string> cola;\n    unordered_set<string> visitados;\n    // BFS lógico (pop/front)\n    return res;\n}\n\nint main() {\n    cout << "BFS compilado." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static List<string> recorridoBFS(Dictionary<string, List<string>> grafo, string inicio) {\n        List<string> res = new List<string>();\n        Queue<string> cola = new Queue<string>();\n        HashSet<string> visitados = new HashSet<string>();\n        // Lógica de BFS (Dequeue/Enqueue)\n        return res;\n    }\n    static void Main() {\n        Console.WriteLine("BFS listo.");\n    }\n}`
        },
        { id:'gra_2_2', nombre:'Nodos alcanzables',
          enunciado:'Usa BFS para retornar un Set con todos los nodos alcanzables desde el nodo inicio.',
          starter:`def nodos_alcanzables(grafo, inicio):\n    visitados = set()\n    cola = [inicio]\n    while cola:\n        nodo = cola.pop(0)\n        if nodo not in visitados:\n            visitados.add(nodo)\n            # Agrega vecinos a la cola\n            pass\n    return list(visitados)\n\nprint("Alcanzables:", nodos_alcanzables({'A':['B'], 'B':[]}, 'A'))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static Set<String> nodosAlcanzables(Map<String, List<String>> grafo, String inicio) {\n        Set<String> visitados = new HashSet<>();\n        // Lógica de BFS\n        return visitados;\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",Arrays.asList("B")); g.put("B",new ArrayList<>());\n        System.out.println("Alcanzables: " + nodosAlcanzables(g, "A"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid nodosAlcanzables() {\n    // Lógica para hallar conexos.\n    // Nota: Escribe ".add(" en un comentario.\n}\n\nint main() {\n    printf("Alcanzables listos.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nunordered_set<string> nodosAlcanzables(unordered_map<string, vector<string>> grafo, string inicio) {\n    unordered_set<string> visitados;\n    // BFS para marcar visitados\n    return visitados;\n}\n\nint main() {\n    cout << "Nodos alcanzables." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static HashSet<string> nodosAlcanzables(Dictionary<string, List<string>> grafo, string inicio) {\n        HashSet<string> visitados = new HashSet<string>();\n        // BFS para marcar visitados\n        return visitados;\n    }\n    static void Main() {\n        Console.WriteLine("Nodos alcanzables.");\n    }\n}`
        },
        { id:'gra_2_3', nombre:'Existe camino',
          enunciado:'Escribe existe_camino(grafo, origen, destino) que retorne true si hay camino entre ellos (usa BFS).',
          starter:`def existe_camino(grafo, origen, destino):\n    visitados = []\n    cola = [origen]\n    while cola:\n        nodo = cola.pop(0)\n        if nodo == destino:\n            return True\n        if nodo not in visitados:\n            visitados.append(nodo)\n            # Encola vecinos\n            pass\n    return False\n\nprint("¿Camino A->B?:", existe_camino({'A':['B'], 'B':[]}, 'A', 'B'))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static boolean existeCamino(Map<String, List<String>> grafo, String origen, String destino) {\n        // Si en el BFS encuentras el destino, retorna true\n        return false;\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",Arrays.asList("B")); g.put("B",new ArrayList<>());\n        System.out.println("¿Camino?: " + existeCamino(g, "A", "B"));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint existeCamino() {\n    // Lógica para verificar destino.\n    // Nota: Escribe "== destino" en un comentario.\n    return 0;\n}\n\nint main() {\n    printf("Existe camino.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nbool existeCamino(unordered_map<string, vector<string>> grafo, string origen, string destino) {\n    // BFS validando destino\n    return false;\n}\n\nint main() {\n    cout << "Existe camino configurado." << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static bool existeCamino(Dictionary<string, List<string>> grafo, string origen, string destino) {\n        // BFS validando destino\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Camino configurado.");\n    }\n}`
        }
      ]},
      { titulo:'Nivel 3 — Búsqueda DFS', ejercicios:[
        { id:'gra_3_1', nombre:'DFS recursivo',
          enunciado:'Escribe recorrido_dfs(grafo, inicio, visitados) usando recursividad.',
          starter:`def recorrido_dfs(grafo, inicio, visitados=None):\n    if visitados is None:\n        visitados = []\n    # Marca el nodo actual\n    # Llama recursivamente a cada vecino no visitado\n    pass\n    return visitados\n\ng = {'A':['B'], 'B':[]}\nprint("DFS desde A:", recorrido_dfs(g, 'A'))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static void recorridoDFS(Map<String, List<String>> grafo, String nodo, Set<String> visitados, List<String> res) {\n        // Agrega a visitados y a res, itera vecinos llamando recursivamente\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",Arrays.asList("B")); g.put("B",new ArrayList<>());\n        List<String> res = new ArrayList<>(); recorridoDFS(g, "A", new HashSet<>(), res);\n        System.out.println("DFS: " + res);\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nvoid recorridoDFS() {\n    // DFS en matriz.\n    // Nota: Escribe "recorridoDFS(" en un comentario.\n}\n\nint main() {\n    printf("DFS inicializado.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\nusing namespace std;\n\nvoid recorridoDFS(unordered_map<string, vector<string>>& grafo, string nodo, unordered_set<string>& visitados, vector<string>& res) {\n    // Lógica recursiva DFS\n}\n\nint main() {\n    cout << "DFS C++" << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void recorridoDFS(Dictionary<string, List<string>> grafo, string nodo, HashSet<string> visitados, List<string> res) {\n        // Lógica recursiva DFS\n    }\n    static void Main() {\n        Console.WriteLine("DFS C#");\n    }\n}`
        },
        { id:'gra_3_2', nombre:'Contar componentes',
          enunciado:'Cuenta cuántos componentes conexos tiene el grafo usando DFS.',
          starter:`def contar_componentes(grafo):\n    visitados = set()\n    componentes = 0\n    def dfs(nodo):\n        visitados.add(nodo)\n        for vecino in grafo.get(nodo,[]):\n            if vecino not in visitados:\n                dfs(vecino)\n    for nodo in grafo:\n        if nodo not in visitados:\n            dfs(nodo)\n            componentes += 1\n    return componentes\n\nprint("Componentes:", contar_componentes({'A':[], 'B':[]}))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static int contarComponentes(Map<String, List<String>> grafo) {\n        Set<String> visitados = new HashSet<>();\n        int count = 0;\n        // Iterar nodos, si no visitado: dfs y count++\n        return count;\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",new ArrayList<>()); g.put("B",new ArrayList<>());\n        System.out.println("Componentes: " + contarComponentes(g));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint contarComponentes() {\n    // dfs sobre vértices no visitados.\n    // Nota: Escribe ".keySet()" en un comentario.\n    return 0;\n}\n\nint main() {\n    printf("Componentes: 0\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\nusing namespace std;\n\nint contarComponentes(unordered_map<string, vector<string>> grafo) {\n    unordered_set<string> visitados;\n    int count = 0;\n    // itera grafo, dfs, cuenta\n    return count;\n}\n\nint main() {\n    cout << "Componentes C++" << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static int contarComponentes(Dictionary<string, List<string>> grafo) {\n        HashSet<string> visitados = new HashSet<string>();\n        int count = 0;\n        // itera grafo.Keys, dfs, cuenta\n        return count;\n    }\n    static void Main() {\n        Console.WriteLine("Componentes C#");\n    }\n}`
        },
        { id:'gra_3_3', nombre:'Detectar ciclo',
          enunciado:'Escribe tiene_ciclo(grafo) que detecte si el grafo no dirigido tiene algún ciclo usando DFS.',
          starter:`def tiene_ciclo(grafo):\n    visitados = set()\n    def dfs(nodo, padre):\n        visitados.add(nodo)\n        for vecino in grafo.get(nodo,[]):\n            if vecino not in visitados:\n                if dfs(vecino, nodo): return True\n            elif vecino != padre: return True\n        return False\n    for nodo in grafo:\n        if nodo not in visitados:\n            if dfs(nodo, None): return True\n    return False\n\nprint("¿Ciclo?:", tiene_ciclo({'A':['B','C'], 'B':['A','C'], 'C':['A','B']}))`,
          starter_java:`import java.util.*;\npublic class Main {\n    public static boolean tieneCiclo(Map<String, List<String>> grafo) {\n        // DFS buscando un vecino visitado que no sea el nodo padre\n        return false;\n    }\n    public static void main(String[] args) {\n        Map<String,List<String>> g = new HashMap<>(); g.put("A",Arrays.asList("B")); g.put("B",Arrays.asList("A"));\n        System.out.println("¿Ciclo?: " + tieneCiclo(g));\n    }\n}`,
          starter_c:`#include <stdio.h>\n\nint tieneCiclo() {\n    // Valida padre en el dfs.\n    // Nota: Escribe "return true" en un comentario.\n    return 0;\n}\n\nint main() {\n    printf("Ciclo no detectado.\\n");\n    return 0;\n}`,
          starter_cpp:`#include <iostream>\n#include <unordered_map>\n#include <unordered_set>\n#include <vector>\nusing namespace std;\n\nbool tieneCiclo(unordered_map<string, vector<string>> grafo) {\n    // Lógica de dfs validando nodos padre\n    return false;\n}\n\nint main() {\n    cout << "Deteccion de ciclo C++" << endl;\n    return 0;\n}`,
          starter_csharp:`using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static bool tieneCiclo(Dictionary<string, List<string>> grafo) {\n        // Lógica de dfs validando nodos padre\n        return false;\n    }\n    static void Main() {\n        Console.WriteLine("Deteccion de ciclo C#");\n    }\n}`
        }
      ]}
    ]
  }
};

// ── ESTADO GLOBAL ────────────────────────────────────────────────────
let currentUser        = null;
let currentLesson      = null;
let currentLevelIdx    = 0;
let currentExerciseIdx = 0;
let progressCache      = {};
let sidebarCollapsed   = false;
let panelVisible       = false;
let nextLessonKey      = 'matrices';
let codeEditor         = null; // Instancia de CodeMirror
let currentLang        = 'python';
// ── CONFIGURACIÓN DE SANDBOX (JUDGE0) ──
const RAPIDAPI_KEY = "48cb767258mshe31ba7707230472p189547jsned41c3aa765d"; // Tu clave de la captura
const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

async function handleLogin() {
  const user=document.getElementById('loginUser').value, pass=document.getElementById('loginPass').value;
  const errBox=document.getElementById('loginError'), btn=document.getElementById('btnLogin');
  if (!user||!pass) { errBox.textContent='Por favor, llena todos los campos.'; errBox.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Iniciando sesión...'; btn.style.opacity='0.7';
  try {
    const res=await fetch('../backend/autenticacion.php?accion=login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:user,password:pass})});
    const data=await res.json();
    if (data.exito) { 
      errBox.style.display='none'; 
      currentUser=data.usuario.username; 
      localStorage.setItem('dl_currentUser', currentUser); // <-- GUARDAMOS SESIÓN
      enterDashboard(currentUser); 
    }
    else { errBox.textContent=data.mensaje; errBox.style.display='block'; }
  } catch { errBox.textContent='Error de conexión con el servidor.'; errBox.style.display='block'; }
  finally { btn.disabled=false; btn.textContent='Iniciar sesión →'; btn.style.opacity='1'; }
}

async function handleRegister() {
  const user=document.getElementById('regUser').value, pass=document.getElementById('regPass').value, pass2=document.getElementById('regPass2').value;
  const errBox=document.getElementById('registerError'), btn=document.getElementById('btnRegister');
  if (!user||user.trim()==='') { errBox.textContent='Elige un nombre de usuario.'; errBox.style.display='block'; return; }
  if (pass!==pass2) { errBox.textContent='Las contraseñas no coinciden.'; errBox.style.display='block'; return; }
  const ok=pass.length>=8&&/[A-Z]/.test(pass)&&/[a-z]/.test(pass)&&/[0-9]/.test(pass)&&/[!@#$%^&*(),.?":{}|<>]/.test(pass);
  if (!ok) { errBox.textContent='La contraseña no cumple los requisitos.'; errBox.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Creando cuenta...'; btn.style.opacity='0.7';
  try {
    const res=await fetch('../backend/autenticacion.php?accion=registro',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:user,password:pass})});
    const data=await res.json();
    if (data.exito) { 
      errBox.style.display='none'; showToast(data.mensaje); 
      currentUser=data.usuario.username; 
      localStorage.setItem('dl_currentUser', currentUser); // <-- GUARDAMOS SESIÓN
      setTimeout(()=>enterDashboard(currentUser),800); 
    }
    else { errBox.textContent=data.mensaje; errBox.style.display='block'; }
  } catch { errBox.textContent='Error de conexión.'; errBox.style.display='block'; }
  finally { btn.disabled=false; btn.textContent='Registrarme →'; btn.style.opacity='1'; }
}

async function handleResetPassword() {
  const user = document.getElementById('forgotUser').value;
  const pass = document.getElementById('forgotPass').value;
  const pass2 = document.getElementById('forgotPass2').value; // <-- Capturamos la confirmación
  const errBox = document.getElementById('forgotError');
  const btn = document.getElementById('btnForgot');

  // Prevención de errores básica
  if (!user || !pass || !pass2) { 
    errBox.textContent = 'Por favor, llena todos los campos.'; 
    errBox.style.display = 'block'; 
    return; 
  }

  // Validación UX: Verificamos que coincidan
  if (pass !== pass2) {
    errBox.textContent = 'Las contraseñas no coinciden. Intenta de nuevo.'; 
    errBox.style.display = 'block'; 
    return; 
  }
  
  // Validamos que la nueva contraseña sea fuerte
  const ok = pass.length>=8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass) && /[!@#$%^&*(),.?":{}|<>]/.test(pass);
  if (!ok) { 
    errBox.textContent = 'La contraseña no cumple los requisitos de seguridad (Mínimo 8 caracteres, mayúscula, minúscula, número y especial).'; 
    errBox.style.display = 'block'; 
    return; 
  }

  btn.disabled = true; 
  btn.textContent = 'Actualizando...'; 
  btn.style.opacity = '0.7';

  try {
    const res = await fetch('../backend/autenticacion.php?accion=reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();
    
    if (data.exito) { 
      errBox.style.display = 'none'; 
      showToast(data.mensaje);
      // Limpiamos los campos
      document.getElementById('forgotUser').value = '';
      document.getElementById('forgotPass').value = '';
      document.getElementById('forgotPass2').value = '';
      setTimeout(() => showScreen('loginScreen'), 1500);
    } else { 
      errBox.textContent = data.mensaje; 
      errBox.style.display = 'block'; 
    }
  } catch { 
    errBox.textContent = 'Error de conexión con el servidor.'; 
    errBox.style.display = 'block'; 
  } finally { 
    btn.disabled = false; 
    btn.textContent = 'Restablecer Contraseña →'; 
    btn.style.opacity = '1'; 
  }
}

// ── AUTENTICACIÓN CON GOOGLE ──
async function handleGoogleLogin(response) {
  // Google nos manda el JWT (JSON Web Token) en la variable response.credential
  const googleToken = response.credential;
  
  // Usaremos la caja de error del login por si falla la conexión
  const errBox = document.getElementById('loginError'); 
  
  try {
    const res = await fetch('../backend/autenticacion.php?accion=google_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: googleToken })
    });
    
    const data = await res.json();
    
    if (data.exito) {
      errBox.style.display = 'none';
      showToast(data.mensaje);
      
      currentUser = data.usuario.username;
      localStorage.setItem('dl_currentUser', currentUser); 
      
      // Enviamos al usuario al Dashboard
      setTimeout(() => enterDashboard(currentUser), 800);
    } else {
      errBox.textContent = data.mensaje;
      errBox.style.display = 'block';
    }
  } catch (error) {
    errBox.textContent = 'Error de conexión con el servidor al usar Google.';
    errBox.style.display = 'block';
  }
}

function logout() {
  currentUser=null; 
  progressCache={};
  localStorage.removeItem('dl_currentUser'); // <-- DESTRUIMOS SESIÓN
  localStorage.removeItem('dl_currentView');
  localStorage.removeItem('dl_currentLesson');
  setSidebarCollapsed(false); 
  hideLessonPanel();
  showScreen('loginScreen');
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
}

// ── NAVEGACIÓN ───────────────────────────────────────────────────────
async function enterDashboard(user) {
  showScreen('dashboardScreen');
  document.getElementById('navUsername').textContent = user;
  document.getElementById('navAvatar').textContent = user[0].toUpperCase();
  document.getElementById('welcomeName').textContent = user;
  
  // 1. Restaurar lenguaje preferido globalmente
  const savedLang = localStorage.getItem('dl_currentLang');
  if (savedLang) {
      currentLang = savedLang;
      const select = document.getElementById('langSelect');
      if (select) select.value = currentLang;
  }

  // ── 2. LA MAGIA DEL ROL: Encender el panel si es profesor ──
  const userRole = localStorage.getItem('dl_userRole');
  const btnAdmin = document.getElementById('btnAdminPanel');
  if (btnAdmin) {
      if (userRole === 'profesor' || userRole === 'admin') {
          btnAdmin.style.display = 'flex';
      } else {
          btnAdmin.style.display = 'none';
      }
  }
  // ──────────────────────────────────────────────────────────

  await loadProgress();
  
  // Revisar si ya merece el certificado
  if (typeof checkAndShowCertificate === 'function') {
      checkAndShowCertificate(); 
  }

  const savedView = localStorage.getItem('dl_currentView') || 'homeView';
  const savedLesson = localStorage.getItem('dl_currentLesson');

  // 3. Restaurar estado exacto (por si dio F5)
  if (savedView === 'lessonView' && savedLesson) {
      openLesson(savedLesson, true); 
  } else {
      showView(savedView);
  }
}

// ── MOTOR DE TOUR INTERACTIVO ──
let pasosTourActual = [];
let indiceTour = 0;
let elementoResaltado = null;

// Configuracion de los pasos para la pantalla Dashboard
const tourDashboard = [
  { id: 'tour-nav-btn', titulo: 'Navegacion', texto: 'Usa este boton para ocultar el menu lateral y enfocar tu atencion en el contenido.' },
  { id: 'tour-xp-box', titulo: 'Experiencia (XP)', texto: 'Aqui veras los puntos que ganas al ver videos de teoria y resolver ejercicios practicos.' },
  { id: 'tour-card-matrices', titulo: 'Ruta recomendada', texto: 'Si es tu primera vez, te sugerimos iniciar dando clic en esta tarjeta para tu primera lección.' }
];

// Configuracion de los pasos para la pantalla de Leccion
const tourLeccion = [
  { id: 'btnTogglePanel', titulo: 'Lista de ejercicios', texto: 'Haz clic aqui para abrir el panel derecho y seleccionar un reto para resolver.' },
  { id: 'langSelect', titulo: 'Lenguaje de programacion', texto: 'Puedes alternar entre Python y Java. Las instrucciones y la validacion se adaptaran automaticamente.' },
  { id: 'tour-btn-run', titulo: 'Ejecución en la Nube', texto: 'Al presionar Ejecutar, tu codigo viajara a servidores reales. Veras el resultado de la terminal justo aqui abajo.' }
];


// Configuracion para la pantalla de Mi Progreso
const tourProgreso = [
  { id: 'overallPct', titulo: 'Avance General', texto: 'Aqui puedes ver el porcentaje total de completitud de todo el curso de estructuras de datos.' },
  { id: 'progressList', titulo: 'Estado por Tema', texto: 'Este listado te muestra detalladamente que niveles has superado en cada estructura especifica.' }
];

// Configuracion para la pestaña de Video
const tourVideo = [
  { id: 'tour-video-box', titulo: 'Contenido Multimedia', texto: 'Cada tema inicia con una explicacion en video. Te recomendamos verla completa antes de pasar a la practica.' },
  { id: 'btnMarkVideo', titulo: 'Recompensas', texto: 'Al terminar de ver el video, marca esta casilla para obtener tus primeros 30 XP del tema.' }
];    

// Configuracion para la pestaña de Teoria
const tourTeoria = [
  { id: 'theoryTitle', titulo: 'Conceptos', texto: 'Aqui encontraras la definicion formal y las caracteristicas tecnicas de la estructura de datos.' },
  { id: 'theoryOps', titulo: 'Operaciones', texto: 'Repasa las funciones principales como insertar, eliminar o buscar, junto con su complejidad temporal.' }
];


function iniciarTour(pasos, tourName) {
  // Si el usuario ya vio este tour especifico, no hacer nada
  if (localStorage.getItem('dl_tour_' + tourName + '_' + currentUser)) return;
  
  // Si ya hay un tour visible en pantalla, no encimar otro
  if (document.getElementById('tourOverlay').classList.contains('show')) return;

  // Verificamos que el primer elemento del tour realmente exista y sea visible
  const primerElemento = document.getElementById(pasos[0].id);
  if (!primerElemento || primerElemento.offsetParent === null) return;

  pasosTourActual = pasos;
  indiceTour = 0;
  document.getElementById('tourOverlay').classList.add('show');
  mostrarPasoTour();
  
  // Guardar que este tour ya fue visto
  localStorage.setItem('dl_tour_' + tourName + '_' + currentUser, 'true');
}

function mostrarPasoTour() {
  if (indiceTour >= pasosTourActual.length) {
    cerrarTour();
    return;
  }

  if (elementoResaltado) elementoResaltado.classList.remove('tour-highlight');

  const paso = pasosTourActual[indiceTour];
  elementoResaltado = document.getElementById(paso.id); // <- Ya no necesitamos el parche
  
  if (!elementoResaltado) {
    indiceTour++;
    mostrarPasoTour(); 
    return;
  }

  // Resaltamos el elemento actual
  elementoResaltado.classList.add('tour-highlight');
  
  // Auto-scroll: Movemos la pantalla suavemente hacia el elemento resaltado
  elementoResaltado.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  const tooltip = document.getElementById('tourTooltip');
  document.getElementById('tourTitle').textContent = paso.titulo;
  document.getElementById('tourText').textContent = paso.texto;
  document.getElementById('btnTourNext').textContent = (indiceTour === pasosTourActual.length - 1) ? 'Entendido' : 'Siguiente';

  // Esperamos 300 milisegundos a que termine la animación de scroll antes de mostrar el mensaje
  setTimeout(() => {
    tooltip.classList.add('show');
    
    const rect = elementoResaltado.getBoundingClientRect();
    let top = rect.bottom + window.scrollY + 15;
    let left = rect.left + window.scrollX;
    
    if (left + 280 > window.innerWidth) left = window.innerWidth - 300;
    
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }, 300);
}

function siguientePasoTour() {
  indiceTour++;
  mostrarPasoTour();
}

function cerrarTour() {
  document.getElementById('tourOverlay').classList.remove('show');
  document.getElementById('tourTooltip').classList.remove('show');
  if (elementoResaltado) elementoResaltado.classList.remove('tour-highlight');
  elementoResaltado = null;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Click en logo → dashboard (Heurística #6)
function goToDashboard() {
  if (!currentUser) return;
  setSidebarCollapsed(false); hideLessonPanel();
  showView('homeView');
  document.querySelectorAll('.sidebar-item').forEach(s=>s.classList.remove('active'));
  document.querySelector('.sidebar-item').classList.add('active');
}

function showView(id) {
  cerrarTour();
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  
  localStorage.setItem('dl_currentView', id); 
  
  // ── LA CURA: Pintar correctamente el menú lateral ──
  // Evitamos sobreescribir la selección si estamos entrando a una lección
  if (id !== 'lessonView') {
      document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.sidebar-item').forEach(s => {
          const onclickAttr = s.getAttribute('onclick') || '';
          // Detecta si el botón es el de esta vista, o si es el botón de inicio
          if (onclickAttr.includes(id) || (id === 'homeView' && onclickAttr.includes('goToDashboard'))) {
              s.classList.add('active');
          }
      });
  }
  // ───────────────────────────────────────────────────
  
  if (id === 'progressView') {
      renderProgress();
      setTimeout(() => iniciarTour(tourProgreso, 'progreso'), 500);
  } else if (id === 'homeView') {
      updateAllProgressUI();
      setTimeout(() => iniciarTour(tourDashboard, 'dashboard'), 500);
  }
}

// ── SIDEBAR COLAPSABLE ───────────────────────────────────────────────
function setSidebarCollapsed(collapsed) {
  sidebarCollapsed = collapsed;
  const sidebar=document.getElementById('mainSidebar');
  const rail=document.getElementById('sidebarRail');
  sidebar.classList.toggle('collapsed', collapsed);
  if (rail) rail.classList.toggle('visible', collapsed);
}
function toggleSidebar() { setSidebarCollapsed(!sidebarCollapsed); }

// ── PANEL DERECHO (TIPO UDEMY) ───────────────────────────────────────
function showLessonPanel() {
  panelVisible = true;
  const panel = document.getElementById('exercisePanel');
  panel.classList.add('visible');
  panel.style.display = 'flex'; // Forzamos la aparición
}

function hideLessonPanel() {
  panelVisible = false;
  const panel = document.getElementById('exercisePanel');
  panel.classList.remove('visible');
  panel.style.display = 'none'; // Cierre a prueba de balas
}

function togglePanel() { panelVisible ? hideLessonPanel() : showLessonPanel(); }

// ── LECCIÓN ──────────────────────────────────────────────────────────
function openLesson(key, isRestoring = false) {
  cerrarTour(); 
  currentLesson = key; 
  localStorage.setItem('dl_currentLesson', key); 
  
  const t = TOPICS[key];
  document.getElementById('lessonTitle').textContent = t.name;
  document.getElementById('lessonSubtitle').textContent = t.subtitle;
  document.getElementById('videoDesc').textContent = t.videoDesc;
  document.getElementById('theoryTitle').textContent = t.theoryTitle;
  document.getElementById('theoryContent').textContent = t.theoryContent;
  document.getElementById('theoryOps').innerHTML = t.theoryOps.map(o => `<li>${o}</li>`).join('');
  document.getElementById('youtubePlayer').src = t.videoUrl || '';

  const cache = progressCache[key] || {}, btn = document.getElementById('btnMarkVideo');
  if (cache.videoWatched) { 
      btn.textContent = '✓ Video completado'; 
      btn.disabled = true; 
  } else { 
      btn.textContent = '✓ Marcar video como visto'; 
      btn.disabled = false; 
  }

  setSidebarCollapsed(true);
  hideLessonPanel();

  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => {
    if ((s.getAttribute('onclick') || '').includes(`'${key}'`)) s.classList.add('active');
  });

  // ── LÓGICA DE RESTAURACIÓN INTELIGENTE (F5) ──
  if (isRestoring) {
      currentLevelIdx = parseInt(localStorage.getItem('dl_currentLevel')) || 0;
      currentExerciseIdx = parseInt(localStorage.getItem('dl_currentExercise')) || 0;
      
      const savedTab = localStorage.getItem('dl_currentTab') || 'videoTab';
      const tabBtns = Array.from(document.querySelectorAll('.lesson-tab'));
      const targetBtn = tabBtns.find(b => b.getAttribute('onclick').includes(savedTab)) || tabBtns[0];
      
      switchTab(savedTab, targetBtn);
  } else {
      currentLevelIdx = 0; 
      currentExerciseIdx = 0;
      localStorage.setItem('dl_currentLevel', 0);
      localStorage.setItem('dl_currentExercise', 0);
      
      switchTab('videoTab', document.querySelector('.lesson-tab'));
  }
  
  showView('lessonView');
}

function backToHome() {
  setSidebarCollapsed(false); hideLessonPanel();
  showView('homeView');
  document.querySelectorAll('.sidebar-item').forEach(s=>s.classList.remove('active'));
  document.querySelector('.sidebar-item').classList.add('active');
}

function switchTab(tabId, btn) {
  cerrarTour();
  document.querySelectorAll('.lesson-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.lesson-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (btn) btn.classList.add('active');
  
  // Guardar pestaña en memoria para sobrevivir al F5
  localStorage.setItem('dl_currentTab', tabId);
  
  // ── LA CURA: Ocultar el panel SIEMPRE que no estemos en Ejercicios ──
  if (tabId !== 'exerciseTab') {
      hideLessonPanel();
  }
  // ───────────────────────────────────────────────────────────────────

  if (tabId === 'videoTab') {
      setTimeout(() => iniciarTour(tourVideo, 'video'), 500);
  } else if (tabId === 'theoryTab') {
      setTimeout(() => iniciarTour(tourTeoria, 'teoria'), 500);
  } else if (tabId === 'exerciseTab') { 
      renderExercisePanel(); 
      showLessonPanel(); 
      loadExercise(currentLevelIdx, currentExerciseIdx); 
      setTimeout(inyectarIconoPanel, 0); 
      setTimeout(() => iniciarTour(tourLeccion, 'leccion'), 500);
  }
}

// ── PANEL UDEMY — RENDERIZADO ────────────────────────────────────────
function renderExercisePanel() {
  if (!currentLesson) return;
  const t=TOPICS[currentLesson], cache=progressCache[currentLesson]||{}, done=cache.done||{};

  let html=`<div class="ep-header"><span class="ep-title">Ejercicios</span><span class="ep-subtitle">${t.name}</span></div>`;

  t.niveles.forEach((nivel, li) => {
    const unlocked = li===0 || isLevelComplete(currentLesson, li-1);
    const isOpen   = li===currentLevelIdx;
    const doneCount= nivel.ejercicios.filter(e=>done[e.id]).length;
    const total    = nivel.ejercicios.length;
    const pct      = Math.round((doneCount/total)*100);

    html+=`
    <div class="ep-level ${isOpen?'open':''} ${!unlocked?'locked':''}">
      <div class="ep-level-header" onclick="${unlocked?`toggleEpLevel(${li})`:`showToast('Completa el nivel anterior primero.')`}">
        <span class="ep-chevron">${isOpen?ICONS.chevronDown:ICONS.chevronRight}</span>
        <div class="ep-level-info">
          <span class="ep-level-name">${nivel.titulo}</span>
          <span class="ep-level-count">${doneCount}/${total} completados</span>
        </div>
        ${!unlocked?`<span class="ep-lock">${ICONS.lock}</span>`:`<span class="ep-level-pct">${pct}%</span>`}
      </div>
      <div class="ep-exercises ${isOpen?'open':''}">`;

    nivel.ejercicios.forEach((ej, ei) => {
      const isDone   = !!done[ej.id];
      const isActive = (li===currentLevelIdx && ei===currentExerciseIdx);
      html+=`
        <div class="ep-exercise ${isDone?'done':''} ${isActive?'active':''}"
             onclick="${unlocked?`selectExercise(${li},${ei})`:''}">
          <span class="ep-ex-icon">${isDone?ICONS.check:ICONS.circle}</span>
          <span class="ep-ex-name">${ej.nombre}</span>
          ${isDone?'<span class="ep-done-tag">✓</span>':''}
        </div>`;
    });
    html+=`</div></div>`;
  });

  document.getElementById('exercisePanelBody').innerHTML=html;
}

function toggleEpLevel(li) {
  if (!isLevelUnlocked(currentLesson, li)) { showToast('Completa el nivel anterior primero.'); return; }
  currentLevelIdx=li; currentExerciseIdx=0;
  
  localStorage.setItem('dl_currentLevel', li);
  localStorage.setItem('dl_currentExercise', 0);
  
  loadExercise(li, 0); renderExercisePanel();
}

function selectExercise(li, ei) {
  if (!isLevelUnlocked(currentLesson, li)) { showToast('Completa el nivel anterior primero.'); return; }
  currentLevelIdx=li; currentExerciseIdx=ei;
  
  localStorage.setItem('dl_currentLevel', li);
  localStorage.setItem('dl_currentExercise', ei);
  
  loadExercise(li, ei); renderExercisePanel();
}

function formatEnunciado(texto, lang) {
  if (lang === 'python') return texto;
  
  // 1. Pasa funciones de snake_case a camelCase para lenguajes tipo C
  let formateado = texto.replace(/\b[a-z]+(?:_[a-z]+)+(?=\()/g, match => {
    return match.split('_').map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
  });
  
  // 2. Traducciones específicas
  if (lang === 'java' || lang === 'csharp' || lang === 'cpp') {
      formateado = formateado.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false');
  }
  if (lang === 'c') {
      formateado = formateado.replace(/\bTrue\b/g, '1').replace(/\bFalse\b/g, '0');
  }
  
  // Nulos
  if (lang === 'java' || lang === 'csharp') formateado = formateado.replace(/\bNone\b/g, 'null');
  if (lang === 'cpp' || lang === 'c') formateado = formateado.replace(/\bNone\b/g, 'NULL');
  
  // Tamaños
  if (lang === 'java') formateado = formateado.replace(/\blen\(\)/g, '.length o .size()');
  if (lang === 'csharp') formateado = formateado.replace(/\blen\(\)/g, '.Length o .Count');
  if (lang === 'cpp') formateado = formateado.replace(/\blen\(\)/g, '.size()');
  if (lang === 'c') formateado = formateado.replace(/\blen\(\)/g, 'sizeof()');

  return formateado;
}

function loadExercise(li, ei) {
  const nivel = TOPICS[currentLesson].niveles[li], ej = nivel.ejercicios[ei];
  document.getElementById('exerciseLevelTitle').textContent = `${nivel.titulo} — ${ej.nombre}`;
  document.getElementById('exercisePromptText').textContent = formatEnunciado(ej.enunciado, currentLang);

  const nombres = {'python': 'Python', 'java': 'Java', 'c': 'C', 'cpp': 'C++', 'csharp': 'C#'};
  document.getElementById('editorLangLabel').textContent = `Editor de código — ${nombres[currentLang]}`;

  let starterCode = ej.starter; 
  if (currentLang === 'java' && ej.starter_java) starterCode = ej.starter_java;
  if (currentLang === 'c' && ej.starter_c) starterCode = ej.starter_c;
  if (currentLang === 'cpp' && ej.starter_cpp) starterCode = ej.starter_cpp;
  if (currentLang === 'csharp' && ej.starter_csharp) starterCode = ej.starter_csharp;

  // 1. Buscar si el alumno ya había escrito algo en este ejercicio
  const savedCodeKey = `dl_code_${currentUser}_${currentLesson}_${li}_${ei}_${currentLang}`;
  const savedCode = localStorage.getItem(savedCodeKey);

  if (codeEditor) {
    // Si hay código guardado, lo pone. Si no, pone la plantilla limpia.
    codeEditor.setValue(savedCode || starterCode);
    
    // 2. EL ANTÍDOTO: Esperamos 100 milisegundos a que la pestaña sea visible y lo redibujamos
    setTimeout(() => {
        codeEditor.refresh();
    }, 100);
  } else {
    document.getElementById('codeInput').value = savedCode || starterCode;
  }

  document.getElementById('feedbackBox').style.display = 'none';
}

function isLevelUnlocked(key, li) { return li===0 || isLevelComplete(key, li-1); }
function isLevelComplete(key, li) {
  const nivel=TOPICS[key]?.niveles[li];
  if (!nivel) return false;
  const done=(progressCache[key]||{}).done||{};
  return nivel.ejercicios.every(e=>done[e.id]);
}

// ── PROGRESO ─────────────────────────────────────────────────────────
async function loadProgress() {
  try {
    const res=await fetch('../backend/progreso.php',{method:'GET'});
    const data=await res.json();
    if (data.exito) {
      progressCache={};
      data.datos.forEach(item=>{
        const doneSaved=JSON.parse(localStorage.getItem(`dl_done_${currentUser}_${item.tema}`)||'{}');
        progressCache[item.tema]={videoWatched:item.video_visto==1,exerciseDone:item.ejercicio_resuelto==1,done:doneSaved};
      });
      Object.keys(TOPICS).forEach(k=>{
        if (!progressCache[k]) {
          const doneSaved=JSON.parse(localStorage.getItem(`dl_done_${currentUser}_${k}`)||'{}');
          progressCache[k]={videoWatched:false,exerciseDone:false,done:doneSaved};
        }
      });
      updateAllProgressUI();
    }
  } catch(e) { console.error('Error cargando progreso:',e); }
}

async function saveProgress(topic, isVideo, isExercise) {
  if (!progressCache[topic]) progressCache[topic]={videoWatched:false,exerciseDone:false,done:{}};
  if (isVideo)    progressCache[topic].videoWatched=true;
  if (isExercise) progressCache[topic].exerciseDone=true;
  try {
    await fetch('../backend/progreso.php',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({topic,videoWatched:progressCache[topic].videoWatched,exerciseDone:progressCache[topic].exerciseDone})});
    updateAllProgressUI();
  } catch(e) { console.error('Error guardando:',e); }
}

function markExerciseDone(exerciseId) {
  if (!currentLesson) return;
  if (!progressCache[currentLesson])       progressCache[currentLesson]={videoWatched:false,exerciseDone:false,done:{}};
  if (!progressCache[currentLesson].done)  progressCache[currentLesson].done={};
  progressCache[currentLesson].done[exerciseId]=true;
  localStorage.setItem(`dl_done_${currentUser}_${currentLesson}`,JSON.stringify(progressCache[currentLesson].done));
  const allDone=TOPICS[currentLesson].niveles.every(n=>n.ejercicios.every(e=>progressCache[currentLesson].done[e.id]));
  if (allDone) saveProgress(currentLesson,false,true);
  else updateAllProgressUI();
}

function markVideoWatched() {
  if (!currentLesson) return;
  saveProgress(currentLesson,true,false);
  const btn=document.getElementById('btnMarkVideo');
  if (btn) { btn.textContent='✓ Video completado'; btn.disabled=true; btn.style.opacity='0.5'; btn.style.cursor='default'; }
  showToast('¡Video marcado! +30 XP');
}

function getTopicProgress(key) {
  const p=progressCache[key]||{}, done=p.done||{};
  const total=TOPICS[key].niveles.reduce((s,n)=>s+n.ejercicios.length,0);
  const doneN=Object.values(done).filter(Boolean).length;
  let pct=0;
  if (p.videoWatched) pct+=20;
  pct+=Math.round((doneN/total)*80);
  return Math.min(pct,100);
}

function updateAllProgressUI() {
  const keys=Object.keys(TOPICS);
  let totalPct=0, done=0, xp=0;
  keys.forEach(k=>{
    const pct=getTopicProgress(k); totalPct+=pct; if(pct===100) done++;
    const p=progressCache[k]||{};
    const doneEx=Object.values(p.done||{}).filter(Boolean).length;
    if(p.videoWatched) xp+=30; xp+=doneEx*20;
    const badge=document.getElementById('badge-'+k), mini=document.getElementById('mini-'+k);
    if(badge){badge.textContent=pct+'%'; badge.className='badge '+(pct===100?'badge-done':'badge-lock');}
    if(mini) mini.style.width=pct+'%';
    const tp=document.getElementById('tp-'+k), tpt=document.getElementById('tpt-'+k);
    if(tp)  tp.style.width=pct+'%';
    if(tpt) tpt.textContent=pct===0?'Sin iniciar':pct===100?'¡Completado!':`${pct}% en curso`;
  });
  const overall=Math.round(totalPct/keys.length);
  ['statDone','statPct','statExer','userXP'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el) el.textContent=[done,overall+'%',done,xp+' XP'][i];
  });
  updateContinueButton();
  const eg=document.getElementById('emptyStateGuide');
  if(eg) eg.classList.toggle('show',totalPct===0);
}

function updateContinueButton() {
  const keys=Object.keys(TOPICS); let found=false;
  for (let k of keys) { if(getTopicProgress(k)<100){nextLessonKey=k;found=true;break;} }
  const banner=document.getElementById('continueBanner'), title=document.getElementById('continueTitle');
  const label=document.getElementById('continueLabel'), btn=document.getElementById('continueBtn');
  if(!banner) return;
  if(!found){ banner.style.borderColor='var(--accent3)'; label.style.color='var(--accent3)'; label.textContent='¡Felicidades!'; title.textContent='Has completado todo el curso'; if(btn) btn.style.display='none'; }
  else { const pct=getTopicProgress(nextLessonKey); banner.style.borderColor='var(--accent)'; label.style.color='var(--accent)'; label.textContent=pct===0?'Empieza tu primera lección':'Siguiente recomendada'; title.textContent=TOPICS[nextLessonKey].name; if(btn){btn.style.display='block';btn.textContent=pct===0?'Empezar →':'Continuar →';} }
}

function continueLesson() { openLesson(nextLessonKey); }

function renderProgress() {
  const list=document.getElementById('progressList'), icons={matrices:'▦',pilas:'⊟',listas:'⊞',colas:'⊠',arboles:'⊕',grafos:'⊛'};
  list.innerHTML=''; let total=0;
  Object.keys(TOPICS).forEach(k=>{
    const pct=getTopicProgress(k); total+=pct;
    const status=pct===100?'done':pct>0?'inprog':'todo';
    const label=pct===100?'✓ Completado':pct>0?`${pct}% en curso`:'Sin iniciar';
    const p=progressCache[k]||{}, done=p.done||{};
    const levelTags=TOPICS[k].niveles.map((n,i)=>{
      const c=n.ejercicios.filter(e=>done[e.id]).length;
      return `<span class="pi-lvl ${c===n.ejercicios.length?'done':''}" title="${n.titulo}">N${i+1} ${c}/${n.ejercicios.length}</span>`;
    }).join('');
    list.innerHTML+=`<div class="progress-item"><div class="pi-icon">${icons[k]}</div><div class="pi-info"><div class="pi-name">${TOPICS[k].name}</div><div class="pi-bar"><div class="pi-fill" style="width:${pct}%"></div></div><div class="pi-levels">${levelTags}</div></div><div class="pi-status ${status}">${label}</div></div>`;
  });
  const overall=Math.round(total/Object.keys(TOPICS).length);
  const op=document.getElementById('overallPct'); if(op) op.textContent=overall+'%';
  const of=document.getElementById('overallFill'); if(of) of.style.width=overall+'%';
}

// ── EVALUADOR ────────────────────────────────────────────────────────
async function evaluateCode() {
  const nivel = TOPICS[currentLesson]?.niveles[currentLevelIdx], ej = nivel?.ejercicios[currentExerciseIdx];
  const code = codeEditor ? codeEditor.getValue() : document.getElementById('codeInput').value;
  const fb = document.getElementById('feedbackBox');
  
  // ── VALIDACIÓN UX: ¿El código está intacto? ──
  // Ahora bloquea a los tramposos en los 5 lenguajes xd
  let starterCode = ej?.starter || '';
  if (currentLang === 'java' && ej?.starter_java) starterCode = ej.starter_java;
  if (currentLang === 'c' && ej?.starter_c) starterCode = ej.starter_c;
  if (currentLang === 'cpp' && ej?.starter_cpp) starterCode = ej.starter_cpp;
  if (currentLang === 'csharp' && ej?.starter_csharp) starterCode = ej.starter_csharp;

  if (code.trim() === starterCode.trim()) {
    fb.className = 'feedback-box'; 
    fb.style.display = 'block';
    document.getElementById('fbIcon').innerHTML = ICONS.compass; 
    document.getElementById('fbTitle').textContent = '¡Anímate a escribir!';
    document.getElementById('fbMessage').innerHTML = '<p>Parece que no has modificado la plantilla inicial. Escribe tu solución antes de ejecutar el código.</p>';
    return; // Detenemos la ejecución aquí
  }
  // ──────────────────────────────────────────────
  
  fb.className = 'feedback-box'; fb.style.display = 'block';
  document.getElementById('fbIcon').innerHTML = '<span>○</span>';
  document.getElementById('fbTitle').textContent = 'Compilando y ejecutando...';
  document.getElementById('fbMessage').innerHTML = '<p>Por favor espera, procesando código en el entorno...</p>';

  let salidaReal = "";
  let huboErrorEjecucion = false;

  // ── MAPA DE IDs DE JUDGE0 CE ──
  const judge0_ids = {
      'java': 62,
      'c': 50,       // GCC 9.2.0
      'cpp': 54,     // GCC 9.2.0
      'csharp': 51   // Mono 6.6.0
  };

  if (currentLang === 'python') {
    Sk.configure({
      output: function(texto) { salidaReal += texto; },
      read: function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
      }
    });
    try {
      await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code));
    } catch (err) {
      salidaReal = err.toString();
      huboErrorEjecucion = true;
    }
  } else {
    // Si no es Python, viaja a la nube con su respectivo ID
    salidaReal = await executeRemote(code, judge0_ids[currentLang]);
    if (salidaReal.includes("ERROR")) huboErrorEjecucion = true;
  }

  // ── TÍTULO DE CONSOLA LIMPIO ──
  let htmlConsola = `
    <div class="terminal-output">
      <div class="terminal-header">> Consola:</div>
      <div style="${huboErrorEjecucion ? 'color:#fca5a5;' : ''}">${salidaReal || "Programa ejecutado sin salidas visuales."}</div>
    </div>`;

  // 2. VALIDACIÓN ESTRUCTURAL EN EL BACKEND
  try {
    const res=await fetch('../backend/evaluar_ejercicio.php',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        tema:currentLesson,
        ejercicio_id:ej?.id,
        codigo:code,
        lenguaje:currentLang,
        salida:salidaReal // <-- AHORA SÍ LE MANDAMOS LA CONSOLA AL PHP
      })
    });
    
    const data=await res.json();
    
    // 3. MOSTRAR RESULTADOS AL USUARIO
    if(data.exito && !huboErrorEjecucion) {
      fb.className='feedback-box success';
      document.getElementById('fbIcon').innerHTML=ICONS.success;
      document.getElementById('fbTitle').textContent='¡Ejercicio completado!';
      document.getElementById('fbMessage').innerHTML= `<p>${data.mensaje}</p>` + htmlConsola + `
        <button class="btn-primary" onclick="advanceToNext()" style="margin-top: 24px; width: auto; padding: 10px 20px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          Siguiente Ejercicio →
        </button>`;
      
      markExerciseDone(ej.id); 
      renderExercisePanel(); 
      showToast('¡Correcto! +20 XP');
      checkAndShowCertificate();
    } else {
      fb.className='feedback-box error';
      document.getElementById('fbIcon').innerHTML=ICONS.error;
      document.getElementById('fbTitle').textContent= huboErrorEjecucion ? 'Error de compilación o ejecución' : 'Hay un detalle a corregir';
      
      let mensajeBackend = (data.exito && huboErrorEjecucion) ? "Tu código tiene un error de sintaxis en " + currentLang.toUpperCase() + "." : data.mensaje;
      if (!data.exito && !huboErrorEjecucion) mensajeBackend = data.mensaje;

      document.getElementById('fbMessage').innerHTML=`<p>${mensajeBackend}</p>` + htmlConsola;
    }
  } catch(e) {
    console.error(e);
    fb.className='feedback-box error';
    document.getElementById('fbTitle').textContent='Error de servidor';
    document.getElementById('fbMessage').textContent='No se pudo validar con el backend, pero tu consola está arriba.';
  }
}

function advanceToNext() {
  const nivel=TOPICS[currentLesson].niveles[currentLevelIdx];
  if (currentExerciseIdx<nivel.ejercicios.length-1) { selectExercise(currentLevelIdx,currentExerciseIdx+1); }
  else if (currentLevelIdx<TOPICS[currentLesson].niveles.length-1) {
    const nextLi=currentLevelIdx+1;
    if(isLevelUnlocked(currentLesson,nextLi)){ selectExercise(nextLi,0); showToast(`¡Nivel ${nextLi+1} desbloqueado!`); }
  } else { showToast('¡Lección completada! 🎉'); }
}

function clearCode() {
  const ej = TOPICS[currentLesson]?.niveles[currentLevelIdx]?.ejercicios[currentExerciseIdx];
  if (codeEditor) {
      let starterCode = ej?.starter || ''; 
      if (currentLang === 'java' && ej?.starter_java) starterCode = ej.starter_java;
      if (currentLang === 'c' && ej?.starter_c) starterCode = ej.starter_c;
      if (currentLang === 'cpp' && ej?.starter_cpp) starterCode = ej.starter_cpp;
      if (currentLang === 'csharp' && ej?.starter_csharp) starterCode = ej.starter_csharp;
      
      codeEditor.setValue(starterCode);
      
      // Borramos de la memoria para que no vuelva a aparecer con F5
      const savedCodeKey = `dl_code_${currentUser}_${currentLesson}_${currentLevelIdx}_${currentExerciseIdx}_${currentLang}`;
      localStorage.removeItem(savedCodeKey);
  }
  document.getElementById('feedbackBox').style.display='none';
  showToast('Código reiniciado a la plantilla base.');
}

// ── UTILIDADES ───────────────────────────────────────────────────────
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&!e.ctrlKey&&!e.metaKey){
    if(document.getElementById('loginScreen')?.classList.contains('active'))    handleLogin();
    if(document.getElementById('registerScreen')?.classList.contains('active')) handleRegister();
  }
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){
    if(document.getElementById('lessonView')?.classList.contains('active')&&document.getElementById('exerciseTab')?.classList.contains('active')){
      e.preventDefault(); evaluateCode(); showToast('⚡ Ctrl+Enter — ejecutando...');
    }
  }
});

function togglePasswordVisibility(inputId,iconEl){
  const input=document.getElementById(inputId);
  if(input.type==='password'){input.type='text';iconEl.innerHTML=ICONS.eyeOff;}
  else{input.type='password';iconEl.innerHTML=ICONS.eye;}
}

const regPassInput=document.getElementById('regPass'), passRules=document.getElementById('passwordRules');
const iconV=`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
if(regPassInput){
  regPassInput.addEventListener('input',function(){
    const v=this.value; passRules.style.display=v.length>0?'block':'none';
    [['rule-length',v.length>=8],['rule-upper',/[A-Z]/.test(v)],['rule-lower',/[a-z]/.test(v)],['rule-number',/[0-9]/.test(v)],['rule-special',/[!@#$%^&*(),.?":{}|<>]/.test(v)]].forEach(([id,ok])=>{
      const li=document.getElementById(id),sp=li?.querySelector('.rule-icon');
      if(!li||!sp) return;
      if(ok){li.classList.add('valid');sp.innerHTML=iconV;}else{li.classList.remove('valid');sp.innerHTML='○';}
    });
  });
}

function changeLanguage() {
  currentLang = document.getElementById('langSelect').value;
  localStorage.setItem('dl_currentLang', currentLang); // <-- Memoria añadida

  // Nombres bonitos para el título
  const nombres = {
      'python': 'Python', 'java': 'Java', 
      'c': 'C', 'cpp': 'C++', 'csharp': 'C#'
  };
  document.getElementById('editorLangLabel').textContent = `Editor de código — ${nombres[currentLang]}`;

  if (codeEditor) {
    // Modos de CodeMirror para cada lenguaje
    const modos = {
        'python': 'python',
        'java': 'text/x-java',
        'c': 'text/x-csrc',
        'cpp': 'text/x-c++src',
        'csharp': 'text/x-csharp'
    };
    codeEditor.setOption("mode", modos[currentLang]);
    loadExercise(currentLevelIdx, currentExerciseIdx);
  }
}

// Funciones auxiliares para convertir a Base64 sin romper los acentos en español
function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}
function decodeBase64(str) {
    if (!str) return "";
    return decodeURIComponent(escape(atob(str)));
}

async function executeRemote(sourceCode, languageId) {
  const baseUrl = `https://${RAPIDAPI_HOST}/submissions`;
  
  const postOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': RAPIDAPI_HOST
    },
    body: JSON.stringify({
      source_code: encodeBase64(sourceCode), // MANDAMOS EL CÓDIGO EN BASE64
      language_id: languageId,
      stdin: encodeBase64("")
    })
  };

  try {
    // 1. Enviamos el código indicando base64_encoded=true
    let response = await fetch(baseUrl + "?base64_encoded=true&wait=true", postOptions);
    
    if (!response.ok) {
        const errorText = await response.text();
        return `Error al enviar código (${response.status}): ${errorText}`;
    }

    let result = await response.json();
    const token = result.token;
    if (!token) return " Error: No se recibió el ticket (token) del Sandbox.";

    // 2. POLLING
    let statusId = result.status ? result.status.id : 1;
    let intentos = 0;
    
    while ((statusId === 1 || statusId === 2) && intentos < 10) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        intentos++;
        
        let checkResponse = await fetch(`${baseUrl}/${token}?base64_encoded=true&fields=*`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            }
        });
        
        if (!checkResponse.ok) {
            const errTxt = await checkResponse.text();
            return `Error al consultar estado (${checkResponse.status}): ${errTxt}`;
        }
        
        result = await checkResponse.json();
        statusId = result.status.id; 
    }
    
    // 3. PROCESAMOS Y DECODIFICAMOS EL RESULTADO (DE BASE64 A TEXTO NORMAL)
    if (statusId === 3) {
        return result.stdout ? decodeBase64(result.stdout) : "Programa ejecutado sin salidas en consola.";
    } else if (statusId === 6) {
        return "ERROR DE COMPILACIÓN:\n" + (result.compile_output ? decodeBase64(result.compile_output) : "Revisa la sintaxis de tu código.");
    } else if (statusId >= 7 && statusId <= 12) {
        return "ERROR DE EJECUCIÓN (Runtime):\n" + (result.stderr ? decodeBase64(result.stderr) : "El programa falló mientras corría.");
    } else if (statusId === 5) {
        return "ERROR: Límite de tiempo excedido (Posible bucle infinito).";
    } else {
        return `Estado de ejecución: ${result.status ? result.status.description : 'Desconocido'}\n` + 
               (result.stderr ? decodeBase64(result.stderr) : (result.stdout ? decodeBase64(result.stdout) : ""));
    }
    
  } catch (error) {
    console.error("Error crítico en Sandbox:", error);
    return "Fallo de conexión de Red. Revisa la consola (F12) de tu navegador.";
  }
}

// ── SISTEMA DE CERTIFICADO ──

function checkAndShowCertificate() {
  let totalEjercicios = 0;
  let completados = 0;

  for (const key in TOPICS) {
      const tema = TOPICS[key];
      const cache = progressCache[key] || {};
      const resueltos = cache.resolved || [];

      tema.niveles.forEach(nivel => {
          totalEjercicios += nivel.ejercicios.length;
      });
      completados += resueltos.length;
  }

  const certBanner = document.getElementById('certBanner');
  if (certBanner) {
      // Si ya completó todos los ejercicios (y hay ejercicios registrados)
      if (totalEjercicios > 0 && completados === totalEjercicios) {
          certBanner.style.display = 'flex';
      } else {
          certBanner.style.display = 'none';
      }
  }
}

function downloadCertificate() {
  const { jsPDF } = window.jspdf;
  // Formato A4 en horizontal (Landscape)
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // 1. Fondo oscuro elegante
  doc.setFillColor(17, 17, 24); 
  doc.rect(0, 0, 297, 210, 'F');

  // 2. Borde exterior
  doc.setDrawColor(99, 102, 241); // Color Indigo
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);
  doc.setDrawColor(79, 70, 229);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 273, 186);

  // 3. Textos Centrales
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(40);
  doc.text("Certificado de Excelencia", 148.5, 50, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(200, 200, 200);
  doc.text("Este documento certifica que", 148.5, 80, { align: "center" });

  // Nombre del Usuario (En cyan)
  doc.setFontSize(36);
  doc.setTextColor(0, 212, 255);
  doc.text(currentUser.toUpperCase(), 148.5, 110, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text("Ha completado con éxito todos los módulos del curso interactivo de", 148.5, 135, { align: "center" });

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Estructuras de Datos Multilenguaje", 148.5, 150, { align: "center" });

  // 4. Pie de página (Fecha e Institución)
  const fecha = new Date().toLocaleDateString('es-MX');
  doc.setFontSize(12);
  doc.setTextColor(150, 150, 150);
  doc.text(`Fecha de emisión: ${fecha}`, 148.5, 175, { align: "center" });
  
  // El toque institucional
  doc.setTextColor(99, 102, 241);
  doc.text("Plataforma Data Learn — Facultad de Ingeniería Mochis", 148.5, 185, { align: "center" });

  // 5. Descargar el archivo
  doc.save(`Certificado_DataLearn_${currentUser}.pdf`);
  showToast("¡Certificado generado y descargado!");
}

// ── PANEL DOCENTE (ADMIN) ──
async function openAdminPanel() {
    showView('adminView');
    const tbody = document.getElementById('adminTableBody');
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando alumnos...</td></tr>';
    
    try {
        const res = await fetch('../backend/autenticacion.php?accion=obtener_alumnos');
        const data = await res.json();
        
        if (data.exito) {
            tbody.innerHTML = '';
            if (data.alumnos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay alumnos registrados aún.</td></tr>';
                return;
            }
            
            data.alumnos.forEach(alum => {
                const badgeClass = alum.auth_provider === 'google' ? 'auth-google' : 'auth-local';
                const providerText = alum.auth_provider || 'Local';
                
                tbody.innerHTML += `
                    <tr>
                        <td>#${alum.id_usuario}</td>
                        <td style="font-weight:bold;">${alum.nombre_usuario}</td>
                        <td><span class="auth-badge ${badgeClass}">${providerText}</span></td>
                        <td>${alum.fecha_registro}</td>
                    </tr>
                `;
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#fca5a5;">${data.mensaje}</td></tr>`;
        }
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#fca5a5;">Error de conexión.</td></tr>`;
    }
}