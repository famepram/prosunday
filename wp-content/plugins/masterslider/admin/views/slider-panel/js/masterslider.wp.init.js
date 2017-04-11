/**
 * Master Slider WordPress Admin Panel Error Cache
 */
;(function($){

	var errorMsgs = [],
	timeoutDelay = 5000; // 5 sec

	window.onerror = function(message, url, line){
		errorMsgs.push({
			message: message,
			url: '<a href="' + url + '" target="_blank">' + url + '</a>',
			line: line
		});
	};

	$(document).ready(function(){

		var support_txt = 'please contact your theme author.',
			troubleshooting_txt = 'Usually it caused by a plugin conflict please disable all other plugins and refresh this page. If the problem remains change your theme to another one and check it again.<br>If you still receive this message '

		if ( __MS.is_actived ){
			support_txt = 'you can start a thread in <a href="http://support.averta.net/envato/support/" target="_blank">Averta support forum</a>, we will check it as soon as possible.';
		}


		window._msp_init_timeout = setTimeout(function(){
			
			// generate error content
			var cont = $('#panelLoading'),
				content;
			cont.html('');

			if ( errorMsgs.length === 0 ){
				content = '<p> It seems an error occurred while initializing slider, please check the browser console for any probable error messages. </p> <hr> <h3>Troubleshooting</h3> <p>'+ troubleshooting_txt + support_txt +'</p>'; 
			} else {
				content = '<p> It seems an error occurred while initializing slider, error message(s): </p> <ul>';

				for ( var i=0,l=errorMsgs.length; i!==l; i++ ){
					content += '<li> <p><strong style="color:red;">' + errorMsgs[i].message + '</strong><br><strong>File:</strong> ' + errorMsgs[i].url + ' <br><strong>line:</strong> ' + errorMsgs[i].line + '</p></li>'; 
				}

				content += '<ul><hr> <h3>Troubleshooting</h3> <p>'+ troubleshooting_txt + support_txt +'</p>'; 
			}

			cont.html(content);

		}, timeoutDelay);

	});
})(jQuery);