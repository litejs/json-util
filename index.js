


/*
 * @version    1.0.3
 * @date       2015-05-27
 * @stability  3 - Stable
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */



!function(exports, Object) {
	var hasOwn = Object.prototype.hasOwnProperty

	exports.clone = clone
	exports.pointer = pointer
	exports.mergePatch = mergePatch

	/**
	 * JSON Pointer
	 * @see https://tools.ietf.org/html/rfc6901
	 */

	function pointer(obj, path, value) {
		if (path) {
			path = path.split("/")
			for (
				var _key
				, _set = arguments.length > 2
				, i = 1
				, len = path.length
				; obj && i < len
				; ) {
				_key = path[i++].replace(/~1/g, "/").replace(/~0/g, "~")
				if (_set) {
					if (i == len) {
						// Reuse _set to keep existing value
						_set = obj[_key]
						obj[_key] = value
						return _set
					}
					if (!obj[_key] || typeof obj[_key] != "object") {
						obj[_key] = {}
					}
				}
				obj = obj[_key]
			}
		}
		return obj
	}

	/**
	 * JSON Merge Patch
	 * @see https://tools.ietf.org/html/rfc7396
	 */

	function mergePatch(target, patch, changed, _path, _key, _val, _nextPath, _undef, _len) {
		if (isObject(patch)) {
			if (!_path) {
				_path = ""
			}
			if (!isObject(target)) {
				target = {}
			}
			for (_key in patch) if (
				_undef !== (_val = patch[_key]) &&
				hasOwn.call(patch, _key) &&
				(
					_undef == _val ?
					_undef !== target[_key] && delete target[_key] :
					target[_key] !== _val
				)
			) {
				_nextPath = _path + "/" + _key.replace(/~/g, "~0").replace(/\//g, "~1")
				_len = changed && isObject(target[_key]) && changed.length
				if (_undef != _val) {
					target[_key] = mergePatch(target[_key], _val, changed, _nextPath)
				}
				if (_len === false || _len != changed.length) {
					changed.push(_nextPath)
				}
			}
		} else {
			target = patch
		}
		return target
	}

	function clone(obj, temp, key) {
		if (obj && typeof obj == "object") {
			// new Date().constructor() returns a string
			temp = obj instanceof Date ? new Date :
				obj instanceof RegExp ? new RegExp(obj.source, (obj.ignoreCase ? "i" : "") + (obj.global ? "g" : "") + (obj.multiline ? "m" : "")) :
				obj.constructor()
			for (key in obj) if (hasOwn.call(obj, key)) {
				temp[key] = clone(obj[key])
			}
			obj = temp
		}
		return obj
	}

	function isObject(obj) {
		return !!obj && obj.constructor == Object
	}

// `this` refers to the `window` in browser and to the `exports` in Node.js.
}(this.JSON || this, Object)


