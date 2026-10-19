# Explorador de viajes y lugares tutisticos

Proyecto integrador desarrollado con JavaScript, APIs y librerías para explorar información de países y destinos alrededor del mundo.

## Tecnologías

## Tecnologías

-HTML5
-JavaScript ES6+
-Tailwind CSS
-APIs REST
-LocalStorage
-Leaflet
-SweetAlert2
-Git
-GitHub

## Características

El proyecto permitirá:

-Consultar países desde una API REST.
-Buscar destinos.
-Filtrar destinos por continente.
-Ordenar resultados.
-Consultar información detallada.
-Visualizar la ubicación del destino en un mapa.
-Guardar destinos favoritos.
-Persistir favoritos mediante LocalStorage.
-Favoritos
-LocalStorage
-SweetAlert2
-Vista dinámica Explorar/Favoritos

## countriesApi.js

-fetch()
-async / await
-try / catch
-response.ok
-response.json()
-import / export

## ui.js

-map()
-template literals
-innerHTML
-optional chaining
-data-\*
-DOM dinámico
-módulos JavaScript
-separación de responsabilidades

## Arquitectura

La aplicación utiliza una sola página HTML y divide progresivamente la lógica JavaScript en módulos según su responsabilidad.

Actualmente la aplicación separa:
-Comunicación con APIs.
-Coordinación principal.
-Renderizado de la interfaz.
-Búsqueda, filtrado y ordenamiento de información.

## Versión actual

v0.6.0 - Favoritos persistentes con LocalStorage e integración de SweetAlert2.
