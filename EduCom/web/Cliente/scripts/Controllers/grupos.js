/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

'use strict';
angular.module('angularApp').controller('getGruposCtrl', getGrupos);

function getGrupos($window, $timeout, usuarioService, miFactoria) {
    // variables
    var model = this;
    model.fdatos = {};
    model.miembro = {};
    usuarioService.getGrupos(miFactoria.usuario.idUsuario).success(function (data) {
        model.grupos = data;
        miFactoria.miembrosUsuario = data;
    });

    // funciones
    model.modalEntrarGrupo = modalEntrarGrupo;
    model.btnEntrarGrupo = btnEntrarGrupo;

    model.modalEditarMiembros = modalEditarMiembros;
    model.guardarMiembro = guardarMiembro;

    model.modalNuevoGrupo = modalNuevoGrupo;
    model.modalEditarGrupo = modalEditarGrupo;
    model.guardarGrupo = guardarGrupo;

    model.verMensajes = verMensajes;

    function modalNuevoGrupo() {
        model.fdatos.idGrupo = "0";
        model.fdatos.nombre = "";
        model.fdatos.descripcion = "";
        model.fdatos.privado = "1";
        $('#grupoModal').openModal();
    }
    function modalEntrarGrupo() {
        usuarioService.getGruposByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
            model.entrar = data;
            $timeout(function () {
                $(".chosen-select").chosen();
            }, 300);
            $('#modalEntrarGrupo').openModal();
        });
    }
    function btnEntrarGrupo() {
        var option = model.grupoEntrarSelect;
        usuarioService.getGrupo(option).success(function (data) {
            if (data.privado) {
                var mensaje = {};
                mensaje.autor = miFactoria.usuario;
                mensaje.idGrupo = data;
                mensaje.texto = "El usuario " + miFactoria.usuario.nombre + " quiere unirse a este grupo.";
                mensaje.idMensaje = "0";
                usuarioService.createMensaje(mensaje).success(function () {
                    alert("Es un grupo privado, se ha enviado una solicitud para entrar en el grupo.");
                });

            }
            else {
                var miembro = {grupo: data, usuario: miFactoria.usuario, responsable: "0"};
                usuarioService.setMiembro(miembro).success(function () {
                    alert("Es un grupo público y as sido añadido directamente.");
                    $('#modalEntrarGrupo').closeModal();
                    location.reload();
                });
            }
        });
    }
    function modalEditarMiembros(grupo) {
        model.miembro.responsable = "0";
        miFactoria.grupoActivo = grupo;
        usuarioService.getUsuariosByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
            model.usuariosSelect = data;
        });
        $timeout(function () {
            $(".chosen-select").chosen();
        }, 300);
        $('#modalEditarMiembro').openModal();
    }
    function guardarMiembro() {
        var miembro = {};
        miembro.usuario =  model.miembro.usuario;
        miembro.grupo = miFactoria.grupoActivo;
        miembro.responsable = model.miembro.responsable;
        usuarioService.setMiembro(miembro).success(function () {
            alert("Usuario modificado.");
            $('#modalEditarMiembro').closeModal();
            location.reload();
        });
    }
    function modalEditarGrupo(id) {
        model.fdatos.idGrupo = id.idGrupo;
        model.fdatos.nombre = id.nombre;
        model.fdatos.descripcion = id.descripcion;
        model.fdatos.privado = id.privado;
        model.fdatos.idUsuarioSuperadministrador = id.idUsuarioSuperadministrador;
        $('#grupoModal').openModal();
    }
    function guardarGrupo() {

        if (model.fdatos.idGrupo === "0") {
            model.fdatos.idUsuarioSuperadministrador = miFactoria.usuario;
            usuarioService.newGrupo(model.fdatos).success(function () {
                alert("Nuevo Grupo creado.");
                $('#grupoModal').closeModal();
                location.reload();

            });
        }
        else {
            usuarioService.editGrupo(model.fdatos).success(function () {
                alert("Grupo editado.");
                $('#grupoModal').closeModal();
                location.reload();
            });
        }
    }
    function verMensajes(miembro) {
        miFactoria.grupoActivo = miembro.grupo;
        miFactoria.responsable =miembro.responsable;
        $window.location.href = "#/mensajes";
    }
  
}
