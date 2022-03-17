// Argumentos

a = "Cotizacion"    // argumento[0]
b = "txt"           // argumento[1]
c = "Dolar"         // argumento[2]
d = 50000          // argumento[3]

var exec = require('child_process').exec

var modulo = `node main.js ${a} ${b} ${c} ${d}`

// donde se ejecuta con node main.js
exec(`${modulo}`, function (err, stdout, stderr) {
  console.log(stdout)
})