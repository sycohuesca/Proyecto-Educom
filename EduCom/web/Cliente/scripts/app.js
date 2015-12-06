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
            .otherwise({
                redirectTo: '/'
            });
    })
            
