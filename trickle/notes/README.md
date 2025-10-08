# LINKS PARA MAYORES - Documentación del Proyecto

## Descripción
Página web exclusiva para mayores de edad que permite gestionar una lista de links. Solo el administrador puede editar la lista mediante una contraseña.

## Características Principales

### 🔒 Control de Acceso
- **Verificación de edad**: Modal de advertencia al ingresar
- **Modo edición protegido**: Contraseña requerida (admin123)
- **Persistencia de sesión**: Se recuerda la verificación de edad

### 🎨 Diseño Visual
- **Fondo animado**: Gradiente expandido con 13 tonos de gris que transiciona suavemente de claro a negro con animación lenta (40s)
- **Modo nocturno**: Botón para alternar a fondo completamente negro
- **Interfaz responsiva**: Adaptable a diferentes tamaños de pantalla
- **Efectos visuales**: Glassmorphism y transiciones suaves

### 📋 Gestión de Links
- **Categorías organizadas**: Tres pestañas para diferentes tipos de videos (Completos, VideosH, Cortos)
- **Lista numerada**: Links ordenados automáticamente (#1, #2, etc.)
- **Solo lectura por defecto**: Usuarios normales solo pueden ver y acceder
- **Edición protegida**: Botón oculto en esquina superior izquierda, requiere contraseña
- **Validación de URLs**: Agrega https:// automáticamente si es necesario
- **Almacenamiento separado**: Cada categoría mantiene su propia lista independiente

### 💾 Almacenamiento
- **LocalStorage**: Los links se guardan localmente en el navegador
- **Link de ejemplo**: Se incluye un ejemplo inicial
- **Persistencia**: Los datos se mantienen entre sesiones

## Estructura de Archivos

```
├── index.html              # Página principal con estilos CSS
├── app.js                  # Componente principal y lógica de estado
├── components/
│   ├── AgeWarning.js       # Modal de verificación de edad
│   ├── LinksList.js        # Lista de links con numeración
│   └── EditForm.js         # Formulario para agregar links
├── utils/
│   └── storage.js          # Funciones para localStorage
└── trickle/
    ├── assets/
    │   └── background-gradient.json
    └── notes/
        └── README.md
```

## Configuración de Acceso

- **Usuario de edición**: `Kairo.Soren.Star`
- **Contraseña de edición**: `KAIRO.soren.STAR755799@`
- **Botón de edición**: Oculto en esquina superior izquierda
- **Almacenamiento**: LocalStorage del navegador (separado por categorías)
- **Verificación de edad**: Persistente por sesión
- **Modo nocturno**: Botón flotante en esquina superior derecha
- **Categorías**: Videos Completos, VideosH, Videos Cortos

## Tecnologías Utilizadas

- React 18 (sin JSX)
- TailwindCSS para estilos
- Lucide Icons para iconografía
- CSS3 para animaciones
- LocalStorage para persistencia

## Notas de Mantenimiento

- Los links se almacenan en formato JSON en localStorage separados por categoría
- La verificación de edad se guarda como flag booleano
- La preferencia de modo nocturno se persiste en localStorage
- La categoría activa se guarda en localStorage
- Los estilos utilizan variables CSS personalizadas para fácil modificación
- El gradiente animado dura 40 segundos con 13 puntos de color y se puede personalizar
- En modo nocturno se desactiva la animación del gradiente
- Cada categoría (completos, videosH, cortos) mantiene su propia lista independiente
