

'use strict';
// Contoladores.
angular.module('angularApp').controller('getMenuLateralCtrl', getMenuLateral);
angular.module('angularApp').controller('getGruposCtrl', getGrupos);
angular.module('angularApp').controller('getMensajesCtrl', getMensajes);
angular.module('angularApp').controller('getCentroCtrl', getCentro);

// Funciones
function getGrupos($window, $timeout, usuarioService, miFactoria) {
    // variables
    var model = this;
    model.fdatos = {};
    model.miembro={};
    usuarioService.getGrupos(miFactoria.usuario.idUsuario).success(function (data) {
        model.grupos = data;
    });
      
    // funciones
    model.modalNuevoGrupo = modalNuevoGrupo;
    model.modalEntrarGrupo = modalEntrarGrupo;
    model.btnEntrarGrupo = btnEntrarGrupo;
      
    model.modalEditarMiembros = modalEditarMiembros;
    model.modalEditarGrupo = modalEditarGrupo;   
    model.guardarGrupo = guardarGrupo;
    model.guardarMiembro = guardarMiembro;
    
    model.verMensajes = verMensajes;
  
    
       function modalNuevoGrupo() {
        model.fdatos.idGrupo = "0";
        model.fdatos.nombre = "";
        model.fdatos.descripcion = "";
        model.fdatos.privado = "1";
        $('#grupoModal').openModal();
    }


    function modalEditarGrupo(id) {
        model.fdatos.idGrupo = id.idGrupo;
        model.fdatos.nombre = id.nombre;
        model.fdatos.descripcion = id.descripcion;
        model.fdatos.privado = id.privado;
        model.fdatos.idUsuarioSuperadministrador = id.idUsuarioSuperadministrador;
        $('#grupoModal').openModal();
    }
 
    function modalEntrarGrupo() {
        usuarioService.getGruposByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
            model.entrar = data; 
              $timeout(function(){
                  $(".chosen-select").chosen();
        },300);
              $('#modalEntrarGrupo').openModal(); 
        });
      
    }
    function guardarMiembro(){
       var miembro={};
       miembro.usuario={idUsuario:model.miembro.usuario};
       miembro.grupo=miFactoria.grupoActivo;
       miembro.responsable=model.miembro.responsable;
        usuarioService.setMiembro(miembro).success(function (){
            alert("Usuario modificado.");
              $('#modalEditarMiembro').closeModal();
                location.reload();
        });   
    }
    function verMensajes(grupo) {
        miFactoria.grupoActivo = grupo;
        $window.location.href = "#/mensajes";
    }
    function modalEditarMiembros(grupo) {
        model.miembro.responsable="0";
        miFactoria.grupoActivo=grupo;
         usuarioService.getUsuariosByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
             model.usuariosSelect=data;
         });
             $timeout(function(){
                  $(".chosen-select").chosen();
        },300);
        $('#modalEditarMiembro').openModal();
    }
    function guardarGrupo() {

        if (model.fdatos.idGrupo === "0") {
            model.fdatos.idUsuarioSuperadministrador = miFactoria.usuario;
            usuarioService.newGrupo(model.fdatos).success(function () {
                alert("Nuevo Grupo creado.");
                $('#grupoModal').closeModal();
                location.reload();

            });
        }
        else {
            usuarioService.editGrupo(model.fdatos).success(function () {
                alert("Grupo editado.");
                $('#grupoModal').closeModal();
                location.reload();
            });
        }
    }
    function btnEntrarGrupo() {
        var option = model.grupoEntrarSelect;
        usuarioService.getGrupo(option).success(function (data) {
            if (data.privado) {
                var mensaje={};
        mensaje.autor = miFactoria.usuario;
        mensaje.idGrupo = data;
        mensaje.texto = "El usuario "+miFactoria.usuario.nombre+" quiere unirse a este grupo.";
        mensaje.idMensaje = "0";
        usuarioService.createMensaje(mensaje).success(function () {
              alert("Es un grupo privado, se ha enviado una solicitud para entrar en el grupo.");
         });
               
            }
            else {
                var miembro = {grupo: data, usuario: miFactoria.usuario, responsable: "0"};
                usuarioService.setMiembro(miembro).success(function () {
                    alert("Es un grupo público y as sido añadido directamente.");
                    $('#modalEntrarGrupo').closeModal();
                     location.reload();
                });
            }
        });
    }
}

