# KnockoutNotification

An extension to KnockoutJS that lets you manage form messages and notifications that would be displayed, for example, when a form is submitted.

## examples

Consider the following example:

<pre>
&lt;span class="message" data-bind="notification: statusMessage"&gt;&lt;/span&gt;
</pre>

In this case, you are using the extension in its simplest form by simply passing a string observable to the "notification" data-bind attribute. In your code, you would just have to do:

<pre>
xxx.viewModel.statusMessage('Saving...');
</pre>

And now "Saving..." will show up in <em>span.message</em> and fade it out after 5 seconds (which is the default duration).

Now let's look at a more complex example passing in an object of properties (using message [required], duration, and hide):

<pre>
&lt;span data-bind="notification: {message: message, duration: 1000, hide: keepAlive }"&gt;&lt;/span&gt;
</pre>

And some JS to accompany it:

<pre>
var viewModel = {
		message: ko.observable(''),
		keepAlive: ko.observable(true)
	};
	
ko.applyBindings(viewModel);

viewModel.message('test'); //'test' will show up in our span, but it won't fade away because keepAlive is true
</pre>

Then we could later run:

<pre>
viewModel.keepAlive(false);
viewModel.message('this will fade out'); //now that keepAlive is false, the message will fade out after 1000 milliseconds (as we chose above with the "duration" property)
</pre>

<em>For a full list of options and callback methods when passing in an object, see below (keep in mind that you can always just pass in a string observable and it will work with the default options)</em>..

## options

These are the settings and callback functions available for the extension (all properties can also be KO observables):

<pre>
{
    		
	/* The message that you want to display
	 * 
	 * @type String
	 */
	message: '', [no default value] [required]
	
	/* The duration (in millseconds) that you want the notification to appear (only matters if hide is true)
	 * 
	 * @type Int
	 */
	duration: 5000,
	
	/* The duration (in millseconds) of the fade out (only matters if fade is true)
	 * 
	 * @type Int
	 */
	fadeoutDuration: 200,
	
	/* Setting this to true makes sure the notification disappears
	 * 
	 * @type Bool
	 */
	hide: true,
	
	/* Setting this to true makes sure the notification fades out (only matters if hide is true)
     * 
	 * @type Bool
	 */
	fade: true,
	
	/* The callback function to be called after the item is either gone or after it is created (if hide is false)
	 * 
	 * @type Function
	 */
	callback: function() {}
}
</pre>