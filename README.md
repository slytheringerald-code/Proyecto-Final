# Proyecto Final - CRUD de Elementos

Este proyecto es una aplicacion web de gestion de elementos con un backend robusto en Node.js y un frontend interactivo disenado con estetica premium.

##* Instalacion y Configuracion

Sigue estos pasos para poner en marcha el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/slytheringerald-code/Proyecto-Final.git
cd Proyecto-Final
```

### 2. Instalar dependencias
Asegurate de tener [Node.js](https://nodejs.org/) instalado. Luego ejecuta:
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo .env en la raiz del proyecto con la siguiente configuracion:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secreto_seguro_aqui
```

##* Como correr el servidor

### Desarrollo
Para iniciar el servidor con reinicio automatico (usando nodemon):
```bash
npm run dev
```

### Produccion
Para iniciar el servidor en modo produccion:
```bash
npm start
```

El servidor estara disponible en http://localhost:3000.

##* Documentacion de la API

Puedes encontrar la descripcion detallada de todos los endpoints disponibles en el siguiente enlace:

-> [Documentacion de la API](API.md)

##* Caracteristicas principales
- Backend: Express.js con persistencia en archivos JSON.
- Seguridad: Autenticacion mediante JSON Web Tokens (JWT) y cifrado de contrasenas con bcryptjs.
- Frontend: Interfaz moderna con fuente Outfit y diseno responsivo.
- Modularidad: Estructura de carpetas organizada.

##* Licencia
Este proyecto esta bajo la licencia ISC.
