"use strict";
var Dir = /** @class */ (function () {
    function Dir() {
        this.member = [];
    }
    Object.defineProperty(Dir, "cont", {
        get: function () {
            return Dir._cont;
        },
        set: function (value) {
            Dir._cont = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "nama", {
        get: function () {
            return this._nama;
        },
        set: function (value) {
            this._nama = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Dir.prototype.fromData = function (data) {
        var _this = this;
        this.nama = data.nama;
        this.url = data.url;
        while (this.member.length > 0) {
            this.member.pop();
        }
        data.member.forEach(function (item) {
            var d = new Dir();
            d.parent = _this;
            d.fromData(item);
            _this.member.push(d);
        });
    };
    Dir.prototype.getParent = function (ar) {
        if (this.parent) {
            ar.push(this.parent);
            this.parent.getParent(ar);
        }
    };
    Dir.prototype.renderDir = function () {
        var _this = this;
        var el = document.createElement('div');
        el.innerHTML = "<span> " + this.nama + " </span>";
        el.onclick = function () {
            //console
            console.log('render dir');
            Dir.render(_this);
        };
        return el;
    };
    Dir.prototype.renderFile = function () {
        var el = document.createElement('div');
        var img = document.createElement('img');
        img.src = this._url;
        var urlEl = document.createElement('input');
        urlEl.type = 'text';
        urlEl.value = this._url;
        el.appendChild(img);
        el.appendChild(urlEl);
        return el;
    };
    Dir.render = function (dir) {
        this._cont.innerHTML = "";
        //render parent
        dir.renderChild(this._cont);
    };
    Dir.prototype.renderAsItem = function (cont) {
        if (this.member.length > 0) {
            //render dir
            cont.appendChild(this.renderDir());
        }
        else if (this.url != undefined) {
            //render image
            cont.appendChild(this.renderFile());
        }
        else {
            throw "Nama dan Url Undefined";
        }
    };
    Dir.prototype.renderChild = function (cont) {
        cont.innerHTML = '';
        this.member.forEach(function (item) {
            item.renderAsItem(cont);
        });
    };
    return Dir;
}());
