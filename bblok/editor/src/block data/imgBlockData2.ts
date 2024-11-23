// import { Order } from "blockly/javascript";
// import { Val } from "../Validasi";
import { Val } from "../Validasi";
import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class ImageBlockData2 {
	readonly group: string = "Image Prop";
	readonly list: TToolBoxBlockDef[] = [];
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {

		// this.propSetter();
		this.propX();
		this.propY();
		this.propRot();

		this.panjang();
		this.propLebar();
		this.alpha();
		this.tipeDrag();
		this.handleX();
		this.handleY();
		this.statusDrag();
	}

	private alpha() {
		// let s: ha.be.SprObj;
		// s.alpha;

		// ImageAlpha (getter)
		this.list.push({
			type: "alpha prop",
			message0: "Image %1 alpha",
			args: {
				sprite: EOutput.Image,
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Membaca property Alpha 0 - 100',
			f: (arg: string[]): string => {
				return arg[0] + ".alpha";
			}
		})

		//alpha setter
		this.list.push({
			type: "Image_alpha_setter",
			message0: "Image %1 alpha = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `mengeset alpha dari image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".alpha = " + arg[1];
				return res;
			}
		})
	}

	private panjang() {
		// let s:ha.be.SprObj;
		// s.panjang;

		this.list.push({
			type: "ha.be.Spr.Panjang",
			message0: "Image %2 panjang %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".panjang";
			},
			tooltip: `
			Panjang Image.
			Mengembalikan 0 bila image sedang di load`
		})

		//lebar setter
		this.list.push({
			type: "Image_panjang_setter",
			message0: "Image %1 panjang = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `mengeset panjang image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".panjang = " + arg[1];
				return res;
			}
		})

	}

	//lebar
	private propLebar() {
		// let spr: ha.be.SprObj;
		// spr.lebar

		let tip = `
			Lebar Image
			Mengembalikan 0 bila Image masih di load
		`

		//getter
		this.list.push({
			type: "ha.be.Spr.Lebar",
			message0: "Image %2 lebar %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".lebar";
			},
			tooltip: tip
		});

		//lebar setter
		this.list.push({
			type: "Image_lebar_setter",
			message0: "Image %1 lebar = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `mengeset tinggi image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".lebar = " + arg[1];
				return res;
			}
		})


	}

	private tipeDrag() {
		let tip = `
		tipe drag:
		1. geser
		2. putar
		3. geser remote, geser tanpa menyentuh blok terlebih dahulu
		4. putar remote, putar tanpa menyentuh blok terlebih dahulu
	`;
		// let spr:ha.be.SprObj;
		// spr.tipeDrag;
		this.list.push({
			type: "ha.be.Spr.DragMode2",
			message0: "Image %2 tipe drag %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".tipeDrag";
			},
			tooltip: tip,
			output: EOutput.Number,
		})

		//setter
		//set tipe drag
		this.list.push({
			type: "Image_tipe_drag_setter",
			message0: "Image %1 tipe drag = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: tip,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".tipeDrag = " + arg[1];
				return res;
			}
		})
	}

	private handleX() {
		// ImageXHandle (getter)
		// ha.be.Spr.HandleX
		this.list.push({
			type: "ha.be.Spr.HandleX",
			message0: "Image %2 pusat X %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				return arg[0] + ".handleX";
			},
			tooltip: `Pusat X
			Titik pusat dipakai acuan dalam menggambar, dan skala
			`,
			output: EOutput.Number,
		})

		//setter
		// Image handle x Setter
		this.list.push({
			type: "Image_Handle_X_Setter",
			message0: "Image %1 pusat x = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `Mengeset pusat x
			Titik pusat dipakai acuan dalam menggambar, dan skala
			`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".handleX = " + arg[1];
				return res;
			}
		})

	}

	private handleY() {
		//handle y
		this.list.push({
			type: "ha.be.Spr.HandleY",
			message0: "image %2 Pusat Y %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				return arg[0] + ".handleY";
			},
			tooltip: `Pusat Y
			Titik pusat dipakai acuan dalam menggambar, dan skala
			`,
			output: EOutput.Number,
			inputsInline: true
		})

		//setter
		// Image handle y Setter
		this.list.push({
			type: "Image_Handle_Y_Setter",
			message0: "Image %1 pusat y = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `Mengeset pusat y
			Titik pusat dipakai acuan dalam menggambar, dan skala
			`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".handleY = " + arg[1];
				return res;
			}
		})
	}

	//read only
	private statusDrag() {
		// const ImageIsDragged = ha.be.Spr.StatusDrag;
		this.list.push({
			type: "ha.be.Spr.StatusDrag",
			// perintah: "ImageIsDragged",
			message0: "Image %1 status drag",
			args: {
				sprite: EOutput.Image,
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

	private propX() {
		// Image X Getter
		// const ImageXPosition = ha.be.Spr.PosisiX;
		// ImageXPosition
		this.list.push({
			type: "ha.be.Spr.PosisiX",
			perintah: "ImageXPosition",
			message0: "Image %1 X",
			args: {
				sprite: EOutput.Image,
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Posisi X Image',
			f: (arg: string[]): string => {
				Val.kosong(arg[0]);
				let res = arg[0] + ".x"
				return res;
			}
		})

		// Image X Setter
		// const ImageXPosition = ha.be.Spr.PosisiX;
		// ImageXPosition
		this.list.push({
			type: "ha.be.Spr.PosisiX_Setter",
			perintah: "",
			message0: "Image %1 X = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			inputsInline: true,
			tooltip: 'Mengeset Posisi X Image',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".x = " + arg[1];

				return res;
			}
		})


	}

	private propY() {
		// Image Y Getter
		// const ImageXPosition = ha.be.Spr.PosisiX;
		// ImageXPosition
		this.list.push({
			type: "ha.be.Spr.PosisiY",
			perintah: "ImageYPosition",
			message0: "Image %1 Y",
			args: {
				sprite: EOutput.Image,
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Posisi Y Image',
			f: (arg: string[]): string => {
				Val.kosong(arg[0]);
				let res = arg[0] + ".y"
				return res;
			}
		})

		// Image Y Setter
		this.list.push({
			type: "ha.be.Spr.PosisiY_Setter",
			perintah: "",
			message0: "Image %1 Y = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			inputsInline: true,
			tooltip: 'Mengeset Posisi Y Image',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".y = " + arg[1];

				return res;
			}
		})

	}

	private propRot() {
		//Rotation get
		// Rotation
		// ha.be.Spr.Rotasi
		this.list.push({
			type: "ha.be.Spr.Rotasi_get",
			message0: "Image %1 rotasi",
			args: {
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			tooltip: 'Rotasi Image',
			f: (arg: string[]): string => {
				Val.kosong(arg[0]);
				return arg[0] + ".rotasi";
			}
		})

		// Image rotasi Setter
		this.list.push({
			type: "Image_Rotasi_Y_Setter",
			message0: "Image %1 rotasi = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: 'Mengeset Rotasi Image (0 - 360)',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".rotasi = " + arg[1];
				return res;
			}
		})


	}
}

export const imageBlockData2 = new ImageBlockData2();