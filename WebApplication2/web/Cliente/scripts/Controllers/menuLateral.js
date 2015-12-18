/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

'use strict';
angular.module('angularApp').controller('getMenuLateralCtrl', getMenuLateral);

function getMenuLateral($cookies, $window, usuarioService, miFactoria) {
    var model = this;
    model.nombre = "";
    model.centro = "";
  
    
    model.salir = salir;
   model.cerrar=function (){
       $('.button-collapse').sideNav('hide');
   }
    model.tipoAdmin=function (){
        
       if(miFactoria.tipo===1){
           return true;
       }  
       else {
           return false;
       }
    };
 
    function salir() {
        $cookies.remove("idUsuario");
        alert("Asta luego " + miFactoria.usuario.nombre + ".");
        $window.location.href = "../";
    }
  
    if ($cookies.get("idUsuario")) {
        var idUsuario = $cookies.get("idUsuario");
        usuarioService.getUsuario(idUsuario).success(function (data) {
            miFactoria.usuario = data;
            model.nombre = data.nombre;
            model.centro = data.idCentro.nombre;
            usuarioService.getTiposByUsuario(idUsuario).success(function (data) {
                if ($.isEmptyObject(data)) {
                    miFactoria.tipo = "4";
                    model.tipo=4;
                    $window.location.href = "#/home ";
                }
                else {
                    model.tipo=data[0].tipoUsuario.idTipoUsuario;
                    miFactoria.tipo = data[0].tipoUsuario.idTipoUsuario;
                    $window.location.href = "#/home ";
                }
            });
        });
    }
    else {
        $window.location.href = "../";
    }

}