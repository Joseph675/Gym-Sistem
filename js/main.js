$(buscar_datos());


function buscar_datos(consulta){
    $.ajax({
        url: 'js/buscar.js',
        type: 'POST',
        dataType: 'hmtl',
        data: {consulta: consulta},
    })
    .done(function(respuesta){
        $("datos").html(respuesta);
    })
    .fail(function(){
        console.log("error")
    })
}