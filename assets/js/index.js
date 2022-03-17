//recepcion de argumentos ingresados por linea de comandos
const argumentos = process.argv.slice(2)

//almacenamiento de argumentos en variables
var nombre = String(argumentos[0])
var extension = String(argumentos[1])
var indicador = String(argumentos[2])
var cantidad = String(argumentos[3])

// test data argumentos
// console.log(nombre)
// console.log(extension)
// console.log(indicador)
// console.log(cantidad)

//definiendo nombre de archivo
var archivoCorto = `${nombre}.${extension}`

//nombre de archivo segun divisa/indicador
var archivo = `${nombre}${indicador}.${extension}`

//url API
let urlAPI = 'https://mindicador.cl/api'

//consulta por tipo de indicador
let urlApiIndicador = `https://mindicador.cl/api/${indicador}`

//consulta por tipo de indicador y fecha especificada
let urlApiIndicadorFecha = `https://mindicador.cl/api/${indicador}/${fecha}`


//Obtencion de la API
const https = require('https');

//consulta metodo get a la API
https.get(`${urlAPI}`, (resp) => {
    //almacenando la data
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        
        let jsonData = JSON.parse(data);

        //llamado a la funcion
        registroCotizacion(jsonData)

        //console.log('Body:', JSON.parse(data));
        //console.log(jsonData);
        //console.log(jsonData.dolar);
        //console.log(jsonData.dolar.codigo);
        //console.log(jsonData.dolar.valor);
        //console.log(jsonData.dolar.fecha);

        
    })
})
    .on('error', (err) => {
        console.log('Error: ' + err.message); // Impresión por consola del error
    });

//funcion para crear cotizacion y mostrar mensaje por consola
const registroCotizacion = (jsonData) => {

    //opcion 1 : fecha de la API
    let fechaAPI = new Date(jsonData.dolar.fecha)

    //opcion 1 : fecha actual
    let fecha = new Date()

    //calculo de total divisa
    let total = (cantidad / jsonData.dolar.valor).toFixed(2)

    //definiendo el mensaje
    let contenido = `
    A la fecha: ${fecha}
    Fue realizada cotización con los siguientes datos:
    Cantidad de pesos a convertir: ${cantidad} pesos
    Convertido a "${indicador}" da un total de:
    $ ${total}`

    //crear archivo
    const fs = require('fs')

    //leer el archivo
    fs.readFile(`${archivo}`, 'utf8',
        (err, data) => {
            //nueva insercion
            fs.writeFile(`${archivo}`, data +
                `
                ${contenido}`, 'utf8',
                () => {
                    //mostrar por consola la nueva insercion
                    console.log(contenido)
                }
            )
        }
    )
};

