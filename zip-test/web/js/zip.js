"use strict";
let angka = -1;
let kec = 0;
let a = 1;
let ctr = 0;
let list = [];
let list2 = [];
tambahData(list);
tambahData(list2);
console.log(list);
console.log(list2);
function tambahData(list) {
    while (true) {
        if (list.length >= 8)
            return;
        tambah(list);
    }
}
function tambah(list) {
    if (list.length >= 10)
        return;
    kec += a;
    angka += kec;
    list.push(angka);
}
