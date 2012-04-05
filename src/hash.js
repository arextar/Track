;(function(location){
  track.methods.hash = {
    detect: function hash_detect () {return 'hash' in location},
    init: function hash_init () {
      if ('onhashchange' in window) {
        window.addEventListener('hashchange', function(){
          track.go(location.hash.substring(1), false)
        }, false)
        if(location.hash) track.go(location.hash.substring(1))
      } else {
        var old = location.hash
        setInterval(function check_hash (){
          if(old !== location.hash){
            track.go((old = location.hash).substring(1), false)
          }
        }, 20)
      }
    },
    set: function hash_set (path){
      location.hash = path
    }
  }
})(location);