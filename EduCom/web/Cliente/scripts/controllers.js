'use strict';
// Contoladores.
angular.module('angularApp').controller('getGruposCtrl', getGrupos);
angular.module('angularApp').controller('getMensajesCtrl', getMensajes);

// Funciones
function getGrupos($http, $window) {

    var model = this;
    model.grupos = [];
    $http.get("http://localhost:8080/EduCom/webresources/miembros").success(function (data) {
        angular.forEach(data, function (value, key) {
            value.grupo.privado == false ? value.privado = "Privado" : value.privado = "Público";
            model.grupos.push(value);
        })

    });
    model.verMensajes = function () {
        $window.location.href = "#/mensajes";
    }
    model.editarMiembros = function (id) {

        alert("grupo " + id);

    }
    model.editarGrupo = function (id) {
        alert(id);
    }


}

function getMensajes() {

    $('.collapsible').collapsible({
        accordion: false
    });
    this.mensajesModal = function () {
 $('#modal1').openModal();
    }
}
