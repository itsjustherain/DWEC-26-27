// Constructor
// Si no se pasan argumentos o todos son 0, se usa la fecha y hora actuales.
// Convención: mes va de 1 a 12 (enero = 1)
function MiTiempo(anio, mes, dia, hora, minuto, segundo) {
    const sinDatos = arguments.length === 0 ||
        (anio == 0 && mes == 0 && dia == 0 && hora == 0 && minuto == 0 && segundo == 0);
    if (sinDatos) {
        const hoy = new Date();
        this.anio = hoy.getFullYear();
        this.mes = hoy.getMonth() + 1; // getMonth() va de 0 a 11
        this.dia = hoy.getDate();
        this.hora = hoy.getHours();
        this.minuto = hoy.getMinutes();
        this.segundo = hoy.getSeconds();
    } else {
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
    }
}

// Getters y setters
MiTiempo.prototype.getAnio = function () { return this.anio; };
MiTiempo.prototype.setAnio = function (anio) { this.anio = anio; };
MiTiempo.prototype.getMes = function () { return this.mes; };
MiTiempo.prototype.setMes = function (mes) { this.mes = mes; };
MiTiempo.prototype.getDia = function () { return this.dia; };
MiTiempo.prototype.setDia = function (dia) { this.dia = dia; };
MiTiempo.prototype.getHora = function () { return this.hora; };
MiTiempo.prototype.setHora = function (hora) { this.hora = hora; };
MiTiempo.prototype.getMinuto = function () { return this.minuto; };
MiTiempo.prototype.setMinuto = function (minuto) { this.minuto = minuto; };
MiTiempo.prototype.getSegundo = function () { return this.segundo; };
MiTiempo.prototype.setSegundo = function (segundo) { this.segundo = segundo; };

// Métodos pedidos
MiTiempo.prototype.esBisiesto = function () {
    return (this.anio % 4 === 0 && this.anio % 100 !== 0) || this.anio % 400 === 0;
};

MiTiempo.prototype.getFechaCompleta = function () {
    // padStart(2, "0") rellena con ceros por la izquierda hasta tener 2 cifras (5 -> "05")
    const dia = String(this.dia).padStart(2, "0");
    const mes = String(this.mes).padStart(2, "0");
    return `${dia}/${mes}/${this.anio}`;
};

MiTiempo.prototype.getHoraCompleta = function () {
    const hora = String(this.hora).padStart(2, "0");
    const minuto = String(this.minuto).padStart(2, "0");
    const segundo = String(this.segundo).padStart(2, "0");
    return `${hora}:${minuto}:${segundo}`;
};

MiTiempo.prototype.esMenor = function (otroTiempo) {
    // Convierto cada tiempo a un Date (el mes de Date va de 0 a 11, por eso el - 1)
    // y comparo sus milisegundos con getTime(), que sí son números
    const miFecha = new Date(this.anio, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo);
    const suFecha = new Date(otroTiempo.anio, otroTiempo.mes - 1, otroTiempo.dia, otroTiempo.hora, otroTiempo.minuto, otroTiempo.segundo);
    return miFecha.getTime() < suFecha.getTime();
};

MiTiempo.prototype.esMayor = function (otroTiempo) {
    const miFecha = new Date(this.anio, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo);
    const suFecha = new Date(otroTiempo.anio, otroTiempo.mes - 1, otroTiempo.dia, otroTiempo.hora, otroTiempo.minuto, otroTiempo.segundo);
    return miFecha.getTime() > suFecha.getTime();
};

MiTiempo.prototype.esIgual = function (otroTiempo) {
    const miFecha = new Date(this.anio, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo);
    const suFecha = new Date(otroTiempo.anio, otroTiempo.mes - 1, otroTiempo.dia, otroTiempo.hora, otroTiempo.minuto, otroTiempo.segundo);
    return miFecha.getTime() === suFecha.getTime();
}; 

// Suma la hora, minuto y segundo de otroTiempo a este objeto.
// Si la suma pasa de 24 horas, el día avanza (y también el mes y el año si hace falta).
MiTiempo.prototype.sumaHora = function (otroTiempo) {
    // Segundos que hay que sumar: la hora, minuto y segundo de otroTiempo pasados a segundos
    const segundosASumar = otroTiempo.hora * 3600 + otroTiempo.minuto * 60 + otroTiempo.segundo;

    // Date.UTC corrige solo los desbordamientos (más de 59 segundos, más de 24 horas, fin de mes...).
    // Uso UTC para que los cambios de hora de verano/invierno no afecten al resultado.
    const milisegundos = Date.UTC(this.anio, this.mes - 1, this.dia, this.hora, this.minuto, this.segundo + segundosASumar);
    const resultado = new Date(milisegundos);

    this.anio = resultado.getUTCFullYear();
    this.mes = resultado.getUTCMonth() + 1; // getUTCMonth() va de 0 a 11
    this.dia = resultado.getUTCDate();
    this.hora = resultado.getUTCHours();
    this.minuto = resultado.getUTCMinutes();
    this.segundo = resultado.getUTCSeconds();
};

