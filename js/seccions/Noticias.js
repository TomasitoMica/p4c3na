(function(window)
{
	function Noticias(nodo)
	{
		var self = this;
		var arrayMenu = objApp.getMenu();
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
			
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);			

		var holderNoticia = document.createElement('div');
			holderNoticia.className = 'holder-noticia-item';
			$(self.div).append(holderNoticia);
		
		var holderTituloNoticia = document.createElement('div');
			holderTituloNoticia.className = 'wrapper-titulo-noticia';
			$(holderTituloNoticia).css({'background' : 'url(img/general/menu/red_item.png) no-repeat'});
			$(holderTituloNoticia).css({'background-size' : '320px 68px'});
			$(holderNoticia).append(holderTituloNoticia);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-inicio';
			$(holderTituloNoticia).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#000'});

		if(objApp.isTouch())
			$(divVolver).bind('touchend' , doCloseNoticia);
		else
			$(divVolver).bind('click' , doCloseNoticia);
			
		var titulo = document.createElement('h1');
			$(titulo).text('NOTICIAS Y CURIOSIDADES');
			$(titulo).css({'color' : '#FFF'});
			$(holderTituloNoticia).append(titulo);
		
		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/noticias.png?ac=1';
			$(holderTituloNoticia).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});		
		
		var holderNoticiaContenido = document.createElement('div');
			holderNoticiaContenido.id = 'holder-noticia-contenido';
			$(holderNoticia).append(holderNoticiaContenido);
		

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-novedades.php',
			success : onCompleteXML,
			error : onErrorXML
		});	

		function onCompleteXML(xml)
		{
			if($(xml).find('xml').find('novedad').length != 0)
			{
				$(xml).find('xml').find('novedad').each(function(index, element) 
				{
					objItemNovedad = new ItemNovedad($(this), self, index);
					$(holderItems).append(objItemNovedad.div);
				});
			}
			else
				objApp.error('Actualmente no hay noticias');
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}
		self.showNoticia = function(nodo)
		{
			$(holderNoticiaContenido).empty();
			
			var imagen = new Image();
				imagen.width = 320;
				imagen.src = objApp.SERVER+'global/img/noticias/'+$(nodo).find('imagen').text();
				$(holderNoticiaContenido).append(imagen);
				$(imagen).css({'float' : 'left', 'display' : 'none'});
				$(imagen).load(function()
				{
					$(this).fadeIn();
				});
			
			var p = document.createElement('p');
				$(holderNoticiaContenido).append(p);
				$(p).text($(nodo).find('descripcion').text());		
			
			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderNoticia).delay(500).fadeIn(500);	
		}
		function doCloseNoticia()
		{
			objApp.error('close noticia');
			
			$(holderNoticia).fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
		}						
	}
	
	window.Noticias = Noticias;

})(window);