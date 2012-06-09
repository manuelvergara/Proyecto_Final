$(document).ready(function (){
	var ocupado = 0;
	//Cuando se pasa por encima del icono
	$('#icono').mouseover(function (){
		if (ocupado == 0){
			ocupado = 1;
			$('.tooltip').css({
				//Aparece (ya que estaba en display none)
				top: 0,
				display: 'block',
				opacity: 0,
			}).animate({
				//Sube 20px y pasa a ser opaco
				top: '-=20px',
				opacity: 1,
			}, 'normal',
			function (){
				ocupado = 0;
			});
		}
	});
	//Cuando sale de la zona del icono
	$('#icono').mouseout(function (){
		if (ocupado == 0){
			ocupado = 1;
			$('.tooltip').css({
				opacity: 1,
			}).animate({
				top: '-=50px',
				opacity: 0,
			}, 'slow',
			function(){
			$('.tooltip').css({
					display: 'none',
					top: 0
				});
				ocupado = 0;
			});
		}else {
			$('.tooltip').css({
				display: 'none',
			});
			ocupado = 0;
		}
	});

});
