


/*
 * @version    2.1.1
 * @date       2016-07-14
 * @stability  3 - Stable
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */



!function(exports, Object) {
	var hasOwn = Object.prototype.hasOwnProperty
	, pointerCache = {}

	exports.clone = clone
	exports.merge = merge
	exports.pointer = pointer
	exports.mergePatch = mergePatch

	/**
	 * JSON Pointer
	 * @see https://tools.ietf.org/html/rfc6901
	 */

	function pointerSplit(path) {
		var arr = pointerCache[path] = path.split("/")
		, len = arr.length
		for (; --len; ) {
			arr[len] = arr[len].replace(/~1/g, "/").replace(/~0/g, "~")
		}
		return arr
	}




	function pointer(_obj, _path, value) {
		var obj = _obj
		if (_path) {
			for (
				var key
				, path = pointerCache[_path] || pointerSplit(_path)
				, _set = arguments.length > 2
				, i = 1
				, len = path.length
				; obj && i < len
				; ) {
				key = path[i++]
				if (_set) {
					if (i == len) {
						// Reuse _set to keep existing value
						_set = obj[key]
						obj[key] = value
						return _set
					}
					if (!obj[key] || typeof obj[key] != "object") {
						obj[key] = {}
					}
				}
				obj = obj[key]
			}
		}
		return obj
	}

	/**
	 * JSON Merge Patch
	 * @see https://tools.ietf.org/html/rfc7396
	 */

	function mergePatch(target, patch, changed, pointer) {
		var undef, key, val, len, nextPointer
		if (isObject(patch)) {
			if (!pointer) {
				pointer = ""
			}
			if (!isObject(target)) {
				target = {}
			}
			for (key in patch) if (
				undef !== (val = patch[key]) &&
				hasOwn.call(patch, key) &&
				(
					undef == val ?
					undef !== target[key] && delete target[key] :
					target[key] !== val
				)
			) {
				nextPointer = pointer + "/" + key.replace(/~/g, "~0").replace(/\//g, "~1")
				len = changed && isObject(target[key]) && changed.length
				if (undef != val) {
					target[key] = mergePatch(target[key], val, changed, nextPointer)
				}
				if (len === false || changed && len != changed.length) {
					changed.push(nextPointer)
				}
			}
		} else {
			target = patch
		}
		return target
	}

	function merge(_target) {
		for (var key, source, target = _target, a = arguments, len = a.length, i = 1; i < len; ) {
			source = a[i++]
			for (key in source) if (hasOwn.call(source, key)) {
				target[key] = source[key]
			}
		}
		return target
	}

	function clone(obj) {
		var temp, key
		if (obj && typeof obj == "object") {
			// new Date().constructor() returns a string
			temp = obj instanceof Date ? new Date(+obj) :
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


