import { hiddenData } from "./block data/hiddenData";
import { blitzData } from "./block data/blitzData";
import { imageBlockData } from "./block data/imgBlockData";
import { imageBlockData2 } from "./block data/imgBlockData2";
import { normalizeAllBlock } from "./blitzDefValue";
import { inputBlockData } from "./block data/Inputdata";
import { listDef } from "./block data/List";
import { debugData } from "./block data/Misc01";
import { textData } from "./block data/TextData";
import { mathBlockData } from "./block data/MathData";
import { TBlockRawData, TToolBoxBlockDef, TToolbokContentDef, ToolBoxKind, EArgType, TToolbokDef } from "./toolboxType";
import * as Blockly from 'blockly/core';
import { JavascriptGenerator, Order, javascriptGenerator } from 'blockly/javascript';

export function toolBoxInit() {
	const blockRawData: TBlockRawData[] = [
		hiddenData,
		blitzData,
		imageBlockData,
		imageBlockData2,
		debugData,
		inputBlockData,
		textData,
		mathBlockData,
		listDef
	]

	normalizeAllBlock(blockRawData);
	let allToolBoxDef = populateToolBox(blockRawData);

	allToolBoxDef.forEach((item) => {
		let blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
			item,
		]);
		Blockly.common.defineBlocks(blocks);
	})

	blockRawData.forEach((item) => {
		if (item.toolbox === false) {
			toolboxDef2.contents.push(buaCategory(item.group, item.list, item.hidden));
		}
		else {
			console.group("auto input ke group: " + item.group);
			toolboxDef2.contents.forEach((item2) => {
				// console.log(item2.name)l
				if (item2.name == item.group) {
					console.log('group ada: ' + item.group);
					console.log("list", item.list);
					console.log("list awal", item2.contents);
					item2.contents = item2.contents.concat(item.list as TToolbokContentDef[])
				}
			})
			console.groupEnd();
		}
	});

	js(allToolBoxDef);

	//dynaic category

}

function buaCategory(nama: string, l: TToolBoxBlockDef[], hidden: string = "false"): TToolbokContentDef {
	let h: TToolbokContentDef = {
		kind: "category",
		name: nama,
		contents: getToolBoxContentDef(l),
		hidden: hidden
	}

	return h;
}

function getToolBoxContentDef(l: TToolBoxBlockDef[]): any[] {
	//register blitz content 
	let h: any[] = [];

	l.forEach((item) => {
		let def: TToolbokContentDef = {
			name: item.type,
			kind: ToolBoxKind.block,
			type: item.type
		}
		if (item.inputs) {
			def.inputs = item.inputs
		}

		h.push(def);
	})

	return h;
}

function populateToolBox(l: TBlockRawData[]): TToolBoxBlockDef[] {
	let blockData: TToolBoxBlockDef[] = [];

	l.forEach((item) => {
		item.list.forEach((item) => {
			blockData.push(item);
		})
	})

	return blockData;
}

