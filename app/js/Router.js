    (function() {
            'use strict';

            class Router {
                constructor() {
                    this.cache = {};
                }


                on(key, value) {
                    var cache = this.cache;
                    cache[key] = value;
                }

                initFuct(hash) {
                    var cache = this.cache;
                    for (var r in cache) {
                        var reg = this.initRegexps(r);
                        if (reg.test(hash)) {
                            var callback = cache[r] || function() {};
                            var params = this.getParams(reg, hash);
                            callback.apply(this, params);
                        }
                    }

                }

                init() {
                    var t = this;
                    window.addEventListener('hashchange', function() {
                        var content = document.getElementById('content');
                        content.innerHTML = '';
                        var hash = location.hash.slice(1);
                        t.initFuct(hash);
                    });
                    window.addEventListener('load', function() {
                        var hash = location.hash.slice(1);
                        t.initFuct(hash);
                    })
                }

                initRegexps(route) {
                    route = route.replace(/(\/\w?:\w+)+/g, '\/([^/]+)')
                        .replace(/\*\w*/g, '([^?]*?)');

                    return new RegExp('^' + route + '$');
                }

                getParams(reg, hash) {
                    return reg.exec(hash).slice(1);
                }

            }



            window.Router = Router;

        }
        ());