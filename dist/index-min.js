/*
    MIT License
*/
!function(h,f){function k(a,b,g,d,c,e){d||(d="");if(b&&b.constructor===f)for(c in a&&a.constructor===f||(a={}),b)a[c]!==b[c]&&l.call(b,c)&&(e=d+"/"+c.replace(/~/g,"~0").replace(/\//g,"~1"),g&&g.push(e),null===b[c]?delete a[c]:null!=b[c]&&(a[c]=k(a[c],b[c],g,e)));else a=b;return a}var l=f.prototype.hasOwnProperty;h.pointer=function(a,b,g){if(b){b=b.split("/");for(var d,c=2<arguments.length,e=1,f=b.length;a&&e<f;)d=b[e++].replace(/~1/g,"/").replace(/~0/g,"~"),c&&(a[d]=e==f?g:a[d]&&"object"==typeof a[d]?
a[d]:{}),a=a[d]}return a};h.mergePatch=k}(JSON,Object);
