
 $(document).ready(function(){
	
          
            $('#slideshow').cycle({
                fx:      'fade',
                timeout:  10,
                autostop: 1,
                end: function() {
					
                    $("#slideshow").fadeOut('slow', function(){
						$("#history").fadeIn('slow');
						$("#history2").fadeIn('slow');
						$("#history3").fadeIn('slow');
						var history = setTimeout(function() {
							
							$("#jsapp").show('slow');
					
							
							$("#history").hide();
							$("#history2").hide();
							$("#history3").hide();
						},500);
			
						});	
                }
            });
			
			 var ocupado = 0;
var pausa = null;
 
//Cuando se pasa por encima del icono
$('#caucho_pj').mouseover(function (){
if(pausa) clearTimeout(pausa);
if (ocupado == 0){
ocupado = 1;
$('.tooltip').css({
//Aparece (ya que estaba en display none)
top: 0,
display: 'block',
opacity: 0
}).animate({
//Sube 20px y pasa a ser opaco
top: '-=' + '20px',
opacity: 1
}, 'normal',
function (){
ocupado = 0;
});
}
});
//Cuando sale de la zona del icono
$('#caucho_pj').mouseout(function (){
 
pausa = setTimeout(function () {
pausa = null;
if (ocupado == 0){
ocupado = 1;
$('.tooltip').css({
opacity: 1
}).animate({
top: '-=' + '50px',
opacity: 0
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
display: 'none'
});
ocupado = 0;
}
}, 500)
});
 
      });
