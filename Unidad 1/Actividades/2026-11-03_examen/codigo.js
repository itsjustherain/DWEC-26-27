function esFloat(n) {
  return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n) && !Number.isInteger(n);
}

class producto{
    constructor(nombre,precioCompra,precioVenta){
        this.nombre = nombre;
        if(!ComprobarPrecio.esFloat(precioCompra))
            throw new ComprobarPrecio("ERROR: El precio de compra no es un número real")
        if(!ComprobarPrecio.esFloat(precioVenta))
            throw new ComprobarPrecio("ERROR: El precio de venta no es un número real")

        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
    }
    getNombre(){
        return this.nombre;
    }
    setNombre(nombre){
        this.nombre = nombre;
    }
    toString(){
        return `${this.nombre}   ${this.precioCompra}   ${this.precioVenta}`;
    }
}

class productoUnidades extends producto{
    constructor(nombre,precioCompra,precioVenta,numUnidades){
        super(nombre,precioCompra,precioVenta);
        this.numUnidades = numUnidades;
    }
    getUnidades(){
        return this.numUnidades;
    }
    setUnidades(numUnidades){
        this.numUnidades = numUnidades;
    }
    toString(){
        return `${this.numUnidades}   ${super.toString()}`;
    }
}

class productoCantidad extends producto{
    constructor(nombre,precioCompra,precioVenta,numUnidades,magnitud){
        super(nombre,precioCompra,precioVenta);
        this.numUnidades = numUnidades;
        this.magnitud = magnitud;
    }
    getUnidades(){
        return this.numUnidades;
    }
    setUnidades(numUnidades){
        this.numUnidades = numUnidades;
    }
    getMagnitud(){
        return this.magnitud;
    }
    setMagnitud(magnitud){
        this.numMagnitud = magnitud;
    }
    toString(){
        return `${this.numUnidades}${this.magnitud}   ${super.toString()}`;
    }
}

class almacen{
    constructor(){
        this.productos = []; //Array polimórfico
    }
    añadirProducto(producto){
        this.productos.push(producto);
    }
    inventario(){
        for(let p of this.productos){
            console.log(p.toString()); //Ligadura dinámica
        }
    }
}

class ComprobarPrecio extends Error{
    constructor(mensaje){
        super(mensaje);
    }

    static esFloat(n) {
        return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n) && !Number.isInteger(n);
    }
}

//EJEMPLO DE USO
try{
    let a = new almacen();
    a.añadirProducto(new productoUnidades("chicles",0.25,0.50,2500));
    a.añadirProducto(new productoCantidad("tomates",1.25,2.50,250.25,"Kg"));
    a.añadirProducto(new productoCantidad("lejía",0.75,1.25,200,"litros"));
    a.inventario();
}catch(error){
    console.log(error.message);
}