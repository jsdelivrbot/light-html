var e=["click","dblclick","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseout","mouseup"],t=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"];String.prototype.html=function(){var e=this,n=t.map(function(t){return e.search("</"+t+">")}).filter(function(e){return e>-1}).length>0,r=n?"image/svg+xml":"text/html",i=(new DOMParser).parseFromString(this,r);return n?i.documentElement:i.body.firstChild};var n=function(e,t){this.values=t,this.dom=this.parseHTML(e),this.render=this.render.bind(this)};n.prototype.render=function(e){e.appendChild(this.dom)},n.prototype.remove=function(){this.dom.remove()},n.prototype.replaceTemplatesWithValues=function(e,t){for(var n=0,r=t;n<r.length;n+=1){var i=r[n],o=i.value,a=e.parentNode.querySelector("*[data-"+i.id+"]");if(1==o.nodeType)a.replaceWith(o);else if("string"==typeof o)a.parentNode.innerHTML=o;else if("function"==typeof o){a.addEventListener(i.type,o)}}return e},n.prototype.checkClickEvents=function(t){var n=e.map(function(e){return t.search(e)>0?e:null}).filter(function(e){return e})[0];return n||!1},n.prototype.parseHTML=function(e){var t=this,n=this.values,r=[],i=e.map(function(i,o){var a,f="p"+((a=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+a())+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a();if(o+1!=e.length){var l=t.checkClickEvents(i);l?(i=i+'" data-'+f+'=""',r.push({id:f,value:n[o],type:l})):(r.push({id:f,value:n[o]}),i=i+" <template data-"+f+'="" > </template>')}return i}).reduce(function(e,t){return e+t}).html();return this.replaceTemplatesWithValues(i,r)};export default function(e){for(var t=[],r=arguments.length-1;r-- >0;)t[r]=arguments[r+1];var i=[].concat(t);return new n(e,i)};
//# sourceMappingURL=light-html.m.js.map