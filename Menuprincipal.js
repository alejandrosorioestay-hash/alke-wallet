$(document).ready(function(){
    //Se agraga efecto con jquery para que las tarjetas de saldo y acciones aparezca lentamente.
    $('.card').hide().fadeIn(1000) 

    let saldoGuardado = localStorage.getItem('walletBalance') || 0; //Se usa localStorage para guardar datos de balance y los ingresados en Depósito. En este caso vemos si hay saldo guardado, si no lo hay se asume que es 0.

    $('#currentBalance').text('$' + parseFloat(saldoGuardado).toLocaleString('es-CL')); //se reemplaza en Balance el saldo guardado en pesos chilenos.
})


