/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('angularApp').controller('getCentroCtrl', getCentro);

function getCentro(usuarioService, miFactoria) {
    var model = this;
    var centro = miFactoria.usuario.idCentro;
// Variables
    model.nombre = centro.nombre;
    model.direccion = centro.direccion;
    model.descripcion = centro.descripcion;

    model.guardar = guardar;

    function guardar() {
        miFactoria.usuario.idCentro.nombre = model.nombre;
        miFactoria.usuario.idCentro.direccion = model.direccion;
        miFactoria.usuario.idCentro.descripcion = model.descripcion;
        usuarioService.setCentro(miFactoria.usuario.idCentro).success(function () {
            alert("Centro modificado.")
            location.reload();
        });


    }


}