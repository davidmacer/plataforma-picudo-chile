$(document).ready(function () {
    $("#submit").click(function () {
        /*
            La dirección URL servirá para crear la llamada AJAX al servidor WFS que sirve contenido en GeoJSON.
        */
        var URL = 'http://localhost/form_variables_ambientales.php';
        var contenido_html = "";
        var tipo = $('#tipo option:selected').html();

        // Elementos del formulario a enviar 
        var dataString = 'tipo = ' + tipo;

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
                alert("Esperando respuesta desde mi servidor");
            },
            success: function (response) {
                console.log(response);
                //limpia el contenido del elemento span
                $('#contenido').html('');
                if (response.length > 0) {
                    console.log("Estoy corriendo en la línea 33")
                    //Itera sobre los valores obtenidos
                    // for (var i in response) {
                    //     contenido_html = "Nombre: " + response[i].nombre + "<br/>";
                    //     contenido_html += "Tipo: " + response[i].tipo + "<br/>";
                    //     contenido_html += "Municipio: " + response[i].delmun + "<br/>";
                    //     contenido_html += "<hr/>";
                    //     $('#contenido').append(contenido_html);
                    // } //fin del for
                } else {
                    console.log("Estoy corriendo en la línea 43")
                    contenido_html = "La consulta no tiene resultados" + "<br/>";
                    $('#contenido').append(contenido_html);
                }

            },
            error: function (jqXHR, estado, error) {
                $('#contenido').html('Se produjo un error:' + estado + ' error: ' + error);
            },
            complete: function (jqXHR, estado) {
                console.log(estado)
                alert("Se ha completado la solicitud al WS con el estado: " + estado);
            }
        });

        return false;
    });
});