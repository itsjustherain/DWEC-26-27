//Intentando forzar un error
try{
    console.log(45%2);
    console.log(Math.PI%14.5);
}catch(err){
    console.log(err.message());
}

class ExcepcionesEnteros extends Error{
    constructor(msj){
        super(msj);
        this.name="Control de errores para número enteros";
        this.autor="Juan C. Jiménez";
    }
}

function moduloEnteros(a,b){
    if(!Number.isInteger(a)||!Number.isInteger(b))
        throw new ExcepcionesEnteros("ERROR: Para calcular el módulo se necesitan números enteros");
    else
        return a%b;
}

try{
    console.log(moduloEnteros(45,2));
    console.log(moduloEnteros(Math.PI,2));
}catch(error){    
    console.log(error.message);
    console.log("Excepcion arrojada por " + error.name + " - Autor: " + error.autor)
}
