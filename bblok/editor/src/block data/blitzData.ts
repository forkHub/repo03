import { TToolBoxBlockDef, EOutput } from "../toolboxType";

class BlitzData {
	readonly group = "Grafis";
	readonly list: TToolBoxBlockDef[] = [];
	readonly hidden = "false";
	readonly toolbox = false;

	// Start
	constructor() {

		// ha.be.Be.Bersih
		this.list.push({
			type: "ha.be.Be.Bersih",
			perintah: "Cls",
			message0: 'Cls',
			tooltip: "Bersihkan layar"
		});

		// Color
		//ha.be.Be.Warna;
		this.list.push({
			type: "ha.be.Be.Warna",
			perintah: "Color",
			message0: 'Warna fill: merah %1 hijau %2 biru %3 alpha %4',
			inputsInline: true,
			args: {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 100
			},
			tooltip: `
				Mengeset default warna fill untuk font, shape, dll.
				nilai untuk merah, hijau, biru adalah dari 0 - 255
				alpa dari 0 - 100
			`
		});

		// const Stroke = ha.be.Be.StrokeColor;    
		this.list.push({
			type: " ha.be.Be.StrokeColor",
			perintah: "Stroke",
			message0: 'Warna Stroke: merah %1 hijau %2 biru %3 alpha %4',
			inputsInline: true,
			args: {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 100
			},
			tooltip: `
				Mengest warna stroke untuk font, shape, dll
				warna merah, hijau dan biru dari 0 - 255
				alpha dari 0 - 100
			`
		});

		// const Line = ha.be.Be.Garis;
		this.list.push({
			type: "ha.be.Be.Garis",
			perintah: "Line",
			message0: 'Garis x1 %1 y1 %2 x2 %3 y2 %4',
			inputsInline: true,
			args: {
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100
			},
			tooltip: `
				Menggambar garis
			`
		});

		// const Rect = ha.be.Be.Kotak;
		// Rect
		this.list.push({
			type: "ha.be.Be.Kotak",
			perintah: "Rect",
			message0: 'Kotak x1 %1 y1 %2 x2 %3 y2 %4',
			inputsInline: true,
			args: {
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100
			},
			tooltip: `
				Menggambar kotak
			`
		});

		// const Rect = ha.be.Be.Kotak_opt;
		// Rect
		this.list.push({
			type: "ha.be.Be.Kotak_opt",
			perintah: "Rect",
			message0: 'Menggambar kotak x1 %1 y1 %2 x2 %3 y2 %4 fill %5 stroke %6',
			inputsInline: true,
			args: {
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100,
				fill: true,
				stroke: true,
			},
			tooltip: `
				Menggambar kotak dengan pilihan
			`
		});

		//TODO: oval yang lebih sederhana

		// const Oval = ha.be.Be.Oval;
		this.list.push({
			type: "ha.be.Be.Oval",
			perintah: "Oval",
			message0: 'Oval %1 x %2 y %3 radius %4 skala X %5 skala Y %6 rotasi %7',
			args: {
				dummy: '',
				x1: 0,
				y1: 0,
				radius: 100,
				scaleX: 1,
				scaleY: 1,
				rotation: 0,
			},
			tooltip: `
				Menggambar Oval
			`
		});

		// const GetPixel = ha.be.Img.AmbilPiksel;
		this.list.push({
			type: "ha.be.Img.AmbilPiksel",
			perintah: "GetPixel",
			message0: 'Ambil Pixel x %1 y %2',
			inputsInline: true,
			args: {
				x: 0,
				y: 0,
			},
			tooltip: `
				Mengambil warna pixel pada posisi x, y
				Hasilnya bisa dibaca dari blok perintah merah, hijau dan biru.
				Perintah ini akan gagal bila ada Image yang dimuat dari luar
				selain yang ada di galery
			`
		});

		// const Red = ha.be.Be.Merah;
		this.list.push({
			type: "ha.be.Be.Merah",
			perintah: "Red",
			message0: 'Merah',
			extensions: ["readonly"],
			tooltip: `
				Warna merah yang didapat dari blok perintah Ambil pixel
			`,
			output: EOutput.Number
		});

		// const Green = ha.be.Be.Hijau;
		this.list.push({
			type: "ha.be.Be.Hijau",
			perintah: "Green",
			message0: 'Hijau',
			extensions: ["readonly"],
			tooltip: `
				Warna hijau yang didapat dari blok perintah Ambil pixel
			`,
			output: EOutput.Number

		});

		// const Blue = ha.be.Be.Biru;
		this.list.push({
			type: "ha.be.Be.Biru",
			perintah: "Blue",
			message0: 'Biru',
			extensions: ["readonly"],
			tooltip: `
				Warna biru yang didapat dari blok perintah Ambil pixel
			`,
			output: EOutput.Number

		});

		// const Alpha = ha.be.Be.Transparan;    
		this.list.push({
			type: "ha.be.Be.Transparan",
			perintah: "Alpha",
			message0: 'Alpha',
			extensions: ["readonly"],
			tooltip: `
				Warna transparant yang didapat dari blok perintah Ambil pixel
			`,
			output: EOutput.Number

		});
	}
}

export const blitzData = new BlitzData();
