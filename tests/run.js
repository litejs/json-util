
require("..")

var undef, a, b, c
, util = JSON
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
	[ {"a":"b"}         , {"a":"c"}                 , {"a":"c"}          , ["/a"]
	, {"a":"b"}         , {"b":"c"}                 , {"a":"b","b":"c"}  , ["/b"]
	, {"a":"b"}         , {"a":null}                , {}                 , ["/a"]
	, {"a":"b"}         , {"a":undef}               , {"a":"b"}          , []
	, {"a":"b"}         , {"b":undef}               , {"a":"b"}          , []
	, {"a":"b","b":"c"} , {"a":null}                , {"b":"c"}          , ["/a"]
	, {"a":["b"]}       , {"a":"c"}                 , {"a":"c"}          , ["/a"]
	, {"a":"c"}         , {"a":["b"]}               , {"a":["b"]}        , ["/a"]
	, {"a":{"b": "c"}}  , {"a":{"b":"d","c":null}}  , {"a":{"b":"d"}}    , ["/a", "/a/b"]
	, {"a":[{"b":"c"}]} , {"a":[1]}                 , {"a":[1]}          , ["/a"]
	, ["a","b"]         , ["c","d"]                 , ["c","d"]          , []
	, {"a":"b"}         , ["c"]                     , ["c"]              , []
	, {"a":"foo"}       , null                      , null               , []
	, {"a":"foo"}       , "bar"                     , "bar"              , []
	, {"e":null}        , {"a":1}                   , {"e":null,"a":1}   , ["/a"]
	, {"e":null}        , {"e":null}                , {}                 , ["/e"]
	, [1,2]             , {"a":"b","c":null}        , {"a":"b"}          , ["/a"]
	, {}                , {"a":{"bb":{"ccc":null}}} , {"a":{"bb":{}}}    , ["/a", "/a/bb"]
	, {}                , obj                       , obj                , ["/foo", "/","/a~1b","/c%d","/e^f","/g|h","/i\\j","/k\"l","/ ","/m~0n","/a","/a/b","/a/b/c"]
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


it("should set values by pointers").
	equal(util.pointer(obj, "/"      , 1    ), 1).
	equal(util.pointer(obj, "/"             ), 1).
	equal(util.pointer(obj, "/a~1b"  , 2    ), 2).
	equal(util.pointer(obj, "/a~1b"         ), 2).
	equal(util.pointer(obj, "/c%d"   , 3    ), 3).
	equal(util.pointer(obj, "/c%d"          ), 3).
	equal(util.pointer(obj, "/e^f"   , 4    ), 4).
	equal(util.pointer(obj, "/e^f"          ), 4).
	equal(util.pointer(obj, "/g|h"   , 5    ), 5).
	equal(util.pointer(obj, "/g|h"          ), 5).
	equal(util.pointer(obj, "/i\\j"  , 6    ), 6).
	equal(util.pointer(obj, "/i\\j"         ), 6).
	equal(util.pointer(obj, "/k\"l"  , 7    ), 7).
	equal(util.pointer(obj, "/k\"l"         ), 7).
	equal(util.pointer(obj, "/ "     , 8    ), 8).
	equal(util.pointer(obj, "/ "            ), 8).
	equal(util.pointer(obj, "/m~0n"  , 9    ), 9).
	equal(util.pointer(obj, "/m~0n"         ), 9).
	equal(util.pointer(obj, "/foo/0" , 1    ), 1).
	equal(util.pointer(obj, "/foo/0"        ), 1).
	equal(util.pointer(obj, "/foo/1"        ), "baz").
	equal(util.pointer(obj, "/foo"   , 2    ), 2).
	equal(util.pointer(obj, "/foo"          ), 2).
	equal(util.pointer(obj, "/a/b/c" , 3    ), 3).
	equal(util.pointer(obj, "/a/b/c"        ), 3).

describe ("JSON.mergePatch").
it("should apply merge patches")

for (var x = 0; x < tests.length;)
	addTest(tests[x++], tests[x++], tests[x++], tests[x++])

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
		JSON.mergePatch(a, b, c)
	}).
	equal(JSON.stringify(a), '{"a":"A","b":"B","d":null,"e":{"ea":"EA","eb":"EB","ed":null},"f":{"fa":1}}').
	equal(JSON.stringify(b), '{"b":"B","c":null,"e":{"eb":"EB","ec":null},"f":{"fa":1},"g":null}').
	equal(JSON.stringify(c), '["/b","/c","/e","/e/eb","/e/ec","/f","/f/fa","/g"]').
done()


function addTest(a, b, c, d) {
	var target = JSON.stringify(a)
	, changes = []
	, result = JSON.stringify(util.mergePatch(a, b, changes))
	, expected = JSON.stringify(c)
	test = test.equal(result, expected)
	test = test.equal(changes.length, d.length)
	test = test.equal(JSON.stringify(changes), JSON.stringify(d))
}


