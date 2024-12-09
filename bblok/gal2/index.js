"use strict";
var data = {
    nama: 'root',
    url: '',
    parent: null,
    member: [
        {
            nama: 'dir1',
            url: './box.png',
            parent: null,
            member: []
        },
        {
            nama: 'dir1',
            url: './box.png',
            parent: null,
            member: []
        },
        {
            nama: 'dir1',
            url: './box.png',
            parent: null,
            member: []
        },
        {
            nama: 'dir1',
            url: './box.png',
            parent: null,
            member: []
        }
    ]
};
window.onload = function () {
    var dir = new Dir();
    dir.fromData(data);
    Dir.cont = document.body;
    Dir.render(dir);
};
