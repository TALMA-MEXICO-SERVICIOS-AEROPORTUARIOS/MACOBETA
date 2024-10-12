/********************************************

Creador: Rodrigo Esau Lopez Vazquez (RELV)
Fecha de creacion: 19/09/2024
Funcion: Animaciones para el Login de usuarios

version Fecha Modificador
1.0 04/10/2024 RELV

*********************************************/

//Todo este codigo realiza la transicion de color de las cajas de texto de usuario y contraseña
//document.getElementById('txtUserName').addEventListener('focus', function () {
//    document.getElementById('inputContainer_UserName').classList.add('focused');
//});
//document.getElementById('txtUserName').addEventListener('blur', function () {
//    document.getElementById('inputContainer_UserName').classList.remove('focused');
//});

//document.getElementById('txtPassword').addEventListener('focus', function () {
//    document.getElementById('inputContainer_Password').classList.add('focused');
//});
//document.getElementById('txtPassword').addEventListener('blur', function () {
//    document.getElementById('inputContainer_Password').classList.remove('focused');
//});


function submitLogin() {
    //var username = $('#username').val();
    //var password = $('#password').val();

    //$.post('@Url.Action("Login", "Account")', { username: username, password: password })
    //    .done(function (data) {
    //        $('#loginModal').modal('hide');
    //        $('body').append(data);
    //    })
    //    .fail(function () {
    //        alert('Error al iniciar sesión. Verifique sus credenciales.');
    //    });

    //Evita el resto de la ejecucion si estan vacios el usuario y la contraseña     RELV    07/10/2024
    if ($('#username').val() == "" && $('#password').val() == "") {
        bootbox.alert("esta vacio");
        
        return;
    }

    var model = {
        Username: $('#username').val(),
        Password: $('#password').val()
    };

    // Realiza una solicitud AJAX para enviar los datos
    fetch('/Account/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    })
        .then(response => {
            if (response.ok) {
                // Manejar la respuesta si es necesario                
                console.log("Ingreso correcto de datos de usuario");
            } else {
                // Manejar errores
                alert('Error al iniciar sesión. Verifique sus credenciales.');
            }
        });
    
    $('#loginModal').hide();
    $('#indexModal').show();
}

function btnLogin_Click() {/*
    let userName = document.getElementById("txtUserName").value;
    let password = document.getElementById("txtPassword").value;

    //Evita el resto de la ejecucion si estan vacios el usuario y la contraseña     RELV    07/10/2024
    if (userName == "" && password == "") {
        bootbox.alert("hola mundo");
        return;
    }
    
    
    // Realiza una solicitud AJAX para enviar los datos
    fetch('/Account/Login2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: userName})
    })
        .then(response => {
            if (response.ok) {
                // Manejar la respuesta si es necesario
            } else {
                // Manejar errores
            }
        });
    //loginUser();
    //return;*/
    
}

//Constantes para numero de intentos y url de seguridad       RELV    25/09/2024
let tryNumber = 1;
let securityServiceUrl = "http://192.168.144.57:7000//"; //"http://localhost:3349//"; //

//Utiliza la librería CryptoJS para la encriptacion de valores con el algoritmo AES en modo CBC y con padding PKCS7       RELV    25/09/2024
function Encrypt(value) {
    let key = CryptoJS.enc.Utf8.parse("8080808080808080");
    let iv = CryptoJS.enc.Utf8.parse("8080808080808080");
    let encryptedpassword = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(value),
        key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return encryptedpassword.toString();
}

function loginUser() {
    let userName = Encrypt(document.getElementById("txtUserName").value);
    let password = Encrypt(document.getElementById("txtPassword").value);

    let data = JSON.stringify({
        userName: userName,
        hashPassword: password,
        tryNumber: Encrypt(tryNumber.toString())
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
    };

    fetch(securityServiceUrl + "GetUserLogin", requestOptions)
        .then((response) => {
            if (response.ok) return response.text();
            else throw new Error(response.status);
        })
        .then((data) => {
            let parsedData = JSON.parse(data);
            if (!parsedData.state) {
                tryNumber++;
                bootbox.alert(parsedData.message);
            } else {
                localStorage.setItem("currentUser", JSON.stringify(parsedData.list));
                window.location.href = "/Security/select_app_store";

            }
        })
        .catch((error) => {
            console.error("ERROR: ", error.message);
        });
}