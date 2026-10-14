//Comunicación con la API de países

const API_URL = "https://juancognitus.github.io/explorador-viajes-api/paises.json";

//Export permite exportar 
export async function obtenerPaises(){
    try{
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error(`Error al obtener los países: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
    
        const paises = result;

        console.log(`Paises obtenidos: `, paises);

        return paises;

    }catch(error){
        console.log(`Error al obtener los paises: `,error);
        return [];
    }
}

obtenerPaises();
