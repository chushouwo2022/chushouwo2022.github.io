"use strict";
var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
    }
    return t
}
    , _createClass = function() {
    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1,
                i.configurable = !0,
            "value"in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
        }
    }
    return function(t, e, n) {
        return e && i(t.prototype, e),
        n && i(t, n),
            t
    }
}();
function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++)
            n[e] = t[e];
        return n
    }
    return Array.from(t)
}
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
var Sortable = function() {
    function d() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
            , e = t.parent
            , n = t.links
            , i = void 0 === n ? document.querySelectorAll("[data-sjslink]") : n
            , s = t.active
            , a = void 0 === s ? "is-active" : s
            , r = t.margin
            , o = void 0 === r ? 20 : r
            , l = t.responsive
            , u = void 0 === l ? {
            980: {
                columns: 3
            },
            480: {
                columns: 2
            },
            0: {
                columns: 1
            }
        } : l
            , c = t.fadeDuration
            , h = void 0 === c ? {
            in: 300,
            out: 0
        } : c;
        _classCallCheck(this, d),
            this.parent = e,
            this.links = Array.from(i),
            this.active = a,
            this.margin = o,
            this.responsive = u,
            this.fadeDuration = h,
            this.elements = Array.from(this.parent.children),
            this.activeElements = this.elements,
            this.columns = 1,
            this.dataLink = "all",
            this.winWidth = window.innerWidth,
            this.init()
    }
    return _createClass(d, [{
        key: "orderelements",
        value: function() {
            var r = this
                , t = this.parent
                , e = this.activeElements
                , o = this.columns
                , l = this.blocWidth
                , u = (this.responsive,
                this.margin)
                , n = e.reduce(function(t, e, n) {
                var i = r._sumArrHeight(t, o)
                    , s = n % o * (l + u)
                    , a = 0 <= n - o ? i[n % o] + u * Math.floor(n / o) : 0;
                return e.style.transform = "translate3d(" + s + "px, " + a + "px, 0)",
                    t.push(e.offsetHeight),
                    t
            }, [])
                , i = this._sumArrHeight(n, o)
                , s = Math.max.apply(Math, _toConsumableArray(i)) + u * (Math.floor(e.length / o) - 1);
            t.style.height = s + "px"
        }
    }, {
        key: "handleFilterClick",
        value: function(t, e) {
            var n = this;
            t.preventDefault();
            var i = this.links
                , s = this.active;
            e.dataset.sjslink !== this.dataLink && (this.dataLink = e.dataset.sjslink,
                i.forEach(function(t) {
                    t.isEqualNode(e) ? t.classList.add(s) : t.classList.remove(s)
                }),
                this._filterElements(function() {
                    n.orderelements()
                }))
        }
    }, {
        key: "resize",
        value: function() {
            var t = this;
            window.addEventListener("resize", function() {
                clearTimeout(window.sortableResize),
                    window.sortableResize = setTimeout(function() {
                        t.winWidth = window.innerWidth,
                            t._setBlocWidth(function() {
                                t.orderelements()
                            })
                    }, 500)
            })
        }
    }, {
        key: "init",
        value: function() {
            var n = this
                , t = this.parent
                , e = this.links
                , i = this.active;
            e.forEach(function(e, t) {
                0 === t && (e.classList.add(i),
                    n.dataLink = e.dataset.sjslink),
                    e.addEventListener("click", function(t) {
                        n.handleFilterClick(t, e)
                    })
            }),
                this._setBlocWidth(),
                window.addEventListener("load", function() {
                    n._filterElements(function() {
                        n.orderelements()
                    }),
                        t.style.opacity = 1
                }),
                this.resize()
        }
    }, {
        key: "_setBlocWidth",
        value: function(t) {
            var e = this.parent
                , n = this.elements
                , i = this.margin
                , s = this.responsive
                , a = this.columns = this._columnsCount(s).columns
                , r = this.blocWidth = (e.clientWidth - i * (a - 1)) / a;
            n.forEach(function(t) {
                t.style.width = r + "px"
            }),
            t && t()
        }
    }, {
        key: "_filterElements",
        value: function(t) {
            var e = this
                , n = this.elements
                , i = this.dataLink
                , s = this.fadeDuration;
            this.activeElements = n.filter(function(t) {
                return "all" === i ? (e._fadeIn(t, s.in),
                    !0) : t.dataset.sjsel !== i ? (e._fadeOut(t, s.out),
                    !1) : (e._fadeIn(t, s.in),
                    !0)
            }),
            t && t()
        }
    }, {
        key: "_sumArrHeight",
        value: function(t, s) {
            return t.reduce(function(t, e, n) {
                var i = n % s;
                return t[i] || (t[i] = 0),
                    t[i] = t[i] + e,
                    t
            }, [])
        }
    }, {
        key: "_columnsCount",
        value: function(t) {
            var n = this.winWidth;
            return Object.entries(t).reduce(function(t, e) {
                return n > e[0] && e[0] >= Math.max(t.width) ? {
                    width: e[0],
                    columns: e[1].columns
                } : t
            }, {
                width: 0,
                columns: 4
            })
        }
    }, {
        key: "_fadeIn",
        value: function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300
                , n = arguments[2]
                , i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity"))
                , s = 16 / t;
            e.style.display = "block",
                requestAnimationFrame(function t() {
                    (i += s) <= 1 ? (e.style.opacity = i,
                        requestAnimationFrame(t)) : (e.style.opacity = 1,
                    n && n())
                })
        }
    }, {
        key: "_fadeOut",
        value: function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 300
                , n = arguments[2]
                , i = parseFloat(window.getComputedStyle(e, null).getPropertyValue("opacity"))
                , s = t ? 16 / t : 1;
            requestAnimationFrame(function t() {
                0 <= (i -= s) ? (e.style.opacity = i,
                    requestAnimationFrame(t)) : (e.style.opacity = 0,
                    e.style.display = "none",
                n && n())
            })
        }
    }]),
        d
}();
HTMLElement.prototype.sortablejs = HTMLElement.prototype.sortablejs || function(t) {
    return new Sortable(_extends({
        parent: this
    }, t))
}
;
