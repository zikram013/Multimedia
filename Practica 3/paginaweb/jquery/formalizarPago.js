var nombre;
var primerApellido;
var segundoApellido;
var correo;
var opcionCamaSupletoria = document.getElementsByName("camaSupletoria");
var seleccionarOpcion=false;
var telefono;
var dni;
var metodoPago;
var obligatorio=true;
var opcionPension;
var seleccionarOpcionPension=false;
var precioInicial=150;
var precioCamaSupletoria=20;
var precioPensionCompleta=100;
var precioPensionDesayuno=50;
var precioTotal;

function validar(){
	nombre= document.getElementById("nombre").value.trim();
	primerApellido=document.getElementById("primerApellido").value.trim();
	segundoApellido=document.getElementById("segundoApellido").value.trim();
	correo=document.getElementById("correo").value.trim();
	telefono=document.getElementById("telefono").value.trim();
	dni=document.getElementById("dni").value.trim();
	metodoPago=document.getElementById("metodoPago").selectedIndex;
	opcionPension=document.getElementsByName("pension");


	/*codigo del nombre*/
	if (nombre==""){
		errorNombre.style.color="red";
		document.getElementById("errorNombre").innerHTML="Nombre Obligatorio";
		obligatorio=false;
	}else{
		document.getElementById("errorNombre").innerHTML="";
	}

	/*codigo del apellido*/
	if(primerApellido==""){
		errorPrimerApellido.style.color="red";
		document.getElementById("errorPrimerApellido").innerHTML="Primer apellido obligatorio";
		obligatorio=false;
	}else{
		document.getElementById("errorPrimerApellido").innerHTML="";
	}

	if (segundoApellido==""){
		errorSegundoApellido.style.color="red";
		document.getElementById("errorSegundoApellido").innerHTML="Segundo apellido obligatorio";
		obligatorio=false;
	}else{
		document.getElementById("errorSegundoApellido").innerHTML="";
	}
	/*codigo del correo electronico*/
	if (correo==""){
		errorCorreo.style.color="red"
		document.getElementById("errorCorreo").innerHTML="Correo electronico obligatorio";
		obligatorio=false;
	}else if (correo.indexOf("@")==-1){
		document.getElementById("errorCorreo").innerHTML="Correo invalido";
	}else{
		document.getElementById("errorCorreo").innerHTML="";
	}

	/*codigo del numero de telefono*/
	var numTelefono=telefono.length;
	var primerValorTel=telefono.charAt(0);

	if(telefono==""){
		errorTelefono.style.color="red";
		document.getElementById("errorTelefono").innerHTML="Numero de telefono obligatorio";
		obligatorio=false;
	}else if (numTelefono==9){
		if (primerValorTel==9 || primerValorTel==6){
			document.getElementById("errorTelefono").innerHTML="";
		}else{
			document.getElementById("errorTelefono").innerHTML="El telefono debe empezar por 6 o por 9";
		}
	}else{
		document.getElementById("errorTelefono").innerHTML="EL telefono debe ser de 9 digitos";
	}

	/*Codigo del Dni*/
	var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

	if( !(/^\d{8}[A-Z]$/.test(dni)) ) {
  		document.getElementById("errorDni").innerHTML="";
	}else{
		errorDni.style.color="red";
		document.getElementById("errorDni").innerHTML="Introduzca un Dni valido";
		obligatorio=false;
	}
 
	if(dni.charAt(8) != letras[(dni.substring(0, 8))%23]) {
  		document.getElementById("errorDni").innerHTML="";
	}else{
		errorDni.style.color="red";
		document.getElementById("errorDni").innerHTML="Introduzca un Dni valido";
		obligatorio=false;
	}

	/*validacion de la cama supletoria*/
	for (var i=0; i<opcionCamaSupletoria.length; i++){
		if (opcionCamaSupletoria[0].checked){
			seleccionarOpcion = true;
			document.getElementById("errorCama").innerHTML="Extra de 20€";
			precioTotal=precioInicial + precioCamaSupletoria;
			break;
		}else if (opcionCamaSupletoria[1].checked){
			seleccionarOpcion=true;
			document.getElementById("errorCama").innerHTML="";
			precioTotal=precioInicial;
			break;
		}else{
			errorCama.style.color="red";
			document.getElementById("errorCama").innerHTML="Marque una casilla";
			obligatorio=false;
		}
	}
	
	/*validacion del metodo de pago*/
	if (metodoPago ==0){
		errorPago.style.color="red";
		document.getElementById("errorPago").innerHTML="Señale una opcion";
		obligatorio=false;
	}else{
		document.getElementById("errorPago").innerHTML="";
	}

	/*Validacion pension*/
	for (var j=0; j<opcionPension.length; j++){
		if(opcionPension[0].checked){
			seleccionarOpcionPension=true;
			document.getElementById("errorPension").innerHTML="Extra de 100€";
			precioTotal=precioTotal+precioPensionCompleta;
			break;
		}else if(opcionPension[1].checked){
			seleccionarOpcionPension=true;
			document.getElementById("errorPension").innerHTML="Extra de 50€";
			precioTotal=precioTotal+precioPensionDesayuno;
			break;
		}else{
			errorPension.style.color="red";
			document.getElementById("errorPension").innerHTML="Señale una opcion";
			obligatorio=false;
			break;
		}
	}

	if(obligatorio==true){
		document.getElementById("pagoTotal").innerHTML=precioTotal;
	}
}