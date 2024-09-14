import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class ImageBlockData {
	readonly group: string = "Image ";
	readonly list: TToolBoxBlockDef[] = [];
	readonly hidden = "false";
	readonly toolbox = false;

	// ha.be.Spr.Muat
	readonly blitz_Muat: TToolBoxBlockDef = {
		type: "ha.be.Spr.Muat",
		message0: 'Muat Image dari URL: %2 %1',
		perintah: "LoadImage",
		args: {
			dummy: '',
			url: "./imgs/box.png"
		},
		inputsInline: true,
		output: EOutput.Any,
		tooltip: `
            Memuat Image dari url.
            Url bisa local atau absolute.
        `
	}

	constructor() {
		this.list.push(this.blitz_Muat);
		// LoadAnimImage
		// ha.be.Spr.MuatAnimasi
		this.list.push({
			type: "ha.be.Spr.MuatAnimasi",
			message0: "Muat Image animasi %1 dari url: %2 panjang frame: %3 lebar frame: %4",
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
        Memuat image yang berbentuk spritesheet
           
        Params:
        url: url gambar, bisa local atau absolute
        fw: panjang frame
        fh: lebar frame
        `
		})

		// const ImageLoaded = ha.be.Spr.Dimuat;
		// ImageLoaded
		this.list.push({
			type: "ha.be.Spr.Dimuat",
			perintah: "ImageLoaded",
			message0: "Image %1 sudah diload",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
			},
			tooltip: `Return true is image is already loaded`,
			output: EOutput.Boolean
		})

		// const AllImageLoaded = ha.be.Spr.StatusMuat;
		this.list.push({
			type: "ha.be.Spr.StatusMuat",
			perintah: "AllImageLoaded",
			message0: "Semua image sudah diload",
			output: EOutput.Boolean,
			tooltip: 'Return true if All Images have been loaded'
		})

		this.gambar();

		// const PositionImageXY = ha.be.Spr.Posisi;
		// PositionImageXY
		this.list.push({
			type: "ha.be.Spr.Posisi",
			perintah: "PositionImageXY",
			message0: "Image %1 Posisi x %2 y %3",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
				x: 0,
				y: 0
			},
			tooltip: `Mengatur posisi Image`
		})

		// HandleImage
		// ha.be.Spr.Handle
		this.list.push({
			type: "ha.be.Spr.Handle",
			message0: "Image %2 pusat x %3 y %4 %1 ",
			perintah: "Handle",
			inputsInline: true,
			args: {
				dummy: '',
				sprite: EOutput.Image,
				x: 0,
				y: 0,
			},
			tooltip: `
			Mengatur posisi pusat dari sebuah Image. 
			Posisi pusat dipakai sebagai acuan saat menggambar, rotasi, dll
			Posisi pusat dihitung pojok kiri atas. 
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
			message0: "check Image %1 tabrakan dengan Image %2",
			args: {
				sprite1: EOutput.Image,
				sprite2: EOutput.Image,
			},
			output: EOutput.Boolean,
			inputsInline: true,
			tooltip: 'return true if two images is collided'
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
			message0: "Image %1 Gambar",
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
			message0: "Image %1 gambar pada posisi x: %2 y: %3 %4",
			perintah: "DrawImageXY",
			inputsInline: true,
			args: {
				sprite: EOutput.Image,
				x: 0,
				y: 0,
				dummy: ""
			},
			tooltip: `
            Menggambar image pada posisi x, y.
        `
		})

		// TileImage
		//ha.be.Spr.Ubin;
		this.list.push({
			type: "ha.be.Spr.Ubin",
			message0: "image %1 gambar ubin %5 posisi x %2 y %3 frame %4",
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
            Menggambar image dengan efek ubin yang memenuhi layar
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
				Posisikan Image relative terhadap x, y dengan jarak, dan skala tertentu
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
