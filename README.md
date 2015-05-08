[1]: https://secure.travis-ci.org/litejs/json-util.png
[2]: https://travis-ci.org/litejs/json-util
[3]: https://coveralls.io/repos/litejs/json-util/badge.png
[4]: https://coveralls.io/r/litejs/json-util
[npm package]: https://npmjs.org/package/json-util
[GitHub repo]: https://github.com/litejs/json-util
[RFC 6901]: http://tools.ietf.org/html/rfc6901
[RFC 7396]: http://tools.ietf.org/html/rfc7396


    @version    1.0.2
    @date       2015-05-08
    @stability  3 - Stable


JSON util &ndash; [![Build][1]][2] [![Coverage][3]][4]
=========

JSON Pointer [RFC 6901][] and JSON Merge Patch [RFC 7396][] implementation.
The main goal is to have a small and reasonably fast code.


Examples
--------

```javascript
var obj = {"a": {"b": 1}}

// get a value
var b = JSON.pointer(obj, "/a/b")
// b is 1

// set a value
var oldValue = JSON.pointer(obj, "/a/b", 2) // sets value to 2
// oldValue is 1

// adding to a nonexistent target will create missing object literals
JSON.pointer(obj, "/a/c/d/e", "3")
// obj is now {"a": {"b": 2, "c": {"d": {"e": "3"}}}}


// apply a patch and collect JSON Pointers to array that were changed
var changed = []
JSON.mergePatch(obj, {"a": {"c": "C"}}, changed /* optional */)
// obj is now {"a": {"b": 2, "c": "C"}}
// changed = ["/a", "/a/c"]
```


Coding Style Guidelines
-----------------------

-   Use tabs for indentation, align with spaces
-   Use lowerCamelCase for method and variable names
-   Use UpperCamelCase for constructor names
-   Commit files with Unix-style line endings
-   Do not use spaces in file and directory names
    Consider substituting a dash (-) where you would normally use spaces.
-   Rebase before pushing
-   Fix tests before push or pull request


External links
--------------

-   [GitHub repo][]
-   [npm package][]
-   JSON Pointer [RFC 6901][]
-   JSON Merge Patch [RFC 7396][]


### Licence

Copyright (c) 2014-2015 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


