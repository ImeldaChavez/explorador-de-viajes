//Manejo de Favoritos con LocalStorage

//Clave de LocalStorage
const FAVORITES_KEY = "explorador_viajes_favoritos";

export function obtenerFavoritos() {
	const favoritosGuardados = localStorage.getItem(FAVORITES_KEY);

	if (!favoritosGuardados) {
		return [];
	}

	try {
		return JSON.parse(favoritosGuardados);
	} catch (error) {
		console.error("Error al leer favoritos: ", error);
		return [];
	}
}

//Guardar favoritos
function guardarFavoritos(favoritos) {
	localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
}

//Verificar favorito
export function esFavorito(codigo) {
	const favoritos = obtenerFavoritos();

	return favoritos.some((pais) => pais.codes?.alpha_3 === codigo);
}

//Agragar favoritos
export function agregarFavorito(pais) {
	const favoritos = obtenerFavoritos();
	const codigo = pais.codes?.alpha_3;

	if (!codigo) {
		return false;
	}

	const yaExiste = favoritos.some(
		(favorito) => favorito.codes?.alpha_3 === codigo,
	);

	if (yaExiste) {
		return false;
	}

	favoritos.push(pais);

	guardarFavoritos(favoritos);

	return true;
}

//Eliminar favoritos
export function eliminarFavoritos(codigo) {
	const favoritos = obtenerFavoritos();

	const favoritosActualizados = favoritos.filter(
		(pais) => pais.codes?.alpha_3 !== codigo,
	);

	guardarFavoritos(favoritosActualizados);

	return favoritosActualizados;
}
