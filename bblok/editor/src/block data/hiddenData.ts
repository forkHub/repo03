import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class HiddenData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "hidden";
	readonly hidden = "true";
	readonly toolbox = false;

	constructor() {
		// this.list.push(this.Grafis);

		this.list.push(this.setVar());

		// ImagesCollideXY
		// ha.be.Spr.TabrakanXY;
		this.list.push({
			type: "ha.be.Spr.TabrakanXY",
			message0: "image1 %2 at x1 %3 y1 %4 %1 collide with image2 %5 at x2 %6 y2 %7",
			perintah: "Basik.Spr.TabrakanXY",
			args: {
				dummy: '',
				sprite: {},
				x1: 0,
				y1: 0,
				sprite2: {},
				x2: 0,
				y2: 0
			},
			inputsInline: true,
			tooltip: "return true if two images are collided at the specified position",
			output: EOutput.Boolean,
		})

		// ImagesCollideXY
		// ha.be.Spr.TabrakanXY;
		this.list.push({
			type: "ha.be.Spr.TabrakanXY",
			message0: "image1 %2 at x1 %3 y1 %4 %1 collide with image2 %5 at x2 %6 y2 %7",
			perintah: "Basik.Spr.TabrakanXY",
			args: {
				dummy: '',
				sprite: {},
				x1: 0,
				y1: 0,
				sprite2: {},
				x2: 0,
				y2: 0
			},
			inputsInline: true,
			tooltip: "return true if two images are collided at the specified position",
			output: EOutput.Boolean,
		})

		//Drag Mode
		this.list.push({
			type: "ha.be.Spr.DragMode",
			perintah: "Basik.Spr.DragMode",
			message0: "Image %1 set drag mode to %2",
			inputsInline: true,
			args: {
				sprite: {},
				dragMode: 1
			},
			tooltip: `
            Make an image dragable.

            There are two drag-mode available:
            - 0: no interaction, default
            - 1: move
            - 2: rotate
            - 3: move on any drag, even if you don't actually touch the image 
            - 4: rotate on any drag, even if you don't actually touch the image
        `
		})

		//Grafis
		this.list.push({
			type: "ha.be.Be.Start",
			perintah: "Graphics",
			message0: "🛩️ Mulai %1 panjang: %2 lebar: %3 %4",
			inputsInline: true,
			extensions: ["noDelete"],
			args: {
				dummy: '',
				width: 320,
				height: 240,
				statement: ""
			},
			stmt: false,
			f: (arg: string[], stmt: string[]): string => {
				let hasil = '';
				hasil += `try {\n`;
				hasil += `Graphics(${arg[0]}, ${arg[1]});\n`;
				stmt.forEach((item) => {
					hasil += item + ";";
				});
				hasil += `\n} catch (e) {
					console.log("grup mulai error");
					console.log(e);\n
					e.message = 'Ada kesalahan di grup Mulai: ' + e.message;\n
					handleError(e);\n
					error=true;
					//TODO: dialog
					//throw e;
				}`;
				return hasil;
			},

			tooltip: `
				Grup Start.
				Blok-blok yang ditaruh disini akan dipanggil sekali saat applikasi dimulai.
	
				Parameter:
				panjang: panjang kanvas
				lebar: lebar kanvas
			`
		});

		// Update
		this.list.push({
			type: "ha.be.Be.Update",
			perintah: "function #update",
			message0: "⏱️ Update %1 %2 %3",
			inputsInline: false,
			args: {
				dummy: "",
				input_end_row: "",
				statement: ""
			},
			stmt: true,
			hat: true,
			tooltip: `
				Semua blok di grup ini akan dipanggil berulang kali selama applikasi berjalan.
			`
		});

		// ImageAlpha (setter)
		// const ImageAlpha = ha.be.Spr.Alpha;
		this.list.push({
			type: "ha.be.Spr.Alpha",
			perintah: "ImageAlpha",
			message0: "Image %1 set alpha to (0-100) %2",
			args: {
				sprite: {},
				alpha: 100
			},
			inputsInline: true,
			tooltip: 'Set image alpha '
		})

	}

	private setVar(): TToolBoxBlockDef {
		return {
			type: "set var",
			perintah: "",
			message0: " %1 = %2 ",
			metadata: {
				readonly: false,
				property: false
			},
			args: {
				var1: {},
				value: {}
			},
			extensions: ["metadata"],
			f: (arg: string[]): string => {
				// Val.paramEmpty(arg[0]);
				return `
					/* %1 = %2 */
					${arg[0]} = ${arg[1]}
				`;
			},
			inputsInline: true,
			val: (item: TToolBoxBlockDef) => {
				let f = item.inputs["var1"];
				let g = item.inputs["value"];

				console.log("f", f);
				console.log("g", g);
			},
			tooltip: 'Mengisi variable/property dengan value'
		}
	}

}
export const hiddenData = new HiddenData();