namespace tambahNormal {
	type TTambah = {
		a: number,
		b: number
	}

	function buatSoalA(): TTambah {
		let a: number = Math.floor(Math.random() * 9) + 1;
		let b: number = Math.floor(Math.random() * 9) + 1;

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
		}
	}

	function renderRow(a: TTambah[], row: HTMLTableRowElement) {
		let td: HTMLTableCellElement;

		td = document.createElement('td');
		row.append(td);
		renderTd(a[0].a, a[0].b, td);

		td = document.createElement('td');
		row.append(td);
		renderTd(a[1].a, a[1].b, td);
	}

	function renderTd(a: number, b: number, td: HTMLTableCellElement) {
		td.innerHTML = `${a} + ${b} = .....`;
	}

	export function buatSoal() {
		for (let i = 0; i < 5; i++) {
			let soal: TTambah[] = [];
			let row: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
			let table: HTMLTableElement = document.querySelector('table');

			table.appendChild(row);

			soal.push(buatSoalA());
			soal.push(buatSoalA());

			renderRow(soal, row);
		}

	}

}

