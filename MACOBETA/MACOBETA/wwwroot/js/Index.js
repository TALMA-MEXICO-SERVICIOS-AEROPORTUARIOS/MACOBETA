/********************************************

Creador: Rodrigo Esau Lopez Vazquez (RELV)
Fecha de creacion: 17/10/2024
Funcion: Logica para el Index

version     Fecha           Modificador
1.0         17/10/2024      RELV

*********************************************/

function closeModal(modalId) {
    $(`#${modalId}`).modal('hide'); // Cambiado para usar el método de Bootstrap       

}
//Funcion para salir del login
function exitIndex() {
    closeModal('indexModal');
    resetModuleTitle(); // Restablece el título a "MÓDULO MACO"
    $(document).ready(function () {
        $('#loginModal').modal({
            //Evitar que se cierre automaticamente el modal
            backdrop: false,
            keyboard: false
        }).modal('show'); // Mostrar el modal de login al inicio
    });
}

// Reemplazar el contenido del header
function resetModuleTitle() {
    $('.modulo-custom').replaceWith('<div class="modulo-custom">MÓDULO MACO</div>');
}