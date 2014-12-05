/*
    MIT License
*/
!function(k,h){function l(a,b,e,c,d,f,g){c||(c="");if(b&&b.constructor===h)for(d in a&&a.constructor===h||(a={},e&&e.push(c)),b)a[d]!==b[d]&&m.call(b,d)&&(f=b[d],g=c+"/"+d.replace(/~/g,"~0").replace(/\//g,"~1"),null==f?m.call(a,d)&&(delete a[d],e&&e.push(g)):a[d]=l(a[d],f,e,g));else a=b,e&&e.push(c);return a}var m=h.prototype.hasOwnProperty;k.pointer=function(a,b,e){if(b){b=b.split("/");for(var c,d=2<arguments.length,f=1,g=b.length;a&&f<g;)c=b[f++].replace(/~1/g,"/").replace(/~0/g,"~"),d&&(a[c]=f==
g?e:a[c]&&"object"==typeof a[c]?a[c]:{}),a=a[c]}return a};k.mergePatch=l}(JSON,Object);
