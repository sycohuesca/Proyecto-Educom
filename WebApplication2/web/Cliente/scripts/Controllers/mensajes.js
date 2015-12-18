/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('angularApp').controller('getMensajesCtrl', getMensajes);

function getMensajes($window, usuarioService, miFactoria) {
    // Variables
    var model = this;
    $('textarea.materialize-textarea').characterCounter();
    usuarioService.getMensajes(miFactoria.grupoActivo.idGrupo).success(function (data) {
        model.mensajes = data;
    });
    model.responsable=miFactoria.responsable;

    // Funciones.
    model.nuevoMensaje = nuevoMensaje;
    model.editarMensaje = editarMensaje;
    model.guardarMensaje = guardarMensaje;
    model.borrarMensaje = borrarMensaje;
    model.borrarMensajeBtn = borrarMensajeBtn;

    model.salirGrupo = salirGrupo;
    model.salirGrupoBtn = salirGrupoBtn;

    model.formatearFecha = formatearFecha;

    function nuevoMensaje() {
        model.fdatos = {};
        model.fdatos.autor = miFactoria.usuario;
        model.fdatos.idGrupo = miFactoria.grupoActivo;
        model.fdatos.texto = "";
        model.fdatos.idMensaje = "0";
        $('#modalMensaje').openModal();
    }
    function editarMensaje(mensaje) {
        model.fdatos = mensaje;
        model.fdatos.estado = "Modificado por " + miFactoria.usuario.nombre;
        $('#modalMensaje').openModal();
    }
    function borrarMensaje(id) {
        miFactoria.mensaje = id;
        $('#modalBorrar').openModal();

    }
    function borrarMensajeBtn() {
        usuarioService.deleteMensaje(miFactoria.mensaje).success(function () {
            alert("Mensaje borrado.");
            $('#modalBorrar').closeModal();

            $window.location.href = "#/home";
        });
    }
    function guardarMensaje() {
        if (model.fdatos.idMensaje == "0") {
            usuarioService.createMensaje(model.fdatos).success(function () {
                alert("Mensaje enviado.");
                $('#modalMensaje').closeModal();
                $window.location.href = "#/home";
            });
        }
        else {
            usuarioService.editMensaje(model.fdatos).success(function () {
                alert("Mensaje editado");
                $('#modalMensaje').closeModal();
                $window.location.href = "#/home";
            });
        }
    }

    function salirGrupo() {
        $('#modalSalir').openModal();
    }
    function salirGrupoBtn() {
        $('#modalSalir').closeModal();
        usuarioService.exitGrupo(miFactoria.usuario.idUsuario, miFactoria.grupoActivo.idGrupo).success(function () {
            alert("Has salido del Grupo.");
            $window.location.href = "#/home";
        });

    }

    function formatearFecha(fecha) {
        var anio = fecha.substring(0, 4);
        var mes = fecha.substring(5, 7);
        var dia = fecha.substring(8, 10);
        var hora = fecha.substring(11, 19);
        return "El " + dia + "/" + mes + "/" + anio + " a las " + hora + ".";
    }
}