/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('angularApp').controller('getUsuariosCtrl', getUsuarios);

function getUsuarios($timeout, usuarioService, miFactoria) {
    var model = this;
    // Variables
    model.nombre = "";
    model.user = "";

    usuarioService.getUsuariosByCentro(miFactoria.usuario.idCentro.idCentro).success(function (data) {
        model.usuariosSelect = data;
    });
    $timeout(function () {
        $(".chosen-select").chosen();
    }, 300);


    // Funciones

    model.buscarLogin = buscarLogin;
    model.reset = reset;
    model.nuevo = nuevo;

    function buscarLogin() {
        usuarioService.getLogin(model.usuarioReset).success(function (data) {
            model.nombre = data.idUsuario.nombre;
            model.user = data.user;

        });
    }
    function reset() {
        usuarioService.resetPassword(model.usuarioReset).success(function () {
            alert("Contraseña reseteada y enviado un nuevo correo al usuario");
        });
   }
    ;
    function nuevo() {
        var newUsuario = {nombre: model.nombre, idCentro: miFactoria.usuario.idCentro};
        var newLogin = {idUsuario: newUsuario, user: model.user};
        usuarioService.newUsuario(newUsuario).success(function () {
            usuarioService.newLogin(newLogin).success(function () {
                alert("El usuario ha sido creado y enviado un email a su correo con el password de acceso.");
               location.reload();
            });
        });
    }
}
