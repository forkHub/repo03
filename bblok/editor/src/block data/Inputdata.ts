import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class InputBlockData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Pointer";
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {
		// ha.be.Input.InputHit;
		// InputHit
		this.list.push({
			type: "ha.be.Input.InputHit",
			perintah: "InputHit",
			message0: "Jumlah Ditekan",
			tooltip: `
            Berapa banyak pointer di tekan, dihitung sejak pemanggilan terakhir.
			Fungsi ini cocok dipanggil di bagian Update
        `,
			output: EOutput.Number
		})

		//TODO:
		//InputHit

		// ha.be.Input.InputX;
		this.list.push({
			type: "ha.be.Input.InputX",
			perintah: "InputX",
			message0: "Pointer X",
			tooltip: "posisi X dari pointer",
			output: EOutput.Number
		})

		// ha.be.Input.InputY
		this.list.push({
			type: "ha.be.Input.InputY",
			perintah: "InputY",
			message0: "Pointer Y",
			tooltip: "Posisi Y dari pointer",
			output: EOutput.Number
		})

		//Input extended
		// ===========

		// ha.be.Input.Pencet
		this.list.push({
			type: "ha.be.Input.Pencet",
			perintah: "InputIsDown",
			message0: "Pointer Ditekan",
			tooltip: "Mebgecek apakah pointer sedang di tekan",
			output: EOutput.Boolean
		})

		// const GeserX = ha.be.Input.GeserX;
		this.list.push({
			type: "ha.be.Input.GeserX",
			perintah: "InputDragX",
			message0: "Drag X",
			tooltip: "Posisi x saat di drag, relatif terhadap posisi awal drag",
			output: EOutput.Number
		})

		// const DragY = ha.be.Input.GeserY;
		this.list.push({
			type: "ha.be.Input.GeserY",
			perintah: "InputDragY",
			message0: "Drag Y",
			tooltip: "Posisi y saat di drag, relatif terhadap posisi awal drag",
			output: EOutput.Number
		})

		// const IsDragged = ha.be.Input.Geser;
		this.list.push({
			type: "ha.be.Input.Geser",
			perintah: "InputIsDragged",
			message0: "Pointer di drag",
			tooltip: "Mengecek apakah pointer sedang di drag",
			output: EOutput.Boolean
		})

		// const InputDragStartX = ha.be.Input.InputXAwal;
		this.list.push({
			type: "ha.be.Input.InputXAwal",
			perintah: "InputDragStartX",
			message0: "Drag X Awal",
			tooltip: "Posisi X saat drag dimulai",
			output: EOutput.Number
		})

		// const InputDragStartY = ha.be.Input.InputYAwal;
		this.list.push({
			type: "ha.be.Input.InputYAwal",
			perintah: "InputDragStartY",
			message0: "Drag Y Awal",
			tooltip: "Posisi Y saat drag dimulai",
			output: EOutput.Number
		})

		// const InputTapCount = ha.be.Input.JmlTap;
		this.list.push({
			type: "ha.be.Input.JmlTap",
			perintah: "InputTapCount",
			message0: "Jumlah tap",
			tooltip: `
            Jumlah tap terhitung sejak pemanggilan terakhir.
			Panggil blok ini di bagian Update
        `,
			output: EOutput.Number
		})

		// const InputDragStartCount = ha.be.Input.JmlDragMulai;
		this.list.push({
			type: "ha.be.Input.JmlDragMulai",
			perintah: "InputDragStartCount",
			message0: "Jumlah Drag Dimulai",
			tooltip: `
            Jumlah drag dimulai dihitung sejak pemanggilan terakhir.
			Taruh blok ini di bagian Update
        `,
			output: EOutput.Number
		})

		// const InputDragEndCount = ha.be.Input.JmlDragSelesai;
		this.list.push({
			type: "ha.be.Input.JmlDragSelesai",
			perintah: "InputDragEndCount",
			message0: "Jumlah Drag Selesai",
			tooltip: `
			Jumlah drag selesai, dihitung sejak pemanggilan terakhir.
			Letakkan blok ini di bagian Update
        `,
			output: EOutput.Number
		})
	}



}

export const inputBlockData = new InputBlockData();


