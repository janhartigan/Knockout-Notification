/**
 * Knockout Notification plugin v1.0.0
 * (c) 2011 Jan Hartigan - http://www.janhartigan.com
 * License: dual (MIT, GPL)
 */
ko.bindingHandlers.notification = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var rawValue = valueAccessor(),
			//notification can be passed an object with properties 'message', 'duration', and 'callback', or it can be given just a string
			options = typeof rawValue == 'object' ? rawValue : {message: rawValue};
		
		//init the timer property
		options.message.notificationTimer = 0;
		options.message.lastMessage = options.message();
	},
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var rawValue = valueAccessor(),
			//notification can be passed an object with properties 'message', 'duration', and 'callback', or it can be given just a string
			options = typeof rawValue == 'object' ? rawValue : {message: rawValue},
			message = ko.utils.unwrapObservable(options.message),
			duration = ko.utils.unwrapObservable(options.duration) || 5000, //5 seconds is default fade out
			callback = options.callback || function() {}, //default is a noop function
			fadeoutDuration = ko.utils.unwrapObservable(options.fadeoutDuration) || 200, //default is 200 ms
			hide = ko.utils.unwrapObservable(options.hide) || true, //default is to hide it
			jQueryExists = typeof jQuery != 'undefined';
		
		//set the element's text to the value of the message
		if (message === null || message === undefined)
			message = "";
		typeof element.innerText == "string" ? element.innerText = message 
											: element.textContent = message;
		
		if (message == '')
			return;
		
		//clear any outstanding timeouts
		clearTimeout(options.message.notificationTimer);
		
		//if there are any animations going on, stop them and show the element. otherwise just show the element
		if (jQueryExists)
			jQuery(element).stop(true, true).show();
		else
			element.style.display = '';
		
		if (hide) {
			//run a timeout to make it disappear
			options.message.notificationTimer = setTimeout(function() {
				//set the last message property
				options.lastMessage = options.message();
				
				if (jQueryExists) {
					//if jQuery is there, run the fadeOut
					jQuery(element).fadeOut(fadeoutDuration, function() {
						options.message('');
					});
				} else {
					element.style.display = 'none';
					options.message('');
				}
			}, duration);
		}
		
		//run the callback
		callback();
	}
};