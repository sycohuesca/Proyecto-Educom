'use strict';
$(".button-collapse").sideNav();



/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
    .module('angularApp', [
    'ngRoute', 'ngCookies'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
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
              
            })
          .when('/tipos', {
                templateUrl: 'views/administrar/tipos.html',
              
            })
          .when('/usuarios', {
                templateUrl: 'views/administrar/usuarios.html',
              
            })
            .when('/administrar', {
                templateUrl: 'views/usuariopanel.html',
              
            })

        .otherwise({
            redirectTo: '/'
        });
    })
    .directive('materialCollapsible', function () {
        return function () {
            $('.collapsible').collapsible({
                accordion: false
            });
        };
    });