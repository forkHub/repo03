import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class SoundData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "sound";

	constructor() {
		this.list.push({
			type: "ha.be.Sound.Load",
			perintah: "LoadSound",
			message0: "Load Sound",
			tooltip: `
				Load sound from URL
			`,
			output: EOutput.Any
		})
	}
}

export const soundData = new SoundData();