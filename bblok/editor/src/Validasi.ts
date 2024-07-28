export class Val {
	static readonly PARAM_ISI = 'Semua parameter wajib di isi';

	static cek(): boolean {
		return true;
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