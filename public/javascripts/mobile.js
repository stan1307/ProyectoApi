$("#splash").on('pagecreate',function(e){
$.get(
  '/api/getEventos',
  {},
  function(Eventos,scsTxt,xhrq){
    if (Eventos) {
      var htmlStr= '';
      Eventos.map(function(Evento,i){
        htmlStr += '<li><a href="#">'+Evento.Evento+'</a></li>';
      });// end map
      $("#splash_list").html(htmlStr).listview('refresh');
    }
  },
  'json'
);

});


$("#itemCreate").on('pagecreate',function(e){
$("#Evento-send").on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  //alert('click en boton');
  var formObject = {};
  formObject.Evento=$("#Evento-txtNombre").val();
  formObject.estado=$("#Evento-cmbEstado").val();
  formObject.fecha=$("#Evento-Fecha").val();
  formObject.hora=$("#Evento-Hora").val();
  formObject.Locacion=$("#Evento-Lugar").val();
  console.log(formObject);
  $.post(
"/api/createitem",
  formObject,
  function(response,scsTxt,xhrq){
    if (response) {
      alert('Documento Insertado Correctamente :)');
    }
  },
  'json'
);
}); //end click
}); //end itemCreate
/*
$("#usuario").on('pagecreate',function(e){
  $("#btnEnviar").on('click',function(e){
    e.preventDefault();
    e.stopPropagation();

    var formObject={};
    formObject.Correo=$("#usuario-txtCorreo").val();
    formObject.Contrasenia=$("#usuario-txtPass").val();
    console.log(formObject);
    $.post(
  "/api/usuario",
    formObject,
    function(response,scsTxt,xhrq){
      if (response) {
        alert('Usuario Insertado Correctamente :)');
      }
    },
    'json'
  );
  });
});
*/

$("#usuario").on('pagecreate',function(e){
$("#usuario-send").on('click',function(e){
  e.preventDefault();
  e.stopPropagation();
  //alert('click en boton');
  var formObject = {};
  formObject.Correo=$("#usuario-txtCorreo").val();
  formObject.Contrasenia=$("#usuario-txtPass").val();

  console.log(formObject);
  $.post(
"/api/usuario",
  formObject,
  function(response,scsTxt,xhrq){
    if (response) {
      alert('Documento Insertado Correctamente :)');
    }
  },
  'json'
);
}); //end click
});
