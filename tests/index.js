


var undef, a, b, c
, util = require("..")
, obj =
	{ "foo": ["bar", "baz"]
	, "": 0
	, "a/b": 1
	, "c%d": 2
	, "e^f": 3
	, "g|h": 4
	, "i\\j": 5
	, "k\"l": 6
	, " ": 7
	, "m~n": 8
	}
, tests =
	[ {"a":"b"}         , {"a":"c"}                 , {"a":"c"}         , ["/a"]
	, {"a":"b"}         , {"b":"c"}                 , {"a":"b","b":"c"} , ["/b"]
	, {"a":"b"}         , {"a":null}                , {}                , ["/a"]
	, {"a":"b"}         , {"a":undef}               , {"a":"b"}         , []
	, {"a":"b"}         , {"b":undef}               , {"a":"b"}         , []
	, {"a":"b","b":"c"} , {"a":null}                , {"b":"c"}         , ["/a"]
	, {"a":["b"]}       , {"a":"c"}                 , {"a":"c"}         , ["/a"]
	, {"a":"c"}         , {"a":["b"]}               , {"a":["b"]}       , ["/a"]
	, {"a":{"b":"c"}}   , {"a":{"b":"d","c":null}}  , {"a":{"b":"d"}}   , ["/a/b", "/a"]
	, {"a":{"b":"c"}}   , {"a":{"b":"c"}}           , {"a":{"b":"c"}}   , []

	, {"a":{"b":0}}     , {"a":{"b":1}}             , {"a":{"b":1}}     , ["/a/b", "/a"]
	, {"a":{"b":0}}     , {"a":{"b":null}}          , {"a":{}}          , ["/a/b", "/a"]
	, {"a":{"b":1}}     , {"a":{"b":0}}             , {"a":{"b":0}}     , ["/a/b", "/a"]
	, {"a":{"b":1}}     , {"a":{"b":null}}          , {"a":{}}          , ["/a/b", "/a"]
	, {"a":{"b":null}}  , {"a":{"b":0}}             , {"a":{"b":0}}     , ["/a/b", "/a"]
	, {"a":{"b":null}}  , {"a":{"b":1}}             , {"a":{"b":1}}     , ["/a/b", "/a"]

	, {"a":[{"b":"c"}]} , {"a":[1]}                 , {"a":[1]}         , ["/a"]
	, ["a","b"]         , ["c","d"]                 , ["c","d"]         , []
	, {"a":"b"}         , ["c"]                     , ["c"]             , []
	, {"a":"foo"}       , null                      , null              , []
	, {"a":"foo"}       , "bar"                     , "bar"             , []
	, {"e":null}        , {"a":1}                   , {"e":null,"a":1}  , ["/a"]
	, {"e":null}        , {"e":null}                , {}                , ["/e"]
	, {"e":null}        , {"e":1}                   , {"e":1}           , ["/e"]
	, {"e":0}           , {"e":1}                   , {"e":1}           , ["/e"]
	, {"e":1}           , {"e":0}                   , {"e":0}           , ["/e"]
	, [1,2]             , {"a":"b","c":null}        , {"a":"b"}         , ["/a"]
	, {}                , {"a":{"bb":{"ccc":null}}} , {"a":{"bb":{}}}   , ["/a/bb", "/a"]
	, {}                , obj                       , obj               , ["/foo", "/", "/a~1b", "/c%d", "/e^f", "/g|h", "/i\\j", "/k\"l", "/ ", "/m~0n", "/a/b/c", "/a/b", "/a"]
	]




