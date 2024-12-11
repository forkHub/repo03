import { IFile, Entity, IProject, EEntity } from "../Entity";
import { Store } from "../Store";
import { Dialog } from "./HalDialog";
import { Index2 } from "../index2";
import * as Blockly from 'blockly/core';
import { List, demoList } from "../List";

export class HalListProject {
	private static cont: HTMLDialogElement;
	private static listCont: HTMLDivElement;
	private static projekList: ProjectList;

	static openKlik() {
		if (Store.selectedProjectId == '') {
			console.log('no selected');
			Dialog.show("Tidak ada item yang dipilih");
			return;
		}

		if (Store.projectId == Store.selectedProjectId) {
			console.log('already open');
			Dialog.show("Anda sedang mengedit file ini");

			return;
		}

		let f: IFile;
		let project
		let code;

		f = Entity.getByParentId(Store.selectedProjectId) as IFile;
		code = JSON.parse(f.wspace);
		project = Entity.getById(Store.selectedProjectId) as IProject;

		Store.fileId = f.id;
		Store.projectId = project.id;

		//TODO: pindahin ke index2
		Blockly.serialization.workspaces.load(code, Index2.workspace);
		Store.snapshot = code;
		this.closeKlik();
		Index2.updateProjectName();
		// }
	}

	static deleteKlik() {
		console.group('delete klik')

		if (Store.selectedProjectId == '') {
			//TODO: dialog
			console.log('no item selected');
			console.groupEnd();
			Dialog.show("Tidak ada item dipilih");
			return;
		}

		if (Store.selectedProjectId == Store.projectId) {
			//already opened
			console.log("already opened");
			console.groupEnd();
			Dialog.show("Anda sedang mengedit file ini");
			return;
		}

		let confirm = window.confirm("Apa Anda yakin?");

		if (confirm) {
			console.log('delete by id ' + Store.selectedProjectId);
			Entity.delete(Store.selectedProjectId);
			Entity.commit();

			//delete file
			// if (Store.tutMode == false) {
			// 	console.log("delete file");
			// 	Entity.delete(Entity.getByParentId(Store.selectedId).id);
			// }

			console.log("get view to delete");
			this.listCont.querySelectorAll('.project').forEach((item) => {
				if (item.getAttribute('data-id') == Store.selectedProjectId) {
					item.parentElement.removeChild(item);
					console.log("ok");
				}
			})


			Store.selectedProjectId = '';

			// if (Store.tutMode) {
			// Op.saveTutList();
			// Op.saveTutData();
			// }
		}
		else {
			console.log('cancel');
		}

		console.groupEnd();
	}

	static closeKlik() {
		(this.cont as HTMLDialogElement as any).close();
		Store.selectedProjectId = '';
	}

	static renameKlik() {
		if (Store.selectedProjectId == '') {
			Dialog.show("Tidak ada item dipilih");
			return;
		}

		let w = window.prompt("rename", (Entity.getById(Store.selectedProjectId) as IProject).nama);

		if (w) {

			(Entity.getById(Store.selectedProjectId) as IProject).nama = w;
			Entity.commit();
			this.updateItemView(
				this.listCont.querySelector(`div[data-id='${Store.selectedProjectId}']`), Entity.getById(Store.selectedProjectId) as IProject)
		}
		else {
			Dialog.show("Nama tidak valid");
		}
	}

	static show() {
		(this.cont as any).showModal();
		this.render()
	}

	static init() {
		this.cont = document.createElement('dialog');
		this.cont.classList.add('project-list');
		this.cont.innerHTML = `
                <div class="hal-list-projek" style="display:flex; flex-direction:column; height:100%">
                    <h4>Daftar Proyek:</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto"></div>
                    <div>
                        <button class="open" klik="ha.blockly.HalListProject.openKlik()">buka</button>
                        <button class="rename" klik="ha.blockly.HalListProject.renameKlik()">rename</button>
                        <button class="delete" klik="ha.blockly.HalListProject.deleteKlik()">hapus</button>
                        <button class="close" klik="ha.blockly.HalListProject.closeKlik()">tutup</button>
                    </div>
                </div>
            `;

		this.listCont = this.cont.querySelector("div.list-cont");
		document.body.append(this.cont);

		// this.demoList = new ListDemoView();
		this.projekList = new ProjectList();

		(this.cont.querySelector("button.open") as HTMLDivElement).onclick = () => { HalListProject.openKlik() };
		(this.cont.querySelector("button.rename") as HTMLDivElement).onclick = () => { HalListProject.renameKlik() };
		(this.cont.querySelector("button.delete") as HTMLDivElement).onclick = () => { HalListProject.deleteKlik() };
		(this.cont.querySelector("button.close") as HTMLDivElement).onclick = () => { HalListProject.closeKlik() };

	}

	static updateItemView(el: HTMLDivElement, item: IProject): void {
		el.innerHTML = '';
		this.projekList.buatItemViewIsi(item, el);
	}

	private static render() {
		Store.selectedProjectId = '';
		this.listCont.innerHTML = '';

		this.projekList.render(this.listCont);
	}
}

