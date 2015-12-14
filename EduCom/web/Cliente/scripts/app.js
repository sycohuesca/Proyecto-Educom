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

                    })
                    .when('/tipos', {
                        templateUrl: 'views/administrar/tipos.html',
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
    })
    .directive('materialCollapsible', function () {
        return function () {
          
            $('.collapsible').collapsible({
                accordion: false
            });
    };
    })    
    .service("usuarioService", function ($http) {
        var url="http://localhost:8080/EduCom/webresources/";
        this.getUsuario = function (id) {
            return $http.get(url+"usuarios/" + id);
        }
        this.getGrupos = function (id) {
            return $http.get(url+"miembros/usuario=" + id);
        }
        this.getMensajes = function (id) {
            return $http.get(url+"mensajes/grupo=" + id);
        }
        this.newGrupo=function(grupo){
            return  $http.post(url+"grupos",grupo);
        }
         this.editGrupo=function(grupo){
            return  $http.put(url+"grupos/"+grupo.idGrupo,grupo);
        }
          this.getGruposByCentro=function(idCentro){
            return  $http.get(url+"grupos/centro="+idCentro);
        }
          this.setMiembro=function(miembro){
            return  $http.put(url+"miembros/miembrosPK;idUsuario="+miembro.usuario.idUsuario+";idGrupo="+miembro.grupo.idGrupo,miembro);
        }
           this.getGrupo=function(idGrupo){
            return  $http.get(url+"grupos/"+idGrupo);
        }
            this.getUsuariosByCentro=function(idCentro){
            return  $http.get(url+"usuarios/centro="+idCentro);
        }
  
            this.createMensaje=function(mensaje){
            return  $http.post(url+"mensajes/",mensaje);
        }
             this.editMensaje=function(mensaje){
            return  $http.put(url+"mensajes/"+mensaje.idMensaje,mensaje);
        }
            this.deleteMensaje=function(idMensaje){
            return  $http.delete(url+"mensajes/"+idMensaje);
        }
            this.exitGrupo=function(idUsuario, idGrupo){
            return  $http.delete(url+"miembros/miembroPK;idUsuario="+idUsuario+";idGrupo="+idGrupo);
        }
           this.getTipo=function(idUsuario, idGrupo){
            return  $http.get(url+"miembros/miembroPK;idUsuario="+idUsuario+";idGrupo="+idGrupo);
        }
            this.getLogin=function(idUsuario){
            return  $http.get(url+"logins/idUsuario="+idUsuario);
        }
             this.setUsuario=function(usuario){
            return  $http.put(url+"usuarios/"+usuario.idUsuario,usuario);
        }
              this.setPassword=function(idUsuario,viejo,nuevo){
            return  $http.put(url+"logins/usuario="+idUsuario + "/" + viejo + "/" + nuevo);
        }
              this.resetPassword=function(idUsuario){
            return  $http.get(url+"logins/resetPassword/idUsuario="+idUsuario);
        }
               this.setCentro=function(centro){
            return  $http.put(url+"centros/"+centro.idCentro,centro);
        }
     
       
    })

    .factory("miFactoria", function () {
   
        return {
            usuario: "",
            miembrosUsuario:"",
            miembros:"",
            grupoActivo: "",
            mensaje:"",
            tipo:""
        }



    })
