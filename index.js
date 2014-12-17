


/**
 * @version    0.0.4
 * @date       2014-12-17
 * @stability  1 - Experimental
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */



!function(exports, Object) {
	var hasOwn = Object.prototype.hasOwnProperty

	exports.pointer = pointer
	exports.mergePatch = mergePatch

	function isObject(obj) {
		return obj && obj.constructor === Object
	}

	/**
	 * JSON Pointer
	 * @see http://tools.ietf.org/html/rfc6901
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
					obj[_key] = i == len ?
						value :
						obj[_key] && typeof obj[_key] == "object" ? obj[_key] : {}
				}
				obj = obj[_key]
			}
		}
		return obj
	}

	/**
	 * JSON Merge Patch
	 * @see http://tools.ietf.org/html/rfc7396
	 */

	function mergePatch(target, patch, changed, _path, _key, _nextPath) {
		if (!_path) _path = ""

		if (isObject(patch)) {
			if (!isObject(target)) {
				target = {}
			}
			for (_key in patch) if (target[_key] !== patch[_key] && hasOwn.call(patch, _key)) {
				_nextPath = _path + "/" + _key.replace(/~/g, "~0").replace(/\//g, "~1")
				if (changed) changed.push(_nextPath)
				//NOTE: null == undefined
				if (patch[_key] === null) {
					delete target[_key]
				} else if (patch[_key] != null) {
					target[_key] = mergePatch(target[_key], patch[_key], changed, _nextPath)
				}
			}
		} else {
			target = patch
		}
		return target
	}

}(JSON, Object)


