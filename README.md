# 📘 CursoReactTP

Proyecto de práctica final del curso de React.  
Incluye funcionalidades como gestión de usuarios, productos y autenticación de login.  
Se utiliza **Vite** como bundler y **Material UI** como librería de componentes de interfaz.

---

## 📂 Estructura básica del proyecto:

```plaintext
CursoReactTP/
├── public/
├── src/
│   ├── components/      # Componentes reutilizables como Header, ConfirmDialog, Login, etc.
│   ├── pages/           # Vistas principales: Inicio, Usuarios, Productos, etc.
│   ├── services/        # Lógica de acceso a servicios externos (APIs)
│   ├── App.jsx          # Configuración de rutas y estructura principal
│   └── main.jsx         # Punto de entrada de la aplicación
├── .gitignore           # Archivos/Carpetas que no se suben al repo (por ejemplo node_modules)
├── package.json         # Dependencias y scripts de npm
└── vite.config.js       # Configuración de Vite
