// import * as Blockly from 'blockly/core';


// export type TBlockly = {
// 	svgResize(workspace: Blockly.WorkspaceSvg): unknown;
// 	Msg: any;
// 	JavaScript: any;
// 	common: {
// 		defineBlocksWithJsonArray: (val: any) => {}
// 	},
// 	inject: (p: any, p2: any) => Blockly.WorkspaceSvg;
// 	Xml: {
// 		domToWorkspace: (workspaceBlocks: any, workspace: any) => void;
// 	},
// 	serialization: {
// 		workspaces: {
// 			load: (state: any, myWorkspace: any) => void;
// 			save: (workspace: any) => Blockly.WorkspaceSvg
// 		}
// 	}
// }

// type TJS = {
// 	javascriptGenerator: {
// 		workspaceToCode: (workspace: any) => string;
// 		forBlock: any
// 	},
// 	Order: {
// 		ATOMIC: number
// 	},
// }

// type TVariable = {
// 	name: string,
// 	id: string
// }

// type TField = {
// 	NAME?: string,
// 	VAR?: {
// 		id: string
// 	},
// 	NUM?: number,
// 	TEXT?: string
// }

/*
type TInput = {
	VALUE?: {
		block: TWBlock
	},
	ARG0?: {
		block: TWBlock
	}
	ARG1?: {
		block: TWBlock
	}
	ARG2?: {
		block: TWBlock
	}
	ARG3?: {
		block: TWBlock
	}
	ARG4?: {
		block: TWBlock
	}
}
*/

// type TExtraState = {
// 	params: TVariable[] | string[]  //string bila call fungsi, TVariable bila deklarasi
// 	name?: string   //call function nama fungsi yang dipanggil
// }

/*
type TWBlock = {
	type: string,
	id: string,
	x: number,
	y: number,
	inputs: TInput,
	extraState?: TExtraState,
	fiels: TField,
	icons?: any,
	next: TWBlock,
}
*/

/*
export type TBlockCont = {
	languageVersion: number
	blocks: TWBlock[]
}
*/

// type TWorkSpace = {
// 	blocks?: TBlockCont,
// 	variables?: TVariable[]
// }

// export enum TBlockType {
// 	DEC_FUNGSI_NO_RETURN = "procedures_defnoreturn",
// 	PANGGIL_FUNGSI_NO_RETURN = "procedures_callnoreturn",
// 	VAR_SET = "variables_set",
// 	VAR_GET = "variables_get",
// 	LIT_MATH = "math_number",

// }

// declare var Blockly: TBlockly;
// declare var javascript: TJS;

// var b: TBlock;

