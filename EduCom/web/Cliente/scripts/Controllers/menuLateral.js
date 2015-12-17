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
    if ($cookies.get("idUsuario")) {
        var idUsuario = $cookies.get("idUsuario");
        usuarioService.getUsuario(idUsuario).success(function (data) {
            miFactoria.usuario = data;
            model.nombre = data.nombre;
            model.centro = data.idCentro.nombre;
            usuarioService.getTiposByUsuario(idUsuario).success(function (data) {
                if ($.isEmptyObject(data)) {
                    miFactoria.tipo = "5";
                    $window.location.href = "#/home ";
                }
                else {
                    miFactoria.tipo = data[0].idTipo;
                    $window.location.href = "#/home ";
                }
            });
        });
    }
    else {
        $window.location.href = "../";
    }

}