function js(blockData: TToolBoxBlockDef[]) {
	for (let i = 0; i < blockData.length; i++) {
		let itemBlockData = blockData[i];

		if (typeof itemBlockData.f === 'function') {
			javascriptGenerator.forBlock[itemBlockData.type] = (block: Blockly.Block, generator: JavascriptGenerator): any => {
				let arg: string[] = [];
				let stmt: string[] = [];

				itemBlockData.args0.forEach((item) => {
					if (item.type == EArgType.inputDummy) { }
					else if (item.type == EArgType.input_end_row) { }
					else if (item.type == EArgType.statementValue) {
						stmt.push(generator.statementToCode(block, item.name));
					}
					else {
						let value = generator.valueToCode(block, item.name, Order.ATOMIC);
						arg.push(value);
					}
				});

				if (itemBlockData.output != null) {
					return [itemBlockData.f(arg, stmt), Order.NONE]
				}
				else {
					return itemBlockData.f(arg, stmt) + ';\n';
				}
			};
		}
		else {
			javascriptGenerator.forBlock[itemBlockData.type] = (block: Blockly.Block, generator: JavascriptGenerator): any => {
				let code = '';
				let statement = '';

				console.groupCollapsed("js: /" + itemBlockData.type + ' /' + itemBlockData.type);

				console.log("output");
				console.log(itemBlockData.output);
				if (itemBlockData.output == undefined) {
					code += `\n/*${itemBlockData.message0}*/\n`;
				}

				code += itemBlockData.perintah.split('_')[0];
				code = code.replace("#update", "_update");

				if (itemBlockData.kurung) {
					code += '(';
				}
				console.log('code', code);

				itemBlockData.args0.forEach((item, idx) => {
					if (item.type == EArgType.inputDummy) {

					}
					else if (item.type == EArgType.input_end_row) {

					}
					else if (item.type == EArgType.statementValue) {
						console.log("arg statement");
						statement = generator.statementToCode(block, item.name);
					}
					else {
						console.log("value to code");
						console.log("block", block);
						console.log("item", item);
						console.log('name', item.name);
						let value = generator.valueToCode(block, item.name, Order.ATOMIC);

						code += value;

						if (idx < itemBlockData.args0.length - 1) {
							code += ','
						}
						console.log('code', code);

					}
				});

				if (itemBlockData.kurung) {
					code += ')';
				}
				console.log('code', code);

				if (statement) {
					console.log("statement:", statement);
					if (itemBlockData.stmt) {
						code += `{${statement}}`;
					}
					else {
						code += `;\n${statement}\n`;
					}
				}
				else {

				}

				console.log("code", code);
				console.groupEnd();

				if (itemBlockData.output != null) {
					return [code, Order.NONE]
				}
				else {
					return code + ';\n';
				}

			};

		}

	}
}

