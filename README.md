***************************************************
Plataforma de apoyo a la toma de decisiones
***************************************************

La plataforma de apoyo a la toma de decisiones es una herrameinta que permite el acceso a un simulador de predicciones mensuales de las condiciones de las trampas que están distribuidas en la zona de influencia de la Junta Local de Sanidad Vegetal del Valle de Culiacán.

La plataforma tiene como dependencias:

- node.js, que ejecuta un servidor de manera local para poder realizar consultas mediante SQL.
- xampp que contiene el archivo php necesario para acceder a la información del formulario del simulador.
- postgreSQL, el administrador de la base de datos. Este administrador cuenta con la extensión PostGIS, para el manejo de datos geoespacialas.


************************************
INSTALACIÓN DE LA PLATAFORMA
************************************

- Descargar e instalar node.js V12.18.3 (https://nodejs.org/es/download/)
- Descargar e instalar xampp (
- Descargar postgreSQL V11.9 e instalarlo dentro de la carpeta donde fue instalado xampp (`C:/xampp/postgresql/11`).
	- Usando el software PgAdmin4 se debe importar la base de datos, `bd_picudo_chile.backup`, que está en la carpeta `plataforma-picudo-chile/base_datos`.
- Mover el archivo `form_variables_ambientales.php`, que se encuentra dentro de la carpeta `plataforma-picudo-chile/php`, a la carpeta `C:/xampp/htdocs`.

Finalmente, debes ejectuar Apache dentro de xampp.

**************************************
EJECUCIÓN DE LA PLATAFORMA
*************************************

el servidor se ejecuta dando doble click al archivo 

    run_server.bat
	
o via

    npx lws --stack  body-parser lws-static lws-cors simple_server.js   

o bien tras ejecutar

    npm test

******************************************************
 SIMPLE   Server  (Postgis BASED)
******************************************************

Simple Server es un modulo creado para desarrollar y probar rapidamente el desarrollo de servicios web.

Para que un servicio web sea accesible, se debe definir una URL o punto de entrada que reciba la peticion con parametros. Cada URL esta asociada a una funcion de javascript que implementa la funcionalidad deseada.

En general, cada funcion contiene una consulta SQL, que puede o no recibir parametros, ejecuta la instruccion y devuelve resultados. Es esperado, dentro del contexto geoespacial, utilizar formatos estandares para intercambiar informacion, por lo que se suguiere devolver archivos GeoJSON.

Dependencias:

koa
pg_promise

Lo que integra todas las dependiencias necesarias.

El backend de Postgis es un servicio web que recibe peticiones via http y las redirige a postgis

El resultado del servicio web se expresa via  JSON.

	
