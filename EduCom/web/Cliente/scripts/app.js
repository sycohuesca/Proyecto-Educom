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
          this.getGrupoByCentro=function(idCentro){
            return  $http.get("http://localhost:8080/EduCom/webresources/grupos/centro="+idCentro);
        }
          this.setMiembro=function(miembro){
            return  $http.put("http://localhost:8080/EduCom/webresources/miembros/miembrosPK;idUsuario="+miembro.usuario.idUsuario+";idGrupo="+miembro.grupo.idGrupo,miembro);
        }
           this.getGrupo=function(idGrupo){
            return  $http.get("http://localhost:8080/EduCom/webresources/grupos/"+idGrupo);
        }
  
            this.createMensaje=function(mensaje){
            return  $http.post("http://localhost:8080/EduCom/webresources/mensajes/",mensaje);
        }
             this.editMensaje=function(mensaje){
            return  $http.put("http://localhost:8080/EduCom/webresources/mensajes/"+mensaje.idMensaje,mensaje);
        }
            this.deleteMensaje=function(idMensaje){
            return  $http.delete("http://localhost:8080/EduCom/webresources/mensajes/"+idMensaje);
        }
            this.exitGrupo=function(idUsuario, idGrupo){
            return  $http.delete("http://localhost:8080/EduCom/webresources/miembros/miembroPK;idUsuario="+idUsuario+";idGrupo="+idGrupo);
        }
     
       
    })
    .factory("miFactoria", function () {
   
        return {
            usuario: "",
            miembros:"",
            grupoActivo: "",
            mensaje:""
          

        }



    })