/*
VERSIÓN ANTERIOR DE sumaHora (no avanzaba el día):
Pasaba todo a segundos, sumaba y volvía a repartir en hora, minuto y segundo.
Si la suma pasaba de 24 horas, la hora volvía a empezar en 0 pero el día no cambiaba.

MiTiempo.prototype.sumaHora = function (otroTiempo) {
    const misSegundos = this.hora * 3600 + this.minuto * 60 + this.segundo;
    const suSegundos = otroTiempo.hora * 3600 + otroTiempo.minuto * 60 + otroTiempo.segundo;
    const total = misSegundos + suSegundos;

    this.hora = Math.floor(total / 3600) % 24;
    this.minuto = Math.floor((total % 3600) / 60);
    this.segundo = total % 60;
};
*/

// EJEMPLOS DE USO
const t1 = new MiTiempo(2000, 1, 1, 0, 0, 0);
const t2 = new MiTiempo(0, 0, 0, 0, 0, 0);

console.log(t1.getAnio());
console.log(t2.getAnio());
console.log(t1.esBisiesto()); // true
console.log(t2.esBisiesto());

// Getters y setters
const t3 = new MiTiempo(2024, 5, 10, 8, 30, 45);
t3.setAnio(2025);
t3.setMes(12);
t3.setDia(25);
t3.setHora(9);
t3.setMinuto(5);
t3.setSegundo(3);
console.log(t3.getAnio(), t3.getMes(), t3.getDia(), t3.getHora(), t3.getMinuto(), t3.getSegundo()); // 2025 12 25 9 5 3

// getFechaCompleta y getHoraCompleta
console.log(t1.getFechaCompleta()); // 01/01/2000
console.log(t1.getHoraCompleta());  // 00:00:00
console.log(t3.getFechaCompleta()); // 25/12/2025
console.log(t3.getHoraCompleta());  // 09:05:03
console.log(t2.getFechaCompleta()); // la fecha de hoy
console.log(t2.getHoraCompleta());  // la hora de ahora

// esBisiesto
console.log(new MiTiempo(1900, 1, 1, 0, 0, 0).esBisiesto()); // false (divisible entre 100 y no entre 400)
console.log(new MiTiempo(2000, 1, 1, 0, 0, 0).esBisiesto()); // true (divisible entre 400)
console.log(new MiTiempo(2023, 1, 1, 0, 0, 0).esBisiesto()); // false
console.log(new MiTiempo(2024, 1, 1, 0, 0, 0).esBisiesto()); // true

// esMayor, esMenor y esIgual
const antes = new MiTiempo(2024, 5, 10, 8, 0, 0);
const despues = new MiTiempo(2024, 5, 10, 8, 0, 1);
const igualAAntes = new MiTiempo(2024, 5, 10, 8, 0, 0);
console.log(antes.esMenor(despues));      // true
console.log(antes.esMayor(despues));      // false
console.log(despues.esMayor(antes));      // true
console.log(despues.esMenor(antes));      // false
console.log(antes.esIgual(igualAAntes));  // true
console.log(antes.esIgual(despues));      // false

// sumaHora
const h1 = new MiTiempo(2024, 5, 10, 8, 30, 45);
h1.sumaHora(new MiTiempo(2024, 5, 10, 2, 45, 30));
console.log(h1.getHoraCompleta()); // 11:16:15

const h2 = new MiTiempo(2024, 5, 10, 0, 0, 50);
h2.sumaHora(new MiTiempo(2024, 5, 10, 0, 0, 20));
console.log(h2.getHoraCompleta()); // 00:01:10

// Pasa de 24 horas: el día avanza
const h3 = new MiTiempo(2024, 5, 10, 20, 0, 0);
h3.sumaHora(new MiTiempo(2024, 5, 10, 10, 0, 0));
console.log(h3.getFechaCompleta(), h3.getHoraCompleta()); // 11/05/2024 06:00:00

// Cambio de mes: 31 de mayo + 10 horas
const h4 = new MiTiempo(2024, 5, 31, 20, 0, 0);
h4.sumaHora(new MiTiempo(2024, 5, 10, 10, 0, 0));
console.log(h4.getFechaCompleta(), h4.getHoraCompleta()); // 01/06/2024 06:00:00

// Cambio de año: 31 de diciembre + 10 horas
const h5 = new MiTiempo(2024, 12, 31, 20, 0, 0);
h5.sumaHora(new MiTiempo(2024, 5, 10, 10, 0, 0));
console.log(h5.getFechaCompleta(), h5.getHoraCompleta()); // 01/01/2025 06:00:00

// Febrero de un año bisiesto: 28 de febrero de 2024 + 10 horas
const h6 = new MiTiempo(2024, 2, 28, 20, 0, 0);
h6.sumaHora(new MiTiempo(2024, 5, 10, 10, 0, 0));
console.log(h6.getFechaCompleta(), h6.getHoraCompleta()); // 29/02/2024 06:00:00
