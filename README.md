# 🐾 Adogtame 3 Admin - Backend

Este es el backend del proyecto **Adogtame 3 Admin**, una plataforma para la adopción de mascotas. Está construido con **NestJS** y proporciona una API RESTful segura, documentada y robusta para la gestión de usuarios, mascotas y solicitudes de adopción.

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) - Framework progresivo de Node.js
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para JavaScript
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) - Base de datos NoSQL y ODM
- [JWT](https://jwt.io/) - Autenticación basada en tokens
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Encriptación de contraseñas
- [class-validator](https://github.com/typestack/class-validator) - Validación de datos
- [Swagger](https://swagger.io/) - Documentación automática de la API

## 🔐 Autenticación

El sistema usa **JWT** para autenticación, con roles de usuario como `admin` y `adoptante`. Las rutas están protegidas mediante `Guards` personalizados.

## 🧪 Validaciones

Se implementan validaciones con `class-validator` para asegurar la integridad de los datos tanto en creación como en actualización de entidades.

## 🔐 Seguridad

- Contraseñas encriptadas con `bcrypt`
- Rutas protegidas con JWT y `Guards`
- Buenas prácticas en manejo de errores

## 📄 Documentación Swagger

Una vez levantado el servidor, puedes acceder a la documentación Swagger en:

`http://localhost:3000/docs`

## 📦 Instalación

```bash
npm install
```

## 🚀 Ejecución

```bash
npm run start:dev
```

## 📝 Contribuciones
Si deseas contribuir, abre un PR o issue. ¡Todas las mejoras son bienvenidas!
