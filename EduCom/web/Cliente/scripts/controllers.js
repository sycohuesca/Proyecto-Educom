'use strict';
// Contoladores.
angular.module('angularApp').controller('getGruposCtrl', getGrupos);
angular.module('angularApp').controller('getMensajesCtrl', getMensajes);
angular.module('angularApp').controller('getCentroCtrl', getCentro);

// Funciones
function getGrupos($http, $window) {
    var model = this;
    model.entrar = true;
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
        $('#modalGrupo2').openModal();
        console.log(id)

    }
    model.editarGrupo = function (id) {
        alert(id);
    }
    model.modalNuevoGrupoBtn = function () {
        $('#modalGrupo').openModal();
        model.entrar = true;
    }
    model.modalEntrarGrupoBtn = function () {
        $('#modalGrupo').openModal();
        model.entrar = false;
    }


}

function getMensajes($http) {
    $('textarea.materialize-textarea').characterCounter();
    var model = this;

    $http.get("http://localhost:8080/EduCom/webresources/mensajes").success(function (data) {
        model.mensajes = data;


    });
    model.nuevoMensaje = function () {
        $('#modalNuevoMensaje').openModal();
    }

    this.mensajesModal = function () {
        $('.collapsible').collapsible({
            accordion: false
        });
    }
}

function getCentro(){
    
    
}
