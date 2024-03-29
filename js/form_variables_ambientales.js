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
                        contenido_html += "Cantiad de capturas: " + response[i].riesgo + "<br/>";
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

                        // Árbol de decisión para Campo Laguna
                        if (resultado_i.localidad == "Campo Laguna") {
                            if (mes == "Enero" | mes == "Septiembre" | mes == "Octubre" |
                                mes == "Noviembre" | mes == "Diciembre") {
                                resultado_i.riesgo = "Bajo"
                            } else {
                                if (mes == "Febrero" | mes == "Marzo" | mes == "Abril" | mes == "Agosto") {
                                    if (tmax >= 36) {
                                        resultado_i.riesgo = "Bajo"
                                    } else {
                                        if (tmax < 32) {
                                            if (tmax >= 30) {
                                                resultado_i.riesgo = "Bajo"
                                            } else {
                                                resultado_i.riesgo = "Alto"
                                            }
                                        } else {
                                            if (tmax >= 33) {
                                                if (tmax < 34) {
                                                    if (mes == "Abril") {
                                                        resultado_i.riesgo = "Bajo"
                                                    } else {
                                                        resultado_i.riesgo = "Alto"
                                                    }
                                                } else {
                                                    resultado_i.riesgo = "Alto"
                                                }
                                            } else {
                                                resultado_i.riesgo = "Alto"
                                            }
                                        }
                                    }
                                }
                                else {
                                    resultado_i.riesgo = "Alto"
                                }
                            }
                        // Árbol de decisión para Culiacán
                        } else if (resultado_i.localidad == "Culiacán") {
                            if (mes == "Enero" | mes == "Febrero" | mes == "Septiembre" | mes == "Octubre" |
                                mes == "Noviembre" | mes == "Diciembre") {
                                resultado_i.riesgo = "Bajo"
                            } else {
                                if (mes == "Marzo" | mes == "Abril" | mes == "Agosto") {
                                    if (tmax >= 36) {
                                        resultado_i.riesgo = "Bajo"
                                    } else {
                                        if (tmax < 36) {
                                            if (tmax >= 33) {
                                                if (tmax < 33) {
                                                    resultado_i.riesgo = "Bajo"
                                                } else {
                                                    if (tmax >= 34) {
                                                        if (precip >= 5.4) {
                                                            resultado_i.riesgo = "Bajo"
                                                        } else {
                                                            resultado_i.riesgo = "Alto"
                                                        }
                                                    } else {
                                                        resultado_i.riesgo = "Alto"
                                                    }
                                                }
                                            } else {
                                                if (precip >= 0.5) {
                                                    resultado_i.riesgo = "Bajo"
                                                } else {
                                                    resultado_i.riesgo = "Alto"
                                                }
                                            }
                                        } else {
                                            resultado_i.riesgo = "Alto"
                                        }
                                    }
                                } else {
                                    resultado_i.riesgo = "Alto"
                                }
                            }
                        // Árbol de decisión para Tamarindo
                        } else if (resultado_i.localidad == "Tamarindo") {
                            if (mes == "Enero" | mes == "Septiembre" | mes == "Octubre" |
                            mes == "Noviembre" | mes == "Diciembre") {
                                if (mes == "Septiembre" | mes == "Octubre" |
                                mes == "Noviembre" | mes == "Diciembre") {
                                    resultado_i.riesgo = "Bajo"
                                } else {
                                    if (tmax < 30) {
                                        console.log("Aquí")
                                        resultado_i.riesgo = "Bajo"
                                    } else {
                                        resultado_i.riesgo = "Alto"
                                    }
                                }
                            } else {
                                if (tmin < 12) {
                                    resultado_i.riesgo = "Bajo"
                                } else {
                                    if (mes == "Febrero" | mes == "Marzo" | mes == "Agosto") {
                                        if (precip >= 0.75) {
                                            if (precip < 1.7) {
                                                resultado_i.riesgo = "Bajo"
                                            } else {
                                                resultado_i.riesgo = "Alto"
                                            }
                                        } else {
                                            resultado_i.riesgo = "Alto"
                                        }
                                    } else {
                                        resultado_i.riesgo = "Alto"
                                    }
                                }
                            }
                        }

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
                                "latitud": resultado_i.latitud,
                                "riesgo": resultado_i.riesgo

                            }
                        };
                        // console.log(JSON.stringify(feature));//por si quisiera ver el contenido de cada iteracion
                        //revisar https://www.w3schools.com/jsref/jsref_push.asp para mas informacion de push()
                        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
                    });

                    // Agrega al mapa los registros obtenidos
                    L.geoJson(geoJSONResult, {
                        pointToLayer: function (feature, latlng) {

                            var geojsonMarkerOptions = {
                                radius: 6,
                                fillColor: getColor(feature.properties.riesgo),
                                color: "#000",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 1.0
                            };

                            function getColor(riesgo) {
                                if (riesgo == "Bajo") {
                                    return "#006400";
                                } else if (riesgo == "Alto") {
                                    return "#FF0000";
                                }
                            };

                            var marker = L.circleMarker(latlng, geojsonMarkerOptions);
                            marker.bindPopup("Localidad: " + feature.properties.localidad + '<br/>' +
                                "Ubicación: " + feature.properties.ubicacion + '<br/>' +
                                "Longitud: " + feature.properties.longitud + '<br/>' +
                                "Latitud: " + feature.properties.latitud + '<br/>' +
                                "No de trampa: " + feature.properties.no_trampa + '<br/>' +
                                "Trampa ID: " + feature.properties.trampa_id + '<br/>' + 
                                "Riesgo: " + feature.properties.riesgo + '<br/>');
                            return marker;
                        }
                    }).addTo(myMap);

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