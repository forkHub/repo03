import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class MathBlockData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Math 2";
	readonly hidden = "false";

	constructor() {
		// DistMin
		// ha.be.Transform.degDistMin
		this.list.push({
			type: "ha.be.Transform.degDistMin",
			perintah: "DistMin",
			message0: "Dist from %1 to %2",
			args: {
				fw: 0,
				fh: 0
			},
			output: EOutput.Number,
			inputsInline: true,
			tooltip: 'return minimum distance between two angles'
		})
	}
}

export const mathBlockData = new MathBlockData();

