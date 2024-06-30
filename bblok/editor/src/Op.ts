import { Index2 } from "./index2";
import { IProject, EEntity, Entity, IFile } from "./Entity";
import { HalListProject } from "./HalListProject";
import { Store } from "./Store";
import { DialogPublish, DialogExport, DialogImport } from "./Dialogs";
import { Id } from "./Id";
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { Export } from "./exporter";
// import { Iframe } from "./iframe";


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

		// w.tambahVar = () => {
		// 	let var1 = prompt('variable baru');
		// 	let simpan: any = Blockly.serialization.workspaces.save(Index2.workspace);
		// 	if (!simpan.variables) {
		// 		simpan.variables = [];
		// 	}
		// 	simpan.variables.push({
		// 		id: 'random_id' + Math.floor(Math.random() * 1000),
		// 		name: var1
		// 	});
		// 	Blockly.serialization.workspaces.load(simpan, Index2.workspace);
		// }

		(document.body.querySelector("div.menu-cont button.run") as HTMLDivElement).onclick =
			() => {
				let codeHtml = Export.export(javascriptGenerator.workspaceToCode(Index2.workspace));
				window.localStorage.setItem("blocklycode", codeHtml);
				window.open('./play.html', "_blank");
				// Iframe.play();
				if (Store.devMode) {
					Op.simpan();
				}
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
		let codeHtml = Export.export(javascriptGenerator.workspaceToCode(Index2.workspace));
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
		let simpan = Blockly.serialization.workspaces.save(Index2.workspace);
		DialogExport.open(`
                    <h1>Export to JSON</h1>
                    <p>
                        Copy content of textarea below. You can save to afile, share to friend, or import them later.
                    </p>
            `, JSON.stringify(simpan).toString());
	}

	static import() {
		DialogImport.onClick = () => {
			try {
				let value = DialogImport.dlg.querySelector('textarea').value;
				console.log(DialogImport.dlg);
				console.log(value);
				let code = JSON.parse(value);
				Blockly.serialization.workspaces.load(code, Index2.workspace);
			}
			catch (e) {
				console.error(e);
			}
		}

		DialogImport.open(`
                    <h1>Import from JSON</h1>
                    <p>
                        Fill the text area below with content you have exported before.
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

			Blockly.svgResize(Index2.workspace);
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
			nama: Store.idFile,
			parentId: p.id,
			wspace: JSON.stringify(Blockly.serialization.workspaces.save(Index2.workspace))
		}

		//TODO: save file yang lain

		Store.idFile = f.id;
		Store.projectId = p.id;

		Entity.tambah(f);
		Entity.commit();
		Index2.updateName();

		if (Store.tutMode) {
			this.saveTutData();
			this.saveTutList();
			return;
		}
	}

	static simpan() {
		if (Store.projectId == "") {
			this.simpanBaru();
		}
		else {
			if (Store.tutMode) {
				this.saveTutData();
				this.saveTutList();
			}
			else {
				let file = Entity.getById(Store.idFile) as IFile;
				file.wspace = JSON.stringify(Blockly.serialization.workspaces.save(Index2.workspace));
				Entity.commit();
			}
		}

		Index2.updateName();

		if (Store.devMode) {
			Op.demo();
		}
	}

	static code() {
		// let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
		console.log(Blockly.serialization.workspaces.save(Index2.workspace));
		console.log(JSON.stringify(Blockly.serialization.workspaces.save(Index2.workspace)));
	}

	static doc() {
		window.open('./about.html', "_blank");
	}

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

	static saveTutData() {
		try {
			const body = JSON.stringify(Blockly.serialization.workspaces.save(Index2.workspace));

			console.log("body");
			console.log(Blockly.serialization.workspaces.save(Index2.workspace));

			let fd = new FormData();
			fd.append("body", body);
			fd.append("dev", 'false');
			fd.append("tut", 'true');
			fd.append("list", "false");
			fd.append("id", Store.projectId);

			fetch(
				"http://localhost/repo/bblocky/demo.php",
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
			const body = JSON.stringify(Entity.getByType(EEntity.PROJECT));
			let fd = new FormData();
			fd.append("body", body);
			fd.append("dev", 'false');
			fd.append("tut", 'false');
			fd.append("list", "true");

			fetch(
				"http://localhost/repo/bblocky/demo.php",
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
}
