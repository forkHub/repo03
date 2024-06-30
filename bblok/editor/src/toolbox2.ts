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
import { Order, javascriptGenerator } from 'blockly/javascript';

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

	// Blockly.common.defineBlocksWithJsonArray(allToolBoxDef)
	// export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
	// 	addText,
	// ]);
	// Blockly.common.defineBlocks(blocks);
	allToolBoxDef.forEach((item) => {
		let blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
			item,
		]);
		Blockly.common.defineBlocks(blocks);
	})

	blockRawData.forEach((item) => {
		toolboxDef2.contents.push(getCategory(item.group, item.list, item.hidden)); //registerBlitz());
		item;
	});

	// toolbox.contents.push(getCategory(hiddenData.group, hiddenData.list, "true")); //registerBlitz());
	// toolbox.contents.push(getCategory(BlitzData.group, BlitzData.list)); //registerBlitz());
	// toolbox.contents.push(getCategory(ImageBlockData.group, ImageBlockData.list));
	// toolbox.contents.push(getCategory(ImageBlockData2.group, ImageBlockData2.list));
	// toolbox.contents.push(getCategory(InputBlockData.group, InputBlockData.list));
	// toolbox.contents.push(getCategory(TextData.group, TextData.list));
	// toolbox.contents.push(getCategory(MathBlockData.group, MathBlockData.list));
	// toolbox.contents.push(getCategory(debugData.group, debugData.list));

	js(allToolBoxDef);
}

function getCategory(nama: string, l: TToolBoxBlockDef[], hidden: string = "false") {
	let h: TToolbokContentDef = {
		kind: "category",
		name: nama,
		contents: getToolBoxContentDef(l),
		hidden: hidden
	}

	return h;
}
getCategory; //TODO: hapus

/*
function registerImage(): TToolbokContentDef {
	let h: TToolbokContentDef = {
		kind: "category",
		name: "Image",
		contents: getToolBoxContentDef(ImageBlockData.list)
	}

	// //register blitz content 
	// ImageBlockData.list.forEach((item) => {
	//     let def: TToolbokContentDef = {
	//         name: item.type,
	//         kind: ToolBoxKind.block,
	//         type: item.type
	//     }
	//     if (item.inputs) {
	//         def.inputs = item.inputs
	//     }

	//     h.contents.push(def);
	// })

	return h;
}
*/

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

/*
function registerBlitz(): TToolbokContentDef {
	let blitz: TToolbokContentDef =
	{
		kind: "category",
		name: "Blitz",
		contents: []
	}

	//register blitz content 
	BlitzData.list.forEach((item) => {
		let def: TToolbokContentDef = {
			name: item.type,
			kind: ToolBoxKind.block,
			type: item.type
		}
		if (item.inputs) {
			def.inputs = item.inputs
		}

		blitz.contents.push(def);
	})


	return blitz;
}
*/

function populateToolBox(l: TBlockRawData[]): TToolBoxBlockDef[] {
	let blockData: TToolBoxBlockDef[] = [];

	l.forEach((item) => {
		item.list.forEach((item) => {
			blockData.push(item);
		})
	})

	// hiddenData.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// BlitzData.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// ImageBlockData.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// ImageBlockData2.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// debugData.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// InputBlockData.list.forEach((item) => {
	// 	blockData.push(item);
	// })
	// TextData.list.forEach((item) => {
	// 	blockData.push(item);
	// })

	// MathBlockData.list.forEach((item) => {
	// 	blockData.push(item);
	// })

	return blockData;
}
// populateToolBox;

function js(blockData: TToolBoxBlockDef[]) {
	for (let i = 0; i < blockData.length; i++) {
		let itemBlockData = blockData[i];
		// console.log('type: ' + itemBlockData.type);

		javascriptGenerator.forBlock[itemBlockData.type] = (block: any, generator: any): any => {
			let code = '';
			let statement = '';

			console.group("");

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
// js;

// let blockData: TBlockDef[] = [];

//default toolbox
export const toolboxDef: TToolbokDef = {
	kind: "categoryToolbox",
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
				{
					kind: 'block',
					type: 'add_text',
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
			],
		},
		{
			kind: 'sep',
		},
		{
			kind: 'category',
			name: 'Variables',
			categorystyle: 'variable_category',
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
				// {
				// 	kind: 'block',
				// 	type: 'logic_negate',
				// },
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
			],
		},
		{
			kind: 'sep',
		},
		{
			kind: 'category',
			name: 'Variables',
			categorystyle: 'variable_category',
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



