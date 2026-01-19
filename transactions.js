$(document).ready(function () {
    //Se busca llamar los datos de historial guardados mediante JSON.parse desde depósito y tranferencia para transformarlos en lista y poder trabajar con. Se define la variable cuerpoTabla llamando al id de la tabla del html.
    let historial = JSON.parse(localStorage.getItem('historial')) || [];

    let cuerpoTabla = $('#ContenidoTabla');

    // se usa condicional para verificar si hay o no movimiento en la cuenta, si hay movimiento se agregan los datos a la tabla. Se utiliza reverse para agregar los movimientos recientes al principio de la tabla como nuevas filas.
    if (historial.length === 0) {
        cuerpoTabla.append('<tr><td colspan="3" class="text-center">No hay movimientos registrados</td></tr>');
    }
    else {
        historial.reverse().forEach(function (movimiento) {
            let fila = ` 
        <tr>
            <td>${movimiento.fecha}</td>
            <td>${movimiento.tipo}</td>
            <td>${movimiento.monto}</td>
        </tr>`;
            cuerpoTabla.append(fila);
        });
    }
});