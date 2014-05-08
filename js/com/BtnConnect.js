(function(window)
{
	function BtnConnect(parent)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.id = 'btn-connect';
		
		var btnConnect = new Image();
			btnConnect.src =  'img/secciones/registro/btn-connect.jpg';
			btnConnect.width = 235;
			$(self.div).append(btnConnect);

		if(objApp.isTouch())
			$(self.div).bind('touchend' , doClick);
		else
			$(self.div).bind('click' , doClick);
			
		function doClick()
		{
			parent.doConnect();
		}	
		
	}
	
	window.BtnConnect = BtnConnect;

})(window);