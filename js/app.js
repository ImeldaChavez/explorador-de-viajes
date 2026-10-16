console.log("Conexion exiitosa");

//Imports
import { obtenerPaises } from "./api/countriesApi.js";
import {
	mostrarCargado,
	mostrarError,
	renderPaises,
	actualizarContador,
	mostrarDetalle,
	cerrarDetalle,
} from "./ui/ui.js";
import { procesarPaises } from "./utils/filters.js";
import { crearMapa, destruirMapa } from "./ui/mapUI.js";

//Estado de aplicación
let paises = [];

//Referencias del DOM
const destinarioContainer = document.querySelector("#destinations-container");
const resultCount = document.querySelector("#results-count");
const initialMenssage = document.querySelector("#initial-message");

const searchInput = document.querySelector("#search-input");
const continentFilter = document.querySelector("#continent-filter");
const sortFilter = document.querySelector("#sort-filter");

const detailModal = document.querySelector("#detail-modal");
const detailModalContent = document.querySelector("#detail-modal-content");

//Cerrar modal
function cerrarModalDetalle() {
	destruirMapa();
	cerrarDetalle(detailModal, detailModalContent);
}

//Buscar pais por codigo
function obtenerPaisPorCodigo(codigo) {
	return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}

//Abrir detalle
function abrirDetalle(codigo) {
	const pais = obtenerPaisPorCodigo(codigo);

	if (!pais) {
		console.warn("Pais no encontrado");
		return;
	}

	const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);

	setTimeout(() => {
		crearMapa(datosMapa.latitud, datosMapa.longitud, datosMapa.nombre);
	}, 0);
}

//Aplicar filtros
function aplicarFiltros() {
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
function registrarEventos() {
	//Buscar por pais
	searchInput.addEventListener("input", aplicarFiltros);

	//Buscar por continente
	continentFilter.addEventListener("change", aplicarFiltros);

	//Ordenar paises
	sortFilter.addEventListener("change", aplicarFiltros);

	//Acciones de las tarjetas de destino
	destinarioContainer.addEventListener("click", (event) => {
		const boton = event.target.closest("[data-action]");

		if (!boton) {
			return;
		}
		const accion = boton.dataset.action;
		const codigo = boton.dataset.countryCode;

		if (accion === "detail") {
			abrirDetalle(codigo);
		}
	});

	//Cerrar modal detalle
	detailModal.addEventListener("click", (event) => {
		if (event.target.id === "btn-close-detail") {
			cerrarModalDetalle();
		}

		if (event.target === detailModal) {
			cerrarModalDetalle();
		}
	});

	//Cerrar con la techa de escape
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !detailModal.classList.contains("hidden")) {
			cerrarModalDetalle();
		}
	});
}

//inicialización de la aplicación
async function init() {
	console.log("Explorador de viajes iniciado");
	//resultCount.textContent = '1 destino';

	//Mostrar resultados de la carga
	mostrarCargado(destinarioContainer);

	//Obtener los países
	paises = await obtenerPaises();
	console.log("Paises obtenidos en app,js: ", paises);

	//Validar paises
	if (paises.length === 0) {
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
