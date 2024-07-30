import { Events } from "blockly";
import { Index2 } from "./index2";

export class Event {
	static init() {
		Index2.workspace.addChangeListener((e) => {
			console.log(e.type);
			if (e.type == Events.CLICK) {
				let blockId = (e as Events.Click).blockId;
				let block = Index2.workspace.getBlockById(blockId);
				if (block) {
					block.setHighlighted(false);
				}
			}
		})
	}
}