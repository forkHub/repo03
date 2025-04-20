namespace tambah {
	let a: string = '';
	let b: string = 's';
	let c: string = '';
	let rangeMin = 1;
	let rangeMax = 9;
	let awal = true;
	let opr = true; //true = +, false = -

	function random(): number {
		return Math.floor(Math.random() * (rangeMax - rangeMin)) + 1;
	}

	function randomBoolean(): boolean {
		return Math.floor(Math.random() * 2) == 0 ? false : true;
	}

	export function buatSoal() {
		let tbl = document.createElement('table');
		for (let i = 0; i < 10; i++) {
			row(tbl);
		}
		document.body.appendChild(tbl);
	}

	function row(tbl: HTMLTableElement): void {
		let tr = document.createElement('tr');

		function tdEl() {
			buatAbc();
			let td;
			td = document.createElement('td');
			td.innerHTML = a + (opr ? "+" : "-") + b + ' = ' + c;
			tr.appendChild(td);
		}

		tdEl();
		tdEl();

		tbl.appendChild(tr);
	}

	function buatAbc() {
		awal = randomBoolean();
		opr = randomBoolean();
		let a1 = random();
		let a2 = random();
		let akhir = randomBoolean();

		//override
		awal = false;
		akhir = true;
		opr = true;

		if (akhir) {
			if (opr) {
				if (awal) {
					a = ' ' + Math.min(a1, a2) + ' ';
					b = ' ' + Math.max(a1, a2) + ' ';
					c = " .... ";
				}
				else {
					a = ' ' + Math.max(a1, a2) + ' ';
					b = ' ' + Math.min(a1, a2) + ' ';
					c = " .... ";
				}
			}
			else {
				a = ' ' + Math.max(a1, a2) + ' ';
				b = ' ' + Math.min(a1, a2) + ' ';
				c = " .... ";
			}
		}
		else {
			if (opr) {
				if (awal) {
					a = " .... ";
					b = ' ' + Math.min(a1, a2) + ' ';
					c = ' ' + Math.max(a1, a2) + ' ';
				}
				else {
					a = ' ' + Math.min(a1, a2) + ' ';
					b = " .... ";
					c = ' ' + Math.max(a1, a2) + ' ';
				}
			}
			else {
				if (awal) {
					a = " .... ";
					b = ' ' + Math.min(a1, a2) + ' ';
					c = ' ' + Math.max(a1, a2) + ' ';
				}
				else {
					a = ' ' + Math.max(a1, a2) + ' ';
					b = " .... ";
					c = ' ' + Math.min(a1, a2) + ' ';
				}
			}
		}
	}
}