//default toolbox (depecrated)
// export const toolboxDef: TToolbokDef = {
// 	kind: "categoryToolbox",
// 	contents: [
// 		{
// 			kind: 'category',
// 			name: 'Logic',
// 			categorystyle: 'logic_category',
// 			contents: [
// 				{
// 					kind: 'block',
// 					type: 'controls_if',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_compare',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_operation',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_negate',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_boolean',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_null',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'logic_ternary',
// 				},
// 			],
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Loops',
// 			categorystyle: 'loop_category',
// 			contents: [
// 				{
// 					kind: 'block',
// 					type: 'controls_repeat_ext',
// 					inputs: {
// 						TIMES: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 10,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'controls_whileUntil',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'controls_for',
// 					inputs: {
// 						FROM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 						TO: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 10,
// 								},
// 							},
// 						},
// 						BY: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'controls_forEach',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'controls_flow_statements',
// 				},
// 			],
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Math',
// 			categorystyle: 'math_category',
// 			contents: [
// 				{
// 					kind: 'block',
// 					type: 'math_number',
// 					fields: {
// 						NUM: 123,
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_arithmetic',
// 					inputs: {
// 						A: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 						B: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_single',
// 					inputs: {
// 						NUM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 9,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_trig',
// 					inputs: {
// 						NUM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 45,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_constant',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_number_property',
// 					inputs: {
// 						NUMBER_TO_CHECK: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 0,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_round',
// 					fields: {
// 						OP: 'ROUND',
// 					},
// 					inputs: {
// 						NUM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 3.1,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_on_list',
// 					fields: {
// 						OP: 'SUM',
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_modulo',
// 					inputs: {
// 						DIVIDEND: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 64,
// 								},
// 							},
// 						},
// 						DIVISOR: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 10,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_constrain',
// 					inputs: {
// 						VALUE: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 50,
// 								},
// 							},
// 						},
// 						LOW: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 						HIGH: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 100,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_random_int',
// 					inputs: {
// 						FROM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 						TO: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 100,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_random_float',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'math_atan2',
// 					inputs: {
// 						X: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 						Y: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 1,
// 								},
// 							},
// 						},
// 					},
// 				},
// 			],
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Text',
// 			categorystyle: 'text_category',
// 			contents: [
// 				{
// 					kind: 'block',
// 					type: 'text',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_join',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_append',
// 					inputs: {
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: '',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_length',
// 					inputs: {
// 						VALUE: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: 'abc',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_isEmpty',
// 					inputs: {
// 						VALUE: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: '',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_indexOf',
// 					inputs: {
// 						VALUE: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 						FIND: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: 'abc',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_charAt',
// 					inputs: {
// 						VALUE: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_getSubstring',
// 					inputs: {
// 						STRING: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_changeCase',
// 					inputs: {
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: 'abc',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_trim',
// 					inputs: {
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: 'abc',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_count',
// 					inputs: {
// 						SUB: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_replace',
// 					inputs: {
// 						FROM: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 						TO: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'text_reverse',
// 					inputs: {
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'add_text',
// 					inputs: {
// 						TEXT: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: 'abc',
// 								},
// 							},
// 						},
// 					},
// 				},
// 			],
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Lists',
// 			categorystyle: 'list_category',
// 			contents: [
// 				{
// 					kind: 'block',
// 					type: 'lists_create_with',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_create_with',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_repeat',
// 					inputs: {
// 						NUM: {
// 							shadow: {
// 								type: 'math_number',
// 								fields: {
// 									NUM: 5,
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_length',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_isEmpty',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_indexOf',
// 					inputs: {
// 						VALUE: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_getIndex',
// 					inputs: {
// 						VALUE: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_setIndex',
// 					inputs: {
// 						LIST: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_getSublist',
// 					inputs: {
// 						LIST: {
// 							block: {
// 								type: 'variables_get',
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_split',
// 					inputs: {
// 						DELIM: {
// 							shadow: {
// 								type: 'text',
// 								fields: {
// 									TEXT: ',',
// 								},
// 							},
// 						},
// 					},
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_sort',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'lists_reverse',
// 				},
// 				{
// 					kind: 'block',
// 					type: 'ha.js.List.push'
// 				},
// 				{
// 					kind: 'block',
// 					type: 'ha.js.List.pop'
// 				},
// 			],
// 		},
// 		{
// 			kind: 'sep',
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Variables',
// 			categorystyle: 'variable_category',
// 			custom: 'VARIABLE',
// 		},
// 		{
// 			kind: 'category',
// 			name: 'Functions',
// 			categorystyle: 'procedure_category',
// 			custom: 'PROCEDURE',
// 		},
// 	],
// };

