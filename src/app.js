let pagina = 1; //se inicia la variable con el valor 1
const btnAnterior = document.getElementById('btnAnterior'); //bonotes
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => { //este "escuchador de evento" escuchara cuando se haga click
		pagina += 1; //no se conocen limites para el api cat
		cargarGatos(); //cargara los datos de la nueva pagina
});

btnAnterior.addEventListener('click', () => { //nuevamente "escuchara" cuando se haga click
	if(pagina > 1){ //verificaremos que estamos en la primera pagina para poder ir hacia atras
		pagina -= 1;
		cargarGatos(); //nuevamente cargamos los datos de la pagina
	}
});

const cargarGatos = async() => { //se conectara con api y obtendra los gatos
	console.log("intentando cargar datos.") //imprimira un mensaje para saber si a comenzado a ejecutarse
	try { //intentara ejecutar el codigo dentro de el y si ocurre algun error el codigo se movera a catch
		const respuesta = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${pagina}&order=Desc`, {
			//se usa fetch para hacer la solicitud HTTP a la API de gatos
			//await hace que la ejecucion espere hasta que se reciba respuesta del API
			headers: {
				'x-api-key': 'live_wIeG3Vc5wGBxopf0NTTzd6OauxzinCY1V9vpZsrLXwxWEFEWTXYjnVpkYHwUrZTD' //ahora la clave es de cat api
			}
		});
	
		console.log(respuesta); //mostrara la respuesta de API 

		// Si es correcta
		if(respuesta.status === 200){ //verifica si la respuesta de API fue exitosa. El codigo 200 indica que la solicitud fue exitosa
			const datos = await respuesta.json(); //se obtendra el cuerpo de la respuesta de la API
			
			let gatos = ''; //se crea la variable que contendra lo mostrado en el contenedor
			datos.forEach(gato => { //si hay datos, recorreremos el array datos y por cada gato se agregara una etiqueta img con su url
				gatos += `
					<div class="gato">
                        <img class="imagen" src="${gato.url}" alt="Gato adorable">
                    </div>
				`;
			});

			document.getElementById('contenedor').innerHTML = gatos; //innsertamos el HTML generado en la pagina

		} else { //si la respuesta no esexitosa entonces se mostrara el mensaje de error
			console.error("Error al cargar los datos: ", respuesta.status);
		}

	} catch(error){ //Si ocurre un error durante la ejecucion se mostrara un mensaje de error
		console.log("Erro al conectar con la API", error);
	}

}

cargarGatos();
