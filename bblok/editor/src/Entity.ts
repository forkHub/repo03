// import { demoList } from "./List";
import { Store } from "./Store";

declare var demoData: IEntity[];

export enum EEntity {
	PROJECT = "project",
	FILE = "file",
}

export class Entity {
	private static readonly dbName = 'ha.blockly.data2';
	// private static readonly dbDemoName = 'ha.blockly.dataDemo';
	private static dbAktif = '';
	static readonly list: IEntity[] = [];

	// static loadDemoData() {
	// 	this.dbAktif = this.dbDemoName;
	// 	demoData.forEach((item) => {
	// 		this.list.push(item);
	// 	})
	// 	this.commit();
	// }

	static loadLocalData() {
		this.dbAktif = this.dbName;

		let str;
		let obj: IEntity[];

		while (this.list.length > 0) {
			this.list.pop();
		}

		str = window.localStorage.getItem(this.dbAktif);
		obj = JSON.parse(str);

		obj.forEach((item) => {
			this.list.push(item);
		})

	}

	private static loadListProjek() {
		try {
			/*
			if (Store.tutMode) {
				while (Entity.list.length > 0) {
					Entity.list.pop();
				}

				demoList.forEach((item) => {
					Entity.list.push(item);
				});
				return;
			}
			*/

			/*
			if (Store.devMode) {
				this.loadDemoData();
				//TODO:
				// this.loadDataFromUrl("./tut/demo.json");
				return;
			}
			*/

			if (Store.pMode) {

			}

			this.loadLocalData();
		}
		catch (e) {
			console.log('load error');
			console.warn(e);
		}
	}

	static init() {
		this.loadListProjek();
	}

	/*
	static loadDataFromUrl(url: string): void {
		try {

			fetch(
				url, //"./tut/list.json",
				{
					// headers: { 'Content-Type': 'application/json' }, // Added in response to comment
					method: 'GET',
				}
			).then(function (response) {
				console.log(response);
				console.log(response.text().then((e) => {
					console.group("load projek list response text")
					console.log(e);
					console.groupEnd();

					while (Entity.list.length > 0) {
						Entity.list.pop();
					}

					let obj = JSON.parse(e);

					obj.forEach((item: any) => {
						Entity.list.push(item);
					})

				}));
			}).catch((e) => {
				console.error(e);
			})
		}
		catch (e) {
			console.error(e);
		}

	}
	*/

	//session data
	static loadDataFromStorage(): string {
		try {
			let str = window.localStorage.getItem(this.dbAktif);
			return str;
		}
		catch (e) {
			console.log('load error');
			console.warn(e);
			return "";
		}
	}

	static getProjekByName(nama: string): IProject {
		let list: IProject[] = this.getByType(EEntity.PROJECT) as IProject[];
		let h: IProject;

		list.forEach((item) => {
			if (item.nama == nama) {
				h = item;
			}
		})

		return h;
	}

	static getByType(ty: EEntity): IEntity[] {
		let hasil: IEntity[] = [];

		this.list.forEach((item) => {
			if (item.type == ty) {
				hasil.push(item);
			}
		})

		return hasil;

	}

	static getById(id: string): IEntity {
		let hasil: IEntity;

		this.list.forEach((item) => {
			if (item.id == id) {
				hasil = item;
			}
		})

		return hasil;
	}

	static getByParentId(pId: string): IEntity {
		let hasil: IEntity;

		this.list.forEach((item) => {
			if (item.parentId == pId) {
				hasil = item;
			}
		})

		return hasil;
	}

	static update(id: string, data: IEntity) {
		this.delete(id);
		this.tambah(data);
	}

	static delete(id: string): void {
		console.group('delete by id ' + id);
		for (let i = 0; i < this.list.length; i++) {
			if (this.list[i].id == id) {
				console.log('deleted ' + id);
				this.list.splice(i, 1);
				break;
			}
		}
		console.groupEnd();
	}

	static tambah(data: IEntity): void {
		this.list.push(data);
	}

	static commit() {
		try {
			window.localStorage.setItem(this.dbAktif, JSON.stringify(this.list));
		}
		catch (e) {
			console.error(e);
		}
	}
}

export class Project {

	getById(id: string): IProject {
		return Entity.getById(id) as IProject;
	}

	delete(id: string): void {
		Entity.delete(id);
	}

	update(data: IProject): void {
		Entity.update(data.id, data);
	}

	tambah(data: IProject): void {
		Entity.tambah(data);
	}
}

export class File {
	getById(id: string): IFile {
		id;
		return null;
	}

	delete(id: string): void {
		id;
	}

	update(data: IFile): void {
		data;
	}

	tambah(data: IFile): void {
		data;
	}
}

export interface IEntity {
	id: string,
	type: string,
	parentId: string
}

export interface IProject extends IEntity {
	nama: string
}

export interface IFile extends IEntity {
	nama: string,
	wspace: string
}