export const toolboxDef2: TToolbokDef = {
	kind: 'categoryToolbox',
	contents: [
		{
			kind: 'category',
			name: 'Logic',
			categorystyle: 'logic_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_if',
				},
				{
					kind: 'block',
					type: 'logic_compare',
				},
				{
					kind: 'block',
					type: 'logic_operation',
				},
				{
					kind: 'block',
					type: 'logic_negate',
				},
				{
					kind: 'block',
					type: 'logic_boolean',
				},
				{
					kind: 'block',
					type: 'logic_null',
				},
				{
					kind: 'block',
					type: 'logic_ternary',
				},
			],
		},
		{
			kind: 'category',
			name: 'Loops',
			categorystyle: 'loop_category',
			contents: [
				{
					kind: 'block',
					type: 'controls_repeat_ext',
					inputs: {
						TIMES: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'controls_whileUntil',
				},
				{
					kind: 'block',
					type: 'controls_for',
					inputs: {
						FROM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						TO: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
						BY: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'controls_forEach',
				},
				{
					kind: 'block',
					type: 'controls_flow_statements',
				},
			],
		},
		{
			kind: 'category',
			name: 'Math',
			categorystyle: 'math_category',
			contents: [
				{
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 123,
					},
				},
				{
					kind: 'block',
					type: 'math_arithmetic',
					inputs: {
						A: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						B: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_single',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 9,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_trig',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 45,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_constant',
				},
				{
					kind: 'block',
					type: 'math_number_property',
					inputs: {
						NUMBER_TO_CHECK: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 0,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_round',
					fields: {
						OP: 'ROUND',
					},
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 3.1,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_on_list',
					fields: {
						OP: 'SUM',
					},
				},
				{
					kind: 'block',
					type: 'math_modulo',
					inputs: {
						DIVIDEND: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 64,
								},
							},
						},
						DIVISOR: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 10,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_constrain',
					inputs: {
						VALUE: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 50,
								},
							},
						},
						LOW: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						HIGH: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 100,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_random_int',
					inputs: {
						FROM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						TO: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 100,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'math_random_float',
				},
				{
					kind: 'block',
					type: 'math_atan2',
					inputs: {
						X: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
						Y: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 1,
								},
							},
						},
					},
				},
				// {
				// 	kind: 'block',
				// 	type: 'ha.be.Transform.degDistMin'
				// },
				// {
				// 	kind: 'block',
				// 	type: '*='
				// },
				// {
				// 	kind: 'block',
				// 	type: '+='
				// },
				// {
				// 	kind: 'block',
				// 	type: '/='
				// },
				// {
				// 	kind: 'block',
				// 	type: '-='
				// },
			],
		},
		{
			kind: 'category',
			name: 'Text',
			categorystyle: 'text_category',
			contents: [
				{
					kind: 'block',
					type: 'text',
				},
				{
					kind: 'block',
					type: 'text_join',
				},
				{
					kind: 'block',
					type: 'text_append',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: '',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_length',
					inputs: {
						VALUE: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_isEmpty',
					inputs: {
						VALUE: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: '',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_indexOf',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
						FIND: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_charAt',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_getSubstring',
					inputs: {
						STRING: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_changeCase',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_trim',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: 'abc',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_count',
					inputs: {
						SUB: {
							shadow: {
								type: 'text',
							},
						},
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_replace',
					inputs: {
						FROM: {
							shadow: {
								type: 'text',
							},
						},
						TO: {
							shadow: {
								type: 'text',
							},
						},
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'text_reverse',
					inputs: {
						TEXT: {
							shadow: {
								type: 'text',
							},
						},
					},
				},
				// {
				// 	kind: 'block',
				// 	type: 'add_text',
				// 	inputs: {
				// 		TEXT: {
				// 			shadow: {
				// 				type: 'text',
				// 				fields: {
				// 					TEXT: 'abc',
				// 				},
				// 			},
				// 		},
				// 	},
				// },
			],
		},
		{
			kind: 'category',
			name: 'Lists',
			categorystyle: 'list_category',
			contents: [
				{
					kind: 'block',
					type: 'lists_create_with',
				},
				{
					kind: 'block',
					type: 'lists_create_with',
				},
				{
					kind: 'block',
					type: 'lists_repeat',
					inputs: {
						NUM: {
							shadow: {
								type: 'math_number',
								fields: {
									NUM: 5,
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_length',
				},
				{
					kind: 'block',
					type: 'lists_isEmpty',
				},
				{
					kind: 'block',
					type: 'lists_indexOf',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_getIndex',
					inputs: {
						VALUE: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_setIndex',
					inputs: {
						LIST: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_getSublist',
					inputs: {
						LIST: {
							block: {
								type: 'variables_get',
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_split',
					inputs: {
						DELIM: {
							shadow: {
								type: 'text',
								fields: {
									TEXT: ',',
								},
							},
						},
					},
				},
				{
					kind: 'block',
					type: 'lists_sort',
				},
				{
					kind: 'block',
					type: 'lists_reverse',
				},
				{
					kind: 'block',
					type: 'ha.js.List.push'
				},
				{
					kind: 'block',
					type: 'ha.js.List.pop'
				},
			],
		},
		{
			kind: 'sep',
		},
		{
			kind: 'category',
			name: 'Variables',
			categorystyle: 'variable_category',
			// hidden: 'true',
			custom: 'VARIABLE',
		},
		{
			kind: 'category',
			name: 'Functions',
			categorystyle: 'procedure_category',
			custom: 'PROCEDURE',
		},
	],
};



