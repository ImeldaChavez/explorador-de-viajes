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
	mostrarFavoritosVacios,
} from "./ui/ui.js";
import { procesarPaises } from "./utils/filters.js";
import { crearMapa, destruirMapa } from "./ui/mapUI.js";
import {
	obtenerFavoritos,
	agregarFavorito,
	eliminarFavoritos,
	esFavorito,
} from "./services/favoritesService.js";

//Estado de aplicación
let paises = [];
let vistaActual = "explorar";

//Referencias del DOM
const destinarioContainer = document.querySelector("#destinations-container");
const resultCount = document.querySelector("#results-count");
const initialMenssage = document.querySelector("#initial-message");

const searchInput = document.querySelector("#search-input");
const continentFilter = document.querySelector("#continent-filter");
const sortFilter = document.querySelector("#sort-filter");

const detailModal = document.querySelector("#detail-modal");
const detailModalContent = document.querySelector("#detail-modal-content");

const btnExplorar = document.querySelector("#button-explorer");

const btnFavoritos = document.querySelector("#button-favorites");

const sectionTitle = document.querySelector("#section-title");

const searchForm = document.querySelector("#search-form");

//Cerrar modal
function cerrarModalDetalle() {
	destruirMapa();
	cerrarDetalle(detailModal, detailModalContent);
}

//Buscar pais por codigo
function obtenerPaisPorCodigo(codigo) {
	return paises.find((pais) => pais.codes?.alpha_3 === codigo);
}

//Actualizar navegación
function actualizarNavegacion() {
	//const clasesActivas = ["bg-blue-600", "text-white"];

	//const clasesInactivas = [
	//	"bg-white",
	//	"text-slate-700",
	//	"border",
	//	"border-slate-300",
	//];

	if (vistaActual === "explorar") {
		btnExplorar.className = `
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-blue-700
        transition
    `;

		btnFavoritos.className = `
        px-4
        py-2
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-slate-100
        transition
    `;
	} else {
		btnExplorar.className = `
        px-4
        py-2
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-slate-100
        transition
    `;

		btnFavoritos.className = `
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-blue-700
        transition`;
	}
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
	if (vistaActual !== "explorar") {
		return;
	}

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

//Mostrar vista explorar
function mostrarExplorar() {
	vistaActual = "explorar";

	sectionTitle.textContent = "Destinos";

	searchForm.classList.remove("hidden");

	actualizarNavegacion();

	aplicarFiltros();
}

//Mostrar favoritos
function mostrarFavoritos() {
	vistaActual = "favoritos";

	sectionTitle.textContent = "Mis favoritos";

	searchForm.classList.add("hidden");

	actualizarNavegacion();

	const favoritos = obtenerFavoritos();

	if (favoritos.length === 0) {
		mostrarFavoritosVacios(destinarioContainer);

		actualizarContador(0, resultCount);

		return;
	}

	renderPaises(favoritos, destinarioContainer, "favoritos");

	actualizarContador(favoritos.length, resultCount);
}

//Eliminar destino/pais de favoritos
async function manejarEliminarFavoritos(codigo) {
	const pais = obtenerPaisPorCodigo(codigo);

	if (!pais) {
		return;
	}

	const resultado = await Swal.fire({
		icon: "warning",
		title: "Eliminar favorito",
		text: `¿Deseas eliminar ${pais.names?.common ?? "este destino"} de tus favoritos?`,
		showCancelButton: true,
		confirmButtonText: "Eliminar",
		cancelButtonText: "Cancelar",
		confirmButtonColor: "#dc2626",
	});

	if (!resultado.isConfirmed) {
		return;
	}

	eliminarFavoritos(codigo);

	mostrarFavoritos();

	Swal.fire({
		icon: "success",
		title: "Favorito eliminado",
		timer: 1500,
		showConfirmButton: false,
	});
}

//Agregar pais/destino a favoritos
function manejarAgregarFavorito(codigo) {
	const pais = obtenerPaisPorCodigo(codigo);

	if (!pais) {
		return;
	}

	if (esFavorito(codigo)) {
		Swal.fire({
			icon: "info",
			title: "Ya está en favoritos",
			text: "Este destino ya había sido guardado.",
		});

		return;
	}

	const agregado = agregarFavorito(pais);

	if (agregado) {
		Swal.fire({
			icon: "success",
			title: "Destino guardado",
			text: `${pais.names?.common ?? "El destino"} fue agregado a favoritos.`,
			timer: 1800,
			showConfirmButton: false,
		});
	}
}

//Registrar eventos para aplicar los filtros
function registrarEventos() {
	//Por si el usuario presiona Enter accidentalmente
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
	});

	//Buscar por pais
	searchInput.addEventListener("input", aplicarFiltros);

	//Buscar por continente
	continentFilter.addEventListener("change", aplicarFiltros);

	//Ordenar paises
	sortFilter.addEventListener("change", aplicarFiltros);

	//Navegación - Explorar
	btnExplorar.addEventListener("click", mostrarExplorar);

	//Navegación favoritos
	btnFavoritos.addEventListener("click", mostrarFavoritos);

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

		if (accion === "favorite") {
			manejarAgregarFavorito(codigo);
		}

		if (accion === "remove-favorite") {
			manejarEliminarFavoritos(codigo);
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

	//Actualizar navegación
	actualizarNavegacion();

	//Registrar los eventos de busqueda
	registrarEventos();
}

//Iniciar la aplicación
init();
