// Constructor
// Si no se pasan argumentos o todos son 0, se usa la fecha y hora actuales.
// Convención: mm va de 1 a 12 (enero = 1)
function MiTiempo(aaaa, mm, dd, h, m, s) {
    const sinDatos = arguments.length === 0 ||
        (aaaa == 0 && mm == 0 && dd == 0 && h == 0 && m == 0 && s == 0);
    if (sinDatos) {
        const hoy = new Date();
        this.aaaa = hoy.getFullYear();
        this.mm = hoy.getMonth() + 1; // getMonth() va de 0 a 11
        this.dd = hoy.getDate();
        this.h = hoy.getHours();
        this.m = hoy.getMinutes();
        this.s = hoy.getSeconds();
    } else {
        this.aaaa = aaaa;
        this.mm = mm;
        this.dd = dd;
        this.h = h;
        this.m = m;
        this.s = s;
    }
}

// Getters y setters
MiTiempo.prototype.getAnio = function () { return this.aaaa; };
MiTiempo.prototype.setAnio = function (aaaa) { this.aaaa = aaaa; };
MiTiempo.prototype.getMes = function () { return this.mm; };
MiTiempo.prototype.setMes = function (mm) { this.mm = mm; };
MiTiempo.prototype.getDia = function () { return this.dd; };
MiTiempo.prototype.setDia = function (dd) { this.dd = dd; };
MiTiempo.prototype.getHora = function () { return this.h; };
MiTiempo.prototype.setHora = function (h) { this.h = h; };
MiTiempo.prototype.getMinutos = function () { return this.m; };
MiTiempo.prototype.setMinutos = function (m) { this.m = m; };
MiTiempo.prototype.getSegundos = function () { return this.s; };
MiTiempo.prototype.setSegundos = function (s) { this.s = s; };

// Métodos pedidos
MiTiempo.prototype.esBisiesto = function () {
    return (this.aaaa % 4 === 0 && this.aaaa % 100 !== 0) || this.aaaa % 400 === 0;
};

// PROBANDO, PROBANDO
const t1 = new MiTiempo(2000, 1, 1, 0, 0, 0);
const t2 = new MiTiempo(0, 0, 0, 0, 0, 0);

console.log(t1.getAnio());
console.log(t2.getAnio());
console.log(t1.esBisiesto()); // true
console.log(t2.esBisiesto());
