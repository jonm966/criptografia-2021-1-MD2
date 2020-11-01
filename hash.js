const S = require('./S');

const hash = mensaje => {
  //Conversion de mensaje a ASCII
  const bytesMensaje = [ ...mensaje ].map( caracter => caracter.charCodeAt(0) );
  //Padding inicial
  const mensajePadding = padding(bytesMensaje);
  //Checksum
  const mensajeChecksum = checksum(mensajePadding);
  //Hash
  const X = Array(48).fill(0);

  for( let i = 0; i < mensajeChecksum.length / 16; i++){

    for( let j = 0; j < 16; j++){
      X[ j + 16 ] = mensajeChecksum[ 16 * i + j ];
      X[ j + 32 ] = X[ j + 16 ] ^ X[j];
    }

    let t = 0;

    for(let j = 0; j < 18; j++){

      for( let k = 0; k < 48; k++){
        
        t = X[k] ^ S[t];
        X[k] = t;
      }

      t = (t + j) % 256;  
    }

  }
  
  const digerido = X.slice(0, 16); //Primeros 16 bytes
  //Conversión a hexadecimal e impresión
  console.log( digerido.map( valorAscii => parseHex( valorAscii.toString(16) ) ).join('') );

};

const padding = bytesMensaje => {
  const bytesFaltantes = 16 - (bytesMensaje.length % 16);
  //Concatenamos bytes del mensaje con n bytes faltantes de valor n
  return bytesMensaje.concat( Array(bytesFaltantes).fill(bytesFaltantes) )
};

const checksum = mensajePadding => {
  //Inicializando arreglo C con 16 ceros
  const C = Array(16).fill(0);
  let L = 0;
  let c;

  for( let i = 0; i < mensajePadding.length / 16; i++ ){
    for( let j = 0; j < 16; j++){
      c = mensajePadding[ 16 * i + j];
      C[j] = C[j] ^ S[ c ^ L ];
      L = C[j];
    }
  }

  return mensajePadding.concat(C);
};

//Esta función se encarga de agregar un cero si el valor hexadecimal es de un dígito.
const parseHex = hex => hex.length == 2 ? hex : '0' + hex;

module.exports = hash;