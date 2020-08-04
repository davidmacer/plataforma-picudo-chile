$(document).ready(function () {
    $("#submit").click(function () {

		/*
			La dirección URL servirá para crear la llamada AJAX al servidor WFS que sirve contenido en GeoJSON.
		*/
        var URL = 'http://localhost/form_variables_ambientales.php';
        var contenido_html = "";
        var mes = $('#mes option:selected').html();
        var tmin = $('#tmin').val();
        var tmax = $('#tmax').val();
        var precip = $('#precip').val();
        
        // Elementos del formulario a enviar 
        var dataString = {"mes":mes, "tmin":tmin, "tmax":tmax, "precip":precip};
        
		/*
			La llamada AJAX_POST se construye mediante JQuery, a través de la cual se pasa la URL y una función de éxito ... y otras más
			AJAX (JavaScript Asíncrono y XML) nos proporciona la posibilidad de hacer peticiones al servidor  (intercambiar datos) 
			sin tener que volver a cargar la página.
		*/
        var ajax_post = $.ajax({
            type: "POST",
            url: URL,
            dataType: 'json',
            timeout: 10000,
            data: dataString,
            cache: false,
            beforeSend: function () {
                alert("Esperando respuesta desde mi servidor ubuntu");
            },
            success: function (response) {
                //console.log(response);
                //limpia el contenido del elemento span
                $('#contenido').html('');
                if (response.length > 0) {
                    //Itera sobre los valores obtenidos
                    for (var i in response) {
                        contenido_html = "Zona: " + response[i].localidad + "<br/>";
                        contenido_html += "Ubicación: " + response[i].ubicacion + "<br/>";
                        contenido_html += "No de trampa: " + response[i].no_trampa + "<br/>";
                        contenido_html += "Mes: " + response[i].mes + "<br/>";
                        contenido_html += "Temperatura mínima: " + response[i].tmin + "<br/>";
                        contenido_html += "Temperatura máxima: " + response[i].tmax + "<br/>";
                        contenido_html += "Precipitación: " + response[i].precip + "<br/>";
                        contenido_html += "<hr/>";
                        $('#contenido').append(contenido_html);
                    } //fin del for

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

                    response.forEach(function (resultado_i) {
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
                        // console.log(JSON.stringify(feature));//por si quisiera ver el contenido de cada iteracion
                        //revisar https://www.w3schools.com/jsref/jsref_push.asp para mas informacion de push()
                        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
                    });

                } else {
                    contenido_html = "La consulta no tiene resultados" + "<br/>";
                    $('#contenido').append(contenido_html);
                }

            },
            error: function (jqXHR, estado, error) {
                $('#contenido').html('Se produjo un error:' + estado + ' error: ' + error);
            },
            complete: function (jqXHR, estado) {
                alert("Se ha completado la solicitud al WS con el estado: " + estado);
            }
        });

        return false;
    });
});