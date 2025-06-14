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
		this.propWidth();
		this.alpha();
		this.dragType();
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
			tooltip: 'Reads the Alpha property (0 - 100)',
			f: (arg: string[]): string => {
				return arg[0] + ".alpha";
			}
		})

		// Alpha setter
		this.list.push({
			type: "Image_alpha_setter",
			message0: "Image %1 alpha = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `Sets the alpha value of the image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".alpha = " + arg[1];
				return res;
			}
		})
	}

	private panjang() {
		// let s:ha.be.SprObj;
		// s.length;

		this.list.push({
			type: "ha.be.Spr.Length",
			message0: "Image %2 length %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".length";
			},
			tooltip: `
			Image length.
			Returns 0 if the image is still loading`
		})

		//length setter
		this.list.push({
			type: "Image_length_setter",
			message0: "Image %1 length = %2",
			args: {
				sprite: EOutput.Image,
				number: 0
			},
			tooltip: `sets the length of the image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".length = " + arg[1];
				return res;
			}
		})

	}

	// width property
	private propWidth() {
		// let spr: ha.be.SprObj;
		// spr.width

		let tip = `
			Image Width
			Returns 0 if the image is still loading
		`

		//getter
		this.list.push({
			type: "ha.be.Spr.Width",
			message0: "Image %2 width %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".width";
			},
			tooltip: tip
		});

		//width setter
		this.list.push({
			type: "Image_width_setter",
			message0: "Image %1 width = %2",
			args: {
				sprite: EOutput.Image,
				number: 0
			},
			tooltip: `sets the width of the image`,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".width = " + arg[1];
				return res;
			}
		})
	}

	// drag type property
	private dragType() {
		let tip = `
		Drag types:
		1. move
		2. rotate
		3. remote move, move without touching the block first
		4. remote rotate, rotate without touching the block first
		`;

		// let spr:ha.be.SprObj;
		// spr.dragType;
		this.list.push({
			type: "ha.be.Spr.DragMode2",
			message0: "Image %2 drag type %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				Val.kosongs(arg);
				return arg[0] + ".dragType";
			},
			tooltip: tip,
			output: EOutput.Number,
		})

		//setter
		this.list.push({
			type: "Image_drag_type_setter",
			message0: "Image %1 drag type = %2",
			args: {
				sprite: EOutput.Image,
				number: 0
			},
			tooltip: tip,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".dragType = " + arg[1];
				return res;
			}
		})
	}


	private handleX() {
		// ImageXHandle (getter)
		// ha.be.Spr.HandleX
		this.list.push({
			type: "ha.be.Spr.HandleX",
			message0: "Image %2 center X %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				return arg[0] + ".handleX";
			},
			tooltip: `Center X
            The center point is used as a reference for drawing and scaling.
            `,
			output: EOutput.Number,
		})

		//setter
		// Image handle X Setter
		this.list.push({
			type: "Image_Handle_X_Setter",
			message0: "Image %1 center X = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `Set center X
            The center point is used as a reference for drawing and scaling.
            `,
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".handleX = " + arg[1];
				return res;
			}
		})

	}

	private handleY() {
		//handle Y
		this.list.push({
			type: "ha.be.Spr.HandleY",
			message0: "Image %2 center Y %1",
			args: {
				dummy: '',
				sprite: EOutput.Image,
			},
			f: (arg: string[]): string => {
				return arg[0] + ".handleY";
			},
			tooltip: `Center Y
            The center point is used as a reference for drawing and scaling.
            `,
			output: EOutput.Number,
			inputsInline: true
		})

		//setter
		// Image handle Y Setter
		this.list.push({
			type: "Image_Handle_Y_Setter",
			message0: "Image %1 center Y = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: `Set center Y
            The center point is used as a reference for drawing and scaling.
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
			message0: "Image %1 drag status",
			args: {
				sprite: EOutput.Image,
			},
			inputsInline: true,
			output: EOutput.Boolean,
			f: (arg: string[]): string => {
				return arg[0] + ".dragged";
			},
			tooltip: `
                Returns true if the image is being dragged, and false if not.
                This block is read-only.
            `
		})
	}

	private propX() {
		// Image X Getter
		// const ImageXPosition = ha.be.Spr.PosisiX;
		this.list.push({
			type: "ha.be.Spr.PosisiX",
			perintah: "ImageXPosition",
			message0: "Image %1 X",
			args: {
				sprite: EOutput.Image,
			},
			inputsInline: true,
			output: EOutput.Number,
			tooltip: 'Image X position',
			f: (arg: string[]): string => {
				Val.kosong(arg[0]);
				let res = arg[0] + ".x"
				return res;
			}
		})

		// Image X Setter
		this.list.push({
			type: "ha.be.Spr.PosisiX_Setter",
			perintah: "",
			message0: "Image %1 X = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			inputsInline: true,
			tooltip: 'Set image X position',
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
			tooltip: 'Image Y Position',
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
			tooltip: 'Set Image Y Position',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".y = " + arg[1];

				return res;
			}
		})
	}

	private propRot() {
		// Rotation Getter
		// Rotation
		// ha.be.Spr.Rotasi
		this.list.push({
			type: "ha.be.Spr.Rotasi_get",
			message0: "Image %1 rotation",
			args: {
				sprite: EOutput.Image,
			},
			output: EOutput.Number,
			tooltip: 'Image Rotation',
			f: (arg: string[]): string => {
				Val.kosong(arg[0]);
				return arg[0] + ".rotation";
			}
		})

		// Image Rotation Setter
		this.list.push({
			type: "Image_Rotasi_Y_Setter",
			message0: "Image %1 rotation = %2",
			args: {
				sprite: EOutput.Image,
				angka: 0
			},
			tooltip: 'Set Image Rotation (0 - 360)',
			f: (arg: string[]): string => {
				Val.kosongs([arg[0], arg[1]]);
				let res = arg[0] + ".rotation = " + arg[1];
				return res;
			}
		})
	}

}

export const imageBlockData2 = new ImageBlockData2();