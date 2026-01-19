
$(document).ready(function(){

    //Utilizando jquery se escucha evento submit del formulario de depósito. Al presionar el boton depositar, el valor ingresado como depósito en el form se captura como variable y lo transforma de string a float para poder realizar operaciones.

$('#depositForm').submit(function(e){
    e.preventDefault();

    let montoaDepositar = parseFloat($('#depositAmount').val());

//Para guardar los saldos de depósitos y trasnferencia se utiliza el localStorage, esto permite poder capturarlos, guardarlo en la clave walletBalance y utilizarlos para actualizar el saldo total en MenuPrincipal.

//En este bloque utiliza condicionales if y else para validar que el monto a depositar sea mayor a cero Si es menor a cero se pide ingresar un monto válido. Esto es escencial para evitar generar errores si el usuario ingresa un monto no válido. 



    if (montoaDepositar > 0) {

//Si montoAdepositar es mayor 0 se gestiona el nuevo saldo recuperando el saldo de menuprincipal almacenado en walletBalance a través de localStorage para declararlo como float en la variable saldoActual. Este saldo se suma con el montoaDepositar para obtener un saldo actualizado tras el depósito el que se guarda en la variable saldoNuevo. El nuevo saldo se guarda en walletBalance y se transforma a string para poder visualizarlo luego en la pantalla de MenuPrincipal.


    let saldoActual = parseFloat(localStorage.getItem('walletBalance')) || 0;

    let saldoNuevo = montoaDepositar + saldoActual;

    localStorage.setItem('walletBalance',saldoNuevo.toString());
   
   //Se decide utilizar JSON.parse para poder trabajar con el historial del localStorage como una lista, esto dado que localStorage solo guarda texto y en este caso se necesita guardar una lista a través del push para luego volver a transformarla en texto (stringify) y guardarla.
    let transacciones = JSON.parse(localStorage.getItem('historial')) || [];
    let nuevaTransaccion = {
        fecha: new Date().toLocaleDateString(),
        tipo: "Depósito",
        monto: "+ $" + montoaDepositar.toLocaleString('es-CL')
    };
transacciones.push(nuevaTransaccion);
localStorage.setItem('historial', JSON.stringify(transacciones));

    

    alert("Depósito realizado")
    window.location.href = "menuPrincipal.html";
    }
else {
    alert("Por favor ingrese un monto válido");
}
    
})
})