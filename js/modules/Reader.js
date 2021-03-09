class Reader {
  constructor() {
    this.patrones = {
      patron: /[\[]+\w+[\]]/gim,
      limpiar: /[\[\]]/g,
      saltos: /\n/g,
      separador: /\=/g
    };

    this.objeto = {};
  }

  depurarValor(clave, valor) {
    clave = clave.trim();
    valor = valor.trim();
    valor = valor.lenth > 0 && !isNaN(valor) ? Number(valor) : valor;

    return [clave, valor];
  }

  init(texto) {
    if (typeof texto !== "string") return this.objeto;

    const { patron, limpiar, saltos, separador } = this.patrones;
    const claves = texto.match(patron);
    const secciones = texto.split(patron);

    if (!Array.isArray(claves)) return this.objeto;
    if (!Array.isArray(secciones)) return this.objeto;

    // Aquí es donde justamente se procesa el archivo
    // en un objeto:
    secciones.forEach((elemento, key) => {
      if (elemento.trim().length > 0) {
        let lineas = elemento
          .split(saltos)
          .filter((elemento) => {
            return elemento.trim().length > 0;
          })
          .map((elemento) => {
            return elemento.split(separador);
          })
          .filter((array) => {
            return Array.isArray(array) && array.length > 1;
          });

        // Si key no es mayor que cero ignorará la sección no válida del archivo:
        if (Array.isArray(lineas) && key > 0) {
          let claveTemporal = claves[key - 1].replace(limpiar, "");
          const objeto = {};

          for (let [clave, valor] of lineas) {
            const [key, value] = this.depurarValor(clave, valor);
            objeto[key] = value;
          }

          // Se asigna una propiedad de tipo objeto al objeto:
          this.objeto[claveTemporal] = objeto;
        }
      }
    });

    return this.objeto;
  }
  textFile(file,callback){
  	fetch(file)
  		.then(res => res.text())
  		.then(callback);
  }
  jsonFile(file,callback){
  	fetch(file)
  		.then(res => res.json())
  		.then(callback);
  }
  initFile(file,callback){
  	this.textFile(file,data => {
  		const ini = this.init( data );
  		callback(ini);
  	});
  }
}

export { Reader };