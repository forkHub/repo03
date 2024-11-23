// import { Val } from "../Validasi";
import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class MathBlockData3 {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Operator";
	readonly hidden = "false";
	readonly toolbox = true;

	constructor() {
		this.list.push({
			type: "Distance",
			perintah: "",
			message0: "Jarak dari x1 %1 y1 %2 x2 %3 y2 %4",
			args: {
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0
			},
			output: EOutput.Number,
			inputsInline: true,
			tooltip: 'menghitung jarak antar dua posisi',
			f: (arg, stmt = []): string => {
				stmt;
				return `Distance(${arg[0]}, ${arg[1]}, ${arg[2]}, ${arg[3]})`;
			}
		})

	}

}

export const mathBlockData3 = new MathBlockData3();

