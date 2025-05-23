import { Index2 } from "./index2";
import { IProject, EEntity, Entity, IFile } from "./Entity";
import { HalListDemo, HalListProject } from "./hal/HalListProject";
import { Store } from "./Store";
import { DialogPublish, DialogExport, DialogImport } from "./hal/HalDialogs";
import { Id } from "./Id";
import { Export } from "./exporter";
import { Dialog } from "./hal/HalDialog";
import { Val } from "./Validasi";
// import { wsToScreenCoordinates } from "blockly/core/utils/svg_math";

export class Op {
	static op() {

		//TODO: depecrated
		// let w = window as any; 

		(document.body.querySelector("div.menu-cont button.simpan") as HTMLDivElement).onclick =
			() => {
				Op.simpan();
			}

		(document.body.querySelector("div.menu-cont button.simpan-baru") as HTMLDivElement).onclick =
			() => {
				Op.simpanBaru();
			}

		(document.body.querySelector("div.menu-cont button.muat") as HTMLDivElement).onclick =
			() => {
				Op.loadKlik();
			}

		(document.body.querySelector("div.menu-cont button.demo") as HTMLDivElement).onclick =
			() => {
				HalListDemo.show();
			}

		(document.body.querySelector("div.menu-cont button.run") as HTMLDivElement).onclick =
			() => {

				let run = (): void => {
					let codeHtml = Export.exportHtml(Index2.exportJs(true));
					window.localStorage.setItem("blocklycode", codeHtml);
					window.open('./play.html', "_blank");
				};

				try {
					Val.checkAllBlock();
					run();
				}
				catch (e) {
					console.log(e);
					let msg = typeof e == "string" ? e : e.message;
					msg += 'Blok yang bermasalah sudah sudah di highlight\n'
					msg += 'Tekan Ok untuk melanjutkan, cancel untuk membatalkan';

					// Dialog.show(typeof e == "string" ? e : e.message);
					let ok = confirm(msg);
					if (ok) {
						run();
					}
				}
			}

		(document.body.querySelector("div.menu-cont button.baru") as HTMLDivElement).onclick =
			() => {
				window.location.href = "./";
			}

		(document.body.querySelector("div.menu-cont button.galeri") as HTMLDivElement).onclick =
			() => {
				window.open("./galery.html", "_blank");
			}


		(document.body.querySelector("div.menu-cont button.html") as HTMLDivElement).onclick =
			() => {
				Op.publish();
			}

		(document.body.querySelector("div.menu-cont button.export") as HTMLDivElement).onclick =
			() => {
				Op.export();
			}

		(document.body.querySelector("div.menu-cont button.import") as HTMLDivElement).onclick =
			() => {
				Op.import();
			}

		(document.body.querySelector("div.menu-cont button.about") as HTMLDivElement).onclick =
			() => {
				//window.location.href = "./about.html";
				window.open('./about.html', "_blank");
			}
	}

	static loadKlik() {
		// let list: IEntity[] = Entity.getByType(EEntity.PROJECT);
		// let p: IProject = list[0] as IProject;
		// let f: IFile = Entity.getByParentId(p.id) as IFile;

		//develop ui
		HalListProject.show()

		// let code = JSON.parse(f.wspace);
		// console.log(code);
		// Blockly.serialization.workspaces.load(code, Index.workspace);

		// Store.idFile = f.id;
		// Store.namaProject = p.nama;

		// console.log(list);
	}

	static publish() {
		let codeHtml = Export.exportHtml(Index2.exportJs(false));
		DialogPublish.open(`
                    <h1>Html Code</h1>
                    <p>
                        Copy content of textarea below, and save it to an .html file.<br/>
                        You can run the file directly without setting up a web-server.
                        Please build the folder structure according to your project.
                    </p>
            `, (codeHtml));
	}

	static export() {
		DialogExport.open(`
                    <h1>Export ke JSON</h1>
                    <p>
						Anda bisa menyimpan isi di textarea berikut untuk disimpan dan di import lagi nanti.
                    </p>
            `, Index2.wspace2String());
	}

	static import() {
		DialogImport.onClick = () => {
			try {
				let value = DialogImport.dlg.querySelector('textarea').value;
				console.log(DialogImport.dlg);
				console.log(value);
				let code = JSON.parse(value);
				//Blockly.serialization.workspaces.load(code, Index2.workspace);
				Index2.load(code);
				Store.snapshot = code;
				//TODO: dialog confirm simpan
			}
			catch (e) {
				console.error(e);
			}
		}

		DialogImport.open(`
                    <h1>Import from JSON</h1>
                    <p>
                        Isi text area ini dengan isi yang sudah di export sebelumnya.
                    </p>
            `, "");
	}

