import { TToolBoxBlockDef } from "../toolboxType";

class HiddenData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "hidden";
	readonly hidden = "true";

	// ha.be.Be.Grafis
	// depecrated
	readonly Grafis: TToolBoxBlockDef = {
		type: "ha.be.Be.Grafis",
		perintah: "Graphics",
		message0: "Graphics %1 width: %2 height: %3",
		inputsInline: true,
		args: {
			dummy: '',
			width: 320,
			height: 240
		},
		hidden: 'hidden',
		tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
	};

	constructor() {
		this.list.push(this.Grafis);
	}
}
export const hiddenData = new HiddenData();