    (function() {
            'use strict';

            class Router {
                constructor() {
                    this.cache = {};
                }


                on(key, value) {
                    let cache = this.cache;
                    cache[key] = value;
                }

                initFuct(hash) {
                    let cache = this.cache;
                    for (let r in cache) {
                        let reg = this.initRegexps(r);
                        if (reg.test(hash)) {
                            let callback = cache[r] || function() {};
                            let params = this.getParams(reg, hash);
                            callback.apply(this, params);
                        }
                    }

                }

                init() {
                    let t = this;
                    window.addEventListener('hashchange', function() {
                        let content = document.getElementById('content');
                        content.innerHTML = '';
                        let hash = location.hash.slice(1);
                        t.initFuct(hash);
                    });
                }

                initRegexps(route) {
                    route = route.replace(/\/?:(\w+)+/g, '\/([^/]+)');
                    return new RegExp('^' + route + '$');
                }

                getParams(reg, hash) {
                    return reg.exec(hash).slice(1);
                }

            }

            window.Router = Router;

        }
        ());