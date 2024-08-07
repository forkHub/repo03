import { Index2 } from "./index2";

export class Val {
	static readonly PARAM_ISI = 'Semua parameter wajib di isi';

	static cek(): boolean {
		return true;
	}

	static checkAllBlock() {
		// console.group("check all block");

		function checkValid(str: string): boolean {
			if (str == "procedures_defnoreturn") return false;
			if (str == "procedures_defreturn") return false;
			if (str == 'ha.be.Be.Start') return false;
			if (str == 'ha.be.Be.Update') return false;
			return true;
		}

		//check read only
		Index2.workspace.getAllBlocks().forEach((item) => {
			console.log("data:", item.data);
		});

		Index2.workspace.getAllBlocks().forEach((item) => {
			// console.log("data:", item.data);

			//check parent null
			if (item.getParent() == null) {

				console.log(item.type + "/" + item.id);

				if (checkValid(item.type)) {
					Index2.workspace.highlightBlock(item.id);

					let msg = 'Ada block yang tidak punya parent.\n';
					msg += 'Semua blok harus diletakkan di dalam grup Start/Update.\n';

					throw msg;
				}
			}
		})

		// console.groupEnd();
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