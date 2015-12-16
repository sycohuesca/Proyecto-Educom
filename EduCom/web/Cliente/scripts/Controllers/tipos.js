/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('angularApp').controller('getTiposCtrl', getTipos);

function getTipos($timeout, usuarioService, miFactoria) {
    var model = this;

    // Variables
    model.nombre = "";
    usuarioService.getTipos().success(function (data){
        model.tipos=data;
    });
    usuarioService.getUsuariosByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
       model.usuarios = data;
    });
    model.tipoSelect =[];
    model.usuariosSelect = [];
    
    $timeout(function () {
        $(".chosen-select").chosen();
    }, 300);


    // Funciones

    model.nuevoTipo = nuevoTipo;
    model.guardar = guardar;


    function nuevoTipo() {
        var tipo={nombre:model.nombre};
usuarioService.newTipo(tipo).success(function (){
    alert("Tipo nuevo de usuario creado.");
    location.reload();
});
    }
    function guardar() {
        
      $.each(model.usuariosSelect, function (a) {
         
        usuarioService.editTipos(model.usuariosSelect[a], model.tipoSelect.idTipoUsuario).success(function (){
       console.log("Usuario añadido.");
             
       });
        
      });
      
alert("Usuarios añadidos al tipo "+model.tipoSelect.nombre);
 location.reload();
    }
}
