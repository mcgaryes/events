(function() {

	"use strict";

	/**
	 * Reference to 'window'
	 * @property root
	 * @type Object
	 * @private
	 */
	var root = this;

	/**
	 * @main Events
	 */
	root.Events = {

		/**
		 * Holds all references to event types, callbacks, contexts and configurations.
		 * @property _eventMap
		 * @type Object
		 * @private
		 */
		_eventMap: undefined,

		/**
		 * Checks to see if an event is registered to this object with the passed type.
		 * @method has
		 * @param {String} type
		 * @param {String} type
		 */
		has: function(type, callbackRef) {
			if(type === undefined || this._eventMap === undefined || this._eventMap[type] === undefined) {
				return false;
			}
			return true;
		},

		/**
		 * Removes an event to the object.
		 * @method off
		 * @param {String} type
		 * @param {Function} callback
		 */
		off: function(type, callbackRef) {
			if(this.has(type)) {
				for(var i = 0; i < this._eventMap[type].length; i++) {
					var item = this._eventMap[type][i];
					if(callbackRef) {
						if(item.callback === callbackRef) {
							this._eventMap[type] = this._eventMap[type].splice(i, 0);
						}
					} else {
						if(item.configurable === true) {
							this._eventMap[type] = this._eventMap[type].splice(i, 0);
						}
					}
				}
			} else {
				delete this._eventMap;
			}
		},

		/**
		 * Attaches an event to the object.
		 * @method on
		 * @param {String} type
		 * @param {Function} callback
		 * @param {Object} context
		 * @param {Boolean} configurable Whether or not you should be able to remove this listener without passing its callback reference
		 */
		on: function(type, callback, context, configurable) {
			if(this._eventMap === undefined) {
				this._eventMap = {};
			}
			if(this._eventMap[type] === undefined) {
				this._eventMap[type] = [];
			}
			if(configurable === undefined) {
				configurable = true;
			}
			this._eventMap[type].push({
				callback: callback,
				context: context,
				configurable: configurable
			});
		},

		/**
		 * Removes an event from the object.
		 * @method off
		 * @param {String} type
		 * @param {Function} callback
		 */
		trigger: function(type) {
			if(!this.has(type)) {
				return;
			}
			for(var i = 0; i < this._eventMap[type].length; i++) {
				var item = this._eventMap[type][i];
				if(item.callback !== null) {
					item.callback.call(item.context, {
						type: type,
						target: this,
						isConfigurable: item.configurable
					});
				}
			}
		}
	};

}).call(this);