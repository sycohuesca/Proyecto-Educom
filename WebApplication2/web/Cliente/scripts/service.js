/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global angular */

'use strict';

angular.module('angularApp').service("usuarioService", function ($http) {
            var url = "http://localhost:8080/EduCom/webresources/";
            this.getUsuario = function (id) {
                return $http.get(url + "usuarios/" + id);
            };
            this.newUsuario = function (usuario) {
                return $http.post(url + "usuarios", usuario);
            };
            this.getUsuariosByCentro = function (idCentro) {
                return  $http.get(url + "usuarios/centro=" + idCentro);
            };
            this.setUsuario = function (usuario) {
                return  $http.put(url + "usuarios/" + usuario.idUsuario, usuario);
            };
             this.setMiembro = function (miembro) {
                return  $http.put(url + "miembros/miembrosPK;idUsuario=" + miembro.usuario.idUsuario + ";idGrupo=" + miembro.grupo.idGrupo, miembro);
            };
            this.getGrupos = function (id) {
                return $http.get(url + "miembros/usuario=" + id);
            };
            this.getGrupo = function (idGrupo) {
                return  $http.get(url + "grupos/" + idGrupo);
            };
            this.newGrupo = function (grupo) {
                return  $http.post(url + "grupos", grupo);
            };
            this.editGrupo = function (grupo) {
                return  $http.put(url + "grupos/" + grupo.idGrupo, grupo);
            };
            this.getGruposByCentro = function (idCentro) {
                return  $http.get(url + "grupos/centro=" + idCentro);
            };
            this.exitGrupo = function (idUsuario, idGrupo) {
                return  $http.delete(url + "miembros/miembroPK;idUsuario=" + idUsuario + ";idGrupo=" + idGrupo);
            };
            this.getMensajes = function (id) {
                return $http.get(url + "mensajes/grupo=" + id);
            };
            this.createMensaje = function (mensaje) {
                return  $http.post(url + "mensajes/", mensaje);
            };
            this.editMensaje = function (mensaje) {
                return  $http.put(url + "mensajes/" + mensaje.idMensaje, mensaje);
            };
            this.deleteMensaje = function (idMensaje) {
                return  $http.delete(url + "mensajes/" + idMensaje);
            };
            this.getTiposByUsuario = function (idUsuario) {
                return  $http.get(url + "usuariotipousuario/usuario=" + idUsuario);
            };
            this.newTipo = function (tipo) {
                return $http.post(url + "tipousuarios", tipo);
            };
            this.getTipos = function () {
                return $http.get(url + "tipousuarios");
            };
            this.editTipos = function (idUsuario, idTipo) {
                return $http.put(url + "usuariotipousuario/usaurioTipoUsuarioPK;idUsuario=" + idUsuario + ";idTipoUsuario=" + idTipo);
            };
            this.getLogin = function (idUsuario) {
                return  $http.get(url + "logins/idUsuario=" + idUsuario);
            };
            this.newLogin = function (login) {
                return  $http.post(url + "logins", login);
            };
            this.setPassword = function (idUsuario, viejo, nuevo) {
                return  $http.put(url + "logins/usuario=" + idUsuario + "/" + viejo + "/" + nuevo);
            };
            this.resetPassword = function (idUsuario) {
                return  $http.get(url + "logins/resetPassword/idUsuario=" + idUsuario);
            };
            this.setCentro = function (centro) {
                return  $http.put(url + "centros/" + centro.idCentro, centro);
            };
        })

