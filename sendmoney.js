$(document).ready(function () {

//para dar mayor animación y dinamismo se esconde el boton Enviar Dinero hasta seleccionar un contacto 
    $('#btnEnviarDinero').hide();

//Esta es la sección para agregar nuevos contactos a través del formulario que se despliega en la modal.    
//Se escucha el submit del form (jquery) para agregar nuevo contacto. Se guardan los datos de nombre, cbu, alias y banco del nuevo contacto ingresados en las variables declaradas con los mismos nombres, se captura su valor y eliminan espacios. Utilizamos condicional if para evitar campos vacíos.
    $('#formNuevoContacto').submit(function (evento) {
        evento.preventDefault();
        let nombre = $('#nuevoName').val().trim();
        let cbu = $('#nuevaCBU').val().trim();
        let alias = $('#nuevoAlias').val().trim();
        let banco = $('#nuevoBank').val().trim();

        if (nombre === "" || cbu === "" || alias === "" || banco === "") {
            alert("Por favor, completa todos los campos ")
            return;
        }
 //se crea una lista en .html con los datos del nuevo contacto.       
        let nuevoItem = `
          <li class="list-group-item">
            <div class="contact-info">
                <strong class = "contact-name">${nombre}</strong><br>
                    <small class="contactDetails">CBU: ${cbu}, Alias: ${alias}, Banco: ${banco}</small>
                </div>
                </li>`;
//se agrega el nuevo contacto al final de la lista en html (lo visual) a través del .append, se limpia y cierra la modal.
        $('#contactList').append(nuevoItem);
        this.reset();
        $('#modalContacto').modal('hide');
        alert("Contacto guardado con éxito")
        })

// Esta es la sección para la búsqueda de contactos. Se usa keyup (al levantar la tecla) ya que se está escribiendo texto y los caráctares aparecen al soltar la tecla. 


$('#searchContact').on('keyup', function() {

    // Se llevan los valores de texto ingresado a minúscula y los , si el el texto ingresado en la busqueda coincide con la información de la lista de contactos .toggle() muestra el contacto que contiene la coincidencia y esconde al que no la tiene.
    let valorBusqueda = $(this).val().toLowerCase();

    $('#contactList li').filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(valorBusqueda)> -1);
    });
});

//Seleccionar contactos 
//Sobre el evento click en uno de los elementos de la lista de contactos se le asigna la clase selected y se remueve del resto de los elementos de la lista. Esta acción permite que visualmente se destaque el contacto seleccionado y además a través del fadeIn() aparezca el boton para enviar dinero.

$('#contactList').on('click','.list-group-item', function(){
    $('.list-group-item').removeClass('selected');
    $(this).addClass('selected');
    $('#btnEnviarDinero').fadeIn();
});

//Al hacer click en el boton enviar dinero se obtiene a través de la clase selected se los datos del contacto seleccionado y mediante un prompt se solicita la cantidad de dinero a enviar a dicho contacto. El monto ingresado se trasnforma a float para actualizar el monto.

$('#btnEnviarDinero').click(function () {
    let nombreSeleccionado = $('.selected .contact-name').text();
    let montoEnviado = prompt("Indica la cantidad a enviar a" + nombreSeleccionado);
    let montoaEnviar = parseFloat(montoEnviado)
   
//A través de un condicional if se asegura que el valor ingresado (montoaEnviar) sea un número a través de isNaN (is Not a Number) y no sea menor igual a 0. En tales casos señala monto no válido.
   if(isNaN(montoaEnviar) || montoaEnviar <=0) {
    alert("Monto no válido.")
    return;
   }

//Si montoaEnviar es mayor que saldoActual, se muestra el mensaje saldo insuficiente. Si montoaEnviar es menor a saldoActual se gestiona el nuevo saldo recuperando el saldo de menuprincipal almacenado en walletBalance a través de localStorage para declararlo como float en la variable saldoActual. Este saldo se resta con el montoaEnviar para obtener un saldo actualizado tras el depósito el que se guarda en la variable saldoNuevo. El nuevo saldo se guarda en walletBalance y se transforma a string para poder visualizarlo luego en la pantalla de MenuPrincipal   
let saldoActual = parseFloat(localStorage.getItem('walletBalance')) || 0;

if(montoaEnviar > saldoActual){
    alert("Saldo insuficiente");
}
else{
    let saldoNuevo = saldoActual - montoaEnviar;
    localStorage.setItem('walletBalance', saldoNuevo);

   //Al igual en en el depósito,se decide utilizar JSON.parse para poder trabajar con el historial del localStorage como una lista, esto dado que localStorage solo guarda texto y en este caso se necesita guardar una lista a través del push para luego volver a transformarla en texto (stringify) y guardarla.
   //Solo se diferencia en los tipos de datos del objeto definido en nuevaTransacción

    let transacciones = JSON.parse(localStorage.getItem('historial')) || [];
    let nuevaTransaccion = {
        fecha: new Date().toLocaleDateString(),
        tipo: "Envío a " + nombreSeleccionado,
        monto: "- $" + montoaEnviar.toLocaleString('es-CL')
    };
    transacciones.push(nuevaTransaccion);
    localStorage.setItem('historial',JSON.stringify(transacciones));

    alert("Envío exitoso de dinero a " + nombreSeleccionado);
    window.location.href = "Menuprincipal.html"
}
});
});
