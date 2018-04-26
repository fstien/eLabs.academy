import browser from './browser.js';


if(browser) {  
    !function(t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return t[o].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function() {
        "use strict";
        var t, e, n = 200,
            o = "resizeend";
        window.CustomEvent ? e = new CustomEvent(o) : (e = document.createEvent("CustomEvent"), e.initCustomEvent(o, !0, !0)), window.addEventListener("resize", function() {
            clearTimeout(t), t = setTimeout(function() {
                window.dispatchEvent(e)
            }, n)
        })
    }])

}
