---

# 🖥️💻 COWORKING LA CIBA 🏢📅

## 📚 Tabla de Contenidos
- [📋 Descripción del Proyecto](#descripcion-del-proyecto)
- [🚀 Objetivos del Proyecto](#objetivos-del-proyecto)
- [📓 Competencias Técnicas](#competencias-tecnicas)
- [💻 Tecnologías Usadas](#tecnologias-usadas)
- [🎯 Requisitos Funcionales](#requisitos-funcionales)
- [⭐ Funcionalidades Extra](#funcionalidades-extra)
- [⚙️ Requisitos No Funcionales](#requisitos-no-funcionales)
- [🛠 Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [📐 Diseño de la UI](#diseño-de-la-ui)
- [🚀 Guía de Instalación](#guia-de-instalacion)
- [🤝 Contribución](#contribucion)
- [🙏🏼 Agradecimientos](#agradecimientos)

---

## 📋 Descripción del Proyecto
**Coworking La Ciba** es un sistema de reservas de espacios de coworking diseñado para maximizar el uso de los recursos, gestionar horarios sin conflictos, y promover la igualdad de género, innovación social y economía feminista. Este sistema está dirigido a emprendedores, pequeñas empresas y proyectos enfocados en oportunidades igualitarias, proporcionando un espacio colaborativo y soporte técnico para su crecimiento.

---

## 🚀 Objetivos del Proyecto
- Fomentar la creación de empresas y vocaciones emprendedoras.
- Promover el crecimiento empresarial mediante una eficiente gestión de recursos.
- Impulsar la economía social y solidaria mediante la reserva y uso de espacios colaborativos.

---

## 📓 Competencias Técnicas
- Creación de una interfaz web dinámica y adaptable.
- Desarrollo de un backend robusto.
- Implementación de una base de datos relacional.
- Desarrollo de componentes de acceso a datos.
- Construcción de una interfaz de usuario con capacidades de gestión de contenido.

---

## 💻 Tecnologías Usadas

### Frontend:
- **React.js** - [React](https://reactjs.org/)
- **HTML5** - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- **CSS3** - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Styled Components** - [Styled Components](https://styled-components.com/)
- **Axios** - [Axios](https://axios-http.com/)

### Backend:
- **Java** - [Java](https://www.oracle.com/java/)
- **Spring Boot** - [Spring Boot](https://spring.io/projects/spring-boot)
- **Spring Security (JWT)** - [Spring Security](https://spring.io/guides/tutorials/spring-security-and-angular-js/)

### Base de Datos:
- **PostgreSQL** - [PostgreSQL](https://www.postgresql.org/)

### Testing:
- **Vitest** - [Vitest](https://vitest.dev/)
- **JUnit** - [JUnit](https://junit.org/junit5/)
- **Mockito** - [Mockito](https://site.mockito.org/)

### Herramientas:
- **Figma** - [Figma](https://www.figma.com/)
- **Visual Studio Code** - [VSCode](https://code.visualstudio.com/)
- **Trello** - [Trello](https://trello.com/)
- **Git y GitHub** - [Git](https://git-scm.com/)
- **Discord** - [Discord](https://discord.com/)
- **PgAdmin** - [PgAdmin](https://www.pgadmin.org/)
- **Postman** - [Postman](https://www.postman.com/)

---

## 🎯 Requisitos Funcionales
- **Autenticación de Usuarios**: Registro e inicio de sesión mediante email y contraseña.
- **Roles de Usuarios**:
  - **Admin**: Gestión de usuarios y visualización/modificación de todas las reservas.
  - **Usuario**: CRUD sobre sus propias reservas.
- **Gestión de Espacios**:
  - Reserva de escritorios, oficinas y salas de reuniones.
  - Confirmación automática de reservas.
  - Gestión dinámica de horarios.
- **Interfaz de Reservas**:
  - Visualización de disponibilidad a través de un calendario interactivo.
  - Mapa de coworking con indicador de disponibilidad.
- **Panel de Control del Admin**:
  - Gestión CRUD de usuarios.
  - Vista y modificación de reservas.

---

## ⭐ Funcionalidades Extra
- Integración con Google Calendar o similar para recordatorios automáticos.
- Envío de confirmaciones y recordatorios de reservas por email.

---

## ⚙️ Requisitos No Funcionales
- Uso de Spring Boot y React.js.
- Diseño adaptable y estético con Styled Components.
- Experiencia de usuario (UX) excelente.
- Arquitectura de 3 capas MVC (Modelo-Vista-Controlador) con API REST.
- Proyecto totalmente testeado con pruebas unitarias e integradas (TDD).

---

## 🛠 Arquitectura del Proyecto
La arquitectura del proyecto sigue el modelo MVC de 3 capas:

- **Modelo**: Gestión de base de datos con PostgreSQL.
- **Vista**: Interfaz de usuario en React.js y Styled Components.
- **Controlador**: API REST en Spring Boot para manejar la lógica y servir datos.

---

## 📐 Diseño de la UI
La interfaz de usuario sigue la metodología de Atomic Design, permitiendo la creación de componentes escalables y reutilizables. El diseño se enfoca en la usabilidad y rendimiento.

**Proceso de Diseño**:
- Prototipos y wireframes en Figma.
- Desarrollo visual adaptable para dispositivos móviles y escritorio.
- Diseño moderno y responsive implementado con Styled Components.

---

## 🚀 Guía de Instalación 

### Requisitos Previos:
- **Node.js** (v14+)
- **Java 11+**
- **PostgreSQL**

### 1. Clona los Repositorios:
**Frontend**:

```bash
git clone https://github.com/castellanorn/ciba-coworking-front.git
```

**Backend**:

```bash
git clone https://github.com/Sarii4/ciba-coworking-back.git
```

### 2. Navega a los Directorios del Proyecto:
**Frontend**:

```bash
cd ciba-coworking-front
```
**Backend**:

```bash
cd ciba-coworking-back
```

### 3. Instala las Dependencias:
**Frontend**:

```bash
npm install
```
**Backend**:

```bash
./mvnw install
```

### 4. Ejecuta las Aplicaciones:
Inicia el servidor Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Inicia la aplicación Frontend:

```bash
cd frontend
npm start
```

### 5. Accede a las Aplicaciones:
Abre el navegador y accede a [http://localhost:3001](http://localhost:3001).

---

## 🤝 Contribución 
¡Contribuciones bienvenidas! Sigue estos pasos:

1. Haz un Fork del proyecto:

    ```bash
    git clone https://github.com/castellanorn/ciba-coworking-front.git
    ```

2. Crea una nueva rama:

    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```

3. Haz tus cambios y realiza el commit:

    ```bash
    git commit -am 'Añadir nueva funcionalidad'
    ```

4. Sube tus cambios:

    ```bash
    git push origin feature/nueva-funcionalidad
    ```

5. Abre un Pull Request para revisión y fusión.

---

## 🙏🏼 Agradecimientos
Gracias por interesarte en nuestro proyecto. ¡Esperamos que sea útil y contribuya a la gestión y uso eficiente de espacios de coworking!

### Equipo:
- [**Mercedes Celedón** - Product Owner](https://github.com/Mercedes-Celedon)
- [**Ekaterina Buinovskaia** - Scrum Master](https://github.com/BSN-Asumiko)
- [**Adriana Ortiz** - Developer](https://github.com/adriana-ortiz)
- [**Sara Terán** - Developer](https://github.com/Sarii4)
- [**Shaila González** - Developer](https://github.com/ShailaGonzalez)
- [**Carolina Alonso** - Developer](https://github.com/Calonsogon)
- [**Rosse Castellanos** - Developer](https://github.com/castellanorn)

---

