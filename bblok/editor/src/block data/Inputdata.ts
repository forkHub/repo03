import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class InputBlockData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "Mouse";
	readonly hidden = "false";
	readonly toolbox = false;

	constructor() {

		// ha.be.Input.InputHit;
		// InputHit
		this.list.push({
			type: "ha.be.Input.InputHit_V2",
			perintah: "InputHit",
			message0: "Mouse telah Ditekan",
			tooltip: `
			Check apakah mouse telah ditekan.
			Blok ini hanya boleh ditaruh sekali di workspace.
			Taruh blok ini dalam bagian Update.
        `,
			output: EOutput.Boolean
		})


		// ha.be.Input.InputX;
		this.list.push({
			type: "ha.be.Input.InputX",
			perintah: "InputX",
			message0: "Mouse X",
			tooltip: "posisi X dari mouse",
			output: EOutput.Number
		})

		// ha.be.Input.InputY
		this.list.push({
			type: "ha.be.Input.InputY",
			perintah: "InputY",
			message0: "Mouse Y",
			tooltip: "Posisi Y dari mouse",
			output: EOutput.Number
		})

		//Input extended
		// ===========

		// ha.be.Input.Pencet
		this.list.push({
			type: "ha.be.Input.Pencet",
			perintah: "InputIsDown",
			message0: "Mouse sedang Ditekan",
			tooltip: "Mengecek apakah mouse sedang di tekan",
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
			message0: "Mouse di drag",
			tooltip: "Mengecek apakah mouse sedang di drag",
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
			message0: "Mouse Click",
			tooltip: `
            Mengecek apakah Mouse telah di klik.
			Panggil blok ini di bagian Update.
			Blok ini hanya boleh ditaruh sekali di workspace.
        `,
			output: EOutput.Boolean
		})


	}

}

export const inputBlockData = new InputBlockData();


