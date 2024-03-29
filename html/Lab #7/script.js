


document.addEventListener('DOMContentLoaded', function () {
    const formatoDropdownItems = document.querySelectorAll('.dropdown-item');
    const formatoSeleccionadoSpan = document.getElementById('formatoSeleccionado');
    const formatoButton = document.getElementById('formato');

    formatoSeleccionadoSpan.textContent = formatoDropdownItems[0].textContent;

    formatoDropdownItems.forEach(function (item) {
        item.addEventListener('click', function () {
            formatoSeleccionadoSpan.textContent = item.textContent;
            formatoButton.textContent = item.textContent;
            // Aquí puedes agregar lógica adicional para modificar el campo de texto
        });
    });
});
