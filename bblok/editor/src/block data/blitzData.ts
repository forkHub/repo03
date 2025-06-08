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
			tooltip: "Clear screen"
		});

		// Color
		//ha.be.Be.Warna;
		this.list.push({
			type: "ha.be.Be.Warna",
			perintah: "Color",
			message0: 'Fill color: red %1 green %2 blue %3 alpha %4',
			inputsInline: true,
			args: {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 100
			},
			tooltip: `
                Set default fill color for fonts, shapes, etc.
                Values for red, green, blue range from 0 - 255
                Alpha ranges from 0 - 100
            `
		});

		// const Stroke = ha.be.Be.StrokeColor;    
		this.list.push({
			type: " ha.be.Be.StrokeColor",
			perintah: "Stroke",
			message0: 'Stroke color: red %1 green %2 blue %3 alpha %4',
			inputsInline: true,
			args: {
				red: 0,
				green: 0,
				blue: 0,
				alpha: 100
			},
			tooltip: `
                Set stroke color for fonts, shapes, etc.
                Red, green, and blue range from 0 - 255
                Alpha ranges from 0 - 100
            `
		});

		// const Line = ha.be.Be.Garis;
		this.list.push({
			type: "ha.be.Be.Garis",
			perintah: "Line",
			message0: 'Line x1 %1 y1 %2 x2 %3 y2 %4',
			inputsInline: true,
			args: {
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100
			},
			tooltip: `
                Draw a line
            `
		});

		// const Rect = ha.be.Be.Kotak;
		// Rect
		this.list.push({
			type: "ha.be.Be.Kotak",
			perintah: "Rect",
			message0: 'Rectangle x1 %1 y1 %2 x2 %3 y2 %4',
			inputsInline: true,
			args: {
				x1: 0,
				y1: 0,
				x2: 100,
				y2: 100
			},
			tooltip: `
                Draw a rectangle
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
			message0: 'Oval %1 x %2 y %3 radius %4 scale X %5 scale Y %6 rotation %7',
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
                Draw an oval
            `
		});

		// const GetPixel = ha.be.Img.AmbilPiksel;
		this.list.push({
			type: "ha.be.Img.AmbilPiksel",
			perintah: "GetPixel",
			message0: 'Get Pixel x %1 y %2',
			inputsInline: true,
			args: {
				x: 0,
				y: 0,
			},
			tooltip: `
                Get pixel color at position x, y
                The result can be read from the red, green, and blue commands.
                This command will fail if an image is loaded from outside sources
                except those in the gallery.
            `
		});

		// const Red = ha.be.Be.Merah;
		this.list.push({
			type: "ha.be.Be.Merah",
			perintah: "Red",
			message0: 'Red',
			extensions: ["readonly"],
			tooltip: `
                Red color obtained from the Get Pixel command
            `,
			output: EOutput.Number
		});

		// const Green = ha.be.Be.Hijau;
		this.list.push({
			type: "ha.be.Be.Hijau",
			perintah: "Green",
			message0: 'Green',
			extensions: ["readonly"],
			tooltip: `
                Green color obtained from the Get Pixel command
            `,
			output: EOutput.Number

		});

		// const Blue = ha.be.Be.Biru;
		this.list.push({
			type: "ha.be.Be.Biru",
			perintah: "Blue",
			message0: 'Blue',
			extensions: ["readonly"],
			tooltip: `
                Blue color obtained from the Get Pixel command
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
                Transparency value obtained from the Get Pixel command
            `,
			output: EOutput.Number

		});
	}
}

export const blitzData = new BlitzData();
