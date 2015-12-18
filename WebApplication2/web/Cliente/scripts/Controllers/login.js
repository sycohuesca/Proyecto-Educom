/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global angular */

'use strict';
angular.module('login', ['ngCookies'])
        .controller("loginCtrl", loginCtrl);

function loginCtrl($http, $cookies, $window) {
    var loginFinished = function (authResult) {
        gapi.client.load('oauth2', 'v2', function () {
            gapi.client.oauth2.userinfo.get()
                    .execute(function (resp)
                    {
                        $http.get("http://localhost:8080/EduCom/webresources/logins/user=" + resp.email).success(function (data) {
                            if ($.isEmptyObject(data)) {
                                alert("Usuario no registrado.");
                            }
                            else {
                                $cookies.put("idUsuario", data.idUsuario.idUsuario);
                                alert("Bienvenido " + data.idUsuario.nombre);
                                $window.location.href = "http://localhost:8080/EduCom/Cliente";
                            }
                        });
                    });
        });

    };
    var options = {
        'callback': loginFinished,
        'approvalprompt': 'force',
        'clientid': '383649619527-ke06it4ka2iv091mfdqnii65jmcqi30f.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        'requestvisibleactions': 'http://schemas.google.com/CommentActivity http://schemas.google.com/ReviewActivity',
        'cookiepolicy': 'single_host_origin'
    };
    gapi.signin.render('renderMe', options);

    var model = this;

    model.nombre = "";
    model.pass = "";

    model.enviar = enviar;
    model.activar = activar;

    function enviar() {
        $http.get("http://localhost:8080/EduCom/webresources/logins/usuarios/" + model.nombre + "/" + model.pass).success(function (data) {
            if ($.isEmptyObject(data)) {
                alert("Usuario y password incorrectos.");
            }
            else {
                $cookies.put("idUsuario", data.idUsuario.idUsuario);
                alert("Bienvenido " + data.idUsuario.nombre);
                $window.location.href = "http://localhost:8080/EduCom/Cliente";
            }
        });
    }
    function activar() {
        if (model.nombre || model.pass) {
            return "active";
        }
        else {
            return "";
        }
    }

}

