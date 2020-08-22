***************************************************
Plataforma de apoyo a la toma de decisiones. Picudo del chile
***************************************************

La plataforma de apoyo a la toma de decisiones para el picudo del chile es una herramienta que permite el acceso a un simulador de predicciones mensuales de las condición de las trampas que están distribuidas en la zona de actividades de la Junta Local de Sanidad Vegetal del Valle de Culiacán.

La plataforma tiene como dependencias:

- node.js, que ejecuta un servidor de manera local para realizar consultas mediante SQL.
- xampp que contiene el archivo PHP necesario para acceder a la información del formulario del simulador.
- postgreSQL, el administrador de la base de datos. Este administrador cuenta con la extensión PostGIS, para el manejo de datos geoespacialas.


************************************
INSTALACIÓN DE LA PLATAFORMA
************************************

- Descargar e instalar node.js V12.18.3 (https://nodejs.org/es/download/)
- Descargar e instalar xampp (
- Descargar postgreSQL V11.9 e instalarlo dentro de la carpeta donde fue instalado xampp (`C:/xampp/postgresql/11`).
    - Usando el software PgAdmin4 se debe crear una base de datos con nombre `db_picudo_chile` y enseguida se debe restaurar la base de datos, `db_picudo_chile.backup`, que está en la carpeta `plataforma-picudo-chile/base_datos`.
- Mover el archivo `form_variables_ambientales.php`, que se encuentra dentro de la carpeta `plataforma-picudo-chile/php`, a la carpeta `C:/xampp/htdocs`.
- En los archivos `C:/xampp/php/php.ini`, `C:/xampp/php/php.ini-development` y `C:/xampp/php/php.ini-production` descomentar o agregar las siguientes extensiones, que se encuentran aproximadamente en la línea 930: 
    - extension=pdo_pgsql
    - extension=pdo_sqlite
    - extension=pgsql
    - extension=php_pdo_pgsql
    - extension=php_pgsql

Finalmente, ejecutar Apache dentro de xampp.

**************************************
EJECUCIÓN DE LA PLATAFORMA
*************************************

El servidor se ejecuta dando doble click al archivo 

    run_server.bat
	
o vía

    npx lws --stack  body-parser lws-static lws-cors simple_server.js   

o bien, tras ejecutar

    npm test

******************************************************
 SIMPLE   Server  (PostGIS BASED)
******************************************************

Simple Server es un módulo creado para desarrollar y probar rápidamente el desarrollo de servicios web.

Para que un servicio web sea accesible, se debe definir una URL o punto de entrada que reciba la petición con parámetros. Cada URL esta asociada a una función de JavaScript que implementa la funcionalidad deseada.

En general, cada función contiene una consulta SQL, que puede o no recibir parámetros, ejecuta la instrucción y devuelve resultados. Es esperado, dentro del contexto geoespacial, utilizar formatos estándares para intercambiar información.

Dependencias:

koa
pg_promise

Lo que integra todas las dependiencias necesarias.

El backend de PostGIS es un servicio web que recibe peticiones via HTTP y las redirige a postGIS

El resultado del servicio web se expresa vía JSON.
