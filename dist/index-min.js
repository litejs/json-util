/*
    MIT License
*/
!function(l,k){function m(a,c,g,d,b,e,f,h){d||(d="");if(c&&c.constructor===k)for(b in a&&a.constructor===k||(a={}),c)h!==(e=c[b])&&n.call(c,b)&&(h==e?h!==a[b]&&delete a[b]:a[b]!==e)&&(f=d+"/"+b.replace(/~/g,"~0").replace(/\//g,"~1"),g&&g.push(f),h!=e&&(a[b]=m(a[b],e,g,f)));else a=c;return a}var n=k.prototype.hasOwnProperty;l.pointer=function(a,c,g){if(c){c=c.split("/");for(var d,b=2<arguments.length,e=1,f=c.length;a&&e<f;){d=c[e++].replace(/~1/g,"/").replace(/~0/g,"~");if(b){if(e==f)return b=a[d],
a[d]=g,b;a[d]&&"object"==typeof a[d]||(a[d]={})}a=a[d]}}return a};l.mergePatch=m}(JSON,Object);
