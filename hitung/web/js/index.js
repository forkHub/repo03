"use strict";
function buatSoal() {
    let a = Math.floor(Math.random() * 9) + 1;
    let b = Math.floor(Math.random() * 9) + 1;
    while (true) {
        if (a + b > 10) {
            b--;
        }
        else {
            break;
        }
    }
    return {
        a: a,
        b: b
    };
}
function renderRow(a, row) {
    let td;
    td = document.createElement('td');
    row.append(td);
    renderTd(a[0].a, a[0].b, td);
    td = document.createElement('td');
    row.append(td);
    renderTd(a[1].a, a[1].b, td);
}
function renderTd(a, b, td) {
    td.innerHTML = `${a} + ${b} = .....`;
}
for (let i = 0; i < 5; i++) {
    let soal = [];
    let row = document.createElement('tr');
    let table = document.querySelector('table');
    table.appendChild(row);
    soal.push(buatSoal());
    soal.push(buatSoal());
    renderRow(soal, row);
}
