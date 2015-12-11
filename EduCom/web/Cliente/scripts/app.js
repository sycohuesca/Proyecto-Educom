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
    })
    .service("usuarioService", function ($http) {
        this.getUsuario = function (id) {
            return $http.get("http://localhost:8080/EduCom/webresources/usuarios/" + id);
        }
        this.getGrupos = function (id) {
            return $http.get("http://localhost:8080/EduCom/webresources/miembros/usuario=" + id);
        }
        this.getMensajes = function (id) {
            return $http.get("http://localhost:8080/EduCom/webresources/mensajes/grupo=" + id);
        }
        this.newGrupo=function(grupo){
            return  $http.post("http://localhost:8080/EduCom/webresources/grupos",grupo);
        }
         this.editGrupo=function(grupo){
            return  $http.put("http://localhost:8080/EduCom/webresources/grupos/"+grupo.idGrupo,grupo);
        }
  
       
     
       
    })
    .factory("miFactoria", function () {
   
        return {
            usuario: "",
            miembros:"",
            grupoActivo: "",
          

        }



    })
