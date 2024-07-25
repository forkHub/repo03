import { TToolBoxBlockDef } from "../toolboxType";

class TextData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Text 2";
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {
		// Shortcut buat perintah-perintah font
		// FontName
		this.list.push({
			type: "ha.be.Teks.Font",
			perintah: "FontName",
			message0: "Set Font Name to %1",
			args: {
				name: "cursive"
			}
		})

		// ha.be.Teks.FontSize
		// FontSize 
		this.list.push({
			type: "ha.be.Teks.FontSize",
			perintah: "FontSize",
			message0: "Set Font Size to %1",
			args: {
				size: 14
			}
		})

		// const Align = ha.be.Teks.Rata;
		this.list.push({
			type: "ha.be.Teks.Rata",
			perintah: "Align",
			message0: "Set Font Alignment to %1",
			args: {
				align: "left"
			}
		})

		// ha.be.Teks.Goto;
		this.list.push({
			type: "ha.be.Teks.Goto",
			perintah: "ha.be.Teks.Goto",
			message0: "Set Text position to x %1 y %2",
			inputsInline: true,
			args: {
				x: 0,
				y: 0
			}
		})

		// ha.be.Teks.fill
		this.list.push({
			type: "ha.be.Teks.fill",
			perintah: "ha.be.Teks.fill",
			message0: "Use Font Color Fill is %1",
			args: {
				fill: true
			}
		})

		// ha.be.Teks.stroke;
		this.list.push({
			type: "ha.be.Teks.stroke",
			perintah: "ha.be.Teks.stroke",
			message0: "Use Font Color stroke is %1",
			args: {
				stroke: false
			}
		})

		// ha.be.Teks.jarak
		this.list.push({
			type: "ha.be.Teks.jarak",
			perintah: "ha.be.Teks.jarak",
			message0: "Set line-height to %1",
			args: {
				height: 40
			}
		})

		// ha.be.Teks.Write;
		this.list.push({
			type: "ha.be.Teks.Write",
			perintah: "ha.be.Teks.Write",
			message0: "Write %1",
			args: {
				text: ""
			}
		})

		// ha.be.Teks.WriteLn;
		this.list.push({
			type: "ha.be.Teks.WriteLn",
			perintah: "ha.be.Teks.WriteLn",
			message0: "WriteLn %1",
			args: {
				text: ""
			},
			tooltip: "Write text and move position to next line"
		})

		// const Print = ha.be.Teks.Tulis;
		this.list.push({
			type: "ha.be.Teks.Tulis",
			perintah: "Print",
			message0: "Write %1 text %2 x: %3 y: %4 use fill: %5 use stroke: %6",
			args: {
				dummy: "",
				text: "",
				x: 0,
				y: 0,
				fill: true,
				stroke: false
			}
		})
	}

}

export const textData = new TextData();