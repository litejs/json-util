


/**
 * @version    0.0.1
 * @date       2014-12-05
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

	function mergePatch(target, patch, changed, _path, _key, _val, _nextPath) {
		if (!_path) _path = ""

		if (isObject(patch)) {
			if (!isObject(target)) {
				target = {}
				if (changed) changed.push(_path)
			}
			for (_key in patch) if (target[_key] !== patch[_key] && hasOwn.call(patch, _key)) {
				_val = patch[_key]
				_nextPath = _path + "/" + _key.replace(/~/g, "~0").replace(/\//g, "~1")
				//NOTE: null == undefined
				if (_val == null) {
					if (hasOwn.call(target, _key)) {
						delete target[_key]
						if (changed) changed.push(_nextPath)
					}
				} else {
					target[_key] = mergePatch(target[_key], _val, changed, _nextPath)
				}
			}
		} else {
			target = patch
			if (changed) changed.push(_path)
		}
		return target
	}

}(JSON, Object)


