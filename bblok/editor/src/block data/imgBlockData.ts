import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class ImageBlockData {
	readonly group: string = "Image ";
	readonly list: TToolBoxBlockDef[] = [];
	readonly hidden = "false";
	readonly toolbox = false;

	// ha.be.Spr.Muat
	readonly blitz_Muat: TToolBoxBlockDef = {
		type: "ha.be.Spr.Muat",
		message0: 'Load Image from URL: %2 %1',
		perintah: "LoadImage",
		args: {
			dummy: '',
			url: "./imgs/box.png"
		},
		inputsInline: true,
		output: EOutput.Any,
		tooltip: `
            Loads an image from a URL.
            URL can be local or absolute.
        `
	}

	constructor() {
		this.list.push(this.blitz_Muat);
		// LoadAnimImage
		// ha.be.Spr.MuatAnimasi
		this.list.push({
			type: "ha.be.Spr.MuatAnimasi",
			message0: "Load Animated Image %1 from URL: %2 frame width: %3 frame height: %4",
			perintah: "LoadAnimImage",
			args: {
				dummy: '',
				url: "./imgs/exp2_0.png",
				fw: 32,
				fh: 32
			},
			inputsInline: true,
			output: EOutput.Any,
			tooltip: `
            Load an image in the form of a sprite sheet
            
            Params:
            url: image URL, can be local or absolute
            fw: frame width
            fh: frame height
            `
		})

		// const ImageLoaded = ha.be.Spr.Dimuat;
		// ImageLoaded
		this.list.push({
			type: "ha.be.Spr.Dimuat",
			perintah: "ImageLoaded",
			message0: "Image %1 has been loaded",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
			},
			tooltip: `Return true if the image is already loaded`,
			output: EOutput.Boolean
		})

		// const AllImageLoaded = ha.be.Spr.StatusMuat;
		this.list.push({
			type: "ha.be.Spr.StatusMuat",
			perintah: "AllImageLoaded",
			message0: "All images have been loaded",
			output: EOutput.Boolean,
			tooltip: 'Return true if All Images have been loaded'
		})

		this.gambar();

		// const PositionImageXY = ha.be.Spr.Posisi;
		// PositionImageXY
		this.list.push({
			type: "ha.be.Spr.Posisi",
			perintah: "PositionImageXY",
			message0: "Image %1 Position x %2 y %3",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
				x: 0,
				y: 0
			},
			tooltip: `Set Image Position`
		})

		// HandleImage
		// ha.be.Spr.Handle
		this.list.push({
			type: "ha.be.Spr.Handle",
			message0: "Image %2 center x %3 y %4 %1",
			perintah: "Handle",
			inputsInline: true,
			args: {
				dummy: '',
				sprite: EOutput.Image,
				x: 0,
				y: 0,
			},
			tooltip: `
            Set the center position of an Image.
            The center position is used as a reference for rendering, rotation, etc.
            The center position is calculated from the top-left corner.
            `
		})

		// ResizeImage
		// ha.be.Spr.Ukuran;
		this.list.push({
			type: "ha.be.Spr.Ukuran",
			perintah: "ResizeImage",
			message0: "Image %2 panjang %3 lebar %4 %1",
			inputsInline: true,
			args: {
				dummy: '',
				sprite: EOutput.Image,
				width: 0,
				height: 0,
			},
			tooltip: `Merubah ukuran panjang dan lebar dari Image`
		})

		this.polar();

		// ha.be.Spr.Tabrakan
		//Collide
		this.list.push({
			type: "ha.be.Spr.Tabrakan",
			perintah: "Collide",
			message0: "Check if Image %1 collides with Image %2",
			args: {
				sprite1: EOutput.Image,
				sprite2: EOutput.Image,
			},
			output: EOutput.Boolean,
			inputsInline: true,
			tooltip: 'Return true if two images collide'
		})

		//TODO
		// CopyImage

		/**
		 * INFO
		 * ==== 
		 */
	}

	gambar() {
		// DrawImage
		this.list.push({
			type: "ha.be.Spr.Gambar_no_frame",
			perintah: "DrawImage",
			message0: "Draw Image %1",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
			},
			tooltip: `Menggambar image ke layar`
		})

		// DrawImage
		// ha.be.Spr.GambarXY
		// DrawImageXY
		this.list.push({
			type: "ha.be.Spr.Gambar",
			message0: "Draw Image %1 at position x: %2 y: %3 %4",
			perintah: "DrawImageXY",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
				x: 0,
				y: 0,
				dummy: ""
			},
			tooltip: `
            Draw an image at position x, y.
        `
		})

		// TileImage
		//ha.be.Spr.Ubin;
		this.list.push({
			type: "ha.be.Spr.Ubin",
			message0: "Draw tiled image %1 at position x %2 y %3 frame %4",
			perintah: "Tile",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
				x: 0,
				y: 0,
				frame: 0,
				dummy: ''
			},
			tooltip: `
            Render an image with tiling effect filling the screen
            `
		})

		// DrawImageAnim
		// DrawImage
		// ha.be.Spr.Gambar animasi
		this.list.push({
			type: "ha.be.Spr.Gambar_animasi",
			message0: "image %2 %1 gambar dengan frame: %3",
			perintah: "DrawImage",
			inputsInline: true,
			args: {
				dummy: '',
				sprite: EOutput.Image,
				frame: 0,
			},
			tooltip: `
			Menggambar Image pada frame tertentu
        `
		})

		// const DrawAllImage = ha.be.Spr.GambarSemua;
		this.list.push({
			type: "ha.be.Spr.GambarSemua",
			perintah: "DrawAllImage",
			message0: "Gambar semua",
			tooltip: 'Menggambar semua image, di urutkan berdasarkan urutan gambar di buat'
		})

	}

	polar() {
		// const PositionImagePolar = ha.be.Spr.posisiPolar;
		// PositionImagePolar
		//depecrated
		this.list.push({
			type: "ha.be.Spr.posisiPolar_no_scale",
			perintah: "PositionImagePolar",
			message0: "Image %1 Poisisi relative terhadap x %4 y %5 sudut %2 jarak %3",
			inputsInline: true,
			args: {
				sprite: {},
				angle: 0,
				dist: 100,
				x: 0,
				y: 0,
			},
			tooltip: `
				Posisikan Image relative terhadap x, y dengan jarak dan sudut tertentu
	        `
		})

		// const PositionImagePolar = ha.be.Spr.posisiPolar;
		// PositionImagePolar
		this.list.push({
			type: "ha.be.Spr.posisiPolar",
			perintah: "PositionImagePolar",
			message0: "Image %1 Posisi reltive terhadap x %4 y %5 sudut %2 at jarak %3 skala x %6 skala y %7",
			inputsInline: true,
			args: {
				sprite: {},
				angle: 0,
				dist: 100,
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1
			},
			tooltip: `
            Position the image relative to x, y with a specified distance and scale
            `
		})

		// const PositionImagePolar = ha.be.Spr.posisiPolar;
		// PositionImagePolar
		this.list.push({
			type: "ha.be.Spr.posisiPolar_tilt",
			perintah: "PositionImagePolar",
			message0: "Image %1 Posisi relative terhadap x %4 y %5 sudut %2 jarak %3 skala x %6 skala y %7 kemiringan %8",
			inputsInline: true,
			args: {
				sprite: {},
				angle: 0,
				dist: 100,
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1,
				tilt: 0
			},
			tooltip: `
				Posisikan Image relative terhadap x, y, dengan jarak, skala dan kemiringan tertentu
			`
		})

		//TODO: jarak antar image

	}

	posisi() {


	}
}
export const imageBlockData = new ImageBlockData();

//next
// const Loaded = ha.be.Spr.Dimuat;
// const StatusMuat = ha.be.Spr.StatusMuat;
// const Posisi = ha.be.Spr.Posisi;
// const PosisiPolar = ha.be.Spr.posisiPolar;
// const GambarSemua = ha.be.Spr.GambarSemua;
// const PosisiX = ha.be.Spr.PosisiX;
// const PosisiY = ha.be.Spr.PosisiY;
// const Alpha = ha.be.Spr.Alpha;
// const StatusDrag = ha.be.Spr.StatusDrag;
// const Copy = ha.be.Spr.Copy;
// const Bound = ha.be.Spr.Bound;

//next 2
// const SpriteKontek = ha.be.Spr.kontek;

//not supported
// CreateImage
// FreeImage
// SaveImage
// GrabImage
// ImageBuffer
// DrawImageRect
// DrawBlockRect
// DrawBlock
// TileBlock
// MaskImage
// MidHandle => todo
// AutoMidHandle => todo
// ScaleImage
// TFormImage
// TFormFilter
// ImagesOverlap
// RectsOverlap
// ImageRectOverlap
// ImageRectCollide
