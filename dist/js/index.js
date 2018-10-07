(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.ityped = {});
}(this, function (e) {
  "use strict";

  e.init = function (e, t) {
    var n = 0,
        o = void 0,
        r = void 0,
        i = function (e, t) {
      n === o && t.loop && (n = 0), setTimeout(function () {
        a(e[n], t);
      }, t.startDelay);
    },
        a = function (t, n) {
      var o = 0,
          r = t.length,
          i = setInterval(function () {
        if (n.placeholder ? e.placeholder += t[o] : e.textContent += t[o], ++o === r) return d(i, n);
      }, n.typeSpeed);
    },
        d = function (e, t) {
      return clearInterval(e), t.disableBackTyping && n === o - 1 ? t.onFinished() : t.loop || n !== o - 1 ? void setTimeout(function () {
        return c(t);
      }, t.backDelay) : t.onFinished();
    },
        c = function (t) {
      var n = t.placeholder ? e.placeholder : e.textContent,
          o = n.length,
          r = setInterval(function () {
        if (t.placeholder ? e.placeholder = e.placeholder.substr(0, --o) : e.textContent = n.substr(0, --o), 0 === o) return s(r, t);
      }, t.backSpeed);
    },
        s = function (e, t) {
      clearInterval(e), ++n, i(r, t);
    };

    return function (t) {
      var n = function (e) {
        var t = e.strings,
            n = void 0 === t ? ["Put your strings here...", "and Enjoy!"] : t,
            o = e.typeSpeed,
            r = void 0 === o ? 100 : o,
            i = e.backSpeed,
            a = void 0 === i ? 50 : i,
            d = e.backDelay,
            c = void 0 === d ? 500 : d,
            s = e.startDelay,
            l = void 0 === s ? 500 : s,
            u = e.cursorChar,
            p = void 0 === u ? "|" : u,
            f = e.placeholder,
            v = void 0 !== f && f,
            h = e.showCursor,
            y = void 0 === h || h,
            b = e.disableBackTyping,
            g = void 0 !== b && b,
            C = e.onFinished,
            k = void 0 === C ? function () {} : C,
            m = e.loop;
        return {
          strings: n,
          typeSpeed: r,
          backSpeed: a,
          cursorChar: p,
          backDelay: c,
          placeholder: v,
          startDelay: l,
          showCursor: y,
          loop: void 0 === m || m,
          disableBackTyping: g,
          onFinished: k
        };
      }(t || {}),
          a = n.strings;

      r = a, o = a.length, "string" == typeof e && (e = document.querySelector(e)), n.showCursor && function (e, t) {
        var n = document.createElement("span");
        n.classList.add("ityped-cursor"), n.textContent = "|", n.textContent = t.cursorChar, e.insertAdjacentElement("afterend", n);
      }(e, n), i(a, n);
    }(t);
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});

},{}],2:[function(require,module,exports){
const ityped = require('./vendor/ityped.min');

window.onload = function () {
  const body = document.getElementsByTagName('body')[0];
  window.scrollTo({
    left: 0,
    top: body.scrollHeight
  });
  const words = ["artistas", "actorxs", "personas", "cantantes", "bailarinxs", "humanxs", "rarxs", "grandes", "pequeñxs", "amantes", "hippies", "cineastas", "pintorxs"];
  const people = document.getElementsByClassName('js-main__people')[0];
  people.innerHTML = "";
  ityped.init(people, {
    strings: words,
    loop: true
  });
};

},{"./vendor/ityped.min":3}],3:[function(require,module,exports){
!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.ityped = {});
}(this, function (e) {
  "use strict";

  e.init = function (e, t) {
    var n = 0,
        o = void 0,
        r = void 0,
        i = function (e, t) {
      n === o && t.loop && (n = 0), setTimeout(function () {
        a(e[n], t);
      }, t.startDelay);
    },
        a = function (t, n) {
      var o = 0,
          r = t.length,
          i = setInterval(function () {
        if (n.placeholder ? e.placeholder += t[o] : e.textContent += t[o], ++o === r) return d(i, n);
      }, n.typeSpeed);
    },
        d = function (e, t) {
      return clearInterval(e), t.disableBackTyping && n === o - 1 ? t.onFinished() : t.loop || n !== o - 1 ? void setTimeout(function () {
        return c(t);
      }, t.backDelay) : t.onFinished();
    },
        c = function (t) {
      var n = t.placeholder ? e.placeholder : e.textContent,
          o = n.length,
          r = setInterval(function () {
        if (t.placeholder ? e.placeholder = e.placeholder.substr(0, --o) : e.textContent = n.substr(0, --o), 0 === o) return s(r, t);
      }, t.backSpeed);
    },
        s = function (e, t) {
      clearInterval(e), ++n, i(r, t);
    };

    return function (t) {
      var n = function (e) {
        var t = e.strings,
            n = void 0 === t ? ["Put your strings here...", "and Enjoy!"] : t,
            o = e.typeSpeed,
            r = void 0 === o ? 100 : o,
            i = e.backSpeed,
            a = void 0 === i ? 50 : i,
            d = e.backDelay,
            c = void 0 === d ? 500 : d,
            s = e.startDelay,
            l = void 0 === s ? 500 : s,
            u = e.cursorChar,
            p = void 0 === u ? "|" : u,
            f = e.placeholder,
            v = void 0 !== f && f,
            h = e.showCursor,
            y = void 0 === h || h,
            b = e.disableBackTyping,
            g = void 0 !== b && b,
            C = e.onFinished,
            k = void 0 === C ? function () {} : C,
            m = e.loop;
        return {
          strings: n,
          typeSpeed: r,
          backSpeed: a,
          cursorChar: p,
          backDelay: c,
          placeholder: v,
          startDelay: l,
          showCursor: y,
          loop: void 0 === m || m,
          disableBackTyping: g,
          onFinished: k
        };
      }(t || {}),
          a = n.strings;

      r = a, o = a.length, "string" == typeof e && (e = document.querySelector(e)), n.showCursor && function (e, t) {
        var n = document.createElement("span");
        n.classList.add("ityped-cursor"), n.textContent = "|", n.textContent = t.cursorChar, e.insertAdjacentElement("afterend", n);
      }(e, n), i(a, n);
    }(t);
  }, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});

},{}]},{},[1,2]);
