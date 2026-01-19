$(document).ready(function(){
 $('#loginForm').submit(function(event){
       event.preventDefault();
       var email = $('#exampleInputEmail1').val();
       var contraseña = $('#exampleInputPassword1').val();
 if( email === 'alejandro@google.com' && contraseña === '1966'){
    window.location.href = 'Menuprincipal.html';
    alert('Inicio de sesión correcto. Redirigiendo');}
    else {
        alert('Usuario o contraseña inválida. Inténtelo de nuevo');
    }
 }
 )
 })    

