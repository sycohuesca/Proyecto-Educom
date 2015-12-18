var google = false;
var url = '/EduCom/webresources/';
var correcto = false;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: url + 'centros',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (a) {
            $('#centros').append("<option value='" + data[a].idCentro + "'>" + data[a].nombre + "</option>");
        });
        $('select').material_select();
    }).fail(function () {
        console.log("Imposible cargar centros");
    });
    var loginFinished = function (authResult)
    {

        gapi.client.load('oauth2', 'v2', function ()
        {
            gapi.client.oauth2.userinfo.get()
                    .execute(function (resp)
                    {
                        // Shows user email
//                        console.log(resp.email);
                        $("#labelNombre").addClass("active");
                        google = true;
                        $("#nombreCrear").val(resp.email);
                        $("#passwordCrear").attr("required", false);
                        $("div.limpi").addClass("hide");
                        $("#renderMe").addClass("hide");
                        $("#aut").val(resp.verified_email);
                    });
        });

    };
    var options = {
        'callback': loginFinished,
        'approvalprompt': 'force',
        'clientid': '383649619527-ke06it4ka2iv091mfdqnii65jmcqi30f.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        'requestvisibleactions': 'http://schemas.google.com/CommentActivity http://schemas.google.com/ReviewActivity',
        'cookiepolicy': 'single_host_origin'
    };
    gapi.signin.render('renderMe', options);

});
$("#miForm").submit(function (e) {
    e.preventDefault();
    if (!correcto) {


        var user = $("#nombreCrear").val();
        var pass = $("#passwordCrear").val();
        if (google) {
            $.getJSON(url + 'logins/user=' + user).done(function (data) {
                if ($.isEmptyObject(data)) {
                    alert("Usuario no registrado");

                }
                else {
                    $("#idUsuario").val(data.idUsuario.idUsuario);
                    alert("Usuario correcto. Hola " + data.idUsuario.nombre);
                    $.getJSON(url + "usuariotipousuario/usuario=" + data.idUsuario.idUsuario).done(function (data2) {
                        $("#tipo").val(data2[0].usuarioTipoUsuarioPK.idTipoUsuario);
                        $("#miForm2").submit();
                    });
                }
            });
        }
        else {
            $.ajax({
                type: "GET",
                url: url + 'logins/usuarios/' + user + "/" + pass,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function (data) {
                if ($.isEmptyObject(data)) {
                    alert("Usuario/password incorrectos");

                }
                else {
                    $("#idUsuario").val(data.idUsuario.idUsuario);
                    alert("Usuario correcto. Hola " + data.idUsuario.nombre);
                    $.getJSON(url + "usuariotipousuario/usuario=" + data.idUsuario.idUsuario).done(function (data2) {
                        $("#tipo").val(data2[0].usuarioTipoUsuarioPK.idTipoUsuario);
                       document.cookie="username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
                    });
                }
            }).fail(function () {
                alert("No hay acceso.");

            });
        }
    }
});































   