//npx lws --stack  body-parser lws-static lws-cors simple_server.js   

console.log('SIMPLE   SERVER  V0.1');

const initOptions = {/* initialization options */ };
const pgp = require('pg-promise')(initOptions);

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'db_picudo_chile',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(connection);

async function mostrarTrampas(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
    FROM tabla_trampas;`;
    let sqlReplacements = {};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await
    //console.log(results);

    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "trampa_id": resultado_i.trampa_id,  //<= muevanle aqui
                "no_trampa": resultado_i.no_trampa,
                "localidad": resultado_i.localidad,
                "ubicacion": resultado_i.ubicacion,
                "longitud": resultado_i.longitud,
                "latitud": resultado_i.latitud

            }
        };
        //console.log(JSON.stringify(feature));//por si quisiera ver el contenido de cada iteracion
        //revisar https://www.w3schools.com/jsref/jsref_push.asp para mas informacion de push()
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body = geoJSONResult;//devolviendo los resultados.

}//end getREsults

// mostrarCampoLaguna
async function mostrarCampoLaguna(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
    FROM tabla_trampas
    WHERE localidad = 'Campo Laguna';`;
    let sqlReplacements = {};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await
    //console.log(results);

    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "trampa_id": resultado_i.trampa_id,  //<= muevanle aqui
                "no_trampa": resultado_i.no_trampa,
                "localidad": resultado_i.localidad,
                "ubicacion": resultado_i.ubicacion,
                "longitud": resultado_i.longitud,
                "latitud": resultado_i.latitud
            }
        };
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body = geoJSONResult;//devolviendo los resultados.

}
//end mostrarCampoLaguna

// mostrarCuliacan
async function mostrarCuliacan(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
    FROM tabla_trampas
    WHERE localidad = 'Culiacán';`;
    let sqlReplacements = {};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await

    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "trampa_id": resultado_i.trampa_id,  //<= muevanle aqui
                "no_trampa": resultado_i.no_trampa,
                "localidad": resultado_i.localidad,
                "ubicacion": resultado_i.ubicacion,
                "longitud": resultado_i.longitud,
                "latitud": resultado_i.latitud
            }
        };
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body = geoJSONResult; //devolviendo los resultados.

}
//end mostrarCuliacan

// mostrarNavNorte
async function mostrarNavNorte(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
    FROM tabla_trampas
    WHERE localidad = 'Navolato Norte';`;
    let sqlReplacements = {};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await

    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "trampa_id": resultado_i.trampa_id,  //<= muevanle aqui
                "no_trampa": resultado_i.no_trampa,
                "localidad": resultado_i.localidad,
                "ubicacion": resultado_i.ubicacion,
                "longitud": resultado_i.longitud,
                "latitud": resultado_i.latitud
            }
        };
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body = geoJSONResult; //devolviendo los resultados.

}
//end mostrarNavNorte

// mostrarTamarindo
async function mostrarTamarindo(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
    FROM tabla_trampas
    WHERE localidad = 'Tamarindo';`;
    let sqlReplacements = {};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await

    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "trampa_id": resultado_i.trampa_id,  //<= muevanle aqui
                "no_trampa": resultado_i.no_trampa,
                "localidad": resultado_i.localidad,
                "ubicacion": resultado_i.ubicacion,
                "longitud": resultado_i.longitud,
                "latitud": resultado_i.latitud
            }
        };
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body = geoJSONResult; //devolviendo los resultados.
}
//end mostrarTamarindo

class SimplePotreeServer {

    constructor() {
        console.log('Starting...');
    }

    middleware() {
        const router = require('koa-route')

        const endpoints = [

            //The Server listens for requests on 
            router.get('/mostrarTrampas', mostrarTrampas), // devuelve un listado de nubes
            router.get('/mostrarCampoLaguna', mostrarCampoLaguna), // devuelve un listado de nubes
            router.get('/mostrarCuliacan', mostrarCuliacan), // devuelve un listado de nubes
            router.get('/mostrarCuliacan', mostrarNavNorte), // devuelve un listado de nubes
            router.get('/mostrarCuliacan', mostrarTamarindo), // devuelve un listado de nubes
        ];
        return endpoints;
    }
}
console.log('Running SIMPLE  Server...');

module.exports = SimplePotreeServer