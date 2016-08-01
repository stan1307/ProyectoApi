
var logeado=false;
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
$("#adminMain").on('pagecreate',function(e){
  $("#btnCerrar").on('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    $.get("/api/logout");
    $(location).attr('href','#principal');
  });

});
/*$.get(
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
*/
$("#itemCreate").on('pagebeforeshow',function(e){
  if(logeado==true){   //verificamo si estamos logeado para realizar est aaccion
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
 }
 else{
   alert("no puedes acceder");
   $(location).attr('href','#login');
 }
});



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

$("#login").on('pagecreate',function(e){
 $("#log-send").on('click',function(e){
   e.preventDefault();
   e.stopPropagation();
  var formObject = {};
  formObject.Correo=$("#log-txtCorreo").val();
  formObject.Contrasenia=$("#log-txtPass").val();
    //console log lo que recibimos
  $.post(             //aqui mandamos a  que se comunique la api
  "/api/login",
    formObject,
   function(user,scsTxt,xhrq){
    if (user){
      logeado=true;
      $("#txtUsuario").html(JSON.stringify(user['Correo']));

        //$("#txtUsuarioI").html(JSON.stringify(user['Correo']));
      $(location).attr('href','#adminMain');
      //document.location.href("#splash");
      //console.log(  Usuario); //mostramos el nombre del usuario
    }
  },
  'json'
);
}); //evento click

}); //evento page create
