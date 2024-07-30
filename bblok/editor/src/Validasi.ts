import { Index2 } from "./index2";

export class Val {
	static readonly PARAM_ISI = 'Semua parameter wajib di isi';

	static cek(): boolean {
		return true;
	}

	static checkAllBlock() {
		Index2.workspace.getAllBlocks().forEach((item) => {
			// item.inputList.forEach((input2) => {
			// 	input2.connection.
			// })

			//check parent null
			if (item.getParent() == null) {
				if (item.type != 'ha.be.Be.Start') {
					if (item.type != 'ha.be.Be.Update') {
						Index2.workspace.highlightBlock(item.id);
						// throw "ada block yang tidak punya parent";
					}
				}
			}
		})
	}

	static paramEmpty(str: string) {
		if (str == null || str == "") throw Val.PARAM_ISI;
	}

	static param(list: any[], jml: number, msg: string) {
		if (list == undefined) {
			throw msg;
		}

		if (list.length < jml) {
			throw msg;
		}
	}
}