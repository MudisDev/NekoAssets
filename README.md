# 🖥️ NekoAssets

> Aplicación de escritorio desarrollada con Electron y React para centralizar la generación y gestión de imágenes mediante ComfyUI, con registro de metadatos y persistencia en MySQL.

![Electron](https://img.shields.io/badge/Electron-Desktop_App-blue)
![Express](https://img.shields.io/badge/Express-Backend-purple)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![ComfyUI](https://img.shields.io/badge/ComfyUI_API-Stable_Diffusion-pink)
![Estado](https://img.shields.io/badge/Estado-En_Desarrollo-orange)

---

## 📱 Descripción

**NekoAssets** es una aplicación de escritorio desarrollada con **Electron**, **React** y **TypeScript**, con un backend propio en **Node.js** y **Express**, diseñada para centralizar la generación y gestión de imágenes mediante **ComfyUI**.

El proyecto busca facilitar la organización de los recursos visuales generados mediante inteligencia artificial, permitiendo consultar imágenes, recuperar información de sus generaciones y registrar metadatos en una base de datos **MySQL**.

**NekoAssets** forma parte del ecosistema de herramientas de desarrollo de **MudisDev** y surge de la necesidad de simplificar el flujo de trabajo para crear, consultar y administrar assets destinados a proyectos propios, como **WaifuPaper** y **NekoPanzer**.

---

## ✨ Características principales

### Técnicas

- 🖥️ Aplicación de escritorio basada en Electron.
- ⚛️ Interfaz desarrollada con React y TypeScript.
- 🔌 API REST propia mediante Node.js y Express.
- 🎨 Integración con la API de ComfyUI para ejecutar workflows de generación.
- 🗄️ Persistencia de imágenes y metadatos de generación en MySQL.
- 🔍 Consulta del historial de generación mediante identificadores de ComfyUI.
- 📂 Acceso controlado al sistema de archivos mediante funcionalidades de Electron.
- 🧩 Separación de responsabilidades entre interfaz, backend, generación y persistencia.

### Funcionales

- 🖼️ Generación de imágenes mediante workflows de ComfyUI.
- 📋 Consulta de imágenes generadas y su historial.
- 🔎 Visualización de información asociada a las generaciones.
- ⚙️ Gestión de archivos y directorios locales.
- 🧠 Registro de parámetros de generación, como prompts, semillas, checkpoint y configuración del sampler.
- 🗃️ Registro de imágenes y metadatos en la base de datos.

---

## 🛠️ Tecnologías utilizadas

### Aplicación de escritorio

- Electron
- React
- TypeScript
- CSS

### Backend

- Node.js
- Express
- JavaScript
- API REST

### Inteligencia artificial

- ComfyUI
- Stable Diffusion
- Workflows personalizados

### Base de datos

- MySQL

### Herramientas

- Visual Studio Code
- Git y GitHub
- Postman
- Krita
- Stable Diffusion

---

## 🧠 Arquitectura del proyecto

NekoAssets utiliza una arquitectura modular que separa la interfaz de escritorio, el backend, el motor de generación y la persistencia de información.

```text
          NekoAssets
               │
       ┌───────┴────────┐
       ↓                ↓
  React + Electron    Express API
       │                │
       │          ┌─────┴─────┐
       │          ↓           ↓
       │       ComfyUI      MySQL
       │          │           ↑
       │          ↓           │
       │     Imagen generada ─┘
       │
       ↓
  Interfaz de usuario
```

La aplicación se organiza en los siguientes componentes:

- **Frontend:** interfaz de escritorio desarrollada con React y TypeScript.
- **Backend:** API REST desarrollada con Express y JavaScript para gestionar solicitudes y operaciones de datos.
- **Motor de generación:** ComfyUI procesa los workflows y genera las imágenes.
- **Persistencia:** MySQL almacena los registros de imágenes y los metadatos de generación.
- **Sistema de archivos:** Electron permite acceder a los recursos locales mediante los mecanismos habilitados por la aplicación.

Esta separación facilita el mantenimiento del código y permite ampliar las funcionalidades sin concentrar toda la lógica en un único componente.

---

## 🎨 Generación de imágenes mediante IA

NekoAssets se integra con ComfyUI, que actúa como motor externo para ejecutar workflows de generación de imágenes.

La aplicación envía las solicitudes de generación, consulta el resultado mediante el identificador de cada proceso y registra la información correspondiente.

El flujo general es el siguiente:

```text
Configuración del workflow
↓
Solicitud a ComfyUI
↓
Procesamiento del modelo
↓
Generación de la imagen
↓
Consulta del resultado
↓
Registro en MySQL
```

Este enfoque permite mantener la lógica de generación separada de la interfaz de usuario y aprovechar las posibilidades de personalización de los workflows de ComfyUI.

---

## 🗄️ Gestión de imágenes y metadatos

NekoAssets contempla el registro de las imágenes generadas junto con información que permite consultar su procedencia y configuración.

Entre los datos asociados a una generación se encuentran:

- Prompt positivo y negativo.
- Semilla utilizada.
- Checkpoint seleccionado.
- Sampler y scheduler.
- Número de pasos y CFG.
- Identificador de generación de ComfyUI.
- Referencias a las imágenes de entrada y salida, cuando corresponda.

La persistencia de esta información permite consultar generaciones anteriores y proporciona una base para futuras funcionalidades de organización, búsqueda y comparación de resultados.

---

## ⚙️ Configuración del proyecto

**Requisitos**

Para ejecutar el proyecto durante el desarrollo se requiere:

- Node.js y npm.
- ComfyUI instalado y configurado.
- Un modelo compatible con los workflows utilizados.
- MySQL.
- Las dependencias de la aplicación y del backend.

**Configuración general**

- Instalar las dependencias del proyecto de escritorio.
- Instalar las dependencias del backend Express.
- Configurar la conexión a MySQL mediante la configuración local correspondiente.
- Iniciar ComfyUI y comprobar que su API esté disponible.
- Ejecutar el backend y después iniciar la aplicación de escritorio.

Los comandos específicos de instalación y ejecución, así como las variables de entorno necesarias, se documentarán conforme se consolide la configuración del proyecto.

Por motivos de seguridad, las credenciales de conexión y otros datos privados no deben incluirse en el repositorio.

---

## 🔮 Futuras mejoras

- 🗂️ Organización avanzada de assets mediante etiquetas, categorías y colecciones.
- ⭐ Sistema de favoritos.
- 🔍 Búsqueda y filtros avanzados.
- 🖼️ Visor de imágenes con controles adicionales.
- 🔄 Versionado de imágenes y comparación de variaciones.
- ⚙️ Configuración y administración avanzada de workflows.
- 🧠 Integración de herramientas para preparar datasets y entrenar LoRAs personalizadas.
- 🎨 Integración con Krita para complementar el flujo de generación y edición.
- 📤 Exportación y organización de recursos para otros proyectos.

---

## 👨‍💻 Autor

**Martín Bibiano (MudisDev)**

📧 Email: [devgames.studio4@gmail.com](mailto:devgames.studio4@gmail.com)
💼 Portfolio: _[mudisdev.com](https://mudisdev.com)_
🐙 GitHub: _[github.com/MudisDev](https://github.com/MudisDev)_

---

## ⚠️ Nota

Este proyecto se encuentra en desarrollo activo y continúa recibiendo mejoras de rendimiento, arquitectura y nuevas funcionalidades.
