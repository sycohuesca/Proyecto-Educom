/* global angular */

'use strict';
$(".button-collapse").sideNav();
var idUsuario = 9;


/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular.module('angularApp', [
            'ngRoute', 'ngCookies'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/home', {
                        templateUrl: 'views/grupospanel.html',
                        controller: 'getGruposCtrl',
                        controllerAs: 'grupos'
                    })
                    .when('/mensajes', {
                        templateUrl: 'views/mensajespanel.html',
                        controller: 'getMensajesCtrl',
                        controllerAs: 'mensajes'
                    })
                    .when('/centro', {
                        templateUrl: 'views/administrar/centro.html',
                        controller: 'getCentroCtrl',
                        controllerAs: 'centro'
                    })
                    .when('/grupos', {
                        templateUrl: 'views/administrar/grupos.html',
                        controller: 'getAdminGruposCtrl',
                        controllerAs: 'adminGrupos'
                    })
                    .when('/tipos', {
                        templateUrl: 'views/administrar/tipos.html',
                        controller: 'getTiposCtrl',
                        controllerAs: 'tipos'
                    })
                    .when('/usuarios', {
                        templateUrl: 'views/administrar/usuarios.html',
                        controller: 'getUsuariosCtrl',
                        controllerAs: 'usuarios'
                    })
                    .when('/administrar', {
                        templateUrl: 'views/usuariopanel.html',
                        controller: 'getUsuarioCtrl',
                        controllerAs: 'usuario'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });
     
        
       
