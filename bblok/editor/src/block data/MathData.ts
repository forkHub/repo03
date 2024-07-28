import { Val } from "../Validasi";
import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class MathBlockData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Operator";
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {


		// DistMin
		// ha.be.Transform.degDistMin
		this.list.push({
			type: "ha.be.Transform.degDistMin",
			perintah: "DistMin",
			message0: "Jarak sudut minimum dari %1 ke %2",
			args: {
				fw: 0,
				fh: 0
			},
			output: EOutput.Number,
			inputsInline: true,
			tooltip: 'menghitung jarak minimum dari dua sudut'
		})

		this.list.push(this.setVar());
		this.list.push(this.addBy());
		this.list.push(this.minBy());
		this.list.push(this.mulBy());
		this.list.push(this.divBy());
		this.list.push(this.invers());
	}

	private setVar(): TToolBoxBlockDef {
		return {
			type: "set var",
			perintah: "",
			message0: " %1 = %2 ",
			args: {
				var1: {},
				value: 0
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				return `
					/* %1 = %2 */
					${arg[0]} = ${arg[1]}
				`;
			},
			inputsInline: true,
			tooltip: 'Mengisi variable dengan value'
		}
	}

	private mulBy(): TToolBoxBlockDef {
		return {
			type: "*=",
			perintah: "",
			message0: "Kalikan %1 dengan %2",
			args: {
				var1: {},
				value: 0
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				return `
					/* Kalikan %1 dengan %2 */
					${arg[0]} *= ${arg[1]}
				`;
			},
			inputsInline: true,
			tooltip: 'Kalikan variable dengan value'
		}
	}

	private divBy(): TToolBoxBlockDef {
		return {
			type: "/=",
			perintah: "",
			message0: "Bagi %1 dengan %2",
			args: {
				var1: {},
				value: 0
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				return `
				/* Bagi %1 dengan %2 */
				${arg[0]} /= ${arg[1]}`;
			},
			inputsInline: true,
			tooltip: 'Bagi variable dengan value'
		}
	}

	private addBy(): TToolBoxBlockDef {
		return {
			type: "+=",
			perintah: "",
			message0: "Tambahkan %1 dengan %2",
			args: {
				var1: {},
				value: 0
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				let l = arg[0];
				return `
				/* Tambahkan %1 dengan %2 */
				${l} += ${arg[1]}`;
			},
			inputsInline: true,
			tooltip: 'Tambahkan variable dengan value'
		}
	}

	private minBy(): TToolBoxBlockDef {
		return {
			type: "-=",
			perintah: "",
			message0: "Kurangi %1 dengan %2",
			args: {
				var1: {},
				value: 0
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				return `
				/* Kurangi %1 dengan %2 */
				${arg[0]} -= ${arg[1]}`;
			},
			inputsInline: true,
			tooltip: 'Kurangi variable dengan value'
		}
	}

	private invers(): TToolBoxBlockDef {
		return {
			type: "*=-1",
			perintah: "",
			message0: "Balik %1",
			args: {
				var1: {},
			},
			f: (arg: string[]): string => {
				Val.paramEmpty(arg[0]);
				return `
				/* Balik %1 */
				${arg[0]} *= -1`;
			},
			inputsInline: true,
			tooltip: 'Membuat variable negatif menjadi positif dan sebaliknya'
		}
	}

}

export const mathBlockData = new MathBlockData();

