class CuentaCorriente {
    // Creo el constructor con parámetros
    constructor(nombre, numero, interes, saldo) {
        // Los nombres de los getters/setters NO pueden coincidir con los de las propiedades
        // (nombre, numero...), porque el setter se llamaría a sí mismo sin fin.
        // Por eso los accesores se llaman nombreCliente, numeroCuenta... y las propiedades nombre, numero...
        // (otra opción habitual es guardar las propiedades con guion bajo: this._nombre)
        this.nombre = nombre;
        this.numero = numero;
        this.interes = interes;
        this.saldo = saldo;
    }

    // GETTERS Y SETTERS: se usan como si fueran propiedades (cuenta.nombreCliente), sin paréntesis

    // Nombre del cliente
    get nombreCliente() {
        return this.nombre;
    }
    set nombreCliente(nombreNuevo) {
        this.nombre = nombreNuevo;
    }

    // Número de Cuenta
    get numeroCuenta() {
        return this.numero;
    }
    set numeroCuenta(numeroNuevo) {
        this.numero = numeroNuevo;
    }

    // Tipo de Interés
    get tipoInteres() {
        return this.interes;
    }
    set tipoInteres(nuevoInteres) {
        this.interes = nuevoInteres;
    }

    // Saldo
    get saldoCliente() {
        return this.saldo;
    }
    set saldoCliente(saldoNuevo) {
        this.saldo = saldoNuevo;
    }

    // MÉTODOS DE OPERACIÓN

    // Sumar dinero
    ingreso(cantidad) {
        if (cantidad < 0) {
            return false;
        }
        // += lee con el GET (saldoCliente) y actualiza con el SET automáticamente
        this.saldoCliente += cantidad;
        return true;
    }
    // Quitar dinero
    reintegro(cantidad) {
        // No se admiten cantidades negativas ni superiores al saldo
        if (cantidad < 0 || this.saldoCliente < cantidad) {
            return false;
        }
        // -= también pasa por el GET y el SET
        this.saldoCliente -= cantidad;
        return true;
    }
    // Creo el método transferencia, que recibe un objeto cuentaDestino y un importe
    transferencia(cuentaDestino, importe) {
        // Primero hacemos un reintegro en nuestra cuenta, por eso se usa this.reintegro
        if (this.reintegro(importe)) {
            // Si es true entramos aquí: el objeto cuentaDestino activa su método ingreso con el importe.
            // Por eso es importante recibir un objeto, para poder llamar a su método
            cuentaDestino.ingreso(importe);
            return true;
        }
        return false;
    }
}

// Creamos nuestro objeto cuentaCorriente
const cuentaCorriente = new CuentaCorriente();
// Le añado sus datos a través de los setters
cuentaCorriente.nombreCliente = "Paco";
cuentaCorriente.numeroCuenta = "ABC123";
cuentaCorriente.tipoInteres = 12.5;
cuentaCorriente.saldoCliente = 3500.76;

// Muestro los datos por pantalla
console.log(
    `Cuenta: Nombre: ${cuentaCorriente.nombreCliente} Número Cuenta: ${cuentaCorriente.numeroCuenta}
    Interés: ${cuentaCorriente.tipoInteres} Saldo = ${cuentaCorriente.saldoCliente}`,
);

// Hago un ingreso positivo para comprobar si funciona
cuentaCorriente.ingreso(1000);
console.log(
    `Saldo nuevo en la cuenta después del ingreso: ${cuentaCorriente.saldoCliente}`,
);
// Hago un ingreso negativo
console.log(`Ingreso negativo: ${cuentaCorriente.ingreso(-5000)}`);

// Hago un reintegro positivo
cuentaCorriente.reintegro(1000);
console.log(
    `Saldo nuevo en la cuenta después del reintegro: ${cuentaCorriente.saldoCliente}`,
);
// Hago un reintegro con un importe superior al saldo y otro negativo
console.log(`Reintegro superior al saldo: ${cuentaCorriente.reintegro(6000)}`);
console.log(`Reintegro negativo: ${cuentaCorriente.reintegro(-5000)}`);

// Creo el objeto cuentaDestino, en este caso he creado el objeto directamente
const cuentaDestino = new CuentaCorriente("Gema", "DEF456", 10, 0);

// Muestro por pantalla los datos de la cuentaDestino
console.log(
    `Cuenta destino antes del ingreso: Nombre: ${cuentaDestino.nombreCliente} Número Cuenta: ${cuentaDestino.numeroCuenta}
    Interés: ${cuentaDestino.tipoInteres} Saldo = ${cuentaDestino.saldoCliente}`,
);

// Pruebo a hacer una transferencia con todo correcto
cuentaCorriente.transferencia(cuentaDestino, 1000);

// Muestro los datos de la cuentaDestino después de la transferencia
console.log(
    `Cuenta destino después del ingreso: Nombre: ${cuentaDestino.nombreCliente} Número Cuenta: ${cuentaDestino.numeroCuenta}
    Interés: ${cuentaDestino.tipoInteres} Saldo = ${cuentaDestino.saldoCliente}`,
);

// Muestro el saldo de la cuentaCorriente después de la transferencia
console.log(
    `Saldo nuevo en la cuenta corriente después de la transferencia: ${cuentaCorriente.saldoCliente}`,
);

// Compruebo si falla al poner un importe mayor que el saldo
console.log(cuentaCorriente.transferencia(cuentaDestino, 8000));

// EJERCICIO 2
const cuenta1 = new CuentaCorriente("Cuenta1", "1111", 10, 1000);
const cuenta2 = new CuentaCorriente("Cuenta2", "2222", 10, 2000);
const cuenta3 = new CuentaCorriente("Cuenta3", "3333", 10, 3000);
const banco = [cuenta1, cuenta2, cuenta3];
// -Infinity para que funcione también con saldos negativos
let saldoMaximo = -Infinity;
// Creo un objeto nulo donde luego meto los valores de la cuenta con más saldo
let cuentaSaldoMaximo = null;
let saldoTotal = 0;
for (const cuenta of banco) {
    if (cuenta.saldoCliente > saldoMaximo) {
        saldoMaximo = cuenta.saldoCliente;
        cuentaSaldoMaximo = cuenta;
    }
    saldoTotal += cuenta.saldoCliente;
}
const totalCuentas = banco.length;

console.log(
    `Cuenta con más dinero: ${cuentaSaldoMaximo.nombreCliente} ${cuentaSaldoMaximo.numeroCuenta}
    ${cuentaSaldoMaximo.tipoInteres} ${cuentaSaldoMaximo.saldoCliente}`,
);
console.log(`El saldo total de las cuentas es: ${saldoTotal} repartido en ${totalCuentas} cuentas`);
const mediaBanco = saldoTotal / totalCuentas;
console.log(`La media de saldo en el banco es: ${mediaBanco}`);

/*
OTRA FORMA DE HACERLO
const ordenado = [...banco].sort((a, b) => b.saldo - a.saldo);
console.log(ordenado[0]);

OTRA MÁS (ordena el propio array, sin copiarlo)
banco.sort((a, b) => b.saldo - a.saldo);
console.log(banco[0]);
*/
