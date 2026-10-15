//Buscar paises por nombre
export function buscarPaises(paises, texto){
    const textoNormalizado = texto.trim().toLowerCase();

    if(!textoNormalizado){
        return paises;
    }

    return paises.filter((pais) => {
        const nombre = pais.names?.common?.toLowerCase() ?? "";

        return nombre.includes(textoNormalizado);
    });
}


//Filtrar por continente 
export function filtrarPorContinente(paises, continente){

    //Retornar todos los paises
    if(continente === "all"){
        return paises;
    }

    //Filtrar los paises por region/continente
    return paises.filter((pais) => pais.region === continente);
}

//Ordenar paises de la A-Z y de la Z-A
export function ordenarPaises(paises, criterio){

    const paisesOrdenados = [...paises];

    //Ordenar de A-Z 
    if(criterio === "az"){
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? '';

            const nombreB  = b.names?.common ?? '';

            return nombreA.localeCompare(nombreB);
        });
    }

    //Ordenar de la Z-A
    if(criterio === "za"){
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? '';

            const nombreB  = b.names?.common ?? '';

            return nombreB.localeCompare(nombreA);
        });
    }

    return paisesOrdenados;
}

//Combinando procesamiento
//Procesar paises

export function procesarPaises(paises, texto, continente, criterioOrden){
    let resultado = buscarPaises(paises, texto);

    resultado = filtrarPorContinente(resultado, continente);

    resultado = ordenarPaises(resultado, criterioOrden);

    return resultado;
}