class ProjectList {
	buatItemViewIsi(item: IProject, cont: HTMLDivElement): void {
		cont.innerHTML = `
                <span>${item.nama}</span>
            `;
	}

	//TODO: buat shared method
	private buatItemView(item: IProject, cont: HTMLDivElement): HTMLDivElement {
		let hasil: HTMLDivElement;

		hasil = document.createElement('div') as HTMLDivElement;
		hasil.classList.add('project');

		hasil.setAttribute('data-id', item.id);
		hasil.onclick = () => {
			Store.selectedProjectId = item.id;

			cont.querySelectorAll(".project").forEach((item2) => {
				item2.classList.remove('selected')
			});

			hasil.classList.add('selected');
		}

		this.buatItemViewIsi(item, hasil);

		return hasil;
	}

	render(cont: HTMLDivElement) {
		let list: IProject[] = Entity.getByType(EEntity.PROJECT) as IProject[];

		list = list.sort((item, item2) => {
			if (item.nama < item2.nama) return -1;
			if (item.nama > item2.nama) return 1;
			return 0;
		})

		list.forEach((item) => {
			cont.appendChild(this.buatItemView(item, cont));
		})
	}
}

class ListDemoEl {

	buatItemViewIsi(item: IProject, cont: HTMLDivElement): void {
		cont.innerHTML = `
                <span>${item.nama}</span>
            `;
	}

	private buatItemView(item: IProject, cont: HTMLDivElement): HTMLDivElement {
		let hasil: HTMLDivElement;

		hasil = document.createElement('div') as HTMLDivElement;
		hasil.classList.add('project');

		hasil.setAttribute('data-id', item.id);
		hasil.onclick = () => {
			Store.selectedProjectId = item.id;

			cont.querySelectorAll(".project").forEach((item2) => {
				item2.classList.remove('selected')
			});

			hasil.classList.add('selected');
		}

		this.buatItemViewIsi(item, hasil);

		return hasil;
	}

	render(cont: HTMLDivElement, tipe: string): void {
		cont.innerHTML = '';
		console.log('tipe ', tipe);
		console.log(cont);

		let list: List[] = demoList;

		list = list.sort((item, item2) => {
			if (item.nama < item2.nama) return -1;
			if (item.nama > item2.nama) return 1;
			return 0;
		})

		list.forEach((item) => {
			if (item.kategori == tipe) {
				cont.appendChild(this.buatItemView(item, cont));
			}
		})
	}
}

export class HalListDemo {
	private static cont: HTMLDialogElement;
	private static listCont: HTMLDivElement;
	private static listDemoEl: ListDemoEl;

	static DemoButtonKlik() {
		this.render();
	}

	static openKlik() {
		if (Store.selectedProjectId == '') {
			//no selected
			console.log('no selected');
			Dialog.show("Tidak ada item dipilih");
			return;
		}

		if (Store.projectId == Store.selectedProjectId) {
			//already opened
			console.log('already open');
			Dialog.show("Anda sedang mengedit file ini");

			return;
		}

		console.group("open project");
		console.log("selectedId:", Store.selectedProjectId);

		window.location.href = "./index.html?pid=" + Store.selectedProjectId;

	}

	static closeKlik() {
		(this.cont as HTMLDialogElement as any).close();
		Store.selectedProjectId = '';
	}

	static show() {
		(this.cont as any).showModal();
		this.render()
	}

	static init() {
		this.cont = document.createElement('dialog');
		this.cont.classList.add('project-list');
		this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Demo::</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto">
						<details>
							<summary class="dasar"><b>Dasar:</b></summary>
							<div class="isi dasar"></div>
						</details>
						<hr/>
						<details>
							<summary class="mahir"><b>Menengah:</b></summary>
							<div class="isi mahir"></div>
						</details>
                    </div>
                    <div>
                        <button class="open" klik="ha.blockly.HalListDemo.openKlik();">buka</button>
                        <button class="close" klik="ha.blockly.HalListDemo.closeKlik();">tutup</button>
                    </div>
                </div>
            `;

		(this.cont.querySelector("button.open") as HTMLButtonElement).onclick = () => {
			HalListDemo.openKlik();
		}

		(this.cont.querySelector("button.close") as HTMLButtonElement).onclick = () => {
			HalListDemo.closeKlik();
		}

		this.listCont = this.cont.querySelector("div.list-cont");
		document.body.append(this.cont);

		this.listDemoEl = new ListDemoEl();
	}

	private static render() {
		Store.selectedProjectId = '';
		// this.listCont.innerHTML = '';

		// console.log(this.listCont);
		// console.log(this.listCont.querySelector("summary"));
		// console.log(this.listCont.querySelector("summary.dasar"));
		// console.log(this.listCont.querySelector("summary.mahir"));


		this.listDemoEl.render(this.listCont.querySelector('div.isi.dasar'), "dasar");
		this.listDemoEl.render(this.listCont.querySelector('div.isi.mahir'), "mahir");
	}

}
