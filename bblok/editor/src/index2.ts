import { API2 } from "./Api";
import { Entity, IProject } from "./Entity";
import { HalListProject, HalListDemo } from "./HalListProject";
import { Logo } from "./HalLogo";
import { Op } from "./Op";
import { Store } from "./Store";
import { Iframe } from "./iframe";
import './index.css';
import { toolBoxInit, toolboxDef2 } from "./toolbox2";
import * as Blockly from 'blockly';
import { EArgType, EOutput } from "./toolboxType";
import { normalizeItem } from "./blitzDefValue";
import { javascriptGenerator, JavascriptGenerator, Order } from "blockly/javascript";
import { Event } from "./Event";

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

		//dynamic category
		Index2.workspace.registerToolboxCategoryCallback("CUSTOM_VARIABLE", () => {
			let list: any[] = [];

			list.push(
				{
					"kind": "button",
					"text": "A button",
					"callbackKey": "yourCallbackKey"
				},
			);

			Index2.workspace.getAllVariables().forEach((item) => {

				console.log("var ", item);

				let blockN = {
					"kind": 'block',
					"type": "var_" + item.name,
					"tooltip": "",
					"helpUrl": "",
					"message0": "%1 %2",
					"args0": [
						{
							"type": EArgType.field_variable,
							"name": "NAME1",
							"variable": item.name
						},
						{
							"type": EArgType.inputDummy,
							"name": "NAME2"
						}
					],
					"output": EOutput.Any,
					"colour": 225,
					"inputsInline": true
				}

				normalizeItem(blockN);

				list.push(blockN);

				console.log("block N ", blockN);

				Blockly.common.createBlockDefinitionsFromJsonArray([blockN]);
				Blockly.common.defineBlocks(blockN);

				javascriptGenerator.forBlock["var_" + item.name] = (block: Blockly.Block, generator: JavascriptGenerator): any => {
					let arg: string[] = [];

					console.group("");
					console.log("js for " + item.name);
					console.groupEnd();

					blockN.args0.forEach((item2) => {
						if (item2.type == EArgType.inputDummy) { }
						else if (item2.type == EArgType.input_end_row) { }
						else if (item2.type == EArgType.statementValue) { }
						else {
							let value = generator.valueToCode(block, item2.name, Order.ATOMIC);
							arg.push(value);
						}
					});

					return [arg[0], Order.NONE]
				};

			});

			return list;
		});

		Index2.workspace.registerButtonCallback("yourCallbackKey", (button) => {
			Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null);
		});

		// Index2.workspace.getAllVariables().forEach((item) => {
		// 	javascriptGenerator.forBlock[item.name] = (block: Blockly.Block, generator: JavascriptGenerator): any => {
		// 		block; generator;

		// 		return item.name;
		// 	};
		// });

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

	private static logo() {
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
		else if (Store.tutMode) {
			if (Store.projectId && Store.projectId.length > 0) {
				console.log("load data tutorial:");
				API2.injectScript("./tut/p" + Store.projectId + '.js', () => {
					console.log("script loaded");
					Blockly.serialization.workspaces.load(pData, Index2.workspace);
					Store.snapshot = pData;
				});
			}
			else {
				this.logo();
			}
		}

		else {
			this.logo();
		}
	}

	private static checkQuery() {
		//read query
		if (this.getQuery("dev") == "true") {
			console.log('dev mode');
			Store.devMode = true;
		}
		else if (this.getQuery("tut") == "true") {
			Store.tutMode = true;
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

		//update view
		if (Store.devMode || Store.tutMode) {
			(document.querySelector("span#span_dev_mode") as HTMLSpanElement).style.display = 'inline';
		}

		this.loadWorkSpace();
		(document.querySelector("div.menu-cont") as HTMLElement).style.visibility = 'visible';

		console.log((window as any).api);
	}

	static simpan(): any {
		return Blockly.serialization.workspaces.save(Index2.workspace);
	}

	static load(code: any) {
		Blockly.serialization.workspaces.load(code, Index2.workspace);
	}

	static resize() {
		Blockly.svgResize(Index2.workspace);
	}
}
