/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('angularApp').controller('getAdminGruposCtrl', getAdminGrupos);

function getAdminGrupos($timeout, usuarioService, miFactoria) {
    var model = this;

    // Variables
    model.grupoActivo = "";
    model.nombre = "";
    model.descripcion = "";
    model.privado = "0";
    usuarioService.getGruposByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
        model.gruposSelect = data;
    });
    usuarioService.getUsuariosByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
        model.usuariosSelect = data;
    });
    $timeout(function () {
        $(".chosen-select").chosen();
    }, 300);

    // Funciones
    model.guardar = guardar;
    model.editGrupo = editGrupo;
    model.activar = activar;

    function guardar() {
        model.grupoActivo.nombre = model.nombre;
        model.grupoActivo.descripcion = model.descripcion;
        model.grupoActivo.privado = model.privado;
        var miembro = {grupo: model.grupoActivo, usuario: "", responsable: "0"};
        if (model.usuariosActivos) {
            $.each(model.usuariosActivos, function (index) {
                miembro.usuario = model.usuariosActivos[index];
                usuarioService.setMiembro(miembro).error(function () {
                    alert("error");
                });
            });
        }
        usuarioService.editGrupo(model.grupoActivo).success(function () {
            alert("Grupo Modificado y añadido sus miembros.");
        });
    }
    ;
    function editGrupo() {
        model.nombre = model.grupoActivo.nombre;
        model.descripcion = model.grupoActivo.descripcion;
        model.privado = model.grupoActivo.privado;



    }
    ;
    function activar() {
        if (model.nombre) {
            return "active";
        }
        else {
            return "";
        }
    }
    ;
}
