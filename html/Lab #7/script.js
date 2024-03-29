let btnCalcular = document.getElementById('calcular');
let btnLimpiar = document.getElementById('limpiar');
let encabezado = document.getElementById('encabezado');
let longitud = document.getElementById('bytes');
let longitudBits = document.getElementById('longitudBits');
let digitosHexa = document.getElementById('digitosHex');
let campoEncabezado = document.getElementById('campoEncabezado');
let valor = document.getElementById('valor');
var formatoDropdownItems = document.querySelectorAll('.dropdown-item');
var formatoSeleccionadoSpan = document.getElementById('formatoSeleccionado');
var formatoButton = document.getElementById('formato');

document.addEventListener('DOMContentLoaded', function () {


    formatoSeleccionadoSpan.textContent = formatoDropdownItems[0].textContent;

    formatoDropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            formatoSeleccionadoSpan.textContent = item.textContent;
            formatoButton.textContent = item.textContent;
        });
    });
});
btnCalcular.addEventListener('click', function () {
    var valorEncabezado = calcular();
    if (valorEncabezado === '') {
        alert('No hay más datos por calcular');
    } else {
        var formClonado = document.querySelector('.pane').cloneNode(true);
        document.querySelector('.container').appendChild(formClonado);
        encabezado.value = valorEncabezado;
    }

});

btnLimpiar.addEventListener('click', function () {
    limpiar();
});
function calcular() {
    var formato = formatoSeleccionadoSpan.textContent;
    var valorEncabezado = encabezado.value;
    digitosHexa.textContent = parseInt(longitud.value) * 2;
    campoEncabezado.textContent = valorEncabezado.substring(0, digitosHexa.textContent);
    longitudBits.textContent = parseInt(longitud.value) * 8;

    if (formato === 'Texto ASCII') {
        valor.textContent = hexToAscii(campoEncabezado.textContent);
    } else if (formato === 'Número entero Hexadecimal') {
        valor.textContent = campoEncabezado.textContent;
    } else if (formato === 'Número entero Decimal') {
        valor.textContent = hexToInteger(campoEncabezado.textContent).join('');
    } else if (campoEncabezado.textContent.length <= 8 && formato === 'Dirección IPv4') {
        valor.textContent = hexToInteger(campoEncabezado.textContent).join('.');
    } else {
        alert('Formato no válido');
    }


    var subcadenaCalculada = campoEncabezado.textContent;
    return valorEncabezado.replace(subcadenaCalculada, '');
}
function limpiar() {
    encabezado.value = '';
    longitud.value = '';
    longitudBits.textContent = '0';
    digitosHexa.textContent = '0';
    campoEncabezado.textContent = '';
    valor.textContent = '';
}
function hexToAscii(hex) {
    var ascii = '';
    for (var i = 0; i < hex.length; i += 2) {
        var charCode = parseInt(hex.substr(i, 2), 16);
        ascii += String.fromCharCode(charCode);
    }
    return ascii;
}
function hexToInteger(hex) {
    var integers = [];
    for (var i = 0; i < hex.length; i += 2) {
        var hexPair = hex.substr(i, 2);
        var integerValue = parseInt(hexPair, 16);
        console.log(hexPair + integerValue);
        integers.push(integerValue);
    }
    return integers;
}
