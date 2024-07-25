import { EOutput, TToolBoxBlockDef } from "../toolboxType";

class HiddenData {
	readonly list: TToolBoxBlockDef[] = [];
	readonly group = "hidden";
	readonly hidden = "true";
	readonly toolbox = false;

	// ha.be.Be.Grafis
	// depecrated
	readonly Grafis: TToolBoxBlockDef = {
		type: "ha.be.Be.Grafis",
		perintah: "Graphics",
		message0: "Graphics %1 width: %2 height: %3",
		inputsInline: true,
		args: {
			dummy: '',
			width: 320,
			height: 240
		},
		hidden: 'hidden',
		tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
	};

	constructor() {
		this.list.push(this.Grafis);

		// ImagesCollideXY
		// ha.be.Spr.TabrakanXY;
		this.list.push({
			type: "ha.be.Spr.TabrakanXY",
			message0: "image1 %2 at x1 %3 y1 %4 %1 collide with image2 %5 at x2 %6 y2 %7",
			perintah: "ha.be.Spr.TabrakanXY",
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
			perintah: "ha.be.Spr.TabrakanXY",
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

		this.list.push({
			type: "ha.be.Spr.DragMode",
			perintah: "ha.be.Spr.DragMode",
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


		this.list.push({
			type: "ha.be.Be.Start",
			perintah: "Graphics",
			message0: "🛩️ Start %1 width: %2 height: %3 %4",
			inputsInline: true,
			args: {
				dummy: '',
				width: 320,
				height: 240,
				statement: ""
			},
			stmt: false,
			tooltip: `
				Start Application.
				Use this block as the first block in your app.
	
	
				Parameters:
				width: prefered canvas width
				height: prefered canvas height
			`
		});

		// Update
		this.list.push({
			type: "ha.be.Be.Update",
			perintah: "function #update",
			message0: "⏱️ update %1 %2 %3",
			inputsInline: false,
			args: {
				dummy: "",
				input_end_row: "",
				statement: ""
			},
			stmt: true,
			hat: true,
			tooltip: `
				Update Application.
				Will be called up to 60x per second.
				Put all block to update app here
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
}
export const hiddenData = new HiddenData();