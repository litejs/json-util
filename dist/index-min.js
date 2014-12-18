/*
    MIT License
*/
!function(l,k){function m(a,b,g,d,c,e,f,h){d||(d="");if(b&&b.constructor===k)for(c in a&&a.constructor===k||(a={}),b)h!==(e=b[c])&&n.call(b,c)&&(h==e?h!==a[c]&&delete a[c]:a[c]!==e)&&(f=d+"/"+c.replace(/~/g,"~0").replace(/\//g,"~1"),g&&g.push(f),h!=e&&(a[c]=m(a[c],e,g,f)));else a=b;return a}var n=k.prototype.hasOwnProperty;l.pointer=function(a,b,g){if(b){b=b.split("/");for(var d,c=2<arguments.length,e=1,f=b.length;a&&e<f;)d=b[e++].replace(/~1/g,"/").replace(/~0/g,"~"),c&&(a[d]=e==f?g:a[d]&&"object"==
typeof a[d]?a[d]:{}),a=a[d]}return a};l.mergePatch=m}(JSON,Object);
