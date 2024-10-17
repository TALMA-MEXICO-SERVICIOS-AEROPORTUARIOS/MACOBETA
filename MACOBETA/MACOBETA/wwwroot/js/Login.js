/********************************************

Creador: Rodrigo Esau Lopez Vazquez (RELV)
Fecha de creacion: 19/09/2024
Funcion: Logica para Logearse

version     Fecha           Modificador
1.0         04/10/2024      RELV

*********************************************/

// Logica para llamar modal del Index
function loadIndex(data) {

    var username = data.Username;
    $.get('/Home/Index', function (data) {
        $('body').append(data);
        showModal('indexModal');
        $('#welcomeMessage').text(`Bienvenido, ${username}!`); // Pasar el nombre de usuario
    });
}

//Cierra el modal que se le indica
function closeModal(modalId) {
    $(`#${modalId}`).modal('hide');
}

// Abre el modal que se le indique
function showModal(modalId) {
    $(`#${modalId}`).modal({
        backdrop: false, // Evita cerrar al hacer clic fuera del modal
        keyboard: false // Evita cerrar con la tecla Escape
    }).modal('show');
}

// Logica para boton de contraseñas
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', passwordType);

    // Cambiar el icono
    this.innerHTML = passwordType === 'password' ? '<i class="bi bi-eye" aria-hidden="true"></i>' : '<i class="bi bi-eye-slash" aria-hidden="true"></i>';
});

// Funcion llamada por el boton de inicio
function submitLogin() {
    var username = $('#username').val();
    var password = $('#password').val();

   
    // Evita el resto de la ejecucion si estan vacios el usuario y la contraseña 
    function showError(message) {
        // Eliminar cualquier fondo existente de Bootbox antes de agregar uno nuevo
        $('.bootbox.modal-backdrop').remove();
        bootbox.alert({
            title: 'ERROR AL INICIAR SESIÓN',
            message: message,
            className: 'custom-modal',
            callback: function () {
                // Remover el fondo al cerrar el modal
                $('.bootbox.modal-backdrop').remove();
            }
        });
    }
    if (!username && !password) {
        showError('Usuario y contraseña vacíos, ingrésalos por favor.');
        return;
    } else if (!username) {
        showError('Usuario vacío, ingrésalo por favor.');
        return;
    } else if (!password) {
        showError('Contraseña vacía, ingrésala por favor.');
        return;
    }

    // Estructura para el modelo
    var model = {
        Username: username,
        Password: password
    };


    // SI EL API DA RESPUESTA OK
    let exito = 1;
    // Ingresar la a logica para respuesta en caso de llamadas a la api por usuarios y contraseñas
    //loginUser();
    //return;

    
    // Cambio de modal
    if (exito = 1) {
        closeModal('loginModal');
        loadIndex(model);
        $('.modulo-custom').replaceWith(`<div class="modulo-custom">${username}</div>`); // Reemplazar el contenido del header
    }
    else if (exito = 2) {
        showError('Contraseña o Usuario Incorrectos, ingreselas de nuevo.');
        return;
    }
    else {
        showError('Error de conexión, intentelo mas tarde.');
        return;
    }
        
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
    let userName = Encrypt(document.getElementById("#username").value);
    let password = Encrypt(document.getElementById("#password").value);

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