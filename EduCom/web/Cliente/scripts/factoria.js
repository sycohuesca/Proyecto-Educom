/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

'use strict';

angular.module('angularApp').factory("miFactoria", function () {
            return {
                usuario: "",
                miembrosUsuario: "",
                miembros: "",
                grupoActivo: "",
                mensaje: "",
                tipo: ""
            };
        });
