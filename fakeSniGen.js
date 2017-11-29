var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var mezcla = [];

carreras.forEach((element) =>{


	let carrera = element;

	let objeto = {
		carrera: carrera.codigo,
		universidades:[]
	};

	universidades.forEach((element) =>{

		let univ = element;
		if(element.carreras.find((element) =>{return element.codigo == carrera.codigo})){

			let mun = parroquias.find((element) =>{ return element.codigo == univ.ubicacion}).municipio;
			let estado = municipios.find((element) =>{ return element.codigo == mun}).estado;
			let pre = {
				codigo: univ.codigo,
				parroquia: {
					codigo: univ.ubicacion,
					municipio: {
						codigo: mun,
						estado: {
							codigo: estado
						}
					}
				}
			}
			objeto.universidades.push(pre);
		}

	});

	mezcla.push(objeto);

});











var sniGen = function(){

//CUANTOS CODIGOS GENERARE PARA CADA ESTUDIANTE?
	let snis = [];
	let codigo = "";


	let areas = [];

	carreras.forEach((element) =>{
		let carrera = element;
		if(!areas.find((element) =>{element == carrera.area})){
			areas.push(carrera.area);
		}
	});

	let carrerasPorArea = [];

	areas.forEach((element) =>{
		let area = element;
		let grupo = carreras.filter((element) =>{return element.area == area});
		carrerasPorArea.push(grupo);
	});


	estudiantes.forEach((element) =>{

		let estudiante = element;
		let decision = getRandomInt(1,101);
		let cantidad = 0;
		let asignable = 0;
		if(decision < 75){
			cantidad = 1;
			asignable = 90;
		}
		else if(decision < 85){
			cantidad = 2;
			asignable = 85;
		}
		else if(decision < 90){
			cantidad = 3;
			asignable = 70;
		}
		else if(decision <= 100){
			cantidad = 0;
			asignable = 0;
		}
		else{
			console.log("QUE ES LO QUE QUIERES?");
			return false;
		}

		let misCarreras = carrerasPorArea[getRandomInt(0,carrerasPorArea.length)];
		codigo = ""+element.ano_egreso+""+element.cedula;
		for(let i = 0; i<cantidad; i++){

			let sni = {
				codigo: codigo+i,
				ano: element.ano_egreso+i,
				periodo: getRandomInt(1,3),
				estudiante: element.cedula,
				opciones: [],
				asignada: 0
			};

			for(let i = 0; i<6; i++){
				let carr = misCarreras[getRandomInt(0,misCarreras.length)];
				
				let posible = mezcla.find((element) =>{return element.carrera == carr.codigo });
				//console.log(carr);
				//console.log(posible);


				let decision = getRandomInt(1,101);
				let destino = "";

				let mun = (parroquias.find((element) =>{ return element.codigo == estudiante.residencia })).municipio;
					mun = (municipios.find((element) =>{ return element.codigo == mun }));

				if(decision<65){
					destino = mun;
					let existe = posible.universidades.filter((element) =>{return element.parroquia.municipio.codigo == destino});
					if(existe.length){
						univTarget = posible.universidades[getRandomInt(0,posible.universidades.length)];
//						console.log(decision);
//						console.log(carr);
//						console.log(destino);
//						console.log(posibles);
//						console.log(masPosibles);
						decision = 200;
					}
					else{
						decision = 70;
//						console.log("intentare abajo");
					}
				}
				if(decision<85){
					
					destino = mun;
					let muns = municipios.filter((element) =>{return element.estado == destino.estado});

					let existe = posible.universidades.filter((element) =>{return ( (element.municipio != destino.codigo) && (element.estado == destino.estado) ) });

					if(existe.length){
						univTarget = posible.universidades[getRandomInt(0,posible.universidades.length)];
//						console.log(decision);
//						console.log(carr);
//						console.log(destino);
//						console.log(posibles);
//						console.log(masPosibles);
						decision = 200;
					}
					else{
						decision = 95;
//						console.log("Intento mas abajo");
					}	

				}
				if(decision<=100){

					let ests = estados.filter((element) =>{return element.codigo != mun.estado });
					destino = (ests[getRandomInt(0,ests.length)]).codigo;
//					console.log(decision);
//					console.log(carr);
//					console.log(destino);
//					console.log(posibles);
					univTarget = posible.universidades[getRandomInt(0,posible.universidades.length)];
					decision = 200;
				}
//				console.log(carr);
//				console.log(univTarget);
				let opcion = {carrera: carr.codigo, universidad: univTarget.codigo, asignada: false};
//				console.log("exito");
				sni.opciones.push(opcion);
			}

			let asignar = false;
			if(i == cantidad-1){
				asignar=true;
			}

			let suerte = getRandomInt(1,101);
			if(suerte < asignable && asignar == true){
				sni.asignada = getRandomInt(1,4);
				sni.opciones[sni.asignada-1].asignada = true;
			}
			snis.push(sni);
		}
	});
	return snis;
}