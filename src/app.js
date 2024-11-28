let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
		pagina += 1; //no se conocen limites para el api cat
		cargarGatos();
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarGatos();
	}
});

const cargarGatos = async() => { //se conectara con api y obtendra las peliculas
	console.log("intentando cargar datos.")
	try {
		const respuesta = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${pagina}&order=Desc`, {
			headers: {
				'x-api-key': 'live_wIeG3Vc5wGBxopf0NTTzd6OauxzinCY1V9vpZsrLXwxWEFEWTXYjnVpkYHwUrZTD' //ahora la clave es de cat api
			}
		});
	
		console.log(respuesta);

		// Si es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let gatos = '';
			datos.forEach(gato => {
				gatos += `
					<div class="gato">
                        <img class="imagen" src="${gato.url}" alt="Gato adorable">
                    </div>
				`;
			});

			document.getElementById('contenedor').innerHTML = gatos;

		} else {
			console.error("Error al cargar los datos: ", respuesta.status);
		}

	} catch(error){
		console.log("Erro al conectar con la API", error);
	}

}

cargarGatos();