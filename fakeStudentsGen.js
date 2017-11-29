var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var genDate = function(ano, mes){

	let tope = 0;

    if(mes == "3" || mes == "5" || mes == "8" || mes == "10"){
      tope = 30;
    }
    
    if(mes == "0" || mes == "2" || mes == "4" || mes == "6" || mes == "7" || mes == "9" || mes == "11"){
      tope = 31;
    }
    
    if(mes == "1"){
       if ((((ano%100)!=0)&&((ano%4)==0))||((ano%400)==0)){
         tope = 29;
       }
       else{
         tope = 28;
       }
    }

    let dia = getRandomInt(0, tope+1);
    let fecha = new Date(ano, mes, dia);

    return fecha;
}

var genStudents = function(cedulaInicial, cedulaFinal, ano){

	let estudiantes = [];
	
	let cedula = cedulaInicial;
	let tope = cedulaFinal;
	let ano_nac = ano;
	let sexos = ['M','F'];

	while(cedula < tope){

		switch(getRandomInt(1,4)){
			case 1:
				cedula+=Math.ceil( getRandomInt(1, 50)/8 ) ;
			break;			
			
			case 2:
				cedula+=Math.ceil( getRandomInt(50, 100)/8 );
			break;			
			
			case 3:
				cedula+=Math.ceil( getRandomInt(100, 150)/8 );
			break;
		}

		let sexo = sexos[getRandomInt(0,2)]

		let mes = getRandomInt(0,12);
		let fecha = genDate(ano_nac, mes);
		let liceo = liceos[getRandomInt(0,85)];
		let mencion = liceo.menciones[getRandomInt(0,liceo.menciones.length)];
		let ano_egreso = ano_nac+16;

		let mun_lic = (parroquias.find((element) =>{return element.codigo == liceo.parroquia})).municipio;
		let parroquiasEncontradas = parroquias.filter((element) =>{return element.municipio == mun_lic});

		let residencia = parroquiasEncontradas[getRandomInt(0,parroquiasEncontradas.length)];

		let estudiante = {
			cedula: ""+cedula,
			sexo: sexo,
			f_nac: fecha,
			liceo: liceo.codigo,
			mencion: mencion,
			ano_egreso: ano_egreso,
			residencia: residencia.codigo
		}
		estudiantes.push(estudiante);
	}

	return estudiantes;
}