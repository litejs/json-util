/*
    MIT License
*/
!function(k,h){function l(a,b,g,d,c,e,f){d||(d="");if(b&&b.constructor===h)for(c in a&&a.constructor===h||(a={}),b)a[c]!==b[c]&&m.call(b,c)&&(e=b[c],f=d+"/"+c.replace(/~/g,"~0").replace(/\//g,"~1"),g&&g.push(f),null==e?delete a[c]:a[c]=l(a[c],e,g,f));else a=b;return a}var m=h.prototype.hasOwnProperty;k.pointer=function(a,b,g){if(b){b=b.split("/");for(var d,c=2<arguments.length,e=1,f=b.length;a&&e<f;)d=b[e++].replace(/~1/g,"/").replace(/~0/g,"~"),c&&(a[d]=e==f?g:a[d]&&"object"==typeof a[d]?a[d]:{}),
a=a[d]}return a};k.mergePatch=l}(JSON,Object);
