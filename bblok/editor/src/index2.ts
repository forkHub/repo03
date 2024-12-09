import { API2 } from "./Api";
import { Entity, IProject } from "./Entity";
import { HalListProject, HalListDemo } from "./hal/HalListProject";
import { Logo } from "./hal/HalLogo";
import { Op } from "./Op";
import { Store } from "./Store";
import { Iframe } from "./iframe";
import './index.css';
import { toolBoxInit, toolboxDef2 } from "./toolbox2";
import * as Blockly from 'blockly';
import { Event } from "./Event";
import { javascriptGenerator, JavascriptGenerator, Order } from "blockly/javascript";

declare var pData: any;

export class Index2 {
	public static workspace: Blockly.WorkspaceSvg;
	public static blocklyArea: HTMLDivElement;
	public static blocklyDiv: HTMLDivElement;

	static updateProjectName() {
		let spanNama = document.body.querySelector("span.judul_file");
		try {
			if (Store.projectId) {
				let p: IProject = (Entity.getById(Store.projectId) as IProject);
				spanNama.innerHTML = p ? p.nama : '';
			}
			else {
				spanNama.innerHTML = "untitled";
			}

		}
		catch (e) {
			spanNama.innerHTML = "";
		}
	}

	private static initWorkSpace() {
		// Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
		// Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";

		//inject blokly
		var options = {
			toolbox: toolboxDef2 as any,
			collapse: true,
			comments: true,
			disable: true,
			maxBlocks: Infinity,
			trashcan: true,
			// horizontalLayout: true,
			toolboxPosition: 'start',
			css: true,
			// media: 'n',
			media: './media',
			rtl: false,
			scrollbars: true,
			sounds: true,
			oneBasedIndex: true
		};

		Index2.workspace = Blockly.inject("blocklyDiv", options);
		Index2.blocklyArea = document.body.querySelector('#blocklyArea') as HTMLDivElement;
		Index2.blocklyDiv = document.body.querySelector('#blocklyDiv') as HTMLDivElement;
		Blockly.ContextMenuItems.registerCommentOptions();

		Index2.workspace.registerToolboxCategoryCallback("COLOUR_PALETTE", () => {
			let list: any[] = [];

			list.push(
				{
					"kind": "button",
					"text": "A button",
					"callbackKey": "yourCallbackKey"
				},
			);

			// Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
			var colourList: any[] = ['test'];
			for (var i = 0; i < colourList.length; i++) {
				let blockN = {
					'kind': 'block',
					'type': 'colour_picker2',
					'fields': {
						'COLOUR': colourList[i]
					}
				}
				list.push(blockN);

				Blockly.common.createBlockDefinitionsFromJsonArray([blockN]);
				Blockly.common.defineBlocks(blockN);
			}

			javascriptGenerator.forBlock["colour_picker2"] = (block: Blockly.Block, generator: JavascriptGenerator): any => {
				block;
				generator;

				return ["", Order.NONE]
			};

			return list;
		});

		Index2.workspace.registerButtonCallback("yourCallbackKey", (button) => {
			button; //TODO: complete this function
		});
	}

	private static getQuery(key: string): string {
		let q = '';
		let h = '';

		console.group('get query: ' + key);

		q = window.top.location.search;
		console.log(q);

		q = q.slice(1, q.length);
		console.log(q);

		let qAr = q.split("&");
		console.log(qAr);

		qAr.forEach((item) => {
			let keyAr = item.split('=');
			let pKey = keyAr[0];
			if (pKey == key) {
				h = keyAr[1];
			}
		})
		console.log('res: ' + h);
		console.groupEnd();

		return h;
	}

	private static tampilkanLogo() {
		// Logo.show
		Logo.init();
		Logo.onOk = () => {
			//init default workspace
			try {
				let def = JSON.parse(Store.defWSpace);
				console.log(def);
				Blockly.serialization.workspaces.load(JSON.parse(Store.defWSpace), Index2.workspace);
				Store.snapshot = Store.defWSpace;
			}
			catch (e) {
				console.log(e);
			}
		}
		(Logo.dlg as any).showModal();
	}

