track.methods.history = {
    detect: function history_detect() {return 'pushState' in history},
    init: function history_init() {
      window.addEventListener("popstate", function(event){
        event.state && track.go(event.state, false)
      }, false);
      history.state && track.go(history.state, false);
    },
    set: function history_set(url){
        console.log(url);
      history.pushState(url, "", url);
    }
  }