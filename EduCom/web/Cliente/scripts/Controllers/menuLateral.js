/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

'use strict';
angular.module('angularApp').controller('getMenuLateralCtrl', getMenuLateral);

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