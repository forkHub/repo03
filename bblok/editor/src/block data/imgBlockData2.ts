// import { Order } from "blockly/javascript";
import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class ImageBlockData2 {
	readonly group: string = "Image Prop";
	readonly list: TToolBoxBlockDef[] = [];
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {

		// Image X Getter
		// const ImageXPosition = ha.be.Spr.PosisiX;
		// ImageXPosition
		this.list.push({
			type: "ha.be.Spr.PosisiX",
			perintah: "ImageXPosition",
			message0: "Image %1 X",
			args: {
				sprite: {},
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Posisi X Image',
			f: (arg: string[]): string => {
				let res = arg[0] + ".x"
				return res;
			}
		})

		//Image Y Getter
		// const ImageYPosition = ha.be.Spr.PosisiY;
		// ImageYPosition
		this.list.push({
			type: "ha.be.Spr.PosisiY",
			perintah: "ImageYPosition",
			message0: "Image %1 Y",
			args: {
				sprite: {},
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Posisi Y Image',
			f: (arg: string[]): string => {
				return arg[0] + ".y";
			}
		})

		//Rotation get
		// Rotation
		// ha.be.Spr.Rotasi
		this.list.push({
			type: "ha.be.Spr.Rotasi_get",
			perintah: "Rotation",
			message0: "Image %1 rotasi",
			args: {
				sprite: {},
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Rotasi Image',
			f: (arg: string[]): string => {
				return arg[0] + ".buff.rotasi";
			}
		})

		// ImageAlpha (getter)

		// ImageWidth getter
		// ha.be.Spr.Panjang;
		// Width
		this.list.push({
			type: "ha.be.Spr.Panjang",
			message0: "Image %2 panjang %1",
			inputsInline: true,
			args: {
				dummy: '',
				sprite: {},
			},
			output: EOutput.Number,
			f: (arg: string[]): string => {
				return arg[0] + ".buff.panjang";
			},
			tooltip: `
			Panjang Image.
			Mengembalikan 0 bila image sedang di load
        `
		})

		// ImageHeight getter
		// ha.be.Spr.Lebar;
		// Height
		this.list.push({
			type: "ha.be.Spr.Lebar",
			perintah: "Height",
			message0: "Image %2 lebar %1",
			args: {
				dummy: '',
				sprite: {},
			},
			inputsInline: true,
			output: EOutput.Number,
			f: (arg: string[]): string => {
				return arg[0] + ".buff.lebar";
			},

			tooltip: `
				Tinggi Image
        		Mengembalikan 0 bila Image masih di load
        `
		})

		// ha.be.Spr.DragMode(); (setter)
		//set drag mode

		// ImageXHandle (getter)
		// ha.be.Spr.HandleX
		this.list.push({
			type: "ha.be.Spr.HandleX",
			message0: "Image %2 pusat X %1",
			args: {
				dummy: '',
				sprite: {},
			},
			f: (arg: string[]): string => {
				return arg[0] + ".buff.handleX";
			},
			tooltip: "Pusat X",
			output: EOutput.Number,
			inputsInline: true
		})

		//handle y
		this.list.push({
			type: "ha.be.Spr.HandleY",
			message0: "image %2 Pusat Y %1",
			args: {
				dummy: '',
				sprite: {},
			},
			f: (arg: string[]): string => {
				return arg[0] + ".buff.handleY";
			},
			tooltip: "Pusat Y",
			output: EOutput.Number,
			inputsInline: true
		})

		// const ImageIsDragged = ha.be.Spr.StatusDrag;
		this.list.push({
			type: "ha.be.Spr.StatusDrag",
			perintah: "ImageIsDragged",
			message0: "Image %1 status drag",
			args: {
				sprite: {},
			},
			inputsInline: true,
			output: EOutput.Boolean,
			f: (arg: string[]): string => {
				return arg[0] + ".dragged";
			},
			tooltip: `
				True bila sedang di drag dan false bila tidak.
				Blok ini bersifat read-only
			`
		})

	}
}

export const imageBlockData2 = new ImageBlockData2();