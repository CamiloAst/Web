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

    btnCalcular.disabled = true;
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
    encabezado.disabled = true;
    encabezado.value = valorEncabezado;

    //document.querySelector('.pane').innerHTML += '<hr>';
    var formClonado = document.querySelector('.clones').cloneNode(true);
    document.querySelector('.pane').appendChild(formClonado);

    if (valorEncabezado === '') {
        alert('No hay más datos por calcular');
        encabezado.disabled = false;
    }

});
encabezado.addEventListener('input', function () {
    if (encabezado.value === '') {
        btnCalcular.disabled = true;
    } else {
        btnCalcular.disabled = false;
    }
});


btnLimpiar.addEventListener('click', function () {
    limpiar();
});
function calcular() {
    var formato = formatoSeleccionadoSpan.textContent;
    var valorEncabezado = encabezado.value.trim();
    digitosHexa.textContent = parseInt(longitud.value) * 2;
    campoEncabezado.textContent = valorEncabezado.substring(0, digitosHexa.textContent);
    longitudBits.textContent = parseInt(longitud.value) * 8;

    if (formato === 'Texto ASCII') {
        valor.textContent = hexToAscii(campoEncabezado.textContent);
    } else if (formato === 'Número entero Hexadecimal') {
        valor.textContent = campoEncabezado.textContent;
    } else if (formato === 'Número entero Decimal') {
        valor.textContent = parseInt(campoEncabezado.textContent, 16);
    } else if (campoEncabezado.textContent.length <= 8 && formato === 'Dirección IPv4') {
        valor.textContent = hexToIntegerIP(campoEncabezado.textContent).join('.');
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
    encabezado.disabled = false;
}
function hexToAscii(hex) {
    var ascii = '';
    for (var i = 0; i < hex.length; i += 2) {
        var charCode = parseInt(hex.substr(i, 2), 16);
        ascii += String.fromCharCode(charCode);
    }
    return ascii;
}
function hexToIntegerIP(hex) {
    var integers = [];
    for (var i = 0; i < hex.length; i += 2) {
        var hexPair = hex.substr(i, 2);
        var integerValue = parseInt(hexPair, 16);
        console.log(hexPair + integerValue);
        integers.push(integerValue);
    }
    return integers;
}
