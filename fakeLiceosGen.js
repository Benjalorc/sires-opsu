var mge = ["N/A"]
var mgem = [
	"Mención Ciencias",
	"Mención Humanidades"
]
var mte = [
	"Industrial", 
	"Agropecuaria", 
	"Comercio y Servicios Administrativos",
	"Promocion y Servicios para la Salud"
]
var mtim = [
	"Construcción Civil",
	"Construcción Naval",
	"Electricidad",
	"Instrumentación",
	"Mecánica de Mantenimiento",
	"Máquinas y Herramientas",
	"Refrigeración y Aire Acondicionado",
	"Química Industrial",
	"Tecnología de Alimentos",
	"Metalurgia"
]
var mtam = [
	"Producción Agrícola",
	"Producción Pecuaria",
	"Conservación de Alimentos",
	"Tecnología Pesquera"
]
var mtcm = [
	"Secretariado Ejecutivo",
	"Mercadeo",
	"Contabilidad",
	"Informática",
	"Turismo",
	"Seguros",
	"Administración Financiera",
	"Administración Pública"
]
var mtsm = [
	"Puericultura",
	"Administración de Servicios"
]

var menciones = [
"Media General: Mención Ciencias",
"Media General: Mención Humanidades",
"Media Técnica Industrial: Mención Construcción Civil",
"Media Técnica Industrial: Mención Construcción Naval",
"Media Técnica Industrial: Mención Electricidad",
"Media Técnica Industrial: Mención Instrumentación",
"Media Técnica Industrial: Mención Mecánica de Mantenimiento",
"Media Técnica Industrial: Mención Máquinas y Herramientas",
"Media Técnica Industrial: Mención Refrigeración y Aire Acondicionado",
"Media Técnica Industrial: Mención Química Industrial",
"Media Técnica Industrial: Mención Tecnología de Alimentos",
"Media Técnica Industrial: Mención Metalurgia",
"Media Técnica Agropecuaria: Mención Producción Agrícola",
"Media Técnica Agropecuaria: Mención Producción Pecuaria",
"Media Técnica Agropecuaria: Mención Conservación de Alimentos",
"Media Técnica Agropecuaria: Mención Tecnología Pesquera",
"Media Técnica en Comercio y Servicios Administrativos: Mención Secretariado Ejecutivo",
"Media Técnica en Comercio y Servicios Administrativos: Mención Mercadeo",
"Media Técnica en Comercio y Servicios Administrativos: Mención Contabilidad",
"Media Técnica en Comercio y Servicios Administrativos: Mención Informática",
"Media Técnica en Comercio y Servicios Administrativos: Mención Turismo",
"Media Técnica en Comercio y Servicios Administrativos: Mención Seguros",
"Media Técnica en Comercio y Servicios Administrativos: Mención Administración Financiera",
"Media Técnica en Comercio y Servicios Administrativos: Mención Administración Pública",
"Media Técnica en Promoción y Servicio para la Salud: Mención Puericultura",
"Media Técnica en Promoción y Servicio para la Salud: Mención Administración de Servicios"
];

var nombres = [
"Antonio Ricaurte",
"Andrés Bello",
"Andrés Eloy Blanco",
"Andrés Narvarte",
"Antonio Guzmán Blanco",
"Arturo Uslar Pietri",
"Antonio José de Sucre",


"Carlos Soublette",

"Eleazar López Contreras",

"Francisco Linares Alcántara",

"Isaías Medina Angarita",

"José María Vargas",
"José María Carreño",
"José Gregorio Monagas",
"José Gregorio Varela",
"José Tadeo Monagas",
"José Antonio Páez",
"José Francisco Bermúdez",
"José Félix Ribas",
"Juan Bautista Arismendi",
"Juan Germán Roscio",
"Juan Crisóstomo Falcón",


"Luisa Cáceres Díaz de Arismendi",

"Manuel Piar",
"Manuela Saenz",
"Manuel Felipe de Tovar",
"Manuel Ezequiel Bruzual",
"Pablo Morillo",

"Rafael José Urdaneta Farías",
"Rómulo Gallegos",
"Rómulo Betancourt",

"Santiago Mariño",
"Simón Bolívar",
"Sebastián Francisco de Miranda Rodríguez",

"Nuestra Señora de Chiquinquirá",
"Nuestra Señora de la Candelaria",
"Nuestra Señora de Belén",
"Nuestra Señora del Pilar",
"Nuestra Señora de las Nieves",
"Nuestra Señora de la Divina Pastora",
"Nuestra Señora del Valle",
"Nuestra Señora de Guadalupe",
"Nuestra Señora del Carmen",
"Nuestra Señora de Coromoto",
"Nuestra Señora de la Consolacion"
];

var tipos = ['Liceo Bolivariano', 'Instituto Privado'];

var municipiosSucre = municipios.filter((element) => {return element.estado == "18"});

var parroquiasSucre = [];
municipiosSucre.forEach((element) =>{
	let mun = element;

	for(let i = 0, j = parroquias.length; i<j; i++){
		if(parroquias[i].municipio == element.codigo){
			parroquiasSucre.push(parroquias[i]);
		}
	}
});


var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var genLiceos = function(parroquias){

	let liceos = [];

	let autoCodigo = 0;
	parroquias.forEach((element) =>{

		for (let i = 0, vueltas = getRandomInt(1, 4); i<vueltas; i++){
			autoCodigo++;
			let nombre = nombres[getRandomInt(0, nombres.length)];
			let tipo = tipos[getRandomInt(0, tipos.length)];

			let liceo = {
				codigo: ""+autoCodigo,
				nombre: nombre,
				tipo: tipo,
				parroquia: element.codigo,
				menciones: []
			}

			for (let i = 0, j = getRandomInt(1, 4); i<j; i++){
				let repeat = true;
				let mencion = "";
				while(repeat){
					repeat = false;
					mencion = menciones[getRandomInt(0, menciones.length)];
					if(liceo.menciones.find((element) =>{element == mencion})){
						repeat = true;
					}

				}
				liceo.menciones.push(mencion);
			}

			liceos.push(liceo);
		}
	});
	console.log(liceos);
	return liceos;

}

var descargarObjeto = function(objeto,nombre){

	var obj = objeto;
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

	var a = document.createElement('a');
	a.href = 'data:' + data;
	a.download = ''+nombre+'.json';
	a.innerHTML = 'download JSON';
	a.click();

}