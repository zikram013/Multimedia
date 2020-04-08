var opciones;
var seleccionado;
var indiceBaja;
var indiceAlta;
var seleccion;
function mostrar(){
	opciones=document.getElementsByName("ofertas");
	seleccionado=false;

	for(var i=0; i<opciones.length; i++){
		if(opciones[0].checked){
			seleccionado=true;
			mostrarTemporadaBaja.style.left="0%";
			mostrarTemporadaAlta.style.left="-100%";
			showOffers.style.left="-100%";
		}else if (opciones[1].checked){
			seleccionado=true;
			mostrarTemporadaAlta.style.left="0%";
			mostrarTemporadaBaja.style.left="-100%";
			showOffers.style.left="-100%";
		}
		break;
	}
}

function temporadaBaja() {
	indiceBaja=document.getElementsByName("offersBaja");
	seleccion=false;

	for(var i=0; i<indiceBaja.length; i++){
		if(indiceBaja[0].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola";
			showOffers.style.left="0%";
		}else if(indiceBaja[1].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola2";
			showOffers.style.left="0%";
		}else if (indiceBaja[2].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola3";
			showOffers.style.left="0%";
		}else if (indiceBaja[3].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola4";
			showOffers.style.left="0%";
		}else if (indiceBaja[4].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola5";
			showOffers.style.left="0%";
		}else if (indiceBaja[5].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola6";
			showOffers.style.left="0%";
		}
	}
}

function temporadaAlta(){
	indiceAlta=document.getElementsByName("offersAlta");
	seleccion=false;

	for(var i=0; i<indiceAlta.length; i++){
		if(indiceAlta[0].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola";
			showOffers.style.left="0%";
		}else if(indiceAlta[1].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola2";
			showOffers.style.left="0%";
		}else if (indiceAlta[2].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola3";
			showOffers.style.left="0%";
		}else if (indiceAlta[3].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola4";
			showOffers.style.left="0%";
		}else if (indiceAlta[4].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola5";
			showOffers.style.left="0%";
		}else if (indiceAlta[5].checked){
			seleccion=true;
			document.getElementById("showSale").innerHTML="hola6";
			showOffers.style.left="0%";
		}
	}
}	