	private static loadWorkSpace() {
		//load external project
		if (Store.pMode) {
			API2.injectScript("./tut/p" + Store.projectId + '.js', () => {
				console.log("script loaded");
				Blockly.serialization.workspaces.load(pData, Index2.workspace);
				Store.snapshot = pData;
			});
		}

		//load tutorial mode 
		//TODO: deprecated
		// else if (Store.tutMode) {
		// 	if (Store.projectId && Store.projectId.length > 0) {
		// 		console.log("load data tutorial:");
		// 		API2.injectScript("./tut/p" + Store.projectId + '.js', () => {
		// 			console.log("script loaded");
		// 			Blockly.serialization.workspaces.load(pData, Index2.workspace);
		// 			Store.snapshot = pData;
		// 		});
		// 	}
		// 	else {
		// 		this.tampilkanLogo();
		// 	}
		// }

		else {
			this.tampilkanLogo();
		}
	}

	private static checkQuery() {
		//read query
		if (this.getQuery("dev") == "true") {
			console.log('dev mode');
			// Store.devMode = true;
		}
		else if (this.getQuery("tut") == "true") {
			// Store.tutMode = true;
			if (this.getQuery("tid") && this.getQuery("tid").length > 0) {
				Store.projectId = this.getQuery("tid");
			}
			else {
				//nothing
			}
		}
		else if (this.getQuery("pid") != "") {
			Store.pMode = true;
			Store.projectId = this.getQuery("pid");
			console.log("load demo");
		}
		else {
			//nothing
		}

	}

	static init() {
		this.checkQuery();

		HalListProject.init();
		HalListDemo.init();
		Iframe.init();
		Entity.init();
		toolBoxInit();
		Index2.initWorkSpace();
		Op.resize();
		Op.op();
		API2.init();
		Event.init();

		this.updateProjectName();

		window.onmessage = (e) => {
			if (!e.data.type) return;
			console.group("on message");
			console.log(e);
			console.groupEnd();
		}

		//dev-mode
		// if (Store.devMode || Store.tutMode) {
		// 	(document.querySelector("span#span_dev_mode") as HTMLSpanElement).style.display = 'inline';
		// }

		this.loadWorkSpace();
		(document.querySelector("div.menu-cont") as HTMLElement).style.visibility = 'visible';

		console.log((window as any).api);
	}

	// private static removeBacktick(wspace: string): string {
	// 	let ctr = 0;

	// 	while (wspace.indexOf('`')) {
	// 		ctr++;
	// 		wspace = wspace.replace('`', "bt");
	// 		if (ctr > 1000) break;
	// 	}
	// 	return wspace;
	// }

	// static checkBacktick(): boolean {
	// 	let hasil: string;
	// 	let obj: any;
	// 	let ada: number = 0;

	// 	obj = Blockly.serialization.workspaces.save(Index2.workspace);
	// 	hasil = JSON.stringify(obj);
	// 	ada = hasil.indexOf('`');

	// 	console.group("check backtick");
	// 	console.log('ada:', ada, 'hasil:', hasil);
	// 	console.groupEnd();

	// 	if (hasil.indexOf('`') >= 0) {
	// 		return true;
	// 	}

	// 	return false;
	// }

	static wspace2String(): string {
		let hasil: string;
		let obj: any;

		obj = Blockly.serialization.workspaces.save(Index2.workspace);
		hasil = JSON.stringify(obj);
		// hasil = this.removeBacktick(hasil);

		return hasil
	}

	static load(code: any) {
		Blockly.serialization.workspaces.load(code, Index2.workspace);
	}

	static resize() {
		Blockly.svgResize(Index2.workspace);
	}

}
