/**
 * Knockout Notification plugin v1.1.0
 * (c) 2011 Jan Hartigan - http://www.janhartigan.com
 * License: dual (MIT, GPL)
 */
ko.bindingHandlers.notification = {
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var rawValue = valueAccessor(),
			//notification can be passed an object with properties 'message', 'duration', 'fadeoutDuration', 'hide', 'fade', and 'callback', or it can be given just a string
			options = typeof rawValue == 'object' ? rawValue : {message: rawValue},
			message = ko.utils.unwrapObservable(options.message),
			duration = options.duration !== undefined ? ko.utils.unwrapObservable(options.duration) : 5000, //5 seconds is default fade out
			fadeoutDuration = options.fadeoutDuration !== undefined ? ko.utils.unwrapObservable(options.fadeoutDuration) : 200, //default is 200 ms
			hide = options.hide !== undefined ? ko.utils.unwrapObservable(options.hide) : true, //default is to hide it
			fade = options.fade !== undefined ? ko.utils.unwrapObservable(options.fade) : true, //default is to fade it out in presence of jquery
            callback = options.callback !== undefined ? ko.utils.unwrapObservable(options.callback) : function() {},
			jQueryExists = typeof jQuery != 'undefined';

		//set the element's text to the value of the message
		if (message === null || message === undefined)
			message = "";

		element.innerHTML = message;

		//clear any outstanding timeouts
		clearTimeout(element.notificationTimer);

		if (message == '') {
			element.style.display = 'none';
			return;
		}

		//if there are any animations going on, stop them and show the element. otherwise just show the element
		if (jQueryExists)
			jQuery(element).stop(true, true).show();
		else
			element.style.display = '';

		if (hide) {
			//run a timeout to make it disappear
			element.notificationTimer = setTimeout(function() {
				//if jQuery is there, run the fadeOut, otherwise do old-timey js
				if (jQueryExists) {
					if (fade)
						jQuery(element).fadeOut(fadeoutDuration, function() {
                            options.message('');
                            callback();
                        });
					else {
						jQuery(element).hide();
						options.message('');
                        callback();
					}
				} else {
					element.style.display = 'none';
                    callback();
				}
			}, duration);
		} else {
            callback();
		}
	}
};