var test = require("testman").
describe ("JSON.pointer").
it("should resolve pointers").
	equal(util.pointer(obj, ""       ), obj).
	equal(util.pointer(obj, "/foo"   ), obj.foo).
	equal(util.pointer(obj, "/foo/0" ), "bar").
	equal(util.pointer(obj, "/foo/1" ), "baz").
	equal(util.pointer(obj, "/"      ), 0).
	equal(util.pointer(obj, "/a~1b"  ), 1).
	equal(util.pointer(obj, "/c%d"   ), 2).
	equal(util.pointer(obj, "/e^f"   ), 3).
	equal(util.pointer(obj, "/g|h"   ), 4).
	equal(util.pointer(obj, "/i\\j"  ), 5).
	equal(util.pointer(obj, "/k\"l"  ), 6).
	equal(util.pointer(obj, "/ "     ), 7).
	equal(util.pointer(obj, "/m~0n"  ), 8).


it("should set values by pointers and return old values").
	equal(util.pointer(obj, "/"      , 1), 0).
	equal(util.pointer(obj, "/"         ), 1).
	equal(util.pointer(obj, "/a~1b"  , 2), 1).
	equal(util.pointer(obj, "/a~1b"     ), 2).
	equal(util.pointer(obj, "/c%d"   , 3), 2).
	equal(util.pointer(obj, "/c%d"      ), 3).
	equal(util.pointer(obj, "/e^f"   , 4), 3).
	equal(util.pointer(obj, "/e^f"      ), 4).
	equal(util.pointer(obj, "/g|h"   , 5), 4).
	equal(util.pointer(obj, "/g|h"      ), 5).
	equal(util.pointer(obj, "/i\\j"  , 6), 5).
	equal(util.pointer(obj, "/i\\j"     ), 6).
	equal(util.pointer(obj, "/k\"l"  , 7), 6).
	equal(util.pointer(obj, "/k\"l"     ), 7).
	equal(util.pointer(obj, "/ "     , 8), 7).
	equal(util.pointer(obj, "/ "        ), 8).
	equal(util.pointer(obj, "/m~0n"  , 9), 8).
	equal(util.pointer(obj, "/m~0n"     ), 9).
	equal(util.pointer(obj, "/foo/0" , 1), "bar").
	equal(util.pointer(obj, "/foo/0"    ), 1).
	equal(util.pointer(obj, "/foo/1"    ), "baz").
	deepEqual(util.pointer(obj, "/foo", 2), [1, "baz"]).
	equal(util.pointer(obj, "/foo"      ), 2).
	equal(util.pointer(obj, "/a/b/c" , 3), undef).
	equal(util.pointer(obj, "/a/b/c"    ), 3).

describe ("JSON.mergePatch").
it("should apply merge patches")

for (var x = 0; x < tests.length; )
	addTest("mergePatch", tests[x++], tests[x++], tests[x++], tests[x++])

test.
it ("should work with old Object.deepMerge tests").
	run(function(){
		a = { a:"A"
			, b:null
			, c:"C"
			, d:null
			, e:{ea:"EA", eb:null, ec:"EC", ed:null}
			, f:null
			, g:{ga:1}
		}
		b = { b:"B"
			, c:null
			, e: {eb:"EB", ec:null}
			, f: {fa:1}
			, g: null
		}
		c = []
		util.mergePatch(a, b, c)
	}).
	deepEqual(a, {"a":"A","b":"B","d":null,"e":{"ea":"EA","eb":"EB","ed":null},"f":{"fa":1}}).
	deepEqual(b, {"b":"B","c":null,"e":{"eb":"EB","ec":null},"f":{"fa":1},"g":null}).
	deepEqual(c, ["/b","/c","/e/eb","/e/ec","/e","/f/fa","/f","/g"]).

describe ("util.clone").
test("it clones objects", function(assert) {
	Object.prototype.dummy = 123
	var clone = util.clone(obj)
	assert.deepEqual(obj, clone)
	assert.notStrictEqual(obj, clone)

	var arr = [1, "2", new Date, {a:3}]
	, arrClone = util.clone(arr)
	assert.deepEqual(arr, arrClone)
	assert.notStrictEqual(arr, arrClone)

	delete Object.prototype.dummy
}).
done()


function addTest(method, a, b, c, d) {
	var changes = []
	test = test.deepEqual(util[method](util.clone(a), b, changes), c)
	test = test.deepEqual(changes, d)
}


