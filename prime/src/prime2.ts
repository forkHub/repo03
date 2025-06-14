import fs from 'fs';

/**
 * NODE
 */
let _sisa = '';

export function sisa(): string {
    return _sisa + '';
}

export function kurangDariSamaDengan(n1: string, n2: string): boolean {
    if (kurangDari(n1, n2)) return true;
    if (n1 == n2) return true;

    return false;
}

export function kurangi(n1: string, n2: string): string {
    let hasil = '';
    let pinjam = 0;

    if (kurangDariSamaDengan(n1, n2)) {
        return '0';
    }


    n1 = padding(n1, n2.length);
    n2 = padding(n2, n1.length);

    for (let i = n1.length - 1; i >= 0; i--) {
        let c1 = parseInt(n1.charAt(i));
        let c2 = parseInt(n2.charAt(i));
        let c3 = 0;

        if (pinjam > 0) {
            c1--;
        }
        pinjam = 0;

        if (c1 < c2) {
            c1 += 10;
            pinjam = 1;
        }
        c3 = c1 - c2;

        hasil = c3 + hasil;
    }

    //hapus 0
    while (hasil.charAt(0) == '0') {
        hasil = hasil.slice(1);
    }

    return hasil;
}

export async function bagi(n1: string, n2: string): Promise<string> {
    let hasil = '0';
    _sisa = "0";

    if (n2 == "0") {
        return "0";
    }

    if (n1 == n2) {
        return "1";
    }

    if (n1.length < n2.length) {
        _sisa = n1;
        return "0";
    }

    if (kurangDari(n1, n2)) {
        _sisa = n1;
        return "0";
    }

    while (true) {
        if (kurangDari(n1, n2)) {
            _sisa = n1;
            break;
        }

        n1 = kurangi(n1, n2);
        hasil = tambah(hasil, "1");
    }

    return hasil;
}

async function habisDibagi(ns: string, pembagi: string, awal: string = '0'): Promise<boolean> {
    let angka = '';
    angka = kurangi(ns, awal);

    await bagi(angka, pembagi);
    if (sisa() != '0') return false;

    return true;
}

function padding(s: string, n: number): string {

    if (s.length >= n) return s;
    while (s.length < n) {
        s = '0' + s;
    }

    return s;
}

function kurangDari(n1: string, n2: string): boolean {

    // console.log('kurang dari', n1, n2);

    if (n1.length < n2.length) return true;
    if (n1.length > n2.length) return false;

    if (n1 == n2) return false;

    for (let i = 0; i < n1.length; i++) {
        let c1 = parseInt(n1.charAt(i));
        let c2 = parseInt(n2.charAt(i));

        if (c1 > c2) {
            // console.log('lebih dari ', c1, c2);
            return false;
        }
        else if (c1 < c2) {
            // console.log('kurang dari ', c1, c2);
            return true;
        }
        else {

        }
    }

    throw Error('');

}

/**
 * 
 * @param n1 
 * @param n2 
 * @returns 
 */
export function tambah(n1: string, n2: string): string {
    let hasil = '';
    let simpan = 0;

    n1 = padding(n1, n2.length);
    n2 = padding(n2, n1.length);

    // console.log('tambah ' + n1 + '/' + n2);

    for (let i = n1.length - 1; i >= 0; i--) {
        let c1 = n1.charAt(i);
        let c2 = n2.charAt(i);
        let c3 = parseInt(c1) + parseInt(c2);

        //simpan
        c3 += simpan;
        simpan = 0;

        while (c3 >= 10) {
            simpan++;
            c3 -= 10;
        }


        hasil = c3 + hasil;
    }

    if (simpan > 0) {
        hasil = simpan + hasil;
    }

    return hasil;
}

export async function kali(n1: string, n2: string): Promise<string> {
    let hasil = '0';
    let ctr = '0';

    while (kurangDari(ctr, n2)) {
        hasil = tambah(hasil, n1);
        ctr = tambah(ctr, "1");
    }

    return hasil;
}

/**
 * ===========================================
 */

interface IPrime {
    value: string,
    next: string
}

interface IPrimeData {
    angka: string,
    primes: IPrime[]
}

function updateData() {
    dataJson.angka = angka;
    dataJson.primes = primes;
}

function updateUI() {
    // console.log('update ui');
    // setTimeout(() => {
    // document.body.querySelector('div.info').innerHTML = `
    //     angka: ${angka} <br/>
    //     prime: ${lastPrime}<br/>
    //     jml prime: ${primes.length} <br/>
    // `;

    console.log("prime: " + primes.length + '/value: ' + lastPrime);

    // }, (0));
}

async function processLoadedData(data: string) {
    let obj = JSON.parse(data) as IPrimeData;
    angka = obj.angka;
    primes = obj.primes;
    dataJson.angka = obj.angka;
    dataJson.primes = obj.primes;
}

async function load() {
    try {
        var fs = require('fs'),
            path = require('path'),
            filePath = path.join(__dirname, 'data.txt');

        let data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        processLoadedData(data);
    }
    catch (e) {
        console.error(e);
        //go with default data
    }
}

async function simpan(nama: string = "data.txt") {
    fs.writeFileSync(
        nama,
        JSON.stringify(dataJson)
    );
}

async function cariPrime() {
    let ulang = true;
    let ctr = 0;

    while (ulang) {
        console.log("");
        await prime();

        let timer2 = Date.now();

        ctr++;
        if (ctr > 20) break;

        if ((timer2 - timer) > (1000 * 60 * 15)) {
            timer = timer2;
            updateData();
            await simpan();
            await simpan("data" + Date.now() + ".txt");
            ulang = false;
        }
    }
}

async function prime() {
    angka = tambah(angka, '1');

    console.log('angka: ' + angka);

    for (let i = 0; i < primes.length; i++) {
        let p = primes[i];

        if (await habisDibagi(angka, p.value, p.next)) {
            console.log('habis dibagi ' + p.value);
            p.next = angka;
            return;
        }
    }

    let p = {
        value: angka,
        next: angka
    }

    primes.push(p);
    lastPrime = angka;
    console.log('primbe baru ' + angka);
    updateData();
    updateUI();
    await simpan();
}

async function start() {
    await load();
    await cariPrime();
    // cariPrime;
}

let primes: IPrime[] = []
let angka = '1';
let dataJson: IPrimeData = {
    angka: angka,
    primes: primes
}

let timer = Date.now();
let lastPrime = '';

primes.push({
    value: '2',
    next: '2'
});
primes.push({
    value: '3',
    next: '3'
})
primes.push({
    value: '5',
    next: '5'
})

start().then(() => {
    console.log('finish');
}).catch((e) => {
    console.error(e);
});