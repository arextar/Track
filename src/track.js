;(function(window){
  "use strict";
  var method
    , methods
    , stat = {}
    , tests = []
    , tests_len = 0
    , extract = []
    , callbacks = []
    , track = window.track = {
  init: function init (){
    for (var i = 0, m; m = arguments[i++];) {
      if (m in methods && methods[m].detect()) {
          (method = methods[track.method = m]).init()
          return m
        }
      }
      return false
    },

    clean: clean,

    go: function go (page, change) {
      page = clean(page)

      // Don't trigger the change if `change` is `false`. This prevents some nasty loops if triggering that will acuse this function to run
      change === false || method.set(page)

      if (page in stat) {
        stat[page].call({}, page)
      }
      else
      {
        for(var i = 0, t; t = tests[i++]; ){
          if(t.test(page)) return callbacks[--i].call(extract[i](page), page)
        }
      }
    },

    on: function on (page, fn) {
      if (!/:\w+|\{/.test(page = clean(page))) {
        stat[page] = fn;
      }
      else
      {
        var words = []
          , len = 0
          , i = 0
        page = "^" + page.replace(/(?::(\w+)|\{([^\}]+)\})(\??)\/?/g, function replace_word (_, word, regex, optional){
          words[len++] = word || i++;
          return "(?:" + (word ? "[^/]+" : regex) + ")" + optional + "\/" + optional;
        }) + "$";

        tests[tests_len] = RegExp(page);
        var ext = RegExp(page.split("(?:").join("("));
        extract[tests_len] = function extract_data (str){
          str = ext.exec(str);
          for(var obj = {}, i = 0; i < len; i++) obj[words[i]] = str[i + 1];
          return obj;
        }
        callbacks[tests_len++] = fn;
      }
    },



    methods: methods = {
      basic: {
        detect: function basic_detect () {return true},
        init: function basic_init () {},
        set: function basic_set () {}
      }
    }
  }
  
  function clean (url) {
    return url.replace(/^\/*|\/*$/g, '/').replace(/\/+/g, "/");
  }
})(window);