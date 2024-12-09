interface IDir {
	nama: string;
	url: string;
	parent: IDir;
	member: IDir[]
}

class Dir implements IDir {
	private _nama: string;
	private _url: string;
	private _parent: Dir;
	readonly member: Dir[] = [];
	private static _cont: HTMLDivElement;

	public static get cont(): HTMLDivElement {
		return Dir._cont;
	}
	public static set cont(value: HTMLDivElement) {
		Dir._cont = value;
	}

	public get parent(): Dir {
		return this._parent;
	}
	public set parent(value: Dir) {
		this._parent = value;
	}


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
			d.parent = this;
			d.fromData(item);
			this.member.push(d);
		});
	}

	getParent(ar: Dir[]): void {
		if (this.parent) {
			ar.push(this.parent);
			this.parent.getParent(ar);
		}
	}

	renderDir(): HTMLDivElement {
		let el: HTMLDivElement = document.createElement('div');
		el.innerHTML = `<span> ${this.nama} </span>`;
		el.onclick = () => {
			//console
			console.log('render dir');
			Dir.render(this);
		}
		return el;
	}

	renderFile(): HTMLDivElement {
		let el: HTMLDivElement = document.createElement('div');
		let img: HTMLImageElement = document.createElement('img');
		img.src = this._url;
		let urlEl: HTMLInputElement = document.createElement('input');
		urlEl.type = 'text';
		urlEl.value = this._url;

		el.appendChild(img);
		el.appendChild(urlEl);

		return el;
	}

	static render(dir: Dir) {
		this._cont.innerHTML = ``;
		//render parent
		dir.renderChild(this._cont);
	}

	renderAsItem(cont: HTMLDivElement) {
		if (this.member.length > 0) {
			//render dir
			cont.appendChild(this.renderDir());
		}
		else if (this.url != undefined) {
			//render image
			cont.appendChild(this.renderFile());
		}
		else {
			throw "Nama dan Url Undefined";
		}
	}

	renderChild(cont: HTMLDivElement) {
		cont.innerHTML = '';
		this.member.forEach((item) => {
			item.renderAsItem(cont);
		});
	}
}


