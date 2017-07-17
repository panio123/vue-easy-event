(function (root, factory) {
	if (typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if (typeof define === 'function' && define.amd)
		define("EventBus", [], factory);
	else if (typeof exports === 'object')
		exports.EventBus = factory();
	else
		root.EventBus = factory();
})(this, function () {
	var Events = {};
	var EventBus = {
		on: function (event, callback) {
			if (!callback && typeof callback !== 'function') {
				return;
			}
			var _events = Events;
			if (_events[event]) {
				if (EventBus.hasSameFun(event, callback) !== false) {
					return;
				}
				_events[event].push(callback);
			} else {
				_events[event] = [callback];
			}
		},
		once: function (event, callback) {
			if (!callback && typeof callback !== 'function') {
				return;
			}
			var called = false;
			var fn = function (data) {
				if (called === false) {
					callback(data);
				}
				called = true;
				EventBus.off(event, fn);
			};
			EventBus.on(event, fn);
		},
		trigger: function (event, data) {
			var _events = Events;
			var list = _events[event];
			var i = 0;
			if (list) {
				for (; i < list.length; i++) {
					list[i](data);
				}
			}
		},
		off: function (event, callback) {
			var index = EventBus.hasSameFun(event, callback);
			if (index !== false) {
				Events[event].splice(index, 1);
			}
		},
		hasSameFun: function (event, callback) {
			var _events = Events;
			var list = _events[event];
			var i = 0;
			if (list && list.length > 0) {
				for (; i < list.length; i++) {
					if (list[i] === callback) {
						return i;
					}
				}
			}
			return false;
		}
	};
	EventBus.install = function (Vue, options) {
		Vue.prototype.Eon = EventBus.on;
		Vue.prototype.Eonce = EventBus.once;
		Vue.prototype.Etrigger = EventBus.trigger;
		Vue.prototype.Eoff = EventBus.off;
	};
	if (this.Vue) Vue.use(EventBus);
	return EventBus;
});