// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Definicion de objeto app      RELV    24/09/2024
const app = {
    display: {
        background: {
            bgAnime: null,
            start: function () {
                console.log("Background animation started");
            }
        }
    }
};

//Control de imagenes de fondo      RELV    20/09/2024
const images = [
    '/Resources/Images/Fondos/pict-01 1289x720.jpg',
    '/Resources/Images/Fondos/pict-02 1289x720.jpg',
    '/Resources/Images/Fondos/pict-03 1289x720.jpg',
    '/Resources/Images/Fondos/pict-04 1289x720.jpg',
    '/Resources/Images/Fondos/pict-05 1289x720.jpg'
];
let currentIndex = 0;
const imageContainer = document.querySelector('.image-container');
function changeBackground() {
    imageContainer.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length; // Ciclo a través de las imágenes
}
changeBackground(); // Inicializa la primera imagen
setInterval(changeBackground, 10000); // Cambia cada 10

//Se quita this. para evitar posibles errores       RELV    24/09/2024
app.display.background.bgAnime = imageContainer;
app.display.background.start();


