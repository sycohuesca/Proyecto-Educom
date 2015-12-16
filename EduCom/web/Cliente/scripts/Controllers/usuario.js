/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('angularApp').controller('getUsuarioCtrl', getUsuario);
function getUsuario(usuarioService, miFactoria) {

    var model = this;
    // variables
    model.nombre = miFactoria.usuario.nombre;
    usuarioService.getLogin(miFactoria.usuario.idUsuario).success(function (data) {
        model.email = data.user;
    });
    model.centro = miFactoria.usuario.idCentro.nombre;
    model.direccion = miFactoria.usuario.idCentro.direccion;
    model.descripcion = miFactoria.usuario.idCentro.descripcion;
    var miembros = miFactoria.miembrosUsuario;
    model.inscrito = [];
    model.responsable = [];
    $.each(miembros, function (value) {
        if (miembros[value].responsable) {
            model.responsable.push(miembros[value].grupo);
        }
        else {
            model.inscrito.push(miembros[value].grupo);
        }
    });
    model.passwordViejo = "";
    model.passwordNuevo = "";
    model.passwordNuevo2 = "";


    // funciones
    model.cambiarPassword = cambiarPassword;
    model.guardarCambios = guardarCambios;
    model.guardarPassword = guardarPassword;

    function cambiarPassword() {
        $("#modal2").openModal();
    }
    function guardarCambios() {
        miFactoria.usuario.nombre = model.nombre;
        usuarioService.setUsuario(miFactoria.usuario).success(function () {
            alert("Usuario modificado.");
            location.reload();
        });
    }
    function guardarPassword() {
        if (model.passwordNuevo !== model.passwordNuevo2) {
            alert("Los nuevos password no son idénticos.");
        }
        else {
            usuarioService.setPassword(miFactoria.usuario.idUsuario,$.md5(model.passwordViejo),$.md5(model.passwordNuevo)).success(function (data) {
                console.log(data);
                if ($.isEmptyObject(data)) {
                    alert("Password no cambiado.");
                }
                else {
                    alert("Password cambiado.");
                    $('#modal2').closeModal();
                    location.reload();
                }
            });
        }
    }


}

