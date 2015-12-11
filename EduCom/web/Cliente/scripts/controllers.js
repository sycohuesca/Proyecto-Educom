

'use strict';
// Contoladores.
angular.module('angularApp').controller('getGruposCtrl', getGrupos);
angular.module('angularApp').controller('getMensajesCtrl', getMensajes);
angular.module('angularApp').controller('getCentroCtrl', getCentro);
angular.module('angularApp').controller('getMenuLateralCtrl', getMenuLateral);
// Funciones
function getGrupos($window, $http, usuarioService, miFactoria) {
    // variables
    var model = this;
    model.fdatos={};

    
    usuarioService.getGrupos(miFactoria.usuario.idUsuario).success(function (data) {
        model.grupos = data;
    });
    // funciones
    model.verMensajes = verMensajes;
    model.modalEditarMiembros=modalEditarMiembros;
    model.modalEditarGrupo = modalEditarGrupo;
    model.modalNuevoGrupo = modalNuevoGrupo;
    model.modalEntrarGrupo = modalEntrarGrupo;  
    model.guardarGrupo=guardarGrupo;
    
   
    function modalEditarGrupo (id) {
        model.fdatos.idGrupo=id.idGrupo;
        model.fdatos.nombre=id.nombre;
        model.fdatos.descripcion=id.descripcion;
        model.fdatos.privado=id.privado;
        model.fdatos.idUsuarioSuperadministrador=id.idUsuarioSuperadministrador;
        $('#grupoModal').openModal();
    };
    function modalNuevoGrupo  () {
        model.fdatos.idGrupo="0";
        model.fdatos.nombre="";
        model.fdatos.descripcion="";
         model.fdatos.privado="1";
        $('#grupoModal').openModal();
    };
   function modalEntrarGrupo () {
        $('#modalEntrarGrupo').openModal();

    };

    function verMensajes(id) {
        miFactoria.grupoActivo = id;
        $window.location.href = "#/mensajes";
    }
    function modalEditarMiembros(id){
         $('#modalEditarMiembro').openModal();
    }
     function guardarGrupo(){
        
         if(model.fdatos.idGrupo==="0"){
              model.fdatos.idUsuarioSuperadministrador=miFactoria.usuario;
     usuarioService. newGrupo(model.fdatos).success(function(){
         alert("Nuevo Grupo creado.");
          $('#grupoModal').closeModal();
         $window.location.href = "#/";
        
      });   
         }
         else {
               usuarioService. editGrupo(model.fdatos).success(function(){
                     alert("Grupo editado.");
           $('#grupoModal').closeModal();
          $window.location.href = "#/";
               });
             
         }
     
     }

}

function getMensajes(usuarioService, miFactoria) {
    var model = this;
    $('textarea.materialize-textarea').characterCounter();
    usuarioService.getMensajes(miFactoria.grupoActivo).success(function (data) {
        model.mensajes = data;
        
    });
    model.nuevoMensaje = function () {
        $('#modalMensaje').openModal();
    }

    model.editarMensaje = function (id) {
        $('#modalMensaje').openModal();
    }

    model.borrarMensaje = function (id) {
        $('#modalBorrar').openModal();
    }
    model.salirGrupo = function () {
        $('#modalSalir').openModal();
    }

}

function getCentro() {


}
function getMenuLateral($window, usuarioService, miFactoria){
    var model=this;
    model.nombre="";
    model.centro="";
    
    usuarioService.getUsuario(9).success(function (data){
        miFactoria.usuario=data;
        model.nombre=data.nombre;
        model.centro=data.idCentro.nombre;
        alert("Bienvenido "+data.nombre);
    });
    
    
    
}
