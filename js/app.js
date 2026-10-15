console.log('Conexion exiitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';
import {mostrarCargado, mostrarError, renderPaises, actualizarContador} from './ui/ui.js';
import { procesarPaises } from './utils/filters.js';

//Estado de aplicación
let paises = [];



//Referencias del DOM
const destinarioContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMenssage = document.querySelector('#initial-message');

const searchInput = document.querySelector("#search-input");
const continentFilter = document.querySelector("#continent-filter");
const sortFilter = document.querySelector("#sort-filter");


//Aplicar filtros
function aplicarFiltros(){

    //Valores de los inputs
    const texto = searchInput.value;
    const continente = continentFilter.value;
    const criterioOrden = sortFilter.value;

    const resultado = procesarPaises(paises, texto, continente, criterioOrden);

    //Renderizar paises
    renderPaises(resultado, destinarioContainer);

    //Actualizar contador 
    actualizarContador(resultado.length, resultCount);
}

//Registrar eventos para aplicar los filtros
function registrarEventos(){
    //Buscar por pais
    searchInput.addEventListener("input", aplicarFiltros);

    //Buscar por continente
    continentFilter.addEventListener("change", aplicarFiltros);

    //Ordenar paises
    sortFilter.addEventListener("change", aplicarFiltros);


}

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
   //renderPaises(paises, destinarioContainer);
    
    //Actualizar contador
    //actualizarContador(paises.length, resultCount);

    //Mostrar los resultados iniciales
    aplicarFiltros();
    
    //Registrar los eventos de busqueda
    registrarEventos();

}



//Iniciar la aplicación
init();