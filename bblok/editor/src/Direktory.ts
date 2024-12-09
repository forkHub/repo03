
export interface IDir {
	nama?: string,
	url?: string,
	member: IDir[]
}

export class Dir implements IDir {
	private _nama: string;
	private _url: string;
	readonly member: IDir[] = [];

	public get nama(): string {
		return this._nama;
	}
	public set nama(value: string) {
		this._nama = value;
	}
	public get url(): string {
		return this._url;
	}
	public set url(value: string) {
		this._url = value;
	}

	fromData(data: IDir) {
		this.nama = data.nama;
		this.url = data.url;

		while (this.member.length > 0) {
			this.member.pop();
		}

		data.member.forEach((item) => {
			let d: Dir = new Dir();
			d.fromData(item);
			this.member.push(d);
		});
	}

	render(cont: HTMLDivElement) {
		let el: HTMLElement = null//TODO:

		if (this.nama != undefined) {

		}
		else if (this.url != undefined) {

		}
		else {
			throw "Nama dan Url Undefined";
		}

		cont.appendChild(el); //TODO:
	}
}




let data: IDir = {
	member: []
}

let dir: Dir = new Dir();
dir.fromData(data);

