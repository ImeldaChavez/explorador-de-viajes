//Mapa integración de Leaflet

//Instancia actual del mapa
let mapaActual = null;

//Destruir mapa actual
export function destruirMapa() {
	if (mapaActual) {
		mapaActual.remove();
		mapaActual = null;
	}
}

//Crear un nuevo mapa
export function crearMapa(latitud, longitud, nombre) {
	//Validar coordenadas
	if (typeof latitud !== "number" || typeof longitud !== "number") {
		console.warn("Coordenadas no disponibles");
		console.log(latitud, longitud);
		return;
	}

	//Eliminar mapa
	destruirMapa();

	//Inicializar Leafth
	mapaActual = L.map("destination-map").setView([latitud, longitud], 4);

	//Agregar capa de mosaico de OpenStreetMap
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: "&copy; OpenStreetMap contributors",
	}).addTo(mapaActual);

	//Agregar marcador
	L.marker([latitud, longitud])
		.addTo(mapaActual)
		.bindPopup(`<strong>${nombre}</strong>`)
		.openPopup();
}
