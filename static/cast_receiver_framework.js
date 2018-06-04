'use strict';
var h, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    },
    ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

function da() {
    da = function() {};
    ca.Symbol || (ca.Symbol = ea)
}
var ea = function() {
    var a = 0;
    return function(b) {
        return "jscomp_symbol_" + (b || "") + a++
    }
}();

function fa() {
    da();
    var a = ca.Symbol.iterator;
    a || (a = ca.Symbol.iterator = ca.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return ha(this)
        }
    });
    fa = function() {}
}

function ha(a) {
    var b = 0;
    return ia(function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    })
}

function ia(a) {
    fa();
    a = {
        next: a
    };
    a[ca.Symbol.iterator] = function() {
        return this
    };
    return a
}

function n(a) {
    fa();
    var b = a[Symbol.iterator];
    return b ? b.call(a) : ha(a)
}
var ja = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    },
    ka;
if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;
else {
    var la;
    a: {
        var ma = {
                pj: !0
            },
            na = {};
        try {
            na.__proto__ = ma;
            la = na.pj;
            break a
        } catch (a) {}
        la = !1
    }
    ka = la ? function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a
    } : null
}
var oa = ka;

function p(a, b) {
    a.prototype = ja(b.prototype);
    a.prototype.constructor = a;
    if (oa) oa(a, b);
    else
        for (var c in b)
            if ("prototype" != c)
                if (Object.defineProperties) {
                    var d = Object.getOwnPropertyDescriptor(b, c);
                    d && Object.defineProperty(a, c, d)
                } else a[c] = b[c];
    a.ac = b.prototype
}

function pa(a) {
    if (!(a instanceof Array)) {
        a = n(a);
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        a = c
    }
    return a
}

function qa(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a)) return {
            gh: e,
            ci: f
        }
    }
    return {
        gh: -1,
        ci: void 0
    }
}

function ra(a, b) {
    if (b) {
        var c = ca;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
ra("Array.prototype.findIndex", function(a) {
    return a ? a : function(a, c) {
        return qa(this, a, c).gh
    }
});

function sa(a, b, c) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
}
ra("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return qa(this, a, c).ci
    }
});
ra("Promise", function(a) {
    function b(a) {
        this.h = 0;
        this.l = void 0;
        this.g = [];
        var b = this.o();
        try {
            a(b.resolve, b.reject)
        } catch (l) {
            b.reject(l)
        }
    }

    function c() {
        this.g = null
    }

    function d(a) {
        return a instanceof b ? a : new b(function(b) {
            b(a)
        })
    }
    if (a) return a;
    c.prototype.h = function(a) {
        null == this.g && (this.g = [], this.o());
        this.g.push(a)
    };
    c.prototype.o = function() {
        var a = this;
        this.l(function() {
            a.w()
        })
    };
    var e = ca.setTimeout;
    c.prototype.l = function(a) {
        e(a, 0)
    };
    c.prototype.w = function() {
        for (; this.g && this.g.length;) {
            var a = this.g;
            this.g = [];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                a[b] = null;
                try {
                    c()
                } catch (m) {
                    this.u(m)
                }
            }
        }
        this.g = null
    };
    c.prototype.u = function(a) {
        this.l(function() {
            throw a;
        })
    };
    b.prototype.o = function() {
        function a(a) {
            return function(d) {
                c || (c = !0, a.call(b, d))
            }
        }
        var b = this,
            c = !1;
        return {
            resolve: a(this.D),
            reject: a(this.u)
        }
    };
    b.prototype.D = function(a) {
        if (a === this) this.u(new TypeError("A Promise cannot resolve to itself"));
        else if (a instanceof b) this.F(a);
        else {
            a: switch (typeof a) {
                case "object":
                    var c = null != a;
                    break a;
                case "function":
                    c = !0;
                    break a;
                default:
                    c = !1
            }
            c ? this.B(a) : this.w(a)
        }
    };
    b.prototype.B = function(a) {
        var b = void 0;
        try {
            b = a.then
        } catch (l) {
            this.u(l);
            return
        }
        "function" == typeof b ? this.G(b, a) : this.w(a)
    };
    b.prototype.u = function(a) {
        this.A(2, a)
    };
    b.prototype.w = function(a) {
        this.A(1, a)
    };
    b.prototype.A = function(a, b) {
        if (0 != this.h) throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.h);
        this.h = a;
        this.l = b;
        this.C()
    };
    b.prototype.C = function() {
        if (null != this.g) {
            for (var a = 0; a < this.g.length; ++a) f.h(this.g[a]);
            this.g = null
        }
    };
    var f = new c;
    b.prototype.F = function(a) {
        var b = this.o();
        a.Dd(b.resolve, b.reject)
    };
    b.prototype.G = function(a, b) {
        var c = this.o();
        try {
            a.call(b, c.resolve, c.reject)
        } catch (m) {
            c.reject(m)
        }
    };
    b.prototype.then = function(a, c) {
        function d(a, b) {
            return "function" == typeof a ? function(b) {
                try {
                    e(a(b))
                } catch (ba) {
                    f(ba)
                }
            } : b
        }
        var e, f, g = new b(function(a, b) {
            e = a;
            f = b
        });
        this.Dd(d(a, e), d(c, f));
        return g
    };
    b.prototype.catch = function(a) {
        return this.then(void 0, a)
    };
    b.prototype.Dd = function(a, b) {
        function c() {
            switch (d.h) {
                case 1:
                    a(d.l);
                    break;
                case 2:
                    b(d.l);
                    break;
                default:
                    throw Error("Unexpected state: " + d.h);
            }
        }
        var d = this;
        null == this.g ? f.h(c) : this.g.push(c)
    };
    b.resolve = d;
    b.reject = function(a) {
        return new b(function(b, c) {
            c(a)
        })
    };
    b.race = function(a) {
        return new b(function(b, c) {
            for (var e = n(a), f = e.next(); !f.done; f = e.next()) d(f.value).Dd(b, c)
        })
    };
    b.all = function(a) {
        var c = n(a),
            e = c.next();
        return e.done ? d([]) : new b(function(a, b) {
            function f(b) {
                return function(c) {
                    g[b] = c;
                    k--;
                    0 == k && a(g)
                }
            }
            var g = [],
                k = 0;
            do g.push(void 0), k++, d(e.value).Dd(f(g.length - 1), b), e = c.next();
            while (!e.done)
        })
    };
    return b
});
ra("String.prototype.endsWith", function(a) {
    return a ? a : function(a, c) {
        var b = sa(this, a, "endsWith");
        a += "";
        void 0 === c && (c = b.length);
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var e = a.length; 0 < e && 0 < c;)
            if (b[--c] != a[--e]) return !1;
        return 0 >= e
    }
});
ra("Object.is", function(a) {
    return a ? a : function(a, c) {
        return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c
    }
});
ra("Array.prototype.includes", function(a) {
    return a ? a : function(a, c) {
        var b = this;
        b instanceof String && (b = String(b));
        var e = b.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = b[c];
            if (f === a || Object.is(f, a)) return !0
        }
        return !1
    }
});
ra("String.prototype.includes", function(a) {
    return a ? a : function(a, c) {
        return -1 !== sa(this, a, "includes").indexOf(a, c || 0)
    }
});
ra("Number.isFinite", function(a) {
    return a ? a : function(a) {
        return "number" !== typeof a ? !1 : !isNaN(a) && Infinity !== a && -Infinity !== a
    }
});
ra("Number.isInteger", function(a) {
    return a ? a : function(a) {
        return Number.isFinite(a) ? a === Math.floor(a) : !1
    }
});
ra("String.prototype.startsWith", function(a) {
    return a ? a : function(a, c) {
        var b = sa(this, a, "startsWith");
        a += "";
        var e = b.length,
            f = a.length;
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var g = 0; g < f && c < e;)
            if (b[c++] != a[g++]) return !1;
        return g >= f
    }
});

function ta(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
}
ra("Object.values", function(a) {
    return a ? a : function(a) {
        var b = [],
            d;
        for (d in a) ta(a, d) && b.push(a[d]);
        return b
    }
});
ra("WeakMap", function(a) {
    function b(a) {
        this.g = (f += Math.random() + 1).toString();
        if (a) {
            da();
            fa();
            a = n(a);
            for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
        }
    }

    function c(a) {
        ta(a, e) || aa(a, e, {
            value: {}
        })
    }

    function d(a) {
        var b = Object[a];
        b && (Object[a] = function(a) {
            c(a);
            return b(a)
        })
    }
    if (function() {
            if (!a || !Object.seal) return !1;
            try {
                var b = Object.seal({}),
                    c = Object.seal({}),
                    d = new a([
                        [b, 2],
                        [c, 3]
                    ]);
                if (2 != d.get(b) || 3 != d.get(c)) return !1;
                d.delete(b);
                d.set(c, 4);
                return !d.has(b) && 4 == d.get(c)
            } catch (m) {
                return !1
            }
        }()) return a;
    var e = "$jscomp_hidden_" + Math.random();
    d("freeze");
    d("preventExtensions");
    d("seal");
    var f = 0;
    b.prototype.set = function(a, b) {
        c(a);
        if (!ta(a, e)) throw Error("WeakMap key fail: " + a);
        a[e][this.g] = b;
        return this
    };
    b.prototype.get = function(a) {
        return ta(a, e) ? a[e][this.g] : void 0
    };
    b.prototype.has = function(a) {
        return ta(a, e) && ta(a[e], this.g)
    };
    b.prototype.delete = function(a) {
        return ta(a, e) && ta(a[e], this.g) ? delete a[e][this.g] : !1
    };
    return b
});
ra("Map", function(a) {
    function b() {
        var a = {};
        return a.ob = a.next = a.head = a
    }

    function c(a, b) {
        var c = a.g;
        return ia(function() {
            if (c) {
                for (; c.head != a.g;) c = c.ob;
                for (; c.next != c.head;) return c = c.next, {
                    done: !1,
                    value: b(c)
                };
                c = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }

    function d(a, b) {
        var c = b && typeof b;
        "object" == c || "function" == c ? f.has(b) ? c = f.get(b) : (c = "" + ++g, f.set(b, c)) : c = "p_" + b;
        var d = a.h[c];
        if (d && ta(a.h, c))
            for (a = 0; a < d.length; a++) {
                var e = d[a];
                if (b !== b && e.key !== e.key || b === e.key) return {
                    id: c,
                    list: d,
                    index: a,
                    ya: e
                }
            }
        return {
            id: c,
            list: d,
            index: -1,
            ya: void 0
        }
    }

    function e(a) {
        this.h = {};
        this.g = b();
        this.size = 0;
        if (a) {
            a = n(a);
            for (var c; !(c = a.next()).done;) c = c.value, this.set(c[0], c[1])
        }
    }
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var b = Object.seal({
                        x: 4
                    }),
                    c = new a(n([
                        [b, "s"]
                    ]));
                if ("s" != c.get(b) || 1 != c.size || c.get({
                        x: 4
                    }) || c.set({
                        x: 4
                    }, "t") != c || 2 != c.size) return !1;
                var d = c.entries(),
                    e = d.next();
                if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
                e = d.next();
                return e.done || 4 != e.value[0].x ||
                    "t" != e.value[1] || !d.next().done ? !1 : !0
            } catch (z) {
                return !1
            }
        }()) return a;
    da();
    fa();
    var f = new WeakMap;
    e.prototype.set = function(a, b) {
        a = 0 === a ? 0 : a;
        var c = d(this, a);
        c.list || (c.list = this.h[c.id] = []);
        c.ya ? c.ya.value = b : (c.ya = {
            next: this.g,
            ob: this.g.ob,
            head: this.g,
            key: a,
            value: b
        }, c.list.push(c.ya), this.g.ob.next = c.ya, this.g.ob = c.ya, this.size++);
        return this
    };
    e.prototype.delete = function(a) {
        a = d(this, a);
        return a.ya && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.h[a.id], a.ya.ob.next = a.ya.next, a.ya.next.ob =
            a.ya.ob, a.ya.head = null, this.size--, !0) : !1
    };
    e.prototype.clear = function() {
        this.h = {};
        this.g = this.g.ob = b();
        this.size = 0
    };
    e.prototype.has = function(a) {
        return !!d(this, a).ya
    };
    e.prototype.get = function(a) {
        return (a = d(this, a).ya) && a.value
    };
    e.prototype.entries = function() {
        return c(this, function(a) {
            return [a.key, a.value]
        })
    };
    e.prototype.keys = function() {
        return c(this, function(a) {
            return a.key
        })
    };
    e.prototype.values = function() {
        return c(this, function(a) {
            return a.value
        })
    };
    e.prototype.forEach = function(a, b) {
        for (var c = this.entries(),
                d; !(d = c.next()).done;) d = d.value, a.call(b, d[1], d[0], this)
    };
    e.prototype[Symbol.iterator] = e.prototype.entries;
    var g = 0;
    return e
});
ra("Array.from", function(a) {
    return a ? a : function(a, c, d) {
        fa();
        c = null != c ? c : function(a) {
            return a
        };
        var b = [],
            f = a[Symbol.iterator];
        if ("function" == typeof f)
            for (a = f.call(a); !(f = a.next()).done;) b.push(c.call(d, f.value));
        else {
            f = a.length;
            for (var g = 0; g < f; g++) b.push(c.call(d, a[g]))
        }
        return b
    }
});
var ua = "function" == typeof Object.assign ? Object.assign : function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (d)
            for (var e in d) ta(d, e) && (a[e] = d[e])
    }
    return a
};
ra("Object.assign", function(a) {
    return a || ua
});
ra("Math.trunc", function(a) {
    return a ? a : function(a) {
        a = Number(a);
        if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
        var b = Math.floor(Math.abs(a));
        return 0 > a ? -b : b
    }
});
ra("Array.prototype.fill", function(a) {
    return a ? a : function(a, c, d) {
        var b = this.length || 0;
        0 > c && (c = Math.max(0, b + c));
        if (null == d || d > b) d = b;
        d = Number(d);
        0 > d && (d = Math.max(0, b + d));
        for (c = Number(c || 0); c < d; c++) this[c] = a;
        return this
    }
});
ra("Set", function(a) {
    function b(a) {
        this.g = new Map;
        if (a) {
            a = n(a);
            for (var b; !(b = a.next()).done;) this.add(b.value)
        }
        this.size = this.g.size
    }
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var b = Object.seal({
                        x: 4
                    }),
                    d = new a(n([b]));
                if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({
                        x: 4
                    }) != d || 2 != d.size) return !1;
                var e = d.entries(),
                    f = e.next();
                if (f.done || f.value[0] != b || f.value[1] != b) return !1;
                f = e.next();
                return f.done || f.value[0] == b || 4 != f.value[0].x ||
                    f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (g) {
                return !1
            }
        }()) return a;
    da();
    fa();
    b.prototype.add = function(a) {
        a = 0 === a ? 0 : a;
        this.g.set(a, a);
        this.size = this.g.size;
        return this
    };
    b.prototype.delete = function(a) {
        a = this.g.delete(a);
        this.size = this.g.size;
        return a
    };
    b.prototype.clear = function() {
        this.g.clear();
        this.size = 0
    };
    b.prototype.has = function(a) {
        return this.g.has(a)
    };
    b.prototype.entries = function() {
        return this.g.entries()
    };
    b.prototype.values = function() {
        return this.g.values()
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function(a, b) {
        var c = this;
        this.g.forEach(function(d) {
            return a.call(b, d, d, c)
        })
    };
    return b
});
var va = va || {},
    q = this;

function r(a) {
    return void 0 !== a
}

function t(a) {
    return "string" == typeof a
}

function u(a) {
    return "number" == typeof a
}

function wa(a) {
    a = a.split(".");
    for (var b = q, c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function v() {}

function ya(a) {
    a.Vd = void 0;
    a.H = function() {
        return a.Vd ? a.Vd : a.Vd = new a
    }
}

function za(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
}

function Aa(a) {
    return "array" == za(a)
}

function Ba(a) {
    var b = za(a);
    return "array" == b || "object" == b && "number" == typeof a.length
}

function w(a) {
    return "function" == za(a)
}

function Ca(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
}

function Da(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function Ea(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function Fa(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Fa = Da : Fa = Ea;
    return Fa.apply(null, arguments)
}

function Ga(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
}
var y = Date.now || function() {
    return +new Date
};

function A(a, b) {
    a = a.split(".");
    var c = q;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) !a.length && r(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {}
}

function Ha(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.ac = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.Vn = function(a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
    }
};
q.cast = q.cast || {};
var cast = q.cast;
cast.qg = !1;
cast.platform = {};
cast.platform.metrics = {};
cast.platform.metrics.bd = function() {
    return !(!cast.__platform__ || !cast.__platform__.metrics)
};
cast.platform.metrics.logBoolToUma = function(a, b) {
    cast.platform.metrics.bd() && cast.__platform__.metrics.logBoolToUma(a, b)
};
cast.platform.metrics.logEventToUma = function(a) {
    cast.platform.metrics.bd() && cast.__platform__.metrics.logEventToUma(a)
};
cast.platform.metrics.logHistogramValueToUma = function(a, b, c, d, e) {
    cast.platform.metrics.bd() && cast.__platform__.metrics.logHistogramValueToUma(a, b, c, d, e)
};
cast.platform.metrics.logIntToUma = function(a, b) {
    cast.platform.metrics.bd() && cast.__platform__.metrics.logIntToUma(a, b)
};
cast.platform.metrics.setMplVersion = function(a) {
    cast.platform.metrics.bd() && cast.__platform__.metrics.setMplVersion(a)
};
cast.receiver = {};
cast.receiver.ea = {};
cast.receiver.ea.co = cast.platform.metrics.logEventToUma;
cast.receiver.ea.bo = cast.platform.metrics.logBoolToUma;
cast.receiver.ea.ph = cast.platform.metrics.logIntToUma;
cast.receiver.ea.eo = cast.platform.metrics.logHistogramValueToUma;
cast.receiver.VERSION = "2.0.0";
cast.receiver.Oi = "0063";
cast.receiver.yc = function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return 0 == a.indexOf(b) || 0 == b.indexOf(a)
};

function Ia(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ia);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
}
Ha(Ia, Error);
Ia.prototype.name = "CustomError";

function Ja(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    Ia.call(this, c + a[d])
}
Ha(Ja, Ia);
Ja.prototype.name = "AssertionError";

function Ka(a, b) {
    throw new Ja("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
};
var La = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if (t(a)) return t(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    B = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    },
    Ma = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    } : function(a, b) {
        for (var c =
                a.length, d = [], e = 0, f = t(a) ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var k = f[g];
                b.call(void 0, k, g, a) && (d[e++] = k)
            }
        return d
    },
    Na = Array.prototype.map ? function(a, b) {
        return Array.prototype.map.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = Array(c), e = t(a) ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    },
    Oa = Array.prototype.reduce ? function(a, b, c) {
        return Array.prototype.reduce.call(a, b, c)
    } : function(a, b, c) {
        var d = c;
        B(a, function(c, f) {
            d = b.call(void 0, d, c, f, a)
        });
        return d
    },
    Pa = Array.prototype.some ?
    function(a, b) {
        return Array.prototype.some.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = t(a) ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
        return !1
    };

function Qa(a, b) {
    b = Ra(a, b, void 0);
    return 0 > b ? null : t(a) ? a.charAt(b) : a[b]
}

function Ra(a, b, c) {
    for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
    return -1
}

function Sa(a, b) {
    return 0 <= La(a, b)
}

function Ta(a, b) {
    b = La(a, b);
    var c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c
}

function Ua(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
    }
    return []
}

function Va(a, b, c, d) {
    return Array.prototype.splice.apply(a, Wa(arguments, 1))
}

function Wa(a, b, c) {
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
}

function Xa(a, b) {
    if (!Ba(a) || !Ba(b) || a.length != b.length) return !1;
    for (var c = a.length, d = Ya, e = 0; e < c; e++)
        if (!d(a[e], b[e])) return !1;
    return !0
}

function Ya(a, b) {
    return a === b
};

function Za(a, b) {
    return 0 == $a(b, a.substr(0, b.length))
}

function ab(a, b) {
    return 0 == $a(b, a.substr(a.length - b.length, b.length))
}
var bb = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function $a(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    return a < b ? -1 : a == b ? 0 : 1
}

function cb(a, b) {
    return -1 != a.toLowerCase().indexOf(b.toLowerCase())
}
var db = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
} : function(a, b) {
    return Array(b + 1).join(a)
};

function eb(a, b) {
    a = r(void 0) ? a.toFixed(void 0) : String(a);
    var c = a.indexOf("."); - 1 == c && (c = a.length);
    return db("0", Math.max(0, b - c)) + a
}

function fb(a, b) {
    var c = 0;
    a = bb(String(a)).split(".");
    b = bb(String(b)).split(".");
    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
        var f = a[e] || "",
            g = b[e] || "";
        do {
            f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            if (0 == f[0].length && 0 == g[0].length) break;
            c = gb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || gb(0 == f[2].length, 0 == g[2].length) || gb(f[2], g[2]);
            f = f[3];
            g = g[3]
        } while (0 == c)
    }
    return c
}

function gb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
var hb;
a: {
    var ib = q.navigator;
    if (ib) {
        var jb = ib.userAgent;
        if (jb) {
            hb = jb;
            break a
        }
    }
    hb = ""
}

function C(a) {
    return -1 != hb.indexOf(a)
};

function kb(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
}

function mb(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = d;
    return b
}

function nb(a, b) {
    var c = Ba(b),
        d = c ? b : arguments;
    for (c = c ? 0 : 1; c < d.length; c++) {
        if (null == a) return;
        a = a[d[c]]
    }
    return a
}

function ob(a, b) {
    return null !== a && b in a
}

function pb(a, b) {
    for (var c in a)
        if (a[c] == b) return !0;
    return !1
}

function qb(a) {
    var b = {},
        c;
    for (c in a) b[c] = a[c];
    return b
}

function rb(a) {
    var b = za(a);
    if ("object" == b || "array" == b) {
        if (w(a.clone)) return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a) b[c] = rb(a[c]);
        return b
    }
    return a
}
var sb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function tb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < sb.length; f++) c = sb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function vb(a) {
    vb[" "](a);
    return a
}
vb[" "] = v;

function wb(a, b) {
    try {
        return vb(a[b]), !0
    } catch (c) {}
    return !1
}

function xb(a, b) {
    var c = yb;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var zb = C("Opera"),
    Ab = C("Trident") || C("MSIE"),
    Bb = C("Edge"),
    Cb = C("Gecko") && !(cb(hb, "WebKit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"),
    Db = cb(hb, "WebKit") && !C("Edge");

function Eb() {
    var a = q.document;
    return a ? a.documentMode : void 0
}
var Fb;
a: {
    var Gb = "",
        Hb = function() {
            var a = hb;
            if (Cb) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Bb) return /Edge\/([\d\.]+)/.exec(a);
            if (Ab) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Db) return /WebKit\/(\S+)/.exec(a);
            if (zb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();Hb && (Gb = Hb ? Hb[1] : "");
    if (Ab) {
        var Ib = Eb();
        if (null != Ib && Ib > parseFloat(Gb)) {
            Fb = String(Ib);
            break a
        }
    }
    Fb = Gb
}
var Jb = Fb,
    yb = {};

function Kb(a) {
    return xb(a, function() {
        return 0 <= fb(Jb, a)
    })
}
var Lb;
var Mb = q.document;
Lb = Mb && Ab ? Eb() || ("CSS1Compat" == Mb.compatMode ? parseInt(Jb, 10) : 5) : void 0;
var Nb = Object.freeze || function(a) {
    return a
};

function Ob(a, b, c) {
    this.reset(a, b, c, void 0, void 0)
}
Ob.prototype.g = null;
var Pb = 0;
Ob.prototype.reset = function(a, b, c, d, e) {
    "number" == typeof e || Pb++;
    this.l = d || y();
    this.o = a;
    this.u = b;
    this.h = c;
    delete this.g
};

function Qb(a) {
    this.w = a;
    this.g = this.o = this.h = this.l = null
}

function Rb(a, b) {
    this.name = a;
    this.value = b
}
Rb.prototype.toString = function() {
    return this.name
};
var Sb = new Rb("SHOUT", 1200),
    Tb = new Rb("SEVERE", 1E3),
    Ub = new Rb("WARNING", 900),
    Vb = new Rb("INFO", 800),
    Wb = new Rb("CONFIG", 700),
    Xb = new Rb("FINE", 500),
    Yb = new Rb("FINER", 400),
    Zb = [new Rb("OFF", Infinity), Sb, Tb, Ub, Vb, Wb, Xb, Yb, new Rb("FINEST", 300), new Rb("ALL", 0)],
    $b = null;

function ac(a) {
    if (a.h) return a.h;
    if (a.l) return ac(a.l);
    Ka("Root logger has no level set.");
    return null
}
Qb.prototype.log = function(a, b, c) {
    if (a.value >= ac(this).value)
        for (w(b) && (b = b()), a = new Ob(a, String(b), this.w), c && (a.g = c), c = this; c;) {
            var d = c,
                e = a;
            if (d.g)
                for (var f = 0; b = d.g[f]; f++) b(e);
            c = c.l
        }
};
var bc = {},
    cc = null;

function dc() {
    cc || (cc = new Qb(""), bc[""] = cc, cc.h = Wb)
}

function D(a) {
    dc();
    var b;
    if (!(b = bc[a])) {
        b = new Qb(a);
        var c = a.lastIndexOf("."),
            d = a.substr(c + 1);
        c = D(a.substr(0, c));
        c.o || (c.o = {});
        c.o[d] = b;
        b.l = c;
        bc[a] = b
    }
    return b
};

function ec() {
    this.C = this.C;
    this.w = this.w
}
ec.prototype.C = !1;
ec.prototype.mb = function() {
    return this.C
};
ec.prototype.ia = function() {
    this.C || (this.C = !0, this.da())
};

function fc(a, b) {
    a.C ? r(void 0) ? b.call(void 0) : b() : (a.w || (a.w = []), a.w.push(r(void 0) ? Fa(b, void 0) : b))
}
ec.prototype.da = function() {
    if (this.w)
        for (; this.w.length;) this.w.shift()()
};

function gc(a) {
    a && "function" == typeof a.ia && a.ia()
};

function hc(a, b) {
    this.type = a;
    this.g = this.target = b;
    this.Ih = !0
}
hc.prototype.h = function() {
    this.Ih = !1
};
var ic = !Ab || 9 <= Number(Lb),
    jc = Ab && !Kb("9"),
    kc = function() {
        if (!q.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
        q.addEventListener("test", v, b);
        q.removeEventListener("test", v, b);
        return a
    }();

function lc(a, b) {
    hc.call(this, a ? a.type : "");
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.l = null;
    if (a) {
        var c = this.type = a.type,
            d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.g = b;
        (b = a.relatedTarget) ? Cb && (wb(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b =
            a.toElement);
        this.relatedTarget = b;
        null === d ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
        this.button = a.button;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId ||
            0;
        this.pointerType = t(a.pointerType) ? a.pointerType : mc[a.pointerType] || "";
        this.state = a.state;
        this.l = a;
        a.defaultPrevented && this.h()
    }
}
Ha(lc, hc);
var mc = Nb({
    2: "touch",
    3: "pen",
    4: "mouse"
});
lc.prototype.h = function() {
    lc.ac.h.call(this);
    var a = this.l;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, jc) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
var nc = "closure_listenable_" + (1E6 * Math.random() | 0);

function oc(a) {
    return !(!a || !a[nc])
}
var pc = 0;

function qc(a, b, c, d, e) {
    this.listener = a;
    this.g = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Td = e;
    this.key = ++pc;
    this.Cc = this.Cd = !1
}

function rc(a) {
    a.Cc = !0;
    a.listener = null;
    a.g = null;
    a.src = null;
    a.Td = null
};

function sc(a) {
    this.src = a;
    this.g = {};
    this.h = 0
}
sc.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || (a = this.g[f] = [], this.h++);
    var g = tc(a, b, d, e); - 1 < g ? (b = a[g], c || (b.Cd = !1)) : (b = new qc(b, this.src, f, !!d, e), b.Cd = c, a.push(b));
    return b
};

function uc(a, b) {
    var c = b.type;
    c in a.g && Ta(a.g[c], b) && (rc(b), 0 == a.g[c].length && (delete a.g[c], a.h--))
}
sc.prototype.Sc = function(a, b, c, d) {
    a = this.g[a.toString()];
    var e = -1;
    a && (e = tc(a, b, c, d));
    return -1 < e ? a[e] : null
};

function tc(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Cc && f.listener == b && f.capture == !!c && f.Td == d) return e
    }
    return -1
};
var vc = "closure_lm_" + (1E6 * Math.random() | 0),
    wc = {},
    xc = 0;

function yc(a, b, c, d, e) {
    if (d && d.once) return Ac(a, b, c, d, e);
    if (Aa(b)) {
        for (var f = 0; f < b.length; f++) yc(a, b[f], c, d, e);
        return null
    }
    c = Bc(c);
    return oc(a) ? a.Ka(b, c, Ca(d) ? !!d.capture : !!d, e) : Cc(a, b, c, !1, d, e)
}

function Cc(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = Ca(e) ? !!e.capture : !!e,
        k = Dc(a);
    k || (a[vc] = k = new sc(a));
    c = k.add(b, c, d, g, f);
    if (c.g) return c;
    d = Ec();
    c.g = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) kc || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Fc(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    xc++;
    return c
}

function Ec() {
    var a = Gc,
        b = ic ? function(c) {
            return a.call(b.src, b.listener, c)
        } : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c
        };
    return b
}

function Ac(a, b, c, d, e) {
    if (Aa(b)) {
        for (var f = 0; f < b.length; f++) Ac(a, b[f], c, d, e);
        return null
    }
    c = Bc(c);
    return oc(a) ? a.nh(b, c, Ca(d) ? !!d.capture : !!d, e) : Cc(a, b, c, !0, d, e)
}

function Hc(a, b, c, d, e) {
    if (Aa(b))
        for (var f = 0; f < b.length; f++) Hc(a, b[f], c, d, e);
    else d = Ca(d) ? !!d.capture : !!d, c = Bc(c), oc(a) ? a.td(b, c, d, e) : a && (a = Dc(a)) && (b = a.Sc(b, c, d, e)) && Ic(b)
}

function Ic(a) {
    if (!u(a) && a && !a.Cc) {
        var b = a.src;
        if (oc(b)) uc(b.h, a);
        else {
            var c = a.type,
                d = a.g;
            b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Fc(c), d) : b.addListener && b.removeListener && b.removeListener(d);
            xc--;
            (c = Dc(b)) ? (uc(c, a), 0 == c.h && (c.src = null, b[vc] = null)) : rc(a)
        }
    }
}

function Fc(a) {
    return a in wc ? wc[a] : wc[a] = "on" + a
}

function Jc(a, b, c, d) {
    var e = !0;
    if (a = Dc(a))
        if (b = a.g[b.toString()])
            for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.Cc && (f = Kc(f, d), e = e && !1 !== f)
            }
    return e
}

function Kc(a, b) {
    var c = a.listener,
        d = a.Td || a.src;
    a.Cd && Ic(a);
    return c.call(d, b)
}

function Gc(a, b) {
    if (a.Cc) return !0;
    if (!ic) {
        var c = b || wa("window.event");
        b = new lc(c, this);
        var d = !0;
        if (!(0 > c.keyCode || void 0 != c.returnValue)) {
            a: {
                var e = !1;
                if (0 == c.keyCode) try {
                    c.keyCode = -1;
                    break a
                } catch (g) {
                    e = !0
                }
                if (e || void 0 == c.returnValue) c.returnValue = !0
            }
            c = [];
            for (e = b.g; e; e = e.parentNode) c.push(e);a = a.type;
            for (e = c.length - 1; 0 <= e; e--) {
                b.g = c[e];
                var f = Jc(c[e], a, !0, b);
                d = d && f
            }
            for (e = 0; e < c.length; e++) b.g = c[e],
            f = Jc(c[e], a, !1, b),
            d = d && f
        }
        return d
    }
    return Kc(a, new lc(b, this))
}

function Dc(a) {
    a = a[vc];
    return a instanceof sc ? a : null
}
var Lc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

function Bc(a) {
    if (w(a)) return a;
    a[Lc] || (a[Lc] = function(b) {
        return a.handleEvent(b)
    });
    return a[Lc]
};

function Mc() {
    ec.call(this);
    this.h = new sc(this);
    this.$ = this;
    this.D = null
}
Ha(Mc, ec);
Mc.prototype[nc] = !0;
h = Mc.prototype;
h.se = function(a) {
    this.D = a
};
h.addEventListener = function(a, b, c, d) {
    yc(this, a, b, c, d)
};
h.removeEventListener = function(a, b, c, d) {
    Hc(this, a, b, c, d)
};
h.dispatchEvent = function(a) {
    var b, c = this.D;
    if (c)
        for (b = []; c; c = c.D) b.push(c);
    c = this.$;
    var d = a.type || a;
    if (t(a)) a = new hc(a, c);
    else if (a instanceof hc) a.target = a.target || c;
    else {
        var e = a;
        a = new hc(d, c);
        tb(a, e)
    }
    e = !0;
    if (b)
        for (var f = b.length - 1; 0 <= f; f--) {
            var g = a.g = b[f];
            e = Nc(g, d, !0, a) && e
        }
    g = a.g = c;
    e = Nc(g, d, !0, a) && e;
    e = Nc(g, d, !1, a) && e;
    if (b)
        for (f = 0; f < b.length; f++) g = a.g = b[f], e = Nc(g, d, !1, a) && e;
    return e
};
h.da = function() {
    Mc.ac.da.call(this);
    if (this.h) {
        var a = this.h,
            b = 0,
            c;
        for (c in a.g) {
            for (var d = a.g[c], e = 0; e < d.length; e++) ++b, rc(d[e]);
            delete a.g[c];
            a.h--
        }
    }
    this.D = null
};
h.Ka = function(a, b, c, d) {
    return this.h.add(String(a), b, !1, c, d)
};
h.nh = function(a, b, c, d) {
    return this.h.add(String(a), b, !0, c, d)
};
h.td = function(a, b, c, d) {
    var e = this.h;
    a = String(a).toString();
    if (a in e.g) {
        var f = e.g[a];
        b = tc(f, b, c, d); - 1 < b && (rc(f[b]), Array.prototype.splice.call(f, b, 1), 0 == f.length && (delete e.g[a], e.h--))
    }
};

function Nc(a, b, c, d) {
    b = a.h.g[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.Cc && g.capture == c) {
            var k = g.listener,
                l = g.Td || g.src;
            g.Cd && uc(a.h, g);
            e = !1 !== k.call(l, d) && e
        }
    }
    return e && 0 != d.Ih
}
h.Sc = function(a, b, c, d) {
    return this.h.Sc(String(a), b, c, d)
};

function Oc(a, b, c) {
    a && a.log(b, c, void 0)
}

function E(a, b) {
    a && a.log(Tb, b, void 0)
}

function F(a, b, c) {
    a && a.log(Ub, b, c)
}

function G(a, b) {
    a && a.log(Vb, b, void 0)
}

function Pc(a, b) {
    a && a.log(Xb, b, void 0)
};
D("cast.receiver.CastChannel");

function Qc(a, b) {
    this.l = a;
    this.o = b;
    this.h = 0;
    this.g = null
}
Qc.prototype.get = function() {
    if (0 < this.h) {
        this.h--;
        var a = this.g;
        this.g = a.next;
        a.next = null
    } else a = this.l();
    return a
};

function Rc(a, b) {
    a.o(b);
    100 > a.h && (a.h++, b.next = a.g, a.g = b)
};

function Sc(a) {
    // function b() {
    //     c = 0
    // }
    // var c = 0;
    // return function(d) {
    //     c || (c = q.setTimeout(b, 3E5), a.apply(void 0, arguments))
    // }
};

function Tc(a) {
    q.setTimeout(function() {
        throw a;
    }, 0)
}
var Uc;

function Vc() {
    var a = q.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !C("Presto") && (a = function() {
        var a = document.createElement("IFRAME");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow;
        a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
        a = Fa(function(a) {
            if (("*" == d || a.origin == d) && a.data ==
                c) this.port1.onmessage()
        }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !C("Trident") && !C("MSIE")) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (r(c.next)) {
                c = c.next;
                var a = c.Gg;
                c.Gg = null;
                a()
            }
        };
        return function(a) {
            d.next = {
                Gg: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
        var b = document.createElement("SCRIPT");
        b.onreadystatechange = function() {
            b.onreadystatechange = null;
            b.parentNode.removeChild(b);
            b = null;
            a();
            a = null
        };
        document.documentElement.appendChild(b)
    } : function(a) {
        q.setTimeout(a, 0)
    }
};

function Wc() {
    this.h = this.g = null
}
var Yc = new Qc(function() {
    return new Xc
}, function(a) {
    a.reset()
});
Wc.prototype.add = function(a, b) {
    var c = Yc.get();
    c.set(a, b);
    this.h ? this.h.next = c : this.g = c;
    this.h = c
};

function Zc() {
    var a = $c,
        b = null;
    a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
    return b
}

function Xc() {
    this.next = this.h = this.g = null
}
Xc.prototype.set = function(a, b) {
    this.g = a;
    this.h = b;
    this.next = null
};
Xc.prototype.reset = function() {
    this.next = this.h = this.g = null
};

function ad(a, b) {
    bd || cd();
    dd || (bd(), dd = !0);
    $c.add(a, b)
}
var bd;

function cd() {
    if (q.Promise && q.Promise.resolve) {
        var a = q.Promise.resolve(void 0);
        bd = function() {
            a.then(ed)
        }
    } else bd = function() {
        var a = ed;
        !w(q.setImmediate) || q.Window && q.Window.prototype && !C("Edge") && q.Window.prototype.setImmediate == q.setImmediate ? (Uc || (Uc = Vc()), Uc(a)) : q.setImmediate(a)
    }
}
var dd = !1,
    $c = new Wc;

function ed() {
    for (var a; a = Zc();) {
        try {
            a.g.call(a.h)
        } catch (b) {
            Tc(b)
        }
        Rc(Yc, a)
    }
    dd = !1
};

function fd(a, b) {
    this.g = 0;
    this.A = void 0;
    this.o = this.h = this.l = null;
    this.u = this.w = !1;
    if (a != v) try {
        var c = this;
        a.call(b, function(a) {
            gd(c, 2, a)
        }, function(a) {
            if (!(a instanceof hd)) try {
                if (a instanceof Error) throw a;
                throw Error("Promise rejected.");
            } catch (e) {}
            gd(c, 3, a)
        })
    } catch (d) {
        gd(this, 3, d)
    }
}

function id() {
    this.next = this.context = this.h = this.l = this.g = null;
    this.o = !1
}
id.prototype.reset = function() {
    this.context = this.h = this.l = this.g = null;
    this.o = !1
};
var jd = new Qc(function() {
    return new id
}, function(a) {
    a.reset()
});

function kd(a, b, c) {
    var d = jd.get();
    d.l = a;
    d.h = b;
    d.context = c;
    return d
}

function H(a) {
    if (a instanceof fd) return a;
    var b = new fd(v);
    gd(b, 2, a);
    return b
}

function ld(a) {
    return new fd(function(b, c) {
        c(a)
    })
}

function md(a, b, c) {
    nd(a, b, c, null) || ad(Ga(b, a))
}

function od(a) {
    return new fd(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, g = function(a) {
                    c(a)
                }, k = 0, l; k < a.length; k++) l = a[k], md(l, Ga(f, k), g);
        else b(e)
    })
}

function pd(a) {
    return new fd(function(b) {
        var c = a.length,
            d = [];
        if (c)
            for (var e = function(a, e, f) {
                    c--;
                    d[a] = e ? {
                        Ze: !0,
                        value: f
                    } : {
                        Ze: !1,
                        reason: f
                    };
                    0 == c && b(d)
                }, f = 0, g; f < a.length; f++) g = a[f], md(g, Ga(e, f, !0), Ga(e, f, !1));
        else b(d)
    })
}

function qd() {
    var a, b, c = new fd(function(c, e) {
        a = c;
        b = e
    });
    return new rd(c, a, b)
}
fd.prototype.then = function(a, b, c) {
    return sd(this, w(a) ? a : null, w(b) ? b : null, c)
};
fd.prototype.then = fd.prototype.then;
fd.prototype.$goog_Thenable = !0;

function td(a, b) {
    return sd(a, null, b, void 0)
}
fd.prototype.cancel = function(a) {
    0 == this.g && ad(function() {
        var b = new hd(a);
        ud(this, b)
    }, this)
};

function ud(a, b) {
    if (0 == a.g)
        if (a.l) {
            var c = a.l;
            if (c.h) {
                for (var d = 0, e = null, f = null, g = c.h; g && (g.o || (d++, g.g == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.g && 1 == d ? ud(c, b) : (f ? (d = f, d.next == c.o && (c.o = d), d.next = d.next.next) : vd(c), wd(c, e, 3, b)))
            }
            a.l = null
        } else gd(a, 3, b)
}

function xd(a, b) {
    a.h || 2 != a.g && 3 != a.g || yd(a);
    a.o ? a.o.next = b : a.h = b;
    a.o = b
}

function sd(a, b, c, d) {
    var e = kd(null, null, null);
    e.g = new fd(function(a, g) {
        e.l = b ? function(c) {
            try {
                var e = b.call(d, c);
                a(e)
            } catch (m) {
                g(m)
            }
        } : a;
        e.h = c ? function(b) {
            try {
                var e = c.call(d, b);
                !r(e) && b instanceof hd ? g(b) : a(e)
            } catch (m) {
                g(m)
            }
        } : g
    });
    e.g.l = a;
    xd(a, e);
    return e.g
}
fd.prototype.B = function(a) {
    this.g = 0;
    gd(this, 2, a)
};
fd.prototype.D = function(a) {
    this.g = 0;
    gd(this, 3, a)
};

function gd(a, b, c) {
    0 == a.g && (a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.g = 1, nd(c, a.B, a.D, a) || (a.A = c, a.g = b, a.l = null, yd(a), 3 != b || c instanceof hd || zd(a, c)))
}

function nd(a, b, c, d) {
    if (a instanceof fd) return xd(a, kd(b || v, c || null, d)), !0;
    if (a) try {
        var e = !!a.$goog_Thenable
    } catch (g) {
        e = !1
    } else e = !1;
    if (e) return a.then(b, c, d), !0;
    if (Ca(a)) try {
        var f = a.then;
        if (w(f)) return Ad(a, f, b, c, d), !0
    } catch (g) {
        return c.call(d, g), !0
    }
    return !1
}

function Ad(a, b, c, d, e) {
    function f(a) {
        k || (k = !0, d.call(e, a))
    }

    function g(a) {
        k || (k = !0, c.call(e, a))
    }
    var k = !1;
    try {
        b.call(a, g, f)
    } catch (l) {
        f(l)
    }
}

function yd(a) {
    a.w || (a.w = !0, ad(a.C, a))
}

function vd(a) {
    var b = null;
    a.h && (b = a.h, a.h = b.next, b.next = null);
    a.h || (a.o = null);
    return b
}
fd.prototype.C = function() {
    for (var a; a = vd(this);) wd(this, a, this.g, this.A);
    this.w = !1
};

function wd(a, b, c, d) {
    if (3 == c && b.h && !b.o)
        for (; a && a.u; a = a.l) a.u = !1;
    if (b.g) b.g.l = null, Bd(b, c, d);
    else try {
        b.o ? b.l.call(b.context) : Bd(b, c, d)
    } catch (e) {
        Cd.call(null, e)
    }
    Rc(jd, b)
}

function Bd(a, b, c) {
    2 == b ? a.l.call(a.context, c) : a.h && a.h.call(a.context, c)
}

function zd(a, b) {
    a.u = !0;
    ad(function() {
        a.u && Cd.call(null, b)
    })
}
var Cd = Tc;

function hd(a) {
    Ia.call(this, a)
}
Ha(hd, Ia);
hd.prototype.name = "cancel";

function rd(a, b, c) {
    this.g = a;
    this.resolve = b;
    this.reject = c
};

function Dd(a, b, c) {
    if (w(a)) c && (a = Fa(a, c));
    else if (a && "function" == typeof a.handleEvent) a = Fa(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0)
}

function Ed() {
    var a = null;
    return td(new fd(function(b, c) {
        a = Dd(function() {
            b(void 0)
        }, 3E3); - 1 == a && c(Error("Failed to schedule timer."))
    }), function(b) {
        q.clearTimeout(a);
        throw b;
    })
};

function Fd(a, b) {
    Mc.call(this);
    "object" != typeof a && (a = {
        g: a,
        h: b
    });
    this.o = 0 != a.g;
    this.l = a.h || Gd;
    this.u = a.l || "blob";
    this.g = this.l(this.od)
}
Ha(Fd, Mc);
h = Fd.prototype;
h.Ma = null;
h.kb = null;
h.vc = void 0;
h.Me = !1;
h.od = 0;
h.Ub = null;
h.P = D("goog.net.WebSocket");

function Gd(a) {
    return Math.min(1E3 * Math.pow(2, a), 6E4)
}
h.open = function(a, b) {
    null != this.Ub && q.clearTimeout(this.Ub);
    this.Ub = null;
    this.kb = a;
    (this.vc = b) ? (G(this.P, "Opening the WebSocket on " + this.kb + " with protocol " + this.vc), this.Ma = new WebSocket(this.kb, this.vc)) : (G(this.P, "Opening the WebSocket on " + this.kb), this.Ma = new WebSocket(this.kb));
    this.Ma.binaryType = this.u;
    this.Ma.onopen = Fa(this.jm, this);
    this.Ma.onclose = Fa(this.Rl, this);
    this.Ma.onmessage = Fa(this.gl, this);
    this.Ma.onerror = Fa(this.fl, this)
};
h.close = function() {
    null != this.Ub && q.clearTimeout(this.Ub);
    this.Ub = null;
    this.Ma && (G(this.P, "Closing the WebSocket."), this.Me = !0, this.Ma.close(), this.Ma = null)
};
h.send = function(a) {
    this.Ma.send(a)
};
h.jm = function() {
    G(this.P, "WebSocket opened on " + this.kb);
    this.dispatchEvent("d");
    this.od = 0;
    this.g = this.l(this.od)
};
h.Rl = function(a) {
    G(this.P, "The WebSocket on " + this.kb + " closed.");
    this.dispatchEvent("a");
    this.Ma = null;
    this.Me ? (G(this.P, "The WebSocket closed normally."), this.kb = null, this.vc = void 0) : (E(this.P, "The WebSocket disconnected unexpectedly: " + a.data), this.o && (G(this.P, "Seconds until next reconnect attempt: " + Math.floor(this.g / 1E3)), this.Ub = Dd(Fa(this.open, this, this.kb, this.vc), this.g, this), this.od++, this.g = this.l(this.od)));
    this.Me = !1
};
h.gl = function(a) {
    this.dispatchEvent(new Hd(a.data))
};
h.fl = function(a) {
    a = a.data;
    E(this.P, "An error occurred: " + a);
    this.dispatchEvent(new Id(a))
};
h.da = function() {
    Fd.ac.da.call(this);
    this.close()
};

function Hd(a) {
    hc.call(this, "c");
    this.message = a
}
Ha(Hd, hc);

function Id(a) {
    hc.call(this, "b");
    this.data = a
}
Ha(Id, hc);
cast.receiver.platform = {};
cast.receiver.platform.mg = {
    "port-for-web-server": "8008"
};
cast.receiver.platform.eh = function() {
    return !(!cast.__platform__ || !cast.__platform__.canDisplayType)
};
cast.receiver.platform.canDisplayType = function(a) {
    return cast.__platform__.canDisplayType(a)
};
cast.receiver.platform.setTouchInputSupport = function(a) {
    return w(cast.__platform__.setTouchInputSupport) ? new Promise(function(b) {
        cast.__platform__.setTouchInputSupport(a).then(function() {
            b(!0)
        }, function() {
            b(!1)
        })
    }) : Promise.resolve(a)
};
cast.__platform__ && cast.__platform__.canDisplayType || delete window.cast.receiver.platform.canDisplayType;
cast.receiver.platform.zb = function(a) {
    if (cast.__platform__ && cast.__platform__.queryPlatformValue) return cast.__platform__.queryPlatformValue(a);
    if (a in cast.receiver.platform.mg) return cast.receiver.platform.mg[a]
};
cast.receiver.platform.getHdcpVersion = function() {
    return cast.__platform__ && cast.__platform__.display && cast.__platform__.display.getHdcpVersion ? cast.__platform__.display.getHdcpVersion() : Promise.reject(Error("getHdcpVersion is not available"))
};

function Jd() {
    this.h = new Mc;
    this.g = !1
}
h = Jd.prototype;
h.open = function() {
    this.g ? E(Kd, "PlatformChannel Already open") : cast.__platform__.channel.open(Fa(this.Qj, this), Fa(this.Pj, this))
};
h.close = function() {
    this.g ? cast.__platform__.channel.close(Fa(this.Oj, this)) : E(Kd, "PlatformChannel Cannot close unopened channel")
};
h.send = function(a) {
    cast.__platform__.channel.send(a)
};
h.Qj = function(a) {
    this.g = a;
    Ld(this, a ? "d" : "b")
};
h.Oj = function() {
    this.g && (this.g = !1, Ld(this, "a"))
};
h.Pj = function(a) {
    Ld(this, new Hd(a))
};
h.addEventListener = function(a, b) {
    this.h.Ka(a, b)
};
h.removeEventListener = function(a, b) {
    this.h.td(a, b)
};

function Ld(a, b) {
    b = t(b) ? new hc(b) : b;
    b.target = a;
    a.h.dispatchEvent(b)
}
var Kd = D("cast.receiver.platform.WebSocket");
cast.receiver.ka = {};
cast.receiver.ka.Kc = "urn:x-cast:";
cast.receiver.ka.xd = cast.receiver.ka.Kc + "com.google.cast.system";
cast.receiver.ka.Ki = "1.0";
cast.receiver.ka.tb = "SystemSender";

function Md() {
    this.g = null;
    cast.__platform__ && cast.__platform__.channel ? (G(Nd, "Opening platform websocket"), Od(this, new Jd)) : (G(Nd, "Opening net websocket"), Od(this, new Fd(!0)));
    this.h = new Mc
}

function Od(a, b) {
    a.g && a.g.ia();
    a.g = b;
    a.g.addEventListener("d", a.Jj.bind(a));
    a.g.addEventListener("a", a.Gj.bind(a));
    a.g.addEventListener("b", a.Hj.bind(a));
    a.g.addEventListener("c", a.Ij.bind(a))
}

function Pd(a, b) {
    Pc(Nd, "IpcChannel " + b);
    b = new Qd(cast.receiver.ka.xd, cast.receiver.ka.tb, JSON.stringify({
        type: b
    }));
    b.target = a;
    a.h.dispatchEvent(b)
}
h = Md.prototype;
h.Jj = function() {
    Pd(this, "opened")
};
h.Gj = function() {
    Pd(this, "closed")
};
h.Hj = function() {
    Pd(this, "error")
};
h.Ij = function(a) {
    Pc(Nd, "Received message: " + a.message);
    var b = (a = JSON.parse(a.message)) && a.namespace;
    a && b && a.senderId && a.data ? (a = new Qd(b, a.senderId, a.data), a.target = this, this.h.dispatchEvent(a)) : E(Nd, "IpcChannel Message received is invalid")
};
h.open = function() {
    G(Nd, "Opening message bus websocket");
    this.g.open("ws://localhost:" + cast.receiver.platform.zb("port-for-web-server") + "/v2/ipc")
};
h.close = function() {
    G(Nd, "Closing message bus websocket");
    this.g.close()
};
h.send = function(a, b, c) {
    a = JSON.stringify({
        namespace: a,
        senderId: b,
        data: c
    });
    Pc(Nd, "IPC message sent: " + a);
    this.g.send(a)
};
h.addEventListener = function(a, b) {
    this.h.Ka(a, b)
};
h.removeEventListener = function(a, b) {
    this.h.td(a, b)
};
var Nd = D("cast.receiver.IpcChannel");

function Qd(a, b, c) {
    hc.call(this, a);
    this.senderId = b;
    this.data = c
}
p(Qd, hc);

function Rd(a) {
    return Za(a, "text/") || "application/ttml+xml" === a
}
var Td = /dv(he|av).[s|d|p][e|t|w][n|r|h|b][a|h]?[e|t|w]?/;

function Ud(a) {
    if (!a) return 100;
    switch (a.code) {
        case MediaError.MEDIA_ERR_ABORTED:
            return 101;
        case MediaError.MEDIA_ERR_NETWORK:
            return 103;
        case MediaError.MEDIA_ERR_DECODE:
            return 102;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            return 104;
        default:
            return 100
    }
};
cast.receiver.media = {};
cast.receiver.media.Oa = cast.receiver.ka.Kc + "com.google.cast.media";
var Vd = {
    INVALID_PLAYER_STATE: "INVALID_PLAYER_STATE",
    LOAD_FAILED: "LOAD_FAILED",
    LOAD_CANCELLED: "LOAD_CANCELLED",
    INVALID_REQUEST: "INVALID_REQUEST",
    ERROR: "ERROR"
};

function Wd() {
    this.contentId = "";
    this.contentUrl = void 0;
    this.streamType = "NONE";
    this.contentType = "";
    this.vmapAdsRequest = this.hlsVideoSegmentFormat = this.hlsSegmentFormat = this.breakClips = this.breaks = this.customData = this.textTrackStyle = this.tracks = this.startAbsoluteTime = this.duration = this.entity = this.metadata = void 0
}

function Xd() {
    this.repeatMode = this.description = this.name = this.queueType = this.entity = this.id = void 0;
    this.shuffle = !1;
    this.containerMetadata = this.startTime = this.startIndex = this.items = void 0
}

function Yd() {
    this.muted = this.level = void 0
}

function Zd(a, b, c) {
    this.width = a;
    this.height = b;
    this.hdrType = c
}

function $d(a) {
    this.playerState = "LOADING";
    this.media = a
}

function ae(a, b) {
    this.trackId = a;
    this.trackContentType = this.trackContentId = void 0;
    this.type = b;
    this.customData = this.subtype = this.language = this.name = void 0
}

function be() {
    this.textTrackStyle = this.language = this.activeTrackIds = this.tracks = void 0
}

function ce() {
    this.type = "QUEUE_CHANGE";
    this.sequenceNumber = this.insertBefore = this.itemIds = this.changeType = this.requestId = void 0
}

function de() {
    this.type = "QUEUE_ITEMS";
    this.items = this.requestId = void 0
}

function ee() {
    this.type = "QUEUE_ITEM_IDS";
    this.itemIds = this.requestId = void 0
}
A("cast.receiver.media.repeatMode", {
    REPEAT_OFF: "REPEAT_OFF",
    REPEAT_ALL: "REPEAT_ALL",
    REPEAT_SINGLE: "REPEAT_SINGLE",
    REPEAT_ALL_AND_SHUFFLE: "REPEAT_ALL_AND_SHUFFLE"
});
cast.receiver.media.ih = function(a) {
    return "REPEAT_OFF" == a || "REPEAT_ALL" == a || "REPEAT_SINGLE" == a || "REPEAT_ALL_AND_SHUFFLE" == a
};

function fe(a, b) {
    this.currentBreakTime = a;
    this.currentBreakClipTime = b;
    this.whenSkippable = this.breakClipId = this.breakId = void 0
};

function ge(a, b, c, d) {
    ec.call(this);
    this.h = a;
    this.A = b;
    this.B = !1;
    this.G = [];
    this.o = d || "STRING";
    this.u = new Mc;
    this.l = null;
    this.D = this.sk;
    this.J = this.Tj;
    this.g = {};
    a = n(c);
    for (b = a.next(); !b.done; b = a.next()) this.g[b.value] = null;
    this.F = this.Bh.bind(this);
    this.A.addEventListener(this.h, this.F)
}
p(ge, ec);

function he(a, b, c, d) {
    a.Bh(new Qd(b, c, d))
}
h = ge.prototype;
h.Bh = function(a) {
    Oc(ie, Yb, "Dispatching CastMessageBus message");
    var b = "STRING" == this.o ? a.data : this.J(a.data);
    je(this, new ke(a.senderId, a.senderId, b));
    a = new ke("message", a.senderId, b);
    this.l && this.l(a);
    je(this, a)
};
h.send = function(a, b) {
    this.B || this.h == cast.receiver.ka.xd || F(ie, "Application should not send requests before the system is ready (they will be ignored)");
    je(this, new ke("send", a, b));
    for (var c = n(this.G), d = c.next(); !d.done; d = c.next())
        if (d = d.value, d(a, this.h, b)) return;
    if ("STRING" == this.o) {
        if (!t(b)) throw Error("Wrong argument, CastMessageBus type is STRING");
        this.A.send(this.h, a, b)
    } else this.A.send(this.h, a, this.D(b))
};
h.sk = function(a) {
    if ("JSON" != this.o) throw Error("Unexpected message type for JSON serialization");
    return this.h === cast.receiver.media.Oa ? JSON.stringify(a, function(a, c) {
        return null === c ? void 0 : c
    }) : JSON.stringify(a)
};
h.Tj = function(a) {
    if ("JSON" != this.o) throw Error("Unexpected message type for JSON serialization");
    return JSON.parse(a)
};
h.da = function() {
    ec.prototype.da.call(this);
    this.A.removeEventListener(this.h, this.F);
    this.u.ia();
    for (var a in this.g) this.g[a] && this.g[a].close();
    this.g = {};
    Oc(ie, Yb, "Disposed " + ("CastMessageBus[" + this.h + "]"))
};

function le(a, b) {
    a.G.push(b)
}
h.addEventListener = function(a, b) {
    yc(this.u, a, b)
};
h.removeEventListener = function(a, b) {
    Hc(this.u, a, b)
};

function je(a, b) {
    b.target = a;
    return a.u.dispatchEvent(b)
}
h.dispatchEvent = function(a) {
    return je(this, a)
};
var ie = D("cast.receiver.CastMessageBus");

function ke(a, b, c) {
    hc.call(this, a);
    this.senderId = b;
    this.data = c
}
p(ke, hc);
cast.receiver.wb = {};
cast.receiver.wb.Hb = cast.receiver.ka.Kc + "com.google.cast.cac";
cast.receiver.Qb = {};
cast.receiver.Qb.Hi = cast.receiver.ka.Kc + "com.google.cast.inject";
cast.receiver.Qb.wd = "__inject__";

function me(a, b) {
    this.h = {};
    this.g = [];
    this.l = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else if (a)
        if (a instanceof me)
            for (c = a.hb(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
        else
            for (d in a) this.set(d, a[d])
}
h = me.prototype;
h.Sa = function() {
    ne(this);
    for (var a = [], b = 0; b < this.g.length; b++) a.push(this.h[this.g[b]]);
    return a
};
h.hb = function() {
    ne(this);
    return this.g.concat()
};

function oe(a, b) {
    pe(a.h, b) && (delete a.h[b], a.l--, a.g.length > 2 * a.l && ne(a))
}

function ne(a) {
    if (a.l != a.g.length) {
        for (var b = 0, c = 0; b < a.g.length;) {
            var d = a.g[b];
            pe(a.h, d) && (a.g[c++] = d);
            b++
        }
        a.g.length = c
    }
    if (a.l != a.g.length) {
        var e = {};
        for (c = b = 0; b < a.g.length;) d = a.g[b], pe(e, d) || (a.g[c++] = d, e[d] = 1), b++;
        a.g.length = c
    }
}
h.get = function(a, b) {
    return pe(this.h, a) ? this.h[a] : b
};
h.set = function(a, b) {
    pe(this.h, a) || (this.l++, this.g.push(a));
    this.h[a] = b
};
h.forEach = function(a, b) {
    for (var c = this.hb(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
h.clone = function() {
    return new me(this)
};

function pe(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};

function qe() {
    this.l = re.H();
    this.u = 0;
    this.h = null;
    this.g = new me;
    this.A = this.C.bind(this);
    this.o = se(this.l, cast.receiver.Qb.Hi, "JSON");
    this.o.l = this.w.bind(this);
    for (var a = n([cast.receiver.wb.Hb, cast.receiver.media.Oa]), b = a.next(); !b.done; b = a.next())(b = this.l.g[b.value] || null) && le(b, this.A)
}
qe.prototype.w = function(a) {
    var b = this,
        c = a.data,
        d = c.requestId,
        e = a.senderId;
    if ("WRAPPED" != c.type) te(this, "Unsupported message type " + c.type, e, d);
    else {
        a = JSON.parse(c.data);
        c = a.namespace;
        var f = this.l.g[c] || null;
        if (f) {
            var g = !1;
            if (c == cast.receiver.wb.Hb) a.data.requestId = d, g = !0;
            else if (c == cast.receiver.media.Oa) {
                var k = a.data;
                k.requestId = d;
                k.mediaSessionId = this.u
            } else {
                te(this, "Unsupported namespace " + c, e, d);
                return
            }
            this.g.set(d, e);
            try {
                this.h = null, he(f, c, cast.receiver.Qb.wd, JSON.stringify(a.data))
            } catch (m) {
                throw oe(this.g,
                    d), te(this, "Injecting " + a.data + " failed with " + m, e, d), m;
            }
            if (!g) {
                var l = function() {
                    return b.h ? (oe(b.g, d), te(b, "Error " + JSON.stringify(b.h), e, d, "WRAPPED_ERROR", b.h), !0) : !1
                };
                l() || setTimeout(function() {
                    l() || (oe(b.g, d), ue(b, e, d))
                }, 5)
            }
        } else te(this, "Unregistered namespace " + c, e, d, "WRAPPED_ERROR", {
            type: "ERROR",
            code: "UNREGISTERED_NAMESPACE"
        })
    }
};
qe.prototype.C = function(a, b, c) {
    if (b == cast.receiver.media.Oa && "STRING" == (this.l.g[b] || null).o) try {
        c = JSON.parse(c)
    } catch (e) {
        return E(ve, "Parse failed: " + c), !1
    }
    var d = c.type;
    b == cast.receiver.media.Oa && "MEDIA_STATUS" == d && c.status && c.status[0] && (this.u = c.status[0].mediaSessionId);
    if (a != cast.receiver.Qb.wd) return !1;
    a = c.requestId;
    if (!r(a)) return F(ve, "No requestId in " + c), !0;
    if (b == cast.receiver.media.Oa) {
        switch (d) {
            case "INVALID_REQUEST":
            case "INVALID_PLAYER_STATE":
                b = c.reason, this.h = {
                    type: "ERROR",
                    code: b ? b : d
                }
        }
        return !0
    }
    d = this.g.get(a);
    if (!d) return E(ve, "Request not found " + a), !0;
    oe(this.g, a);
    if (b != cast.receiver.wb.Hb) return E(ve, "Unsupported namespace " + b), !0;
    b = c;
    switch (b.type) {
        case "SUCCESS":
            ue(this, d, a, Object.getOwnPropertyNames(c).some(function(a) {
                return "type" != a && "requestId" != a && r(c[a])
            }) ? JSON.stringify(c) : void 0);
            break;
        case "ERROR":
            te(this, "Wrapped error", d, a, "WRAPPED_ERROR", b);
            break;
        default:
            te(this, "Unknown message type " + c, d, a)
    }
    return !0
};

function te(a, b, c, d, e, f) {
    E(ve, b);
    a.o.send(c, new we(d, e || "INJECT_ERROR", r(f) ? JSON.stringify(f) : void 0))
}

function ue(a, b, c, d) {
    a.o.send(b, new xe(c, d))
}
ya(qe);
var ve = D("cast.receiver.InjectManager");

function ye(a, b, c) {
    this.type = a;
    this.requestId = b;
    this.data = c
}

function xe(a, b) {
    ye.call(this, "SUCCESS", a, b)
}
p(xe, ye);

function we(a, b, c) {
    ye.call(this, "ERROR", a, c);
    this.code = b
}
p(we, ye);

function ze() {
    this.g = y()
}
var Ae = null;
ze.prototype.set = function(a) {
    this.g = a
};
ze.prototype.reset = function() {
    this.set(y())
};
ze.prototype.get = function() {
    return this.g
};

function Be(a) {
    this.o = a || "";
    Ae || (Ae = new ze);
    this.u = Ae
}
Be.prototype.g = !0;
Be.prototype.h = !0;
Be.prototype.l = !1;

function Ce(a) {
    return 10 > a ? "0" + a : String(a)
}

function De(a, b) {
    a = (a.l - b) / 1E3;
    b = a.toFixed(3);
    var c = 0;
    if (1 > a) c = 2;
    else
        for (; 100 > a;) c++, a *= 10;
    for (; 0 < c--;) b = " " + b;
    return b
}

function Ee(a) {
    Be.call(this, a)
}
Ha(Ee, Be);

function Fe() {
    this.u = Fa(this.l, this);
    this.g = new Ee;
    this.g.h = !1;
    this.g.l = !1;
    this.h = this.g.g = !1;
    this.o = {}
}

function Ge() {
    var a = He;
    if (1 != a.h) {
        dc();
        var b = cc;
        var c = a.u;
        b.g || (b.g = []);
        b.g.push(c);
        a.h = !0
    }
}
Fe.prototype.l = function(a) {
    if (!this.o[a.h]) {
        var b = this.g;
        var c = [];
        c.push(b.o, " ");
        if (b.h) {
            var d = new Date(a.l);
            c.push("[", Ce(d.getFullYear() - 2E3) + Ce(d.getMonth() + 1) + Ce(d.getDate()) + " " + Ce(d.getHours()) + ":" + Ce(d.getMinutes()) + ":" + Ce(d.getSeconds()) + "." + Ce(Math.floor(d.getMilliseconds() / 10)), "] ")
        }
        c.push("[", De(a, b.u.get()), "s] ");
        c.push("[", a.h, "] ");
        c.push(a.u);
        b.l && (d = a.g) && c.push("\n", d instanceof Error ? d.message : d.toString());
        b.g && c.push("\n");
        b = c.join("");
        if (c = Ie) switch (a.o) {
            case Sb:
                Je(c, "info",
                    b);
                break;
            case Tb:
                Je(c, "error", b);
                break;
            case Ub:
                Je(c, "warn", b);
                break;
            default:
                Je(c, "log", b)
        }
    }
};
var He = null,
    Ie = q.console;

function Je(a, b, c) {
    if (a[b]) a[b](c);
    else a.log(c)
};

function re() {
    ec.call(this);
    He || (He = new Fe);
    He && Ge();
    this.h = qb(Ke);
    this.M = !1;
    this.G = new Md;
    this.l = {};
    this.F = new Mc;
    this.u = new ge(cast.receiver.ka.xd, this.G, mb(this.l), "JSON");
    fc(this, Ga(gc, this.u));
    this.o = this.L = null;
    this.X = !1;
    this.B = this.D = null;
    this.J = !0;
    this.A = "notstarted";
    this.ha = null;
    this.g = {};
    this.N = this.V = this.T = this.O = null;
    this.$ = !1;
    this.u.addEventListener(cast.receiver.ka.tb, this.vm.bind(this));
    yc(window, "unload", this.If, !1, this);
    yc(document, "visibilitychange", this.yh, !1, this);
    Oc(Le, Sb, "Version: " +
        cast.receiver.VERSION + "." + cast.receiver.Oi);
    Me && Me(this);
    this.ca = qd();
    this.ga = qd()
}
p(re, ec);

function Ne(a) {
    var b = a.toLocaleLowerCase();
    return ["com.vizio.vue", "com.vizio.smartcast"].some(function(a) {
        return b.includes(a)
    })
}
h = re.prototype;
h.start = function(a) {
    if (a) {
        if (!a) throw Error("Cannot validate undefined config.");
        if (void 0 != a.maxInactivity && 5 > a.maxInactivity) throw Error("config.maxInactivity must be greater than or equal to 5 seconds.");
        tb(this.h, a || {})
    }
    this.h.versionCode && 0 <= this.h.versionCode && (Number.isInteger(this.h.versionCode) ? (cast.receiver.ea.ph("Cast.Receiver.VersionCode", this.h.versionCode), G(Le, "App Version " + this.h.versionCode)) : E(Le, "Receiver versionCode needs to be an integer"));
    qe.H();
    this.$ || Oe(this, !1);
    this.X = !0;
    this.G.open()
};
h.stop = function() {
    this.ia();
    window.close()
};
h.wc = function() {
    return "ready" == this.A
};
h.getSenders = function() {
    return mb(this.l)
};
h.Qd = function(a) {
    return this.l[a] ? qb(this.l[a]) : null
};
h.jf = function() {
    return null == this.D ? this.B ? "notvisible" : "unknown" : this.D ? "visible" : "notvisible"
};
h.ff = function() {
    return null == this.B ? this.D ? "notstandby" : "unknown" : this.B ? "standby" : "notstandby"
};
h.Rd = function() {
    "notstarted" == this.A && (this.A = /[&?]google_cast_bg=true(&|$)/.test(window.location.search) ? "startinginbackground" : "starting");
    return this.A
};
h.Pc = function() {
    return this.L
};
h.Rc = function() {
    return this.o
};
h.qd = function(a) {
    this.wc() ? Pe(this, a) : this.h.statusText != a && (this.h.statusText = a, this.M = !0)
};
h.ag = function(a) {
    if (0 > a || 1 < a) throw Error("Invalid level value");
    this.u.send(cast.receiver.ka.tb, {
        type: "setvolume",
        level: a
    })
};
h.bg = function(a) {
    this.u.send(cast.receiver.ka.tb, {
        type: "setvolume",
        muted: a
    })
};
h.Wc = function() {
    return this.ha
};

function Pe(a, b, c) {
    var d = {
        type: "setappstate"
    };
    void 0 != b && (d.statusText = b);
    void 0 != c && (d.dialData = c);
    a.u.send(cast.receiver.ka.tb, d)
}
h.qe = function(a) {
    this.u.send(cast.receiver.ka.tb, {
        type: "startheartbeat",
        maxInactivity: a
    })
};

function se(a, b, c) {
    if (b == cast.receiver.ka.xd) throw Error("Protected namespace");
    if (0 != b.lastIndexOf(cast.receiver.ka.Kc, 0)) throw Error("Invalid namespace prefix");
    if (!a.g[b]) {
        if (a.X) throw Error("New namespaces can not be requested after start has been called");
        a.g[b] = new ge(b, a.G, mb(a.l), c);
        fc(a, Ga(gc, a.g[b]))
    }
    if (c && a.g[b].o != c) throw Error("Invalid messageType for the namespace");
    return a.g[b]
}
h.ne = function(a) {
    this.u.send(cast.receiver.ka.tb, {
        type: "sendfeedbackmessage",
        message: a
    })
};
h.vm = function(a) {
    a = a.data;
    switch (a.type) {
        case "opened":
            G(Le, "Underlying message bus is open");
            var b = mb(this.g),
                c = this.h.statusText;
            a = this.h.tk;
            var d = {
                type: "ready"
            };
            c && (d.statusText = c);
            a && (d.dialData = a);
            d.activeNamespaces = b;
            d.version = cast.receiver.VERSION;
            d.messagesVersion = cast.receiver.ka.Ki;
            this.u.send(cast.receiver.ka.tb, d);
            this.h.maxInactivity && this.qe(this.h.maxInactivity);
            break;
        case "closed":
            this.If();
            break;
        case "error":
            Qe(this, new Re("error", null));
            break;
        case "ready":
            b = a.launchingSenderId;
            c =
                mb(this.g);
            this.K = a.version;
            this.J = !Se(this);
            var e = a.deviceCapabilities;
            this.o = e ? qb(e) : {};
            cast.receiver.platform.eh() && (this.o.hasOwnProperty("is_hdr_supported") || (this.o.is_hdr_supported = cast.receiver.platform.canDisplayType("video/mp4; codecs=hev1.2.4.L153.B0; eotf=smpte2084")), this.o.hasOwnProperty("is_dv_supported") || (this.o.is_dv_supported = cast.receiver.platform.canDisplayType("video/mp4; codecs=dvhe.04.06")));
            this.L = {
                id: a.applicationId,
                name: a.applicationName,
                iconUrl: a.iconUrl,
                sessionId: a.sessionId,
                namespaces: c,
                launchingSenderId: b
            };
            this.A = "ready";
            for (d in this.g) this.g[d].B = !0;
            this.ca.resolve();
            this.M && (this.M = !1, Pe(this, this.h.statusText, this.h.tk));
            G(Le, "Dispatching CastReceiverManager system ready event");
            b = new Te(this.L);
            this.O && this.O(b);
            Qe(this, b);
            break;
        case "senderconnected":
            b = {
                id: a.senderId,
                userAgent: a.userAgent
            };
            if (Ne(b.id)) G(Le, "Ignored connection from " + b.id);
            else {
                G(Le, "Dispatching CastReceiverManager sender connected event [" + b.id + "]");
                ob(this.l, b.id) && E(Le, "Unexpected connected message for already connected sender: " +
                    b.id);
                this.l[b.id] = b;
                a = new Ue(b.id, b.userAgent);
                for (c in this.g) d = this.g[c], e = b.id, ob(d.g, e) ? E(ie, "Unexpected sender already registered [" + d.h + ", " + e + "]") : (G(ie, "Registering sender [" + d.h + ", " + e + "]"), d.g[e] = null);
                Qe(this, a)
            }
            break;
        case "senderdisconnected":
            c = a.senderId;
            a = a.reason;
            if (Ne(c)) G(Le, "Ignored disconnection from " + c);
            else {
                switch (a) {
                    case "closed_by_peer":
                        a = "requested_by_sender";
                        break;
                    case "transport_invalid_message":
                        a = "error";
                        break;
                    default:
                        a = "unknown"
                }
                G(Le, "Dispatching sender disconnected event [" +
                    c + "] Reason: " + a);
                if (ob(this.l, c)) {
                    d = this.l[c].userAgent;
                    delete this.l[c];
                    a = new Ve(c, d, a);
                    for (b in this.g) d = this.g[b], e = c, ob(d.g, e) && (G(ie, "Unregistering sender [" + d.h + ", " + e + "]"), d.g[e] && d.g[e].close(), delete d.g[e]);
                    Qe(this, qb(a));
                    this.T && this.T(a)
                } else E(Le, "Unknown sender disconnected: " + c)
            }
            break;
        case "volumechanged":
            this.ha = b = {
                level: a.level,
                muted: a.muted
            };
            G(Le, "Dispatching system volume changed event [" + b.level + ", " + b.muted + "]");
            Qe(this, new We(b));
            break;
        case "visibilitychanged":
            this.J || (b = a.visible,
                Xe(this, r(b) ? b : null));
            break;
        case "standbychanged":
            this.J || (b = a.standby, b = r(b) ? b : null, b != this.B && (G(Le, "Dispatching standby changed event " + b), this.B = b, Qe(this, new Ye(1 == b))));
            break;
        case "maxvideoresolutionchanged":
            b = a.height;
            G(Le, "Dispatching maxvideoresolutionchanged " + b);
            Qe(this, new Ze(b));
            break;
        case "hdroutputtypechanged":
            this.N && this.N(a.hdrType);
            break;
        case "screenresolutionchanged":
            break;
        case "feedbackstarted":
            G(Le, "Dispatching feedback started event");
            this.ne("");
            break;
        default:
            throw Error("Unexpected message type: " +
                a.type);
    }
};
h.canDisplayType = function(a, b, c, d, e) {
    if (!cast.receiver.platform.eh()) return !0;
    if (!Za(a, "video/") && !Za(a, "audio/")) throw Error("Not video or audio types.");
    b && (a += "; codecs=" + b);
    c && d && (a += "; width=" + c + "; height=" + d);
    e && (a += "; framerate=" + e);
    if (c = b) a: for (c = !1, b = b.split(","), d = 0; d < b.length; d++) {
        if (b[d].match(Td)) {
            c = !1;
            break a
        }
        0 === b[d].indexOf("hev1.2") && (c = !0)
    }
    c && (a += "; eotf=smpte2084");
    return cast.receiver.platform.canDisplayType(a)
};

function Xe(a, b) {
    b == a.D ? G(Le, "Ignoring visibility changed event, state is already " + b) : (G(Le, "Dispatching visibility changed event " + b), a.D = b, b = new $e(0 != b), a.V && a.V(b), Qe(a, b))
}
h.yh = function() {
    this.J && Xe(this, "visible" == document.visibilityState)
};
h.If = function() {
    G(Le, "Dispatching shutdown event");
    this.Rd();
    this.A = "startinginbackground" == this.A ? "stoppinginbackground" : "stopping";
    for (var a in this.g) this.g[a].B = !1;
    Qe(this, new af)
};

function Oe(a, b) {
    cast.receiver.platform.setTouchInputSupport(b).then(function(c) {
        a.ga.resolve(c && b)
    });
    a.$ = !0
}

function bf(a) {
    var b = qd();
    a.ca.g.then(function() {
        a.o && a.o.touch_input_supported ? b.resolve(!0) : b.resolve(!1)
    });
    return b.g
}

function cf(a) {
    var b = qd();
    bf(a).then(function(c) {
        a.ga.g.then(function(a) {
            b.resolve(c && a)
        })
    });
    return b.g
}

function Se(a) {
    if (!a.K) return E(Le, "No System Version"), !1;
    var b = ["1", "11"];
    if (!b.length) return E(Le, "Version provided is not valid: 1.11"), !1;
    var c = a.K.split(".");
    if (!c.length) return E(Le, "System Version format is not valid " + a.K), !1;
    for (var d = 0; d < b.length; d++) {
        var e = parseInt(b[d], 10);
        if (isNaN(e)) return E(Le, "Version is not numeric: 1.11"), !1;
        var f = c.length > d ? parseInt(c[d], 10) : 0;
        if (isNaN(f)) return E(Le, "System Version is not numeric: " + a.K), !1;
        if (e > f) return !1
    }
    return !0
}
h.da = function() {
    this.G.close();
    ec.prototype.da.call(this);
    window && Hc(window, "unload", this.If, !1, this);
    document && Hc(document, "visibilitychange", this.yh, !1, this);
    this.F.ia();
    delete re.Vd;
    Pc(Le, "Disposed CastReceiverManager")
};
h.addEventListener = function(a, b) {
    yc(this.F, a, b)
};
h.removeEventListener = function(a, b) {
    Hc(this.F, a, b)
};

function Qe(a, b) {
    b.target = a;
    var c = !1;
    try {
        c = a.F.dispatchEvent(b)
    } catch (d) {
        window.setTimeout(function() {
            throw d;
        }, 0)
    }
    return c
}
h.dispatchEvent = function(a) {
    return Qe(this, a)
};
ya(re);
re.getInstance = re.H;
var Me = null,
    Le = D("cast.receiver.CastReceiverManager");

function Re(a, b) {
    hc.call(this, a);
    this.data = b
}
p(Re, hc);

function Ve(a, b, c) {
    Re.call(this, "senderdisconnected", a);
    this.senderId = a;
    this.userAgent = b;
    this.reason = c
}
p(Ve, Re);

function Ue(a, b) {
    Re.call(this, "senderconnected", a);
    this.senderId = a;
    this.userAgent = b
}
p(Ue, Re);

function $e(a) {
    Re.call(this, "visibilitychanged", a);
    this.isVisible = a
}
p($e, Re);

function Ye(a) {
    Re.call(this, "standbychanged", null);
    this.isStandby = a
}
p(Ye, Re);

function We(a) {
    Re.call(this, "systemvolumechanged", a);
    this.data = a
}
p(We, Re);

function Te(a) {
    Re.call(this, "ready", a);
    this.data = a
}
p(Te, Re);

function af() {
    Re.call(this, "shutdown", null)
}
p(af, Re);

function Ze(a) {
    Re.call(this, "maxvideoresolutionchanged", null);
    this.height = a
}
p(Ze, Re);
var Ke = {
    maxInactivity: 10
};

function df() {
    this.g = re.H();
    this.h = se(this.g, "urn:x-cast:com.google.cast.broadcast", "JSON");
    this.h.l = this.l.bind(this)
}
df.prototype.l = function(a) {
    if (this.g.wc()) F(ef, "Ignoring broadcast request, system is ready.");
    else {
        a = a.data;
        var b = a.type;
        if ("APPLICATION_BROADCAST" != b) E(ef, "Ignoring message type: " + b);
        else if (b = a.g) {
            var c = this.g.g[b] || null;
            if (c) switch (b) {
                case cast.receiver.media.Oa:
                    var d = JSON.parse(a.message);
                    if ("PRECACHE" != d.type) {
                        E(ef, "Unsupported type for media namespace: " + d.type);
                        break
                    }
                    he(c, b, "__broadcast__", a.message);
                    break;
                default:
                    E(ef, "Unsupported namespace: " + a.g)
            } else E(ef, "Invalid message bus for namespace: " +
                b)
        } else E(ef, "Missing namespace: " + b)
    }
};
ya(df);
var ef = D("cast.receiver.BroadcastManager");
cast.receiver.R = {};

function ff(a) {
    this.element = a
}

function gf(a, b) {
    a.element.setAttribute("aria-disabled", String(b))
}

function hf(a, b, c) {
    c = void 0 === c ? null : c;
    var d = document.createElement("img");
    d.className = "btn";
    c && d.classList.add(c);
    d.src = "";
    d.alt = b;
    d.setAttribute("role", "button");
    d.addEventListener("click", a);
    return d
};

function jf() {
    this.h = this.B = this.A = this.C = this.D = this.o = this.u = null;
    this.w = re.H();
    this.g = se(this.w, kf, "JSON");
    this.g.l = this.F.bind(this);
    this.l = new me
}
jf.prototype.F = function(a) {
    var b = a.data,
        c = b.type;
    a = a.senderId;
    switch (c) {
        case "SET_CREDENTIALS":
            lf(this, b.forRequestId, b);
            var d = this.u;
            break;
        case "LOAD_BY_ENTITY":
            d = this.o;
            break;
        case "USER_ACTION":
            d = this.D;
            break;
        case "DISPLAY_STATUS":
            d = this.C;
            break;
        case "CUSTOM_COMMAND":
            d = this.A;
            break;
        case "FOCUS_STATE":
            (d = this.B) && this.w.Rc().focus_state_supported && d(b);
            return;
        case "SUCCESS":
        case "ERROR":
            lf(this, b.requestId, b);
            return;
        default:
            mf(this, "Unsupported event " + c, a, b, "INVALID_REQUEST");
            return
    }
    d ? nf(this, a,
        b, d) : mf(this, "Handler for " + c + " not implemented", a, b, "INVALID_COMMAND")
};

function nf(a, b, c, d) {
    H().then(function() {
        return d(c)
    }).then(function(d) {
        a: if (d) {
            switch (d.type) {
                case "SUCCESS":
                case "ERROR":
                    d.requestId = c.requestId;
                    break a
            }
            d = of ("Invalid response data " + JSON.stringify(d), c, "APP_ERROR")
        } else d = of ("No response data", c, "APP_ERROR");
        "ERROR" === d.type && a.h && a.h(d);a.g.send(b, d)
    }, function(d) {
        mf(a, "Got a rejected promise " + JSON.stringify(d), b, c, "APP_ERROR")
    })
}

function of (a, b, c) {
    E(pf, a);
    a = new qf(c);
    a.requestId = b.requestId;
    return a
}

function mf(a, b, c, d, e) {
    var f = of (b, d, e);
    a.h && a.h(f);
    a.g.send(c, of (b, d, e))
}
jf.prototype.Lf = function(a, b) {
    var c = this,
        d = this.w.Rc();
    if (d && !0 === d.display_supported) return Promise.resolve(new qf("NOT_SUPPORTED"));
    d = y();
    if (pe(this.l.h, d)) return Promise.reject(Error("Duplicate request"));
    var e = new rf(a, b);
    e.requestId = d;
    return new Promise(function(a) {
        c.l.set(e.requestId, a);
        c.g.send("system-0", e)
    })
};
jf.prototype.Pf = function() {
    var a = this,
        b = y(),
        c = new sf;
    c.requestId = b;
    return new Promise(function(b) {
        a.l.set(c.requestId, b);
        a.g.send("system-0", c)
    })
};

function lf(a, b, c) {
    if (b) {
        var d = a.l.get(b);
        d ? (oe(a.l, b), d(c)) : F(pf, "No matching request for response " + JSON.stringify(c))
    }
}
ya(jf);
jf.getInstance = jf.H;
var kf = cast.receiver.wb.Hb,
    pf = D("cast.receiver.CommandAndControlManager");

function tf(a) {
    this.type = a
}

function sf() {
    this.type = "REFRESH_CREDENTIALS"
}
p(sf, tf);

function rf(a, b) {
    this.type = "PLAY_STRING";
    this.stringId = a;
    this.arguments = b
}
p(rf, tf);

function uf() {
    this.type = "USER_ACTION"
}
p(uf, tf);

function vf(a) {
    this.type = a
}
p(vf, tf);

function wf(a) {
    this.type = "SUCCESS";
    this.status = a
}
p(wf, vf);

function qf(a, b) {
    this.type = "ERROR";
    this.code = a;
    this.reason = b
}
p(qf, vf);
var xf = /#(.)(.)(.)(.)/;

function yf(a) {
    if (!zf.test(a)) throw Error("'" + a + "' is not a valid alpha hex color");
    5 == a.length && (a = a.replace(xf, "#$1$1$2$2$3$3$4$4"));
    a = a.toLowerCase();
    return [parseInt(a.substr(1, 2), 16), parseInt(a.substr(3, 2), 16), parseInt(a.substr(5, 2), 16), parseInt(a.substr(7, 2), 16) / 255]
}
var zf = /^#(?:[0-9a-f]{4}){1,2}$/i;

function Af(a) {
    var b = a.slice(0);
    b[3] = Math.round(1E3 * a[3]) / 1E3;
    return "rgba(" + b.join(",") + ")"
};

function Bf(a, b, c, d) {
    ec.call(this);
    this.g = a;
    this.l = this.o = null;
    for (a = this.g; a.parentNode;) a = a.parentNode;
    this.B = 0 > a.toString().toLowerCase().indexOf("shadow") ? document.head : a;
    this.h = [];
    this.A = !1;
    this.u = "cast-captions-" + Math.floor(1E6 * Math.random()).toString();
    this.F = "[" + this.u + '="true"]::cue ';
    this.G = new RegExp(/^[\.'":%,;\s\-0-9a-z]+$/i);
    this.D = void 0;
    Cf(this, b);
    d && Df(this, d);
    Ef(this, c)
}
p(Bf, ec);

function Ff(a, b) {
    a = n(a.h);
    for (var c = a.next(); !c.done; c = a.next()) {
        c = c.value;
        var d = c.track;
        b(c) ? d.mode = "showing" : (d.mode = "showing", d.mode = "disabled")
    }
}

function Gf(a) {
    return a.h.map(function(a) {
        return parseInt(a.id, 10)
    })
}

function Ef(a, b) {
    Ff(a, function(a) {
        return Sa(b, parseInt(a.id, 10))
    })
}

function Hf(a, b) {
    Ff(a, function(a) {
        return cast.receiver.yc(b, a.srclang)
    })
}

function If(a) {
    var b = [];
    a = n(a.h);
    for (var c = a.next(); !c.done; c = a.next()) c = c.value, "showing" == c.track.mode && b.push(parseInt(c.id, 10));
    return b
}

function Cf(a, b) {
    b = n(b);
    for (var c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        var d = c.trackContentId;
        if ("TEXT" == c.type && d) {
            var e = c.trackContentType;
            if (ab(d, "vtt") || r(e) && 0 == $a(e, "text/vtt")) d = document.createElement("track"), d.src = c.trackContentId, d.id = c.trackId, d.label = c.name, d.srclang = c.language, d.kind = (c.subtype || "CAPTIONS").toLowerCase(), a.h.push(d)
        }
    }
    Jf(a);
    b = n(a.h);
    for (c = b.next(); !c.done; c = b.next()) c = c.value, a.g.contains(c) || a.g.appendChild(c)
}

function Kf(a) {
    a.l && (a.g.removeAttribute(a.u), a.B.removeChild(a.l), a.o = null)
}

function Lf(a) {
    a.A && (a.g.removeAttribute("crossorigin"), a.A = !1)
}

function Mf(a, b, c) {
    1 == c || a.G.test(b) ? a.o.insertRule(a.F + "{ " + b + " }", a.o.cssRules.length) : F(Nf, "Invalid css cue: " + b)
}

function Jf(a) {
    Kf(a);
    Lf(a);
    var b = document.createElement("style");
    b.type = "text/css";
    a.B.appendChild(b);
    b.appendChild(document.createTextNode(""));
    a.l = b;
    a.o = a.l.sheet;
    Mf(a, "font-size: 4.1vh;");
    Mf(a, "font-family: monospace;");
    Mf(a, "font-style: normal;");
    Mf(a, "font-weight: normal;");
    Mf(a, "background-color: black;");
    Mf(a, "color: white;");
    a.g.setAttribute(a.u, !0);
    0 < a.h.length && !a.g.getAttribute("crossorigin") && (a.g.setAttribute("crossorigin", "anonymous"), a.A = !0)
}

function Of(a, b) {
    try {
        var c = Af(yf(a))
    } catch (d) {
        F(Nf, "Invalid color: " + a)
    }
    if (c) switch (a = "rgba(204, 204, 204, " + parseInt(a.substring(7, 9), 16) + ")", b) {
        case "OUTLINE":
            return "text-shadow: 0 0 4px " + c + ", 0 0 4px " + c + ", 0 0 4px " + c + ", 0 0 4px " + c + ";";
        case "DROP_SHADOW":
            return "text-shadow: 0px 2px 3px " + c + ", 0px 2px 4px " + c + ", 0px 2px 5px " + c + ";";
        case "RAISED":
            return "text-shadow: 1px 1px " + c + ", 2px 2px " + c + ", 3px 3px " + c + ";";
        case "DEPRESSED":
            return "text-shadow: 1px 1px " + a + ", 0 1px " + a + ", -1px -1px " + c + ", 0 -1px " +
                c + ";"
    }
    return ""
}

function Pf(a) {
    switch (a) {
        case "BOLD":
            return "font-weight: bold;";
        case "BOLD_ITALIC":
            return "font-style: italic; font-weight: bold;";
        case "ITALIC":
            return "font-style: italic;"
    }
    return "font-style: normal;"
}

function Df(a, b) {
    a.D = b;
    if (r(b.foregroundColor)) try {
        var c = Af(yf(b.foregroundColor));
        Mf(a, "color: " + c + ";", !0)
    } catch (k) {
        F(Nf, "Invalid color: " + b.foregroundColor)
    }
    if (r(b.backgroundColor)) try {
        var d = Af(yf(b.backgroundColor));
        Mf(a, "background-color: " + d + ";", !0)
    } catch (k) {
        F(Nf, "Invalid color: " + b.backgroundColor)
    }
    r(b.fontScale) && Mf(a, "font-size: " + 100 * b.fontScale + "%;");
    if (r(b.fontFamily) || r(b.fontGenericFamily)) {
        c = b.fontFamily;
        d = b.fontGenericFamily;
        var e = "font-family: ",
            f = "";
        r(c) && (e += '"' + c + '"', f = ", ");
        if (r(d)) {
            switch (d) {
                case "SANS_SERIF":
                    var g =
                        '"Droid Sans", sans-serif';
                    break;
                case "MONOSPACED_SANS_SERIF":
                    g = '"Droid Sans Mono", monospace';
                    break;
                case "SERIF":
                    g = '"Droid Serif", serif';
                    break;
                case "MONOSPACED_SERIF":
                    g = '"Cutive Mono", serif-monospace';
                    break;
                case "CASUAL":
                    g = '"Short Stack", casual';
                    break;
                case "CURSIVE":
                    g = "Quintessential, cursive";
                    break;
                case "SMALL_CAPITALS":
                    g = '"Alegreya Sans SC", sans-serif-smallcaps'
            }
            e += f + g
        }
        Mf(a, e + ";")
    }
    r(b.fontStyle) && Mf(a, Pf(b.fontStyle));
    r(b.edgeType) && (g = r(b.foregroundColor) ? b.foregroundColor : "#FFFFFFFF", b = r(b.edgeColor) ?
        Of(b.edgeColor, b.edgeType) : Of(g, b.edgeType), Mf(a, b, !0))
}
Bf.prototype.Nb = function() {
    return this.D
};
Bf.prototype.rb = function(a) {
    Jf(this);
    Df(this, a)
};
Bf.prototype.da = function() {
    ec.prototype.da.call(this);
    for (var a = n(this.h), b = a.next(); !b.done; b = a.next()) this.g.removeChild(b.value);
    this.h.length = 0;
    Kf(this);
    Lf(this);
    Oc(Nf, Yb, "Disposed TextTracksManager")
};
var Nf = D("cast.receiver.TextTracksManager");

function Qf(a) {
    this.P = I;
    this.g = a;
    this.F = this.B = this.D = v;
    this.u = 0;
    this.o = this.A = null;
    this.G = 0;
    this.l = this.h = null;
    this.w = !1;
    this.C = !0;
    yc(this.g, "error", this.Ej, !1, this);
    yc(this.g, "ended", this.Eg, !1, this);
    yc(this.g, "loadedmetadata", this.Fj, !1, this);
    G(this.P, "Using default Player")
}
h = Qf.prototype;
h.Fg = function(a, b, c, d) {
    Rf(this);
    this.C = a;
    this.u = b;
    this.G = d || 0;
    this.o = c || null
};
h.Ej = function(a) {
    Rf(this);
    this.D(a)
};
h.Eg = function() {
    Rf(this);
    this.B()
};
h.Fj = function() {
    this.h && this.l && Ef(this.h, this.l);
    this.F()
};
h.registerErrorCallback = function(a) {
    this.D = a
};
h.registerEndedCallback = function(a) {
    this.B = a
};
h.registerLoadCallback = function(a) {
    this.F = a
};
h.unregisterErrorCallback = function() {
    this.D = v
};
h.unregisterEndedCallback = function() {
    this.B = v
};
h.unregisterLoadCallback = function() {
    this.F = v
};

function Sf(a) {
    var b = a.g.duration;
    if (isNaN(b) || null == a.o) return b;
    if (null != a.A) return a.A;
    a.A = 0 <= a.o ? Math.min(a.G + a.o, b) : Math.max(b + a.o, a.u);
    return a.A
}

function Rf(a) {
    null != a.o && (Hc(a.g, "timeupdate", a.zh, !1, a), a.A = null, a.o = null)
}
h.zh = function() {
    Tf(this)
};

function Tf(a) {
    if (null == a.o) return !1;
    var b = Sf(a);
    return isNaN(b) ? !1 : a.g.currentTime >= b ? (a.Eg(), !0) : !1
}
h.load = function(a, b, c, d, e, f) {
    this.h && (this.h.ia(), this.h = null);
    this.w = !1;
    d && d.tracks && this.g && (this.h && this.h.ia(), this.h = new Bf(this.g, d.tracks, d.activeTrackIds || [], d.textTrackStyle || null), d.language && Hf(this.h, d.language));
    null != this.o && yc(this.g, "timeupdate", this.zh, !1, this);
    e || (this.u = c && 0 < c ? c : 0, G(this.P, "Load - contentId: " + a + " autoplay: " + b + " time: " + this.u), this.g.autoplay = !1, a && (this.g.src = a), this.g.autoplay = b, this.g.load(), r(f) && (this.g.playbackRate = f))
};
h.reset = function() {
    this.w = !1;
    this.h && (this.h.ia(), this.h = null);
    this.l = null;
    this.g.removeAttribute("src");
    this.u = 0;
    this.g.load();
    Rf(this)
};
h.play = function() {
    this.w = !1;
    this.g.play()
};
h.seek = function(a, b) {
    this.g.currentTime != a && (this.g.currentTime = a);
    Tf(this) || ("PLAYBACK_START" == b && this.g.paused ? this.g.play() : "PLAYBACK_PAUSE" != b || this.g.paused || this.g.pause())
};
h.Yb = function(a) {
    return this.g.playbackRate = a
};
h.pause = function() {
    this.w = !0;
    this.g.pause()
};
h.getState = function() {
    null == this.C && (this.C = this.g.autoplay);
    return this.g.paused || isNaN(this.g.duration) ? this.g.duration && (this.g.currentTime || 0 == this.g.currentTime) && this.g.currentTime < Sf(this) ? this.g.currentTime == this.u && this.C && !this.w ? "BUFFERING" : "PAUSED" : "IDLE" : "PLAYING"
};
h.getCurrentTimeSec = function() {
    var a = Sf(this);
    return isNaN(a) ? this.g.currentTime : this.g.currentTime < a ? this.g.currentTime : a
};
h.getDurationSec = function() {
    return Sf(this)
};
h.getVolume = function() {
    return {
        level: this.g.volume,
        muted: this.g.muted
    }
};
h.setVolume = function(a) {
    r(a.level) && (this.g.volume = a.level);
    r(a.muted) && (this.g.muted = a.muted)
};
h.editTracksInfo = function(a) {
    this.h && (a.textTrackStyle && this.h.rb(a.textTrackStyle), a.language ? Hf(this.h, a.language) : a.activeTrackIds && Ef(this.h, a.activeTrackIds));
    Uf(this, a.activeTrackIds);
    return this.l
};

function Uf(a, b) {
    a.l = b ? b.slice(0) : a.l;
    a.l = a.l || [];
    if (a.h) {
        var c = Gf(a.h);
        a.l = a.l.filter(function(a) {
            return !c.includes(a)
        }).concat(If(a.h))
    }
    0 == a.l.length && (a.l = null)
};

function Vf(a) {
    this.itemId = a;
    this.customData = this.activeTrackIds = this.preloadTime = this.playbackDuration = this.startTime = this.autoplay = this.media = void 0
}

function Wf(a, b) {
    var c = new Vf(a.itemId);
    c.autoplay = a.autoplay;
    c.startTime = a.startTime;
    c.playbackDuration = a.playbackDuration;
    c.preloadTime = a.preloadTime;
    c.activeTrackIds = a.activeTrackIds;
    c.customData = a.customData;
    if (void 0 === b || b) c.media = a.media;
    return c
}

function Xf(a) {
    this.g = void 0;
    this.o = "REPEAT_OFF";
    this.A = this.h = 0;
    this.u = this.l = void 0;
    this.C = a;
    this.w = 1
}
h = Xf.prototype;
h.$f = function(a) {
    this.l = a
};

function Yf(a, b) {
    if (a.l) return Promise.resolve(a.l.initialize(b)).then(function(c) {
        c ? Zf(a, c, !0, !0) : $f(a, b)
    });
    $f(a, b)
}

function $f(a, b) {
    var c = b.queueData;
    c && c.items ? Zf(a, c) : (c = new Vf(a.C()), c.media = b.media, c.autoplay = b.autoplay, c.activeTrackIds = b.activeTrackIds, c.customData = b.customData, a.g = [c])
}

function Zf(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    ag(a, b, void 0 === c ? !1 : c) || F(bg, "The passed in queueData is not completely valid: " + b);
    a.u = b;
    d && b.items && cg(b.items);
    a.g = b.items;
    a.o = b.repeatMode || a.o;
    a.h = b.startIndex || 0;
    a.A = b.startTime || 0
}

function cg(a) {
    a = n(a);
    for (var b = a.next(); !b.done; b = a.next()) b = b.value, b.preloadTime = null != b.preloadTime ? b.preloadTime : 0
}
h.fetchItems = function(a, b, c, d) {
    var e = this,
        f = void 0,
        g = dg(this, b);
    this.l ? 0 < c && 0 < d ? f = "Queue operations only support expanding the front or back." : 0 > g && (f = "Reference item id is not in current queue.") : f = "Fetch items is only supported with an external queue.";
    if (f) return F(bg, f), Promise.reject(f);
    0 < c ? (f = this.g.length - 1, c -= f - g, b = this.g[f].itemId) : 0 < d && (d -= g, b = this.g[0].itemId);
    var k = new ce;
    k.requestId = a;
    return 0 >= c && 0 >= d ? (k.changeType = "NO_CHANGE", k.sequenceNumber = this.w - 1, Promise.resolve(k)) : Promise.resolve(this.l.fetchItems(b,
        c, d)).then(function(a) {
        if (a && 0 != a.length) {
            var d = 0 < c ? void 0 : b;
            eg(e, a, d);
            k.changeType = "INSERT";
            k.itemIds = a.map(function(a) {
                return a.itemId
            });
            k.insertBefore = d;
            k.sequenceNumber = e.w++
        } else k.changeType = "NO_CHANGE", k.sequenceNumber = e.w - 1;
        return k
    })
};

function fg(a, b, c) {
    var d = new de;
    d.requestId = b;
    d.items = [];
    if (a.g)
        for (b = n(c), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            for (var e = n(a.g), f = e.next(); !f.done; f = e.next())
                if (f = f.value, f.itemId == c) {
                    d.items.push(f);
                    break
                }
            F(bg, "Unknown item id: " + c)
        }
    return d
}

function gg(a, b) {
    var c = new ee;
    c.requestId = b;
    c.itemIds = a.Mb().map(function(a) {
        return a.itemId
    });
    return c
}

function hg(a, b) {
    return new Promise(function(c, d) {
        var e = void 0,
            f = a.h + b;
        0 <= f && f < a.g.length ? (e = new ce, e.changeType = "NO_CHANGE", c(e)) : (f = 0 > a.h ? void 0 : a.g[a.h].itemId, 1 == b ? e = a.l.nextItems.bind(a.l, f) : -1 == b ? e = a.l.prevItems.bind(a.l, f) : 1 < b ? e = a.l.fetchItems.bind(a.l, f, b, 0) : -1 > b ? e = a.l.fetchItems.bind(a.l, f, 0, -b) : d("Should not be requesting more items on the current item"), Promise.resolve(e()).then(function(d) {
            cg(d);
            var e = new ce;
            if (0 < d.length) {
                G(bg, "Fetched more items " + d);
                var f = 0 <= b ? void 0 : a.g[0].itemId;
                eg(a, d, f);
                e.changeType = "INSERT";
                e.itemIds = d.map(function(a) {
                    return a.itemId
                });
                e.insertBefore = f;
                e.sequenceNumber = a.w++
            } else e.changeType = "NO_CHANGE", e.sequenceNumber = a.w - 1;
            c(e)
        }, function() {
            return d("Failed to get more items from the queue.")
        }))
    })
}

function ig(a) {
    a.g = void 0;
    a.o = "REPEAT_OFF";
    a.h = 0;
    a.A = 0
}
h.Mb = function(a, b) {
    a = void 0 === a ? !0 : a;
    b = void 0 === b ? !1 : b;
    var c = [],
        d = this.g.length;
    d = b && this.h < d - 1 ? this.h + 1 : d - 1;
    for (b = b && 0 < this.h ? this.h - 1 : 0; b <= d; b++) c.push(a ? this.g[b] : Wf(this.g[b], a));
    return c
};
h.yb = function() {
    return !this.g || 0 > this.h ? null : this.g[this.h]
};
h.Ld = function() {
    return this.h
};

function jg(a, b) {
    a.o = b;
    a.u && (a.u.repeatMode = b)
}
h.gg = function(a) {
    for (var b = 0; b < a.length; b++)
        for (var c = 0; c < this.g.length; c++) a[b].itemId == this.g[c].itemId && (this.g[c] = a[b])
};

function kg(a, b) {
    for (var c = [], d = 0; d < b.length; d++)
        for (var e = 0; e < a.g.length; e++)
            if (b[d] == a.g[e].itemId) {
                c.push(b[d]);
                break
            }
    return c
}

function lg(a) {
    return "REPEAT_ALL_AND_SHUFFLE" == a.o
}

function dg(a, b) {
    for (var c = 0; c < a.g.length; c++)
        if (b == a.g[c].itemId) return c;
    return -1
}

function mg(a) {
    return "REPEAT_ALL_AND_SHUFFLE" == a.o || "REPEAT_ALL" == a.o
}
h.reset = function() {
    this.h = -1
};

function ng(a, b) {
    b = dg(a, b);
    if (-1 == b || a.h == b) return !1;
    og(a, b);
    return !0
}

function pg(a, b, c) {
    if (!qg(a, "reorderItems") && b && 0 != b.length) {
        var d = a.g[a.h].itemId,
            e = r(c) ? c : -1;
        c = a.g.length - b.length;
        for (var f = [], g = -1 == e ? !0 : !1, k = 0; k < a.g.length; k++) Sa(b, a.g[k].itemId) ? g || a.g[k].itemId != b[0] || (c = f.length) : (f.push(a.g[k]), e == a.g[k].itemId && (c = f.length - 1, g = !0));
        e = [];
        for (g = 0; g < b.length; g++) {
            a: {
                for (k = 0; k < a.g.length; k++)
                    if (b[g] == a.g[k].itemId) {
                        k = a.g[k];
                        break a
                    }
                k = null
            }
            e.push(k)
        }
        Ga(Va, f, c, 0).apply(null, e);
        a.g = f;
        r(d) && ng(a, d)
    }
}
h.sf = function(a, b, c) {
    return eg(this, a, b, c)
};

function eg(a, b, c, d) {
    for (var e = n(b), f = e.next(); !f.done; f = e.next()) f = f.value, u(f.itemId) || (f.itemId = a.C());
    e = u(c) ? dg(a, c) : a.g.length;
    e = -1 == e ? a.g.length : e;
    Ga(Va, a.g, e, 0).apply(null, b);
    r(d) ? a.h = e + d : a.h >= e && (a.h += b.length);
    if (a.l) a.l.onItemsInserted(b, c);
    return b.map(function(a) {
        return a.itemId
    })
}
h.Qf = function(a) {
    for (var b = !1, c = 0; c < a.length; c++)
        for (var d = 0; d < this.g.length; d++)
            if (a[c] == this.g[d].itemId) {
                this.g.splice(d, 1);
                this.h == d ? b = !0 : this.h > d && this.h--;
                break
            }
    this.h >= this.g.length && (this.h = mg(this) ? 0 : -1, lg(this) && 0 == this.h && rg(this));
    if (this.l) this.l.onItemsRemoved(a);
    return b
};

function qg(a, b) {
    return a.l ? (b && F(bg, b + " not supported when external queue is provided."), !0) : !1
}

function sg(a, b, c) {
    if (0 > a.h) return "QUEUE_ENDED";
    b = a.h + b;
    var d = !1;
    b >= a.g.length ? (b = mg(a) ? b % a.g.length : -1, d = !0) : 0 > b && (b = mg(a) ? a.g.length + (b + 1) % a.g.length - 1 : 0, d = !0);
    c && og(a, b);
    return -1 == b ? "QUEUE_ENDED" : d ? lg(a) ? (rg(a), "QUEUE_SHUFFLED") : "QUEUE_LOOP" : "QUEUE_ACTIVE"
}
h.shuffle = function() {
    var a = this;
    if (this.l) return Promise.resolve(this.l.shuffle()).then(function(b) {
        b && (a.g = b)
    });
    rg(this);
    return Promise.resolve()
};

function rg(a) {
    var b = a.g.length;
    if (!(3 > a.g.length))
        for (a.u && (a.u.shuffle = !0); 0 < b;) {
            var c = Math.floor(Math.random() * b);
            --b;
            var d = a.g[c];
            a.g[c] = a.g[b];
            a.g[b] = d
        }
}

function ag(a, b, c) {
    c = void 0 === c ? !1 : c;
    if (r(b.startIndex) && (!u(b.startIndex) || 0 > b.startIndex)) return E(bg, "Invalid startIndex " + b.startIndex), !1;
    var d = (b.startIndex || 0) + 1;
    if (!b.items || b.items.length < d) return E(bg, "Invalid number of items"), !1;
    if (b.repeatMode && !cast.receiver.media.ih(b.repeatMode)) return E(bg, "Invalid repeatMode"), !1;
    for (d = 0; d < b.items.length; d++)
        if (b.items[d].media) {
            if (!c && r(b.items[d].itemId)) return E(bg, "ItemId should not be defined, element at index: " + d), !1;
            b.items[d].itemId = u(b.items[d].itemId) ?
                b.items[d].itemId : a.C()
        } else return E(bg, "Media is mandatory, missing in element at index: " + d), !1;
    return !0
}

function og(a, b) {
    a.h = b;
    if (a.l && 0 <= b && b < a.g.length) a.l.onCurrentItemIdChanged(a.g[b].itemId)
}

function tg(a) {
    return a.l && a.g && 0 < a.g.length && a.h == a.g.length - 1 ? hg(a, 1) : Promise.reject("No need to prefetch more for now.")
}
var bg = D("cast.receiver.MediaQueue");
cast.receiver.sb = {};
var L = {},
    ug = (L.LOAD = "Cast.Receiver.Message.LOAD", L.GET_STATUS = "Cast.Receiver.Message.GET_STATUS", L.LOAD = "Cast.Receiver.Message.LOAD", L.PAUSE = "Cast.Receiver.Message.PAUSE", L.STOP = "Cast.Receiver.Message.STOP", L.SKIP_AD = "Cast.Receiver.Message.SKIP_AD", L.PLAY = "Cast.Receiver.Message.PLAY", L.PLAY_AGAIN = "Cast.Receiver.Message.PLAY_AGAIN", L.SEEK = "Cast.Receiver.Message.SEEK", L.SET_PLAYBACK_RATE = "Cast.Receiver.Message.SET_PLAYBACK_RATE", L.SET_VOLUME = "Cast.Receiver.Message.SET_VOLUME", L.EDIT_TRACKS_INFO = "Cast.Receiver.Message.EDIT_TRACKS_INFO",
        L.EDIT_AUDIO_TRACKS = "Cast.Receiver.Message.EDIT_AUDIO_TRACKS", L.PRELOAD = "Cast.Receiver.Message.PRELOAD", L.CANCEL_PRELOAD = "Cast.Receiver.Message.CANCEL_PRELOAD", L.PRECACHE = "Cast.Receiver.Message.PRECACHE", L.QUEUE_LOAD = "Cast.Receiver.Message.QUEUE_LOAD", L.QUEUE_INSERT = "Cast.Receiver.Message.QUEUE_INSERT", L.QUEUE_UPDATE = "Cast.Receiver.Message.QUEUE_UPDATE", L.QUEUE_REMOVE = "Cast.Receiver.Message.QUEUE_REMOVE", L.QUEUE_REORDER = "Cast.Receiver.Message.QUEUE_REORDER", L.QUEUE_NEXT = "Cast.Receiver.Message.QUEUE_NEXT",
        L.QUEUE_PREV = "Cast.Receiver.Message.QUEUE_PREV", L.QUEUE_GET_ITEM_RANGE = "Cast.Receiver.Message.QUEUE_GET_ITEM_RANGE", L.QUEUE_GET_ITEMS = "Cast.Receiver.Message.QUEUE_GET_ITEMS", L.QUEUE_GET_ITEM_IDS = "Cast.Receiver.Message.QUEUE_GET_ITEM_IDS", L.QUEUE_SHUFFLE = "Cast.Receiver.Message.QUEUE_SHUFFLE", L.SET_CREDENTIALS = "Cast.Receiver.Message.SET_CREDENTIALS", L.LOAD_BY_ENTITY = "Cast.Receiver.Message.LOAD_BY_ENTITY", L.USER_ACTION = "Cast.Receiver.Message.USER_ACTION", L.DISPLAY_STATUS = "Cast.Receiver.Message.DISPLAY_STATUS",
        L.CUSTOM_COMMAND = "Cast.Receiver.Message.CUSTOM_COMMAND", L),
    vg = "local";
cast.receiver.sb.Fm = function(a) {
    vg = a
};
cast.receiver.sb.xf = function(a, b) {
    a = ug[a];
    b = b == vg ? 2 : "__touch_controls__" == b ? 3 : b == cast.receiver.Qb.wd ? 4 : 1;
    a && cast.receiver.ea.ph(a, b)
};
cast.receiver.sb.bn = function() {
    var a = re.H(),
        b = a.g[cast.receiver.media.Oa] || null;
    b && b.addEventListener("message", function(a) {
        a.data && a.data.type && cast.receiver.sb.xf(a.data.type, a.senderId)
    });
    (a = a.g[cast.receiver.wb.Hb] || null) && a.addEventListener("message", function(a) {
        a.data && a.data.type && cast.receiver.sb.xf(a.data.type, a.senderId)
    })
};
re.H().addEventListener("ready", cast.receiver.sb.bn);

function wg(a) {
    var b = this;
    this.l = a;
    this.g = null;
    this.h = "sdr";
    this.o = function() {
        b.l()
    }
}

function xg(a) {
    return a.g ? a.g.videoWidth : 0
}

function yg(a) {
    return a.g ? a.g.videoHeight : 0
};

function zg(a) {
    return !!a && "function" === typeof a.then
};

function Ag() {
    this.g = [];
    this.h = []
}

function Bg(a) {
    0 == a.g.length && (a.g = a.h, a.g.reverse(), a.h = []);
    return a.g.pop()
}

function Cg(a) {
    return 0 == a.g.length && 0 == a.h.length
}
Ag.prototype.contains = function(a) {
    return Sa(this.g, a) || Sa(this.h, a)
};
Ag.prototype.Sa = function() {
    for (var a = [], b = this.g.length - 1; 0 <= b; --b) a.push(this.g[b]);
    var c = this.h.length;
    for (b = 0; b < c; ++b) a.push(this.h[b]);
    return a
};

function Dg(a, b, c) {
    var d = this,
        e = re.H();
    df.H();
    this.N = c || "local";
    cast.receiver.sb.Fm(this.N);
    this.u = se(e, cast.receiver.media.Oa, "JSON");
    this.C = 0;
    this.V = this.D = null;
    this.F = 1;
    this.eb = b || 15;
    this.lh = this.jc = this.K = this.B = this.g = this.l = null;
    this.A = !1;
    this.w = this.o = null;
    this.ca = !0;
    this.T = null;
    this.Aa = this.Kj.bind(this);
    this.h = new Xf(this.Pg.bind(this));
    this.O = !1;
    this.G = null;
    this.Bl = 1;
    this.pa = -1;
    this.ga = new Ag;
    this.L = !1;
    this.J = [];
    this.Re = this.Sj;
    this.Ca = null;
    this.gd = this.ck;
    this.Ua = this.gk;
    this.jh = this.fk;
    this.Va = this.mk;
    this.nd = null;
    this.ge = this.nk;
    this.Ta = this.ek;
    this.ie = this.rk;
    this.he = this.pk;
    this.$d = this.Vj;
    this.Zd = this.Uj;
    this.de = this.jk;
    this.ce = this.ik;
    this.md = this.Ig;
    this.ee = this.kk;
    this.fe = this.lk;
    this.Gf = this.dk;
    this.hh = this.bk;
    this.Na = this.Wj;
    this.ha = this.hk;
    this.kc = v;
    this.vb = this.Xj;
    this.$ = this.hd = v;
    this.ld = this.kd = null;
    this.Kg = this.Yj;
    this.Og = this.Zj;
    this.Yg = this.$j;
    this.kh = this.qk;
    this.Ke = this.fd = null;
    this.ae = this.ak;
    this.X = new wg(this.W.bind(this, !1));
    e.N = function(a) {
        var b = d.X;
        b.h = a;
        b.l()
    };
    this.Ba = new Mc;
    this.fc = this.Zh = this.M = !1;
    this.qb(a);
    this.u.l = this.Ff.bind(this);
    this.T = Dd(this.Aa, 1E3)
}
h = Dg.prototype;
h.Pg = function() {
    return this.Bl++
};
h.Tc = function() {
    return this.g ? this.g.media || null : null
};

function Eg(a) {
    return r(a.h.g) ? a.h : null
}
h.re = function(a, b, c) {
    b = !r(b) || b;
    if (c && !b) throw Error("No broadcast call but status customData has been provided");
    this.g && (this.g.media = a);
    b && this.W(!0, null, c)
};
h.tc = function() {
    return this.eb
};
h.rd = function(a, b) {
    this.eb = a;
    (void 0 === b || b) && this.W(!1)
};
h.De = function(a) {
    this.rd(a | this.tc())
};
h.Rf = function(a) {
    this.rd(~a & this.tc())
};

function Fg(a) {
    for (var b = 0; b < a.length; b++)
        if (!r(a[b].trackId) || !r(a[b].type)) return !1;
    return !0
}

function Gg(a, b) {
    if (!b || 0 == b.length) return !0;
    if (!a || b.length > a.length) return E(I, "Too many track IDs"), !1;
    for (var c = 0, d = 0, e = 0; e < b.length; e++) {
        for (var f = !1, g = 0; g < a.length; g++)
            if (b[e] == a[g].trackId) {
                f = !0;
                break
            }
        if (!f) return E(I, "Track ID does not exist: " + b[e]), !1;
        "AUDIO" == a[g].type ? d++ : "VIDEO" == a[g].type && c++;
        if (1 < d || 1 < c) return E(I, "Maximum one active video and one active audio track supported"), !1
    }
    return !0
}
h.ab = function(a) {
    Hg(this, this.N, a)
};

function Hg(a, b, c) {
    c.mediaSessionId = a.C;
    cast.receiver.sb.xf(c.type, b);
    a.Ff(new ke("message", b, c))
}
h.Ff = function(a) {
    var b = a.data,
        c = b.type;
    if (!this.L || Cg(this.ga) && "LOAD" == c) {
        a = a.senderId;
        var d = b.type;
        var e = b.requestId;
        if (u(e) && e == Math.floor(e)) {
            var f = !1;
            void 0 != b.mediaSessionId && b.mediaSessionId != this.C ? (E(I, "Invalid media session ID: " + b.mediaSessionId + "  does not match the expected ID: " + this.C), f = !0) : "LOAD" != d && "PLAY_AGAIN" != d && "GET_STATUS" != d && "QUEUE_LOAD" != d && "PRECACHE" != d && (r(b.mediaSessionId) ? "IDLE" == Ig(this) && (E(I, "Unexpected command, player is in IDLE state so the media session ID is not valid yet"),
                f = !0) : (E(I, "Invalid media session ID, it is undefined"), f = !0));
            f ? (this.Ha(a, e, "INVALID_REQUEST", "INVALID_MEDIA_SESSION_ID"), d = !1) : (Oc(I, Yb, "MediaManager message received"), d = !0)
        } else E(I, "Ignoring request, requestId is not an integer: " + e), d = !1;
        if (d) {
            d = b.requestId;
            e = null;
            switch (c) {
                case "LOAD":
                    this.O = !1;
                    e = Jg(this, a, b, !0);
                    break;
                case "GET_STATUS":
                    G(I, "Dispatching MediaManager getStatus event");
                    b = new Kg("getstatus", b, a);
                    this.ae && this.ae(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "PLAY":
                    G(I, "Dispatching MediaManager play event");
                    b = new Kg("play", b, a);
                    this.Ua && this.Ua(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "PLAY_AGAIN":
                    G(I, "Dispatching MediaManager play again event");
                    b = new Kg("playagain", b, a);
                    this.jh && this.jh(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "SEEK":
                    r(b.currentTime) || r(b.relativeTime) ? (G(I, "Dispatching MediaManager seek event"), b = new Kg("seek", b, a), this.Va && this.Va(b), Lg(this, b), e = null) : (E(I, "currentTime or relativeTime is required"), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    });
                    break;
                case "SET_PLAYBACK_RATE":
                    (e = b.playbackRate) ||
                    (e = b.relativePlaybackRate * this.F);
                    !u(e) || .5 > e || 2 < e ? (E(I, "Bad value for playback rate " + e), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    }) : (G(I, "Dispatching MediaManager playback rate event"), b = new Kg("setplaybackrate", b, a), this.ge && this.ge(b), Lg(this, b), e = null);
                    break;
                case "STOP":
                    G(I, "Dispatching MediaManager stop event");
                    b = new Kg("stop", b, a);
                    this.ie && this.ie(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "PAUSE":
                    G(I, "Dispatching MediaManager pause event");
                    b = new Kg("pause", b, a);
                    this.Ta && this.Ta(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "SKIP_AD":
                    G(I, "Dispatching MediaManager skip ad event");
                    e = new Kg("skipad", b, a);
                    this.nd ? this.nd(e) : this.Ha(a, b.requestId, "INVALID_REQUEST", "NOT_SUPPORTED");
                    Lg(this, e);
                    e = null;
                    break;
                case "SET_VOLUME":
                    b.volume && (r(b.volume.level) || r(b.volume.muted)) ? void 0 != b.volume.level && 0 > b.volume.level || 1 < b.volume.level ? (E(I, "volume level is invalid"), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    }) : (G(I, "Dispatching MediaManager setvolume event"), b = new Kg("setvolume", b, a), this.he && this.he(b),
                        Lg(this, b), e = null) : (E(I, "volume is invalid"), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    });
                    break;
                case "EDIT_TRACKS_INFO":
                    G(I, "Dispatching MediaManager editTracksInfo event");
                    Gg(this.g.media.tracks, b.activeTrackIds) ? (e = new Kg("edittracksinfo", b, a), b.textTrackStyle && (this.g.media.textTrackStyle = b.textTrackStyle), b.activeTrackIds && (this.g.activeTrackIds = b.activeTrackIds), this.$d && this.$d(e), Lg(this, e), e = null) : (E(I, "Invalid track info"), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    });
                    break;
                case "EDIT_AUDIO_TRACKS":
                    G(I, "Dispatching MediaManager editAudioTracks event");
                    b = new Kg("editaudiotracks", b, a);
                    this.Zd && this.Zd(b);
                    Lg(this, b);
                    e = null;
                    break;
                case "QUEUE_LOAD":
                    this.O = !0;
                    G(I, "Dispatching MediaManager queueLoad event");
                    ag(this.h, b) ? (b.items = Mg(b.items), b = new Kg("queueload", b, a), this.de && this.de(b), Lg(this, b), e = null) : e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    };
                    break;
                case "QUEUE_INSERT":
                    this.O = !0;
                    G(I, "Dispatching MediaManager queueInsert event");
                    e = !1;
                    if (r(this.h.g))
                        if (b.items && 0 !=
                            b.items.length)
                            if (r(b.currentItemId) && r(b.currentItemIndex)) E(I, "Maximum one currentItem must be provided"), e = !0;
                            else if (r(b.currentItemIndex) && (!u(b.currentItemIndex) || 0 > b.currentItemIndex || b.currentItemIndex >= b.items.length)) E(I, "Invalid currentItemIndex"), e = !0;
                    else if (r(b.currentItemId) && (!u(b.currentItemId) || 0 > b.currentItemId)) E(I, "Invalid currentItemId"), e = !0;
                    else
                        for (c = 0; c < b.items.length; c++)
                            if (u(b.items[c].itemId)) {
                                E(I, "Item contains an itemId at index: " + c);
                                e = !0;
                                break
                            } else b.items[c].itemId =
                                this.Pg();
                    else E(I, "No items to insert"), e = !0;
                    else E(I, "Queue does not exist"), e = !0;
                    e ? e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    } : (b.items = Mg(b.items), b = new Kg("queueinsert", b, a), this.ce && this.ce(b), Lg(this, b), e = null);
                    break;
                case "QUEUE_UPDATE":
                    e = Ng(this, a, b);
                    break;
                case "QUEUE_REMOVE":
                    G(I, "Dispatching MediaManager queueRemove event");
                    e = !1;
                    r(this.h.g) ? b.itemIds && 0 != b.itemIds.length ? Og(b.itemIds) || (e = !0) : (E(I, "No itemIds to remove"), e = !0) : (E(I, "Queue does not exist"), e = !0);
                    e ? e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_PARAMS"
                    } : (b.itemIds && (b.itemIds = kg(this.h, b.itemIds)), b = new Kg("queueremove", b, a), this.ee && this.ee(b), Lg(this, b), e = null);
                    break;
                case "QUEUE_REORDER":
                    G(I, "Dispatching MediaManager queueReorder event");
                    e = !1;
                    r(this.h.g) ? b.itemIds && 0 != b.itemIds.length ? Og(b.itemIds) ? r(b.insertBefore) && Sa(b.itemIds, b.insertBefore) && (E(I, "insertBefore can not be one of the reordered items"), e = !0) : e = !0 : (E(I, "No itemIds to reorder"), e = !0) : (E(I, "Queue does not exist"), e = !0);
                    e ? e = {
                            type: "INVALID_REQUEST",
                            reason: "INVALID_PARAMS"
                        } :
                        (b.itemIds && (b.itemIds = kg(this.h, b.itemIds)), b = new Kg("queuereorder", b, a), this.fe && this.fe(b), Lg(this, b), e = null);
                    break;
                case "PRECACHE":
                    b = new Kg("precache", b, "__broadcast__");
                    this.kd && this.kd(b);
                    Lg(this, b);
                    break;
                case "QUEUE_NEXT":
                    c = new Pg;
                    c.jump = 1;
                    c.requestId = b.requestId;
                    Ng(this, a, c);
                    break;
                case "QUEUE_PREV":
                    c = new Pg;
                    c.jump = -1;
                    c.requestId = b.requestId;
                    Ng(this, a, c);
                    break;
                case "QUEUE_GET_ITEM_RANGE":
                    b = new Kg("getitemsrange", b, a);
                    this.Kg && this.Kg(b);
                    Lg(this, b);
                    break;
                case "QUEUE_GET_ITEMS":
                    b = new Kg("getitemsinfo",
                        b, a);
                    this.Og && this.Og(b);
                    Lg(this, b);
                    break;
                case "QUEUE_GET_ITEM_IDS":
                    b = new Kg("getqueueids", b, a);
                    this.Yg && this.Yg(b);
                    Lg(this, b);
                    break;
                case "QUEUE_SHUFFLE":
                    b = new Kg("shuffle", b, a);
                    this.kh && this.kh(b);
                    Lg(this, b);
                    break;
                default:
                    E(I, "Unexpected message type: " + c), e = {
                        type: "INVALID_REQUEST",
                        reason: "INVALID_COMMAND"
                    }
            }
            Qg(this, e, a, d)
        }
    } else F(I, "Load is in progress, media command is being queued."), this.ga.h.push(a)
};

function Qg(a, b, c, d) {
    b && (E(I, "Sending error: " + b.type + " " + b.reason), a.hd && c == a.N ? (b.requestId = d, a.hd(b)) : a.Ha(c, d, b.type, b.reason))
}

function Ig(a) {
    if (!a.g) return "IDLE";
    var b = a.l.getState();
    return "PLAYING" == b && a.A ? "BUFFERING" : b
}

function Rg(a, b, c, d) {
    var e = {
            type: "MEDIA_STATUS"
        },
        f = a.o && a.o.message.media || null;
    if (!a.g && !a.B && !f) return e.status = [], e;
    var g = {
        mediaSessionId: a.C,
        playbackRate: a.F,
        playerState: Ig(a),
        currentTime: a.l.getCurrentTimeSec(),
        supportedMediaCommands: a.eb,
        volume: a.l.getVolume()
    };
    a.G && (g.preloadedItemId = a.G);
    var k = xg(a.X),
        l = yg(a.X);
    0 < k && 0 < l && (g.videoInfo = new Zd(k, l, a.X.h));
    if (a.g) g.activeTrackIds = a.g.activeTrackIds, b && (g.media = a.Tc() || void 0, k = a.h.u) && (g.queueData = qb(k), g.queueData.items = void 0), g.currentItemId =
        a.g.itemId;
    else if (a.B && (b && (g.media = a.B.media || void 0), g.currentItemId = a.B.itemId, a.B = null), r(a.h.g) && (k = a.h.yb())) g.loadingItemId = k.itemId;
    "IDLE" == g.playerState ? (a.w && (g.idleReason = a.w), f && (g.extendedStatus = new $d(f))) : a.w = null;
    void 0 != c && (g.customData = c);
    r(a.h.g) && (d && (g.items = a.h.Mb(b, a.M)), g.repeatMode = a.h.o);
    if (a.Re) return b = function(a) {
        a ? e.status = [a] : e = null;
        return e
    }, c = a.Re(g), a.fc = !!g.breakStatus, zg(c) ? c.then(b) : b(c);
    e.status = [g];
    return e
}

function Sg(a) {
    null != a.V && (q.clearTimeout(a.V), a.V = null)
}

function Tg(a) {
    var b = a.l.getCurrentTimeSec();
    a.K = b;
    a.jc = b;
    a.lh = Date.now();
    null != a.T && q.clearTimeout(a.T);
    a.T = Dd(a.Aa, 1E3)
}
h.Kj = function() {
    this.T = Dd(this.Aa, 1E3);
    var a = Ig(this);
    if ("IDLE" != a && "PAUSED" != a) {
        this.L && "PLAYING" == a && (F(I, "Triggering load complete, since media is playing."), Ug(this));
        a = this.K;
        this.K = this.l.getCurrentTimeSec();
        var b = this.A;
        this.A = this.Zh ? "BUFFERING" === this.l.getState() : 100 > 1E3 * (this.K - a);
        b != this.A ? (Oc(I, Yb, "Buffering state changed, isPlayerBuffering: " + this.A + " old time: " + a + " current time: " + this.K), this.W(!1)) : this.A || this.fc || (a = 1E3 * (this.K - this.jc) - this.F * (Date.now() - this.lh), 1E3 < a || -1E3 >
            a ? (Oc(I, Yb, "Time drifted: " + a), this.W(!1)) : this.g && r(this.h.g) && (a = this.h, (a = 0 > a.h ? null : "REPEAT_SINGLE" == a.o ? a.g[a.h] : a.h + 1 >= a.g.length && (lg(a) || "REPEAT_OFF" == a.o) ? null : a.g[(a.h + 1) % a.g.length]) && u(a.preloadTime) && this.g.media && !this.o && "LIVE" != this.g.media.streamType && Vg(this, a.preloadTime) && this.G != a.itemId && (this.ld ? (b = new Wg(a.itemId), b.requestId = 0, b.mediaSessionId = this.C, b.autoplay = a.autoplay, b.currentTime = a.startTime, b.customData = a.customData || void 0, b.activeTrackIds = a.activeTrackIds, b.media =
                a.media, b = new Kg("preload", b, ""), this.G = a.itemId, G(I, "Sending preload event: " + JSON.stringify(b)), this.ld(b) && this.W(!1)) : G(I, "Not sending preload event"))))
    }
};
h.W = function(a, b, c, d) {
    var e = this;
    if (this.l) {
        Oc(I, Yb, "Sending broadcast status message");
        var f = function(a) {
            null != a && (e.$ && a.status && e.$(a.status[0] || null), a.requestId = b || 0, e.u.send("*:*", a), Tg(e), Xg(e, a))
        };
        a = Rg(this, a, c, d);
        zg(a) ? a.then(f) : f(a)
    } else E(I, "Not sending broadcast status message, state is invalid")
};
h.Zf = function(a) {
    Oc(I, Yb, "Setting IDLE reason: " + a);
    this.w = a
};
h.Ha = function(a, b, c, d, e) {
    G(I, "Sending error message to " + a);
    var f = {};
    f.requestId = b;
    f.type = c;
    d && (f.reason = d);
    e && (f.customData = e);
    this.Ke && this.Ke(f);
    this.u.send(a, f)
};
h.oe = function(a, b, c, d, e) {
    var f = this;
    if (this.l) {
        Oc(I, Yb, "Sending status message to " + a);
        var g = function(c) {
            null != c && (f.$ && c.status && f.$(c.status[0] || null), c.requestId = b, f.u.send(a, c), Tg(f))
        };
        c = Rg(this, c, d, e);
        zg(c) ? c.then(g) : g(c)
    } else E(I, "State is invalid"), this.Ha(a, b, "INVALID_PLAYER_STATE", null, d)
};

function Xg(a, b) {
    if (a.Ca) {
        b = rb(b);
        b.type = "CLOUD_STATUS";
        try {
            b = a.Ca(b)
        } catch (c) {
            E(I, "Cloud status handler failed. " + c);
            return
        }
        zg(b) ? b.then(function(b) {
            a.u.send("__cloud__", b)
        }) : a.u.send("__cloud__", b)
    }
}
h.Sj = function(a) {
    return a
};

function Yg(a) {
    a.o = null;
    if (a.L)
        for (a.L = !1; !Cg(a.ga) && !a.L;) a.Ff(Bg(a.ga))
}
h.load = function(a) {
    a.type = "LOAD";
    Hg(this, this.N, a)
};

function Jg(a, b, c, d, e) {
    G(I, "Dispatching MediaManager load event");
    G(I, "Load message received:" + JSON.stringify(c));
    var f = !1,
        g = e;
    c.media || c.queueData ? c.media && c.media.tracks && !Fg(c.media.tracks) ? (E(I, "Invalid tracks information"), f = !0) : c.activeTrackIds && c.media && !Gg(c.media.tracks, c.activeTrackIds) && (f = !0) : (E(I, "Media or QueueData is mandatory"), f = !0);
    e = c.playbackRate;
    if (r(e) && (!u(e) || .5 > e || 2 < e)) return E(I, "Bad value for playback rate " + e), {
        type: "INVALID_REQUEST",
        reason: "INVALID_PARAMS"
    };
    if (f) return g &&
        g(), {
            type: "INVALID_REQUEST",
            reason: "INVALID_PARAMS"
        };
    a.o ? Zg(a, "LOAD_CANCELLED") : a.g && ($g(a, "INTERRUPTED", !1), g = a.W.bind(a, !0));
    a.o = {
        senderId: b,
        message: c
    };
    g && g();
    a.L = !0;
    if (d && (a.C++, a.w = null, a.O = r(c.queueData), d = Yf(a.h, c), zg(d))) return d.then(function() {
        a.O = !0;
        var d = a.h.yb();
        !d || !d.media || c.media && d.media.contentId == c.media.contentId || (c.media && G(I, "Implementation of queueing has provided " + d.media.contentId + " as the first item whilethe original media portion of the LOAD provided " + c.media.contentId),
            c.media = d.media, c.autoplay = c.autoplay || d.autoplay, c.currentTime = c.currentTime || d.startTime || a.h.A);
        ah(a, b, c, g)
    }, function() {
        Zg(a, "LOAD_FAILED")
    }), null;
    ah(a, b, c, g);
    return null
}

function ah(a, b, c, d) {
    a.g = rb(a.h.yb());
    a.J = [];
    c.media = a.g.media || c.media;
    a.g.activeTrackIds = c.activeTrackIds;
    Sg(a);
    a.D = c;
    if (a.ca && a.l.Fg) {
        var e = a.h.A;
        a.l.Fg(r(c.autoplay) ? c.autoplay : !0, 0 < c.currentTime ? c.currentTime : 0 < e ? e : 0, a.g.playbackDuration, a.g.startTime)
    }
    e = new Kg("load", c, b);
    a.gd && (a.F = c.playbackRate ? c.playbackRate : 1, a.gd(e));
    Lg(a, e);
    d || a.W(!0);
    a.G = null;
    tg(a.h).then(function(d) {
        bh(a, d, b, c)
    }, function(a) {
        G(I, a)
    })
}
h.ck = function(a) {
    a = a.data;
    if (a.media && (a.media.contentUrl || a.media.contentId)) {
        var b = r(a.autoplay) ? a.autoplay : !0,
            c = a.media.contentUrl || a.media.contentId;
        a.media.tracks ? this.l.load(c, b, a.currentTime, {
            tracks: a.media.tracks,
            activeTrackIds: a.activeTrackIds,
            textTrackStyle: a.media.textTrackStyle
        }, void 0, a.playbackRate) : this.l.load(c, b, a.currentTime, void 0, void 0, a.playbackRate)
    }
};

function ch(a, b, c) {
    c = void 0 === c ? !0 : c;
    a.g && a.g.media && (a.g.activeTrackIds = b.activeTrackIds, c && (a.g.media.tracks = b.tracks, a.g.media.textTrackStyle = b.textTrackStyle), a.o || a.W(c))
}
h.qb = function(a) {
    if (a != this.l) {
        this.l && (this.l.unregisterErrorCallback(), this.l.unregisterEndedCallback(), this.l.unregisterLoadCallback());
        (this.ca = a.getState ? !1 : !0) ? this.l = new Qf(a): this.l = a;
        this.l.registerErrorCallback(this.Mj.bind(this));
        this.l.registerEndedCallback(this.Lj.bind(this));
        this.l.registerLoadCallback(this.Nj.bind(this));
        var b = this.X;
        b.g && b.g.removeEventListener("resize", b.o);
        var c = null;
        a.tagName && "video" == a.tagName.toLowerCase() ? c = a : (a = document.getElementsByTagName("video"), 1 == a.length &&
            (c = a[0]));
        b.g = c;
        b.g && b.g.addEventListener("resize", b.o)
    }
};
h.$f = function(a) {
    this.h.$f(a)
};
h.Nj = function() {
    if (this.o) {
        G(I, "Metadata loaded");
        if (this.g && this.g.media) {
            var a = this.l.getDurationSec(); - 1 != a && Infinity != a || this.g.media.streamType && "NONE" != this.g.media.streamType ? -1 == a || Infinity == a || this.g.media.streamType && "NONE" != this.g.media.streamType || (F(I, "Media streamType is initially set wrong, changed to buffered."), this.g.media.streamType = "BUFFERED") : (F(I, "Media streamType is initially set wrong, changed to live."), this.g.media.streamType = "LIVE");
            this.g.media.duration = a;
            this.h.yb().media.duration =
                a
        }
        this.A = !0;
        this.Gf ? this.Gf(this.o) : Yg(this)
    }
};
h.dk = function(a) {
    this.ca && a.message && void 0 != a.message.currentTime && a.message.currentTime != this.l.getCurrentTimeSec() && this.l.seek(a.message.currentTime);
    Ug(this)
};
h.Mj = function(a) {
    this.o ? (E(I, "Load metadata error: " + a), this.hh ? this.hh(this.o) : Yg(this)) : this.vb && this.vb(a)
};

function Zg(a, b) {
    a.o ? (b = b || "LOAD_FAILED", a.o.senderId == a.N ? a.hd && a.hd({
        type: b
    }) : a.Ha(a.o.senderId, a.o.message.requestId, b, null, void 0), Yg(a)) : E(I, "Not sending LOAD error as there is no on going LOAD request")
}

function Ug(a) {
    if (a.o) {
        var b = a.o.message.requestId;
        a.W(!0, b, void 0, 0 != b || a.M);
        Yg(a)
    } else E(I, "Not sending status as there is no on going LOAD request")
}
h.Xj = function() {
    dh(this)
};

function dh(a, b, c) {
    b = void 0 === b ? !1 : b;
    c = void 0 === c ? !1 : c;
    var d = a.h.Ld();
    r(a.h.g) && -1 != d && d < a.h.g.length - 1 ? a.Na("ERROR") : ($g(a, "ERROR", b), c && Zg(a, "LOAD_FAILED"))
}
h.bk = function() {
    this.o && "" == this.o.senderId && this.o.message && 0 == this.o.message.requestId ? dh(this, !0) : dh(this, !1, !0)
};
h.Lj = function() {
    this.Na && this.Na()
};
h.Wj = function(a) {
    if (r(this.h.g)) {
        var b = -1 != this.pa ? this.pa : void 0;
        this.pa = -1;
        eh(this, "REPEAT_SINGLE" == this.h.o ? 0 : 1, !1, b, void 0, void 0, void 0, void 0 === a ? "FINISHED" : a)
    }
};
h.hk = function(a, b) {
    $g(this, a, !0, b)
};

function eh(a, b, c, d, e, f, g, k) {
    c = a.yl.bind(a, b, c, d, e, f, g, k);
    qg(a.h) ? hg(a.h, b).then(c, c) : c()
}
h.yl = function(a, b, c, d, e, f, g) {
    g = g || "INTERRUPTED";
    if (r(this.h.g) && "QUEUE_ENDED" != sg(this.h, a, !1)) {
        var k = sg(this.h, a, !0);
        G(I, "After " + a + " jump, transition is: " + k);
        (a = fh(this, this.h.yb(), void 0, f)) ? (this.g && (this.w = g, this.B = this.g, this.g = null, this.J = [], "QUEUE_SHUFFLED" == k && (e = !0), "INTERRUPTED" == this.w && this.kc()), Jg(this, "", a, !1, this.W.bind(this, b, c, d, e))) : this.ha && this.ha(g, c)
    } else this.ha && this.ha(g, c)
};
h.ak = function(a) {
    Oc(I, Yb, "onGetStatus");
    var b = a.data;
    Oc(I, Yb, "onGetStatus: " + JSON.stringify(b));
    var c = !0,
        d = !0;
    b.options && (b.options & 1 && (c = !1), b.options & 1 && (d = !1));
    this.oe(a.senderId, a.data.requestId, c, null, d)
};
h.gk = function(a) {
    Oc(I, Yb, "onPlay");
    this.l.play();
    this.W(!1, a.data.requestId)
};
h.fk = function(a) {
    Oc(I, Yb, "onPlayAgain");
    this.g ? (this.l.seek(0), this.l.play(), this.W(!1, a.data.requestId)) : this.D && (this.D.type = "LOAD", this.D.autoplay = !0, Hg(this, this.N, this.D))
};
h.mk = function(a) {
    a = a.data;
    Oc(I, Yb, "onSeek: " + JSON.stringify(a));
    var b = r(a.relativeTime) ? this.l.getCurrentTimeSec() + a.relativeTime : a.currentTime;
    this.l.seek(b, a.resumeState);
    "PAUSED" != this.l.getState() && (this.A = !0);
    this.l.getCurrentTimeSec() < this.l.getDurationSec() ? this.W(!1, a.requestId) : this.pa = a.requestId
};
h.nk = function(a) {
    a = a.data;
    Oc(I, Yb, "onSetPlaybackRate: " + JSON.stringify(a));
    this.l.Yb ? this.F = this.l.Yb(Number(a.playbackRate ? a.playbackRate : this.F * a.relativePlaybackRate)) : F(I, "setPlaybackRate is not supported");
    this.W(!1, a.requestId)
};
h.getPlaybackRate = function() {
    return this.F
};
h.rk = function(a) {
    $g(this, "CANCELLED", !0, a.data.requestId)
};

function $g(a, b, c, d) {
    c = !r(c) || c;
    if (d && !c) throw Error("customData and requestId should only be provided in broadcast mode");
    a.g ? (ig(a.h), a.l.reset(b), b && (a.w = b), a.B = a.g, a.g = null, a.J = [], c && a.W(!1, d, void 0, void 0)) : G(I, "Nothing to reset, Media is already null");
    a.D && (Sg(a), a.V = Dd(function() {
        a.D = null;
        a.V = null
    }, 9E5));
    b && "INTERRUPTED" == b && a.kc()
}
h.ek = function(a) {
    this.l.pause();
    this.W(!1, a.data.requestId)
};
h.pk = function(a) {
    a = a.data;
    this.l.setVolume(a.volume);
    this.W(!1, a.requestId)
};
h.Vj = function(a) {
    var b = a.data,
        c;
    a: {
        var d = this.g.media.tracks;
        if (c = b.language) {
            if (d) {
                d = n(d);
                for (var e = d.next(); !e.done; e = d.next())
                    if (e = e.value, "TEXT" == e.type && r(e.language) && cast.receiver.yc(e.language, c)) {
                        c = !0;
                        break a
                    }
            }
            c = !1
        } else c = !0
    }
    if (c) {
        if (!b.activeTrackIds && !b.language && r(b.enableTextTracks))
            if (c = gh(this, b)) b.activeTrackIds = c;
            else {
                this.Ha(a.senderId, b.requestId, "INVALID_REQUEST", "INVALID_PARAMS");
                return
            }
        a = {
            activeTrackIds: b.activeTrackIds,
            language: b.language,
            textTrackStyle: b.textTrackStyle
        };
        this.l.editTracksInfo &&
            (this.g.activeTrackIds = this.l.editTracksInfo(a) || void 0);
        this.W(b.textTrackStyle ? !0 : !1, b.requestId)
    } else E(I, "Invalid track language"), this.Ha(a.senderId, b.requestId, "INVALID_REQUEST", "LANGUAGE_NOT_SUPPORTED")
};

function gh(a, b) {
    var c = a.g && a.g.media && a.g.media.tracks;
    if (!c || 0 == c.length) return E(I, "No tracks available"), null;
    c = c.filter(function(a) {
        return "TEXT" == a.type
    }).map(function(a) {
        return a.trackId
    });
    if (0 == c.length) return E(I, "No text tracks available"), null;
    var d = a.g.activeTrackIds || [],
        e = c.filter(function(a) {
            return 0 <= d.indexOf(a)
        });
    if (!b.enableTextTracks) {
        if (0 < e.length) return a.J = e, d.filter(function(a) {
            return 0 > e.indexOf(a)
        })
    } else if (0 == e.length) return b = d.concat(0 < a.J.length ? a.J : [c[0]]), a.J = [], b;
    return d
}
h.Uj = function(a) {
    var b = a.data,
        c;
    a: {
        var d = this.g.media.tracks;
        if (c = b.language) {
            if (d) {
                d = n(d);
                for (var e = d.next(); !e.done; e = d.next())
                    if (e = e.value, "AUDIO" == e.type && r(e.language) && cast.receiver.yc(e.language, c)) {
                        c = !0;
                        break a
                    }
            }
            c = !1
        } else c = !0
    }
    c ? (this.l.Ie && (this.g.activeTrackIds = this.l.Ie(b)), this.W(!1, b.requestId)) : (E(I, "Invalid audio track language"), this.Ha(a.senderId, b.requestId, "INVALID_REQUEST", "LANGUAGE_NOT_SUPPORTED"))
};

function Og(a) {
    if (2 > a.length) return !0;
    for (var b = 0; b < a.length; b++)
        for (var c = b + 1; c < a.length; c++)
            if (a[b] == a[c]) return E(I, "Duplicate itemId: " + a[b] + "at positions:" + b + " " + c), !1;
    return !0
}

function hh(a) {
    for (var b = 0; b < a.length; b++) {
        if (!u(a[b].itemId)) return E(I, "Invalid itemId at position: " + b), !1;
        for (var c = b + 1; c < a.length; c++) {
            if (!u(a[c].itemId)) return E(I, "Invalid itemId at position: " + c), !1;
            if (a[b].itemId == a[c].itemId) return E(I, "Duplicate itemId: " + a[b].itemId + "at positions:" + b + " " + c), !1
        }
    }
    return !0
}

function Mg(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = new Vf(a[c].itemId);
        d.media = a[c].media;
        d.autoplay = a[c].autoplay;
        d.startTime = a[c].startTime;
        d.playbackDuration = a[c].playbackDuration;
        d.preloadTime = a[c].preloadTime;
        d.activeTrackIds = a[c].activeTrackIds;
        d.customData = a[c].customData;
        b.push(d)
    }
    return b
}

function fh(a, b, c, d) {
    if (!b) return null;
    var e = new ih;
    e.requestId = c || 0;
    e.mediaSessionId = a.C;
    e.type = "LOAD";
    e.autoplay = b.autoplay;
    e.currentTime = r(d) ? d : b.startTime;
    e.activeTrackIds = b.activeTrackIds;
    e.customData = b.customData || void 0;
    e.media = b.media;
    return e
}

function Vg(a, b) {
    if (a.g.media.duration - a.l.getCurrentTimeSec() <= b || 0 == b && a.l.Xd && a.l.Xd()) return !0;
    if (null == a.G) return !1;
    a.G = null;
    if (!a.fd) return !1;
    b = new jh("CANCEL_PRELOAD");
    b.requestId = 0;
    b.mediaSessionId = a.C;
    b = new Kg("cancelpreload", b, "");
    G(I, "Sending cancel preload event: " + JSON.stringify(b));
    a.fd(b) && a.W(!1);
    return !1
}
h.jk = function(a) {
    var b = a.data,
        c = fh(this, b.items ? b.items[b.startIndex || 0] : null, b.requestId, b.currentTime),
        d = new Xd;
    d.items = b.items;
    d.startIndex = b.startIndex || 0;
    d.startTime = b.currentTime;
    d.repeatMode = b.repeatMode || "REPEAT_OFF";
    c.queueData = d;
    c ? Jg(this, a.senderId, c, !0) : E(I, "Queue Load request is invalid")
};
h.ik = function(a) {
    a = a.data;
    G(I, "Queue insert data: " + JSON.stringify(a));
    var b = !1;
    r(a.currentItemId) && (b = ng(this.h, a.currentItemId));
    r(a.currentItemIndex) && (b = !0);
    var c = this.h.sf(a.items, a.insertBefore, a.currentItemIndex);
    kh(this, "INSERT", c, a.insertBefore);
    b ? eh(this, 0, !0, a.requestId, a.customData, !0, a.currentTime) : this.W(!0, a.requestId, a.customData, !0)
};

function Ng(a, b, c) {
    G(I, "Dispatching MediaManager queueUpdate event");
    var d = !1;
    r(a.h.g) ? c.items && !hh(c.items) ? d = !0 : c.repeatMode && !cast.receiver.media.ih(c.repeatMode) && (E(I, "Invalid repeatMode"), d = !0) : (E(I, "Queue does not exist"), d = !0);
    if (d) return {
        type: "INVALID_REQUEST",
        reason: "INVALID_PARAMS"
    };
    if (c.items && 0 < c.items.length) {
        d = a.h;
        for (var e = c.items, f = [], g = 0; g < e.length; g++)
            for (var k = 0; k < d.g.length; k++)
                if (e[g].itemId == d.g[k].itemId) {
                    f.push(e[g]);
                    break
                }
        c.items = Mg(f)
    }
    b = new Kg("queueupdate", c, b);
    a.md && a.md(b);
    Lg(a, b);
    return null
}
h.Yj = function(a) {
    var b = this,
        c = a.data;
    this.h.fetchItems(c.requestId, c.itemId, c.nextCount, c.prevCount).then(function(d) {
        bh(b, d, a.senderId, c)
    }, function() {
        Qg(b, {
            type: "INVALID_REQUEST",
            reason: "INVALID_COMMAND"
        }, a.senderId, c.requestId)
    })
};

function bh(a, b, c, d) {
    "NO_CHANGE" == b.changeType && r(c) ? a.u.send(c, b) : (a.u.send("*:*", b), a.M && a.W(!0, d.requestId, d.customData, !0))
}

function kh(a, b, c, d) {
    var e = new ce;
    e.changeType = b;
    e.itemIds = c;
    null != d && (e.insertBefore = d);
    a.u.send("*:*", e)
}
h.Zj = function(a) {
    var b = a.data;
    this.u.send(a.senderId, fg(this.h, b.requestId, b.itemIds))
};
h.$j = function(a) {
    this.u.send(a.senderId, gg(this.h, a.data.requestId))
};
h.qk = function(a) {
    var b = this,
        c = a.data;
    this.h.shuffle().then(function() {
        b.W(!1, c.requestId, c.customData, !0)
    })
};
h.Ig = function(a) {
    var b = a.data;
    if (this.O) {
        G(I, "Queue update data: " + JSON.stringify(b));
        var c = a = !1;
        u(b.currentItemId) && (c = ng(this.h, b.currentItemId));
        u(b.jump) && (c = !0, this.M && (a = !0));
        b.repeatMode && jg(this.h, b.repeatMode);
        b.items && 0 < b.items.length && (this.h.gg(b.items), a = !0);
        b.shuffle && (rg(this.h), c = !0);
        var d = this.h.Mb().map(function(a) {
            return a.itemId
        });
        kh(this, "UPDATE", d);
        c ? eh(this, b.jump || 0, a, b.requestId, b.customData, a, b.currentTime) : this.W(a, b.requestId, b.customData, a)
    } else a = a.senderId, a == cast.receiver.Qb.wd &&
        this.md == this.Ig ? this.Ha(a, b.requestId, "INVALID_REQUEST", "INVALID_COMMAND") : (G(I, "QUEUE_UPDATE request ignored"), this.W(!1, b.requestId))
};
h.kk = function(a) {
    a = a.data;
    G(I, "Queue remove data: " + JSON.stringify(a));
    var b = !1;
    u(a.currentItemId) && (b = ng(this.h, a.currentItemId));
    a.itemIds && 0 != a.itemIds.length ? (b = b || this.h.Qf(a.itemIds), kh(this, "REMOVE", a.itemIds), b ? eh(this, 0, !1, a.requestId, a.customData, !0, a.currentTime) : this.W(!1, a.requestId, a.customData, !0)) : E(I, "No itemIds to remove")
};
h.lk = function(a) {
    a = a.data;
    G(I, "Queue reorder data: " + JSON.stringify(a));
    var b = !1,
        c = !1;
    u(a.currentItemId) && (c = ng(this.h, a.currentItemId));
    a.itemIds && 0 < a.itemIds.length && (pg(this.h, a.itemIds, a.insertBefore), b = !0);
    var d = this.h.Mb().map(function(a) {
        return a.itemId
    });
    kh(this, "UPDATE", d, a.insertBefore);
    c ? eh(this, 0, !1, a.requestId, a.customData, b, a.currentTime) : this.W(!1, a.requestId, a.customData, b)
};
h.addEventListener = function(a, b) {
    yc(this.Ba, a, b)
};
h.removeEventListener = function(a, b) {
    Hc(this.Ba, a, b)
};

function Lg(a, b) {
    b.target = a;
    return a.Ba.dispatchEvent(b)
}
h.dispatchEvent = function(a) {
    return Lg(this, a)
};
var I = D("cast.receiver.MediaManager");

function Kg(a, b, c) {
    hc.call(this, a);
    this.data = b;
    this.senderId = c
}
p(Kg, hc);

function jh(a) {
    this.type = a;
    this.requestId = 0;
    this.customData = this.mediaSessionId = void 0
}

function ih() {
    jh.call(this, "LOAD");
    this.media = new Wd;
    this.autoplay = !1;
    this.credentialsType = this.credentials = this.queueData = this.activeTrackIds = this.playbackRate = this.currentTime = void 0
}
p(ih, jh);

function Wg(a) {
    ih.call(this);
    this.type = "PRELOAD";
    this.itemId = a
}
p(Wg, ih);

function lh() {
    jh.call(this, "EDIT_TRACKS_INFO");
    this.enableTextTracks = this.isSuggestedLanguage = this.textTrackStyle = this.language = this.activeTrackIds = void 0
}
p(lh, jh);

function mh() {
    jh.call(this, "SEEK");
    this.resumeState = void 0;
    this.currentTime = 0;
    this.relativeTime = void 0
}
p(mh, jh);

function nh(a) {
    jh.call(this, "QUEUE_INSERT");
    this.currentTime = this.currentItemId = this.currentItemIndex = this.insertBefore = void 0;
    this.items = a
}
p(nh, jh);

function Pg() {
    jh.call(this, "QUEUE_UPDATE");
    this.shuffle = this.repeatMode = this.items = this.jump = this.currentTime = this.currentItemId = void 0
}
p(Pg, jh);

function oh(a) {
    jh.call(this, "QUEUE_REMOVE");
    this.currentTime = this.currentItemId = void 0;
    this.itemIds = a
}
p(oh, jh);

function ph(a) {
    this.g = a
}

function qh(a, b) {
    var c = new mh;
    c.relativeTime = b;
    rh(a.g, c)
};
var sh = {
    QUEUE_NEXT: "queue-next",
    QUEUE_PREV: "queue-prev",
    SEEK_FORWARD_10: "seek-forward-10",
    SEEK_FORWARD_15: "seek-forward-15",
    SEEK_FORWARD_30: "seek-forward-30",
    SEEK_BACKWARD_10: "seek-backward-10",
    SEEK_BACKWARD_15: "seek-backward-15",
    SEEK_BACKWARD_30: "seek-backward-30",
    CAPTIONS: "captions",
    REPEAT: "repeat",
    SHUFFLE: "shuffle",
    LIKE: "like",
    DISLIKE: "dislike",
    NO_BUTTON: "no-button"
};

function th() {
    var a = this;
    this.g = this.h = null;
    this.u = this.o = v;
    var b = re.H();
    bf(b).then(function() {
        uh(a, b)
    })
}

function rh(a, b) {
    if (!a.h) throw Error("Media channel is not set");
    if (!a.l) throw Error("Invalid Media Session Id");
    b.mediaSessionId = a.l;
    he(a.h, cast.receiver.media.Oa, "__touch_controls__", a.h.D(b))
}

function vh(a, b) {
    if (!a.g) throw Error("Command and control channel is not set");
    he(a.g, cast.receiver.wb.Hb, "__touch_controls__", a.g.D(b))
}

function uh(a, b) {
    a.h = b.g[cast.receiver.media.Oa] || null;
    if (!a.h) throw Error("CastMessageBus with type cast.receiver.media.MEDIA_NAMESPACE is not set up.");
    le(a.h, function(b, d, e) {
        if (e && "MEDIA_STATUS" === e.type) {
            if (d = e.status[0]) a.l != d.mediaSessionId && a.u(), a.l = d.mediaSessionId;
            a.o(d)
        }
        return "__touch_controls__" === b
    });
    a.g = b.g[cast.receiver.wb.Hb] || null;
    a.g && le(a.g, function(a) {
        return "__touch_controls__" === a
    })
};
var wh = {
    SLOT_1: "slot-1",
    SLOT_2: "slot-2",
    SLOT_3: "slot-3",
    SLOT_4: "slot-4"
};
var xh = {},
    yh = (xh.REPEAT_OFF = {
        state: "off",
        Ae: "Repeat. State: Off."
    }, xh.REPEAT_ALL = {
        state: "all",
        Ae: "Repeat. State: All."
    }, xh.REPEAT_SINGLE = {
        state: "single",
        Ae: "Repeat. State: One."
    }, xh);

function zh(a) {
    var b = hf(function() {
        a: {
            switch (c.g) {
                case "REPEAT_OFF":
                    var a = "REPEAT_ALL";
                    break a;
                case "REPEAT_ALL":
                case "REPEAT_ALL_AND_SHUFFLE":
                    a = "REPEAT_SINGLE";
                    break a
            }
            a = "REPEAT_OFF"
        }
        c.l(a);Ah(c, a)
    }, "", "btn-repeat");
    this.element = b;
    var c = this;
    this.h = b;
    this.l = a;
    this.g = "REPEAT_OFF";
    Bh(this, this.g)
}
p(zh, ff);

function Ah(a, b) {
    a.g = b;
    "REPEAT_ALL_AND_SHUFFLE" === a.g ? Bh(a, "REPEAT_ALL") : Bh(a, a.g)
}

function Bh(a, b) {
    a.h.dataset.state = yh[b].state;
    a.h.alt = yh[b].Ae
};

function Ch(a, b, c) {
    this.element = hf(a, b, c)
}
p(Ch, ff);

function Dh(a, b, c) {
    this.element = hf(function() {
        d.h(!d.g)
    }, b, c);
    var d = this;
    this.g = !1;
    this.h = a;
    this.element.setAttribute("aria-pressed", String(this.g))
}
p(Dh, ff);

function Eh(a, b) {
    b != a.g && (a.g = b, a.element.setAttribute("aria-pressed", String(b)))
};
var Fh = {
    AUDIO: "audio",
    VIDEO: "video",
    PHOTO: "photo"
};
cast.receiver.R.Ci = {
    Lc: function(a) {
        a.innerHTML = "@import url(//fonts.googleapis.com/css?family=Google+Sans:400,500);html{--cast-controls-horizontal-padding:56px;--cast-controls-safe-area-height:calc(100vh - 192px)}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){html{--cast-controls-horizontal-padding:112px;--cast-controls-safe-area-height:calc(100vh - 240px)}}"
    }
};
cast.receiver.R.mj = {
    Lc: function(a) {
        a.innerHTML = '.loading-bar{height:100%;overflow:hidden;position:relative;transform:translateZ(0);transition:opacity 250ms linear;width:100%}.loading-bar .rect,.loading-bar .rect-inner{height:100%;position:absolute;width:100%;animation:none}.loading-bar .rect{transform-origin:top left}.loading-bar .rect-primary{transform:scaleX(0)}.loading-bar .rect-auxiliary{visibility:hidden}.loading-bar .rect-inner{background-color:#9aa0a6;display:inline-block}.loading-bar .rect-primary{animation:primary-indeterminate-translate 2s infinite linear}.loading-bar .rect-primary>.rect-inner{animation:primary-indeterminate-scale 2s infinite linear}.loading-bar .rect-auxiliary{animation:auxiliary-indeterminate-translate 2s infinite linear;visibility:visible}.loading-bar .rect-auxiliary>.rect-inner{animation:auxiliary-indeterminate-scale 2s infinite linear}@keyframes primary-indeterminate-translate{0%{transform:translateX(-145.166611%)}20%{animation-timing-function:cubic-bezier(.5, 0, .701732, .495819);transform:translateX(-145.166611%)}59.15%{animation-timing-function:cubic-bezier(.302435, .381352, .55, .956352);transform:translateX(-61.495191%)}100%{transform:translateX(55.444446%)}}@keyframes primary-indeterminate-scale{0%{transform:scaleX(.08)}36.65%{animation-timing-function:cubic-bezier(.334731, .12482, .785844, 1);transform:scaleX(.08)}69.15%{animation-timing-function:cubic-bezier(.06, .11, .6, 1);transform:scaleX(.661479)}100%{transform:scaleX(.08)}}@keyframes auxiliary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(.15, 0, .515058, .409685);transform:translateX(-54.888891%)}25%{animation-timing-function:cubic-bezier(.31033, .284058, .8, .733712);transform:translateX(-17.236978%)}48.35%{animation-timing-function:cubic-bezier(.4, .627035, .6, .902026);transform:translateX(29.497274%)}100%{transform:translateX(105.388891%)}}@keyframes auxiliary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(.205028, .057051, .57661, .453971);transform:scaleX(.08)}19.15%{animation-timing-function:cubic-bezier(.152313, .196432, .648374, 1.004315);transform:scaleX(.457104)}44.15%{animation-timing-function:cubic-bezier(.257759, .003163, .211762, 1.38179);transform:scaleX(.72796)}100%{transform:scaleX(.08)}}:host{bottom:0;color:#fff;font-family:\'Google Sans\',\'Roboto\',Arial,sans-serif;left:0;position:fixed;right:0;top:0;z-index:1000000}.controls-layer{display:flex;flex-direction:column;justify-content:flex-start;height:100%}.controls{box-sizing:border-box;flex:none;display:flex;flex-direction:column;justify-content:flex-end;height:192px;padding:0 56px 22px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.controls{height:240px;padding:0 112px 38px}}.scrim,.buffering-scrim{bottom:0;height:100vh;left:0;position:absolute;width:100vw;z-index:-1}.buffering-scrim{background-color:rgba(0,0,0,0.6);visibility:hidden}.video-metadata{display:none}.hidden{display:none !important}.invisible{visibility:hidden}.touch-layer{height:100%;touch-action:manipulation;user-select:none;width:100%}.touch-layer.video .scrim{background:linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 42.5%, rgba(0,0,0,0.92))}.touch-layer.video .video-metadata{align-items:flex-start;box-sizing:border-box;display:flex;flex-direction:column;flex-grow:1;text-align:left;padding:44px 56px 0}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.touch-layer.video .video-metadata{padding:112px 112px 0}}.touch-layer.video .logo{background-image:var(--playback-logo-image);background-position-x:left;background-repeat:no-repeat;background-size:contain;color:rgba(255,255,255,0.7);font-family:\'Roboto\',Arial,sans-serif;font-size:36px;font-weight:500;height:40px;line-height:40px;width:100%}.touch-layer.video .logo.app-icon{height:68px}.touch-layer.video .title{-webkit-line-clamp:2;-webkit-box-orient:vertical;-webkit-box-pack:end;display:-webkit-box;font-weight:normal;overflow:hidden;width:auto;margin-top:0;margin-bottom:0;font-size:56px;line-height:76px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.touch-layer.video .title{margin-bottom:4px;font-size:68px;line-height:80px}}.touch-layer.video.active .title,.touch-layer.video.buffering .title{width:100%}.touch-layer.video .subtitle{font-weight:normal;margin:0;opacity:.7;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:1.6;line-height:30px;font-size:28px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.touch-layer.video .subtitle{letter-spacing:1.4;line-height:40px;font-size:32px}}.touch-layer.video .subtitle-container{margin-top:auto;margin-bottom:16px;max-width:100%}.touch-layer.video .scrim{opacity:0;transition:visibility 0s 150ms,opacity 150ms cubic-bezier(0, 0, 1, 1);visibility:hidden}.touch-layer.video .logo{opacity:0;transform:translateY(32px);transition:transform 350ms cubic-bezier(.2, 0, 0, 1),visibility 0s 150ms,opacity 150ms cubic-bezier(0, 0, 1, 1);visibility:hidden}.touch-layer.video .subtitle-container,.touch-layer.video .title{opacity:0;transform:translateY(44px);transition:transform 350ms cubic-bezier(.2, 0, 0, 1),visibility 0s 150ms,opacity 150ms cubic-bezier(0, 0, 1, 1);visibility:hidden}.touch-layer.video .controls{transform:translateY(56px);transition:transform 350ms cubic-bezier(.2, 0, 0, 1)}.touch-layer.video .live-indicator,.touch-layer.video .scrubber-layer,.touch-layer.video .time-numbers,.touch-layer.video .slot{opacity:0;transition:visibility 0s 150ms,opacity 150ms cubic-bezier(0, 0, 1, 1);visibility:hidden}.touch-layer.video.active .scrim{opacity:1;transition:opacity 200ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.video.active .logo,.touch-layer.video.active .subtitle-container,.touch-layer.video.active .title{opacity:1;transform:translateY(0);transition:transform 400ms cubic-bezier(.2, 0, 0, 1),opacity 150ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.video.active .controls{transform:translateY(0);transition:transform 400ms cubic-bezier(.2, 0, 0, 1)}.touch-layer.video.active .live-indicator,.touch-layer.video.active .scrubber-layer,.touch-layer.video.active .time-numbers,.touch-layer.video.active .slot{opacity:1;transition:opacity 200ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.video.active .slot-2,.touch-layer.video.active .slot-3{transition-delay:50ms}.touch-layer.video.active .slot-1,.touch-layer.video.active .slot-4{transition-delay:100ms}.touch-layer.video.buffering .buffering-scrim{visibility:visible}.touch-layer.video.buffering .scrim,.touch-layer.video.buffering .logo,.touch-layer.video.buffering .subtitle-container,.touch-layer.video.buffering .title,.touch-layer.video.buffering .controls,.touch-layer.video.buffering .live-indicator,.touch-layer.video.buffering .scrubber-layer,.touch-layer.video.buffering .time-numbers,.touch-layer.video.buffering .slot{opacity:1;visibility:visible;transition:none;transform:none}.touch-layer.audio .controls{margin-top:auto}.touch-layer.audio .btn-play,.touch-layer.audio .btn-pause{width:124px;height:124px}.touch-layer.audio .scrim{background:linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.92));height:192px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.touch-layer.audio .scrim{height:240px}}.touch-layer.audio .time-numbers,.touch-layer.audio .slot{opacity:0;transition:visibility 0s 100ms,opacity 100ms cubic-bezier(0, 0, 1, 1);visibility:hidden}.touch-layer.audio .scrubber::-webkit-slider-thumb{transform:scaleY(.2);transition:transform 350ms cubic-bezier(.2, 0, 0, 1),visibility 0s 350ms;visibility:hidden}.touch-layer.audio .controls{transform:translateY(56px);transition:transform 350ms cubic-bezier(.2, 0, 0, 1)}.touch-layer.audio.active .time-numbers,.touch-layer.audio.active .slot{opacity:1;transition:opacity 200ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.audio.active .slot-2,.touch-layer.audio.active .slot-3{transition-delay:50ms}.touch-layer.audio.active .slot-1,.touch-layer.audio.active .slot-4{transition-delay:100ms}.touch-layer.audio.active .scrubber::-webkit-slider-thumb{transform:scaleY(1);transition:transform 400ms cubic-bezier(.2, 0, 0, 1);visibility:visible}.touch-layer.audio.active .controls{transform:translateY(0);transition:transform 400ms cubic-bezier(.2, 0, 0, 1)}.touch-layer.audio.scrubbing .scrubber::-webkit-slider-thumb{transform:scaleY(1);transition:transform 400ms cubic-bezier(.2, 0, 0, 1);visibility:visible}.touch-layer.audio.scrubbing .time-numbers{opacity:1;transition:opacity 200ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.audio.scrubbing-ending .time-numbers{opacity:1;transition:opacity 200ms cubic-bezier(0, 0, 1, 1);visibility:visible}.touch-layer.audio.hidden-audio-scrim .scrim{display:none}.touch-layer.photo .scrim,.touch-layer.disabled .scrim,.touch-layer.photo .video-metadata,.touch-layer.disabled .video-metadata,.touch-layer.photo .controls,.touch-layer.disabled .controls{display:none}.buttons{align-items:center;display:flex;flex:none;height:112px;justify-content:center}.buttons.break .slot:not(.center) .btn{display:none}.btn[aria-disabled=true]{pointer-events:none;opacity:.5}.slot{align-items:center;display:flex;height:56px;justify-content:center;margin:0 28px;width:56px}.slot.center{height:112px;width:112px}.slot.slot-1{margin-left:0;margin-right:auto}.slot.slot-4{margin-left:auto;margin-right:0}.btn{height:56px;width:56px}.btn-pause{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%20d=%27M30.5%2C9.5v29%27%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%0A%20%20%20%20%20%20stroke-linejoin=%27round%27%20vector-effect=%27non-scaling-stroke%27%0A%20%20%20%20%20%20stroke-width=%274%27/%3E%0A%20%20%3Cpath%20d=%27M17.5%2C9.5v29%27%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%0A%20%20%20%20%20%20stroke-linejoin=%27round%27%20vector-effect=%27non-scaling-stroke%27%0A%20%20%20%20%20%20stroke-width=%274%27/%3E%0A%3C/svg%3E%0A");height:112px;width:112px}.btn-play{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpolygon%20points=%2738.5%2024%2015.5%2038.5%2015.5%209.5%2038.5%2024%27%20fill=%27none%27%0A%20%20%20%20%20%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%0A%20%20%20%20%20%20stroke-width=%274%27%20vector-effect=%27non-scaling-stroke%27/%3E%0A%3C/svg%3E%0A");height:112px;width:112px}.btn-next{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%20d=%27M37%2C9.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v29a1.5%2C1.5%2C0%2C0%2C1-3%2C0Z%27%20fill=%27%23fff%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M11%2C12.22V35.78L29.69%2C24ZM33.3%2C25.27l-23%2C14.5A1.5%2C1.5%2C0%2C0%2C1%2C8%2C38.5V9.5a1.5%2C1.5%2C0%2C0%2C1%2C2.3-1.27l23%2C14.5a1.5%2C1.5%2C0%2C0%2C1%2C0%2C2.54Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-back{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%20d=%27M8%2C9.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v29a1.5%2C1.5%2C0%2C0%2C1-3%2C0Z%27%20fill=%27%23fff%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M14.7%2C25.27a1.5%2C1.5%2C0%2C0%2C1%2C0-2.54l23-14.5A1.5%2C1.5%2C0%2C0%2C1%2C40%2C9.5v29a1.5%2C1.5%2C0%2C0%2C1-2.3%2C1.27ZM37%2C35.78V12.22L18.31%2C24Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-forward-10{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M41%2024a1.5%201.5%200%200%201%203%200c0%2011.046-8.954%2020-20%2020S4%2035.046%204%2024%2012.954%204%2024%204h3.5a1.5%201.5%200%200%201%200%203H24C14.611%207%207%2014.611%207%2024s7.611%2017%2017%2017%2017-7.611%2017-17z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M24.44%202.56A1.5%201.5%200%200%201%2026.56.44l4%204a1.5%201.5%200%200%201%200%202.12l-4%204a1.5%201.5%200%200%201-2.12-2.12l2.939-2.94-2.94-2.94zM17.82%2030v-8.67l-2%20.82-.89-2.15%203.42-1.6h2V30zM27.65%2030.27A4.48%204.48%200%200%201%2024%2028.54a5.91%205.91%200%200%201-1-1.93%208.59%208.59%200%200%201%200-4.84%205.92%205.92%200%200%201%201-1.93%204.64%204.64%200%200%201%207.28%200%205.93%205.93%200%200%201%201%201.93%208.59%208.59%200%200%201%200%204.84%205.92%205.92%200%200%201-1%201.93%204.51%204.51%200%200%201-3.64%201.73h.01zm0-2.38a1.91%201.91%200%200%200%201-.28%202.44%202.44%200%200%200%20.76-.77%203.78%203.78%200%200%200%20.48-1.17%206.83%206.83%200%200%200%200-3%203.78%203.78%200%200%200-.48-1.17%202.44%202.44%200%200%200-.76-.77%202%202%200%200%200-2.06%200%202.44%202.44%200%200%200-.76.77%203.78%203.78%200%200%200-.48%201.17%206.87%206.87%200%200%200%200%203c.093.414.255.81.48%201.17.193.31.452.573.76.77a1.91%201.91%200%200%200%201.06.28z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-forward-15{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M41%2024a1.5%201.5%200%200%201%203%200c0%2011.046-8.954%2020-20%2020S4%2035.046%204%2024%2012.954%204%2024%204h3.5a1.5%201.5%200%200%201%200%203H24C14.611%207%207%2014.611%207%2024s7.611%2017%2017%2017%2017-7.611%2017-17z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M24.44%202.56A1.5%201.5%200%200%201%2026.56.44l4%204a1.5%201.5%200%200%201%200%202.12l-4%204a1.5%201.5%200%200%201-2.12-2.12l2.939-2.94-2.94-2.94zM18.51%2030v-8.67l-2%20.82-.89-2.15L19%2018.37h2V30zM27.69%2030.27a5.17%205.17%200%200%201-1.38-.19%204%204%200%200%201-2.25-1.58%203.9%203.9%200%200%201-.61-1.39l2.33-.9c.083.474.31.91.65%201.25a1.75%201.75%200%200%200%201.26.45%201.57%201.57%200%200%200%201.16-.48%201.74%201.74%200%200%200%200-2.38%201.59%201.59%200%200%200-1.18-.48%201.81%201.81%200%200%200-.85.19%202.12%202.12%200%200%200-.61.48l-2.45-1.12.63-5.76h6.78v2.18h-4.65L26.08%2023l.17.05a3.94%203.94%200%200%201%20.81-.48%202.84%202.84%200%200%201%201.18-.22%203.44%203.44%200%200%201%201.37.28c.435.184.83.453%201.16.79.347.358.622.779.81%201.24a4.19%204.19%200%200%201%20.31%201.63%204.25%204.25%200%200%201-.31%201.64%203.6%203.6%200%200%201-.87%201.27%203.94%203.94%200%200%201-1.33.82%204.72%204.72%200%200%201-1.69.25z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-forward-30{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M41%2024a1.5%201.5%200%200%201%203%200c0%2011.046-8.954%2020-20%2020S4%2035.046%204%2024%2012.954%204%2024%204h3.5a1.5%201.5%200%200%201%200%203H24C14.611%207%207%2014.611%207%2024s7.611%2017%2017%2017%2017-7.611%2017-17z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M24.44%202.56A1.5%201.5%200%200%201%2026.56.44l4%204a1.5%201.5%200%200%201%200%202.12l-4%204a1.5%201.5%200%200%201-2.12-2.12l2.939-2.94-2.94-2.94zM18.31%2030.27a4.67%204.67%200%200%201-2.76-.8A4.15%204.15%200%200%201%2014%2027.14l2.43-1c.1.96.936%201.673%201.9%201.62a1.7%201.7%200%200%200%201.07-.36%201.15%201.15%200%200%200%20.46-1c0-.92-.667-1.38-2-1.38h-1v-2.23h.94c.199%200%20.397-.024.59-.07.184-.04.36-.112.52-.21a1.07%201.07%200%200%200%20.37-.38%201.19%201.19%200%200%200%20.14-.59c0-.294-.12-.575-.33-.78a1.23%201.23%200%200%200-.93-.34%201.45%201.45%200%200%200-1%20.36%201.79%201.79%200%200%200-.52.85l-2.33-1a4.21%204.21%200%200%201%20.48-.92c.22-.315.49-.592.8-.82a4.17%204.17%200%200%201%201.14-.59%204.47%204.47%200%200%201%201.49-.23%204.9%204.9%200%200%201%201.57.24A3.74%203.74%200%200%201%2021%2019c.324.273.583.615.76%201%20.164.364.246.76.24%201.16a3.25%203.25%200%200%201-.46%201.7%202.54%202.54%200%200%201-.46.56%202.11%202.11%200%200%201-.51.35v.17a3%203%200%200%201%201.34%201%203%203%200%200%201%20.53%201.82%203.32%203.32%200%200%201-.29%201.39%203.21%203.21%200%200%201-.82%201.1A3.85%203.85%200%200%201%2020%2030a5.31%205.31%200%200%201-1.69.27zM29%2030.27a4.49%204.49%200%200%201-3.64-1.73%205.9%205.9%200%200%201-1-1.93%208.59%208.59%200%200%201%200-4.84%205.91%205.91%200%200%201%201-1.93%204.64%204.64%200%200%201%207.28%200%205.91%205.91%200%200%201%201%201.93%208.57%208.57%200%200%201%200%204.84%205.9%205.9%200%200%201-1%201.93A4.51%204.51%200%200%201%2029%2030.27zm0-2.38a1.91%201.91%200%200%200%201-.28%202.44%202.44%200%200%200%20.77-.77%203.8%203.8%200%200%200%20.47-1.17%206.83%206.83%200%200%200%200-3%203.81%203.81%200%200%200-.47-1.17%202.44%202.44%200%200%200-.77-.77%202%202%200%200%200-2.06%200%202.44%202.44%200%200%200-.77.77%203.81%203.81%200%200%200-.47%201.17%206.83%206.83%200%200%200%200%203c.09.413.25.809.47%201.17.195.311.459.575.77.77a1.9%201.9%200%200%200%201.06.28z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-backward-10{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M4%2024a1.5%201.5%200%200%201%203%200c0%209.389%207.611%2017%2017%2017s17-7.611%2017-17S33.389%207%2024%207h-3.5a1.5%201.5%200%200%201%200-3H24c11.046%200%2020%208.954%2020%2020s-8.954%2020-20%2020S4%2035.046%204%2024z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M20.621%205.5l2.94%202.94a1.5%201.5%200%200%201-2.122%202.12l-4-4a1.5%201.5%200%200%201%200-2.12l4-4a1.5%201.5%200%200%201%202.122%202.12L20.62%205.5zM17.82%2030v-8.67l-2%20.82-.89-2.15%203.42-1.6h2V30zm9.83.27A4.48%204.48%200%200%201%2024%2028.54a5.91%205.91%200%200%201-1-1.93%208.59%208.59%200%200%201%200-4.84%205.92%205.92%200%200%201%201-1.93%204.64%204.64%200%200%201%207.28%200%205.93%205.93%200%200%201%201%201.93%208.59%208.59%200%200%201%200%204.84%205.92%205.92%200%200%201-1%201.93%204.51%204.51%200%200%201-3.64%201.73h.01zm0-2.38a1.91%201.91%200%200%200%201-.28%202.44%202.44%200%200%200%20.76-.77%203.78%203.78%200%200%200%20.48-1.17%206.83%206.83%200%200%200%200-3%203.78%203.78%200%200%200-.48-1.17%202.44%202.44%200%200%200-.76-.77%202%202%200%200%200-2.06%200%202.44%202.44%200%200%200-.76.77%203.78%203.78%200%200%200-.48%201.17%206.87%206.87%200%200%200%200%203c.093.414.255.81.48%201.17.193.31.452.573.76.77a1.91%201.91%200%200%200%201.06.28z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-backward-15{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M4%2024a1.5%201.5%200%200%201%203%200c0%209.389%207.611%2017%2017%2017s17-7.611%2017-17S33.389%207%2024%207h-3.5a1.5%201.5%200%200%201%200-3H24c11.046%200%2020%208.954%2020%2020s-8.954%2020-20%2020S4%2035.046%204%2024z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M20.621%205.5l2.94%202.94a1.5%201.5%200%200%201-2.122%202.12l-4-4a1.5%201.5%200%200%201%200-2.12l4-4a1.5%201.5%200%200%201%202.122%202.12L20.62%205.5zM18.51%2030v-8.67l-2%20.82-.89-2.15L19%2018.37h2V30zM27.69%2030.27a5.17%205.17%200%200%201-1.38-.19%204%204%200%200%201-2.25-1.58%203.9%203.9%200%200%201-.61-1.39l2.33-.9c.083.474.31.91.65%201.25a1.75%201.75%200%200%200%201.26.45%201.57%201.57%200%200%200%201.16-.48%201.74%201.74%200%200%200%200-2.38%201.59%201.59%200%200%200-1.18-.48%201.81%201.81%200%200%200-.85.19%202.12%202.12%200%200%200-.61.48l-2.45-1.12.63-5.76h6.78v2.18h-4.65L26.08%2023l.17.05a3.94%203.94%200%200%201%20.81-.48%202.84%202.84%200%200%201%201.18-.22%203.44%203.44%200%200%201%201.37.28c.435.184.83.453%201.16.79.347.358.622.779.81%201.24a4.19%204.19%200%200%201%20.31%201.63%204.25%204.25%200%200%201-.31%201.64%203.6%203.6%200%200%201-.87%201.27%203.94%203.94%200%200%201-1.33.82%204.72%204.72%200%200%201-1.69.25z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-seek-backward-30{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M4%2024a1.5%201.5%200%200%201%203%200c0%209.389%207.611%2017%2017%2017s17-7.611%2017-17S33.389%207%2024%207h-3.5a1.5%201.5%200%200%201%200-3H24c11.046%200%2020%208.954%2020%2020s-8.954%2020-20%2020S4%2035.046%204%2024z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M20.621%205.5l2.94%202.94a1.5%201.5%200%200%201-2.122%202.12l-4-4a1.5%201.5%200%200%201%200-2.12l4-4a1.5%201.5%200%200%201%202.122%202.12L20.62%205.5zM18.31%2030.27a4.67%204.67%200%200%201-2.76-.8A4.15%204.15%200%200%201%2014%2027.14l2.43-1c.1.96.936%201.673%201.9%201.62a1.7%201.7%200%200%200%201.07-.36%201.15%201.15%200%200%200%20.46-1c0-.92-.667-1.38-2-1.38h-1v-2.23h.94c.199%200%20.397-.024.59-.07.184-.04.36-.112.52-.21a1.07%201.07%200%200%200%20.37-.38%201.19%201.19%200%200%200%20.14-.59c0-.294-.12-.575-.33-.78a1.23%201.23%200%200%200-.93-.34%201.45%201.45%200%200%200-1%20.36%201.79%201.79%200%200%200-.52.85l-2.33-1a4.21%204.21%200%200%201%20.48-.92c.22-.315.49-.592.8-.82a4.17%204.17%200%200%201%201.14-.59%204.47%204.47%200%200%201%201.49-.23%204.9%204.9%200%200%201%201.57.24A3.74%203.74%200%200%201%2021%2019c.324.273.583.615.76%201%20.164.364.246.76.24%201.16a3.25%203.25%200%200%201-.46%201.7%202.54%202.54%200%200%201-.46.56%202.11%202.11%200%200%201-.51.35v.17a3%203%200%200%201%201.34%201%203%203%200%200%201%20.53%201.82%203.32%203.32%200%200%201-.29%201.39%203.21%203.21%200%200%201-.82%201.1A3.85%203.85%200%200%201%2020%2030a5.31%205.31%200%200%201-1.69.27zM29%2030.27a4.49%204.49%200%200%201-3.64-1.73%205.9%205.9%200%200%201-1-1.93%208.59%208.59%200%200%201%200-4.84%205.91%205.91%200%200%201%201-1.93%204.64%204.64%200%200%201%207.28%200%205.91%205.91%200%200%201%201%201.93%208.57%208.57%200%200%201%200%204.84%205.9%205.9%200%200%201-1%201.93A4.51%204.51%200%200%201%2029%2030.27zm0-2.38a1.91%201.91%200%200%200%201-.28%202.44%202.44%200%200%200%20.77-.77%203.8%203.8%200%200%200%20.47-1.17%206.83%206.83%200%200%200%200-3%203.81%203.81%200%200%200-.47-1.17%202.44%202.44%200%200%200-.77-.77%202%202%200%200%200-2.06%200%202.44%202.44%200%200%200-.77.77%203.81%203.81%200%200%200-.47%201.17%206.83%206.83%200%200%200%200%203c.09.413.25.809.47%201.17.195.311.459.575.77.77a1.9%201.9%200%200%200%201.06.28z%27%0A%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-repeat[data-state=\'off\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M39%2C32H33.5a1.5%2C1.5%2C0%2C0%2C1%2C0-3h9A1.5%2C1.5%2C0%2C0%2C1%2C44%2C30.5h0v9a1.5%2C1.5%2C0%2C0%2C1-3%2C0v-5A20%2C20%2C0%2C0%2C1%2C5.27%2C31a1.5%2C1.5%2C0%2C1%2C1%2C2.8-1A17%2C17%2C0%2C0%2C0%2C39%2C32ZM9%2C16h5.5a1.5%2C1.5%2C0%2C0%2C1%2C0%2C3h-9A1.5%2C1.5%2C0%2C0%2C1%2C4%2C17.5v-9a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v5A20%2C20%2C0%2C0%2C1%2C42.73%2C17a1.5%2C1.5%2C0%2C0%2C1-2.8%2C1A17%2C17%2C0%2C0%2C0%2C9%2C16Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-repeat[data-state=\'all\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M39%2C32H33.5a1.5%2C1.5%2C0%2C0%2C1%2C0-3h9A1.5%2C1.5%2C0%2C0%2C1%2C44%2C30.5h0v9a1.5%2C1.5%2C0%2C0%2C1-3%2C0v-5A20%2C20%2C0%2C0%2C1%2C5.27%2C31a1.5%2C1.5%2C0%2C1%2C1%2C2.8-1A17%2C17%2C0%2C0%2C0%2C39%2C32ZM9%2C16h5.5a1.5%2C1.5%2C0%2C0%2C1%2C0%2C3h-9A1.5%2C1.5%2C0%2C0%2C1%2C4%2C17.5v-9a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v5A20%2C20%2C0%2C0%2C1%2C42.73%2C17a1.5%2C1.5%2C0%2C0%2C1-2.8%2C1A17%2C17%2C0%2C0%2C0%2C9%2C16Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%3C/svg%3E%0A")}.btn-repeat[data-state=\'single\']{content:url("data:image/svg+xml,%3Csvg%20viewBox=%270%200%2048%2048%27%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M39%2C32H33.5a1.5%2C1.5%2C0%2C0%2C1%2C0-3h9A1.5%2C1.5%2C0%2C0%2C1%2C44%2C30.5h0v9a1.5%2C1.5%2C0%2C0%2C1-3%2C0v-5A20%2C20%2C0%2C0%2C1%2C5.27%2C31a1.5%2C1.5%2C0%2C1%2C1%2C2.8-1A17%2C17%2C0%2C0%2C0%2C39%2C32ZM9%2C16h5.5a1.5%2C1.5%2C0%2C0%2C1%2C0%2C3h-9A1.5%2C1.5%2C0%2C0%2C1%2C4%2C17.5v-9a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v5A20%2C20%2C0%2C0%2C1%2C42.73%2C17a1.5%2C1.5%2C0%2C0%2C1-2.8%2C1A17%2C17%2C0%2C0%2C0%2C9%2C16Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%20%20%3Cpolygon%20fill=%27%234285F4%27%20fill-rule=%27nonzero%27%0A%20%20%20%20%20%20points=%2723.8%2029.92%2023.8%2021.25%2021.8%2022.07%2020.87%2019.89%2024.28%2018.29%2026.28%2018.29%2026.28%2029.92%27%3E%3C/polygon%3E%0A%3C/svg%3E%0A")}.btn-shuffle{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M37%2C11H29.5a1.5%2C1.5%2C0%2C0%2C1%2C0-3h9A1.5%2C1.5%2C0%2C0%2C1%2C40%2C9.5v9a1.5%2C1.5%2C0%2C0%2C1-3%2C0Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M8.44%2C10.56a1.5%2C1.5%2C0%2C0%2C1%2C2.12-2.12l27%2C27a1.5%2C1.5%2C0%2C0%2C1-2.12%2C2.12Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M35.44%2C10.44a1.5%2C1.5%2C0%2C0%2C1%2C2.12%2C2.12l-27%2C27a1.5%2C1.5%2C0%2C0%2C1-2.12-2.12Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M37%2C37V29.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v9A1.5%2C1.5%2C0%2C0%2C1%2C38.5%2C40h-9a1.5%2C1.5%2C0%2C0%2C1%2C0-3Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-shuffle[aria-pressed=\'true\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M37%2C11H29.5a1.5%2C1.5%2C0%2C0%2C1%2C0-3h9A1.5%2C1.5%2C0%2C0%2C1%2C40%2C9.5v9a1.5%2C1.5%2C0%2C0%2C1-3%2C0Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M8.44%2C10.56a1.5%2C1.5%2C0%2C0%2C1%2C2.12-2.12l27%2C27a1.5%2C1.5%2C0%2C0%2C1-2.12%2C2.12Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M35.44%2C10.44a1.5%2C1.5%2C0%2C0%2C1%2C2.12%2C2.12l-27%2C27a1.5%2C1.5%2C0%2C0%2C1-2.12-2.12Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M37%2C37V29.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v9A1.5%2C1.5%2C0%2C0%2C1%2C38.5%2C40h-9a1.5%2C1.5%2C0%2C0%2C1%2C0-3Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%3C/svg%3E%0A")}.btn-captions{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d=%27M7%2011v26h34V11H7zm-.75-3h35.5A2.25%202.25%200%200%201%2044%2010.25v27.5A2.25%202.25%200%200%201%2041.75%2040H6.25A2.25%202.25%200%200%201%204%2037.75v-27.5A2.25%202.25%200%200%201%206.25%208z%27%0A%20%20%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20%20%20%20%20d=%27M23.38%2028a6%206%200%200%201-4.88%202.24A6.35%206.35%200%200%201%2016%2018a6.47%206.47%200%200%201%202.53-.49%206.1%206.1%200%200%201%202.59.51%206.42%206.42%200%200%201%202%201.48l-1.85%201.8a4.18%204.18%200%200%200-1.14-.91%203.23%203.23%200%200%200-1.58-.37%204%204%200%200%200-1.49.27%203.48%203.48%200%200%200-1.2.78%203.66%203.66%200%200%200-.8%201.22%204.42%204.42%200%200%200%200%203.15c.182.456.454.871.8%201.22.342.34.75.606%201.2.78a4%204%200%200%200%201.49.27%203.45%203.45%200%200%200%201.68-.39%204.27%204.27%200%200%200%201.29-1.12l1.86%201.8zM36%2028a6%206%200%200%201-4.88%202.24%206.48%206.48%200%200%201-2.53-.49%206.35%206.35%200%200%201%200-11.73%206.48%206.48%200%200%201%202.53-.49%206.11%206.11%200%200%201%202.59.51%206.41%206.41%200%200%201%202%201.48l-1.85%201.8a4.18%204.18%200%200%200-1.14-.91%203.22%203.22%200%200%200-1.58-.37%204%204%200%200%200-1.49.27%203.48%203.48%200%200%200-1.2.78%203.64%203.64%200%200%200-.8%201.22%204.42%204.42%200%200%200%200%203.15c.182.456.454.871.8%201.22.342.34.75.606%201.2.78a4%204%200%200%200%201.49.27%203.45%203.45%200%200%200%201.68-.39c.5-.283.94-.664%201.29-1.12L36%2028z%27%0A%20%20%20%20%20%20%20%20fill=%27%23FFF%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-captions[aria-pressed=\'true\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M7%2011v26h34V11H7zm-.75-3h35.5A2.25%202.25%200%200%201%2044%2010.25v27.5A2.25%202.25%200%200%201%2041.75%2040H6.25A2.25%202.25%200%200%201%204%2037.75v-27.5A2.25%202.25%200%200%201%206.25%208z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27%20fill-rule=%27nonzero%27/%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M23.38%2028a6%206%200%200%201-4.88%202.24A6.35%206.35%200%200%201%2016%2018a6.47%206.47%200%200%201%202.53-.49%206.1%206.1%200%200%201%202.59.51%206.42%206.42%200%200%201%202%201.48l-1.85%201.8a4.18%204.18%200%200%200-1.14-.91%203.23%203.23%200%200%200-1.58-.37%204%204%200%200%200-1.49.27%203.48%203.48%200%200%200-1.2.78%203.66%203.66%200%200%200-.8%201.22%204.42%204.42%200%200%200%200%203.15c.182.456.454.871.8%201.22.342.34.75.606%201.2.78a4%204%200%200%200%201.49.27%203.45%203.45%200%200%200%201.68-.39%204.27%204.27%200%200%200%201.29-1.12l1.86%201.8zM36%2028a6%206%200%200%201-4.88%202.24%206.48%206.48%200%200%201-2.53-.49%206.35%206.35%200%200%201%200-11.73%206.48%206.48%200%200%201%202.53-.49%206.11%206.11%200%200%201%202.59.51%206.41%206.41%200%200%201%202%201.48l-1.85%201.8a4.18%204.18%200%200%200-1.14-.91%203.22%203.22%200%200%200-1.58-.37%204%204%200%200%200-1.49.27%203.48%203.48%200%200%200-1.2.78%203.64%203.64%200%200%200-.8%201.22%204.42%204.42%200%200%200%200%203.15c.182.456.454.871.8%201.22.342.34.75.606%201.2.78a4%204%200%200%200%201.49.27%203.45%203.45%200%200%200%201.68-.39c.5-.283.94-.664%201.29-1.12L36%2028z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27%20fill-rule=%27nonzero%27/%3E%0A%3C/svg%3E%0A")}.btn-like{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M7%2C41.5a1.5%2C1.5%2C0%2C0%2C1-3%2C0v-21a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0Zm29.82.21A2.59%2C2.59%2C0%2C0%2C1%2C34.31%2C43H11.5A1.5%2C1.5%2C0%2C0%2C1%2C10%2C41.5v-22a1.5%2C1.5%2C0%2C0%2C1%2C.44-1.06l11-11A11%2C11%2C0%2C0%2C1%2C22.8%2C6.28a7.15%2C7.15%2C0%2C0%2C1%2C2.15-1.12%2C3.31%2C3.31%2C0%2C0%2C1%2C2.89.35%2C5%2C5%2C0%2C0%2C1%2C2%2C2.89%2C7.94%2C7.94%2C0%2C0%2C1%2C.2%2C3c0%2C.18%2C0%2C.33-.06.42a1.5%2C1.5%2C0%2C0%2C1-.07.25l-2.24%2C6H39c2.81%2C0%2C5%2C2.63%2C5%2C5.5v2.94a3.36%2C3.36%2C0%2C0%2C1-.42%2C1.43ZM33.5%2C40h.83L40.9%2C26.5l.05-.1s0-1%2C0-2.9A2.39%2C2.39%2C0%2C0%2C0%2C39%2C21H25.5a1.5%2C1.5%2C0%2C0%2C1-1.4-2L27%2C11.12a5.21%2C5.21%2C0%2C0%2C0-.1-1.93A2%2C2%2C0%2C0%2C0%2C26.16%2C8S26%2C8%2C25.8%2C8a4.37%2C4.37%2C0%2C0%2C0-1.23.67%2C8.89%2C8.89%2C0%2C0%2C0-.73.59l-.28.26L13%2C20.12V40Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-like[aria-pressed=\'true\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M7%2C41.5a1.5%2C1.5%2C0%2C0%2C1-3%2C0v-21a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0Zm29.82.21A2.59%2C2.59%2C0%2C0%2C1%2C34.31%2C43H11.5A1.5%2C1.5%2C0%2C0%2C1%2C10%2C41.5v-22a1.5%2C1.5%2C0%2C0%2C1%2C.44-1.06l11-11A11%2C11%2C0%2C0%2C1%2C22.8%2C6.28a7.15%2C7.15%2C0%2C0%2C1%2C2.15-1.12%2C3.31%2C3.31%2C0%2C0%2C1%2C2.89.35%2C5%2C5%2C0%2C0%2C1%2C2%2C2.89%2C7.94%2C7.94%2C0%2C0%2C1%2C.2%2C3c0%2C.18%2C0%2C.33-.06.42a1.5%2C1.5%2C0%2C0%2C1-.07.25l-2.24%2C6H39c2.81%2C0%2C5%2C2.63%2C5%2C5.5v2.94a3.36%2C3.36%2C0%2C0%2C1-.42%2C1.43ZM33.5%2C40h.83L40.9%2C26.5l.05-.1s0-1%2C0-2.9A2.39%2C2.39%2C0%2C0%2C0%2C39%2C21H25.5a1.5%2C1.5%2C0%2C0%2C1-1.4-2L27%2C11.12a5.21%2C5.21%2C0%2C0%2C0-.1-1.93A2%2C2%2C0%2C0%2C0%2C26.16%2C8S26%2C8%2C25.8%2C8a4.37%2C4.37%2C0%2C0%2C0-1.23.67%2C8.89%2C8.89%2C0%2C0%2C0-.73.59l-.28.26L13%2C20.12V40Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%3C/svg%3E%0A")}.btn-dislike{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M41%2C6.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v21a1.5%2C1.5%2C0%2C0%2C1-3%2C0ZM11.18%2C6.29A2.59%2C2.59%2C0%2C0%2C1%2C13.69%2C5H36.5A1.5%2C1.5%2C0%2C0%2C1%2C38%2C6.5v22a1.5%2C1.5%2C0%2C0%2C1-.44%2C1.06l-11%2C11a11%2C11%2C0%2C0%2C1-1.38%2C1.18%2C7.15%2C7.15%2C0%2C0%2C1-2.15%2C1.12%2C3.31%2C3.31%2C0%2C0%2C1-2.89-.35%2C5%2C5%2C0%2C0%2C1-2-2.89%2C7.94%2C7.94%2C0%2C0%2C1-.2-3c0-.18%2C0-.33.06-.42A1.5%2C1.5%2C0%2C0%2C1%2C18.1%2C36l2.24-6H9c-2.81%2C0-5-2.63-5-5.5V21.56a3.36%2C3.36%2C0%2C0%2C1%2C.42-1.43ZM35%2C8H13.67L7.1%2C21.5%2C7%2C21.6s0%2C1%2C0%2C2.9A2.39%2C2.39%2C0%2C0%2C0%2C9%2C27H22.5a1.5%2C1.5%2C0%2C0%2C1%2C1.4%2C2L21%2C36.88a5.21%2C5.21%2C0%2C0%2C0%2C.1%2C1.93%2C2%2C2%2C0%2C0%2C0%2C.78%2C1.2s.12%2C0%2C.36%2C0a4.37%2C4.37%2C0%2C0%2C0%2C1.23-.67%2C8.89%2C8.89%2C0%2C0%2C0%2C.73-.59l.28-.26L35%2C27.88Z%27%0A%20%20%20%20%20%20fill=%27%23fff%27/%3E%0A%3C/svg%3E%0A")}.btn-dislike[aria-pressed=\'true\']{content:url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%0A%20%20%20%20%20%20d=%27M41%2C6.5a1.5%2C1.5%2C0%2C0%2C1%2C3%2C0v21a1.5%2C1.5%2C0%2C0%2C1-3%2C0ZM11.18%2C6.29A2.59%2C2.59%2C0%2C0%2C1%2C13.69%2C5H36.5A1.5%2C1.5%2C0%2C0%2C1%2C38%2C6.5v22a1.5%2C1.5%2C0%2C0%2C1-.44%2C1.06l-11%2C11a11%2C11%2C0%2C0%2C1-1.38%2C1.18%2C7.15%2C7.15%2C0%2C0%2C1-2.15%2C1.12%2C3.31%2C3.31%2C0%2C0%2C1-2.89-.35%2C5%2C5%2C0%2C0%2C1-2-2.89%2C7.94%2C7.94%2C0%2C0%2C1-.2-3c0-.18%2C0-.33.06-.42A1.5%2C1.5%2C0%2C0%2C1%2C18.1%2C36l2.24-6H9c-2.81%2C0-5-2.63-5-5.5V21.56a3.36%2C3.36%2C0%2C0%2C1%2C.42-1.43ZM35%2C8H13.67L7.1%2C21.5%2C7%2C21.6s0%2C1%2C0%2C2.9A2.39%2C2.39%2C0%2C0%2C0%2C9%2C27H22.5a1.5%2C1.5%2C0%2C0%2C1%2C1.4%2C2L21%2C36.88a5.21%2C5.21%2C0%2C0%2C0%2C.1%2C1.93%2C2%2C2%2C0%2C0%2C0%2C.78%2C1.2s.12%2C0%2C.36%2C0a4.37%2C4.37%2C0%2C0%2C0%2C1.23-.67%2C8.89%2C8.89%2C0%2C0%2C0%2C.73-.59l.28-.26L35%2C27.88Z%27%0A%20%20%20%20%20%20fill=%27%234285F4%27/%3E%0A%3C/svg%3E%0A")}.timeline{flex:none;margin-bottom:-13px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.timeline{margin-bottom:1px}}.live-indicator{font-size:24px;line-height:24px;text-align:right}.time-numbers:after{clear:both;content:"";display:table}.time-indicator{font-size:24px;line-height:24px;opacity:.5}.time-indicator.left{float:left}.time-indicator.right{float:right}.scrubber-layer{margin:-15px 0;height:60px;position:relative}.progress-bar{background-color:rgba(255,255,255,0.4);border-radius:2px;height:4px;left:0;overflow:hidden;position:absolute;top:28px;width:100%}.progress-fill{background-color:#fff;height:100%;left:0;position:absolute;top:0;transform:scaleX(0);transform-origin:left center;width:100%;will-change:transform}.progress-fill.break{background-color:#fbbc04}.progress-loading{height:100%;left:0;position:absolute;top:0;transform:scaleX(1);transform-origin:right center;width:100%;will-change:transform}input[type=range].scrubber{-webkit-tap-highlight-color:rgba(255,255,255,0);-webkit-focus-ring-color:rgba(255,255,255,0);-webkit-appearance:none;background-color:transparent;height:60px;left:0;margin:0;outline:none;position:absolute;top:0;width:100%;will-change:transform}input[type=range].scrubber::-webkit-slider-thumb{-webkit-appearance:none;background:#fff;border-radius:2px;cursor:pointer;height:24px;margin-top:18px;width:4px}input[type=range].scrubber::-webkit-slider-runnable-track{background:transparent;cursor:pointer;height:60px;width:100%}input[type=range].scrubber[disabled]::-webkit-slider-thumb{display:none}'
    }
};
cast.receiver.R.sg = {
    Lc: function(a) {
        a.innerHTML = '<div class=scrim></div><div class=buffering-scrim></div><div class=controls-layer><div class=video-metadata><div alt=logo class=logo id=logo src=""></div><div class=subtitle-container><h2 class=subtitle id=subtitle></h2></div><h1 class=title id=title></h1></div><div class=controls id=controls><div class=timeline><div class=live-indicator id=live-indicator><div class=live-label id=live-label></div></div><div class=scrubber-layer id=scrubber-layer><div class=progress-bar><div class=progress-fill id=progress-fill></div><div class="progress-loading loading-bar" id=progress-loading><div class="rect rect-primary"><span class=rect-inner></span></div><div class="rect rect-auxiliary"><span class=rect-inner></span></div></div></div><input class=scrubber id=scrubber max=300 min=0 step=any type=range></div><div class=time-numbers><div class="time-indicator left" id=current-time>0:00</div><div class="time-indicator right" id=total-time>0:00</div></div></div><div class=buttons id=buttons><div class="slot slot-1"></div><div class="slot slot-2"></div><div class="slot center"><img alt="" class=btn-play id=play role=button src=""><img alt="" class=btn-pause id=pause role=button src=""></div><div class="slot slot-3"></div><div class="slot slot-4"></div></div></div></div>'
    }
};

function Gh(a, b) {
    var c = this;
    this.Ta = this.Ua = v;
    this.h = a;
    this.g = b;
    this.l = !1;
    this.o = !0;
    this.h.addEventListener("click", function() {
        c.Ua()
    });
    this.g.addEventListener("click", function() {
        c.Ta()
    });
    this.h.alt = "Play";
    this.g.alt = "Pause";
    Hh(this)
}

function Hh(a) {
    a.h.classList.remove("hidden");
    a.g.classList.add("hidden");
    a.l = !1
};

function Ih(a, b, c) {
    ec.call(this);
    this.o = null != c ? Fa(a, c) : a;
    this.l = b;
    this.h = Fa(this.wm, this);
    this.g = []
}
Ha(Ih, ec);
h = Ih.prototype;
h.te = !1;
h.Jf = 0;
h.uc = null;
h.Xe = function(a) {
    this.g = arguments;
    this.uc || this.Jf ? this.te = !0 : Jh(this)
};
h.stop = function() {
    this.uc && (q.clearTimeout(this.uc), this.uc = null, this.te = !1, this.g = [])
};
h.pause = function() {
    this.Jf++
};
h.da = function() {
    Ih.ac.da.call(this);
    this.stop()
};
h.wm = function() {
    this.uc = null;
    this.te && !this.Jf && (this.te = !1, Jh(this))
};

function Jh(a) {
    a.uc = Dd(a.h, a.l);
    a.o.apply(null, a.g)
};

function Kh(a, b, c, d) {
    var e = this;
    this.G = a;
    this.J = b;
    this.g = b.querySelector("#scrubber");
    this.B = b.querySelector("#progress-fill");
    this.u = b.querySelector("#progress-loading");
    this.l = c;
    this.h = d;
    this.F = parseFloat(this.g.min);
    this.D = parseFloat(this.g.max);
    this.w = 0;
    this.A = this.C = this.o = !1;
    this.Va = v;
    this.K = new Ih(function(a) {
        e.l.textContent = Lh(parseInt(a, 10))
    }, 100);
    this.g.addEventListener("input", function() {
        e.o = !0;
        var a = e.g.value;
        Mh(e, a);
        e.K.Xe(a)
    });
    this.g.addEventListener("change", function() {
        e.o = !1;
        e.Va(parseFloat(e.g.value))
    })
}

function Mh(a, b) {
    var c = a.D - a.F;
    b -= a.F;
    c = c ? b / c : 0;
    b = (.5 - c) / 200;
    0 < c && (c += b);
    a.B.style.transform = "scaleX(" + c + ")";
    a.u.style.transform = "scaleX(" + (1 - c) + ")"
}
Kh.prototype.Zb = function(a) {
    this.J.classList.toggle("hidden", !a);
    this.l.classList.toggle("hidden", !a);
    this.h.classList.toggle("hidden", !a)
};
Kh.prototype.Wb = function(a) {
    this.o || (this.g.value = a, this.l.textContent = Lh(a), Mh(this, this.g.value))
};
Kh.prototype.setDuration = function(a) {
    a !== this.w && (this.w = a, 0 > a ? (this.g.max = 0, this.h.textContent = "") : (this.g.max = a, this.h.textContent = Lh(a)), Nh(this, 0 >= a), this.D = parseFloat(this.g.max))
};

function Nh(a, b) {
    a.g.disabled = (void 0 === b ? !1 : b) || !a.C || a.A
}

function Lh(a) {
    if (isNaN(a) || !isFinite(a)) return "";
    a = Math.floor(a);
    var b = Math.floor(a / 3600),
        c = Math.floor(a / 60) % 60;
    a %= 60;
    return b ? eb(b, 1) + ":" + eb(c, 2) + ":" + eb(a, 2) : eb(c, 1) + ":" + eb(a, 2)
};

function Oh(a) {
    var b = this;
    this.g = a;
    this.u = a.querySelector("#scrubber");
    this.B = a.querySelector("#controls");
    this.h = a.querySelector("#logo");
    this.C = a.querySelector("#title");
    this.o = a.querySelector("#subtitle");
    this.w = this.l = !1;
    this.B.addEventListener("touchstart", function(a) {
        b.g.classList.contains("active") && (a.stopPropagation(), Ph(b))
    });
    this.g.addEventListener("touchstart", function(a) {
        a.target !== b.u && (b.g.classList.contains("active") ? (Qh(b, !1), clearTimeout(b.A), b.g.classList.remove("active"), b.g.classList.remove("scrubbing-ending")) :
            (Rh(b), Ph(b), a.preventDefault()))
    });
    this.u.addEventListener("input", function() {
        Qh(b, !0)
    });
    this.u.addEventListener("change", function() {
        Qh(b, !1);
        Ph(b)
    })
}

function Sh(a, b) {
    if (!a.g.classList.contains(b)) {
        for (var c in Fh) Fh.hasOwnProperty(c) && a.g.classList.remove(Fh[c]);
        a.g.classList.add(b)
    }
}

function Th(a, b) {
    a.C.innerText = b || ""
}

function Uh(a, b, c) {
    if ("none" === window.getComputedStyle(a.h, null).backgroundImage)
        if (c) {
            var d = new Image;
            d.src = c;
            d.decode().then(function() {
                a.h.style.backgroundImage = "url('" + c + "')";
                a.h.classList.add("app-icon")
            }, function() {
                a.h.textContent = b
            })
        } else a.h.textContent = b
}

function Rh(a) {
    clearTimeout(a.A);
    a.g.classList.add("active")
}

function Ph(a) {
    clearTimeout(a.A);
    a.A = setTimeout(function() {
        a.w || a.l || (a.g.classList.remove("active"), a.g.classList.remove("scrubbing-ending"))
    }, 8E3)
}

function Qh(a, b) {
    a.w !== b && (a.w = b, clearTimeout(a.D), a.g.classList.toggle("scrubbing", b), b || (a.g.classList.add("scrubbing-ending"), a.D = setTimeout(function() {
        a.g.classList.remove("scrubbing-ending")
    }, 4E3)))
};

function Vh() {
    var a = HTMLDivElement.call(this) || this;
    a.bc = null;
    a.zg = null;
    a.zc = null;
    a.ma = null;
    a.la = null;
    a.ve = {};
    a.Ta = v;
    a.Ua = v;
    a.Va = v;
    return a
}
p(Vh, HTMLDivElement);
h = Vh.prototype;
h.createdCallback = function() {
    var a = this;
    this.ve = {};
    this.Va = this.Ua = this.Ta = v;
    var b = this.createShadowRoot(),
        c = document.createElement("style");
    cast.receiver.R.mj.Lc(c);
    this.bc = document.createElement("div");
    this.bc.classList.add("touch-layer");
    this.bc.innerHTML = cast.receiver.R.sg;
    cast.receiver.R.sg.Lc(this.bc);
    b.appendChild(c);
    b.appendChild(this.bc);
    b.getElementById("live-label").innerText = "LIVE";
    this.la = new Oh(this.bc);
    this.zg = b.getElementById("buttons");
    this.zc = new Gh(b.getElementById("play"), b.getElementById("pause"));
    this.ma = new Kh(b.getElementById("live-label"), b.getElementById("scrubber-layer"), b.getElementById("current-time"), b.getElementById("total-time"));
    for (var d in wh) wh.hasOwnProperty(d) && (b = wh[d], this.ve[b] = this.bc.querySelector(".slot." + b));
    this.zc.Ta = function() {
        a.Ta()
    };
    this.zc.Ua = function() {
        a.Ua()
    };
    this.ma.Va = function(b) {
        a.Va(b)
    }
};
h.ec = function(a, b) {
    if (!this.ve.hasOwnProperty(a)) throw Error("Invalid controls slot name. - " + a);
    for (a = this.ve[a]; a.firstChild;) a.removeChild(a.firstChild);
    b && a.appendChild(b.element)
};
h.Zb = function(a) {
    this.ma.Zb(a)
};
h.Wb = function(a) {
    this.ma.Wb(a)
};
h.setDuration = function(a) {
    this.ma.setDuration(a)
};

function Wh(a, b) {
    "IDLE" === b ? a.la.g.classList.toggle("disabled", !0) : a.la.g.classList.toggle("disabled", !1);
    if ("PLAYING" === b) {
        var c = a.zc;
        c.h.classList.add("hidden");
        c.o && c.g.classList.remove("hidden");
        c.l = !0;
        c = a.la;
        c.l = !1;
        Ph(c)
    }
    "PAUSED" === b && (Hh(a.zc), c = a.la, c.l || Rh(c), c.l = !0);
    "BUFFERING" === b || "LOADING" === b ? (a.la.g.classList.toggle("buffering", !0), a.ma.u.classList.toggle("hidden", !1)) : (a.la.g.classList.toggle("buffering", !1), a.ma.u.classList.toggle("hidden", !0))
}

function Xh(a, b) {
    var c = a.ma;
    c.B.classList.toggle("break", b);
    c.A = b;
    Nh(c);
    a.zg.classList.toggle("break", b)
}
document.registerElement("touch-controls", {
    prototype: Vh.prototype
});

function Yh() {
    var a = this;
    this.C = !0;
    this.h = {};
    this.F = new th;
    this.l = new ph(this.F);
    this.g = this.u = this.o = null;
    Zh(this);
    var b = document.createElement("touch-controls");
    b.id = "player-controls";
    document.body.appendChild(b);
    this.g = b;
    $h();
    this.g.Ta = function() {
        rh(a.l.g, new jh("PAUSE"))
    };
    this.g.Ua = function() {
        rh(a.l.g, new jh("PLAY"))
    };
    this.g.Va = function(b) {
        var c = a.l,
            e = new mh;
        e.currentTime = b;
        rh(c.g, e)
    };
    Sh(this.g.la, Fh.VIDEO);
    Wh(this.g, "IDLE");
    this.g.setDuration(0);
    this.g.Wb(0);
    this.F.o = this.L.bind(this);
    this.F.u =
        this.M.bind(this);
    b = re.H().Pc();
    Uh(this.g.la, b.name, b.iconUrl)
}

function ai(a, b, c) {
    if (!Object.values(sh).includes(c)) throw Error("Invalid controls button name. - " + c);
    "no-button" !== c ? a.g.ec(b, a.h[c]) : a.g.ec(b, null)
}
Yh.prototype.Le = function() {
    ai(this, wh.SLOT_1, "no-button");
    ai(this, wh.SLOT_2, "no-button");
    ai(this, wh.SLOT_3, "no-button");
    ai(this, wh.SLOT_4, "no-button");
    this.C = !1
};
Yh.prototype.Zb = function(a) {
    this.g.Zb(a)
};

function Zh(a) {
    a.h["queue-next"] = new Ch(function() {
        var b = a.l,
            c = new Pg;
        c.jump = 1;
        rh(b.g, c)
    }, "Next item", "btn-next");
    a.h["queue-prev"] = new Ch(function() {
        var b = a.l,
            c = new Pg;
        c.jump = -1;
        rh(b.g, c)
    }, "Previous item", "btn-back");
    a.h["seek-forward-10"] = new Ch(function() {
        qh(a.l, 10)
    }, "Seek forward 10 seconds", "btn-seek-forward-10");
    a.h["seek-forward-15"] = new Ch(function() {
        qh(a.l, 15)
    }, "Seek forward 15 seconds", "btn-seek-forward-15");
    a.h["seek-forward-30"] = new Ch(function() {
            qh(a.l, 30)
        }, "Seek forward 30 seconds",
        "btn-seek-forward-30");
    a.h["seek-backward-10"] = new Ch(function() {
        qh(a.l, -10)
    }, "Seek backward 10 seconds", "btn-seek-backward-10");
    a.h["seek-backward-15"] = new Ch(function() {
        qh(a.l, -15)
    }, "Seek backward 15 seconds", "btn-seek-backward-15");
    a.h["seek-backward-30"] = new Ch(function() {
        qh(a.l, -30)
    }, "Seek backward 30 seconds", "btn-seek-backward-30");
    a.h.repeat = a.J = new zh(function(b) {
        var c = a.l,
            d = new Pg;
        d.repeatMode = b;
        rh(c.g, d)
    });
    a.h.shuffle = a.G = new Dh(function(b) {
        var c = a.l,
            d = new Pg;
        d.shuffle = b;
        rh(c.g, d);
        Eh(a.G,
            b)
    }, "Shuffle", "btn-shuffle");
    a.h.captions = a.K = new Dh(function(b) {
        var c = a.l,
            d = new lh;
        d.enableTextTracks = b;
        rh(c.g, d)
    }, "Captions", "btn-captions");
    a.h.like = a.A = new Dh(function(b) {
        if (b) {
            var c = a.l,
                d = new uf;
            d.userAction = "LIKE";
            vh(c.g, d);
            Eh(a.A, b);
            gf(a.A, !0);
            Eh(a.w, !1);
            gf(a.w, !1)
        }
    }, "Thumbs up", "btn-like");
    a.h.dislike = a.w = new Dh(function(b) {
        if (b) {
            var c = a.l,
                d = new uf;
            d.userAction = "DISLIKE";
            vh(c.g, d);
            Eh(a.w, b);
            gf(a.w, !0);
            Eh(a.A, !1);
            gf(a.A, !1)
        }
    }, "Thumbs down", "btn-dislike")
}

function bi(a, b) {
    gf(a.h["queue-next"], !(b & 64));
    gf(a.h["queue-prev"], !(b & 128));
    gf(a.h.shuffle, !(b & 256));
    b = !(b & 2);
    gf(a.h["seek-forward-10"], b);
    gf(a.h["seek-forward-15"], b);
    gf(a.h["seek-forward-30"], b);
    gf(a.h["seek-backward-10"], b);
    gf(a.h["seek-backward-15"], b);
    gf(a.h["seek-backward-30"], b)
}

function ci(a, b, c, d) {
    Sh(a.g.la, Fh.VIDEO);
    if (a.C) {
        d = !!(b & 2) && !d;
        var e = !!(b & 128);
        b = !!(b & 64);
        c ? ai(a, wh.SLOT_1, "captions") : e && d ? ai(a, wh.SLOT_1, "queue-prev") : ai(a, wh.SLOT_1, "no-button");
        d ? ai(a, wh.SLOT_2, "seek-backward-30") : e ? ai(a, wh.SLOT_2, "queue-prev") : ai(a, wh.SLOT_2, "no-button");
        d ? ai(a, wh.SLOT_3, "seek-forward-30") : b ? ai(a, wh.SLOT_3, "queue-next") : ai(a, wh.SLOT_3, "no-button");
        d && b ? ai(a, wh.SLOT_4, "queue-next") : ai(a, wh.SLOT_4, "no-button")
    }
}

function di(a, b) {
    Sh(a.g.la, Fh.AUDIO);
    a.C && (b & 128 ? ai(a, wh.SLOT_2, "queue-prev") : ai(a, wh.SLOT_2, "no-button"), b & 64 ? ai(a, wh.SLOT_3, "queue-next") : ai(a, wh.SLOT_3, "no-button"))
}

function ei(a) {
    Sh(a.g.la, Fh.PHOTO);
    a.C && (ai(a, wh.SLOT_1, "no-button"), ai(a, wh.SLOT_2, "no-button"), ai(a, wh.SLOT_3, "no-button"), ai(a, wh.SLOT_4, "no-button"))
}

function fi(a, b, c) {
    var d = "LIVE" == b.streamType,
        e = a.g.ma,
        f = !!(c & 2) && !d;
    f || (e.o = !1);
    e.C = f;
    Nh(e);
    e = a.g.zc;
    f = !!(c & 1);
    (e.o = f) ? e.l && e.g.classList.remove("hidden"): e.g.classList.add("hidden");
    e = a.g.ma;
    e.G.classList.toggle("invisible", !d);
    e.l.classList.toggle("invisible", d);
    e.h.classList.toggle("invisible", d);
    if (b.metadata) switch (b.metadata.metadataType) {
        case 1:
            ci(a, c, gi(b), d);
            return;
        case 2:
            ci(a, c, gi(b), d);
            return;
        case 3:
            di(a, c);
            return;
        case 4:
            ei(a);
            return
    }
    e = hi(b.contentType);
    "audio" === e ? di(a, c) : "image" === e ?
        ei(a) : ci(a, c, gi(b), d)
}

function ii(a, b) {
    Th(a.g.la, "");
    a.g.la.o.innerText = "";
    if (b) switch (b.metadataType) {
        case 3:
            break;
        case 4:
            break;
        case 2:
            Th(a.g.la, b.seriesTitle || b.title || "");
            break;
        case 1:
            Th(a.g.la, b.title || "");
            a.g.la.o.innerText = b.subtitle || "";
            break;
        case 0:
            Th(a.g.la, b.title || "");
            a.g.la.o.innerText = b.subtitle || "";
            break;
        default:
            E(ji, "Unexpected metadata type: " + b.metadataType)
    }
}

function ki(a, b, c) {
    Th(a.g.la, "");
    a.g.la.o.innerText = "";
    b ? (Th(a.g.la, b.title || ""), a.g.setDuration(b.duration || 0), a.g.Wb(c)) : E(ji, "Unknown break clip in media status")
}
Yh.prototype.L = function(a) {
    a && (Xh(this.g, !!a.breakStatus), bi(this, a.supportedMediaCommands), a.media && li(this, a.media), a.breakStatus ? (this.u = (this.o && this.o.breakClips || []).find(function(b) {
        return b.id == a.breakStatus.breakClipId
    }) || this.u, ki(this, this.u, a.breakStatus.currentBreakClipTime)) : (this.u && (this.u = null, this.g.setDuration(this.o.duration || 0), ii(this, this.o.metadata)), a.media && (a.media.duration && this.g.setDuration(a.media.duration), fi(this, a.media, a.supportedMediaCommands)), u(a.currentTime) &&
        isFinite(a.currentTime) && !isNaN(a.currentTime) && this.g.Wb(a.currentTime), a.queueData && r(a.queueData.repeatMode) && Ah(this.J, a.queueData.repeatMode), a.queueData && Eh(this.G, !!a.queueData.shuffle)), a.playerState && "IDLE" === a.playerState && a.extendedStatus && "LOADING" === a.extendedStatus.playerState && (this.g.setDuration(0), this.g.Wb(0), fi(this, a.extendedStatus.media, a.supportedMediaCommands), li(this, a.extendedStatus.media || null)), Eh(this.K, mi(this, a)))
};

function li(a, b) {
    a.o && b && a.o.contentId == b.contentId || (Eh(a.A, !1), Eh(a.w, !1));
    a.o = b
}

function mi(a, b) {
    if (b.activeTrackIds && a.o.tracks) {
        b = n(b.activeTrackIds);
        for (var c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            for (var d = n(a.o.tracks), e = d.next(); !e.done; e = d.next())
                if (e = e.value, e.trackId == c && "TEXT" == e.type) return !0
        }
    }
    return !1
}

function gi(a) {
    return a && a.tracks && a.tracks.some(function(a) {
        return "TEXT" == a.type
    }) || !1
}
Yh.prototype.M = function() {
    Ah(this.J, "REPEAT_OFF");
    Eh(this.G, !1)
};

function hi(a) {
    var b = ni;
    switch (a.toLowerCase().split("/")[0]) {
        case b.IMAGE:
            return b.IMAGE;
        case b.AUDIO:
            return b.AUDIO;
        case b.VIDEO:
            return b.VIDEO;
        default:
            return b.VIDEO
    }
}

function $h() {
    var a = window.document.createElement("style");
    cast.receiver.R.Ci.Lc(a);
    window.document.body.appendChild(a)
}
var ni = {
        VIDEO: "video",
        AUDIO: "audio",
        IMAGE: "image"
    },
    ji = D("cast.receiver.ui.ControlsBaseImplementation");
cast.receiver.crypto = {};
cast.receiver.cryptokeys = {};
cast.receiver.crypto.en = !(!cast.__platform__ || !cast.__platform__.cryptokeys);
cast.receiver.crypto.Ic = !(!cast.__platform__ || !cast.__platform__.crypto);
cast.receiver.cryptokeys.getKeyByName = cast.receiver.crypto.en ? cast.__platform__.cryptokeys.getKeyByName : window.cryptokeys && window.cryptokeys.getKeyByName;
cast.receiver.crypto.decrypt = cast.receiver.crypto.Ic ? cast.__platform__.crypto.decrypt : window.crypto.subtle.decrypt;
cast.receiver.crypto.encrypt = cast.receiver.crypto.Ic ? cast.__platform__.crypto.encrypt : window.crypto.subtle.encrypt;
cast.receiver.crypto.sign = cast.receiver.crypto.Ic ? cast.__platform__.crypto.sign : window.crypto.subtle.sign;
cast.receiver.crypto.unwrapKey = cast.receiver.crypto.Ic ? cast.__platform__.crypto.unwrapKey : window.crypto.subtle.unwrapKey;
cast.receiver.crypto.verify = cast.receiver.crypto.Ic ? cast.__platform__.crypto.verify : window.crypto.subtle.verify;
cast.receiver.crypto.wrapKey = cast.receiver.crypto.Ic ? cast.__platform__.crypto.wrapKey : window.crypto.subtle.wrapKey;

function oi(a) {
    this.F = se(a, "urn:x-cast:com.google.cast.debugoverlay", "JSON");
    this.F.l = this.D.bind(this);
    this.h = this.g = this.w = this.u = null;
    this.l = [];
    this.o = []
}
oi.prototype.D = function(a) {
    G(pi, "DebugOverlay: " + JSON.stringify(a.data));
    switch (a.data.type) {
        case "SHOW":
            qi(this);
            break;
        case "HIDE":
            ri(this)
    }
};

function qi(a) {
    a.g || a.h || (a.l.length = 0, a.o.length = 0, a.B(), a.g || (a.h = window.setInterval(a.B.bind(a), 1E3)))
}

function ri(a) {
    if (a.g || a.h) a.u && (document.body.removeChild(a.u.parentElement), a.u = null), a.w && (window.clearInterval(a.w), a.w = null), a.g && (Hc(a.g, "seeking", a.C, !1, a), a.g = null), a.h && (window.clearInterval(a.h), a.h = null)
}

function si(a, b) {
    G(pi, "found active video");
    a.g = b;
    b = document.createElement("div");
    b.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:9001;-webkit-text-fill-color:black;-webkit-text-stroke-color:red;-webkit-text-stroke-width:1px;padding-left:5vw;padding-top:5vh;margin:0;font-size:24pt";
    var c = document.createTextNode("");
    b.appendChild(c);
    b.id = "__CAST_DEBUG_OVERLAY__";
    document.body.appendChild(b);
    a.u = c;
    a.A();
    a.w = window.setInterval(a.A.bind(a), 1E3);
    yc(a.g, "seeking", a.C, !1, a);
    a.h && (window.clearInterval(a.h), a.h = null)
}
oi.prototype.A = function() {
    var a = this.g;
    if (a && a.src && !a.error && !a.ended && 1 <= a.readyState) {
        var b = a.videoWidth,
            c = a.videoHeight;
        if (0 >= b || 0 >= c) Pc(pi, "canceling draw because video not initialized");
        else {
            var d = 0;
            if (a.paused || a.seeking) Pc(pi, "not calculating fps because paused or seeking");
            else {
                d = a.webkitDecodedFrameCount;
                a = a.currentTime;
                var e = 0;
                if (0 < this.l.length && 0 < this.o.length) {
                    var f = this.l[0],
                        g = this.o[0];
                    a > f && d > g && (e = (d - g) / (a - f))
                }
                this.l.push(a);
                this.o.push(d);
                5 <= this.l.length && 5 <= this.o.length && (this.l.splice(0,
                    this.l.length - 5), this.o.splice(0, this.o.length - 5));
                d = e
            }
            b = b + "x" + c + "(" + (0 < d ? Math.round(d).toString() : "?") + ")";
            Pc(pi, "video is " + b);
            this.u.textContent = b
        }
    } else if (Pc(pi, "video is no longer active, restarting search procedure"), this.g || this.h) ri(this), qi(this)
};
oi.prototype.C = function() {
    G(pi, "onSeeking");
    this.l = [this.g.currentTime];
    this.o = [this.g.webkitDecodedFrameCount]
};
oi.prototype.B = function() {
    function a(b) {
        for (var c = n(b.document.getElementsByTagName("video")), e = c.next(); !e.done; e = c.next())
            if (e = e.value, e.src && !e.error && !e.ended && 1 <= e.readyState) return e;
        for (c = 0; c < b.frames.length; ++c) try {
            var f = a(b.frames[c]);
            if (f) return f
        } catch (g) {}
        return null
    }
    var b = a(window);
    b && si(this, b)
};
var pi = D("cast.receiver.DebugOverlay");
Me = function(a) {
    new oi(a)
};
cast.receiver.eme = {};
cast.receiver.eme.nn = new Uint8Array([43, 248, 102, 128, 198, 229, 78, 36, 190, 35, 15, 129, 90, 96, 110, 178]);
cast.receiver.eme.vn = 2;
cast.receiver.nb = D("cast");
cast.receiver.nb.u = function(a) {
    if (cast.receiver.nb) {
        var b = cast.receiver.nb;
        a: {
            if (!$b) {
                $b = {};
                for (var c = 0, d; d = Zb[c]; c++) $b[d.value] = d, $b[d.name] = d
            }
            if (a in $b) a = $b[a];
            else {
                for (c = 0; c < Zb.length; ++c)
                    if (d = Zb[c], d.value <= a) {
                        a = d;
                        break a
                    }
                a = null
            }
        }
        b.h = a
    }
};
if (cast.receiver.nb) {
    var ti = cast.qg ? 800 : 1E3,
        ui = parseInt(cast.receiver.platform.zb("log-level-cast-receiver"), 10);
    cast.receiver.nb.u(ui || ti)
};
var vi = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;

function wi() {}
wi.prototype.g = null;

function xi(a) {
    var b;
    (b = a.g) || (b = {}, yi(a) && (b[0] = !0, b[1] = !0), b = a.g = b);
    return b
};
var zi;

function Ai() {}
Ha(Ai, wi);

function Bi(a) {
    return (a = yi(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}

function yi(a) {
    if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
        for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
            var d = b[c];
            try {
                return new ActiveXObject(d), a.h = d
            } catch (e) {}
        }
        throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }
    return a.h
}
zi = new Ai;

function Ci(a) {
    if (a.Sa && "function" == typeof a.Sa) return a.Sa();
    if (t(a)) return a.split("");
    if (Ba(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    b = [];
    c = 0;
    for (d in a) b[c++] = a[d];
    return b
}

function Di(a, b) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
    else if (Ba(a) || t(a)) B(a, b, void 0);
    else {
        if (a.hb && "function" == typeof a.hb) var c = a.hb();
        else if (a.Sa && "function" == typeof a.Sa) c = void 0;
        else if (Ba(a) || t(a)) {
            c = [];
            for (var d = a.length, e = 0; e < d; e++) c.push(e)
        } else c = mb(a);
        d = Ci(a);
        e = d.length;
        for (var f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a)
    }
};
var Ei = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

function Fi(a) {
    Mc.call(this);
    this.headers = new me;
    this.M = a || null;
    this.l = !1;
    this.L = this.g = null;
    this.V = this.J = "";
    this.u = 0;
    this.B = "";
    this.o = this.O = this.G = this.N = !1;
    this.A = 0;
    this.F = null;
    this.X = "";
    this.K = this.T = !1
}
Ha(Fi, Mc);
Fi.prototype.P = D("goog.net.XhrIo");
var Gi = /^https?$/i,
    Hi = ["POST", "PUT"];
h = Fi.prototype;
h.send = function(a, b, c, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.J + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.J = a;
    this.B = "";
    this.u = 0;
    this.V = b;
    this.N = !1;
    this.l = !0;
    this.g = this.M ? Bi(this.M) : Bi(zi);
    this.L = this.M ? xi(this.M) : xi(zi);
    this.g.onreadystatechange = Fa(this.Dh, this);
    try {
        Pc(this.P, Ii(this, "Opening Xhr")), this.O = !0, this.g.open(b, String(a), !0), this.O = !1
    } catch (f) {
        Pc(this.P, Ii(this, "Error opening Xhr: " + f.message));
        Ji(this, f);
        return
    }
    a = c || "";
    var e = this.headers.clone();
    d && Di(d, function(a, b) {
        e.set(b, a)
    });
    d = Qa(e.hb(), Ki);
    c = q.FormData && a instanceof q.FormData;
    !Sa(Hi, b) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    e.forEach(function(a, b) {
        this.g.setRequestHeader(b, a)
    }, this);
    this.X && (this.g.responseType = this.X);
    "withCredentials" in this.g && this.g.withCredentials !== this.T && (this.g.withCredentials = this.T);
    try {
        Li(this), 0 < this.A && (this.K = Mi(this.g), Pc(this.P, Ii(this, "Will abort after " + this.A + "ms if incomplete, xhr2 " + this.K)), this.K ? (this.g.timeout =
            this.A, this.g.ontimeout = Fa(this.Vg, this)) : this.F = Dd(this.Vg, this.A, this)), Pc(this.P, Ii(this, "Sending request")), this.G = !0, this.g.send(a), this.G = !1
    } catch (f) {
        Pc(this.P, Ii(this, "Send error: " + f.message)), Ji(this, f)
    }
};

function Mi(a) {
    return Ab && Kb(9) && u(a.timeout) && r(a.ontimeout)
}

function Ki(a) {
    return "content-type" == a.toLowerCase()
}
h.Vg = function() {
    "undefined" != typeof va && this.g && (this.B = "Timed out after " + this.A + "ms, aborting", this.u = 8, Pc(this.P, Ii(this, this.B)), this.dispatchEvent("timeout"), this.abort(8))
};

function Ji(a, b) {
    a.l = !1;
    a.g && (a.o = !0, a.g.abort(), a.o = !1);
    a.B = b;
    a.u = 5;
    Ni(a);
    Oi(a)
}

function Ni(a) {
    a.N || (a.N = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
h.abort = function(a) {
    this.g && this.l && (Pc(this.P, Ii(this, "Aborting")), this.l = !1, this.o = !0, this.g.abort(), this.o = !1, this.u = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Oi(this))
};
h.da = function() {
    this.g && (this.l && (this.l = !1, this.o = !0, this.g.abort(), this.o = !1), Oi(this, !0));
    Fi.ac.da.call(this)
};
h.Dh = function() {
    this.mb() || (this.O || this.G || this.o ? Pi(this) : this.rm())
};
h.rm = function() {
    Pi(this)
};

function Pi(a) {
    if (a.l && "undefined" != typeof va)
        if (a.L[1] && 4 == Qi(a) && 2 == Ri(a)) Pc(a.P, Ii(a, "Local request error detected and ignored"));
        else if (a.G && 4 == Qi(a)) Dd(a.Dh, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == Qi(a)) {
        Pc(a.P, Ii(a, "Request complete"));
        a.l = !1;
        try {
            var b = Ri(a);
            a: switch (b) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                    var c = !0;
                    break a;
                default:
                    c = !1
            }
            var d;
            if (!(d = c)) {
                var e;
                if (e = 0 === b) {
                    var f = String(a.J).match(Ei)[1] || null;
                    if (!f && q.self && q.self.location) {
                        var g = q.self.location.protocol;
                        f = g.substr(0, g.length - 1)
                    }
                    e = !Gi.test(f ? f.toLowerCase() : "")
                }
                d = e
            }
            if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
                a.u = 6;
                try {
                    var k = 2 < Qi(a) ? a.g.statusText : ""
                } catch (l) {
                    Pc(a.P, "Can not get status: " + l.message), k = ""
                }
                a.B = k + " [" + Ri(a) + "]";
                Ni(a)
            }
        } finally {
            Oi(a)
        }
    }
}

function Oi(a, b) {
    if (a.g) {
        Li(a);
        var c = a.g,
            d = a.L[0] ? v : null;
        a.g = null;
        a.L = null;
        b || a.dispatchEvent("ready");
        try {
            c.onreadystatechange = d
        } catch (e) {
            E(a.P, "Problem encountered resetting onreadystatechange: " + e.message)
        }
    }
}

function Li(a) {
    a.g && a.K && (a.g.ontimeout = null);
    a.F && (q.clearTimeout(a.F), a.F = null)
}

function Qi(a) {
    return a.g ? a.g.readyState : 0
}

function Ri(a) {
    try {
        return 2 < Qi(a) ? a.g.status : -1
    } catch (b) {
        return -1
    }
}

function Ii(a, b) {
    return b + " [" + a.V + " " + a.J + " " + Ri(a) + "]"
};
var Si = {},
    Ti = (Si["application/ttml+xml"] = 1, Si["text/vtt"] = 2, Si["text/mp4"] = 3, Si["audio/mp4"] = 4, Si["video/mp4"] = 5, Si["video/mp2t"] = 6, Si["audio/webm"] = 7, Si["video/webm"] = 8, Si["application/x-mpegurl"] = 9, Si["application/vnd.apple.mpegurl"] = 10, Si["application/dash+xml"] = 11, Si["application/vnd.ms-sstr+xml"] = 12, Si["text/cea608"] = 13, Si["video/ogg"] = 14, Si["audio/aac"] = 15, Si["audio/mp3"] = 16, Si["audio/ogg"] = 17, Si["audio/wav"] = 18, Si["image/gif"] = 19, Si["image/jpg"] = 20, Si["image/png"] = 21, Si["text/mp2t"] = 22, Si["application/mp4"] =
        23, Si);

function Ui(a) {
    switch (a) {
        case "mp4a.a6":
            return 1;
        case "ec-3":
            return 2;
        case "mp4a.40.2":
            return 3;
        case "mp4a.40.5":
            return 4;
        case "mp4a.67":
            return 5;
        case "avc1.4D40":
            return 6;
        case "avc1.4D401E":
            return 7;
        case "mp4a.a5":
            return 8;
        case "ac-3":
            return 9;
        case "vorbis":
            return 10;
        case "opus":
            return 11;
        case "vp8":
            return 12;
        case "vp9":
            return 13
    }
    return 0 == a.lastIndexOf("avc1", 0) ? 11 : 0 == a.lastIndexOf("mp4a.40", 0) ? 12 : 0
}

function Vi(a, b) {
    a: {
        if (b) {
            if (Za(b, "video/")) {
                b = "Video";
                break a
            }
            if (Za(b, "audio/")) {
                b = "Audio";
                break a
            }
        }
        b = void 0
    }
    if (r(b)) {
        Wi("Cast.Shaka.Available" + b + "Bitrates", a.length);
        for (var c = 0; c < a.length; c++) Wi("Cast.Shaka.Available" + b + "Bitrate" + c, a[c])
    }
}

function Xi(a, b) {
    cast.platform.metrics.logBoolToUma(a, b)
}

function Yi(a) {
    a.split(",").forEach(function(a) {
        Wi("Cast.Shaka.Codec", Ui(a))
    })
}

function Zi(a) {
    cast.platform.metrics.logEventToUma(a)
}

function Wi(a, b) {
    cast.platform.metrics.logIntToUma(a, b)
};
var $i = {
        rn: {
            1E3: {
                other: "0K"
            },
            1E4: {
                other: "00K"
            },
            1E5: {
                other: "000K"
            },
            1E6: {
                other: "0M"
            },
            1E7: {
                other: "00M"
            },
            1E8: {
                other: "000M"
            },
            1E9: {
                other: "0B"
            },
            1E10: {
                other: "00B"
            },
            1E11: {
                other: "000B"
            },
            1E12: {
                other: "0T"
            },
            1E13: {
                other: "00T"
            },
            1E14: {
                other: "000T"
            }
        },
        qn: {
            1E3: {
                other: "0 thousand"
            },
            1E4: {
                other: "00 thousand"
            },
            1E5: {
                other: "000 thousand"
            },
            1E6: {
                other: "0 million"
            },
            1E7: {
                other: "00 million"
            },
            1E8: {
                other: "000 million"
            },
            1E9: {
                other: "0 billion"
            },
            1E10: {
                other: "00 billion"
            },
            1E11: {
                other: "000 billion"
            },
            1E12: {
                other: "0 trillion"
            },
            1E13: {
                other: "00 trillion"
            },
            1E14: {
                other: "000 trillion"
            }
        }
    },
    aj = $i;
aj = $i;
var bj = {
    AED: [2, "dh", "\u062f.\u0625.", "DH"],
    ALL: [0, "Lek", "Lek"],
    AUD: [2, "$", "AU$"],
    BDT: [2, "\u09f3", "Tk"],
    BGN: [2, "lev", "lev"],
    BRL: [2, "R$", "R$"],
    CAD: [2, "$", "C$"],
    CDF: [2, "FrCD", "CDF"],
    CHF: [2, "CHF", "CHF"],
    CLP: [0, "$", "CL$"],
    CNY: [2, "\u00a5", "RMB\u00a5"],
    COP: [32, "$", "COL$"],
    CRC: [0, "\u20a1", "CR\u20a1"],
    CZK: [50, "K\u010d", "K\u010d"],
    DKK: [50, "kr.", "kr."],
    DOP: [2, "RD$", "RD$"],
    EGP: [2, "\u00a3", "LE"],
    ETB: [2, "Birr", "Birr"],
    EUR: [2, "\u20ac", "\u20ac"],
    GBP: [2, "\u00a3", "GB\u00a3"],
    HKD: [2, "$", "HK$"],
    HRK: [2, "kn", "kn"],
    HUF: [34,
        "Ft", "Ft"
    ],
    IDR: [0, "Rp", "Rp"],
    ILS: [34, "\u20aa", "IL\u20aa"],
    INR: [2, "\u20b9", "Rs"],
    IRR: [0, "Rial", "IRR"],
    ISK: [0, "kr", "kr"],
    JMD: [2, "$", "JA$"],
    JPY: [0, "\u00a5", "JP\u00a5"],
    KRW: [0, "\u20a9", "KR\u20a9"],
    LKR: [2, "Rs", "SLRs"],
    LTL: [2, "Lt", "Lt"],
    MNT: [0, "\u20ae", "MN\u20ae"],
    MVR: [2, "Rf", "MVR"],
    MXN: [2, "$", "Mex$"],
    MYR: [2, "RM", "RM"],
    NOK: [50, "kr", "NOkr"],
    PAB: [2, "B/.", "B/."],
    PEN: [2, "S/.", "S/."],
    PHP: [2, "\u20b1", "PHP"],
    PKR: [0, "Rs", "PKRs."],
    PLN: [50, "z\u0142", "z\u0142"],
    RON: [2, "RON", "RON"],
    RSD: [0, "din", "RSD"],
    RUB: [50, "\u20bd",
        "RUB"
    ],
    SAR: [2, "Rial", "Rial"],
    SEK: [50, "kr", "kr"],
    SGD: [2, "$", "S$"],
    THB: [2, "\u0e3f", "THB"],
    TRY: [2, "\u20ba", "TRY"],
    TWD: [2, "NT$", "NT$"],
    TZS: [0, "TSh", "TSh"],
    UAH: [2, "\u0433\u0440\u043d.", "UAH"],
    USD: [2, "$", "US$"],
    UYU: [2, "$", "$U"],
    VND: [48, "\u20ab", "VN\u20ab"],
    YER: [0, "Rial", "Rial"],
    ZAR: [2, "R", "ZAR"]
};
var cj = {
        si: ".",
        pg: ",",
        $i: "%",
        tg: "0",
        cj: "+",
        rg: "-",
        xi: "E",
        aj: "\u2030",
        Gi: "\u221e",
        Yi: "NaN",
        ri: "#,##0.###",
        On: "#E0",
        Nn: "#,##0%",
        sn: "\u00a4#,##0.00",
        ng: "USD"
    },
    dj = cj;
dj = cj;

function ej() {
    this.A = 40;
    this.g = 1;
    this.w = 3;
    this.C = this.o = 0;
    this.L = !1;
    this.J = this.G = "";
    this.B = dj.rg;
    this.D = "";
    this.h = 1;
    this.u = !1;
    this.l = [];
    this.F = this.K = !1;
    var a = dj.ri;
    a.replace(/ /g, "\u00a0");
    var b = [0];
    this.G = fj(this, a, b);
    for (var c = b[0], d = -1, e = 0, f = 0, g = 0, k = -1, l = a.length, m = !0; b[0] < l && m; b[0]++) switch (a.charAt(b[0])) {
        case "#":
            0 < f ? g++ : e++;
            0 <= k && 0 > d && k++;
            break;
        case "0":
            if (0 < g) throw Error('Unexpected "0" in pattern "' + a + '"');
            f++;
            0 <= k && 0 > d && k++;
            break;
        case ",":
            0 < k && this.l.push(k);
            k = 0;
            break;
        case ".":
            if (0 <= d) throw Error('Multiple decimal separators in pattern "' +
                a + '"');
            d = e + f + g;
            break;
        case "E":
            if (this.F) throw Error('Multiple exponential symbols in pattern "' + a + '"');
            this.F = !0;
            this.C = 0;
            b[0] + 1 < l && "+" == a.charAt(b[0] + 1) && (b[0]++, this.L = !0);
            for (; b[0] + 1 < l && "0" == a.charAt(b[0] + 1);) b[0]++, this.C++;
            if (1 > e + f || 1 > this.C) throw Error('Malformed exponential pattern "' + a + '"');
            m = !1;
            break;
        default:
            b[0]--, m = !1
    }
    0 == f && 0 < e && 0 <= d && (f = d, 0 == f && f++, g = e - f, e = f - 1, f = 1);
    if (0 > d && 0 < g || 0 <= d && (d < e || d > e + f) || 0 == k) throw Error('Malformed pattern "' + a + '"');
    g = e + f + g;
    this.w = 0 <= d ? g - d : 0;
    0 <= d && (this.o = e +
        f - d, 0 > this.o && (this.o = 0));
    this.g = (0 <= d ? d : g) - e;
    this.F && (this.A = e + this.g, 0 == this.w && 0 == this.g && (this.g = 1));
    this.l.push(Math.max(0, k));
    this.K = 0 == d || d == g;
    c = b[0] - c;
    this.J = fj(this, a, b);
    b[0] < a.length && ";" == a.charAt(b[0]) ? (b[0]++, 1 != this.h && (this.u = !0), this.B = fj(this, a, b), b[0] += c, this.D = fj(this, a, b)) : (this.B += this.G, this.D += this.J)
}

function gj(a, b, c, d) {
    if (a.o > a.w) throw Error("Min value must be less than max value");
    d || (d = []);
    var e = Math.pow(10, a.w);
    var f = Math.round(b * e);
    isFinite(f) ? (b = Math.floor(f / e), f = Math.floor(f - b * e)) : f = 0;
    var g = e = b;
    b = f;
    var k = 0 < a.o || 0 < b || !1;
    e = a.o;
    k && (e = a.o);
    var l = "";
    for (f = g; 1E20 < f;) l = "0" + l, f = Math.round(f / 10);
    l = f + l;
    var m = dj.si;
    f = dj.tg.charCodeAt(0);
    var x = l.length,
        z = 0;
    if (0 < g || 0 < c) {
        for (g = x; g < c; g++) d.push(String.fromCharCode(f));
        if (2 <= a.l.length)
            for (c = 1; c < a.l.length; c++) z += a.l[c];
        c = x - z;
        if (0 < c) {
            g = a.l;
            z = x = 0;
            for (var J,
                    K = dj.pg, U = l.length, ba = 0; ba < U; ba++)
                if (d.push(String.fromCharCode(f + 1 * Number(l.charAt(ba)))), 1 < U - ba)
                    if (J = g[z], ba < c) {
                        var xa = c - ba;
                        (1 === J || 0 < J && 1 === xa % J) && d.push(K)
                    } else z < g.length && (ba === c ? z += 1 : J === ba - c - x + 1 && (d.push(K), x += J, z += 1))
        } else {
            c = l;
            l = a.l;
            g = dj.pg;
            J = c.length;
            K = [];
            for (x = l.length - 1; 0 <= x && 0 < J; x--) {
                z = l[x];
                for (U = 0; U < z && 0 <= J - U - 1; U++) K.push(String.fromCharCode(f + 1 * Number(c.charAt(J - U - 1))));
                J -= z;
                0 < J && K.push(g)
            }
            d.push.apply(d, K.reverse())
        }
    } else k || d.push(String.fromCharCode(f));
    (a.K || k) && d.push(m);
    k = String(b);
    b = k.split("e+");
    if (2 == b.length) {
        if (k = parseFloat(b[0])) {
            m = k;
            if (isFinite(m)) {
                for (c = 0; 1 <= (m /= 10);) c++;
                m = c
            } else m = 0 < m ? m : 0;
            m = 0 - m - 1; - 1 > m ? (m = Math.pow(10, 1), k = Math.round(k / m) * m) : (m = Math.pow(10, m), k = Math.round(k * m) / m)
        }
        k = String(k);
        k = k.replace(".", "");
        k += db("0", parseInt(b[1], 10) - k.length + 1)
    }
    a.w + 1 > k.length && (k = "1" + db("0", a.w - k.length) + k);
    for (a = k.length;
        "0" == k.charAt(a - 1) && a > e + 1;) a--;
    for (g = 1; g < a; g++) d.push(String.fromCharCode(f + 1 * Number(k.charAt(g))))
}

function hj(a, b, c) {
    c.push(dj.xi);
    0 > b ? (b = -b, c.push(dj.rg)) : a.L && c.push(dj.cj);
    b = "" + b;
    for (var d = dj.tg, e = b.length; e < a.C; e++) c.push(d);
    c.push(b)
}

function fj(a, b, c) {
    for (var d = "", e = !1, f = b.length; c[0] < f; c[0]++) {
        var g = b.charAt(c[0]);
        if ("'" == g) c[0] + 1 < f && "'" == b.charAt(c[0] + 1) ? (c[0]++, d += "'") : e = !e;
        else if (e) d += g;
        else switch (g) {
            case "#":
            case "0":
            case ",":
            case ".":
            case ";":
                return d;
            case "\u00a4":
                c[0] + 1 < f && "\u00a4" == b.charAt(c[0] + 1) ? (c[0]++, d += dj.ng) : d += bj[dj.ng][1];
                break;
            case "%":
                if (!a.u && 1 != a.h) throw Error("Too many percent/permill");
                if (a.u && 100 != a.h) throw Error("Inconsistent use of percent/permill characters");
                a.h = 100;
                a.u = !1;
                d += dj.$i;
                break;
            case "\u2030":
                if (!a.u &&
                    1 != a.h) throw Error("Too many percent/permill");
                if (a.u && 1E3 != a.h) throw Error("Inconsistent use of percent/permill characters");
                a.h = 1E3;
                a.u = !1;
                d += dj.aj;
                break;
            default:
                d += g
        }
    }
    return d
}
var ij = {
    prefix: "",
    Lm: "",
    vk: 0
};

function jj(a) {
    return 1 == a % 10 && 11 != a % 100 ? "one" : 2 == a % 10 && 12 != a % 100 ? "two" : 3 == a % 10 && 13 != a % 100 ? "few" : "other"
}
var kj = jj;
kj = jj;

function lj(a, b) {
    if (void 0 === b) {
        b = a + "";
        var c = b.indexOf(".");
        b = Math.min(-1 == c ? 0 : b.length - c - 1, 3)
    }
    return 1 == (a | 0) && 0 == b ? "one" : "other"
}
var mj = lj;
mj = lj;

function nj(a) {
    this.o = a;
    this.h = this.g = this.u = null;
    a = dj;
    var b = aj;
    if (oj !== a || pj !== b) oj = a, pj = b, qj = new ej;
    this.w = qj
}
var oj = null,
    pj = null,
    qj = null,
    rj = /'([{}#].*?)'/g,
    sj = /''/g;

function tj(a, b) {
    if (a.o) {
        a.u = [];
        var c = uj(a, a.o);
        a.h = vj(a, c);
        a.o = null
    }
    if (a.h && 0 != a.h.length) {
        a.g = Ua(a.u);
        c = [];
        wj(a, a.h, b, !1, c);
        for (b = c.join(""); 0 < a.g.length;) b = b.replace(a.l(a.g), a.g.pop());
        a = b
    } else a = "";
    return a
}

function wj(a, b, c, d, e) {
    for (var f = 0; f < b.length; f++) switch (b[f].type) {
        case 4:
            e.push(b[f].value);
            break;
        case 3:
            var g = b[f].value,
                k = a,
                l = e,
                m = c[g];
            r(m) ? (k.g.push(m), l.push(k.l(k.g))) : l.push("Undefined parameter - " + g);
            break;
        case 2:
            g = b[f].value;
            k = e;
            l = g.Bd;
            r(c[l]) ? (l = g[c[l]], r(l) || (l = g.other), wj(a, l, c, d, k)) : k.push("Undefined parameter - " + l);
            break;
        case 0:
            g = b[f].value;
            xj(a, g, c, mj, d, e);
            break;
        case 1:
            g = b[f].value;
            xj(a, g, c, kj, d, e);
            break;
        default:
            Ka("Unrecognized block type: " + b[f].type)
    }
}

function xj(a, b, c, d, e, f) {
    var g = b.Bd,
        k = b.xg,
        l = +c[g];
    if (isNaN(l)) f.push("Undefined or invalid parameter - " + g);
    else if (k = l - k, g = b[c[g]], r(g) || (d = d(k), g = b[d], r(g) || (g = b.other)), b = [], wj(a, g, c, e, b), c = b.join(""), e) f.push(c);
    else {
        a = a.w;
        b = k;
        if (isNaN(b)) a = dj.Yi;
        else {
            e = [];
            b /= Math.pow(10, ij.vk);
            e.push(ij.prefix);
            k = 0 > b || 0 == b && 0 > 1 / b;
            e.push(k ? a.B : a.G);
            if (isFinite(b))
                if (b = b * (k ? -1 : 1) * a.h, a.F)
                    if (d = b, 0 == d) gj(a, d, a.g, e), hj(a, 0, e);
                    else {
                        b = Math.floor(Math.log(d) / Math.log(10) + 2E-15);
                        g = Math.pow(10, b);
                        isFinite(g) && 0 !== g ? d /=
                            g : (g = Math.pow(10, Math.floor(b / 2)), d = d / g / g, 1 == b % 2 && (d = 0 < b ? d / 10 : 10 * d));
                        g = a.g;
                        if (1 < a.A && a.A > a.g) {
                            for (; 0 != b % a.A;) d *= 10, b--;
                            g = 1
                        } else 1 > a.g ? (b++, d /= 10) : (b -= a.g - 1, d *= Math.pow(10, a.g - 1));
                        gj(a, d, g, e);
                        hj(a, b, e)
                    }
            else gj(a, b, a.g, e);
            else e.push(dj.Gi);
            e.push(k ? a.D : a.J);
            e.push(ij.Lm);
            a = e.join("")
        }
        f.push(c.replace(/#/g, a))
    }
}

function uj(a, b) {
    var c = a.u,
        d = Fa(a.l, a);
    b = b.replace(sj, function() {
        c.push("'");
        return d(c)
    });
    return b = b.replace(rj, function(a, b) {
        c.push(b);
        return d(c)
    })
}

function yj(a) {
    var b = 0,
        c = [],
        d = [],
        e = /[{}]/g;
    e.lastIndex = 0;
    for (var f; f = e.exec(a);) {
        var g = f.index;
        "}" == f[0] ? (c.pop(), 0 == c.length && (f = {
            type: 1
        }, f.value = a.substring(b, g), d.push(f), b = g + 1)) : (0 == c.length && (b = a.substring(b, g), "" != b && d.push({
            type: 0,
            value: b
        }), b = g + 1), c.push("{"))
    }
    b = a.substring(b);
    "" != b && d.push({
        type: 0,
        value: b
    });
    return d
}
var zj = /^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/,
    Aj = /^\s*(\w+)\s*,\s*selectordinal\s*,/,
    Bj = /^\s*(\w+)\s*,\s*select\s*,/;

function vj(a, b) {
    var c = [];
    b = yj(b);
    for (var d = 0; d < b.length; d++) {
        var e = {};
        if (0 == b[d].type) e.type = 4, e.value = b[d].value;
        else if (1 == b[d].type) {
            var f = b[d].value;
            switch (zj.test(f) ? 0 : Aj.test(f) ? 1 : Bj.test(f) ? 2 : /^\s*\w+\s*/.test(f) ? 3 : 5) {
                case 2:
                    e.type = 2;
                    e.value = Cj(a, b[d].value);
                    break;
                case 0:
                    e.type = 0;
                    e.value = Dj(a, b[d].value);
                    break;
                case 1:
                    e.type = 1;
                    e.value = Ej(a, b[d].value);
                    break;
                case 3:
                    e.type = 3;
                    e.value = b[d].value;
                    break;
                default:
                    Ka("Unknown block type for pattern: " + b[d].value)
            }
        } else Ka("Unknown part of the pattern.");
        c.push(e)
    }
    return c
}

function Cj(a, b) {
    var c = "";
    b = b.replace(Bj, function(a, b) {
        c = b;
        return ""
    });
    var d = {};
    d.Bd = c;
    b = yj(b);
    for (var e = 0; e < b.length;) {
        var f = b[e].value;
        e++;
        if (1 == b[e].type) var g = vj(a, b[e].value);
        else Ka("Expected block type.");
        d[f.replace(/\s/g, "")] = g;
        e++
    }
    return d
}

function Dj(a, b) {
    var c = "",
        d = 0;
    b = b.replace(zj, function(a, b, e) {
        c = b;
        e && (d = parseInt(e, 10));
        return ""
    });
    var e = {};
    e.Bd = c;
    e.xg = d;
    b = yj(b);
    for (var f = 0; f < b.length;) {
        var g = b[f].value;
        f++;
        if (1 == b[f].type) var k = vj(a, b[f].value);
        else Ka("Expected block type.");
        e[g.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = k;
        f++
    }
    return e
}

function Ej(a, b) {
    var c = "";
    b = b.replace(Aj, function(a, b) {
        c = b;
        return ""
    });
    var d = {};
    d.Bd = c;
    d.xg = 0;
    b = yj(b);
    for (var e = 0; e < b.length;) {
        var f = b[e].value;
        e++;
        if (1 == b[e].type) var g = vj(a, b[e].value);
        else Ka("Expected block type.");
        d[f.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = g;
        e++
    }
    return d
}
nj.prototype.l = function(a) {
    return "\ufddf_" + (a.length - 1).toString(10) + "_"
};
cast.v = {};
cast.v.pi = "<style>@import url(//fonts.googleapis.com/css?family=Open+Sans:300,400);@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-webkit-keyframes loading{0%{margin-left:-100%}100%{margin-left:100%}}.background{background:var(--background, url('data:image/svg+xml,%3Csvg%20width=%271280%27%20height=%27720%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id=%27background%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%270%25%27%20y2=%27100%25%27%3E%0A%20%20%20%20%20%20%3Cstop%20offset=%2710%25%27%20stop-color=%27black%27/%3E%0A%20%20%20%20%20%20%3Cstop%20offset=%27100%25%27%20style=%27stop-color:rgb%2830%2C30%2C30%29%27/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%3C/defs%3E%0A%20%20%3Crect%20fill=%27url%28%23background%29%27%20x=%270%27%20y=%270%27%20width=%271280%27%20height=%27720%27/%3E%0A%3C/svg%3E%0A'));background-color:var(--background-color);background-image:var(--background-image);background-position:center;background-repeat:var(--background-repeat, no-repeat);background-size:var(--background-size, cover)}.breakIcon{border-radius:2px;color:#fff;display:block;font-weight:bold;padding:2px 4px}.breakIcon:after{content:var(--ad-title, attr(data-ad-label))}.breakMetadata{display:none;overflow:auto;padding-bottom:54px}.breakInfo{float:left}.breakPosition{margin-left:5px}.breakPosition,.breakTime{text-shadow:0 1px 4px #000}.breakSkip{background-color:rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.5);color:#fff;display:block;float:right;font-size:16px;font-weight:400;line-height:24px;padding:5px 10px;visibility:hidden}.breakSkip:after{content:var(--skip-ad-title, attr(data-skip-ad-label))}.breakMarker{background-color:#fff;bottom:0;height:100%;opacity:.8;position:absolute;width:2px}.splash{background:var(--splash-background);background-color:var(--splash-color);background-image:var(--splash-image);background-repeat:var(--splash-repeat);background-size:var(--splash-size)}.logo{background:var(--logo-background);background-color:var(--logo-color);background-image:var(--logo-image);background-repeat:var(--logo-repeat);background-size:var(--logo-size)}.playback-logo{background-image:var(--playback-logo-image);background-position-x:left;background-repeat:no-repeat;background-size:contain;color:#fff;display:none;font-family:'Roboto',Arial,sans-serif;font-weight:500;order:-2;overflow:hidden}.nextMetadata{display:flex;flex-direction:row-reverse}.nextMetadataImage{object-fit:contain;max-height:143px;max-width:286px;margin-right:32px}.nextMetadataPlaceHolder{font-weight:bold;margin-right:32px;display:flex;flex-direction:column;align-self:flex-end}.nextMetadataTitle{font-size:44px}.nextMetadataSubtitle,.nextMetadataSubtitle2,.nextMetadataSubtitle3,.nextMetadataCountdown{font-size:22px}.nextOverlay{display:inherit;opacity:0;position:absolute;bottom:0;left:0;right:0;padding:64px}.watermark{background:var(--watermark-background);background-color:var(--watermark-color);background-image:var(--watermark-image);background-position:var(--watermark-position, bottom right);background-repeat:var(--watermark-repeat, no-repeat);background-size:var(--watermark-size);display:none;margin-bottom:54px}.player{background:#111;color:#f1f1f1;font-family:var(--font-family, ''),'Open Sans',sans-serif;font-weight:300}.player,.background,.foreground,.audioPlaybackBackground,.audioPlaybackBackgroundScrim,.gradient,.slideshow,.logo,.splash{bottom:0;left:0;position:absolute;right:0;top:0}.breakOverlay,.overlay,.watermark{bottom:64px;left:64px;position:absolute;right:64px;top:64px}.logo,.splash{background-position:center;background-repeat:no-repeat;color:rgba(221,221,221,0.8);display:none;font-size:44px;padding-top:25%;position:absolute;text-align:center}video{background-color:#000;background-position:center;background-repeat:no-repeat;background-size:contain;display:none;height:100%;width:100%}.overlay{top:auto}[displayStatus=false] .gradient,[displayStatus=false] .metadata,[displayStatus=false] .controlsProgress,[displayStatus=false] .controlsCurTime,[displayStatus=false] .audioPlaybackBackground,[displayStatus=false] .audioPlaybackBackgroundScrim,[displayStatus=false][state='playing'] .controlsPlayPause,[displayStatus=false] .controlsTotalTime{opacity:0;-webkit-transition:opacity 1s linear}.breakOverlay{display:none;top:auto}.gradient{background:linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 72%, rgba(0,0,0,0) 100%);display:block;opacity:.9}.metadataPlaceHolder{min-width:0;width:100%}.metadata{padding-bottom:54px}.liveIndicator{display:none}.liveLabel:after{content:attr(data-live-label)}.metadataTitle{color:rgba(255,255,255,0.8);font-size:44px;font-weight:300;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.metadataSubtitle,.metadataSubtitle2{color:rgba(203,203,203,0.8);font-size:22px;font-weight:300;line-height:33px;margin:0;max-height:66px;overflow:hidden}.metadataSubtitle span:not(:first-child):before,.metadataSubtitle2 span:not(:first-child):before{content:'\u00b7';font-weight:bold;padding-left:10px;padding-right:10px}.controls{bottom:0;height:30px;left:0;position:absolute;right:0}.controlsPlayPause{background-size:cover;border:0;float:left;height:32px;margin-left:-4px;margin-top:-3px;width:32px}.controlsProgress{background-color:rgba(255,255,255,0.2);height:8px;margin-bottom:11px;margin-top:11px;overflow:hidden;position:relative}.controlsProgressInner{height:100%;opacity:.8}.controlsSeekable{background-color:#fff;height:100%;position:absolute;top:0}.controlsSeekablePlayed{height:100%;position:absolute;top:0}.controlsProgressThumb{background-color:rgba(255,255,255,0.5);height:100%;margin-left:-3px;position:absolute;top:0;width:3px}.controlsCurTime,.controlsTotalTime{color:rgba(255,255,255,0.8);font-size:16px;font-weight:400}.controlsCurTime{float:left;line-height:30px;margin-left:15px;margin-right:15px}.controlsTotalTime{float:right;line-height:30px;margin-left:15px}.player[isLive='true'][contentType='video'] .videoLiveIndicator{display:block}.player[isLive='true'][contentType='audio'] .audioLiveIndicator{display:flex}.player[isLive='true'][state='buffering'] .controlsProgressInner,.player[isLive='true'][state='paused'] .controlsProgressInner,.player[isLive='true'][state='playing'] .controlsProgressInner{display:none !important}.player[isLive='false'][state='buffering'] .controlsSeekablePlayed,.player[isLive='false'][state='paused'] .controlsSeekablePlayed,.player[isLive='false'][state='playing'] .controlsSeekablePlayed,.player[isLive='false'][state='buffering'] .controlsSeekable,.player[isLive='false'][state='paused'] .controlsSeekable,.player[isLive='false'][state='playing'] .controlsSeekable{display:none !important}.player[state='launching'] .logo{display:block}.player[state='launching'] .spinner{background-image:var(--spinner-image, url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20x=%270px%27%20y=%270px%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20enable-background=%27new%200%200%2024%2024%27%20xml:space=%27preserve%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M12%2C22C6.49%2C22%2C2%2C17.51%2C2%2C12C2%2C6.49%2C6.49%2C2%2C12%2C2c0.55%2C0%2C1%2C0.45%2C1%2C1s-0.45%2C1-1%2C1c-4.41%2C0-8%2C3.59-8%2C8s3.59%2C8%2C8%2C8s8-3.59%2C8-8c0-0.55%2C0.45-1%2C1-1s1%2C0.45%2C1%2C1C22%2C17.51%2C17.51%2C22%2C12%2C22z%27/%3E%0A%20%20%20%20%3Crect%20fill=%27none%27%20width=%2724%27%20height=%2724%27/%3E%0A%3C/svg%3E%0A'));background-size:cover;bottom:64px;display:block;height:32px;left:50%;margin-left:-16px;position:absolute;-webkit-animation:spin 1s infinite linear;width:32px}.player[state='loading'] .controlsCurTime,.player[state='loading'] .controlsTotalTime,.player[state='loading'] .controlsSeekablePlayed,.player[state='loading'] .controlsSeekable,.player[state='loading'] .controlsProgressThumb,.player[state='loading'] .controlsPlayPause{display:none}.player[state='loading'] .controlsProgressInner{-webkit-animation:loading 2s infinite linear;width:90% !important}.player[state='buffering'] .controlsPlayPause{background-image:var(--buffering-image, url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20x=%270px%27%20y=%270px%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20enable-background=%27new%200%200%2024%2024%27%20xml:space=%27preserve%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M12%2C22C6.49%2C22%2C2%2C17.51%2C2%2C12C2%2C6.49%2C6.49%2C2%2C12%2C2c0.55%2C0%2C1%2C0.45%2C1%2C1s-0.45%2C1-1%2C1c-4.41%2C0-8%2C3.59-8%2C8s3.59%2C8%2C8%2C8s8-3.59%2C8-8c0-0.55%2C0.45-1%2C1-1s1%2C0.45%2C1%2C1C22%2C17.51%2C17.51%2C22%2C12%2C22z%27/%3E%0A%20%20%20%20%3Crect%20fill=%27none%27%20width=%2724%27%20height=%2724%27/%3E%0A%3C/svg%3E%0A'));-webkit-animation:spin 1s infinite linear}.player[state='paused'] .controlsPlayPause{background-image:var(--pause-image, url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724px%27%20height=%2724px%27%20viewBox=%270%200%2024%2024%27%20fill=%27%23FFFFFF%27%3E%0A%20%20%20%20%3Cpath%20d=%27M6%2019h4V5H6v14zm8-14v14h4V5h-4z%27/%3E%0A%20%20%20%20%3Cpath%20d=%27M0%200h24v24H0z%27%20fill=%27none%27/%3E%0A%3C/svg%3E%0A'))}.player[state='playing'] .controlsPlayPause{background-image:var(--play-image, none)}.player[state='idle'] .slideshow,.player[state='idle'] .splash{display:block}.player[isPlayingBreak=true] .breakMetadata,.player[isPlayingBreak=true] .breakTime{display:block}.player[isPlayingBreak=true] .breakIcon{display:inline-block}.player[isBreakSkippable=true] .breakSkip{visibility:visible}.player[contentType='image'] video{display:block}.player[contentType='image'] .background{background-color:#111;background-image:none}.player[contentType='audio'] .audioPlaybackBackground{background:var(--album-art-image) center / cover no-repeat}.player[contentType='audio'] .metadata{display:flex;flex-direction:row;justify-content:space-between;padding:0}.player[contentType='audio'] .metadataPlaceHolder{order:-1;display:flex;flex-direction:column;justify-content:center;margin-top:0;height:100%}.player[contentType='audio'] .playback-logo{display:inline-block}.player[contentType='audio'] .metadataTitle{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;white-space:initial;color:#fff;font-weight:400}.player[contentType='audio'] .metadataSubtitle{margin-bottom:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:400}.player[contentType='audio'] .metadataSubtitle2{font-weight:500;order:-1;margin-top:auto;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.player[contentType='audio']:not([displayType='touch']){overflow:hidden;user-select:none;font-family:var(--font-family, ''),'Roboto',Arial,sans-serif;font-weight:400}.player[contentType='audio']:not([displayType='touch']) .breakOverlay,.player[contentType='audio']:not([displayType='touch']) .nextOverlay{display:none}.player[contentType='audio']:not([displayType='touch']) .audioLiveIndicator{flex-direction:row;align-items:center;line-height:1.25vw;font-size:1.25vw;text-align:right;position:absolute;bottom:-3.4375vw;right:0}.player[contentType='audio']:not([displayType='touch']) .liveDot{background-color:#fa5847;border-radius:50%;height:1.015625vw;width:1.015625vw;margin-right:.703125vw}.player[contentType='audio']:not([displayType='touch']) .audioPlaybackBackgroundScrim{background:rgba(0,0,0,0.9)}.player[contentType='audio']:not([displayType='touch']) .overlay{margin:auto;margin-left:7.8125vw;margin-right:7.8125vw;height:39.0625vw;top:0;left:0;bottom:0;right:0;position:absolute}.player[contentType='audio']:not([displayType='touch']) .metadataTitle{font-size:3.75vw;line-height:4.6875vw;margin-top:1.5625vw}.player[contentType='audio']:not([displayType='touch']) .metadataSubtitle{color:rgba(255,255,255,0.6);font-size:1.5625vw;line-height:1.875vw;margin-top:1.09375vw}.player[contentType='audio']:not([displayType='touch']) .metadataSubtitle2{color:rgba(255,255,255,0.6);font-size:1.25vw;line-height:1.25vw;letter-spacing:.0625vw}.player[contentType='audio']:not([displayType='touch']) .metadataPlaceHolder{margin-right:6.25vw;width:auto;box-sizing:border-box;padding-bottom:2.8125vw}.player[contentType='audio']:not([displayType='touch']) .metadataImage{content:none !important;background:#000 var(--album-art-image) center / contain no-repeat;border-radius:.3125vw;width:39.0625vw;height:39.0625vw;flex:none;box-shadow:0 .9375vw .9375vw rgba(0,0,0,0.5)}.player[contentType='audio']:not([displayType='touch']) .playback-logo{font-size:2.5vw;height:2.8125vw;line-height:2.8125vw}.player[contentType='audio']:not([displayType='touch']) .playback-logo.app-icon{height:4.6875vw}.player[contentType='audio']:not([displayType='touch']) .controls{width:39.0625vw;height:39.0625vw;position:absolute;bottom:0;right:0;left:auto;border-radius:.3125vw;display:flex;justify-content:center;align-items:center}.player[contentType='audio']:not([displayType='touch']) .controlsProgressThumb{display:none}.player[contentType='audio']:not([displayType='touch']) .controlsProgress{box-shadow:0 -0.078125vw 0 rgba(0,0,0,0.25);background-color:rgba(0,0,0,0.3);height:.3125vw;width:100%;border-bottom-left-radius:.3125vw;border-bottom-right-radius:.3125vw;margin:0;position:absolute;bottom:0}.player[contentType='audio']:not([displayType='touch']) .controlsPlayPause{height:9.6875vw;width:9.6875vw}.player[contentType='audio']:not([displayType='touch']) .controlsCurTime,.player[contentType='audio']:not([displayType='touch']) .controlsTotalTime{position:absolute;bottom:1.40625vw;margin:0;font-size:1.09375vw;line-height:1.25vw;color:rgba(255,255,255,0.7);text-shadow:0 0 .3125vw rgba(0,0,0,0.5)}.player[contentType='audio']:not([displayType='touch']) .controlsCurTime{left:1.09375vw}.player[contentType='audio']:not([displayType='touch']) .controlsTotalTime{right:1.09375vw}.player[contentType='audio']:not([displayType='touch']) .progressBar{background-color:var(--progress-color, #fff)}.player[contentType='audio']:not([displayType='touch']) .breakMarker{background-color:#fbbc04;width:.78125vw}.player[contentType='audio']:not([displayType='touch'])[state='loading'] .controlsProgress{display:none}.player[contentType='audio']:not([displayType='touch'])[state='buffering'] .controlsPlayPause,.player[contentType='audio']:not([displayType='touch'])[state='loading'] .controlsPlayPause{-webkit-animation:spin 1s infinite linear;display:block;width:5.625vw;height:5.625vw;background-image:var(--buffering-image, url('data:image/svg+xml,%3Csvg%20viewBox=%270%200%2072%2072%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%0A%20%20%3Cpath%20d=%27M36%2C64%20C20.536027%2C64%208%2C51.463973%208%2C36%20C8%2C28.3421054%2011.0742312%2C21.402236%2016.0558797%2C16.3472055%20L18.9049104%2C19.1548779%20C14.5062491%2C23.6183335%2012.0001567%2C29.6058259%2012%2C35.9992989%20C12%2C49.2547411%2022.7450731%2C60%2036%2C60%20L36%2C64%20Z%20M64%2C36%20C64%2C51.463973%2051.463973%2C64%2036%2C64%20L36%2C60%20C49.254834%2C60%2060%2C49.254834%2060%2C36%20C60%2C28.2977044%2056.3514655%2C21.2105352%2050.2785664%2C16.7073115%20L52.6611093%2C13.4942928%20C59.5409482%2C18.5958848%2064%2C26.7772087%2064%2C36%20Z%27%20fill=%27%23FFFFFF%27%20fill-rule=%27nonzero%27%3E%3C/path%3E%0A%3C/svg%3E%0A'))}.player[contentType='audio']:not([displayType='touch'])[state='paused'] .controlsPlayPause{filter:drop-shadow(0 0 .3125vw rgba(0,0,0,0.5));background-image:var(--pause-image, url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2048%2048%27%3E%0A%20%20%3Cpath%20d=%27M30.5%2C9.5v29%27%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%0A%20%20%20%20%20%20stroke-linejoin=%27round%27%20vector-effect=%27non-scaling-stroke%27%0A%20%20%20%20%20%20stroke-width=%274%27/%3E%0A%20%20%3Cpath%20d=%27M17.5%2C9.5v29%27%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%0A%20%20%20%20%20%20stroke-linejoin=%27round%27%20vector-effect=%27non-scaling-stroke%27%0A%20%20%20%20%20%20stroke-width=%274%27/%3E%0A%3C/svg%3E%0A'))}.player[contentType='audio']:not([displayType='touch'])[state='buffering'] .controls,.player[contentType='audio']:not([displayType='touch'])[state='paused'] .controls{background-color:rgba(0,0,0,0.3);box-shadow:inset 0 -9.375vw 7.03125vw -7.03125vw rgba(0,0,0,0.5)}.player[contentType='audio']:not([displayType='touch'])[state='playing'] .controlsCurTime,.player[contentType='audio']:not([displayType='touch'])[state='playing'] .controlsTotalTime{display:none}.player[contentType='audio'][displayType='touch'] .metadata{-webkit-transition:none}.player[contentType='audio'][displayType='touch'] .liveIndicator{display:none !important}.player[contentType='audio'][displayType='touch']:not([state='idle']){overflow:hidden;user-select:none;font-family:'Google Sans','Roboto',Arial,sans-serif;font-weight:400}.player[contentType='audio'][displayType='touch']:not([state='idle']) .logo,.player[contentType='audio'][displayType='touch']:not([state='idle']) .slideshow,.player[contentType='audio'][displayType='touch']:not([state='idle']) .controls,.player[contentType='audio'][displayType='touch']:not([state='idle']) .gradient,.player[contentType='audio'][displayType='touch']:not([state='idle']) .spinner,.player[contentType='audio'][displayType='touch']:not([state='idle']) .watermark,.player[contentType='audio'][displayType='touch']:not([state='idle']) .splash,.player[contentType='audio'][displayType='touch']:not([state='idle']) .breakOverlay,.player[contentType='audio'][displayType='touch']:not([state='idle']) .nextOverlay{display:none !important}.player[contentType='audio'][displayType='touch']:not([state='idle']) .audioPlaybackBackground{background-color:#000;transform:scale(1.25);transform-origin:center;filter:blur(37px)}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.player[contentType='audio'][displayType='touch']:not([state='idle']) .audioPlaybackBackground{filter:blur(50px)}}.player[contentType='audio'][displayType='touch']:not([state='idle']) .audioPlaybackBackgroundScrim{background:rgba(0,0,0,0.7)}.player[contentType='audio'][displayType='touch']:not([state='idle']) .overlay{top:0;left:0;position:absolute;box-sizing:border-box;width:100%;padding:0 var(--cast-controls-horizontal-padding);display:flex;flex-direction:column;justify-content:center;height:calc(var(--cast-controls-safe-area-height) + 30px);padding-top:2px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.player[contentType='audio'][displayType='touch']:not([state='idle']) .overlay{height:calc(var(--cast-controls-safe-area-height) + 48px);padding-top:38px}}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadata{height:352px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadata{height:420px}}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataTitle{margin-top:18px;font-size:56px;line-height:76px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataTitle{margin-top:32px;font-size:68px;line-height:80px}}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataSubtitle{color:#dfe1e5;font-size:28px;letter-spacing:1.4;line-height:30px;margin-top:14px}@media (orientation:landscape) and (min-width: 1200px),(orientation:portrait) and (min-height: 1200px){.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataSubtitle{font-size:32px;letter-spacing:1.6;line-height:40px;margin-top:24px}}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataSubtitle2{color:#dfe1e5;font-size:24px;letter-spacing:1.2;line-height:24px}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataPlaceHolder{flex:none;margin-right:5%;width:55%}.player[contentType='audio'][displayType='touch']:not([state='idle']) .metadataImage{box-shadow:none;object-fit:contain;margin:0 0 auto auto;zoom:5;border-radius:calc(3px);max-width:40%;max-height:100%}.player[contentType='audio'][displayType='touch']:not([state='idle']) .playback-logo{font-size:36px;height:40px;line-height:40px}.player[contentType='audio'][displayType='touch']:not([state='idle']) .playback-logo.app-icon{height:68px}.player[contentType='video'] .metadata{display:flex}.player[contentType='video'] .metadataImage{align-self:flex-end;height:143px;margin-right:32px;width:auto}.player[contentType='video'] .metadataPlaceHolder{align-self:flex-end}.player[contentType='video'][state='loading'] .watermark{display:block}.player[contentType='video'][state='buffering'] video{display:block}.player[contentType='video'][state='buffering'] .gradient{opacity:.1}.player[contentType='video'][state='buffering'] .metadata{display:none}.player[contentType='video'][state='buffering'][isSeeking=false] .controlsCurTime,.player[contentType='video'][state='buffering'][isSeeking=false] .controlsTotalTime,.player[contentType='video'][state='buffering'][isSeeking=false] .controlsProgress{display:none}.player[contentType='video'][state='paused'] video{display:block}.player[contentType='video'][state='paused'][isSeeking='true'] .metadata{display:none}.player[contentType='video'][state='paused'] .watermark{display:block;visibility:visible}.player[contentType='video'][state='paused'][displayStatus=false] .gradient{opacity:.1}.player[contentType='video'][state='playing'] video{display:block}.player[contentType='video'][state='playing'] .watermark{display:block;visibility:hidden}.player[contentType='video'][state='playing'][isSeeking=true] .metadata{display:none}.player[contentType='video'][state='playing'][isPlayingBreak=false][isSeeking=false][preloadingNext=true] .gradient,.player[contentType='video'][state='playing'][isPlayingBreak=false][isSeeking=false][preloadingNext=true] .nextOverlay{opacity:1;visibility:var(--next-preview-visibility, visible);-webkit-transition:opacity 1s linear}.player[contentType='video'][isPlayingBreak=true] .breakOverlay{display:block;visibility:visible}.player[contentType='video'][isPlayingBreak=true] .metadata,.player[contentType='video'][isPlayingBreak=true] .watermark{display:none}.player[displayType='touch'][contentType='video']:not([state='idle']) .background,.player[displayType='touch'][contentType='video']:not([state='idle']) .foreground>*:not(video){display:none}.slideshow{--animation-duration:var(--slideshow-animation-duration, 2s);display:none;--interval-duration:var(--slideshow-interval-duration, 10s)}.slideshow .slide{background-color:#000;background-position:center center;background-repeat:no-repeat;background-size:contain;height:100%;opacity:0;position:absolute;width:100%}.slideshow .slide.visible{opacity:1;-webkit-transition-property:opacity;-webkit-transition-duration:var(--slideshow-animation-duration, 2s)}.slideshow .slide.top{z-index:100}.slideshow .slideshow-image-1{background-image:var(--slideshow-image-1)}.slideshow .slideshow-image-2{background-image:var(--slideshow-image-2)}.slideshow .slideshow-image-3{background-image:var(--slideshow-image-3)}.slideshow .slideshow-image-4{background-image:var(--slideshow-image-4)}.slideshow .slideshow-image-5{background-image:var(--slideshow-image-5)}.slideshow .slideshow-image-6{background-image:var(--slideshow-image-6)}.slideshow .slideshow-image-7{background-image:var(--slideshow-image-7)}.slideshow .slideshow-image-8{background-image:var(--slideshow-image-8)}.slideshow .slideshow-image-9{background-image:var(--slideshow-image-9)}.slideshow .slideshow-image-10{background-image:var(--slideshow-image-10)}.controlsSeekablePlayed,.progressBar {  background-color: var(--progress-color, hsl(var(--theme-hue, 42), 95%, 60%));}.breakIcon {  background-color: var(--break-color, hsl(var(--theme-hue, 42), 100%, 50%));}</style><div class=player id=castPlayer live=false state=launching><div class=background></div><div class=foreground><video class=mediaElement id=castMediaElement style=height:100%;width:100%></video><div class=logo></div><div class=spinner></div><div class=splash></div><div class=slideshow id=castSlideshowElement><div class=\"slide slideshow-image-1\"></div><div class=\"slide slideshow-image-2\"></div><div class=\"slide slideshow-image-3\"></div><div class=\"slide slideshow-image-4\"></div><div class=\"slide slideshow-image-5\"></div><div class=\"slide slideshow-image-6\"></div><div class=\"slide slideshow-image-7\"></div><div class=\"slide slideshow-image-8\"></div><div class=\"slide slideshow-image-9\"></div><div class=\"slide slideshow-image-10\"></div></div><div class=gradient></div><div class=watermark></div><div class=audioPlaybackBackground></div><div class=audioPlaybackBackgroundScrim></div><div class=breakOverlay><div class=breakMetadata id=castBreakMetadata><div class=breakInfo><span class=breakIcon></span><span class=breakPosition id=castBreakPosition></span><div class=breakTime id=castBreakTime></div></div><div class=breakSkip></div></div></div><div class=overlay><div class=metadata><div class=metadataImage id=castMetadataImage></div><div class=metadataPlaceHolder><div class=playback-logo></div><div class=\"videoLiveIndicator liveIndicator\"><span>\u2022 </span><span class=liveLabel></span></div><h1 class=metadataTitle id=castMetadataTitle></h1><h2 class=metadataSubtitle id=castMetadataSubtitle></h2><h2 class=metadataSubtitle2 id=castMetadataSubtitle2></h2></div></div><div class=controls><div class=\"audioLiveIndicator liveIndicator\"><div class=liveDot></div><span class=liveLabel></span></div><span class=controlsPlayPause></span><span class=controlsCurTime id=castControlsCurTime></span><span class=controlsTotalTime id=castControlsTotalTime></span><div class=controlsProgress id=castControlsProgress><div class=\"controlsProgressInner progressBar\" id=castControlsProgressInner></div><div class=controlsSeekable id=castControlsSeekable></div><div class=controlsSeekablePlayed id=castControlsSeekablePlayed></div><div class=controlsProgressThumb id=castControlsProgressThumb></div></div></div></div><div class=nextOverlay><div class=nextMetadata><div class=nextMetadataImage id=nextMetadataImage></div><div class=nextMetadataPlaceHolder><div class=nextMetadataCountdown id=nextMetadataCountdown></div><div class=nextMetadataTitle id=nextMetadataTitle></div><div class=nextMetadataSubtitle id=nextMetadataSubtitle></div></div></div></div></div></div>";
cast.v.ho = {};
var Fj = {
    MEDIA_STATUS: "MEDIA_STATUS",
    CLOUD_STATUS: "CLOUD_STATUS",
    QUEUE_CHANGE: "QUEUE_CHANGE",
    QUEUE_ITEMS: "QUEUE_ITEMS",
    QUEUE_ITEM_IDS: "QUEUE_ITEM_IDS",
    GET_STATUS: "GET_STATUS",
    LOAD: "LOAD",
    PAUSE: "PAUSE",
    STOP: "STOP",
    PLAY: "PLAY",
    SKIP_AD: "SKIP_AD",
    PLAY_AGAIN: "PLAY_AGAIN",
    SEEK: "SEEK",
    SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
    SET_VOLUME: "SET_VOLUME",
    EDIT_TRACKS_INFO: "EDIT_TRACKS_INFO",
    EDIT_AUDIO_TRACKS: "EDIT_AUDIO_TRACKS",
    PRECACHE: "PRECACHE",
    PRELOAD: "PRELOAD",
    QUEUE_LOAD: "QUEUE_LOAD",
    QUEUE_INSERT: "QUEUE_INSERT",
    QUEUE_UPDATE: "QUEUE_UPDATE",
    QUEUE_REMOVE: "QUEUE_REMOVE",
    QUEUE_REORDER: "QUEUE_REORDER",
    QUEUE_NEXT: "QUEUE_NEXT",
    QUEUE_PREV: "QUEUE_PREV",
    QUEUE_GET_ITEM_RANGE: "QUEUE_GET_ITEM_RANGE",
    QUEUE_GET_ITEMS: "QUEUE_GET_ITEMS",
    QUEUE_GET_ITEM_IDS: "QUEUE_GET_ITEM_IDS",
    QUEUE_SHUFFLE: "QUEUE_SHUFFLE",
    SET_CREDENTIALS: "SET_CREDENTIALS",
    LOAD_BY_ENTITY: "LOAD_BY_ENTITY",
    USER_ACTION: "USER_ACTION",
    DISPLAY_STATUS: "DISPLAY_STATUS",
    FOCUS_STATE: "FOCUS_STATE",
    CUSTOM_COMMAND: "CUSTOM_COMMAND",
    REFRESH_CREDENTIALS: "REFRESH_CREDENTIALS",
    PLAY_STRING: "PLAY_STRING",
    EXECUTE_ACTION_SCRIPT: "EXECUTE_ACTION_SCRIPT"
};
A("cast.framework.messages.MessageType", Fj);
var Gj = {
    INVALID_COMMAND: "INVALID_COMMAND",
    INVALID_PARAMS: "INVALID_PARAMS",
    INVALID_MEDIA_SESSION_ID: "INVALID_MEDIA_SESSION_ID",
    SKIP_LIMIT_REACHED: "SKIP_LIMIT_REACHED",
    NOT_SUPPORTED: "NOT_SUPPORTED",
    LANGUAGE_NOT_SUPPORTED: "LANGUAGE_NOT_SUPPORTED",
    END_OF_QUEUE: "END_OF_QUEUE",
    DUPLICATE_REQUEST_ID: "DUPLICATE_REQUEST_ID",
    APP_ERROR: "APP_ERROR",
    AUTHENTICATION_EXPIRED: "AUTHENTICATION_EXPIRED",
    PREMIUM_ACCOUNT_REQUIRED: "PREMIUM_ACCOUNT_REQUIRED",
    CONCURRENT_STREAM_LIMIT: "CONCURRENT_STREAM_LIMIT",
    PARENTAL_CONTROL_RESTRICTED: "PARENTAL_CONTROL_RESTRICTED",
    NOT_AVAILABLE_IN_REGION: "NOT_AVAILABLE_IN_REGION",
    CONTENT_ALREADY_PLAYING: "CONTENT_ALREADY_PLAYING",
    INVALID_REQUEST: "INVALID_REQUEST",
    GENERIC_LOAD_ERROR: "GENERIC_LOAD_ERROR"
};
A("cast.framework.messages.ErrorReason", Gj);

function Hj(a) {
    this.type = a;
    this.reason = void 0;
    this.requestId = 0;
    this.customData = void 0
}
A("cast.framework.messages.ErrorData", Hj);

function Ij(a, b) {
    this.start = a;
    this.end = b
}
A("cast.framework.messages.Range", Ij);

function M(a) {
    this.type = a;
    this.requestId = 0;
    this.customData = this.mediaSessionId = void 0
}
A("cast.framework.messages.RequestData", M);

function Jj() {
    M.call(this, "LOAD");
    this.media = new Kj;
    this.autoplay = !1;
    this.credentialsType = this.credentials = this.queueData = this.activeTrackIds = this.playbackRate = this.currentTime = void 0
}
p(Jj, M);
A("cast.framework.messages.LoadRequestData", Jj);

function Lj(a) {
    Jj.call(this);
    this.type = "PRELOAD";
    this.itemId = a
}
p(Lj, Jj);
A("cast.framework.messages.PreloadRequestData", Lj);

function Mj(a) {
    Jj.call(this);
    this.type = "PRECACHE";
    this.precacheData = a
}
p(Mj, Jj);
A("cast.framework.messages.PrecacheRequestData", Mj);

function Nj() {
    M.call(this, "SET_VOLUME");
    this.volume = new Oj
}
p(Nj, M);
A("cast.framework.messages.VolumeRequestData", Nj);

function Pj() {
    M.call(this, "EDIT_TRACKS_INFO");
    this.enableTextTracks = this.isSuggestedLanguage = this.textTrackStyle = this.language = this.activeTrackIds = void 0
}
p(Pj, M);
A("cast.framework.messages.EditTracksInfoRequestData", Pj);

function Qj() {
    M.call(this, "EDIT_AUDIO_TRACKS");
    this.isSuggestedLanguage = this.language = void 0
}
p(Qj, M);
A("cast.framework.messages.EditAudioTracksRequestData", Qj);

function Rj() {
    M.call(this, "SEEK");
    this.resumeState = void 0;
    this.currentTime = 0;
    this.relativeTime = void 0
}
p(Rj, M);
A("cast.framework.messages.SeekRequestData", Rj);

function Sj() {
    M.call(this, "SET_PLAYBACK_RATE");
    this.relativePlaybackRate = this.playbackRate = void 0
}
p(Sj, M);
A("cast.framework.messages.SetPlaybackRateRequestData", Sj);

function Tj() {
    M.call(this, "GET_STATUS");
    this.options = void 0
}
p(Tj, M);
A("cast.framework.messages.GetStatusRequestData", Tj);

function Uj(a) {
    M.call(this, "QUEUE_LOAD");
    this.repeatMode = void 0;
    this.items = a;
    this.currentTime = this.startIndex = void 0
}
p(Uj, M);
A("cast.framework.messages.QueueLoadRequestData", Uj);

function Vj(a) {
    M.call(this, "QUEUE_INSERT");
    this.currentTime = this.currentItemId = this.currentItemIndex = this.insertBefore = void 0;
    this.items = a
}
p(Vj, M);
A("cast.framework.messages.QueueInsertRequestData", Vj);

function Wj() {
    M.call(this, "QUEUE_UPDATE");
    this.shuffle = this.repeatMode = this.items = this.jump = this.currentTime = this.currentItemId = void 0
}
p(Wj, M);
A("cast.framework.messages.QueueUpdateRequestData", Wj);

function Xj(a) {
    M.call(this, "QUEUE_REMOVE");
    this.currentTime = this.currentItemId = void 0;
    this.itemIds = a
}
p(Xj, M);
A("cast.framework.messages.QueueRemoveRequestData", Xj);

function Yj(a) {
    M.call(this, "QUEUE_REORDER");
    this.insertBefore = this.currentTime = this.currentItemId = void 0;
    this.itemIds = a
}
p(Yj, M);
A("cast.framework.messages.QueueReorderRequestData", Yj);

function Zj(a, b, c) {
    M.call(this, "QUEUE_GET_ITEM_RANGE");
    this.itemId = a;
    this.nextCount = b;
    this.prevCount = c
}
p(Zj, M);
A("cast.framework.messages.FetchItemsRequestData", Zj);

function ak(a) {
    M.call(this, "QUEUE_GET_ITEMS");
    this.itemIds = a
}
p(ak, M);
A("cast.framework.messages.GetItemsInfoRequestData", ak);
A("cast.framework.messages.HlsSegmentFormat", {
    AAC: "aac",
    AC3: "ac3",
    MP3: "mp3",
    TS: "ts",
    TS_AAC: "ts_aac",
    E_AC3: "e_ac3",
    FMP4: "fmp4"
});
A("cast.framework.messages.HlsVideoSegmentFormat", {
    MPEG2_TS: "mpeg2_ts",
    FMP4: "fmp4"
});
A("cast.framework.messages.StreamType", {
    BUFFERED: "BUFFERED",
    LIVE: "LIVE",
    NONE: "NONE"
});
A("cast.framework.messages.HdrType", {
    SDR: "sdr",
    HDR: "hdr",
    DV: "dv"
});
var bk = {
    INVALID_PLAYER_STATE: "INVALID_PLAYER_STATE",
    LOAD_FAILED: "LOAD_FAILED",
    LOAD_CANCELLED: "LOAD_CANCELLED",
    INVALID_REQUEST: "INVALID_REQUEST",
    ERROR: "ERROR"
};
A("cast.framework.messages.ErrorType", bk);
A("cast.framework.messages.IdleReason", {
    CANCELLED: "CANCELLED",
    INTERRUPTED: "INTERRUPTED",
    FINISHED: "FINISHED",
    ERROR: "ERROR"
});
A("cast.framework.messages.SeekResumeState", {
    PLAYBACK_START: "PLAYBACK_START",
    PLAYBACK_PAUSE: "PLAYBACK_PAUSE"
});
A("cast.framework.messages.PlayerState", {
    IDLE: "IDLE",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    BUFFERING: "BUFFERING"
});
A("cast.framework.messages.ExtendedPlayerState", {
    LOADING: "LOADING"
});

function Kj() {
    this.contentId = "";
    this.contentUrl = void 0;
    this.streamType = "NONE";
    this.contentType = "";
    this.vmapAdsRequest = this.hlsVideoSegmentFormat = this.hlsSegmentFormat = this.breakClips = this.breaks = this.customData = this.textTrackStyle = this.tracks = this.startAbsoluteTime = this.duration = this.entity = this.metadata = void 0
}
A("cast.framework.messages.MediaInformation", Kj);

function ck(a, b) {
    this.start = a;
    this.end = b
}
A("cast.framework.messages.SeekableRange", ck);

function dk(a, b, c, d) {
    ck.call(this, a, b);
    this.isMovingWindow = c;
    this.isLiveDone = d
}
p(dk, ck);
A("cast.framework.messages.LiveSeekableRange", dk);

function ek(a, b, c, d, e, f, g) {
    this.id = a;
    this.queueType = this.entity = void 0;
    this.name = b;
    this.description = c;
    this.repeatMode = d;
    this.shuffle = !1;
    this.items = e;
    this.startIndex = f;
    this.startTime = g;
    this.containerMetadata = void 0
}
A("cast.framework.messages.QueueData", ek);
A("cast.framework.messages.QueueType", {
    ALBUM: "ALBUM",
    PLAYLIST: "PLAYLIST",
    AUDIOBOOK: "AUDIOBOOK",
    RADIO_STATION: "RADIO_STATION",
    PODCAST_SERIES: "PODCAST_SERIES",
    TV_SERIES: "TV_SERIES",
    VIDEO_PLAYLIST: "VIDEO_PLAYLIST",
    LIVE_TV: "LIVE_TV",
    MOVIE: "MOVIE"
});
A("cast.framework.messages.ContainerType", {
    GENERIC_CONTAINER: 0,
    AUDIOBOOK_CONTAINER: 1
});

function fk(a) {
    this.containerType = void 0 === a ? 0 : a;
    this.containerDuration = this.containerImages = this.sections = this.title = void 0
}
A("cast.framework.messages.ContainerMetadata", fk);
A("cast.framework.messages.StreamingProtocolType", {
    UNKNOWN: 0,
    MPEG_DASH: 1,
    HLS: 2,
    SMOOTH_STREAMING: 3
});
A("cast.framework.messages.MetadataType", {
    GENERIC: 0,
    MOVIE: 1,
    TV_SHOW: 2,
    MUSIC_TRACK: 3,
    PHOTO: 4,
    AUDIOBOOK_CHAPTER: 5
});

function gk(a) {
    this.metadataType = a;
    this.queueItemId = this.sectionStartTimeInContainer = this.sectionStartAbsoluteTime = this.sectionStartTimeInMedia = this.sectionDuration = void 0
}
A("cast.framework.messages.MediaMetadata", gk);

function hk() {
    gk.call(this, 0);
    this.releaseDate = this.releaseYear = this.images = this.subtitle = this.title = void 0
}
p(hk, gk);
A("cast.framework.messages.GenericMediaMetadata", hk);

function ik() {
    gk.call(this, 1);
    this.releaseDate = this.releaseYear = this.images = this.subtitle = this.studio = this.title = void 0
}
p(ik, gk);
A("cast.framework.messages.MovieMediaMetadata", ik);

function jk() {
    gk.call(this, 2);
    this.originalAirdate = this.releaseYear = this.images = this.episode = this.episodeNumber = this.season = this.seasonNumber = this.episodeTitle = this.title = this.seriesTitle = void 0
}
p(jk, gk);
A("cast.framework.messages.TvShowMediaMetadata", jk);

function kk() {
    gk.call(this, 3);
    this.releaseDate = this.releaseYear = this.images = this.discNumber = this.trackNumber = this.artistName = this.songName = this.composer = this.artist = this.albumArtist = this.title = this.albumName = void 0
}
p(kk, gk);
A("cast.framework.messages.MusicTrackMediaMetadata", kk);

function lk() {
    gk.call(this, 4);
    this.creationDateTime = this.height = this.width = this.longitude = this.latitude = this.images = this.location = this.artist = this.title = void 0
}
p(lk, gk);
A("cast.framework.messages.PhotoMediaMetadata", lk);

function mk() {
    fk.call(this, 1);
    this.releaseDate = this.publisher = this.narrators = this.authors = void 0
}
p(mk, fk);
A("cast.framework.messages.AudiobookContainerMetadata", mk);

function nk() {
    gk.call(this, 5);
    this.images = this.subtitle = this.bookTitle = this.title = this.chapterTitle = void 0
}
p(nk, gk);
A("cast.framework.messages.AudiobookChapterMediaMetadata", nk);
A("cast.framework.messages.Image", function(a) {
    this.url = a;
    this.width = this.height = void 0
});

function Oj() {
    this.muted = this.level = void 0
}
A("cast.framework.messages.Volume", Oj);
A("cast.framework.messages.VideoInformation", function(a, b, c) {
    this.width = a;
    this.height = b;
    this.hdrType = c
});

function ok() {
    this.type = "MEDIA_STATUS";
    this.mediaSessionId = 0;
    this.videoInfo = this.queueData = this.media = void 0;
    this.playbackRate = 1;
    this.playerState = "IDLE";
    this.idleReason = void 0;
    this.supportedMediaCommands = this.currentTime = 0;
    this.volume = new Oj;
    this.liveSeekableRange = this.extendedStatus = this.breakStatus = this.repeatMode = this.items = this.customData = this.preloadedItemId = this.loadingItemId = this.currentItemId = this.activeTrackIds = void 0
}
A("cast.framework.messages.MediaStatus", ok);
A("cast.framework.messages.ExtendedMediaStatus", function(a, b) {
    this.playerState = a;
    this.media = b
});

function pk() {
    ok.call(this)
}
p(pk, ok);
A("cast.framework.messages.CloudMediaStatus", pk);
A("cast.framework.messages.Command", {
    PAUSE: 1,
    SEEK: 2,
    STREAM_VOLUME: 4,
    STREAM_MUTE: 8,
    ALL_BASIC_MEDIA: 15,
    QUEUE_NEXT: 64,
    QUEUE_PREV: 128,
    QUEUE_SHUFFLE: 256,
    SKIP_AD: 512
});
A("cast.framework.messages.TrackType", {
    TEXT: "TEXT",
    AUDIO: "AUDIO",
    VIDEO: "VIDEO"
});
var qk = {
    CEA608: "text/cea608",
    TTML: "application/ttml+xml",
    VTT: "text/vtt",
    TTML_MP4: "application/mp4"
};
A("cast.framework.messages.CaptionMimeType", qk);
A("cast.framework.messages.TextTrackType", {
    SUBTITLES: "SUBTITLES",
    CAPTIONS: "CAPTIONS",
    DESCRIPTIONS: "DESCRIPTIONS",
    CHAPTERS: "CHAPTERS",
    METADATA: "METADATA"
});
A("cast.framework.messages.TextTrackEdgeType", {
    NONE: "NONE",
    OUTLINE: "OUTLINE",
    DROP_SHADOW: "DROP_SHADOW",
    RAISED: "RAISED",
    DEPRESSED: "DEPRESSED"
});
A("cast.framework.messages.TextTrackWindowType", {
    NONE: "NONE",
    NORMAL: "NORMAL",
    ROUNDED_CORNERS: "ROUNDED_CORNERS"
});
A("cast.framework.messages.TextTrackFontGenericFamily", {
    SANS_SERIF: "SANS_SERIF",
    MONOSPACED_SANS_SERIF: "MONOSPACED_SANS_SERIF",
    SERIF: "SERIF",
    MONOSPACED_SERIF: "MONOSPACED_SERIF",
    CASUAL: "CASUAL",
    CURSIVE: "CURSIVE",
    SMALL_CAPITALS: "SMALL_CAPITALS"
});
A("cast.framework.messages.TextTrackFontStyle", {
    NORMAL: "NORMAL",
    BOLD: "BOLD",
    BOLD_ITALIC: "BOLD_ITALIC",
    ITALIC: "ITALIC"
});
A("cast.framework.messages.Track", function(a, b) {
    this.trackId = a;
    this.trackContentType = this.trackContentId = void 0;
    this.type = b;
    this.customData = this.subtype = this.language = this.name = void 0
});
A("cast.framework.messages.TextTrackStyle", function() {
    this.customData = this.fontStyle = this.fontGenericFamily = this.fontFamily = this.windowRoundedCornerRadius = this.windowColor = this.windowType = this.edgeColor = this.edgeType = this.backgroundColor = this.foregroundColor = this.fontScale = void 0
});
A("cast.framework.messages.RepeatMode", {
    REPEAT_OFF: "REPEAT_OFF",
    REPEAT_ALL: "REPEAT_ALL",
    REPEAT_SINGLE: "REPEAT_SINGLE",
    REPEAT_ALL_AND_SHUFFLE: "REPEAT_ALL_AND_SHUFFLE"
});
A("cast.framework.messages.QueueChangeType", {
    INSERT: "INSERT",
    REMOVE: "REMOVE",
    ITEMS_CHANGE: "ITEMS_CHANGE",
    UPDATE: "UPDATE",
    NO_CHANGE: "NO_CHANGE"
});
A("cast.framework.messages.QueueChange", function() {
    this.type = "QUEUE_CHANGE";
    this.sequenceNumber = this.insertBefore = this.itemIds = this.changeType = this.requestId = void 0
});
A("cast.framework.messages.ItemsInfo", function() {
    this.type = "QUEUE_ITEMS";
    this.items = this.requestId = void 0
});
A("cast.framework.messages.QueueIds", function() {
    this.type = "QUEUE_ITEM_IDS";
    this.itemIds = this.requestId = void 0
});
A("cast.framework.messages.GetStatusOptions", {
    NO_METADATA: 1,
    NO_QUEUE_ITEMS: 2
});

function rk(a, b, c) {
    this.id = a;
    this.breakClipIds = b;
    this.position = c;
    this.duration = void 0;
    this.isWatched = !1;
    this.isEmbedded = void 0
}
A("cast.framework.messages.Break", rk);

function sk(a) {
    this.id = a;
    this.vastAdsRequest = this.customData = this.hlsSegmentFormat = this.clickThroughUrl = this.posterUrl = this.whenSkippable = this.duration = this.title = this.contentType = this.contentUrl = this.contentId = void 0
}
A("cast.framework.messages.BreakClip", sk);
A("cast.framework.messages.VastAdsRequest", function() {
    this.adsResponse = this.adTagUrl = void 0
});
A("cast.framework.messages.BreakStatus", function(a, b) {
    this.currentBreakTime = a;
    this.currentBreakClipTime = b;
    this.whenSkippable = this.breakClipId = this.breakId = void 0
});
A("cast.framework.messages.PlayStringId", {
    FREE_TRIAL_ABOUT_TO_EXPIRE: "FREE_TRIAL_ABOUT_TO_EXPIRE",
    SUBSCRIPTION_ABOUT_TO_EXPIRE: "SUBSCRIPTION_ABOUT_TO_EXPIRE",
    STREAM_HIJACKED: "STREAM_HIJACKED"
});

function tk() {
    M.call(this, "SET_CREDENTIALS")
}
p(tk, M);
A("cast.framework.messages.SetCredentialsRequestData", tk);

function uk() {
    M.call(this, "LOAD_BY_ENTITY")
}
p(uk, M);
A("cast.framework.messages.LoadByEntityRequestData", uk);

function vk() {
    M.call(this, "CUSTOM_COMMAND")
}
p(vk, M);
A("cast.framework.messages.CustomCommandRequestData", vk);

function wk() {
    M.call(this, "REFRESH_CREDENTIALS")
}
p(wk, M);
A("cast.framework.messages.RefreshCredentialsRequestData", wk);

function xk(a, b) {
    M.call(this, "PLAY_STRING");
    this.stringId = a;
    this.arguments = b
}
p(xk, M);
A("cast.framework.messages.PlayStringRequestData", xk);

function yk(a) {
    M.call(this, "EXECUTE_ACTION_SCRIPT");
    this.actionScript = JSON.stringify(a)
}
p(yk, M);
A("cast.framework.messages.ExecuteActionScriptRequestData", yk);
A("cast.framework.messages.ScriptAction", function(a, b) {
    this.app_id = a;
    this.action = b;
    this.custom_data = void 0
});
A("cast.framework.messages.UserAction", {
    LIKE: "LIKE",
    DISLIKE: "DISLIKE",
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
    FLAG: "FLAG",
    SKIP_AD: "SKIP_AD"
});
A("cast.framework.messages.UserActionContext", {
    UNKNOWN_CONTEXT: "UNKNOWN_CONTEXT",
    TRACK: "TRACK",
    ALBUM: "ALBUM",
    ARTIST: "ARTIST",
    PLAYLIST: "PLAYLIST",
    EPISODE: "EPISODE",
    SERIES: "SERIES",
    MOVIE: "MOVIE",
    CHANNEL: "CHANNEL",
    TEAM: "TEAM",
    PLAYER: "PLAYER",
    COACH: "COACH"
});

function zk() {
    M.call(this, "USER_ACTION")
}
p(zk, M);
A("cast.framework.messages.UserActionRequestData", zk);

function Ak() {
    M.call(this, "DISPLAY_STATUS")
}
p(Ak, M);
A("cast.framework.messages.DisplayStatusRequestData", Ak);

function Bk() {
    M.call(this, "FOCUS_STATE")
}
p(Bk, M);
A("cast.framework.messages.FocusStateRequestData", Bk);
A("cast.framework.messages.FocusState", {
    IN_FOCUS: "IN_FOCUS",
    NOT_IN_FOCUS: "NOT_IN_FOCUS"
});
A("cast.framework.messages.QueueItem", function(a) {
    this.itemId = a;
    this.customData = this.activeTrackIds = this.preloadTime = this.playbackDuration = this.startTime = this.autoplay = this.media = void 0
});
cast.v.ka = {};

function Ck(a) {
    this.type = a
}
A("cast.framework.system.Event", Ck);
A("cast.framework.system.MessageType", {
    STRING: "STRING",
    JSON: "JSON"
});
A("cast.framework.system.ApplicationData", function() {
    this.iconUrl = this.name = this.id = "";
    this.sessionId = 0;
    this.namespaces = [];
    this.launchingSenderId = ""
});
A("cast.framework.system.SystemVolumeData", function() {
    this.level = 1;
    this.muted = !1
});
A("cast.framework.system.Sender", function() {
    this.userAgent = this.id = "";
    this.largeMessageSupported = void 0
});
A("cast.framework.system.VisibilityState", {
    VISIBLE: "visible",
    NOT_VISIBLE: "notvisible",
    UNKNOWN: "unknown"
});
A("cast.framework.system.StandbyState", {
    STANDBY: "standby",
    NOT_STANDBY: "notstandby",
    UNKNOWN: "unknown"
});
A("cast.framework.system.SystemState", {
    NOT_STARTED: "notstarted",
    STARTING_IN_BACKGROUND: "startinginbackground",
    STARTING: "starting",
    READY: "ready",
    STOPPING_IN_BACKGROUND: "stoppinginbackground",
    STOPPING: "stopping"
});
A("cast.framework.system.DeviceCapabilities", {
    AUDIO_ASSISTANT: "audio_assistant",
    BLUETOOTH_SUPPORTED: "bluetooth_supported",
    DISPLAY_SUPPORTED: "display_supported",
    HI_RES_AUDIO_SUPPORTED: "hi_res_audio_supported",
    IS_DV_SUPPORTED: "is_dv_supported",
    IS_HDR_SUPPORTED: "is_hdr_supported",
    TOUCH_INPUT_SUPPORTED: "touch_input_supported"
});
A("cast.framework.system.EventType", {
    READY: "ready",
    SHUTDOWN: "shutdown",
    SENDER_CONNECTED: "senderconnected",
    SENDER_DISCONNECTED: "senderdisconnected",
    ERROR: "error",
    SYSTEM_VOLUME_CHANGED: "systemvolumechanged",
    VISIBILITY_CHANGED: "visibilitychanged",
    STANDBY_CHANGED: "standbychanged",
    MAX_VIDEO_RESOLUTION_CHANGED: "maxvideoresolutionchanged",
    FEEDBACK_STARTED: "feedbackstarted"
});
A("cast.framework.system.DisconnectReason", {
    REQUESTED_BY_SENDER: "requested_by_sender",
    ERROR: "error",
    UNKNOWN: "unknown"
});

function Dk(a, b, c) {
    this.type = "senderdisconnected";
    this.senderId = a;
    this.userAgent = b;
    this.reason = c
}
p(Dk, Ck);
A("cast.framework.system.SenderDisconnectedEvent", Dk);

function Ek(a, b) {
    this.type = "senderconnected";
    this.senderId = a;
    this.userAgent = b
}
p(Ek, Ck);
A("cast.framework.system.SenderConnectedEvent", Ek);

function Fk(a) {
    this.type = "visibilitychanged";
    this.isVisible = a
}
p(Fk, Ck);
A("cast.framework.system.VisibilityChangedEvent", Fk);

function Gk(a) {
    this.type = "standbychanged";
    this.isStandby = a
}
p(Gk, Ck);
A("cast.framework.system.StandbyChangedEvent", Gk);

function Hk(a) {
    this.type = "systemvolumechanged";
    this.data = a
}
p(Hk, Ck);
A("cast.framework.system.SystemVolumeChangedEvent", Hk);

function Ik(a) {
    this.type = "ready";
    this.data = a
}
p(Ik, Ck);
A("cast.framework.system.ReadyEvent", Ik);

function Jk() {
    this.type = "shutdown"
}
p(Jk, Ck);
A("cast.framework.system.ShutdownEvent", Jk);

function Kk() {
    this.type = "feedbackstarted"
}
p(Kk, Ck);
A("cast.framework.system.FeedbackStartedEvent", Kk);

function Lk(a) {
    this.type = "maxvideoresolutionchanged";
    this.height = a
}
p(Lk, Ck);
A("cast.framework.system.MaxVideoResolutionChangedEvent", Lk);
cast.ii = 1525977478;
cast.v.VERSION = "3.0.0016";
A("cast.framework.VERSION", cast.v.VERSION);
var Mk = {
        HLS: "application/x-mpegurl",
        zn: "application/vnd.apple.mpegurl",
        An: "audio/mpegurl",
        Bn: "audio/x-mpegurl",
        tn: "application/dash+xml",
        Pn: "application/vnd.ms-sstr+xml"
    },
    Nk = {
        kn: "audio_video",
        jn: "audio_only",
        IMAGE: "image"
    };
cast.v.Y = {};
cast.v.Y.Qi = "Skippable after {SECONDS} sec(s)";
cast.v.Y.hi = new nj(cast.v.Y.Qi);
cast.v.Y.Mk = function(a) {
    return tj(cast.v.Y.hi, {
        SECONDS: a
    })
};
cast.v.Y.Pi = "Ad";
cast.v.Y.Wi = "Skip Ad";
cast.v.Y.Ti = "Playing in {SECONDS} sec(s)";
cast.v.Y.Si = "LIVE";
cast.v.Y.Zi = new nj(cast.v.Y.Ti);
cast.v.Y.Nk = function(a) {
    return tj(cast.v.Y.Zi, {
        SECONDS: a
    })
};
cast.v.Y.Vi = "Season {SEASON}";
cast.v.Y.gj = new nj(cast.v.Y.Vi);
cast.v.Y.Ri = "Episode {EPISODE}";
cast.v.Y.vi = new nj(cast.v.Y.Ri);
cast.v.Y.Ui = "Season {SEASON}, Episode {EPISODE}";
cast.v.Y.fj = new nj(cast.v.Y.Ui);
cast.v.Y.Ok = function(a, b) {
    return b ? a ? tj(cast.v.Y.fj, {
        SEASON: a,
        EPISODE: b
    }) : tj(cast.v.Y.vi, {
        EPISODE: b
    }) : tj(cast.v.Y.gj, {
        SEASON: a
    })
};
cast.v.I = {};
cast.v.I.Mg = function(a) {
    return a
};
cast.v.I.Lk = function(a) {
    return a
};
cast.v.I.Gk = function(a) {
    return a
};
cast.v.I.Hk = function(a) {
    return a
};
cast.v.I.Lg = function(a) {
    return a
};
cast.v.I.Ik = function(a) {
    return a
};
cast.v.I.Wh = function(a) {
    return a
};
cast.v.I.Sm = function(a) {
    return a
};
cast.v.I.Rm = function(a) {
    return a
};
cast.v.I.Tm = function(a) {
    return a
};
cast.v.I.Qm = function(a) {
    return a
};
cast.v.I.yk = function(a) {
    return a
};
cast.v.I.zk = function(a) {
    return a
};
cast.v.I.Yn = function(a) {
    return a
};
cast.v.I.eg = function(a) {
    return a
};
cast.v.I.Ak = function(a) {
    return a
};
cast.v.I.Wm = function(a) {
    return a
};
cast.v.I.Vm = function(a) {
    return a
};
cast.v.I.Xn = function(a) {
    return a
};
cast.v.I.Pm = function(a) {
    return a
};
cast.v.I.Om = function(a) {
    return a
};
cast.v.I.xk = function(a) {
    return a
};
cast.v.I.Ck = function(a) {
    return a
};
cast.v.I.Bk = function(a) {
    return a
};
cast.v.I.Fk = function(a) {
    return a
};
cast.v.I.Xm = function(a) {
    return a
};
cast.v.I.Kk = function(a) {
    return a
};
cast.v.I.jo = function(a) {
    return a
};
cast.v.I.Ng = function(a) {
    return a
};
cast.v.I.Yh = function(a) {
    return a
};
cast.v.I.Jk = function(a) {
    return a
};
cast.v.I.Xh = function(a) {
    return a
};
cast.v.I.Nm = function(a) {
    return a
};
cast.v.I.io = function(a) {
    return a
};
cast.v.I.Dk = function(a) {
    return a
};
cast.v.I.Ek = function(a) {
    return a
};
cast.v.I.Vh = function(a) {
    return a
};
cast.v.I.Um = function(a) {
    return a
};
cast.v.media = {};
cast.v.media.za = {};
cast.v.media.za.getTrackById = function(a, b) {
    return b.find(function(b) {
        return b.trackId == a
    }) || null
};
cast.v.media.za.cf = function(a, b) {
    return b.filter(function(b) {
        return b.language && cast.receiver.yc(b.language, a)
    })
};
cast.v.media.za.fh = function(a, b) {
    return 0 !== cast.v.media.za.cf(a, b).length
};
cast.v.media.za.fn = function(a) {
    if (a.find(function(a) {
            return "TEXT" != a.type
        })) throw Error("Type is not matching.");
};
cast.v.media.za.di = function(a, b) {
    if (b.filter(function(b) {
            return a.includes(b.trackId)
        }).length !== a.length) throw Error("Invalid id.");
};

function Ok() {}

function Pk(a) {
    if (!(a instanceof Ok)) throw E(Qk, "Proper AudioTracksManager object can be acquried by calling cast.framework.PlayerManager.getAudioTracksManager()"), Error("AudioTracksManager is not created properly.");
    this.g = this.h = null
}
A("cast.framework.AudioTracksManager", Pk);
Pk.prototype.reset = function() {
    this.g = null
};

function Rk(a) {
    if (!a.g || !N(a.g)) throw Error("Tracks info is not available.");
}
Pk.prototype.getTracks = function() {
    Rk(this);
    var a = N(this.g).getTracks("AUDIO");
    return cast.v.I.Ng(a)
};
Pk.prototype.getTracks = Pk.prototype.getTracks;
Pk.prototype.getTrackById = function(a) {
    Rk(this);
    if (0 > a) throw Error("Invalid track id.");
    return cast.v.media.za.getTrackById(a, this.getTracks())
};
Pk.prototype.getTrackById = Pk.prototype.getTrackById;
Pk.prototype.Sd = function(a) {
    if (!a) throw Error("Need language as input.");
    return cast.v.media.za.cf(a, this.getTracks())
};
Pk.prototype.getTracksByLanguage = Pk.prototype.Sd;
Pk.prototype.Rk = function() {
    Rk(this);
    var a = N(this.g).h;
    return null === a ? null : this.getTrackById(a)
};
Pk.prototype.getActiveTrack = Pk.prototype.Rk;
Pk.prototype.Pk = function() {
    Rk(this);
    return N(this.g).h
};
Pk.prototype.getActiveId = Pk.prototype.Pk;
Pk.prototype.Dm = function(a) {
    Rk(this);
    if (null === a) F(Qk, "No valid id, persist the current behavior.");
    else {
        cast.v.media.za.di([a], this.getTracks());
        var b = N(this.g).o.sort();
        b = b.concat(a);
        Sk(N(this.g), b);
        this.h && ch(this.h, N(this.g).Fa(), !1)
    }
};
Pk.prototype.setActiveById = Pk.prototype.Dm;
Pk.prototype.pe = function(a) {
    Rk(this);
    if (!cast.v.media.za.fh(a, this.getTracks())) throw Error("No matching track.");
    Tk(N(this.g), a);
    this.h && ch(this.h, N(this.g).Fa(), !1)
};
Pk.prototype.setActiveByLanguage = Pk.prototype.pe;
Pk.prototype.Fa = function() {
    Rk(this);
    return N(this.g).Fa()
};
var Qk = D("cast.framework.AudioTracksManager");
A("cast.framework.NetworkRequestInfo", function() {
    this.headers = this.url = null;
    this.withCredentials = !1;
    this.content = null
});
cast.v.R = {};
A("cast.framework.ui.UiConfig", function() {});

function Uk() {}
A("cast.framework.CastReceiverOptions", Uk);

function Vk() {}
A("cast.framework.PlaybackConfig", Vk);

function Wk() {}

function Xk(a) {
    if (!(a instanceof Wk)) throw E(Xk.P, "Proper QueueManager object can be acquried by calling cast.framework.PlayerManager.getQueueManager()"), Error("QueueManager is not created properly.");
    this.g = null;
    this.h = !0
}
A("cast.framework.QueueManager", Xk);
Xk.prototype.Im = function(a) {
    this.h = a;
    this.g && (this.g.M = this.h)
};
Xk.prototype.setQueueStatusLimit = Xk.prototype.Im;
Xk.prototype.Mb = function() {
    var a = [],
        b = Eg(this.g);
    b && (a = b.Mb(!0));
    return cast.v.I.Ek(a)
};
Xk.prototype.getItems = Xk.prototype.Mb;
Xk.prototype.yb = function() {
    var a = null,
        b = Eg(this.g);
    b && (a = b.yb());
    return cast.v.I.Dk(a)
};
Xk.prototype.getCurrentItem = Xk.prototype.yb;
Xk.prototype.Ld = function() {
    var a = -1,
        b = Eg(this.g);
    b && (a = b.Ld());
    return a
};
Xk.prototype.getCurrentItemIndex = Xk.prototype.Ld;
Xk.prototype.sf = function(a, b) {
    a = new nh(cast.v.I.Vh(a));
    a.insertBefore = b;
    this.g.ab(a)
};
Xk.prototype.insertItems = Xk.prototype.sf;
Xk.prototype.Qf = function(a) {
    this.g.ab(new oh(a))
};
Xk.prototype.removeItems = Xk.prototype.Qf;
Xk.prototype.gg = function(a) {
    var b = new Pg;
    b.items = cast.v.I.Vh(a);
    this.g.ab(b)
};
Xk.prototype.updateItems = Xk.prototype.gg;
A("cast.framework.Stats", function() {});

function Yk() {}

function O(a) {
    if (!(a instanceof Yk)) throw E(O.P, "Proper TextTracksManager object can be acquried by calling cast.framework.PlayerManager.getTextTracksManager()"), Error("TextTracksManager is not created properly.");
    this.g = this.h = null
}
A("cast.framework.TextTracksManager", O);
O.prototype.reset = function() {
    this.g = null
};

function Zk(a) {
    if (!a.g || !N(a.g)) throw Error("Tracks info is not available.");
}
O.prototype.getTracks = function() {
    Zk(this);
    var a = N(this.g).getTracks("TEXT");
    return cast.v.I.Ng(a)
};
O.prototype.getTracks = O.prototype.getTracks;
O.prototype.getTrackById = function(a) {
    Zk(this);
    if (0 > a) throw Error("Invalid input.");
    return cast.v.media.za.getTrackById(a, this.getTracks())
};
O.prototype.getTrackById = O.prototype.getTrackById;
O.prototype.Sd = function(a) {
    if (!a) throw Error("Need language as input.");
    return cast.v.media.za.cf(a, this.getTracks())
};
O.prototype.getTracksByLanguage = O.prototype.Sd;
O.prototype.Qg = function() {
    var a = this.getTracks(),
        b = N(this.g).o.sort(),
        c = [];
    a = n(a);
    for (var d = a.next(); !d.done; d = a.next()) d = d.value, b.includes(d.trackId) && c.push(d);
    return c
};
O.prototype.getActiveTracks = O.prototype.Qg;
O.prototype.Qk = function() {
    Zk(this);
    return N(this.g).o.sort()
};
O.prototype.getActiveIds = O.prototype.Qk;
O.prototype.hc = function() {
    Zk(this);
    return cast.v.I.Kk(N(this.g).hc("TEXT"))
};
O.prototype.createTrack = O.prototype.hc;
O.prototype.sj = function(a) {
    Zk(this);
    cast.v.media.za.fn(a);
    $k(N(this.g), cast.v.I.Yh(a));
    this.h && ch(this.h, N(this.g).Fa())
};
O.prototype.addTracks = O.prototype.sj;
O.prototype.Em = function(a) {
    Zk(this);
    null === a || 0 === a.length ? Sk(N(this.g), []) : (cast.v.media.za.di(a, this.getTracks()), Sk(N(this.g), a), this.h && ch(this.h, N(this.g).Fa(), !1))
};
O.prototype.setActiveByIds = O.prototype.Em;
O.prototype.pe = function(a) {
    Zk(this);
    if (!cast.v.media.za.fh(a, this.getTracks())) throw Error("No matching track.");
    al(N(this.g), a);
    this.h && ch(this.h, N(this.g).Fa(), !1)
};
O.prototype.setActiveByLanguage = O.prototype.pe;
O.prototype.rb = function(a) {
    Zk(this);
    N(this.g).rb(cast.v.I.Xh(a));
    this.h && ch(this.h, N(this.g).Fa())
};
O.prototype.setTextTrackStyle = O.prototype.rb;
O.prototype.Nb = function() {
    Zk(this);
    var a = N(this.g).Nb();
    if (r(a)) return cast.v.I.Jk(a)
};
O.prototype.getTextTracksStyle = O.prototype.Nb;
O.prototype.Fa = function() {
    Zk(this);
    return N(this.g).Fa()
};
cast.v.common = {};

function bl() {
    this.h = {};
    this.l = {};
    this.o = {};
    this.g = this.u.bind(this)
}

function cl(a, b, c) {
    a.o[b] = c || v
}
bl.prototype.Dc = function(a, b) {
    this.h[a] = b || v
};

function dl(a, b) {
    a = a.h[b];
    return a == v ? null : a
}
bl.prototype.u = function(a) {
    var b = a.type;
    G(el, "onEvent for " + b);
    var c = this.h[b],
        d = this.l[b],
        e = this.o[b];
    d && d(a);
    c && (a = c(a));
    return Promise.resolve(a).then(function(a) {
        return a && a.type == b && e ? e(a) : a
    })
};

function fl(a, b) {
    kb(b, function(b, d) {
        a.l[d] = b || v
    })
}
var el = D("cast.framework.common.EventHandler");
cast.v.ra = {};
var gl = D("cast.framework.events.EventTarget");

function hl(a, b) {
    this.handleEvent = a;
    this.g = b
}

function il() {
    ec.call(this);
    this.g = {};
    this.h = this.l = null
}
p(il, ec);
h = il.prototype;
h.addEventListener = function(a, b, c) {
    if (this.mb()) E(gl, "Trying to add an event listener for " + a + " to a disposed EventTarget");
    else {
        this.g[a] || (this.g[a] = []);
        for (var d = n(this.g[a]), e = d.next(); !e.done; e = d.next())
            if (e.value.handleEvent === b) return;
        this.g[a].push(new hl(b, c))
    }
};
h.removeEventListener = function(a, b) {
    if (this.mb()) E(gl, "Trying to remove an event listener for " + a + " from a disposed EventTarget");
    else if (a = this.g[a]) {
        var c = a.findIndex(function(a) {
            return a.handleEvent === b
        });
        0 <= c && a.splice(c, 1)
    }
};
h.se = function(a) {
    this.mb() ? E(gl, "Trying to set a parent EventTarget for a disposed EventTarget") : this.l = a
};

function jl(a, b, c) {
    var d = a.g[b];
    d && d.slice().forEach(function(d) {
        try {
            d.handleEvent.call(d.g, c)
        } catch (f) {
            E(gl, "Handler for " + b + " encountered an error."), a.h && a.h(b, f), window.setTimeout(function() {
                throw f;
            }, 0)
        }
    })
}
h.dispatchEvent = function(a) {
    var b = a.type;
    this.mb() ? E(gl, "Trying to dispatch an event (" + a.type + ") on a disposed EventTarget") : (this.l && this.l.dispatchEvent(a), jl(this, b, a), jl(this, "*", a))
};

function kl(a, b) {
    a.h = b
}
h.da = function() {
    this.g = {};
    this.h = this.l = null
};
var ll = {
    ALL: "*",
    ABORT: "ABORT",
    CAN_PLAY: "CAN_PLAY",
    CAN_PLAY_THROUGH: "CAN_PLAY_THROUGH",
    DURATION_CHANGE: "DURATION_CHANGE",
    EMPTIED: "EMPTIED",
    ENDED: "ENDED",
    LOADED_DATA: "LOADED_DATA",
    LOADED_METADATA: "LOADED_METADATA",
    LOAD_START: "LOAD_START",
    PAUSE: "PAUSE",
    PLAY: "PLAY",
    PLAYING: "PLAYING",
    PROGRESS: "PROGRESS",
    RATE_CHANGE: "RATE_CHANGE",
    SEEKED: "SEEKED",
    SEEKING: "SEEKING",
    STALLED: "STALLED",
    TIME_UPDATE: "TIME_UPDATE",
    SUSPEND: "SUSPEND",
    WAITING: "WAITING",
    BITRATE_CHANGED: "BITRATE_CHANGED",
    BREAK_STARTED: "BREAK_STARTED",
    BREAK_ENDED: "BREAK_ENDED",
    BREAK_CLIP_LOADING: "BREAK_CLIP_LOADING",
    BREAK_CLIP_STARTED: "BREAK_CLIP_STARTED",
    BREAK_CLIP_ENDED: "BREAK_CLIP_ENDED",
    BUFFERING: "BUFFERING",
    CACHE_LOADED: "CACHE_LOADED",
    CACHE_HIT: "CACHE_HIT",
    CACHE_INSERTED: "CACHE_INSERTED",
    CLIP_STARTED: "CLIP_STARTED",
    CLIP_ENDED: "CLIP_ENDED",
    EMSG: "EMSG",
    ERROR: "ERROR",
    ID3: "ID3",
    MEDIA_STATUS: "MEDIA_STATUS",
    MEDIA_INFORMATION_CHANGED: "MEDIA_INFORMATION_CHANGED",
    MEDIA_FINISHED: "MEDIA_FINISHED",
    PLAYER_PRELOADING: "PLAYER_PRELOADING",
    PLAYER_PRELOADING_CANCELLED: "PLAYER_PRELOADING_CANCELLED",
    PLAYER_LOAD_COMPLETE: "PLAYER_LOAD_COMPLETE",
    PLAYER_LOADING: "PLAYER_LOADING",
    SEGMENT_DOWNLOADED: "SEGMENT_DOWNLOADED",
    REQUEST_SEEK: "REQUEST_SEEK",
    REQUEST_LOAD: "REQUEST_LOAD",
    REQUEST_STOP: "REQUEST_STOP",
    REQUEST_PAUSE: "REQUEST_PAUSE",
    REQUEST_PRECACHE: "REQUEST_PRECACHE",
    REQUEST_PLAY: "REQUEST_PLAY",
    REQUEST_SKIP_AD: "REQUEST_SKIP_AD",
    REQUEST_PLAY_AGAIN: "REQUEST_PLAY_AGAIN",
    REQUEST_PLAYBACK_RATE_CHANGE: "REQUEST_PLAYBACK_RATE_CHANGE",
    REQUEST_VOLUME_CHANGE: "REQUEST_VOLUME_CHANGE",
    REQUEST_EDIT_TRACKS_INFO: "REQUEST_EDIT_TRACKS_INFO",
    REQUEST_EDIT_AUDIO_TRACKS: "REQUEST_EDIT_AUDIO_TRACKS",
    REQUEST_SET_CREDENTIALS: "REQUEST_SET_CREDENTIALS",
    REQUEST_LOAD_BY_ENTITY: "REQUEST_LOAD_BY_ENTITY",
    REQUEST_USER_ACTION: "REQUEST_USER_ACTION",
    REQUEST_DISPLAY_STATUS: "REQUEST_DISPLAY_STATUS",
    REQUEST_CUSTOM_COMMAND: "REQUEST_CUSTOM_COMMAND",
    REQUEST_FOCUS_STATE: "REQUEST_FOCUS_STATE",
    REQUEST_QUEUE_LOAD: "REQUEST_QUEUE_LOAD",
    REQUEST_QUEUE_INSERT: "REQUEST_QUEUE_INSERT",
    REQUEST_QUEUE_UPDATE: "REQUEST_QUEUE_UPDATE",
    REQUEST_QUEUE_REMOVE: "REQUEST_QUEUE_REMOVE",
    REQUEST_QUEUE_REORDER: "REQUEST_QUEUE_REORDER",
    REQUEST_QUEUE_GET_ITEM_RANGE: "REQUEST_QUEUE_GET_ITEM_RANGE",
    REQUEST_QUEUE_GET_ITEMS: "REQUEST_QUEUE_GET_ITEMS",
    REQUEST_QUEUE_GET_ITEM_IDS: "REQUEST_QUEUE_GET_ITEM_IDS",
    INBAND_TRACK_ADDED: "INBAND_TRACK_ADDED",
    En: "LIVE_IS_MOVING_WINDOW_CHANGED",
    LIVE_ENDED: "LIVE_ENDED"
};
A("cast.framework.events.EventType", ll);
cast.v.common.ea = {};
var P = {},
    ml = (P["*"] = 1, P.ABORT = 2, P.CAN_PLAY = 3, P.CAN_PLAY_THROUGH = 4, P.DURATION_CHANGE = 5, P.EMPTIED = 6, P.ENDED = 7, P.LOADED_DATA = 8, P.LOADED_METADATA = 9, P.LOAD_START = 10, P.PAUSE = 11, P.PLAY = 12, P.PLAYING = 13, P.PROGRESS = 14, P.RATE_CHANGE = 15, P.SEEKED = 16, P.SEEKING = 17, P.STALLED = 18, P.TIME_UPDATE = 19, P.SUSPEND = 20, P.WAITING = 21, P.BITRATE_CHANGED = 22, P.BREAK_STARTED = 23, P.BREAK_ENDED = 24, P.BREAK_CLIP_LOADING = 25, P.BREAK_CLIP_STARTED = 26, P.BREAK_CLIP_ENDED = 27, P.BUFFERING = 28, P.CACHE_LOADED = 29, P.CACHE_HIT = 30, P.CACHE_INSERTED = 31,
        P.CLIP_STARTED = 32, P.CLIP_ENDED = 33, P.EMSG = 34, P.ERROR = 35, P.ID3 = 36, P.MEDIA_STATUS = 37, P.MEDIA_FINISHED = 38, P.PLAYER_PRELOADING = 39, P.PLAYER_PRELOADING_CANCELLED = 40, P.PLAYER_LOAD_COMPLETE = 41, P.PLAYER_LOADING = 42, P.SEGMENT_DOWNLOADED = 43, P.REQUEST_SEEK = 44, P.REQUEST_LOAD = 45, P.REQUEST_STOP = 46, P.REQUEST_PAUSE = 47, P.REQUEST_PLAY = 48, P.REQUEST_SKIP_AD = 49, P.REQUEST_PLAY_AGAIN = 50, P.REQUEST_PLAYBACK_RATE_CHANGE = 51, P.REQUEST_VOLUME_CHANGE = 52, P.REQUEST_EDIT_TRACKS_INFO = 53, P.REQUEST_EDIT_AUDIO_TRACKS = 54, P.REQUEST_SET_CREDENTIALS =
        55, P.REQUEST_LOAD_BY_ENTITY = 56, P.REQUEST_USER_ACTION = 57, P.REQUEST_DISPLAY_STATUS = 58, P.REQUEST_CUSTOM_COMMAND = 59, P.REQUEST_FOCUS_STATE = 60, P.REQUEST_QUEUE_LOAD = 61, P.REQUEST_QUEUE_INSERT = 62, P.REQUEST_QUEUE_UPDATE = 63, P.REQUEST_QUEUE_REMOVE = 64, P.REQUEST_QUEUE_REORDER = 65, P.REQUEST_QUEUE_GET_ITEM_RANGE = 66, P.REQUEST_QUEUE_GET_ITEMS = 67, P.REQUEST_QUEUE_GET_ITEM_IDS = 68, P.INBAND_TRACK_ADDED = 69, P.REQUEST_PRECACHE = 70, P.LIVE_IS_MOVING_WINDOW_CHANGED = 71, P.LIVE_ENDED = 72, P.MEDIA_INFORMATION_CHANGED = 73, P),
    Q = {},
    nl = (Q.MEDIA_STATUS =
        1, Q.CLOUD_STATUS = 2, Q.QUEUE_CHANGE = 3, Q.QUEUE_ITEMS = 4, Q.QUEUE_ITEM_IDS = 5, Q.GET_STATUS = 6, Q.LOAD = 7, Q.PAUSE = 8, Q.STOP = 9, Q.PLAY = 10, Q.SKIP_AD = 11, Q.PLAY_AGAIN = 12, Q.SEEK = 13, Q.SET_PLAYBACK_RATE = 14, Q.SET_VOLUME = 15, Q.EDIT_TRACKS_INFO = 16, Q.EDIT_AUDIO_TRACKS = 17, Q.PRECACHE = 18, Q.PRELOAD = 19, Q.QUEUE_LOAD = 20, Q.QUEUE_INSERT = 21, Q.QUEUE_UPDATE = 22, Q.QUEUE_REMOVE = 23, Q.QUEUE_REORDER = 24, Q.QUEUE_NEXT = 25, Q.QUEUE_PREV = 26, Q.QUEUE_GET_ITEM_RANGE = 27, Q.QUEUE_GET_ITEMS = 28, Q.QUEUE_GET_ITEM_IDS = 29, Q.QUEUE_SHUFFLE = 30, Q.SET_CREDENTIALS =
        31, Q.LOAD_BY_ENTITY = 32, Q.USER_ACTION = 33, Q.DISPLAY_STATUS = 34, Q.FOCUS_STATE = 35, Q.CUSTOM_COMMAND = 36, Q),
    ol = {},
    pl = (ol.INVALID_COMMAND = 0, ol.INVALID_PARAMS = 1, ol.INVALID_MEDIA_SESSION_ID = 2, ol.SKIP_LIMIT_REACHED = 3, ol.NOT_SUPPORTED = 4, ol.LANGUAGE_NOT_SUPPORTED = 5, ol.END_OF_QUEUE = 6, ol.DUPLICATE_REQUEST_ID = 7, ol.APP_ERROR = 8, ol.AUTHENTICATION_EXPIRED = 9, ol.PREMIUM_ACCOUNT_REQUIRED = 10, ol.CONCURRENT_STREAM_LIMIT = 11, ol.PARENTAL_CONTROL_RESTRICTED = 12, ol.NOT_AVAILABLE_IN_REGION = 13, ol.CONTENT_ALREADY_PLAYING = 14, ol.INVALID_REQUEST =
        15, ol.GENERIC_LOAD_ERROR = 16, ol);
cast.v.common.ea.vd = {
    Ei: 1,
    hj: 2,
    jj: 3,
    kj: 4
};
cast.v.common.ea.Rg = function(a) {
    return ml[a]
};
cast.v.common.ea.Uk = function(a) {
    return nl[a]
};
cast.v.common.ea.el = function(a) {
    return pl[void 0 === a ? "GENERIC_LOAD_ERROR" : a]
};
cast.v.common.ea.Al = function() {
    Wi("Cast.CAF.Version", Number(cast.v.VERSION.split(".")[2]))
};
cast.v.common.ea.qh = function(a) {
    Wi("Cast.CAF.PlayerStarted", a.Vc())
};
var ql = D("cast.framework.common.libraryloader"),
    rl = {
    };
rl.lg = document.currentScript.src;
var sl = qd(),
    tl = qd();
rl.Mf = sl.g;
rl.Ph = tl.g;
rl.bi = !1;

function ul(a, b) {
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    c.onload = function() {
        G(ql, "library(" + a + ") is loaded");
        b.resolve()
    };
    c.onerror = function() {
        E(ql, "library(" + a + ") cannot be loaded");
        b.reject()
    };
    document.head.appendChild(c)
}
rl.load = function(a) {
    a = void 0 === a ? !1 : a;
    ul(rl.bj, sl);
    a || (ul(rl.ij, tl), rl.bi = !0)
};
rl.zl = function() {
    var a = rl.lg.replace(/cast_receiver_framework(_debug|_dogfood)?\.js/, "cast_receiver_framework$1_vast_module.js");
    if (a === rl.lg) throw Error("Fail to calculate VAST lib URL");
    var b = qd();
    ul(a, b);
    return b.g.then(function() {
        if (cast.ii !== cast.ji) return E(ql, "Wrong version of VAST module is loaded."), ld("Wrong version of VAST module is loaded.")
    })
};
rl.reset = function() {
    sl = qd();
    tl = qd();
    rl.Mf = sl.g;
    rl.Ph = tl.g;
    rl.lo = qd()
};
cast.v.common.xc = rl;
cast.v.common.Jm = function(a, b) {
    (new vl(a, b)).start()
};
cast.v.common.Di = {
    no_media: 5,
    loading: 5,
    paused: 20
};

function vl(a, b) {
    this.l = a;
    this.o = b;
    this.h = this.g = null
}
h = vl.prototype;
h.start = function() {
    var a = this.l;
    a.addEventListener("ERROR", this.Ch.bind(this));
    a.addEventListener("MEDIA_FINISHED", this.Ch.bind(this));
    a.addEventListener("PAUSE", this.mm.bind(this));
    a.addEventListener("PLAYER_LOADING", this.lm.bind(this));
    a.addEventListener("PLAYER_LOAD_COMPLETE", this.km.bind(this));
    a.addEventListener("TIME_UPDATE", this.nm.bind(this));
    wl(this, "no_media")
};

function xl(a) {
    clearTimeout(a.g);
    a.g = null
}

function wl(a, b) {
    b == a.h ? Pc(yl, "state is already set to idle due to " + b) : (a.h = b, b = cast.v.common.Di[b], xl(a), a.g = setTimeout(function() {
        G(yl, "timer expired");
        this.o()
    }.bind(a), 6E4 * b))
}
h.Ch = function() {
    Pc(yl, "onPlayerIdle");
    wl(this, "no_media")
};
h.mm = function() {
    Pc(yl, "onPlayerPaused");
    wl(this, "paused")
};
h.lm = function() {
    Pc(yl, "onPlayerLoading");
    wl(this, "loading")
};
h.km = function() {
    Pc(yl, "onPlayerLoadComplete");
    "PAUSED" === this.l.Uc() && wl(this, "paused")
};
h.nm = function() {
    this.h = null;
    xl(this)
};
var yl = D("cast.framework.common.IdleTimeoutManager");
A("cast.framework.events.DetailedErrorCode", {
    MEDIA_UNKNOWN: 100,
    MEDIA_ABORTED: 101,
    MEDIA_DECODE: 102,
    MEDIA_NETWORK: 103,
    MEDIA_SRC_NOT_SUPPORTED: 104,
    SOURCE_BUFFER_FAILURE: 110,
    MEDIAKEYS_UNKNOWN: 200,
    MEDIAKEYS_NETWORK: 201,
    MEDIAKEYS_UNSUPPORTED: 202,
    MEDIAKEYS_WEBCRYPTO: 203,
    NETWORK_UNKNOWN: 300,
    SEGMENT_NETWORK: 301,
    HLS_NETWORK_MASTER_PLAYLIST: 311,
    HLS_NETWORK_PLAYLIST: 312,
    HLS_NETWORK_NO_KEY_RESPONSE: 313,
    HLS_NETWORK_KEY_LOAD: 314,
    HLS_NETWORK_INVALID_SEGMENT: 315,
    HLS_SEGMENT_PARSING: 316,
    DASH_NETWORK: 321,
    DASH_NO_INIT: 322,
    SMOOTH_NETWORK: 331,
    SMOOTH_NO_MEDIA_DATA: 332,
    MANIFEST_UNKNOWN: 400,
    HLS_MANIFEST_MASTER: 411,
    HLS_MANIFEST_PLAYLIST: 412,
    DASH_MANIFEST_UNKNOWN: 420,
    DASH_MANIFEST_NO_PERIODS: 421,
    DASH_MANIFEST_NO_MIMETYPE: 422,
    DASH_INVALID_SEGMENT_INFO: 423,
    SMOOTH_MANIFEST: 431,
    SEGMENT_UNKNOWN: 500,
    TEXT_UNKNOWN: 600,
    APP: 900,
    BREAK_CLIP_LOADING_ERROR: 901,
    BREAK_SEEK_INTERCEPTOR_ERROR: 902,
    IMAGE_ERROR: 903,
    LOAD_INTERRUPTED: 904,
    LOAD_FAILED: 905,
    MEDIA_ERROR_MESSAGE: 906,
    GENERIC: 999
});
cast.v.ra.yn = {};

function zl(a) {
    this.type = a
}
A("cast.framework.events.Event", zl);

function Fl(a) {
    this.type = "BITRATE_CHANGED";
    this.totalBitrate = a
}
p(Fl, zl);
A("cast.framework.events.BitrateChangedEvent", Fl);

function Gl(a) {
    this.type = "EMSG";
    this.messageData = a.messageData;
    this.schemeIdUri = a.schemeIdUri;
    this.value = a.value;
    this.startTime = a.startTime;
    this.endTime = a.endTime;
    this.timescale = a.timescale;
    this.presentationTimeDelta = a.presentationTimeDelta;
    this.eventDuration = a.eventDuration;
    this.id = a.id;
    this.segmentData = a.segmentData
}
p(Gl, zl);
A("cast.framework.events.EmsgEvent", Gl);

function Hl(a, b) {
    this.type = "ERROR";
    this.detailedErrorCode = a;
    this.error = b
}
p(Hl, zl);
A("cast.framework.events.ErrorEvent", Hl);

function Il(a, b) {
    this.type = "ID3";
    this.segmentData = a;
    this.timestamp = b
}
p(Il, zl);
A("cast.framework.events.Id3Event", Il);

function Jl(a, b) {
    this.type = a;
    this.currentMediaTime = b
}
p(Jl, zl);
A("cast.framework.events.MediaElementEvent", Jl);

function Kl(a, b) {
    b = void 0 === b ? !1 : b;
    Jl.call(this, "PAUSE", a);
    this.ended = b
}
p(Kl, Jl);
A("cast.framework.events.MediaPauseEvent", Kl);

function Ll(a) {
    this.type = "MEDIA_STATUS";
    this.mediaStatus = a
}
p(Ll, zl);
A("cast.framework.events.MediaStatusEvent", Ll);

function Ml(a, b) {
    this.type = "MEDIA_FINISHED";
    this.currentMediaTime = a;
    this.endedReason = b
}
p(Ml, zl);
A("cast.framework.events.MediaFinishedEvent", Ml);

function Nl(a, b, c) {
    this.type = a;
    this.requestData = b;
    this.senderId = c
}
p(Nl, zl);
A("cast.framework.events.RequestEvent", Nl);

function Ol(a, b) {
    this.type = a;
    this.media = b
}
p(Ol, zl);
A("cast.framework.events.LoadEvent", Ol);

function Pl(a) {
    Ol.call(this, "MEDIA_INFORMATION_CHANGED", a)
}
p(Pl, Ol);
A("cast.framework.events.MediaInformationChangedEvent", Pl);

function Ql(a, b, c, d, e, f, g, k) {
    this.type = a;
    this.currentMediaTime = b;
    this.index = c;
    this.total = d;
    this.whenSkippable = u(e) ? e : void 0;
    this.endedReason = f;
    this.breakClipId = g;
    this.breakId = k
}
p(Ql, zl);
A("cast.framework.events.BreaksEvent", Ql);

function Rl(a) {
    this.type = "BUFFERING";
    this.isBuffering = a
}
p(Rl, zl);
A("cast.framework.events.BufferingEvent", Rl);

function Sl(a, b) {
    this.type = "CLIP_ENDED";
    this.currentMediaTime = a;
    this.endedReason = b
}
p(Sl, zl);
A("cast.framework.events.ClipEndedEvent", Sl);

function Tl(a, b) {
    this.type = "SEGMENT_DOWNLOADED";
    this.downloadTime = a;
    this.size = b
}
p(Tl, zl);
A("cast.framework.events.SegmentDownloadedEvent", Tl);

function Ul(a) {
    this.type = "CACHE_LOADED";
    this.media = a
}
p(Ul, zl);
A("cast.framework.events.CacheLoadedEvent", Ul);

function Vl(a) {
    this.type = "INBAND_TRACK_ADDED";
    this.track = a
}
p(Vl, zl);
A("cast.framework.events.InbandTrackAddedEvent", Vl);

function Wl(a, b) {
    this.type = a;
    this.url = b
}
p(Wl, zl);
A("cast.framework.events.CacheItemEvent", Wl);

function Xl(a, b) {
    this.type = a;
    this.liveSeekableRange = b
}
p(Xl, zl);
A("cast.framework.events.LiveStatusEvent", Xl);
A("cast.framework.events.EndedReason", {
    END_OF_STREAM: "END_OF_STREAM",
    ERROR: "ERROR",
    STOPPED: "STOPPED",
    INTERRUPTED: "INTERRUPTED",
    SKIPPED: "SKIPPED",
    BREAK_SWITCH: "BREAK_SWITCH"
});

function Yl(a, b) {
    ec.call(this);
    this.J = b;
    this.player = a;
    this.tracks = [];
    this.A = [];
    this.h = null;
    this.o = [];
    this.F = -1;
    this.G = 1;
    this.u = new Bf(b, [], [], null);
    fc(this, Ga(gc, this.u));
    this.l = null
}
p(Yl, ec);

function Zl(a, b, c, d, e, f) {
    return 0 == a.tracks.length ? null : "VIDEO" == b ? a.tracks.find(function(a) {
        return a.type == b
    }) || null : a.tracks.find(function(a) {
        return b == a.type && (c ? c == a.name : !0) && (d ? d == a.language : !0) && (e ? e == a.trackContentType : !0) && (f ? f == a.subtype : !0)
    }) || null
}
h = Yl.prototype;
h.hc = function(a) {
    return new ae(this.G++, a)
};

function $k(a, b) {
    if (0 !== b.length) {
        b.sort(function(a, b) {
            return a.trackId - b.trackId
        });
        if (b[0].trackId <= a.F) throw Error("track id conflicts");
        for (var c = 1; c < b.length; c++)
            if (b[c].trackId == b[c - 1].trackId) throw Error("track id conflicts");
        a.tracks = a.tracks.concat(b);
        a.F = b[b.length - 1].trackId;
        a.G = Math.max(a.G, a.F + 1);
        b.find(function(a) {
            return !!a.trackContentId
        }) && Cf(a.u, b)
    }
}
h.getTracks = function(a) {
    return r(a) ? this.tracks.filter(function(b) {
        return b.type == a
    }) : this.tracks
};
h.Fa = function() {
    var a = new be;
    a.tracks = this.tracks;
    a.activeTrackIds = this.A;
    a.textTrackStyle = this.u.Nb();
    return a
};
h.Hc = function() {};
h.Oc = function() {};
h.sd = function() {};
h.Md = function() {
    return null
};

function al(a, b) {
    for (var c = null, d = n(a.tracks), e = d.next(); !e.done; e = d.next())
        if (e = e.value, "TEXT" == e.type && e.language && cast.receiver.yc(e.language, b)) {
            c = e.trackId;
            break
        }
    null == c ? F($l, "No matching track.") : Sk(a, [c])
}

function Tk(a, b) {
    for (var c = null, d = null, e = n(a.tracks), f = e.next(); !f.done; f = e.next()) f = f.value, "AUDIO" == f.type && (null == c && f.language && b && cast.receiver.yc(f.language, b) && !f.trackContentId && (c = f.trackId), null != a.h && (d = a.h));
    null === c && (c = a.Md());
    am(a, c, a.o);
    a.sd(d, c)
}

function Sk(a, b) {
    for (var c = null, d = null, e = [], f = [], g = null, k = n(a.tracks), l = k.next(); !l.done; l = k.next()) {
        l = l.value;
        if (b.includes(l.trackId))
            if ("TEXT" == l.type)
                if (l.trackContentId)
                    if (null != l.trackContentId && ab(l.trackContentId, ".ttml") || null != l.trackContentType && 0 == $a(l.trackContentType, "application/ttml+xml"))
                        if (null == g) g = l.trackId;
                        else {
                            F($l, "Can not sideload more than one TTML text track.");
                            continue
                        }
        else null != l.trackContentId && ab(l.trackContentId, ".vtt") || null != l.trackContentType && 0 == $a(l.trackContentType,
            "text/vtt") ? f.push(l.trackId) : F($l, "unsupported track type " + l.trackContentType + ", " + l.trackContentId);
        else e.push(l.trackId);
        else "AUDIO" != l.type || l.trackContentId || (c = l.trackId);
        null != a.h && (d = a.h)
    }
    Ef(a.u, f);
    a.Mh(d, c, e, g, f)
}
h.Mh = function(a, b, c, d, e) {
    1 < c.length && (F($l, "Cannot enable more than one inband tracks. Will only enable track " + c[0] + "."), c = [c[0]]);
    am(this, b, c.concat(null != d ? d : [], e));
    this.Oc(c);
    bm(this, d);
    null != b && this.sd(a, b)
};

function am(a, b, c) {
    if (null != b || c) null != b && (a.h = b), a.o = c, null != a.h ? a.A = a.o.concat(a.h) : a.A = a.o, a.A.sort()
}

function bm(a, b) {
    if (a.l || null != b) {
        if (!a.l) {
            if (!a.J) {
                E($l, "Media element is not ready yet.");
                return
            }
            var c = new cast.player.api.Host({
                url: "",
                mediaElement: a.J
            });
            a.l = new cast.player.api.Player(c)
        }
        a.l.enableCaptions(!1, "ttml");
        null != b && (c = a.tracks.find(function(a) {
            return a.trackId == b
        }), a.l.enableCaptions(!0, "ttml", c.trackContentId))
    }
}
h.rb = function(a) {
    this.u.rb(a)
};
h.Nb = function() {
    return this.u.Nb()
};
h.da = function() {
    this.l && this.l.unload();
    ec.prototype.da.call(this)
};
var $l = D("cast.framework.media.TracksManager");

function cm(a, b, c) {
    this.mediaElement = null;
    this.startTime = b;
    this.l = a;
    this.ja = new il;
    this.o = 1;
    this.$ = this.T = null;
    this.Na = !1;
    this.Ca = c || dm;
    this.h = null;
    this.ga = [];
    this.K = !1;
    this.ca = qd();
    this.F = qd();
    this.C = qd();
    this.A = qd();
    this.J = !1;
    this.Aa = null;
    this.M = this.L = void 0;
    this.eb = this.xj.bind(this);
    this.B = this.G = null
}

function em(a, b) {
    Object.keys(fm).forEach(function(c) {
        gm(a, b, c, function() {
            var b = new Jl(fm[c], a.getCurrentTimeSec());
            hm(a, b)
        })
    });
    gm(a, b, "playing", a.Yl.bind(a));
    gm(a, b, "ended", a.end.bind(a, "END_OF_STREAM"));
    gm(a, b, "pause", function() {
        var c = new Kl(a.getCurrentTimeSec(), b.ended);
        hm(a, c)
    })
}
h = cm.prototype;
h.Vc = function() {
    return 0
};

function im(a, b, c) {
    6 !== a.o && (a.o = 5, hm(a, new Hl(b, c)), a.end("ERROR"))
}
h.Yl = function() {
    4 > this.o && (this.o = 4, hm(this, new zl("CLIP_STARTED")));
    this.Xb(!1);
    jm(this)
};
h.Ah = function() {};
h.He = function() {
    return {}
};

function km(a) {
    lm(a).then(function(a) {
        Sk(a, a.A);
        a.h = a.Md()
    });
    a.Na || (a.K = !0, a.o = 3);
    a.ca.resolve()
}
h.pause = function() {
    this.mediaElement && (this.K = !0, mm(this), this.Xb(!1), this.mediaElement.pause())
};
h.play = function() {
    this.K = !1;
    this.mediaElement && this.mediaElement.play();
    jm(this)
};
h.seek = function(a, b) {
    var c = this.mediaElement;
    if (c) {
        if (this.Qa()) {
            var d = this.Ja();
            if (!d) {
                F(nm, "No seekable range available, could not seek.");
                return
            }
            a < d.start ? (F(nm, "Seek time is not available any more, jump to seek start point."), a = d.start) : a > d.end && (F(nm, "Seek time is not available yet, jump to live edge."), a = d.end)
        }
        1 > Math.abs(c.currentTime - a) ? G(nm, "ignore seek which tries to jump to too close time") : c.currentTime = a;
        r(b) && (c.paused && "PLAYBACK_START" == b ? this.play() : c.paused || "PLAYBACK_PAUSE" != b ||
            this.pause())
    } else F(nm, "could not seek while media was not loaded yet")
};
h.Ag = function() {
    return this.K ? "PAUSED" : this.isBuffering() ? "BUFFERING" : "PLAYING"
};
h.Qa = function() {
    return !1
};
h.gc = function() {};
h.isLiveDone = function() {};
h.Ja = function() {
    return null
};
h.Ra = function() {
    return null
};
h.getCurrentTimeSec = function() {
    return this.T ? this.T : this.mediaElement ? this.mediaElement.currentTime : 0
};
h.getDurationSec = function() {
    return this.C.g
};

function om(a, b) {
    if (!a.h) return null;
    b.textTrackStyle && a.h.rb(b.textTrackStyle);
    b.language ? al(a.h, b.language) : b.activeTrackIds && Sk(a.h, b.activeTrackIds);
    return a.h.Fa().activeTrackIds
}

function pm(a, b) {
    if (!a.h) return null;
    Tk(a.h, b.language);
    return a.h.Fa().activeTrackIds
}
h.Fd = function(a, b, c) {
    this.mediaElement = a;
    this.Na = b;
    em(this, a);
    this.Yd(a, b);
    a = this.h = this.Ca(this, a);
    c && (c.activeTrackIds && (a.A = c.activeTrackIds), c.textTrackStyle && a.u.rb(c.textTrackStyle), c.tracks && $k(a, c.tracks));
    b && jm(this, !0);
    return this.ca.g
};
h.Yd = function() {
    throw Error("loadContentInternal must be implemented");
};
h.Tb = function() {
    this.Fh()
};
h.Fh = function() {};
h.Eh = function() {
    return ld("NOT_SUPPORTED")
};
h.end = function(a) {
    var b = this;
    mm(this);
    this.Xb(!1);
    if (6 == this.o) return this.A.g;
    this.o = 6;
    this.Ah();
    var c = this.getCurrentTimeSec();
    this.T = c;
    this.Ed();
    this.mediaElement && qm(this, this.mediaElement);
    this.mediaElement = null;
    this.$ = this.h && this.h.Fa();
    this.h && this.h.ia();
    this.h = null;
    return this.A.g.then(function() {
        hm(b, new Sl(c, a));
        b.ja.ia()
    })
};
h.isBuffering = function() {
    return this.J
};

function lm(a) {
    return a.F.g.then(function() {
        return a.h
    })
}

function hm(a, b) {
    a.ja.dispatchEvent(b)
}

function dm(a, b) {
    return new Yl(a, b)
}

function gm(a, b, c, d) {
    yc(b, c, d);
    a.ga.push({
        type: c,
        listener: d
    })
}

function qm(a, b) {
    for (var c = n(a.ga), d = c.next(); !d.done; d = c.next()) d = d.value, Hc(b, d.type, d.listener);
    a.ga.length = 0
}
h.Ed = function() {
    var a = this.mediaElement;
    a && (a.removeAttribute("src"), a.load());
    this.A.resolve()
};
h.Xb = function(a) {
    a !== this.J && (this.J = a, hm(this, new Rl(this.J)));
    a ? !this.B && 4 <= this.o && (this.B = y()) : this.B && (Wi("Cast.CAF.Buffering", y() - this.B), this.B = null)
};

function jm(a, b) {
    b = void 0 === b ? !1 : b;
    mm(a);
    a.Aa = a.getCurrentTimeSec();
    b || void 0 !== a.L || void 0 !== a.M || (a.L = a.isLiveDone(), a.M = a.gc());
    a.G = setTimeout(a.eb, 500)
}

function mm(a) {
    null != a.G && (clearTimeout(a.G), a.G = null)
}
h.xj = function() {
    this.Xb(1E3 * (this.getCurrentTimeSec() - this.Aa) < 100 * this.mediaElement.playbackRate);
    var a = this.Ra();
    !this.L && this.isLiveDone() && a && (hm(this, new Xl("LIVE_ENDED", a)), this.L = !0);
    !this.M && this.gc() && a && (hm(this, new Xl("LIVE_IS_MOVING_WINDOW_CHANGED", a)), this.M = !0);
    jm(this)
};
var nm = D("cast.framework.media.BasePlayer"),
    fm = {
        abort: "ABORT",
        canplay: "CAN_PLAY",
        canplaythrough: "CAN_PLAY_THROUGH",
        durationchange: "DURATION_CHANGE",
        ended: "ENDED",
        emptied: "EMPTIED",
        loadeddata: "LOADED_DATA",
        loadedmetadata: "LOADED_METADATA",
        loadstart: "LOAD_START",
        play: "PLAY",
        playing: "PLAYING",
        progress: "PROGRESS",
        ratechange: "RATE_CHANGE",
        seeked: "SEEKED",
        seeking: "SEEKING",
        stalled: "STALLED",
        suspend: "SUSPEND",
        timeupdate: "TIME_UPDATE",
        waiting: "WAITING"
    };

function rm(a) {
    cm.call(this, a, 0);
    this.g = null
}
p(rm, cm);

function sm(a) {
    return new fd(function(b, c) {
        var d = new Image;
        d.onerror = c;
        d.onload = b;
        d.src = a
    })
}
h = rm.prototype;
h.Fd = function(a) {
    var b = this;
    G(tm, "loadContent");
    var c = this.l.url;
    sm(c).then(function() {
        a.style.backgroundImage = 'url("' + c.replace(/"/g, '\\"') + '")';
        b.g = a;
        G(tm, "image is set");
        b.C.resolve(0);
        b.h = b.Ca(b, a);
        b.F.resolve([]);
        b.C.g.then(function() {
            km(b)
        })
    }, function() {
        im(b, 903)
    });
    return this.ca.g
};
h.Vc = function() {
    return cast.v.common.ea.vd.Ei
};
h.Ag = function() {
    return "PAUSED"
};
h.Tb = function() {
    G(tm, "ImagePlayer does not handle preload")
};
h.play = function() {
    G(tm, "ImagePlayer does not support PLAY")
};
h.pause = function() {
    G(tm, "ImagePlayer does not support PAUSE")
};
h.seek = function() {
    G(tm, "ImagePlayer does not support SEEK")
};
h.Ed = function() {
    this.g && (this.g.style.backgroundImage = "none");
    this.A.resolve()
};
h.Xb = function() {};
var tm = D("cast.framework.media.ImagePlayer");

function um(a, b, c, d) {
    b = b.toLowerCase();
    var e = null;
    if (t(a))
        if (t(b)) {
            var f;
            if (f = d) f = !pb(Nk, d);
            f && (e = "content type(" + d + ") is not valid")
        } else e = "mimeType(" + b + ") should be string";
    else e = "Url(" + a + ") should be string";
    if (e) throw E(vm, e), Error(e);
    this.g = d || "audio_video";
    this.mimeType = b;
    this.url = a;
    this.playbackConfig = c || new Vk;
    this.hlsVideoSegmentFormat = this.hlsSegmentFormat = null
}
var vm = D("cast.framework.ContentConfig");
var wm = {
    NONE: "none",
    CLEARKEY: "clearkey",
    PLAYREADY: "playready",
    WIDEVINE: "widevine",
    AES_128: "aes_128",
    AES_128_CKP: "aes_128_ckp"
};
A("cast.framework.ContentProtection", wm);
cast.v.media.Qh = {};
cast.v.media.Qh.af = function(a) {
    switch (a.code) {
        case shaka.util.Error.Code.LOAD_INTERRUPTED:
            return 904;
        case shaka.util.Error.Code.LICENSE_REQUEST_FAILED:
            return 201;
        case shaka.util.Error.Code.NO_RECOGNIZED_KEY_SYSTEMS:
        case shaka.util.Error.Code.REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE:
            return 202;
        case shaka.util.Error.Code.NO_PERIODS:
            return 421
    }
    switch (a.category) {
        case shaka.util.Error.Category.NETWORK:
            return 321;
        case shaka.util.Error.Category.TEXT:
            return 600;
        case shaka.util.Error.Category.MEDIA:
            return 100;
        case shaka.util.Error.Category.MANIFEST:
            return 420;
        case shaka.util.Error.Category.DRM:
            return 200
    }
    return 999
};

function xm(a, b, c, d) {
    cm.call(this, a, c, d);
    var e = this;
    this.Ba = a;
    this.D = b;
    this.g = null;
    this.pa = !1;
    this.w = this.O = this.N = null;
    this.X = void 0;
    this.u = 0;
    this.ha = !1;
    this.vb = Sc(function() {
        Wi("Cast.Shaka.Bandwidth", e.g.getStats().estimatedBandwidth)
    })
}
p(xm, cm);
h = xm.prototype;
h.Vc = function() {
    return cast.v.common.ea.vd.hj
};
h.seek = function(a, b) {
    this.Qa() && (a += this.u);
    return cm.prototype.seek.call(this, a, b)
};
h.Qa = function() {
    this.X || (this.X = !!this.g && (this.g.isLive() || this.g.isInProgress()));
    return this.X
};
h.gc = function() {
    return !!this.g && !this.g.isInProgress()
};
h.isLiveDone = function() {
    return !!this.g && !this.g.isLive() && !this.g.isInProgress()
};
h.Ja = function() {
    var a = this.g.seekRange();
    return a ? new Ij(a.start, a.end) : null
};
h.He = function() {
    var a = this.g.getStats();
    return {
        height: a.height,
        estimatedBandwidth: a.estimatedBandwidth,
        streamBandwidth: a.streamBandwidth,
        width: a.width
    }
};
h.Ra = function() {
    if (!this.Qa() || !this.u) return null;
    var a = this.Ja(),
        b = this.gc(),
        c = this.isLiveDone();
    return a ? new dk(a.start - this.u, a.end - this.u, b, c) : null
};
h.getCurrentTimeSec = function() {
    var a = cm.prototype.getCurrentTimeSec.call(this);
    if (6 != this.o && this.Qa() && a) {
        if (!this.u) return 0;
        a -= this.u
    }
    return a
};
h.Yd = function(a, b) {
    var c = this;
    G(ym, "load: " + this.startTime);
    a.autoplay = b;
    this.g = new this.D.Player(a);
    this.g.addEventListener("error", function(a) {
        c.Cg(a.detail)
    });
    this.g.addEventListener("adaptation", this.Jg.bind(this));
    this.g.addEventListener("emsg", function(a) {
        hm(c, new Gl(a.detail))
    });
    zm(this);
    this.g.load(this.Ba.url, this.startTime).then(this.Xl.bind(this)).catch(this.Cg.bind(this));
    Am(this, a)
};

function zm(a) {
    for (var b = a.Ba.playbackConfig, c = n(["autoResumeNumberOfSegments", "autoPauseDuration", "licenseCustomData", "captionsRequestHandler"]), d = c.next(); !d.done; d = c.next()) d = d.value, void 0 !== b[d] && F(ym, d + " is not supported for Shakaplayer. Its value will be ignored.");
    Bm(a, b);
    Cm(a, b);
    c = qb(Dm);
    u(b.segmentRequestRetryLimit) && (c.maxAttempts = b.segmentRequestRetryLimit + 1);
    c = {
        abr: {
            defaultBandwidthEstimate: b.initialBandwidth || 2E6
        },
        drm: {
            retryParameters: Dm,
            servers: Em(b),
            advanced: {
                "com.widevine.alpha": {
                    audioRobustness: "HW_SECURE_CRYPTO",
                    videoRobustness: "HW_SECURE_ALL"
                }
            }
        },
        manifest: {
            retryParameters: Dm
        },
        streaming: {
            jumpLargeGaps: !0,
            rebufferingGoal: b.autoResumeDuration || 10,
            retryParameters: c
        }
    };
    b.shakaConfig && (G(ym, "Supplying custom Shaka configurations is not recommended. Please use cast.framework.PlaybackConfig instead."), Fm(a, c, b.shakaConfig));
    a.g.configure(c)
}

function Fm(a, b, c, d) {
    d = void 0 === d ? "" : d;
    Object.keys(c).forEach(function(e) {
        var f = d ? d + "." + e : e;
        Ca(b[e]) && Ca(c[e]) ? Fm(a, b[e], c[e], f) : (e in b && G(ym, "overriding " + f + " Shaka configuration with custom value"), b[e] = c[e])
    })
}

function Em(a) {
    var b = {},
        c = a.licenseUrl;
    a = a.protectionSystem;
    if (!c) return {};
    if (a) {
        if (!pb(wm, a)) return F(ym, a + " is not a supported protection system by Shaka player."), {};
        var d = Gm[a];
        if (!d) return {};
        b[d] = c;
        return b
    }
    for (d in Gm) b[Gm[d]] = c;
    return b
}

function Bm(a, b) {
    (b.manifestRequestHandler || b.segmentRequestHandler || b.licenseRequestHandler) && a.g.getNetworkingEngine().registerRequestFilter(function(c, d) {
        var e = {
            url: d.uris[0],
            headers: d.headers,
            content: d.body,
            withCredentials: d.allowCrossSiteCredentials
        };
        switch (c) {
            case a.D.net.NetworkingEngine.RequestType.MANIFEST:
                w(b.manifestRequestHandler) && b.manifestRequestHandler(e);
                break;
            case a.D.net.NetworkingEngine.RequestType.SEGMENT:
                w(b.segmentRequestHandler) && b.segmentRequestHandler(e);
                break;
            case a.D.net.NetworkingEngine.RequestType.LICENSE:
                w(b.licenseRequestHandler) &&
                    b.licenseRequestHandler(e)
        }
        d.uris[0] = e.url;
        d.headers = e.headers;
        d.body = e.content;
        d.allowCrossSiteCredentials = e.withCredentials
    })
}

function Cm(a, b) {
    var c = a.g.getNetworkingEngine(),
        d = a.D.net.NetworkingEngine.RequestType;
    c.registerResponseFilter(function(c, f) {
        var e = f.data,
            k;
        switch (c) {
            case d.MANIFEST:
                w(b.manifestHandler) && e && (k = Promise.resolve(b.manifestHandler(String.fromCharCode.apply(String, pa(new Uint16Array((new Uint16Array(new Uint8Array(e))).buffer))))).then(function(a) {
                    for (var b = new ArrayBuffer(2 * a.length), c = new Uint16Array(b), d = 0; d < a.length; d++) c[d] = a.charCodeAt(d);
                    f.data = (new Uint8Array(new Uint16Array(b))).buffer
                }));
                break;
            case d.SEGMENT:
                a.vb();
                w(b.segmentHandler) && (k = Promise.resolve(b.segmentHandler(new Uint8Array(e))).then(function(a) {
                    f.data = a.buffer
                }));
                hm(a, new Tl(f.timeMs, e.byteLength));
                break;
            case d.LICENSE:
                w(b.licenseHandler) && e && (k = Promise.resolve(b.licenseHandler(new Uint8Array(e))).then(function(a) {
                    f.data = a.buffer
                }))
        }
        return k
    })
}
h.Cg = function(a) {
    if (a && a.code) {
        E(ym, "category: " + a.category + " code: " + a.code);
        var b = a.code,
            c = {
                shakaErrorCode: b,
                shakaErrorData: a.data
            };
        im(this, cast.v.media.Qh.af(a), c);
        Wi("Cast.Shaka.Error", b)
    } else E(ym, JSON.stringify(a))
};
h.Jg = function() {
    var a = this.V;
    this.V = this.g.getVariantTracks().reduce(function(a, c) {
        return c.active ? a + c.bandwidth : a
    }, 0);
    a !== this.V && hm(this, new Fl(this.V))
};
h.Xb = function(a) {
    cm.prototype.Xb.call(this, a);
    this.isBuffering() && this.w && (this.Dg(), this.N = y(), Wi("Cast.Shaka.PlayTimeBeforeAutoPause", y() - this.w), this.w = null)
};

function Am(a, b) {
    gm(a, b, "loadedmetadata", a.Aj.bind(a, b));
    gm(a, b, "pause", a.Dg.bind(a));
    gm(a, b, "play", a.Bj.bind(a));
    gm(a, b, "playing", a.pm.bind(a))
}
h.Aj = function(a) {
    this.F.resolve(this.h.Hc());
    this.h.D = this.Jg.bind(this);
    a = a.duration;
    this.Qa() && (a = -1, r(this.startTime) && (this.ha = !0));
    this.C.resolve(a);
    Wi("Cast.Shaka.MediaDuration", a);
    km(this)
};

function Hm(a) {
    var b = {};
    a = n(a.g.getVariantTracks());
    for (var c = a.next(); !c.done; c = a.next()) {
        c = c.value;
        var d = void 0;
        c.videoId ? d = "video" : c.audioId && (d = "audio");
        b[d] || (b[d] = []);
        b[d].push(c.bandwidth)
    }
    return b
}
h.Xl = function() {
    Zi("Cast.Shaka.Load");
    Xi("Cast.Shaka.Live", this.g.isLive());
    this.g.getVariantTracks().forEach(function(a) {
        a.codecs && Yi(a.codecs);
        a.mimeType && Wi("Cast.Shaka.MimeType", Ti[a.mimeType] || 0)
    });
    for (var a = Hm(this), b = n(["audio", "video"]), c = b.next(); !c.done; c = b.next()) c = c.value, a[c] && Vi(a[c], c + "/*")
};
h.Dg = function() {
    Zi("Cast.Shaka.Pause")
};
h.Bj = function() {
    this.O = y();
    this.u || (this.u = this.g.seekRange().start);
    if (this.ha) {
        var a = this.startTime + this.u,
            b = this.g.seekRange();
        a < b.start ? (F(ym, "Start time is out of seek range, jump to the seek start point."), a = b.start) : a > b.end && (F(ym, "Start time is out of seek range, jump to live."), a = b.end);
        this.mediaElement.currentTime = a;
        this.ha = !1
    }
};
h.pm = function() {
    Zi("Cast.Shaka.Playing");
    this.w = y();
    this.N && (Wi("Cast.Shaka.AutoPauseTime", this.w - this.N), this.N = null);
    if (this.O) {
        var a = this.w - this.O;
        this.pa ? Wi("Cast.Shaka.PlayLatency", a) : (Wi("Cast.Shaka.AutoplayStartupLatency", a), this.pa = !0);
        this.O = null
    }
};
h.Ah = function() {
    Zi("Cast.Shaka.Ended")
};
h.Ed = function() {
    var a = this;
    this.g ? this.g.destroy().then(function() {
        a.A.resolve()
    }) : this.A.resolve()
};

function Im(a, b, c) {
    return cast.v.common.xc.Ph.then(function() {
        return new xm(a, shaka, b, c)
    })
}
var ym = D("cast.framework.media.ShakaPlayer"),
    Dm = {
        maxAttempts: 4,
        baseDelay: 400,
        backoffFactor: 2
    },
    Jm = {},
    Gm = (Jm.clearkey = "org.w3.clearkey", Jm.playready = "com.chromecast.playready", Jm.widevine = "com.widevine.alpha", Jm);

function Km(a, b) {
    Yl.call(this, a, b);
    this.g = a.g;
    this.B = new Map;
    this.D = null
}
p(Km, Yl);

function Lm(a, b) {
    return new Km(a, b)
}
h = Km.prototype;
h.Hc = function() {
    var a = Mm(this.g.getVariantTracks()),
        b = this.g.getTextTracks(),
        c = [];
    c = c.concat(a);
    c = c.concat(b);
    a = n(c);
    for (b = a.next(); !b.done; b = a.next()) {
        b = b.value;
        var d = "variant" === b.type ? "AUDIO" : b.type.toUpperCase();
        c = "variant" === b.type ? b.audioCodec ? b.audioCodec : void 0 : b.mimeType ? b.mimeType : void 0;
        var e = b.kind ? b.kind.toUpperCase() : void 0,
            f = Zl(this, d, void 0, b.language, c, e);
        f ? d = f : (d = this.hc(d), d.language = b.language, d.trackContentType = c, d.subtype = e, $k(this, [d]));
        "AUDIO" == d.type ? this.B.set(d.trackId,
            b.audioId) : this.B.set(d.trackId, b.id)
    }
};

function Mm(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c].audioId] || (b[a[c].audioId] = a[c].id);
    var d = [],
        e;
    for (e in b) b.hasOwnProperty(e) && d.push(b[e]);
    return a.filter(function(a) {
        return d.includes(a.id)
    })
}
h.Oc = function(a) {
    var b = this;
    if (a && 0 !== a.length) {
        a = a.map(function(a) {
            return b.B.get(a)
        });
        for (var c = n(this.g.getTextTracks()), d = c.next(); !d.done; d = c.next()) d = d.value, a.includes(d.id) && this.g.selectTextTrack(d);
        this.g.setTextTrackVisibility(!0)
    } else this.g.setTextTrackVisibility(!1)
};
h.sd = function(a, b) {
    if (null !== b) {
        var c = null;
        null === a || (c = this.B.get(a));
        var d = this.B.get(b);
        if (c !== d) {
            a = this.g.getVariantTracks();
            var e = a.find(function(a) {
                return a.active
            }).videoId;
            (a = a.find(function(a) {
                return a.audioId === d && a.videoId === e
            })) ? (a.language ? this.g.selectAudioLanguage(a.language) : (this.g.configure({
                abr: {
                    enabled: !1
                }
            }), this.g.selectVariantTrack(a, !0)), this.D && this.D()) : E(Nm, "cannot find matching shaka variant track")
        }
    }
};
h.Md = function() {
    for (var a = -1, b = n(Mm(this.g.getVariantTracks())), c = b.next(); !c.done; c = b.next())
        if (c = c.value, c.primary) {
            a = c.audioId;
            break
        }
    b = null;
    c = n(this.B);
    for (var d = c.next(); !d.done; d = c.next()) {
        d = n(d.value);
        var e = d.next().value;
        if (d.next().value === a) {
            b = e;
            break
        }
    }
    0 > b && E(Nm, "cannot find default shaka audio track");
    return b
};
h.da = function() {
    this.D = null;
    Yl.prototype.da.call(this)
};
var Nm = D("cast.framework.media.ShakaTracksManager");

function Om(a, b, c) {
    cm.call(this, a, b, c)
}
p(Om, cm);
Om.prototype.Yd = function(a, b) {
    G(Pm, "loadContent: autoplay = " + b + ", initial_time = " + this.startTime);
    Qm(this, a);
    a.src = this.l.url;
    a.currentTime = this.startTime || 0;
    a.autoplay = b
};

function Qm(a, b) {
    gm(a, b, "loadedmetadata", a.g.bind(a, b));
    gm(a, b, "error", function() {
        im(a, Ud(b.error))
    })
}
Om.prototype.g = function(a) {
    this.F.resolve(this.h.Hc(this.l));
    km(this);
    this.C.resolve(a.duration)
};
Om.prototype.Vc = function() {
    return cast.v.common.ea.vd.jj
};
var Pm = D("cast.framework.media.SimplePlayer");

function Rm(a) {
    Yl.apply(this, arguments)
}
p(Rm, Yl);

function Sm(a, b) {
    return new Rm(a, b)
}
Rm.prototype.Hc = function(a) {
    a = "audio_only" == a.g ? "AUDIO" : "VIDEO";
    Zl(this, a) || (a = this.hc(a), $k(this, [a]))
};
cast.v.media.La = {};
cast.v.media.La.Rj = function(a) {
    var b = a.getStreamCount(),
        c = 0;
    da();
    fa();
    var d = {};
    return d[Symbol.iterator] = function() {
        return {
            next: function() {
                return c < b ? {
                    done: !1,
                    value: a.getStreamInfo(c++)
                } : {
                    done: !0
                }
            }
        }
    }, d
};
cast.v.media.La.af = function(a) {
    switch (a) {
        case cast.player.api.ErrorCode.PLAYBACK:
            return 100;
        case cast.player.api.ErrorCode.MEDIAKEYS:
            return 200;
        case cast.player.api.ErrorCode.NETWORK:
            return 300;
        case cast.player.api.ErrorCode.MANIFEST:
            return 400;
        default:
            return Ka("Cannot reach"), 999
    }
};
cast.v.media.La.Sg = function(a) {
    switch (a) {
        case "aac":
            return cast.player.api.HlsSegmentFormat.MPEG_AUDIO_ES;
        case "ac3":
            return cast.player.api.HlsSegmentFormat.PACKED_AUDIO_AC3;
        case "mp3":
            return cast.player.api.HlsSegmentFormat.MPEG_LAYER_3;
        case "ts":
            return cast.player.api.HlsSegmentFormat.MPEG2_TS;
        case "ts_aac":
            return cast.player.api.HlsSegmentFormat.TS_AAC;
        case "e_ac3":
            return cast.player.api.HlsSegmentFormat.PACKED_AUDIO_E_AC3;
        case "fmp4":
            return cast.player.api.HlsSegmentFormat.FMP4
    }
};
cast.v.media.La.Tg = function(a) {
    switch (a) {
        case "mpeg2_ts":
            return cast.player.api.HlsVideoSegmentFormat.MPEG2_TS;
        case "fmp4":
            return cast.player.api.HlsVideoSegmentFormat.FMP4
    }
};
cast.v.media.La.cl = function(a) {
    switch (a) {
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
            return cast.player.api.StreamingProtocolType.HLS;
        case "application/vnd.ms-sstr+xml":
            return cast.player.api.StreamingProtocolType.SMOOTH_STREAMING;
        case "application/dash+xml":
            return cast.player.api.StreamingProtocolType.MPEG_DASH;
        default:
            Ka("Not supported mimeType " + a)
    }
    return cast.player.api.StreamingProtocolType.UNKNOWN
};

function Tm() {
    this.g = Um;
    this.l = Vm;
    this.h = Wm
}

function Um(a) {
    return new cast.player.api.Host({
        mediaElement: null,
        url: a
    })
}

function Vm(a, b, c, d) {
    switch (a) {
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
        case "audio/mpegurl":
        case "audio/x-mpegurl":
            return cast.player.api.CreateHlsStreamingProtocol(d, cast.v.media.La.Sg(b), cast.v.media.La.Tg(c));
        case "application/vnd.ms-sstr+xml":
            return cast.player.api.CreateSmoothStreamingProtocol(d);
        case "application/dash+xml":
            return cast.player.api.CreateDashStreamingProtocol(d);
        default:
            return Ka("Unsupported mimetype: " + a), cast.player.api.CreateHlsStreamingProtocol(d)
    }
}

function Wm(a) {
    return new cast.player.api.Player(a)
};

function Xm(a, b, c, d) {
    cm.call(this, a, c, d);
    this.N = b
}
p(Xm, cm);

function Ym(a) {
    a.w || (a.u = a.N.g(a.l.url), Zm(a.u, a.l.playbackConfig), a.u.onError = a.$l.bind(a), a.u.onManifestReady = a.Ul.bind(a), a.u.processMetadata = function(b, c, d) {
        "EMSG" === b ? hm(a, new Gl({
            segmentData: c,
            startTime: d
        })) : "ID3" === b ? hm(a, new Il(c, d)) : F($m, "MPL metadata event of type " + b + " was ignored.")
    }, a.u.trackBandwidth = a.Dj.bind(a), a.u.getQualityLevel = a.$k.bind(a), a.g = a.N.l(a.l.mimeType, a.l.hlsSegmentFormat, a.l.hlsVideoSegmentFormat, a.u), a.w = a.N.h(a.u))
}
h = Xm.prototype;
h.Vc = function() {
    return cast.v.common.ea.vd.kj
};
h.Yd = function(a, b) {
    G($m, "load: " + this.startTime);
    Ym(this);
    this.u.mediaElement = a;
    a.autoplay = b;
    2 == this.o ? this.w.load() : this.w.load(this.g, this.startTime);
    gm(this, a, "loadedmetadata", this.Cj.bind(this, a))
};
h.Fh = function() {
    Ym(this);
    this.w.preload(this.g, this.startTime);
    this.o = 2
};
h.Eh = function() {
    var a = new cast.player.api.ContentCacheHost({
        url: this.l.url,
        initialTime: this.startTime,
        protocolType: cast.v.media.La.cl(this.l.mimeType),
        hlsSegmentFormat: cast.v.media.La.Sg(this.l.hlsSegmentFormat),
        hlsVideoSegmentFormat: cast.v.media.La.Tg(this.l.hlsVideoSegmentFormat)
    });
    Zm(a, this.l.playbackConfig);
    var b = new cast.player.api.ContentCache;
    return H(b.load([a]))
};
h.$l = function(a) {
    a = cast.v.media.La.af(a);
    im(this, a)
};
h.Ul = function() {};
h.Dj = function(a, b, c) {
    hm(this, new Tl(b, c))
};
h.He = function() {
    return {
        streamBandwidth: this.D
    }
};
h.$k = function(a, b) {
    for (var c = this.D, d = 0, e = 0; e < this.g.getStreamCount(); e++)
        if (this.g.isStreamEnabled(e) && !Rd(this.g.getStreamInfo(e).mimeType)) {
            var f = e === a ? b : this.g.getQualityLevel(e);
            if (0 > f) return b;
            d += this.g.getStreamInfo(e).bitrates[f]
        }
    this.D = d;
    c !== this.D && hm(this, new Fl(this.D));
    return b
};
h.Qa = function() {
    return this.g.isLiveStream && this.g.isLiveStream()
};
h.gc = function() {
    return this.g.isLiveSeekableRangeMovingWindow && this.g.isLiveSeekableRangeMovingWindow()
};
h.isLiveDone = function() {
    return this.g.isLiveDone && this.g.isLiveDone()
};
h.Ja = function() {
    var a = this.w.getState(cast.player.api.Player.State.SEEKABLE);
    return a && a.seekable ? new Ij(a.seekable.start, a.seekable.end) : null
};
h.Ra = function() {
    if (!this.Qa()) return null;
    var a = this.Ja(),
        b = this.gc(),
        c = this.isLiveDone();
    return a ? new dk(a.start, a.end, b, c) : null
};
h.Cj = function() {
    this.C.resolve(this.w.getStreamingProtocol().getDuration());
    this.F.resolve(this.h.Hc());
    if (this.Qa() && !r(this.startTime)) {
        var a = this.Ja();
        a && a.end && this.seek(a.end)
    }
    km(this)
};
h.play = function() {
    if (this.Qa()) {
        var a = this.Ja(),
            b = this.getCurrentTimeSec();
        b > a.end ? b = a.end : b < a.start && (b = a.start);
        this.mediaElement.currentTime = b
    }
    cm.prototype.play.call(this)
};
h.Ed = function() {
    this.w.unload();
    this.A.resolve()
};

function Zm(a, b) {
    null != b.initialBandwidth && (a.initialBandwidth = b.initialBandwidth);
    null != b.autoResumeDuration && (a.autoResumeDuration = b.autoResumeDuration);
    null != b.autoResumeNumberOfSegments && (a.autoResumeNumberOfSegments = b.autoResumeNumberOfSegments);
    null != b.autoPauseDuration && (a.autoPauseDuration = b.autoPauseDuration);
    null != b.segmentRequestRetryLimit && (a.segmentRequestRetryLimit = b.segmentRequestRetryLimit);
    null != b.licenseUrl && (a.licenseUrl = b.licenseUrl);
    null != b.protectionSystem && (a.protectionSystem =
        b.protectionSystem);
    null != b.licenseCustomData && (a.licenseCustomData = b.licenseCustomData);
    null != b.manifestRequestHandler && (a.updateManifestRequestInfo = b.manifestRequestHandler);
    null != b.segmentRequestHandler && (a.updateSegmentRequestInfo = function(a) {
        b.segmentRequestHandler(a)
    });
    null != b.licenseRequestHandler && (a.updateLicenseRequestInfo = b.licenseRequestHandler);
    null != b.captionsRequestHandler && (a.updateCaptionsRequestInfo = b.captionsRequestHandler);
    null != b.manifestHandler && (a.processManifest = b.manifestHandler);
    null != b.segmentHandler && (a.processSegment = function(a, d) {
        b.segmentHandler(d)
    });
    null != b.licenseHandler && (a.processLicense = b.licenseHandler);
    null != b.disableSourceBufferTimeAdjust && (a.disableSourceBufferTimeAdjust = b.disableSourceBufferTimeAdjust)
}

function an(a, b, c) {
    return cast.v.common.xc.Mf.then(function() {
        return new Xm(a, new Tm, b, c)
    })
}
var $m = D("cast.framework.media.StreamingPlayer");

function bn(a, b) {
    Yl.call(this, a, b);
    this.l = this.g = a.w;
    this.D = a.g;
    this.B = new Map
}
p(bn, Yl);

function cn(a, b) {
    return new bn(a, b)
}
h = bn.prototype;
h.Hc = function() {
    var a = cast.v.media.La.Rj(this.D),
        b = 0;
    a = n(a);
    for (var c = a.next(); !c.done; c = a.next()) {
        c = c.value;
        var d = c.mimeType;
        if (d) {
            var e = dn(d, c.codecs);
            if (e) {
                "TEXT" == e && (d = en(d, c.codecs));
                var f = Zl(this, e, c.name, c.language, d);
                f ? e = f : (e = this.hc(e), e.name = c.name, e.language = c.language, e.trackContentType = d, $k(this, [e]));
                this.B.set(e.trackId, b);
                b++
            }
        }
    }
};

function dn(a, b) {
    a = a.toLowerCase();
    if (Rd(a) || "application/mp4" == a && "stpp" == b) return "TEXT";
    switch (a.split("/")[0]) {
        case "video":
            return "VIDEO";
        case "audio":
            return "AUDIO";
        default:
            return null
    }
}

function en(a, b) {
    a = a.toLowerCase();
    if (pb(qk, a)) return a;
    if ("text/mp2t" == a) return "text/cea608";
    b = b ? b.toLowerCase() : null;
    switch (b) {
        case "ttml":
            return "application/ttml+xml";
        case "webvtt":
            return "text/vtt"
    }
    F(fn, "cannot guess text mime type. Defaults to VTT");
    return "text/vtt"
}
h.sd = function(a, b) {
    var c = -1,
        d = -1,
        e = this.D;
    null != a ? -1 < a && (c = this.B.get(a)) : c = e.getDefaultAudioStreamIndex();
    null != b ? -1 < b && (d = this.B.get(b)) : d = e.getDefaultAudioStreamIndex();
    c != d && (e.enableStream(c, !1), e.enableStream(d, !0), this.g.onAudioChanged())
};
h.Md = function() {
    for (var a = this.D.getDefaultAudioStreamIndex(), b = null, c = n(this.B), d = c.next(); !d.done; d = c.next()) {
        d = n(d.value);
        var e = d.next().value;
        if (d.next().value === a) {
            b = e;
            break
        }
    }
    return b
};
h.Mh = function(a, b, c, d, e) {
    1 < c.length + (null == d ? 0 : 1) && (F(fn, "Can only enable one track. Will enable track " + c[0]), c = [c[0]], d = null);
    am(this, b, c.concat(null != d ? d : [], e));
    null == d ? (bm(this, d), this.Oc(c)) : (this.Oc(c), bm(this, d));
    null != b && this.sd(a, b)
};
h.Oc = function(a) {
    var b = 0 == a.length ? null : a[0];
    a = null != b ? this.B.get(b) : void 0;
    for (var c = !1, d = this.D, e = d.getStreamCount(), f = void 0 === a, g = 0; g < e; g++) {
        var k = d.getStreamInfo(g).mimeType;
        k && Rd(k) && (g == a ? "text/mp2t" == k ? this.g.enableCaptions(!0, cast.player.api.CaptionsType.CEA608) : (f = !0, d.isStreamEnabled(g) || (d.enableStream(g, !0), c = !0)) : g !== a && d.isStreamEnabled(g) && (d.enableStream(g, !1), c = !0))
    }
    null != b && void 0 == a && this.tracks.find(function(a) {
        return a.trackId == b && "text/cea608" == a.trackContentType
    }) ? this.g.enableCaptions(!0,
        cast.player.api.CaptionsType.CEA608) : f && this.g.enableCaptions(!1, cast.player.api.CaptionsType.CEA608);
    c && this.g.enableCaptions(!0)
};
var fn = D("cast.framework.media.StreamingTracksManager");

function gn(a, b) {
    var c = a.mimeType.toLowerCase();
    switch (c) {
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
        case "audio/mpegurl":
        case "audio/x-mpegurl":
        case "application/vnd.ms-sstr+xml":
        case "application/dash+xml":
            var d = an,
                e = cn;
            cast.v.common.xc.bi && "application/dash+xml" == c && (d = Im, e = Lm);
            return d(a, b, e)
    }
    return c.startsWith("image/") ? H(new rm(a)) : H(new Om(a, b, Sm))
};
cast.v.breaks = {};

function hn(a, b, c) {
    this.seekFrom = a;
    this.seekTo = b;
    this.breaks = c
}
A("cast.framework.breaks.BreakSeekData", hn);

function jn(a) {
    this.break = a
}
A("cast.framework.breaks.BreakClipLoadInterceptorContext", jn);

function R() {}
A("cast.framework.breaks.BreakManager", R);
R.prototype.N = function() {};
R.prototype.reset = function() {};
R.prototype.pc = function() {};
R.prototype.getBreaks = R.prototype.pc;
R.prototype.Qc = function() {};
R.prototype.getBreakById = R.prototype.Qc;
R.prototype.oc = function() {};
R.prototype.getBreakClips = R.prototype.oc;
R.prototype.Ya = function() {};
R.prototype.getBreakClipById = R.prototype.Ya;
R.prototype.M = function() {};
R.prototype.Yf = function() {};
R.prototype.setBreakSeekInterceptor = R.prototype.Yf;
R.prototype.J = function() {};
R.prototype.L = function() {};
R.prototype.Xf = function() {};
R.prototype.setBreakClipLoadInterceptor = R.prototype.Xf;
R.prototype.G = function() {};
R.prototype.Ec = function() {};
R.prototype.setPlayWatchedBreak = R.prototype.Ec;
R.prototype.sc = function() {};
R.prototype.getPlayWatchedBreak = R.prototype.sc;
R.prototype.Fc = function() {};
R.prototype.setVastTrackingInterceptor = R.prototype.Fc;
R.prototype.qb = function() {};
R.prototype.K = function() {};
R.prototype.B = function() {};
cast.v.ua = {};

function kn(a, b, c) {
    this.h = a;
    this.l = b;
    this.g = c
}

function ln(a, b) {
    b.breakId = a.h.id;
    b.breakClipId = a.g.id;
    a = a.g.whenSkippable;
    u(a) && (b.whenSkippable = a)
};

function mn(a, b, c, d) {
    c = void 0 === c ? [] : c;
    d = void 0 === d ? [] : d;
    this.g = [];
    this.h = new Map;
    this.w = new Map;
    this.isEmbedded = a;
    this.u = b;
    this.ja = new il;
    this.C = 0;
    this.o = !1;
    nn(this, d);
    on(this, c)
}

function nn(a, b) {
    b.forEach(function(b) {
        pn(a, b) && a.h.set(b.id, b)
    })
}

function on(a, b) {
    b.forEach(function(b) {
        a: {
            if (qn(a, b))
                if (0 > b.position) 0 == a.g.length || 0 <= a.g[a.g.length - 1].position ? a.g.push(b) : a.g[a.g.length - 1].breakClipIds.push.apply(a.g[a.g.length - 1].breakClipIds, pa(b.breakClipIds));
                else {
                    for (var c = 0; c < a.g.length; c++) {
                        var e = a.g[c];
                        if (e.position == b.position) {
                            e.breakClipIds.push.apply(e.breakClipIds, pa(b.breakClipIds));
                            b = void 0;
                            break a
                        }
                        if (e.position > b.position || 0 > e.position) {
                            a.g.splice(c, 0, b);
                            b = void 0;
                            break a
                        }
                    }
                    a.g.push(b)
                }
            b = void 0
        }
        return b
    })
}

function pn(a, b) {
    return b.id ? a.isEmbedded && (!u(b.duration) || 0 >= b.duration) ? (E(rn, "Break Clip with invalid duation is ignored"), !1) : a.h.has(b.id) ? (F(rn, "Duplicate break clip id, " + b.id + ", clip is ignored"), !1) : !0 : (E(rn, "Break Clip with no clip id is ignored"), !1)
}

function qn(a, b) {
    if (!b.id) return E(rn, "Break with no clip is ignored"), !1;
    if (a.isEmbedded && !b.isEmbedded) return E(rn, "Stitched break is ignored in embedded timeline"), !1;
    if (!a.isEmbedded && b.isEmbedded) return E(rn, "Embedded break is ignored in stitched timeline"), !1;
    if (!u(b.position)) return E(rn, "Break with no position is ignored."), !1;
    if (0 > b.position && b.isEmbedded) return E(rn, "Break with negative position is ignored."), !1;
    var c = b.breakClipIds || [],
        d = c.filter(function(b) {
            return a.h.has(b)
        });
    d.length <
        c.length && (F(rn, "Unknown clip id in break is ignored."), b.breakClipIds = d);
    return 0 == d.length ? (E(rn, "Break with no break clips is ignored."), !1) : !0
}

function sn(a, b, c, d) {
    var e = [];
    d.forEach(function(b) {
        if (!b.id) {
            for (; a.h.has("GENERATED:" + a.C);) a.C++;
            b.id = "GENERATED:" + a.C
        }
        a.h.has(b.id) ? a.h.get(b.id) !== b && F(rn, "BreakClip with existing id is ignored. BreakClip id = " + b.id) : pn(a, b) && a.h.set(b.id, b);
        e.push(b.id)
    });
    b.breakClipIds.splice.apply(b.breakClipIds, [c, 1].concat(pa(e)))
}
h = mn.prototype;
h.Ya = function(a) {
    return this.h.get(a)
};
h.oc = function() {
    return Array.from(this.h.values())
};
h.Qc = function(a) {
    return this.g.find(function(b) {
        return a == b.id
    }) || null
};
h.Qe = function() {
    Ka("Should be implemented")
};
h.Od = function() {
    Ka("Should be implemented")
};
h.$e = function() {
    Ka("Should be implemented")
};

function tn(a, b) {
    b.isWatched || (a.o = !0);
    b.isWatched = !0;
    a.w.has(b.id) && (a.w.get(b.id).forEach(function(a) {
        a.isWatched = !0
    }), a.w.delete(b.id))
}
var rn = D("cast.framework.timeline.Timeline");

function un(a, b, c, d, e) {
    this.Aa = a;
    this.Ba = b.contentUrl || b.contentId;
    this.B = c;
    this.Ca = e;
    this.ja = new il;
    this.g = this.mediaElement = null;
    this.ua = d;
    this.h = null;
    this.L = this.isPlayingBreak = !1;
    this.O = this.M = this.T = v;
    this.u = 1;
    this.$ = qd();
    this.$.g.then(this.Tl.bind(this));
    this.pa = qd();
    this.F = NaN;
    a = new be;
    b.tracks && (a.tracks = cast.v.I.Yh(b.tracks));
    b.textTrackStyle && (a.textTrackStyle = cast.v.I.Xh(b.textTrackStyle));
    this.A = a;
    this.J = qd();
    this.ha = !1;
    this.N = this.ca = null;
    this.ja.addEventListener("BREAK_STARTED", this.Zm,
        this);
    this.ja.addEventListener("BREAK_ENDED", this.Ym, this);
    this.ja.addEventListener("CLIP_STARTED", this.an, this);
    this.ja.addEventListener("CLIP_ENDED", this.$m, this)
}
h = un.prototype;
h.Zm = function() {
    null != this.ca && Wi("Cast.CAF.VideoToAdLatency", y() - this.ca)
};
h.Ym = function() {
    this.N = y()
};
h.an = function() {
    null != this.N && (Wi("Cast.CAF.AdToVideoLatency", y() - this.N), this.N = null)
};
h.$m = function() {
    this.ca = y()
};
h.load = function() {};
h.reset = function(a) {
    G(vn, "reset()");
    this.end(a && cast.v.media.ti[a] || "STOPPED")
};
h.getVolume = function() {
    var a = new Yd;
    a.level = this.mediaElement.volume;
    a.muted = this.mediaElement.muted;
    return a
};
h.setVolume = function(a) {
    r(a.level) && (this.mediaElement.volume = a.level);
    r(a.muted) && (this.mediaElement.muted = a.muted)
};
h.getDurationSec = function() {
    return u(this.F) ? this.F : Infinity
};
h.getCurrentTimeSec = function() {
    return this.Nd()
};
h.editTracksInfo = function(a) {
    return om(this.g, a)
};
h.registerErrorCallback = function(a) {
    this.M = a
};
h.registerEndedCallback = function(a) {
    this.O = a
};
h.registerLoadCallback = function(a) {
    this.T = a
};
h.unregisterErrorCallback = function() {
    this.M = v
};
h.unregisterEndedCallback = function() {
    this.O = v
};
h.unregisterLoadCallback = function() {
    this.T = v
};
h.pause = function() {
    G(vn, "pause");
    this.g.pause()
};
h.play = function() {
    G(vn, "play");
    this.g.play()
};

function wn(a) {
    if (!a.h) return !1;
    var b = a.h.g.whenSkippable;
    a = a.xb();
    return u(b) && Number(b) <= a
}
h.cg = function() {
    Ka("Not implemented")
};
h.Vf = function() {
    Ka("Not implemented")
};
h.seek = function(a, b) {
    this.isPlayingBreak ? F(vn, "seek request during break was ignored.") : (0 > a && (G(vn, "Invalid seek value - " + a), a = 0), this.Vf(a, b))
};
h.getState = function() {
    switch (this.u) {
        case 1:
        case 2:
            return "BUFFERING";
        case 3:
        case 4:
            return this.g ? cast.v.I.Wm(this.g.Ag()) : "PLAYING";
        case 5:
        case 6:
            return "IDLE";
        default:
            return Ka(), "IDLE"
    }
};
h.Ra = function() {
    return this.g ? this.g.Ra() : null
};
h.Ja = function() {
    return this.g ? this.g.Ja() : null
};

function xn(a) {
    return a.g ? a.g.He() : {}
}

function yn(a, b, c, d, e, f) {
    a.mediaElement = b;
    a.A.activeTrackIds = e || a.A.activeTrackIds;
    return a.vf(c, d).then(function() {
        3 > a.u && (a.u = 3);
        a.Yb(f);
        return a.pa.g
    })
}
h.Tb = function(a) {
    this.Nf(a)
};
h.Kd = function() {
    return this.h ? this.h.g.duration || null : null
};
h.xb = function() {
    return this.h ? this.ua.$e(this.Za()) : null
};
h.Za = function() {
    return this.g ? this.g.getCurrentTimeSec() : 0
};
h.Nd = function() {
    var a = this.Za();
    return this.ua.Od(a)
};
h.Xd = function() {
    if (!this.mediaElement) return !1;
    var a = this.mediaElement.buffered;
    if (1 > a.length) return !1;
    var b = a.length - 1,
        c = a.start(b);
    a = a.end(b);
    return c <= this.Za() && a >= this.mediaElement.duration
};

function zn(a, b) {
    a.g && a.g.Qa() && (b.startAbsoluteTime || (a = (a = a.g.Ra()) ? a.end : 0, b.startAbsoluteTime = y() / 1E3 - a), b.metadata && (0 == b.metadata.sectionStartTimeInMedia || b.metadata.sectionStartTimeInMedia ? b.metadata.sectionStartAbsoluteTime = b.metadata.sectionStartTimeInMedia + b.startAbsoluteTime : b.metadata.sectionStartAbsoluteTime ? b.metadata.sectionStartTimeInMedia = b.metadata.sectionStartAbsoluteTime - b.startAbsoluteTime : b.metadata.sectionDuration && (b.metadata.sectionStartTimeInMedia = 0, b.metadata.sectionStartAbsoluteTime =
        b.startAbsoluteTime)))
}
h.end = function(a) {
    var b = this;
    if (6 == this.u) return this.J.g;
    r(this.D) || (this.D = this.getCurrentTimeSec());
    var c = this.u;
    this.u = 6;
    this.M = v;
    this.Bg(a);
    return this.J.g.then(function() {
        "END_OF_STREAM" == a && b.O();
        b.isPlayingBreak && An(b, "BREAK_ENDED");
        5 > c && b.ja.dispatchEvent(new Ml(b.D, a));
        b.ja.ia()
    })
};
h.Bg = function(a) {
    var b = this;
    G(vn, "endInternal()");
    this.g ? (this.g.end(a).then(function() {
        b.J.resolve()
    }), this.g = null) : this.J.resolve()
};
h.vf = function() {
    Ka("This should be implemented");
    return ld()
};
h.Nf = function() {};

function Bn(a, b, c, d) {
    var e = b.h,
        f = b.g;
    b = b.l + 1;
    var g = e.breakClipIds.length,
        k = f.whenSkippable,
        l = a.xb() || 0;
    "BREAK_CLIP_ENDED" == c && (l = r(a.D) ? a.D : l);
    a.ja.dispatchEvent(new Ql(c, l, b, g, k, d, f.id, e.id))
}

function Cn(a) {
    a.u = 4;
    "PAUSED" == a.getState() && Dn(a)
}

function An(a, b, c, d) {
    c = void 0 === c ? null : c;
    var e = c != a.h,
        f = !1;
    a.h && e && Bn(a, a.h, "BREAK_CLIP_ENDED", d);
    a.h && "BREAK_ENDED" == b && (Bn(a, a.h, b), f = !0, a.isPlayingBreak = !1, a.L = !1);
    if (a.h = c) Wi("Cast.CAF.AdMimeType", Ti[a.h.g.contentType] || 0), d = a.h.g, f = d.whenSkippable, Xi("Cast.CAF.AdSkippable", null != f && f < d.duration), a.isPlayingBreak || (Bn(a, c, "BREAK_STARTED"), a.isPlayingBreak = !0, a.L = wn(a), d = c.h, tn(a.ua, d)), e && "BREAK_CLIP_STARTED" == b && Bn(a, c, "BREAK_CLIP_LOADING"), Bn(a, c, b), f = !0;
    f && Dn(a)
}

function Dn(a) {
    var b = a.ha || a.ua.o;
    a.Ca(b);
    b && (a.ua.o = !1, a.ha = !1)
}

function En(a, b, c) {
    a.g.ja.addEventListener(b, c, a)
}

function Fn(a) {
    a.g.ja.se(a.ja);
    En(a, "ERROR", a.be);
    En(a, "TIME_UPDATE", a.jd)
}
h.be = function() {
    G(vn, "player event: error");
    this.M(Error())
};
h.jd = function() {
    var a = wn(this);
    a != this.L && (this.L = a, Dn(this))
};
h.Tl = function(a) {
    this.F = a;
    var b = this.ua;
    if (!b.isEmbedded) {
        for (var c = null, d = b.g.length, e = 0; e < b.g.length; e++) {
            var f = b.g[e];
            if (f.position >= a || 0 > f.position) c ? c.breakClipIds.push.apply(c.breakClipIds, pa(f.breakClipIds)) : (c = f, d = e, c.position = -1)
        }
        d < b.g.length - 1 && b.g.splice(d + 1)
    }
    this.T()
};
h.Ie = function(a) {
    return pm(this.g, a)
};
h.Yb = function(a) {
    this.mediaElement.playbackRate = a ? a : 1;
    return a
};

function N(a) {
    return a.g && a.g.h
}
var vn = D("cast.framework.media.Player"),
    Gn = {};
cast.v.media.ti = (Gn.CANCELLED = "STOPPED", Gn.INTERRUPTED = "INTERRUPTED", Gn.FINISHED = "END_OF_STREAM", Gn.ERROR = "ERROR", Gn);

function Hn(a, b, c, d, e) {
    un.call(this, a, b, c, d, e);
    this.l = null
}
p(Hn, un);

function In(a, b) {
    var c = a.ua;
    r(b) && (b = Jn(c, b));
    return gn(a.B, b)
}
h = Hn.prototype;
h.vf = function(a, b) {
    var c = this;
    return (this.l || In(this, b)).then(function(b) {
        cast.v.common.ea.qh(b);
        b.getDurationSec().then(function(a) {
            a = c.ua.Od(a);
            c.$.resolve(a)
        });
        lm(b).then(function(a) {
            c.pa.resolve(a)
        });
        c.g = b;
        Fn(c);
        En(c, "CLIP_STARTED", c.zj);
        En(c, "CLIP_ENDED", c.yj);
        return b.Fd(c.mediaElement, a, c.A)
    })
};
h.Nf = function(a) {
    var b = this;
    this.l = In(this, a).then(function(a) {
        a.Tb(b.A);
        return a
    })
};
h.Vf = function(a, b) {
    G(Kn, "seek: " + a);
    this.g.seek(Jn(this.ua, a), b)
};
h.cg = function() {
    var a = this.Za();
    this.g.seek(Ln(this.ua, a))
};
h.jd = function(a) {
    var b = this.Za();
    if (b = Mn(this.ua, b)) {
        var c;
        if (c = this.h) c = this.h, c = null !== b && c.h == b.h && c.g == b.g;
        c || An(this, "BREAK_CLIP_STARTED", b)
    } else this.h && An(this, "BREAK_ENDED");
    un.prototype.jd.call(this, a)
};
h.zj = function() {
    G(Kn, "started");
    Cn(this)
};
h.yj = function(a) {
    G(Kn, "ended");
    5 > this.u && (An(this, "BREAK_ENDED", null, a.endedReason), this.g = null, this.D = a.currentMediaTime, this.end(a.endedReason))
};
var Kn = D("cast.framework.media.EmbeddedPlayer");

function Nn(a, b, c, d, e) {
    un.call(this, a, b, c, d, e);
    this.w = this.V = null;
    this.C = this.ua;
    this.G = this.l = this.o = null;
    this.K = void 0;
    this.X = qd();
    this.ga = 1;
    this.C.ja.se(this.ja)
}
p(Nn, un);
h = Nn.prototype;
h.Yb = function(a) {
    this.ga = a || 1;
    return this.o.breakStatus ? this.ga : un.prototype.Yb.call(this, a)
};
h.Bg = function(a) {
    var b = this;
    G(On, "endInternal()");
    var c = [];
    this.g && (An(this, "BREAK_ENDED", null, a), this.g.ja.removeEventListener("CLIP_ENDED", this.Je), c.push(this.g.end(a)), this.g = null);
    this.l && (this.l.cancel("Main video ends"), this.l = null);
    this.w && (c.push(this.w.then(function(b) {
        if (b) return b.end(a)
    })), this.w = null);
    pd(c).then(function() {
        b.J.resolve()
    })
};
h.Vf = function(a, b) {
    var c = this;
    G(On, "seek: " + a);
    var d = this.getCurrentTimeSec(),
        e = Pn(this.C, d, a),
        f = null;
    0 < e.length && (f = this.Aa.J(new hn(d, a, e)).then(function(b) {
        if (b.breaks && 0 < b.breaks.length) {
            a = b.seekTo;
            var d = [],
                e = "seek-" + Date.now();
            c.C.w.set(e, b.breaks.slice());
            for (var f = n(b.breaks), g = f.next(); !g.done; g = f.next()) d.push.apply(d, pa(g.value.breakClipIds));
            return new rk(e, d, b.seekTo)
        }
        return null
    }, function(a) {
        c.ja.dispatchEvent(new Hl(902, Error(a)));
        return null
    }));
    td(H(f).then(function(d) {
        return d && 0 !==
            d.breakClipIds.length ? Qn(c, d, a, b) : (G(On, "No seek break."), !1)
    }), function() {
        G(On, "Fail to create seek clip");
        return !1
    }).then(function(d) {
        d || (d = a, d >= c.o.endTime && (Rn(c), c.o.endTime = Sn(c.C, d), Tn(c, c.o)), c.g.seek(d, b))
    })
};

function Qn(a, b, c, d) {
    Rn(a);
    return Un(a.C, b, 0, a.B).then(function(b) {
        if (!b) return G(On, "Fail to create seek clip"), !1;
        gn(b.g, b.startTime).then(function(e) {
            var f = r(d) ? "PLAYBACK_START" == d : !a.mediaElement.paused;
            if (a.g) {
                a.g.ja.removeEventListener("CLIP_ENDED", a.Je);
                var k = a.g.end("STOPPED")
            } else k = H();
            a.G = c;
            k.then(function() {
                Vn(a, e, b, f)
            })
        });
        return !0
    })
}

function Rn(a) {
    a.l && (a.l.cancel("0"), a.l = null);
    a.w && (a.w.cancel("0"), a.w = null)
}
h.cg = function() {
    this.g.end("SKIPPED")
};

function Tn(a, b) {
    a.l = Wn(a.C, b, a.B);
    var c = a.l;
    a.w = td(a.l.then(function(b) {
        return b ? gn(b.g, b.startTime).then(function(c) {
            var d = null;
            b.breakStatus || (Xn(a, c), d = a.A);
            a.X.g.then(function() {
                G(On, "Preloading Next Clip");
                c.Tb(d)
            });
            return c
        }) : (G(On, "No more clip afterwards"), null)
    }), function(a) {
        a && "0" === a.message && G(On, "Next player creation is interrupted by seek.")
    }).then(function(b) {
        if (b) return b;
        c === a.l && (a.l = null);
        G(On, "No more player afterwards");
        return null
    })
}

function Yn(a) {
    G(On, "switchPlayerAndCip");
    if (a.l) {
        if (a.w) return td(od([a.l, a.w]).then(function(b) {
            var c = n(b);
            b = c.next().value;
            c = c.next().value;
            if (!b || !c) return !0;
            a.l = null;
            a.w = null;
            Vn(a, c, b, !0);
            return !1
        }), function(a) {
            if (a && "0" === a.message) return G(On, "Player switching is interrupted by seek."), !1;
            E(On, "Switch player failed " + a.message);
            return !0
        });
        G(On, "switchPlayerAndClip_: No next player.");
        return H(!0)
    }
    G(On, "switchPlayerAndClip_: No next clip.");
    return H(!0)
}

function Vn(a, b, c, d) {
    G(On, "loadCurrentPlayerAndCreateNext_: " + c.startTime);
    cast.v.common.ea.qh(b);
    a.g = b;
    a.o = c;
    Fn(a);
    En(a, "CLIP_STARTED", a.Ql);
    En(a, "CLIP_ENDED", a.Je);
    a.o.breakStatus && An(a, "BREAK_CLIP_LOADING", a.o.breakStatus, a.K);
    a.K = void 0;
    var e = c.breakStatus ? null : a.A,
        f = a.mediaElement;
    a.X = qd();
    b = b.Fd(f, d, e).then(function() {
        a.o.breakStatus || un.prototype.Yb.call(a, a.ga)
    });
    Tn(a, c);
    return b
}
h.Nf = function(a) {
    var b = this;
    this.V = gn(this.B, a || 0).then(function(a) {
        a.Tb(b.A);
        return a
    })
};
h.vf = function(a, b) {
    var c = this;
    return Zn(this.C, b || 0, this.B).then(function(b) {
        if (b.breakStatus) {
            var d = $n(c),
                f, g = gn(b.g, b.startTime).then(function(a) {
                    f = a;
                    a.Tb(null)
                });
            return od([d, g]).then(function() {
                return Vn(c, f, b, a)
            })
        }
        return (c.V || gn(b.g, b.startTime)).then(function(d) {
            Xn(c, d);
            return Vn(c, d, b, a)
        })
    })
};

function $n(a) {
    return (a.V || gn(a.B, 0)).then(function(b) {
        b.ja.addEventListener("ERROR", function(b) {
            return un.prototype.be.call(a, b)
        });
        var c = Xn(a, b);
        b.Fd(a.mediaElement, !1, a.A);
        return c.then(function() {
            return b.end("STOPPED")
        })
    })
}

function Xn(a, b) {
    var c = b.getDurationSec().then(function(b) {
        a.$.resolve(b)
    });
    b = lm(b).then(function(b) {
        a.pa.resolve(b)
    });
    return od([c, b])
}
h.editTracksInfo = function(a) {
    return this.h || !this.g ? null : om(this.g, a)
};
h.Ie = function(a) {
    if (!this.h && this.g) return pm(this.g, a)
};
h.Za = function() {
    return un.prototype.Za.call(this)
};
h.Nd = function() {
    return null === this.G ? this.Za() : this.G
};
h.Xd = function() {
    return this.l ? !1 : un.prototype.Xd.call(this)
};
h.Ql = function() {
    var a = this;
    G(On, "clip started");
    4 > this.u && Cn(this);
    var b = this.o.breakStatus;
    b ? this.g.getDurationSec().then(function(c) {
        b.g.duration = c;
        a.ha = !0;
        An(a, "BREAK_CLIP_STARTED", b)
    }) : this.G = null
};
h.Je = function(a) {
    var b = this;
    G(On, "clip ended");
    this.K = a.endedReason;
    var c = null;
    this.o.breakStatus ? c = td(H(this.l), function() {
        return null
    }).then(function(a) {
        a && a.breakStatus || (G(On, "onClipEnded_: " + (a ? "Next clip is not a break clip" : "No next clip")), An(b, "BREAK_ENDED", null, b.K), b.K = void 0)
    }) : (this.G = this.g.getCurrentTimeSec(), this.g.$ && (this.A = this.g.$));
    H(c).then(function() {
        return 5 > b.u ? Yn(b) : !1
    }).then(function(c) {
        c && (G(On, "breakList player ends since there is no more player to switch to"), b.g = null,
            b.D = a.currentMediaTime, b.end(a.endedReason))
    })
};
h.be = function(a) {
    this.o.breakStatus ? G(On, "player event: break clip error") : un.prototype.be.call(this, a)
};
h.jd = function(a) {
    un.prototype.jd.call(this, a);
    a = this.Za();
    var b = this.mediaElement.buffered;
    if (1 <= b.length) {
        var c = b.length - 1,
            d = b.start(c);
        b = b.end(c);
        c = Math.min(this.o.endTime, this.mediaElement.duration);
        d <= a && b >= c && this.X.resolve()
    }
    a >= this.o.endTime && this.g.end("BREAK_SWITCH")
};
var On = D("cast.framework.media.StitchingPlayer");

function ao(a, b, c) {
    b = void 0 === b ? [] : b;
    c = void 0 === c ? [] : c;
    mn.call(this, !0, a, b, c);
    this.l = [];
    this.A = new bo;
    a = 0;
    b = n(this.g);
    for (c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = 0, e = 0; e < c.breakClipIds.length; e++) {
            var f = this.Ya(c.breakClipIds[e]);
            f && (this.l.push(new co(c, f, e, a, d)), d += f.duration)
        }
        a += d
    }
}
p(ao, mn);
ao.prototype.Od = function(a) {
    var b = this.l.slice(0).reverse().find(function(b) {
        return b.Gb <= a
    });
    return b ? b.Te + Math.max(0, a - b.Bc) : a
};

function Jn(a, b) {
    return (a = a.l.slice(0).reverse().find(function(a) {
        return a.Te < b
    })) ? a.Bc + (b - a.Te) : b
}

function eo(a, b) {
    return a.l.find(function(a) {
        return a.Gb <= b && (0 > a.Bc || b <= a.Bc)
    }) || null
}
ao.prototype.Qe = function(a, b) {
    var c = eo(this, b);
    b = new fe(b - c.g, b - c.Gb);
    ln(a, b);
    return b
};
ao.prototype.$e = function(a) {
    var b = eo(this, a);
    return b ? a - b.Gb : null
};

function Mn(a, b) {
    if (fo(a.A, b)) return a.A.g;
    var c = null,
        d = eo(a, b);
    if (d) {
        c = a.g.find(function(a) {
            return a == d.l
        });
        var e = d.Gb;
        var f = d.Bc;
        c = new kn(c, d.o, d.h)
    } else f = a.l.find(function(a) {
        return a.Gb > b
    }), e = b, f = f ? f.Gb : Infinity, c = null;
    a.A.cache(c, e, f);
    return c
}

function Ln(a, b) {
    return (a = eo(a, b)) ? a.Bc : b
}

function co(a, b, c, d, e) {
    this.l = a;
    this.h = b;
    this.Te = a.position;
    this.g = a.position + d;
    this.Gb = this.g + e;
    this.Bc = this.Gb + b.duration;
    this.o = c
}

function bo() {
    this.h = this.l = this.g = null
}

function fo(a, b) {
    return a.l < b && b < a.h
}
bo.prototype.cache = function(a, b, c) {
    this.g = a;
    this.l = b;
    this.h = c
};
cast.v.media.util = {};
cast.v.media.util.P = D("cast.framework.media.util");
cast.v.media.util.og = {
    m3u8: "application/x-mpegurl",
    manifest: "application/vnd.ms-sstr+xml",
    mpd: "application/dash+xml",
    ism: "application/vnd.ms-sstr+xml",
    m4v: "video/mp4",
    mp4: "video/mp4",
    ogv: "video/ogg",
    aac: "audio/aac",
    m4a: "audio/mp4",
    mp3: "audio/mp3",
    oga: "audio/ogg",
    wav: "audio/wav",
    jpg: "image/jpg",
    gif: "image/gif",
    png: "image/png"
};
cast.v.media.util.Ni = {
    video: "audio_video",
    audio: "audio_only",
    image: "image"
};
cast.v.media.util.Zn = function(a) {
    return pb(Mk, a)
};
cast.v.media.util.il = function(a) {
    return (a = cast.v.media.util.Ni[a.split("/")[0]]) ? a : "audio_video"
};
cast.v.media.util.bf = function(a) {
    a = a.split("?")[0] || "";
    a = a.split("/").pop() || "";
    return a.split(".").pop() || ""
};
cast.v.media.util.kf = function(a, b) {
    b = void 0 === b ? "video/mp4" : b;
    if (a = cast.v.media.util.og[a]) return a;
    F(cast.v.media.util.P, "cannot guess mime type from given contenId/Type. Assume that this is " + b);
    return b
};
cast.v.media.util.Wg = function(a, b, c) {
    return cast.v.media.util.Xg(c || a.contentUrl || a.contentId, a.contentType, b, a.hlsSegmentFormat, a.hlsVideoSegmentFormat)
};
cast.v.media.util.hl = function(a, b) {
    return cast.v.media.util.Xg(String(a.contentUrl || a.contentId), a.contentType, b, a.hlsSegmentFormat)
};
cast.v.media.util.Xg = function(a, b, c, d, e) {
    var f = cast.v.media.util.bf(a.toLowerCase());
    b = (b || "").toLowerCase();
    var g = cast.v.media.util.og[f];
    !pb(Mk, b) && g && pb(Mk, g) && (b = g);
    b = b || cast.v.media.util.kf(f);
    a = new um(a, b, c, cast.v.media.util.il(b));
    r(d) && (a.hlsSegmentFormat = d);
    r(e) && (a.hlsVideoSegmentFormat = e);
    return a
};

function go(a, b, c, d) {
    d = void 0 === d ? Infinity : d;
    this.g = a;
    this.breakStatus = b;
    this.startTime = void 0 === c ? 0 : c;
    this.endTime = d
}
go.prototype.isPlayingBreak = function() {
    return null != this.breakStatus
};

function ho(a, b, c) {
    b = void 0 === b ? [] : b;
    c = void 0 === c ? [] : c;
    mn.call(this, !1, a, b, c)
}
p(ho, mn);
ho.prototype.Qe = function(a, b) {
    for (var c = a.h, d = a.l, e = 0, f = 0; f < d; f++) {
        var g = this.Ya(c.breakClipIds[f]);
        g && g.duration && (e += g.duration)
    }
    b = new fe(e + b, b);
    ln(a, b);
    return b
};
ho.prototype.$e = function(a) {
    return a
};
ho.prototype.Od = function(a) {
    return a
};

function Zn(a, b, c) {
    return H().then(function() {
        var d = a.g.find(function(c) {
            return !(c.isWatched && !a.u.sc()) && c.position == b
        });
        return d ? td(Un(a, d, 0, c), function() {
            G(io, "createMediaClipAt: Cannot create a stitching media clip");
            return null
        }) : null
    }).then(function(d) {
        return d ? d : new go(c, null, b, Sn(a, b))
    })
}

function Wn(a, b, c) {
    return H().then(function() {
        if (b.isPlayingBreak()) {
            var d = b.breakStatus,
                e = d.h,
                f = d.l + 1;
            return H().then(function() {
                if (e.breakClipIds.length > f) return td(Un(a, e, f, c), function(a) {
                    if (a instanceof hd) return ld(a);
                    G(io, "createNextMediaClip: Cannot create stitching clip in break.")
                });
                G(io, "createNextMediaClip: No more break clip");
                return null
            }).then(function(a) {
                if (a) return a;
                a = d.h.position;
                G(io, "createNextMediaClip: The current break status position is: " + a);
                return a
            })
        }
        var g = a.g.find(function(c) {
            return !(c.isWatched &&
                !a.u.sc()) && (c.position >= b.endTime || 0 > c.position)
        });
        if (g) return td(Un(a, g, 0, c), function(a) {
            return a instanceof hd ? ld(a) : null
        }).then(function(a) {
            if (a) return a;
            G(io, "createNextMediaClip: next break is skipped.");
            return g.position
        });
        G(io, "createNextMediaClip: No next break");
        return -1
    }).then(function(b) {
        return "number" !== typeof b ? b : 0 > b ? (G(io, "createNextMediaClip: No more clip"), null) : new go(c, null, b, Sn(a, b))
    })
}

function Un(a, b, c, d) {
    var e = H();
    0 === c && (e = jo(a, b));
    return e.then(function() {
        for (var e = c; e < b.breakClipIds.length; e++) {
            var g = b;
            var k = e,
                l = d,
                m = a.Ya(g.breakClipIds[k]);
            m ? g = new go(cast.v.media.util.hl(m, l.playbackConfig), new kn(g, k, m), 0) : (G(io, "createStitchingMediaClipAt_:No next clip at " + k), g = null);
            if (g) return g
        }
        G(io, "createValidStitchingClip:No more valid break clip in a break");
        return null
    })
}

function jo(a, b) {
    if (0 === b.breakClipIds.length) return H();
    var c = new jn(b),
        d = b.breakClipIds.map(function(b) {
            return (b = a.Ya(b)) ? (b = new window.Proxy(b, {
                set: function(b, c, d) {
                    d !== b[c] && (b[c] = d, a.o = !0);
                    return !0
                }
            }), a.u.G(b, c)) : H([])
        });
    return pd(d).then(function(c) {
        var d = 0,
            e = b.breakClipIds.slice();
        c.forEach(function(c) {
            c.Ze ? (sn(a, b, d, c.value), d += c.value.length) : (a.ja.dispatchEvent(new Hl(901, Error(c.reason))), d++)
        });
        Xa(e, b.breakClipIds) || (a.o = !0)
    })
}

function Pn(a, b, c) {
    var d = b > c,
        e = d ? c : b,
        f = d ? b : c;
    return a.g.filter(function(a) {
        return a.position > e && a.position <= f
    })
}

function Sn(a, b) {
    var c = a.g.find(function(c) {
        return !(c.isWatched && !a.u.sc()) && c.position > b
    });
    return c ? c.position : Infinity
}
var io = D("cast.framework.timeline.StitchingTimeline");

function ko(a) {
    this.g = a
}

function lo(a, b, c, d) {
    return b.K(c).then(function() {
        var e = null;
        c.breaks && 0 !== c.breaks.length || !c.vmapAdsRequest || (e = b.B(c.vmapAdsRequest).then(function(a) {
            a && (c.breaks = a.breaks, c.breakClips = a.breakClips)
        }));
        return H(e).then(function() {
            if (c.breaks && 0 < c.breaks.length && !c.breaks[0].isEmbedded) {
                var e = new ho(b, c.breaks, c.breakClips);
                var g = new Nn(b, c, d, e, a.g)
            } else e = new ao(b, c.breaks, c.breakClips), g = new Hn(b, c, d, e, a.g);
            b.N(e);
            return H(g)
        })
    })
};

function mo(a) {
    this.g = a
}

function S(a) {
    if (!(a instanceof mo)) throw E(no, "Proper Player object can be acquried by calling getPlayer() of cast.framework.Application object"), Error("player is not created properly.");
    this.o = new il;
    this.vb = new ko(this.W.bind(this));
    this.g = new bl;
    this.w = new bl;
    this.l = null;
    this.u = jf.H();
    this.X = this.Ba = this.C = this.h = this.ha = this.O = this.V = this.M = this.L = null;
    this.G = new Pk(new Ok);
    this.B = new O(new Yk);
    this.Ca = new Xk(new Wk);
    this.J = a.g;
    this.Na = 1;
    this.K = new Map;
    this.A = 0;
    this.ga = null;
    this.F = 1;
    this.N = this.D =
        null;
    this.T = !1;
    this.Aa = y();
    this.ca = this.pa = 0;
    this.$ = !1;
    oo(this)
}
A("cast.framework.PlayerManager", S);

function oo(a) {
    kl(a.o, function(b, d) {
        "ERROR" !== b && a.o.dispatchEvent(new Hl(900, d))
    });
    a.o.addEventListener("MEDIA_FINISHED", a.Zl, a);
    a.o.addEventListener("LIVE_IS_MOVING_WINDOW_CHANGED", a.W, a);
    a.o.addEventListener("LIVE_ENDED", a.W, a);
    a.o.addEventListener("RATE_CHANGE", a.qm, a);
    a.o.addEventListener("ERROR", a.uj, a);
    a.o.addEventListener("REQUEST_PRECACHE", a.eb, a);
    a.o.addEventListener("BUFFERING", a.fc, a);
    a.u.u = a.sm.bind(a);
    a.u.o = a.Vl.bind(a);
    cl(a.w, "LOAD_BY_ENTITY", a.u.o.bind(a.u));
    a.u.o = a.w.g;
    cl(a.w, "SET_CREDENTIALS",
        a.u.u.bind(a.u));
    a.u.u = a.w.g;
    a.u.D = a.w.g;
    a.u.C = a.w.g;
    a.u.A = a.w.g;
    a.u.B = a.w.g;
    a.u.h = a.Hf.bind(a);
    var b = Object.keys(po).reduce(function(b, d) {
        b[d] = a.ah.bind(a);
        return b
    }, {});
    fl(a.g, b);
    b = Object.keys(qo).reduce(function(b, d) {
        b[d] = a.ah.bind(a);
        return b
    }, {});
    fl(a.w, b);
    cast.v.common.xc.Mf.then(function() {
        wa("cast.player.api.ContentCache.setCacheInsertCallback") && (cast.player.api.ContentCache.setCacheInsertCallback(a.Nl.bind(a)), cast.player.api.ContentCache.setCacheHitCallback(a.Ml.bind(a)))
    })
}
S.prototype.fc = function(a) {
    ro(this);
    this.T = a.isBuffering
};

function ro(a) {
    var b = y(),
        c = (b - a.Aa) / 1E3;
    a.Aa = b;
    a.$ && (a.T ? a.ca += c : a.pa += c)
}
S.prototype.getStats = function() {
    ro(this);
    var a = {};
    a.bufferingTime = this.ca;
    a.playTime = this.pa;
    if (!this.O) return a;
    Object.assign(a, so(this));
    if (!this.h) return a;
    Object.assign(a, xn(this.h));
    return a
};
S.prototype.getStats = S.prototype.getStats;

function so(a) {
    return (a = a.O.getVideoPlaybackQuality && a.O.getVideoPlaybackQuality()) ? {
        droppedFrames: a.droppedVideoFrames,
        decodedFrames: a.totalVideoFrames,
        height: a.videoHeight,
        width: a.videoWidth
    } : {}
}
S.prototype.eb = function() {
    Zi("Cast.CAF.RequestPrecache")
};
S.prototype.Oh = function(a) {
    this.X = a
};
S.prototype.setPlaybackConfig = S.prototype.Oh;
S.prototype.Vk = function() {
    return this.X
};
S.prototype.getPlaybackConfig = S.prototype.Vk;
S.prototype.Xk = function() {
    return this.F
};
S.prototype.getPreferredPlaybackRate = S.prototype.Xk;
S.prototype.Yk = function() {
    return this.D
};
S.prototype.getPreferredTextLanguage = S.prototype.Yk;
S.prototype.Zk = function() {
    return this.N
};
S.prototype.getPreferredTextStyle = S.prototype.Zk;
S.prototype.Sk = function() {
    return this.G
};
S.prototype.getAudioTracksManager = S.prototype.Sk;
S.prototype.dl = function() {
    return this.B
};
S.prototype.getTextTracksManager = S.prototype.dl;
S.prototype.al = function() {
    return this.Ca
};
S.prototype.getQueueManager = S.prototype.al;
S.prototype.Tk = function() {
    return this.J
};
S.prototype.getBreakManager = S.prototype.Tk;
h = S.prototype;
h.Zl = function() {
    ro(this);
    this.T = !1;
    this.h = null;
    this.$ = !1;
    this.G.reset();
    this.B.reset();
    this.J.reset()
};
h.qm = function() {
    var a = this;
    this.V.then(function(b) {
        null === a.xb() && (a.F = b.playbackRate)
    })
};
h.sm = function(a) {
    this.ga = a.credentials;
    return new wf
};
h.Vl = function(a) {
    var b = new Jj;
    b.media = new Kj;
    b.autoplay = !0;
    b.media.entity = a.entity;
    this.ga && (b.credentials = this.ga, b.credentialsType = "cloud");
    if (void 0 != a.shuffle) {
        var c = new ek;
        c.repeatMode = a.shuffle ? "REPEAT_ALL_AND_SHUFFLE" : "REPEAT_OFF";
        b.queueData = c
    }
    return this.load(b).then(function() {
        return new wf
    })
};
h.uj = function(a) {
    Wi("Cast.CAF.Error", a.detailedErrorCode || 0)
};
h.addEventListener = function(a, b) {
    var c = this;
    if (!w(b)) throw E(no, "addEventListener failed since handler is not a function"), Error("addEventListener failed since handler is not a function");
    Aa(a) ? a.forEach(function(a) {
        to(c, a, b)
    }) : to(this, a, b)
};
S.prototype.addEventListener = S.prototype.addEventListener;

function to(a, b, c) {
    Wi("Cast.CAF.EventListenerAdded", cast.v.common.ea.Rg(b));
    if (!pb(ll, b)) throw a = "addEventListener(" + b + ") failed due to invalid event type", E(no, a), Error(a);
    a.o.addEventListener(b, c)
}
S.prototype.removeEventListener = function(a, b) {
    var c = this;
    Aa(a) ? a.forEach(function(a) {
        uo(c, a, b)
    }) : uo(this, a, b)
};
S.prototype.removeEventListener = S.prototype.removeEventListener;

function uo(a, b, c) {
    Wi("Cast.CAF.EventListenerRemoved", cast.v.common.ea.Rg(b));
    a.o.removeEventListener(b, c)
}
S.prototype.Dc = function(a, b) {
    var c = null;
    pb(Fj, a) ? null == b || w(b) || (c = "setMessageInterceptor(" + a + ") failed since handler is not a function") : c = "setMessageInterceptor(" + a + ") failed due to invalid request type";
    if (c) throw E(no, c), Error(c);
    Wi("Cast.CAF.MessageInterceptorSet", cast.v.common.ea.Uk(a));
    b = b && vo(b);
    switch (a) {
        case "MEDIA_STATUS":
            this.ha = b;
            break;
        case "CLOUD_STATUS":
            this.l.Ca = b;
            break;
        case "GET_STATUS":
        case "LOAD":
        case "PAUSE":
        case "STOP":
        case "PLAY":
        case "PLAY_AGAIN":
        case "SEEK":
        case "SET_PLAYBACK_RATE":
        case "SET_VOLUME":
        case "SKIP_AD":
        case "EDIT_TRACKS_INFO":
        case "EDIT_AUDIO_TRACKS":
        case "PRECACHE":
        case "PRELOAD":
        case "QUEUE_LOAD":
        case "QUEUE_INSERT":
        case "QUEUE_UPDATE":
        case "QUEUE_REMOVE":
        case "QUEUE_REORDER":
        case "QUEUE_GET_ITEM_RANGE":
        case "QUEUE_GET_ITEMS":
        case "QUEUE_GET_ITEM_IDS":
            b =
                b && this.kc.bind(this, a, b);
            if ("LOAD" == a) {
                c = dl(this.g, wo.LOAD);
                var d = dl(this.g, wo.PRELOAD),
                    e = dl(this.g, wo.PRECACHE);
                d && d !== c || this.g.Dc(wo.PRELOAD, b);
                e && e !== c || this.g.Dc(wo.PRECACHE, b)
            }
            this.g.Dc(wo[a], b);
            break;
        case "SET_CREDENTIALS":
        case "LOAD_BY_ENTITY":
        case "USER_ACTION":
        case "DISPLAY_STATUS":
        case "FOCUS_STATE":
        case "CUSTOM_COMMAND":
            this.w.Dc(a, b && this.jc.bind(this, a, b));
            break;
        default:
            throw c = "Unknown message type - " + a, E(no, c), Error(c);
    }
};
S.prototype.setMessageInterceptor = S.prototype.Dc;

function xo(a, b, c, d, e) {
    a.l.Ha(b.senderId, b.data.requestId, c || ("LOAD" == b.data.type ? "LOAD_FAILED" : "ERROR"), void 0 === d ? "APP_ERROR" : d, e)
}

function yo(a) {
    Wi("Cast.CAF.MessageInterceptorDuration", y() - a)
}

function vo(a) {
    return function(b) {
        for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
        var e = y();
        return Promise.resolve(a.apply(null, pa(c))).then(function(a) {
            yo(e);
            return a
        }).catch(function(a) {
            yo(e);
            return Promise.reject(a)
        })
    }
}
S.prototype.kc = function(a, b, c) {
    var d = this,
        e = null;
    try {
        e = b(cast.v.I.Fk(c.data))
    } catch (f) {
        throw xo(this, c), f;
    }
    return Promise.resolve(e).then(function(a) {
        if (!a) return zo(d, c.data.requestId), null;
        if (pb(bk, a.type)) return xo(d, c, a.type, a.reason, a.customData), Ao(d, c.data.requestId, a), null;
        c.data = a;
        return c
    }).catch(function(b) {
        E(no, a + " Interceptor Error " + b);
        xo(d, c);
        Ao(d, c.data.requestId);
        if (b instanceof Error) throw b;
        return null
    })
};
S.prototype.jc = function(a, b, c) {
    a = b(c);
    return Promise.resolve(a).then(function(a) {
        return a ? pb(Vd, a.type) ? new qf(a.reason || "APP_ERROR") : a : new wf
    }, function(a) {
        var b = "APP_ERROR";
        a && a.reason && pb(Vd, a.type) && (b = a.reason);
        return new qf(b)
    })
};
S.prototype.Gm = function(a) {
    null == a || w(a) ? this.L = a : E(no, "setMediaPlaybackInfoHandler() cannot set handler since it's not a function")
};
S.prototype.setMediaPlaybackInfoHandler = S.prototype.Gm;
S.prototype.Hm = function(a) {
    null == a || w(a) ? this.M = a : E(no, "setMediaUrlHandler() cannot set handler since it's not a function")
};
S.prototype.setMediaUrlResolver = S.prototype.Hm;
S.prototype.Lf = function(a, b) {
    return this.u.Lf(a, b).then(function(a) {
        var b = null;
        "ERROR" == a.type && (b = new Hj("ERROR"), b.reason = a.code);
        return b
    })
};
S.prototype.playString = S.prototype.Lf;
S.prototype.Pf = function() {
    return this.u.Pf().then(function(a) {
        if ("ERROR" == a.type) {
            var b = new Hj("ERROR");
            b.reason = a.code;
            return Promise.reject(b)
        }
    })
};
S.prototype.refreshCredentials = S.prototype.Pf;
S.prototype.qb = function(a) {
    var b = this;
    this.V = H(a);
    this.V.then(function(a) {
        b.O = a;
        !b.h && b.l && (b.l.qb(a), b.J.qb(a))
    })
};
S.prototype.setMediaElement = S.prototype.qb;
S.prototype.Tc = function() {
    return this.l ? cast.v.I.yk(this.l.Tc()) : null
};
S.prototype.getMediaInformation = S.prototype.Tc;
S.prototype.re = function(a, b) {
    this.l && (this.h && zn(this.h, cast.v.I.eg(a)), this.l.re(cast.v.I.eg(a), b), this.o.dispatchEvent(new Pl(a)))
};
S.prototype.setMediaInformation = S.prototype.re;
S.prototype.tc = function() {
    return this.l.tc()
};
S.prototype.getSupportedMediaCommands = S.prototype.tc;
S.prototype.rd = function(a, b) {
    this.l.rd(a, void 0 === b ? !0 : b)
};
S.prototype.setSupportedMediaCommands = S.prototype.rd;
S.prototype.De = function(a, b) {
    this.l.De(a, void 0 === b ? !0 : b)
};
S.prototype.addSupportedMediaCommands = S.prototype.De;
S.prototype.Rf = function(a, b) {
    this.l.Rf(a, void 0 === b ? !0 : b)
};
S.prototype.removeSupportedMediaCommands = S.prototype.Rf;
S.prototype.W = function(a, b, c, d) {
    this.l && this.l.W(void 0 === a ? !1 : a, b, c, d)
};
S.prototype.broadcastStatus = S.prototype.W;
S.prototype.oe = function(a, b, c, d, e) {
    this.l && this.l.oe(a, b, void 0 === c ? !1 : c, d, e)
};
S.prototype.sendStatus = S.prototype.oe;
S.prototype.Zf = function(a) {
    this.l && this.l.Zf(cast.v.I.Tm(a))
};
S.prototype.setIdleReason = S.prototype.Zf;
S.prototype.Ha = function(a, b, c, d, e) {
    this.l && this.l.Ha(a, b, cast.v.I.Sm(c), cast.v.I.Rm(void 0 === d ? null : d), void 0 === e ? null : e)
};
S.prototype.sendError = S.prototype.Ha;
S.prototype.getCurrentTimeSec = function() {
    return this.h ? this.h.Nd() : 0
};
S.prototype.getCurrentTimeSec = S.prototype.getCurrentTimeSec;
S.prototype.Uc = function() {
    return this.h ? cast.v.I.Ak(this.h.getState()) : "IDLE"
};
S.prototype.getPlayerState = S.prototype.Uc;
S.prototype.getDurationSec = function() {
    return this.h ? this.h.F : NaN
};
S.prototype.getDurationSec = S.prototype.getDurationSec;
S.prototype.xb = function() {
    return this.h ? this.h.xb() : null
};
S.prototype.getBreakClipCurrentTimeSec = S.prototype.xb;
S.prototype.getPlaybackRate = function() {
    return this.l.getPlaybackRate()
};
S.prototype.getPlaybackRate = S.prototype.getPlaybackRate;
S.prototype.Kd = function() {
    return this.h ? this.h.Kd() : null
};
S.prototype.getBreakClipDurationSec = S.prototype.Kd;
S.prototype.pc = function() {
    return this.h ? this.h.ua.g : []
};
S.prototype.getBreaks = S.prototype.pc;
S.prototype.Ra = function() {
    return this.h ? this.h.Ra() : null
};
S.prototype.getLiveSeekableRange = S.prototype.Ra;
S.prototype.Ja = function() {
    return this.h ? this.h.Ja() : null
};
S.prototype.getRawSeekableRange = S.prototype.Ja;

function zo(a, b) {
    if (b) {
        a.A = 0;
        var c = a.K.get(b);
        c && (c.resolve(), a.K.delete(b))
    }
}

function Ao(a, b, c) {
    if (b) {
        a.A = 0;
        var d = a.K.get(b);
        d && (d.reject(c), a.K.delete(b))
    }
}
S.prototype.load = function(a) {
    a.requestId = this.Na++;
    var b = qd();
    this.K.set(a.requestId, b);
    b = Promise.resolve(b.g);
    this.l.load(cast.v.I.Vm(a));
    return b
};
S.prototype.load = S.prototype.load;
S.prototype.pause = function() {
    this.ab(new M("PAUSE"))
};
S.prototype.pause = S.prototype.pause;
S.prototype.play = function() {
    this.ab(new M("PLAY"))
};
S.prototype.play = S.prototype.play;
S.prototype.seek = function(a) {
    var b = new Rj;
    b.currentTime = a;
    this.ab(b)
};
S.prototype.seek = S.prototype.seek;
S.prototype.stop = function() {
    this.ab(new M("STOP"))
};
S.prototype.stop = S.prototype.stop;
S.prototype.ab = function(a) {
    this.l.ab(cast.v.I.Xm(a))
};
S.prototype.sendLocalMediaRequest = S.prototype.ab;
h = S.prototype;
h.fm = function(a) {
    var b = this;
    G(no, "MediaManagerLoad");
    var c = cast.v.I.xk(a.data),
        d = c.media;
    (a = nb(c, "queueData", "items")) && Wi("Cast.CAF.QueueItems", a.length);
    var e;
    this.h ? (a = this.h.end("INTERRUPTED"), ro(this), this.h = null, this.$ = this.T = !1) : a = H();
    var f = this.l;
    d != f.Tc() && this.re(d, !0);
    td(a.then(function() {
        b.G.reset();
        b.B.reset();
        b.A && Ao(b, b.A, void 0);
        b.A = c.requestId;
        d && (d.contentUrl || d.contentId) ? b.C && b.C.Ba == (d.contentUrl || d.contentId) ? (e = H(b.C), b.C = null) : e = Bo(b, c) : (E(no, "LoadRequest data was corrupted"),
            e = ld());
        return e
    }).then(function(a) {
        f.qb(a);
        a.ja.se(b.o);
        ro(b);
        b.h = a;
        return b.V
    }).then(function(a) {
        if (!a) return ld(Error("No media element"));
        var e = r(c.autoplay) ? c.autoplay : !0,
            f = c.currentTime,
            g = c.activeTrackIds || void 0;
        b.F = c.playbackRate || b.F;
        b.o.dispatchEvent(new Ol("PLAYER_LOADING", d));
        return yn(b.h, a, e, f, g, b.F)
    }).then(function(a) {
        b.A == c.requestId && (b.G.g = b.h, b.B.g = b.h, a = a.Fa(), f.o && (a.tracks = a.tracks || void 0, a.tracks && !Fg(a.tracks) ? E(I, "Invalid tracks information") : a.activeTrackIds && !Gg(a.tracks,
            a.activeTrackIds) ? E(I, "Invalid active tracks") : (f.g && f.g.media && (f.g.activeTrackIds = a.activeTrackIds, f.g.media.tracks = a.tracks, f.g.media.textTrackStyle = a.textTrackStyle), f.l.load("", !1, void 0, a, !0))), zo(b, b.A), Co(b, !0), zn(b.h, cast.v.I.eg(d)), b.o.dispatchEvent(new Ol("PLAYER_LOAD_COMPLETE", d)), Do(b), ro(b), b.$ = !0, Ug(f))
    }), function(a) {
        a && a.message && E(no, "Load failed: " + a.message);
        Zg(f, "LOAD_FAILED");
        Wi("Cast.CAF.LoadError", cast.v.common.ea.el(a && a.reason));
        b.o.dispatchEvent(new Hl(905, a));
        b.o.dispatchEvent(new Ml(void 0,
            "ERROR"))
    })
};
h.im = function(a) {
    var b = this,
        c = cast.v.I.Ck(a.data),
        d = c.media;
    if (!d || !d.contentUrl && !d.contentId) return E(no, "PreloadRequest data was corrupted"), !1;
    this.C ? (a = this.C.end("STOPPED"), this.C = null) : a = H();
    a.then(function() {
        return Bo(b, c)
    }).then(function(a) {
        b.o.dispatchEvent(new Ol("PLAYER_PRELOADING", d));
        b.C = a;
        a.Tb(c.currentTime || void 0)
    }, function() {
        E(no, "Cannot create player on preload")
    });
    return !0
};
h.hm = function(a) {
    var b = this,
        c = cast.v.I.Bk(a.data),
        d = c.media,
        e = Object.assign(new Vk, this.X);
    this.L && (e = this.L(c, e));
    var f = this.M ? this.M(c) : d.contentUrl || d.contentId;
    H(e).then(function(a) {
        return a ? H(f).then(function(e) {
            if (!e) return E(no, "Load failed, missing content url."), ld("INVALID_PARAMS");
            e = cast.v.media.util.Wg(d, a, e);
            return gn(e, c.currentTime).then(function(a) {
                b.Ba = a;
                return a.Eh()
            })
        }) : (E(no, "Load failed, missing playback config."), ld("INVALID_PARAMS"))
    }).then(function() {
        b.Ba = null
    }, function(c) {
        pb(Gj,
            c) || (c = "APP_ERROR");
        xo(b, a, "ERROR", c)
    })
};
h.em = function() {
    this.o.dispatchEvent(new Ol("PLAYER_PRELOADING_CANCELLED"));
    return !0
};

function Do(a) {
    var b = a.B.getTracks().length;
    Wi("Cast.CAF.NumSubtitles", b);
    a.B.getTracks().forEach(function(a) {
        (a = a.trackContentType) && Wi("Cast.CAF.SubtitleType", Ti[a] || 0)
    })
}

function Bo(a, b) {
    var c = b.media,
        d = Object.assign(new Vk, a.X);
    a.L && (d = a.L(b, d));
    var e = a.M ? a.M(b) : c.contentUrl || c.contentId;
    return H(d).then(function(b) {
        return b ? H(e).then(function(d) {
            if (!d) return E(no, "Load failed, missing content url."), ld();
            d = cast.v.media.util.Wg(c, b, d);
            c.contentType = d.mimeType;
            return lo(a.vb, a.J, c, d)
        }) : (E(no, "Load failed, missing playback config."), ld())
    })
}
h.Sl = function(a) {
    if (this.h) {
        var b = this.h,
            c = a;
        if (c.media) {
            var d = c.media;
            isNaN(b.F) || (d.duration = b.F);
            d.breakClips = cast.v.I.Pm(b.ua.oc() || void 0);
            d.breaks = cast.v.I.Om(b.ua.g || void 0)
        }
        c.currentTime = b.Nd();
        c.liveSeekableRange = cast.v.I.Um(b.Ra()) || void 0;
        b.h && (c.playbackRate = 0, c.supportedMediaCommands &= -3, wn(b) && (c.supportedMediaCommands |= 512), b = b.ua.Qe(b.h, b.Za()), c.breakStatus = b)
    }
    a && !a.breakStatus && ["PLAYING", "PAUSED"].includes(a.playerState) && Co(this, !1);
    a = rb(a);
    this.o.dispatchEvent(new Ll(cast.v.I.zk(a)));
    return this.ha ? this.ha(a) : a
};
h.tm = function(a) {
    var b;
    if (b = this.h) b = this.h, b.h ? wn(b) ? (G(vn, "skipAd"), b.cg(), b = !0) : (G(vn, "skipAd - ad cannot be skipped"), b = !1) : (G(vn, "skipAd - not playing ad"), b = !1);
    b || xo(this, a, "INVALID_REQUEST", "INVALID_REQUEST")
};
h.Hf = function(a) {
    this.o.dispatchEvent(new Hl(906, qb(a)))
};
h.gm = function(a) {
    this.Hf(a);
    Ao(this, this.A, a)
};
h.Nl = function(a) {
    this.o.dispatchEvent(new Wl("CACHE_INSERTED", a))
};
h.Ml = function(a) {
    this.o.dispatchEvent(new Wl("CACHE_HIT", a))
};

function Co(a, b) {
    if (a.h && N(a.h)) {
        var c = a.B,
            d = c.Qg();
        0 < d.length ? a.D = d[0].language || null : b && null != a.D ? 0 < c.Sd(a.D).length && c.pe(a.D) : a.D = null;
        (d = c.Nb()) ? a.N = d: b && null != a.N && c.rb(a.N)
    }
}
h.ah = function(a) {
    var b = a.type;
    this.o.dispatchEvent(new Nl(po[a.type] || qo[b], qb(a.data), a.senderId))
};
h.Ec = function(a) {
    this.J.Ec(a)
};
var no = D("cast.framework.PlayerManager"),
    Eo = {},
    wo = (Eo.GET_STATUS = "getstatus", Eo.LOAD = "load", Eo.PAUSE = "pause", Eo.STOP = "stop", Eo.PLAY = "play", Eo.SKIP_AD = "skipad", Eo.PLAY_AGAIN = "playagain", Eo.SEEK = "seek", Eo.SET_PLAYBACK_RATE = "setplaybackrate", Eo.SET_VOLUME = "setvolume", Eo.EDIT_TRACKS_INFO = "edittracksinfo", Eo.EDIT_AUDIO_TRACKS = "editaudiotracks", Eo.PRECACHE = "precache", Eo.PRELOAD = "preload", Eo.QUEUE_LOAD = "queueload", Eo.QUEUE_INSERT = "queueinsert", Eo.QUEUE_UPDATE = "queueupdate", Eo.QUEUE_REMOVE = "queueremove",
        Eo.QUEUE_REORDER = "queuereorder", Eo.QUEUE_GET_ITEM_RANGE = "getitemsrange", Eo.QUEUE_GET_ITEMS = "getitemsinfo", Eo.QUEUE_GET_ITEM_IDS = "getqueueids", Eo),
    Fo = {},
    po = (Fo.load = "REQUEST_LOAD", Fo.stop = "REQUEST_STOP", Fo.pause = "REQUEST_PAUSE", Fo.precache = "REQUEST_PRECACHE", Fo.play = "REQUEST_PLAY", Fo.skipad = "REQUEST_SKIP_AD", Fo.playagain = "REQUEST_PLAY_AGAIN", Fo.seek = "REQUEST_SEEK", Fo.setplaybackrate = "REQUEST_PLAYBACK_RATE_CHANGE", Fo.setvolume = "REQUEST_VOLUME_CHANGE", Fo.edittracksinfo = "REQUEST_EDIT_TRACKS_INFO", Fo.editaudiotracks =
        "REQUEST_EDIT_AUDIO_TRACKS", Fo.queueload = "REQUEST_QUEUE_LOAD", Fo.queueinsert = "REQUEST_QUEUE_INSERT", Fo.queueupdate = "REQUEST_QUEUE_UPDATE", Fo.queueremove = "REQUEST_QUEUE_REMOVE", Fo.queuereorder = "REQUEST_QUEUE_REORDER", Fo.getitemsrange = "REQUEST_QUEUE_GET_ITEM_RANGE", Fo.getitemsinfo = "REQUEST_QUEUE_GET_ITEMS", Fo.getqueueids = "REQUEST_QUEUE_GET_ITEM_IDS", Fo),
    Go = {},
    qo = (Go.SET_CREDENTIALS = "REQUEST_SET_CREDENTIALS", Go.LOAD_BY_ENTITY = "REQUEST_LOAD_BY_ENTITY", Go.USER_ACTION = "REQUEST_USER_ACTION", Go.DISPLAY_STATUS =
        "REQUEST_DISPLAY_STATUS", Go.CUSTOM_COMMAND = "REQUEST_CUSTOM_COMMAND", Go.FOCUS_STATE = "REQUEST_FOCUS_STATE", Go);

function T() {
    this.ma = null;
    this.A = this.D.bind(this);
    this.C = this.F.bind(this);
    this.u = !1;
    this.l = this.o = this.h = this.g = null;
    this.w = void 0
}
A("cast.framework.breaks.BreakManagerImpl", T);
T.prototype.N = function(a) {
    this.ma = a
};
T.prototype.qb = function(a) {
    this.l = a;
    this.g && this.g.Nh(a)
};
T.prototype.reset = function() {
    this.ma = null;
    this.g && this.g.reset()
};
T.prototype.pc = function() {
    return this.ma ? this.ma.g.slice() : []
};
T.prototype.getBreaks = T.prototype.pc;
T.prototype.Qc = function(a) {
    return this.ma ? this.ma.Qc(a) : null
};
T.prototype.getBreakById = T.prototype.Qc;
T.prototype.oc = function() {
    return this.ma ? this.ma.oc() : []
};
T.prototype.getBreakClips = T.prototype.oc;
T.prototype.Ya = function(a) {
    return this.ma ? this.ma.Ya(a) : null
};
T.prototype.getBreakClipById = T.prototype.Ya;

function Ho(a, b, c) {
    try {
        var d = a(b, c);
        return H(d)
    } catch (e) {
        return ld(e)
    }
}

function Io(a) {
    if (null !== a && !w(a)) throw E(Jo, "Fail to set interceptor since interceptor is not a function"), Error("Fail to set interceptor since interceptor is not a function");
}
T.prototype.M = function(a) {
    a && Io(a);
    this.C = a || this.F.bind(this)
};
T.prototype.Yf = function(a) {
    this.M(a)
};
T.prototype.setBreakSeekInterceptor = T.prototype.Yf;
T.prototype.J = function(a) {
    G(Jo, "break seek interceptor is invoked.");
    return Ho(this.C, a)
};
T.prototype.F = function(a) {
    var b = this;
    a.seekFrom > a.seekTo || a.breaks.reverse();
    var c = a.breaks.find(function(a) {
        return !a.isWatched || b.u
    });
    a.breaks = c ? [c] : [];
    return a
};
T.prototype.L = function(a) {
    a && Io(a);
    this.A = a || this.D.bind(this)
};
T.prototype.Xf = function(a) {
    this.L(a)
};
T.prototype.setBreakClipLoadInterceptor = T.prototype.Xf;
T.prototype.G = function(a, b) {
    var c = this;
    G(Jo, "break clip initialize interceptor is invoked. ");
    return Ho(this.A, a, b).then(function(a) {
        if (!a) return [];
        a instanceof Array || (a = [a]);
        a = a.map(function(a) {
            return c.g && a.vastAdsRequest && !a.contentId ? c.g.tj(a) : [a]
        });
        return pd(a).then(function(a) {
            var b = [];
            a.forEach(function(a) {
                a.Ze ? b.push.apply(b, a.value) : c.ma.ja.dispatchEvent(new Hl(901, Error(a.reason)))
            });
            return b
        })
    })
};
T.prototype.D = function(a) {
    return a
};
T.prototype.Ec = function(a) {
    this.u = a
};
T.prototype.setPlayWatchedBreak = T.prototype.Ec;
T.prototype.sc = function() {
    return this.u
};
T.prototype.getPlayWatchedBreak = T.prototype.sc;
T.prototype.Fc = function(a) {
    null === a || w(a) ? (this.w = a, this.g && this.g.Fc(a)) : E(Jo, "setVastTrackingInterceptor failed since handler is not a function")
};
T.prototype.setVastTrackingInterceptor = T.prototype.Fc;
T.prototype.O = function(a) {
    a = this.Ya(a.breakClipId);
    this.g.wl(a) && this.g.wj(a)
};

function Ko(a) {
    if (a.vmapAdsRequest) return !0;
    if (a.breakClips) {
        a = n(a.breakClips);
        for (var b = a.next(); !b.done; b = a.next())
            if (b = b.value, b.vastAdsRequest && !b.contentId) return !0
    }
    return !1
}
T.prototype.K = function(a) {
    var b = this;
    if (!Ko(a)) return H();
    this.h || (this.h = cast.v.common.xc.zl(), this.h.then(function() {
        b.g = new Lo(b.o);
        b.o.addEventListener("BREAK_CLIP_LOADING", b.O.bind(b));
        b.l && b.g.Nh(b.l);
        void 0 !== b.w && b.g.Fc(b.w)
    }));
    return this.h
};
T.prototype.B = function(a) {
    return this.g ? this.g.vj(a) : (E(Jo, "VastManager hasn't been loaded"), H(null))
};
var Jo = D("cast.framework.breaks.BreakManagerImpl");
A("cast.framework.ui.State", {
    LAUNCHING: "launching",
    IDLE: "idle",
    LOADING: "loading",
    BUFFERING: "buffering",
    PAUSED: "paused",
    PLAYING: "playing"
});
A("cast.framework.ui.ContentType", {
    VIDEO: "video",
    AUDIO: "audio",
    IMAGE: "image"
});

function Mo() {
    this.state = "launching";
    this.isSeeking = !1;
    this.currentTime = this.duration = 0;
    this.media = this.metadata = null;
    this.nextThumbnailUrl = this.nextSubtitle = this.nextTitle = this.thumbnailUrl = this.subtitle = this.title = "";
    this.preloadingNext = !1;
    this.contentType = null;
    this.supportedMediaCommands = 0;
    this.isLive = !1;
    this.sectionDuration = this.sectionStartTimeInMedia = this.mediaStartAbsoluteTime = this.liveSeekableRange = null;
    this.breakPercentagePositions = [];
    this.isBreakSkippable = this.isPlayingBreak = !1;
    this.whenSkippable =
        void 0;
    this.currentBreakClipNumber = this.numberBreakClips = 0;
    this.displayStatus = !1;
    this.displayType = "tv"
}
A("cast.framework.ui.PlayerData", Mo);
cast.v.R.aa = "Changed";
var No = "state" + cast.v.R.aa,
    Oo = "isSeeking" + cast.v.R.aa,
    Po = "duration" + cast.v.R.aa,
    Qo = "currentTime" + cast.v.R.aa,
    Ro = "metadata" + cast.v.R.aa,
    So = "title" + cast.v.R.aa,
    To = "thumbnailUrl" + cast.v.R.aa,
    Uo = "nextTitle" + cast.v.R.aa,
    Vo = "nextSubtitle" + cast.v.R.aa,
    Wo = "nextThumbnailUrl" + cast.v.R.aa,
    Xo = "breakPercentagePositions" + cast.v.R.aa,
    Yo = "isBreakSkippable" + cast.v.R.aa,
    Zo = "whenSkippable" + cast.v.R.aa,
    $o = "numberBreakClips" + cast.v.R.aa,
    ap = "currentBreakClipNumber" + cast.v.R.aa,
    bp = "liveSeekableRange" + cast.v.R.aa,
    cp = "sectionStartTimeInMedia" +
    cast.v.R.aa,
    dp = "sectionDuration" + cast.v.R.aa;
A("cast.framework.ui.PlayerDataEventType", {
    ANY_CHANGE: "*",
    STATE_CHANGED: No,
    IS_SEEKING_CHANGED: Oo,
    DURATION_CHANGED: Po,
    CURRENT_TIME_CHANGED: Qo,
    METADATA_CHANGED: Ro,
    MEDIA_CHANGED: "media" + cast.v.R.aa,
    TITLE_CHANGED: So,
    SUBTITLE_CHANGED: "subtitle" + cast.v.R.aa,
    THUMBNAIL_URL_CHANGED: To,
    NEXT_TITLE_CHANGED: Uo,
    NEXT_SUBTITLE_CHANGED: Vo,
    NEXT_THUMBNAIL_URL_CHANGED: Wo,
    PRELOADING_NEXT_CHANGED: "preloadingNext" + cast.v.R.aa,
    CONTENT_TYPE_CHANGED: "contentType" + cast.v.R.aa,
    SUPPORTED_MEDIA_COMMANDS_CHANGED: "supportedMediaCommands" + cast.v.R.aa,
    IS_LIVE_CHANGED: "isLive" + cast.v.R.aa,
    BREAK_PERCENTAGE_POSITIONS_CHANGED: Xo,
    IS_PLAYING_BREAK_CHANGED: "isPlayingBreak" + cast.v.R.aa,
    IS_BREAK_SKIPPABLE_CHANGED: Yo,
    WHEN_SKIPPABLE_CHANGED: Zo,
    NUMBER_BREAK_CLIPS_CHANGED: $o,
    CURRENT_BREAK_CLIP_NUMBER_CHANGED: ap,
    DISPLAY_STATUS_CHANGED: "displayStatus" + cast.v.R.aa,
    DISPLAY_TYPE_CHANGED: "displayType" + cast.v.R.aa,
    LIVE_SEEKABLE_RANGE_CHANGED: bp,
    MEDIA_START_ABSOLUTE_TIME_CHANGED: "mediaStartAbsoluteTime" + cast.v.R.aa,
    SECTION_START_TIME_IN_MEDIA_CHANGED: cp,
    SECTION_DURATION_CHANGED: dp
});

function ep(a, b, c) {
    this.type = a;
    this.field = b;
    this.value = c
}
A("cast.framework.ui.PlayerDataChangedEvent", ep);
cast.v.R.P = D("cast.framework.ui");
cast.v.R.tl = function(a) {
    var b = document.getElementsByTagName("cast-media-player")[0];
    if (b) {
        var c = document.getElementsByClassName("castSplashScreen")[0];
        cast.v.R.ul(b, a, document.getElementsByClassName("castWelcomeScreen")[0] || c)
    }
};
cast.v.R.ul = function(a, b, c) {
    c = void 0 === c ? null : c;
    var d = cast.v.R.P;
    c && (G(d, "remove welcome screen"), c.remove());
    a.h.setAttribute("state", "idle");
    fp(a, b)
};

function gp() {}

function V(a) {
    if (!(a instanceof gp)) throw E(hp, "CastReceiverContext is a singleton.Please call CastReceiverContext.getInstance() instead."), Error("CastReceiverContext is not created properly.");
    He || (He = new Fe);
    He && Ge();
    cast.receiver.nb.u(cast.qg ? 0 : 1E3);
    G(hp, "Version: " + cast.v.VERSION);
    cast.v.common.ea.Al();
    this.h = re.H();
    this.u = new T;
    this.l = new S(new mo(this.u));
    this.u.o = this.l;
    this.g = null;
    this.o = !1
}
A("cast.framework.CastReceiverContext", V);
V.prototype.reset = function() {
    this.g = null;
    this.o = !1
};
V.prototype.oh = function(a) {
    a = void 0 === a ? !1 : a;
    this.o || (Xi("Cast.CAF.UseLegacy", a), cast.v.common.xc.load(a), this.o = !0)
};
V.prototype.loadPlayerLibraries = V.prototype.oh;
V.prototype.initialize = function() {
    this.g.Am && (this.h = this.g.Am);
    this.g.ym && (this.l = this.g.ym);
    this.g.playbackConfig && this.l.Oh(this.g.playbackConfig);
    this.g.preferredPlaybackRate && (this.l.F = this.g.preferredPlaybackRate);
    this.g.preferredTextLanguage && (this.l.D = this.g.preferredTextLanguage);
    this.g.zm && (this.l.N = this.g.zm);
    if (this.g.customNamespaces)
        for (var a in this.g.customNamespaces) this.g.customNamespaces.hasOwnProperty(a) && se(this.h, a, cast.v.I.Wh(this.g.customNamespaces[a]));
    this.l.Ec(!!this.g.playWatchedBreak);
    a = this.h;
    a.T = this.A.bind(this);
    a.V = this.C.bind(this);
    a.O = this.w.bind(this);
    this.oh(this.g.useLegacyDashSupport)
};

function ip() {
    var a = document.getElementsByTagName("video"),
        b = document.getElementsByTagName("audio"),
        c = jp();
    if (0 == a.length && 0 == b.length && !c) return F(hp, "MediaElement is not created yet"), null;
    if (c) return c.getMediaElement();
    c = n(a);
    for (var d = c.next(); !d.done; d = c.next())
        if (d = d.value, d.classList && d.classList.contains("castMediaElement")) return d;
    c = n(b);
    for (d = c.next(); !d.done; d = c.next())
        if (d = d.value, d.classList && d.classList.contains("castMediaElement")) return d;
    return 0 < a.length ? a[0] : b[0]
}

function jp() {
    var a = document.getElementsByTagName("cast-media-player");
    return 0 < a.length ? a[0] : null
}
V.prototype.Wk = function() {
    return this.l
};
V.prototype.getPlayerManager = V.prototype.Wk;
V.prototype.getSenders = function() {
    var a = this;
    return this.h.getSenders().map(function(b) {
        return cast.v.I.Mg(a.h.Qd(b))
    })
};
V.prototype.getSenders = V.prototype.getSenders;
V.prototype.Qd = function(a) {
    return cast.v.I.Mg(this.h.Qd(a))
};
V.prototype.getSender = V.prototype.Qd;
V.prototype.start = function(a) {
    G(hp, "start");
    a || (a = new Uk);
    if (this.g) throw Error("Cast receiver options already provided");
    this.g = a;
    this.initialize();
    var b = {
        addEventListener: v
    };
    a = a.fo || new Dg(this.g.mediaElement || b, this.g.supportedCommands || void 0, this.g.localSenderId || void 0);
    r(this.g.queue) && (Zi("Cast.CAF.Queue"), a.$f(cast.v.I.Nm(this.g.queue)));
    b = this.l;
    b.l = a;
    b.G.h = a;
    b.B.h = a;
    a.kd = b.hm.bind(b);
    a.gd = b.fm.bind(b);
    a.ld = b.im.bind(b);
    a.fd = b.em.bind(b);
    a.Re = b.Sl.bind(b);
    a.Gf = v;
    a.hd = b.gm.bind(b);
    a.nd = b.tm.bind(b);
    a.Ke = b.Hf.bind(b);
    cl(b.g, "load", a.gd.bind(a));
    a.gd = b.g.g;
    cl(b.g, "preload", a.ld.bind(a));
    a.ld = b.g.g;
    cl(b.g, "precache", a.kd.bind(a));
    a.kd = b.g.g;
    cl(b.g, "cancelpreload", a.fd.bind(a));
    a.fd = b.g.g;
    cl(b.g, "stop", a.ie.bind(a));
    a.ie = b.g.g;
    cl(b.g, "pause", a.Ta.bind(a));
    a.Ta = b.g.g;
    cl(b.g, "play", a.Ua.bind(a));
    a.Ua = b.g.g;
    cl(b.g, "skipad", a.nd.bind(a));
    a.nd = b.g.g;
    cl(b.g, "seek", a.Va.bind(a));
    a.Va = b.g.g;
    cl(b.g, "setplaybackrate", a.ge.bind(a));
    a.ge = b.g.g;
    cl(b.g, "setvolume", a.he.bind(a));
    a.he = b.g.g;
    cl(b.g, "getstatus",
        a.ae.bind(a));
    a.ae = b.g.g;
    cl(b.g, "editaudiotracks", a.Zd.bind(a));
    a.Zd = b.g.g;
    cl(b.g, "edittracksinfo", a.$d.bind(a));
    a.$d = b.g.g;
    cl(b.g, "queueload", a.de.bind(a));
    a.de = b.g.g;
    cl(b.g, "queueinsert", a.ce.bind(a));
    a.ce = b.g.g;
    cl(b.g, "queueupdate", a.md.bind(a));
    a.md = b.g.g;
    cl(b.g, "queueremove", a.ee.bind(a));
    a.ee = b.g.g;
    cl(b.g, "queuereorder", a.fe.bind(a));
    a.fe = b.g.g;
    a.Zh = !0;
    b = b.Ca;
    b.g = a;
    b.g.M = b.h;
    (a = this.g.mediaElement || ip()) && this.l.qb(a);
    b = jp();
    a = this.h;
    b = !!(this.g.uiConfig && this.g.uiConfig.touchScreenOptimizedApp ||
        this.g.touchScreenOptimizedApp || b);
    a.wc() ? E(Le, "initTouchScreenOptimizedApp() method cannot be called after CastReceiverManager.start() has been called") : (r(b) || E(Le, "setTouchScreenOptimizedApp() has to be called with 1 required argument"), Oe(a, b));
    this.h.start(cast.v.I.Qm(this.g));
    return this
};
V.prototype.start = V.prototype.start;
V.prototype.stop = function() {
    this.h.stop()
};
V.prototype.stop = V.prototype.stop;
V.prototype.wc = function() {
    return this.h.wc()
};
V.prototype.isSystemReady = V.prototype.wc;
V.prototype.jf = function() {
    return cast.v.I.Lk(this.h.jf())
};
V.prototype.getVisibilityState = V.prototype.jf;
V.prototype.ff = function() {
    return cast.v.I.Gk(this.h.ff())
};
V.prototype.getStandbyState = V.prototype.ff;
V.prototype.Rd = function() {
    return cast.v.I.Hk(this.h.Rd())
};
V.prototype.getSystemState = V.prototype.Rd;
V.prototype.Pc = function() {
    return cast.v.I.Lg(this.h.Pc())
};
V.prototype.getApplicationData = V.prototype.Pc;
V.prototype.qd = function(a) {
    this.h.qd(a)
};
V.prototype.setApplicationState = V.prototype.qd;
V.prototype.ag = function(a) {
    this.h.ag(a)
};
V.prototype.setSystemVolumeLevel = V.prototype.ag;
V.prototype.bg = function(a) {
    this.h.bg(a)
};
V.prototype.setSystemVolumeMuted = V.prototype.bg;
V.prototype.Wc = function() {
    return cast.v.I.Ik(this.h.Wc())
};
V.prototype.getSystemVolume = V.prototype.Wc;
V.prototype.qe = function(a) {
    this.h.qe(a)
};
V.prototype.setInactivityTimeout = V.prototype.qe;
V.prototype.ne = function(a) {
    this.h.ne(a)
};
V.prototype.sendFeedbackMessage = V.prototype.ne;

function kp(a, b) {
    return se(a.h, b, cast.v.I.Wh(a.g && a.g.customNamespaces && a.g.customNamespaces[b] || "JSON"))
}
V.prototype.rj = function(a, b) {
    a = kp(this, a);
    if (!w(b)) throw Error("listener on custom channel should be a function");
    a.l = b
};
V.prototype.addCustomMessageListener = V.prototype.rj;
V.prototype.Bm = function(a) {
    kp(this, a).l = null
};
V.prototype.removeCustomMessageListener = V.prototype.Bm;
V.prototype.Cm = function(a, b, c) {
    r(b) || (b = "*:*");
    kp(this, a).send(b, c)
};
V.prototype.sendCustomMessage = V.prototype.Cm;
V.prototype.A = function(a) {
    G(hp, "onSenderDisconnected");
    if (r(a.senderId) && r(a.reason)) {
        var b = a.userAgent.split(","),
            c = 0 == this.h.getSenders().length;
        a = "requested_by_sender" == a.reason;
        var d = b[1];
        b = "iOS CastSDK" == b[0] && 0 >= fb(d, "2.2.0") && "0.0.0" != d;
        c && a && !b && this.stop()
    } else G(hp, "SenderDisconnectedEvent is corrupted")
};
V.prototype.C = function(a) {
    G(hp, "onVisibilityChanged");
    r(a.isVisible) ? a.isVisible || "IDLE" === this.l.Uc() || this.l.pause() : G(hp, "VisibilityChangedEvent is corrupted")
};
V.prototype.w = function() {
    G(hp, "onReady");
    cast.v.common.Jm(this.l, this.stop.bind(this));
    var a = this.l;
    a.addEventListener("PLAYER_LOADING", this.D.bind(this));
    a.addEventListener("MEDIA_FINISHED", this.B.bind(this));
    cast.v.R.tl(cast.v.I.Lg(this.h.Pc()))
};
V.prototype.addEventListener = function(a, b) {
    this.h.addEventListener(a, b)
};
V.prototype.addEventListener = V.prototype.addEventListener;
V.prototype.removeEventListener = function(a, b) {
    this.h.removeEventListener(a, b)
};
V.prototype.removeEventListener = V.prototype.removeEventListener;
V.prototype.B = function() {
    this.h.qd("")
};
V.prototype.D = function(a) {
    (a = a.media.metadata) && a.title && this.h.qd("Casting: " + a.title)
};
V.prototype.Rc = function() {
    return this.h.Rc()
};
V.prototype.getDeviceCapabilities = V.prototype.Rc;
V.prototype.canDisplayType = function(a, b, c, d, e) {
    return this.h.canDisplayType(a, b, c, d, e)
};
V.prototype.canDisplayType = V.prototype.canDisplayType;
V.prototype.setLoggerLevel = function(a) {
    cast.receiver.nb.u(a)
};
V.prototype.setLoggerLevel = V.prototype.setLoggerLevel;

function lp() {
    mp || (mp = new V(new gp));
    return mp
}
V.getInstance = lp;
var mp = null,
    hp = D("cast.framework.Application");

function np() {
    this.g = qd();
    this.h = od([Ed(), this.g.g])
}
np.prototype.then = function(a) {
    this.h.then(a)
};
np.prototype.resolve = function() {
    this.g.resolve()
};
cast.v.ra.category = {};
cast.v.ra.category.dj = "REQUEST_SEEK REQUEST_LOAD REQUEST_STOP REQUEST_PAUSE REQUEST_PLAY REQUEST_PLAY_AGAIN REQUEST_PLAYBACK_RATE_CHANGE REQUEST_VOLUME_CHANGE REQUEST_EDIT_TRACKS_INFO REQUEST_EDIT_AUDIO_TRACKS REQUEST_SET_CREDENTIALS REQUEST_SKIP_AD REQUEST_LOAD_BY_ENTITY REQUEST_USER_ACTION REQUEST_DISPLAY_STATUS REQUEST_CUSTOM_COMMAND REQUEST_FOCUS_STATE REQUEST_PRECACHE REQUEST_QUEUE_LOAD REQUEST_QUEUE_INSERT REQUEST_QUEUE_UPDATE REQUEST_QUEUE_REMOVE REQUEST_QUEUE_REORDER REQUEST_QUEUE_GET_ITEM_RANGE REQUEST_QUEUE_GET_ITEMS REQUEST_QUEUE_GET_ITEM_IDS".split(" ");
A("cast.framework.events.category.REQUEST", cast.v.ra.category.dj);
cast.v.ra.category.mi = "REQUEST_SEEK REQUEST_LOAD REQUEST_STOP REQUEST_PAUSE REQUEST_PLAY REQUEST_PLAY_AGAIN REQUEST_PLAYBACK_RATE_CHANGE REQUEST_PRECACHE REQUEST_SKIP_AD REQUEST_VOLUME_CHANGE REQUEST_EDIT_TRACKS_INFO REQUEST_EDIT_AUDIO_TRACKS REQUEST_SET_CREDENTIALS REQUEST_LOAD_BY_ENTITY REQUEST_USER_ACTION REQUEST_DISPLAY_STATUS REQUEST_CUSTOM_COMMAND REQUEST_FOCUS_STATE REQUEST_QUEUE_LOAD REQUEST_QUEUE_INSERT REQUEST_QUEUE_UPDATE REQUEST_QUEUE_REMOVE REQUEST_QUEUE_REORDER REQUEST_QUEUE_GET_ITEM_RANGE REQUEST_QUEUE_GET_ITEMS REQUEST_QUEUE_GET_ITEM_IDS BREAK_ENDED BREAK_STARTED BREAK_CLIP_ENDED BREAK_CLIP_LOADING BREAK_CLIP_STARTED BUFFERING ERROR LIVE_ENDED LIVE_IS_MOVING_WINDOW_CHANGED MEDIA_FINISHED MEDIA_STATUS MEDIA_INFORMATION_CHANGED PAUSE PLAYER_LOADING PLAYER_LOAD_COMPLETE PLAYER_PRELOADING PLAYER_PRELOADING_CANCELLED PLAYING RATE_CHANGE SEEKED SEEKING".split(" ");
A("cast.framework.events.category.CORE", cast.v.ra.category.mi);
cast.v.ra.category.DEBUG = "ABORT BITRATE_CHANGED CAN_PLAY CAN_PLAY_THROUGH CLIP_STARTED CLIP_ENDED CACHE_LOADED CACHE_HIT CACHE_INSERTED DURATION_CHANGE EMPTIED EMSG ENDED ID3 LOADED_DATA LOADED_METADATA LOAD_START PLAY STALLED INBAND_TRACK_ADDED WAITING".split(" ");
A("cast.framework.events.category.DEBUG", cast.v.ra.category.DEBUG);
cast.v.ra.category.yi = ["SEGMENT_DOWNLOADED", "PROGRESS", "SUSPEND", "TIME_UPDATE"];
A("cast.framework.events.category.FINE", cast.v.ra.category.yi);

function op(a) {
    this.F = lp();
    this.h = this.F.l;
    this.A = new il;
    this.l = null;
    this.w = 0;
    this.g = pp(this, a);
    qp(this);
    this.C = this.B = this.D = this.u = this.o = null;
    rp(this)
}
A("cast.framework.ui.PlayerDataBinder", op);

function pp(a, b) {
    return new window.Proxy(b, {
        set: function(b, d, e) {
            if (e === b[d] && "object" != typeof e) return !0;
            b[d] = e;
            a.A.dispatchEvent(new ep(d + cast.v.R.aa, d, e));
            return !0
        }
    })
}
op.prototype.addEventListener = function(a, b) {
    this.A.addEventListener(a, b)
};
op.prototype.addEventListener = op.prototype.addEventListener;
op.prototype.removeEventListener = function(a, b) {
    this.A.removeEventListener(a, b)
};
op.prototype.removeEventListener = op.prototype.removeEventListener;

function sp(a, b) {
    b = (a.g.media = b) || new Kj;
    a: {
        switch ((b.contentType || "").toLowerCase().split("/")[0]) {
            case "image":
                var c = "image";
                break a;
            case "audio":
                c = "audio";
                break a
        }
        c = "video"
    }
    a.g.contentType = c;
    a.g.isLive = "LIVE" == b.streamType;
    a.g.metadata = b.metadata || null;
    c = b.metadata || {};
    a.g.title = c.title || "";
    a.g.subtitle = c.subtitle || "";
    c = c.images;
    a.g.thumbnailUrl = c && c[0] && c[0].url || "";
    a.w = 0;
    tp(a);
    up(a, b)
}

function vp(a, b) {
    b ? (a.g.preloadingNext = !0, a.g.nextTitle = b.title || "", a.g.nextSubtitle = b.subtitle || "", a.g.nextThumbnailUrl = b.images && b.images[0] && b.images[0].url || "") : (a.g.preloadingNext = !1, a.g.nextTitle = "", a.g.nextSubtitle = "", a.g.nextThumbnailUrl = "")
}

function wp(a, b) {
    return a && u(b) && !isNaN(b) && 0 != b ? a.map(function(a) {
        return 0 > a.position ? 100 : Math.min(100, a.position / b * 100)
    }) : []
}

function rp(a) {
    a.h.addEventListener("MEDIA_FINISHED", function() {
        xp(a);
        yp(a, "idle")
    });
    a.h.addEventListener("PLAYER_LOADING", function(b) {
        sp(a, b.media);
        "image" === a.g.contentType ? yp(a, "playing") : yp(a, "loading")
    });
    a.h.addEventListener("PLAYER_LOAD_COMPLETE", function(b) {
        if (b = b.media) a.g.isLive = "LIVE" == b.streamType, up(a, b), a.g.isLive && (a.g.liveSeekableRange = a.h.Ra(), null == a.u && a.g.liveSeekableRange && 0 < a.g.liveSeekableRange.end - a.g.liveSeekableRange.start && (zp(a), Ap(a)))
    });
    a.h.addEventListener("MEDIA_INFORMATION_CHANGED",
        function(b) {
            sp(a, b.media)
        });
    a.h.addEventListener("PLAYING", function() {
        return yp(a, "playing")
    });
    a.h.addEventListener("PAUSE", function(b) {
        b.ended ? vp(a, void 0) : yp(a, "paused")
    });
    a.h.addEventListener("BUFFERING", function(b) {
        b.isBuffering ? yp(a, "buffering") : "buffering" === a.g.state && yp(a, "playing")
    });
    a.h.addEventListener("SEEKING", function() {
        a.g.isSeeking = !0;
        Bp(a, Cp(a));
        Dp(a);
        vp(a, void 0)
    });
    a.h.addEventListener("SEEKED", function() {
        a.g.isSeeking = !1;
        Bp(a, Cp(a));
        Dp(a)
    });
    a.h.addEventListener("BREAK_STARTED",
        function(b) {
            return Ep(a, b)
        });
    a.h.addEventListener("BREAK_ENDED", function(b) {
        return Ep(a, b)
    });
    a.h.addEventListener("BREAK_CLIP_LOADING", function(b) {
        return Ep(a, b)
    });
    a.h.addEventListener("BREAK_CLIP_STARTED", function(b) {
        return Ep(a, b)
    });
    a.h.addEventListener("BREAK_CLIP_ENDED", function(b) {
        return Ep(a, b)
    });
    a.h.addEventListener("DURATION_CHANGE", function() {
        return Dp(a)
    });
    a.h.addEventListener("TIME_UPDATE", function() {
        return Dp(a)
    });
    a.h.addEventListener("REQUEST_DISPLAY_STATUS", function() {
        "video" === a.g.contentType &&
            Fp(a)
    });
    a.h.addEventListener("REQUEST_PLAY", function() {
        "video" === a.g.contentType && "playing" === a.g.state && Fp(a)
    });
    a.h.addEventListener("PLAYER_PRELOADING", function(b) {
        vp(a, b.media.metadata)
    });
    a.h.addEventListener("MEDIA_STATUS", function(b) {
        if (b.mediaStatus) {
            b = b.mediaStatus;
            if (b.liveSeekableRange) {
                var c = b.liveSeekableRange;
                a.g.isLive && (xp(a), a.g.liveSeekableRange = c, zp(a), Ap(a))
            }
            u(b.supportedMediaCommands) && (a.g.supportedMediaCommands = b.supportedMediaCommands)
        }
    });
    bf(a.F.h).then(function(b) {
        a.g.displayType =
            b ? "touch" : "tv"
    })
}

function Cp(a) {
    if ("audio" === a.g.contentType) switch (a.g.state) {
        case "playing":
        case "loading":
        case "buffering":
        case "paused":
            return !0;
        default:
            return !1
    }
    if ("video" === a.g.contentType) switch (a.g.state) {
        case "loading":
        case "buffering":
            return !0;
        case "playing":
        case "paused":
            return a.g.isSeeking
    }
    return !1
}

function yp(a, b) {
    a.g.state != b && (a.g.state = b, "video" === a.g.contentType && "paused" === b ? Fp(a) : Bp(a, Cp(a)))
}

function Ep(a, b) {
    "BREAK_STARTED" == b.type ? a.g.isPlayingBreak = !0 : "BREAK_ENDED" == b.type && (a.g.isPlayingBreak = !1);
    a.g.isPlayingBreak ? (a.g.numberBreakClips = b.total || 0, a.g.currentBreakClipNumber = b.index || 0, a.l = b) : a.l = null
}

function up(a, b) {
    a.g.mediaStartAbsoluteTime = b.startAbsoluteTime || null;
    b.metadata && (a.g.sectionStartTimeInMedia = 0 == b.metadata.sectionStartTimeInMedia || b.metadata.sectionStartTimeInMedia ? b.metadata.sectionStartTimeInMedia : null, a.g.sectionDuration = b.metadata.sectionDuration || null)
}

function Ap(a) {
    var b = y() / 1E3 - a.D;
    a.g.liveSeekableRange.isMovingWindow && (a.g.liveSeekableRange.start = a.B + b);
    a.g.liveSeekableRange.isLiveDone || (a.g.liveSeekableRange.end = a.C + b);
    a.A.dispatchEvent(new ep(bp, "liveSeekableRange", a.g.liveSeekableRange));
    a.u = setTimeout(function() {
        Ap(a)
    }, 500)
}

function zp(a) {
    a.B = a.g.liveSeekableRange.start;
    a.C = a.g.liveSeekableRange.end;
    a.D = y() / 1E3
}

function xp(a) {
    null != a.u && (clearTimeout(a.u), a.u = null, a.D = null, a.B = null, a.C = null)
}

function Dp(a) {
    a.g.isPlayingBreak ? (a.g.duration = a.h.Kd() || 0, a.g.currentTime = a.h.xb() || 0) : (a.g.duration = a.h.getDurationSec() || 0, a.g.currentTime = a.h.getCurrentTimeSec() || 0);
    tp(a);
    if (a.l && u(a.l.whenSkippable)) {
        var b = a.l.whenSkippable - a.g.currentTime;
        0 < b ? (a.g.isBreakSkippable = !1, a.g.whenSkippable = b) : (a.g.whenSkippable = 0, a.g.isBreakSkippable = !0)
    } else a.g.whenSkippable = void 0, a.g.isBreakSkippable = !1
}

function tp(a) {
    a.g.isPlayingBreak ? (a.g.breakPercentagePositions = [], a.w = 0) : a.w != a.g.duration && (a.g.breakPercentagePositions = wp(a.h.pc(), a.g.duration), a.w = a.g.duration)
}

function Bp(a, b) {
    null !== a.o && (clearTimeout(a.o), a.o = null);
    a.g.displayStatus = b
}

function Fp(a) {
    Bp(a, !0);
    a.o = setTimeout(function() {
        a.g.displayStatus = Cp(a);
        a.o = null
    }, 5E3)
}

function qp(a) {
    var b = Gp;
    if (b) {
        var c = a.g;
        Object.keys(b).forEach(function(a) {
            return c[a] = b[a]
        })
    } else a.g.supportedMediaCommands = a.h.tc()
}
var Gp = new Mo;
new op(Gp);
D("cast.framework.ui.PlayerDataBinder");
var Hp = {},
    Ip = (Hp.launching = "IDLE", Hp.idle = "IDLE", Hp.loading = "LOADING", Hp.buffering = "BUFFERING", Hp.paused = "PAUSED", Hp.playing = "PLAYING", Hp);

function Jp() {
    Yh.call(this);
    var a = this;
    this.D = new Mo;
    this.B = new op(this.D);
    this.B.addEventListener(Qo, function() {
        "playing" === a.D.state && a.g.Wb(a.D.currentTime)
    });
    this.B.addEventListener(Ro, function(b) {
        ii(a, b.value)
    });
    this.B.addEventListener(No, function(b) {
        Wh(a.g, Ip[b.value] || "IDLE")
    });
    window.document.querySelector("cast-media-player") && this.g.la.g.classList.toggle("hidden-audio-scrim", !0)
}
p(Jp, Yh);
Jp.prototype.ec = function(a, b) {
    ai(this, a, b)
};
ya(Jp);

function Kp() {
    var a = this;
    this.l = re.H();
    this.g = null;
    this.h = qd();
    cf(this.l).then(function(b) {
        b ? (a.g = Jp.H(), a.h.resolve(!0)) : a.h.resolve(!1)
    })
}
A("cast.framework.ui.Controls", Kp);
Kp.prototype.ec = function(a, b) {
    var c = this;
    Lp(this, function() {
        c.g.ec(a, b)
    })
};
Kp.prototype.assignButton = Kp.prototype.ec;
Kp.prototype.Le = function() {
    var a = this;
    Lp(this, function() {
        a.g.Le()
    })
};
Kp.prototype.clearDefaultSlotAssignments = Kp.prototype.Le;
Kp.prototype.Zb = function(a) {
    var b = this;
    Lp(this, function() {
        b.g.Zb(a)
    })
};
Kp.prototype.setScrubberVisibility = Kp.prototype.Zb;

function Lp(a, b) {
    a.h.g.then(function(c) {
        c && b.call(a)
    })
}
Kp.prototype.bl = function() {
    var a = window.document.createElement("div");
    a.style.position = "absolute";
    a.style.visibility = "hidden";
    a.style.left = "-1000px";
    a.style.setProperty("height", "var(--cast-controls-safe-area-height)");
    window.document.body.appendChild(a);
    var b = parseInt(window.getComputedStyle(a, null).height, 10);
    a.remove();
    return b
};
Kp.prototype.getSafeAreaHeight = Kp.prototype.bl;
ya(Kp);
Kp.getInstance = Kp.H;
window.document.addEventListener("DOMContentLoaded", function() {
    Kp.H()
});
A("cast.framework.ui.ControlsButton", {
    QUEUE_NEXT: "queue-next",
    QUEUE_PREV: "queue-prev",
    SEEK_FORWARD_10: "seek-forward-10",
    SEEK_FORWARD_15: "seek-forward-15",
    SEEK_FORWARD_30: "seek-forward-30",
    SEEK_BACKWARD_10: "seek-backward-10",
    SEEK_BACKWARD_15: "seek-backward-15",
    SEEK_BACKWARD_30: "seek-backward-30",
    CAPTIONS: "captions",
    NO_BUTTON: "no-button",
    REPEAT: "repeat",
    SHUFFLE: "shuffle",
    LIKE: "like",
    DISLIKE: "dislike",
    PLAYBACK_RATE: "playback-rate"
});
A("cast.framework.ui.ControlsSlot", {
    SLOT_1: "slot-1",
    SLOT_2: "slot-2",
    SLOT_3: "slot-3",
    SLOT_4: "slot-4"
});

function Mp(a) {
    this.o = a;
    this.B = window.getComputedStyle(this.o)
}
Mp.prototype.start = function() {
    var a = this;
    this.g = Np(this);
    2 > this.g.length || (this.u = Op(this, "--animation-duration"), this.w = Math.max(Op(this, "--interval-duration"), this.u), 0 < this.w && (this.A = setInterval(function() {
        return a.next()
    }, this.w)))
};
Mp.prototype.stop = function() {
    clearInterval(this.A);
    this.A = void 0;
    clearInterval(this.C);
    this.C = void 0;
    for (var a = n(this.g), b = a.next(); !b.done; b = a.next()) b.value.classList.remove("visible", "top");
    this.h = void 0
};
Mp.prototype.next = function() {
    this.l = this.h;
    this.h = void 0 === this.h ? 0 : (this.h + 1) % this.g.length;
    this.g[this.h].classList.add("top", "visible");
    void 0 !== this.l && this.g[this.l].classList.remove("top");
    Pp(this)
};

function Pp(a) {
    a.C = setTimeout(function() {
        void 0 !== a.l && a.g[a.l].classList.remove("visible")
    }, a.u)
}

function Np(a) {
    return a.o && a.o.children ? Array.from(a.o.children).filter(function(a) {
        var b = window.getComputedStyle(a).backgroundImage;
        if (b && "none" !== b) return a
    }) : []
}

function Op(a, b) {
    a = a.B.getPropertyValue(b) || "";
    a = a.toLocaleLowerCase().trim();
    var c = parseFloat(a);
    switch (a.replace(/[-+.0-9]/g, "").trim()) {
        case "ms":
            return c;
        case "s":
            return 1E3 * c;
        default:
            return E(Qp, "Cannot parse value " + a + " of CSS style " + b), 0
    }
}
var Qp = D("cast.framework.ui.SlideshowManager");

function Rp() {
    var a = HTMLElement.call(this) || this;
    a.pd = null;
    return a
}
p(Rp, HTMLElement);
Rp.prototype.getMediaElement = function() {
    return this.G
};
Rp.prototype.getMediaElement = Rp.prototype.getMediaElement;

function fp(a, b) {
    if (b) {
        var c = a.h.querySelector(".logo"),
            d = window.getComputedStyle(c, null);
        "none" == d.backgroundImage && (c.textContent = b.name);
        c = a.h.querySelector(".splash");
        "none" == window.getComputedStyle(c, null).backgroundImage && ("none" == d.backgroundImage ? c.textContent = b.name : c.classList.add("logo"));
        var e = a.h.querySelector(".playback-logo");
        "none" === window.getComputedStyle(e, null).backgroundImage && (b.iconUrl ? (d = new Image, d.src = b.iconUrl, d.decode().then(function() {
            e.style.backgroundImage = "url('" + b.iconUrl +
                "')";
            e.classList.add("app-icon")
        }, function() {
            e.textContent = b.name
        })) : e.textContent = b.name);
        Sp(a, a.shadowRoot.getElementById("castSlideshowElement"))
    }
}

function Sp(a, b) {
    a.C = new Mp(b);
    a.C.start()
}

function Tp(a, b) {
    b ? a.style.content = 'url("' + b.replace(/"/g, '\\"') + '")' : a.style.removeProperty("content")
}

function Up(a, b) {
    if (b) {
        var c = document.createElement("span");
        c.innerText = b;
        a.appendChild(c)
    }
}

function Vp(a) {
    if (a.g.sectionDuration) var b = a.g.sectionDuration;
    else 0 < a.g.duration ? (b = a.g.duration, a.g.sectionStartTimeInMedia && (b -= a.g.sectionStartTimeInMedia)) : b = -1;
    a.L.innerText = 0 < b ? Wp(b) : ""
}

function Wp(a) {
    var b = Math.floor(a);
    a = eb(b % 60, 2);
    b = Math.floor(b / 60);
    a = eb(b % 60, 2) + ":" + a;
    b = Math.floor(b / 60);
    0 < b && (a = eb(b, 2) + ":" + a);
    return a
}

function Xp(a, b, c) {
    a.g.sectionStartTimeInMedia && (b -= a.g.sectionStartTimeInMedia);
    a.g.sectionDuration ? c = a.g.sectionDuration : 0 >= c && (a.g.liveSeekableRange && u(a.g.liveSeekableRange.end) && u(a.g.liveSeekableRange.start) && 0 < a.g.liveSeekableRange.end - a.g.liveSeekableRange.start ? (c = a.g.liveSeekableRange.end, a.g.sectionStartTimeInMedia && (c -= a.g.sectionStartTimeInMedia)) : c = b);
    0 >= c ? G(Yp, "duration is wrong.") : (c = 100 * b / c, a.M.innerText = Wp(b), a.$.style.left = c + "%", a.g.isLive || (a.X.style.width = c + "%"))
}

function Zp(a) {
    var b = "";
    a.g.isBreakSkippable ? b = Wp(a.g.duration - a.g.currentTime) : a.g.whenSkippable && (b = cast.v.Y.Mk(a.g.whenSkippable.toFixed(0)));
    a.u.innerText = b
}

function $p(a, b) {
    for (var c = n(a.F.querySelectorAll(".breakMarker")), d = c.next(); !d.done; d = c.next()) d.value.remove();
    b && b.forEach(function(b) {
        var c = document.createElement("div");
        c.classList.add("breakMarker");
        c.style.left = b + "%";
        a.F.appendChild(c)
    })
}
Rp.prototype.createdCallback = function() {
    this.createShadowRoot().innerHTML = cast.v.pi
};
Rp.prototype.attachedCallback = function() {
    this.h = this.shadowRoot.getElementById("castPlayer");
    this.G = this.shadowRoot.getElementById("castMediaElement");
    this.K = this.shadowRoot.getElementById("castMetadataTitle");
    this.l = this.shadowRoot.getElementById("castMetadataSubtitle");
    this.o = this.shadowRoot.getElementById("castMetadataSubtitle2");
    this.ca = this.shadowRoot.getElementById("castMetadataImage");
    this.F = this.shadowRoot.getElementById("castControlsProgress");
    this.X = this.shadowRoot.getElementById("castControlsProgressInner");
    this.A = this.shadowRoot.getElementById("castControlsSeekable");
    this.w = this.shadowRoot.getElementById("castControlsSeekablePlayed");
    this.$ = this.shadowRoot.getElementById("castControlsProgressThumb");
    this.L = this.shadowRoot.getElementById("castControlsTotalTime");
    this.M = this.shadowRoot.getElementById("castControlsCurTime");
    this.B = this.shadowRoot.getElementById("castBreakPosition");
    this.u = this.shadowRoot.getElementById("castBreakTime");
    this.hasAttribute("crossorigin") && "" !== this.getAttribute("crossorigin") &&
        this.getMediaElement().setAttribute("crossorigin", this.getAttribute("crossorigin"));
    this.D = this.shadowRoot.getElementById("nextMetadataCountdown");
    this.T = this.shadowRoot.getElementById("nextMetadataTitle");
    this.N = this.shadowRoot.getElementById("nextMetadataSubtitle");
    this.O = this.shadowRoot.getElementById("nextMetadataImage");
    this.g = new Mo;
    this.J = new op(this.g);
    this.J.addEventListener("*", this.V.bind(this));
    var a = this.g,
        b;
    for (b in a) this.h.setAttribute(b, a[b]);
    aq(this)
};

function aq(a) {
    Array.prototype.forEach.call(a.h.getElementsByClassName("breakIcon"), function(a) {
        return a.dataset.adLabel = cast.v.Y.Pi
    });
    Array.prototype.forEach.call(a.h.getElementsByClassName("breakSkip"), function(a) {
        return a.dataset.skipAdLabel = cast.v.Y.Wi
    });
    Array.prototype.forEach.call(a.h.getElementsByClassName("liveLabel"), function(a) {
        return a.dataset.liveLabel = cast.v.Y.Si
    })
}

function bq(a, b) {
    b ? (a.h.setAttribute("isSeeking", !0), a.pd = new np, a.pd.then(function() {
        a.h.setAttribute("isSeeking", !1)
    })) : a.pd && (a.pd.resolve(), a.pd = null)
}
Rp.prototype.V = function(a) {
    if (this.C) {
        var b = this.C;
        b.stop();
        "idle" === a.value && b.start()
    }
    a.type != Oo && this.h.setAttribute(a.field, a.value);
    switch (a.type) {
        case Oo:
            bq(this, !!a.value);
            break;
        case To:
            a = String(a.value);
            Tp(this.ca, a);
            a ? this.h.style.setProperty("--album-art-image", 'url("' + encodeURI(a) + '")') : this.h.style.removeProperty("--album-art-image");
            break;
        case So:
            this.K.innerText = String(a.value);
            break;
        case Ro:
            a = a.value;
            this.l.innerHTML = "";
            this.o.innerHTML = "";
            if (a) switch (a.metadataType) {
                case 1:
                    Up(this.l,
                        a.subtitle);
                    Up(this.o, a.studio);
                    (a = a.releaseDate) && Up(this.o, a.substr(0, 4));
                    break;
                case 2:
                    (a.season || a.episode) && Up(this.l, cast.v.Y.Ok(a.season, a.episode));
                    (b = a.originalAirdate) && Up(this.l, b.substr(0, 4));
                    Up(this.o, a.seriesTitle);
                    break;
                case 3:
                    Up(this.l, a.albumArtist || a.artist || a.composer);
                    Up(this.o, a.albumName);
                    break;
                default:
                    a.subtitle && (this.l.innerText = a.subtitle)
            }
            break;
        case Po:
        case dp:
            Vp(this);
            break;
        case Qo:
            Xp(this, this.g.currentTime, this.g.duration);
            this.g.isPlayingBreak && Zp(this);
            this.g.preloadingNext &&
                (a = cast.v.Y.Nk((this.g.duration - this.g.currentTime).toFixed(0)), this.D.innerText !== a && (this.D.innerText = a));
            break;
        case $o:
        case ap:
            a = this.g.numberBreakClips;
            0 < a ? (this.B.innerText = 1 < a ? this.g.currentBreakClipNumber + "/" + a : "", this.u.innerText = this.u.innerText || " ") : (this.B.innerText = "", this.u.innerText = "");
            break;
        case Xo:
            $p(this, a.value);
            break;
        case Zo:
        case Yo:
            Zp(this);
            break;
        case Wo:
            Tp(this.O, String(a.value));
            break;
        case Uo:
            this.T.innerText = String(a.value);
            break;
        case Vo:
            this.N.innerText = String(a.value);
            break;
        case cp:
            Xp(this, this.g.currentTime, this.g.duration);
            Vp(this);
            break;
        case bp:
            if (!(this.g.isLive && this.g.liveSeekableRange && u(this.g.liveSeekableRange.end) && u(this.g.liveSeekableRange.start)) || 0 >= this.g.liveSeekableRange.end - this.g.liveSeekableRange.start) this.w.style.width = 0, this.A.style.width = 0;
            else {
                a = this.g.liveSeekableRange;
                var c = null === this.g.sectionStartTimeInMedia ? Math.min(a.start, this.g.currentTime) : this.g.sectionStartTimeInMedia;
                b = this.g.sectionDuration ? this.g.sectionDuration : a.end - c;
                c = (a.start -
                    c) / b * 100;
                var d = (a.end - a.start) / b * 100;
                0 <= c && 100 >= c && (this.A.style.width = d + "%", this.A.style.left = c + "%");
                this.g.currentTime <= a.start ? this.w.style.width = 0 : (this.w.style.width = (this.g.currentTime - a.start) / b * 100 + "%", this.w.style.left = c + "%")
            }
    }
};
var Yp = D("cast.framework.ui.CustomPlayerElement");
document.registerElement("cast-media-player", {
    prototype: Rp.prototype
});
A("cast.framework.LoggerLevel", {
    DEBUG: 0,
    VERBOSE: 500,
    INFO: 800,
    WARNING: 900,
    ERROR: 1E3,
    NONE: 1500
});

function cq() {}
A("cast.framework.QueueBase", cq);
cq.prototype.initialize = function() {
    return null
};
cq.prototype.initialize = cq.prototype.initialize;
cq.prototype.onCurrentItemIdChanged = function() {};
cq.prototype.onCurrentItemIdChanged = cq.prototype.onCurrentItemIdChanged;
cq.prototype.nextItems = function() {
    return []
};
cq.prototype.nextItems = cq.prototype.nextItems;
cq.prototype.prevItems = function() {
    return []
};
cq.prototype.prevItems = cq.prototype.prevItems;
cq.prototype.fetchItems = function() {
    return []
};
cq.prototype.fetchItems = cq.prototype.fetchItems;
cq.prototype.onItemsInserted = function() {};
cq.prototype.onItemsInserted = cq.prototype.onItemsInserted;
cq.prototype.onItemsRemoved = function() {};
cq.prototype.onItemsRemoved = cq.prototype.onItemsRemoved;
cq.prototype.shuffle = function() {
    return null
};
cq.prototype.shuffle = cq.prototype.shuffle;