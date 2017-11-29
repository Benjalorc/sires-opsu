var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var pnevGen = function(){

	let pnevs = [];
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

		let decision = getRandomInt(1,101);
		if(decision<80){


			let estudiante = element;
			let cantidad = 0;
			let asignable = 0;

			let misCarreras = carrerasPorArea[getRandomInt(0,carrerasPorArea.length)];
			codigo = ""+element.ano_egreso+""+element.cedula;

				let pnev = {
					codigo: ""+codigo,
					ano: element.ano_egreso-1,
					estudiante: element.cedula,
					resultados: [],
				};

				for(let i = 0; i<3; i++){
					let carr = misCarreras[getRandomInt(0,misCarreras.length)];

					while(pnev.resultados.find((element) =>{element.codigo == carr.codigo})){
						carr = misCarreras[getRandomInt(0,misCarreras.length)];
					}
					pnev.resultados.push({carrera: carr.codigo});
	//				console.log("exito");
				}

				pnevs.push(pnev);


		}

	});
	return pnevs;
}