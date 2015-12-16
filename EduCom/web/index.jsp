<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="es">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <title>EduCom</title>



        <!-- CSS  -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="Cliente/styles/materialize.min.css" type="text/css" rel="stylesheet" media="screen,projection" />
        <link href="Cliente/styles/login.css" type="text/css" rel="stylesheet" media="screen,projection" />

    </head>

    <body>
        <div class="row">
            <div class="col s10 m6 l4 offset-s1 offset-m3 offset-l4">
                <form id="miForm">
                    <div id="loginpanel" class="card-panel center-align">

                        <div class="container">
                            <h5>Login:</h5>
                            <div class="row">
                                <div class="input-field col s12"/>
                                    <select  id="centros" required>
                                        <option disabled selected>Escoge un centro</option>
                                    </select>
                                    <label>Escoge un centro:</label>
                                </div>

                                <div class="input-field col s12">
                                    <input  id="nombreCrear" name="user" type="text" required/>
                                    <label id="labelNombre" for="nombreCrear" data-error="Error">Usuario:</label>
                                </div>

                                <div class="limpi input-field col s12">
                                    <input name="pass" id="passwordCrear" type="password" required/>
                                    <label for="passwordCrear" data-error="Error">Password:</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col l12">
                                    <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                                        <i class="material-icons right">send</i>
                                    </button><div>
                                        <p></p></div>

                                    <div id="renderMe"></div>  

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form id="miForm2" action="Cliente/paneldecontrol.jsp" method="POST">
                      <input name="idUsuario" id="idUsuario" type="text" class="hide"/>
                      <input name="tipo" id="tipo" type="text" class="hide"/>
                </form>
            </div>

        </div>

        <!--fin container-->


        <!--  Scripts-->
        <script src="Cliente/scripts/jquery.min.js"></script>
        <script src="Cliente/scripts/materialize.min.js"></script>
        <script src="https://apis.google.com/js/client:platform.js"></script>
        <script src="Cliente/scripts/login.js"></script>
    </body>
</html>