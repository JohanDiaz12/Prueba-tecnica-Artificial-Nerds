Prueba Técnica – Artificial Nerds

Aplicación backend y frontend para simular autenticación, webhooks y comportamientos HTTP con fines de prueba.

#Instalación

Clonar el repositorio e instalar dependencias en ambas carpetas.

tanto en frontend como en backend deberás hacer

  -npm i

#Ejecución

- Backend - 
para ejecutar el backend debes ingresar en la consola el comando
 -npm run dev. Una vez salga el mensaje de "el server está corriendo" puedes continuar.

 Para ejecutar las pruebas desde consola deberás insertar el siguiente comando

 -  npm run test 

- Frontend -

Para ejecutar el frontend deberás ingresar el siguiente comando en la consola
 - npm start

 Asegurate de que el backend esté ejecutandose al momento de querer ver el frontend 

 Endpoints Disponibles
Autenticación
POST /auth/login?scenario=success
POST /auth/login?scenario=fail
POST /auth/login?scenario=expired

Webhook
POST /webhook


Escenarios opcionales:

?scenario=timeout
?scenario=invalid

Simulador
GET /simulator?status=200&delay=1000


Permite simular códigos de estado HTTP y tiempos de respuesta personalizados.

Testing

Las pruebas del backend están implementadas con:

Jest

Supertest

Ejecutar:

npm run test