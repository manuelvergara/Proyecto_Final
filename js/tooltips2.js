$(document).ready(function (){
	//Cuando se pasa por encima del icono
	$('#icono').mouseover(function (){
		$('#tooltip').fadeIn('normal');
	});
	//Cuando se pasa por encima del icono
	$('#content').mouseout(function (){
		$('#tooltip').fadeOut('normal');
	});
	//Cuando se pasa por encima del icono
	$('#content').click(function (){
		$('#tooltip').hidde('normal');
	});
});
