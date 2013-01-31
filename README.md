Are you ever in need of adding events to non DOM objects in a JavaScript solution. This library attempts to very simply make that posible.

### Properties

* `_eventMap` - Holds all references to event types, callbacks, contexts and configurations.

### Methods

* `on` - Attaches an event to the object.
* `off` - Removes an event to the object.
* `has` - Checks to see if an event is registered to this object with the passed type.
* `trigger` - Fires the passed event type on an object.

### Usage

	var item = Object.create(Events,{});
	item.on("customEvent",function(){
		// do something
	},this);
	item.has("customEvent"); // true
	item.trigger("customEvent");
	item.off("customEvent");