function getMensajes($window, usuarioService, miFactoria) {
    // Variables
    var model = this;
    $('textarea.materialize-textarea').characterCounter();
    usuarioService.getMensajes(miFactoria.grupoActivo.idGrupo).success(function (data) {
        model.mensajes = data;
    });

    // Funciones.
    model.nuevoMensaje = nuevoMensaje;
    model.editarMensaje = editarMensaje;
    model.guardarMensaje = guardarMensaje;
    model.borrarMensaje = borrarMensaje;
    model.borrarMensajeBtn = borrarMensajeBtn;
   
    model.salirGrupo = salirGrupo;
    model.salirGrupoBtn = salirGrupoBtn;
    
    model.formatearFecha = formatearFecha;

    function nuevoMensaje() {
        model.fdatos = {};
        model.fdatos.autor = miFactoria.usuario;
        model.fdatos.idGrupo = miFactoria.grupoActivo;
        model.fdatos.texto = "";
        model.fdatos.idMensaje = "0";
        $('#modalMensaje').openModal();
    }
    function editarMensaje(mensaje) {
        model.fdatos = mensaje;
        model.fdatos.estado = "Modificado por " + miFactoria.usuario.nombre;
        $('#modalMensaje').openModal();
    }
    function borrarMensaje(id) {
        miFactoria.mensaje = id;
        $('#modalBorrar').openModal();

    }
    function borrarMensajeBtn() {
        usuarioService.deleteMensaje(miFactoria.mensaje).success(function () {
            alert("mensaje borrado");
            $('#modalBorrar').closeModal();
             $window.location.href = "#/";
        });
    }
    function guardarMensaje() {
        if (model.fdatos.idMensaje == "0") {
            usuarioService.createMensaje(model.fdatos).success(function () {
                alert("Mensaje enviado.");
                $('#modalMensaje').closeModal();
                $window.location.href = "#/";
            });
        }
        else {
            usuarioService.editMensaje(model.fdatos).success(function () {
                alert("Mensaje editado");
                $('#modalMensaje').closeModal();
                $window.location.href = "#/";
            });
        }
    }
    
    function salirGrupo() {
        $('#modalSalir').openModal();
    }
    function salirGrupoBtn() {
        $('#modalSalir').closeModal();
        usuarioService.exitGrupo(miFactoria.usuario.idUsuario, miFactoria.grupoActivo.idGrupo).success(function () {
            alert("Has salido del Grupo.");
            $window.location.href = "#/";
        });

    }
    
    function formatearFecha(fecha) {
        var anio = fecha.substring(0, 4);
        var mes = fecha.substring(5, 7);
        var dia = fecha.substring(8, 10);
        var hora = fecha.substring(11, 19);
        return "El " + dia + "/" + mes + "/" + anio + " a las " + hora + ".";
    }
}
function getCentro() {


}
function getMenuLateral($window, usuarioService, miFactoria) {
    var model = this;
    model.nombre = "";
    model.centro = "";

    usuarioService.getUsuario(9).success(function (data) {
        miFactoria.usuario = data;
        model.nombre = data.nombre;
        model.centro = data.idCentro.nombre;
         $window.location.href = "#/home ";
//        usuarioService.getTipo(data.idUsuario).success(function (data){
//            miFactoria.tipo=data[0].idTipo;
            
//        });
       // alert("Bienvenido " + data.nombre);
      
    });



}
