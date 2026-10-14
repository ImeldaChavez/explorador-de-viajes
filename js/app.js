console.log('Conexion exiitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';

//Estado de aplicación
let paises = [];



//Referencias del DOM
const destinarionContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMenssage = document.querySelector('#initial-message');

//inicialización de la aplicación 
async function init(){
    console.log("Explorador de viajes iniciado");

    //resultCount.textContent = '1 destino';

    //Mostrar estado de carga
    initialMenssage.innerHTML = /*html */`
        <div class="text-5xl mb-4">
            🌎
        </div>

        <h3 class="text-xl font-semibold text-slate-800 mb-2">
            Cargando destinos
        </h3>

        <p>
            Estamos consultando información de páises alrededor del mundo...
        </p>
    `;

    //Obtener los países
    paises = await obtenerPaises();
    console.log('Paises obtenidos en app,js: ', paises);

    //Actualizar el contador de destinos en el DOM
    resultCount.textContent = `${paises.length} destinos`;

    //Mostrar los destinos en el DOM
    if(paises.length > 0){
        initialMenssage.innerHTML = /*html */`
            <div class="text-5xl mb-4">
                ✅
            </div>

            <h3>
                Destinos cargados exitosamente.
            </h3>

            <p>
                Se obtuvieron ${paises.length} destinos.
            </p>

        `;
    }else {
        //Mostrar un mensaje si ocurre un error
        initialMenssage.innerHTML = /*html */`
            <div class="text-5xl mb-4">
                ⚠️
            </div>

            <h3>
                No fue posible cargar los destinos.
            </h3>

            <p>
                No se pudieron obtener los destinos. Por favor, 
                verifica tu conexión e inténtalo de nuevo más tarde.
            </p>

        `;
}

}

//Iniciar la aplicación
init();