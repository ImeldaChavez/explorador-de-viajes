console.log('Conexion exiitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';
import {mostrarCargado, mostrarError, renderPaises, actualizarContador} from './ui/ui.js'

//Estado de aplicación
let paises = [];



//Referencias del DOM
const destinarioContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMenssage = document.querySelector('#initial-message');

//inicialización de la aplicación 
async function init(){
    console.log("Explorador de viajes iniciado");
    //resultCount.textContent = '1 destino';

    //Mostrar resultados de la carga
    mostrarCargado(destinarioContainer);

    //Obtener los países
    paises = await obtenerPaises();
    console.log('Paises obtenidos en app,js: ', paises);

    //Validar paises
    if(paises.length === 0){
        mostrarError(destinarioContainer);

        actualizarContador(0, resultCount);

        return;
    }

    //Mostrar los paises/destinos
    renderPaises(paises, destinarioContainer);
    
    //Actualizar contador
    actualizarContador(paises.length, resultCount);
}

//Iniciar la aplicación
init();