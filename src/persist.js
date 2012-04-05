;(function(stay){
  track.methods.persist = {
    detect: function persist_detect () {return stay.supported},
    init: function persist_init () {
      stay.exists("track_url") && track.go(stay.get("track_url"));
    },
    set: function persist_set (path){
      stay.set("track_url", path);
    }
  }
})(function(a,b,c){!a&&"globalStorage"in window&&(a=globalStorage[c]);var d={},e,f,g,h,i=!0;if(b.documentElement.addBehavior){var j=b.documentElement;j.addBehavior("#default#userData"),j.load(c);var k=j.xmlDocument,l=k.documentElement;function m(a){for(var b=l.childNodes,c=0,d;d=b[c++];)if(b.getAttribute("key")===a)return b}e=function(a){var b=m(a);return b?b.getAttribute("value"):null},f=function(a,b){var d=m(a);d?d.setAttribute("value",b):(d=k.createNode(1,"item",""),d.setAttribute("key",a),d.setAttribute("value",b),l.appendChild(d)),j.save(c)},g=function(a){return!!m(a)},h=function(a){var b=m(a);b&&l.removeChild(b),j.save(c)}}else a?(e=function(b){return a.hasOwnProperty(b)?a[b]:null},f=function(b,c){a[b]=c},g=function(b){return a.hasOwnProperty(b)},h=function(b){delete a[b]}):(e=f=g=h=function(){},i=!1);return{get:function(a){return typeof d[a]!="undefined"?d[a]:e(a)},set:function(a,b){return f(a,d[a]=b),b},exists:function(a){return typeof d[a]!="undefined"||g(a)},del:function(a){delete d[a],h(a)},data:d,supported:i}}(window.localStorage,document,document.domain));