	static resize() {
		const onresize = function () {
			// Compute the absolute coordinates and dimensions of blocklyArea.
			let element: HTMLDivElement = Index2.blocklyArea as HTMLDivElement;
			let x = 0;
			let y = 0;
			do {
				x += element.offsetLeft;
				y += element.offsetTop;
				element = element.offsetParent as HTMLDivElement;
			} while (element);
			// Position blocklyDiv over blocklyArea.

			Index2.blocklyDiv.style.left = x + 'px';
			Index2.blocklyDiv.style.top = y + 'px';
			Index2.blocklyDiv.style.width = Index2.blocklyArea.offsetWidth + 'px';
			Index2.blocklyDiv.style.height = Index2.blocklyArea.offsetHeight + 'px';

			Index2.resize();
		};

		window.onresize = () => {
			setTimeout(() => {
				onresize();
			}, 100);
		}
		setTimeout(() => {
			onresize();
		}, 100);

	}

	static simpanBaru() {
		let id: string = Id.id;
		let nama = window.prompt("project name", "def1");

		//TOOD: validasi nama
		if (nama == null) return;
		if (nama == '') return;
		if (nama.length == 0) return;
		if (Entity.getProjekByName(nama) != null) {
			//TODO: dialog sama 
			Dialog.show("the file already exists");
			return;
		}

		//save new project
		let p: IProject = {
			id: id,
			type: EEntity.PROJECT,
			nama: nama,
			parentId: "-1"
		}
		Entity.tambah(p);

		let f: IFile = {
			id: Id.id,
			type: EEntity.FILE,
			nama: Store.fileId,
			parentId: p.id,
			wspace: Index2.wspace2String()
		}

		//TODO: save file yang lain

		Store.fileId = f.id;
		Store.projectId = p.id;

		Entity.tambah(f);
		Entity.commit();
		Index2.updateProjectName();

		// if (Store.tutMode) {
		// this.saveTutData();
		// this.saveTutList();
		// return;
		// }
	}


	static simpan() {
		console.group("simpan");
		if (Store.projectId == "") {
			this.simpanBaru();
		}
		else {
			let file = Entity.getById(Store.fileId) as IFile;
			if (!file) {
				this.simpanBaru();
			}
			else {
				if (file.wspace == undefined) file.wspace = ''

				file.wspace = Index2.wspace2String();
				Entity.commit();
			}
		}

		Index2.updateProjectName();

		console.groupEnd();
	}

	//tampilkan code dan json code
	// static code() {
	// 	// let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
	// 	console.log(Blockly.serialization.workspaces.save(Index2.workspace));
	// 	console.log(JSON.stringify(Blockly.serialization.workspaces.save(Index2.workspace)));
	// }

	static doc() {
		window.open('./about.html', "_blank");
	}

	//simpan demo dan tutorial
	/*
	static demo() {

		if (Store.tutMode) {
			Op.saveTutData();
			Op.saveTutList();
			return;
		}

		try {
			const body = Entity.loadDataFromStorage();
			let fd = new FormData();
			fd.append("body", body);
			fd.append("dev", 'true');
			fd.append("tut", 'false');
			fd.append("list", "false");
			fd.append("mode", "tut");

			fetch(
				"http://localhost/repo/bblocky/demo.php",
				{
					// headers: { 'Content-Type': 'application/json' }, // Added in response to comment
					method: 'POST',
					body: fd
				}
			)
				.then(function (response) {
					console.log(response);
					console.log(response.text().then((e) => {
						console.log("response text")
						console.log(e);
					}));
					// response.json().then((e) => {
					//     console.log(e)
					// }).catch((e) => {
					//     console.error(e)
					// })
				})
				.catch((e) => {
					console.error(e);
				})
		}
		catch (e) {
			console.error(e);
		}
	}
	*/

	/*
	static saveTutData() {
		try {
			const body = JSON.stringify(Index2.wspace2String());

			console.log("body");
			console.log(Index2.wspace2String());

			let fd = new FormData();
			fd.append("data", "window.pData = " + body);
			fd.append("mode", 'tut');
			fd.append("list", "false");
			fd.append("id", Store.projectId);

			fetch(
				"http://localhost/repo03/bblok/demo.php",
				{
					method: 'POST',
					body: fd
				}
			).then(function (response) {
				console.group("save tut data finish");
				console.log(response);
				console.groupEnd();

				response.text().then((e) => {
					console.group("save tut response text:")
					console.log("response text")
					console.log(e);
					console.groupEnd();
				}).catch((e) => {
					console.error(e);
				});
			}).catch((e) => {
				console.error(e);
			})
		}
		catch (e) {
			console.error(e);
		}
	}

	static saveTutList() {
		try {
			let body = JSON.stringify(Entity.getByType(EEntity.PROJECT));
			let fd = new FormData();

			body = "export const demoList:any[] = " + body;

			fd.append("data", body);
			fd.append("mode", "tut");
			fd.append("list", "true");

			fetch(
				"http://localhost/repo03/bblok/demo.php",
				{
					method: 'POST',
					body: fd
				}
			).then(function (response) {
				console.group("save tut list finish");
				console.log(response);
				console.groupEnd();

				response.text().then((e) => {
					console.group("save tut list response text:")
					console.log("response text")
					console.log(e);
					console.groupEnd();
				}).catch((e) => {
					console.error(e);
				});
			}).catch((e) => {
				console.error(e);
			})
		}
		catch (e) {
			console.error(e);
		}
	}
	*/
}
