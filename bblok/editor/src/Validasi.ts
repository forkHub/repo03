import { Store } from "./Store";
import { Index2 } from "./index2";
import * as Blockly from 'blockly/core';

export class Val {
	static readonly PARAM_ISI = 'Semua parameter wajib di isi\n';

	static checkAllBlock() {
		this.parentKosong();
		this.parameterLengkap();
		this.checkMetaData();

		//check metadata

	}

	static checkMetaData() {
		let obj = Blockly.serialization.workspaces.save(Index2.workspace);
		let hasil: any[] = [];

		console.group('check metadata');

		//parsing code
		ha.Obj.cariFunc(obj, (objP: any): boolean => {
			if (objP.type == 'set var') {
				checkSetVar(objP);
			}
			return true;
		}, hasil);

		console.groupEnd();

		function checkSetVar(obj: any) {
			for (let i = 0; i < Store.semuBlok.length; i++) {
				let blok = Store.semuBlok[i];
				if (blok.type == 'set var') {
					blok.val(obj);
				}
			}
		}
	}

	static parentKosong() {

		function checkValid(str: string): boolean {
			if (str == "procedures_defnoreturn") return false;
			if (str == "procedures_defreturn") return false;
			if (str == 'ha.be.Be.Start') return false;
			if (str == 'ha.be.Be.Update') return false;
			return true;
		}

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
	}

	//TODO: depecrated
	static paramEmpty(str: string) {
		if (str == null || str == "") throw Val.PARAM_ISI;
	}

	private static parameterLengkap() {
		let err: string = '';

		console.log("check param diisi");
		Index2.workspace.getAllBlocks().forEach((itemWP) => {
			try {
				if (itemWP["inputList"] == undefined) return;
				if (itemWP["inputList"] == null) return;
				if (itemWP.type == "ha.be.Be.Start") return;
				if (itemWP.type == "ha.be.Be.Update") return;

				let obj = Blockly.serialization.workspaces.save(Index2.workspace);
				let hasil: any[] = [];

				ha.Obj.cariFunc(obj, (objP: any): boolean => {
					if (objP["id"] == itemWP.id) {
						console.log('object id sama, id ' + itemWP.id);
						let jmlInputWP = itemWP.inputList.length;
						let jmlInputJson = objP.inputs ? Object.entries(objP.inputs).length : 0;

						itemWP.inputList.forEach((item) => {
							if (item.name == "") {
								jmlInputWP--;
							}
							else if (item.name == "TOPROW") {
								jmlInputWP--;
							}
						})

						if (jmlInputWP > jmlInputJson) {
							console.group();
							console.log("obj id " + itemWP.id);
							console.log("highlight " + itemWP.id);
							console.log("object wp json", objP);
							console.log("object wp ori", itemWP);
							console.log("input wp", jmlInputWP);
							console.log("input json", jmlInputJson);
							console.log("input", objP.inputs);
							console.groupEnd();
							Index2.workspace.highlightBlock(itemWP.id);
							err = this.PARAM_ISI;
						}

						return true;
					};
					return false;
				}, hasil);
			}
			catch (e) {
				//TODO:
				//validasi error
				console.log(e)
			}
		})

		if (err.length > 0) throw err;
	}
}
