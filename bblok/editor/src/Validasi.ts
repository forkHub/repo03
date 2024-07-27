export class Val {
	static cek(): boolean {
		return true;
	}

	static paramEmpty(str: string, msg: string) {
		if (str == "") throw msg;
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