console.log('Hola mundo');

//Referencias del DOM
const destinarionContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');

//inicialización de la aplicación 
function init(){
    console.log("Explorador de viajes iniciado");

    resultCount.textContent = '1 destino';
}

//Iniciar la aplicación
init();