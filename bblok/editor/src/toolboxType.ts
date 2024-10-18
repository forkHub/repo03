export enum EOutput {
	Boolean = "Boolean",
	Number = "Number",
	String = "String",
	Array = "Array",
	Dummy = "dummy",
	Image = "Image",
	Any = ""
	// Statement = "statement",
}

export enum EArgType {
	inputValue = "input_value",
	inputDummy = "input_dummy",
	statementValue = "input_statement",
	input_end_row = "input_end_row",
	field_variable = "field_variable",
	drop_down = "field_dropdown"
}

export type TArgDef = {
	type: EArgType,

	//input
	check?: EOutput | string     //input
	name?: string                //input
	default?: string | boolean | number
	variable?: string
	options?: any[][]

	output?: EOutput | null
	align?: string
}

export type TToolboxGroupData = {
	list: TToolBoxBlockDef[]
	group: string
	hidden: "true" | "false"
	toolbox: boolean //check apakah bikin kategory sendiri (fale) ataukah integrasi dengan yang sudah ada (true)
}

/**
 * 
 */
export type TToolBoxBlockDef = {
	type: string,
	message0: string
	args?: any;         //=> di convert ke arg0, TODO: support object for complex input type
	output?: EOutput;
	hat?: boolean;
	perintah?: string;
	extensions?: string[];
	f?: (arg: string[], stmt: string[]) => string;	//untuk generate code pakai callback
	metadata?: TMetadata
	val?: (item: TToolBoxBlockDef) => void;

	//auto fill
	args0?: TArgDef[]
	inputsInline?: boolean
	previousStatement?: null,
	nextStatement?: null,
	colour?: number,
	tooltip?: string,
	helpUrl?: string
	inputs?: any
	kurung?: boolean
	stmt?: boolean
	hidden?: boolean | string
	kind?: string;
}

export enum ToolBoxKind {
	categoryToolbox = "categoryToolbox",
	category = "category",
	block = 'block'
}

export type TToolbokDef = {
	kind: "categoryToolbox",
	contents: TToolbokContentDef[];
}

export type TToolbokContentDef = {
	kind?: ToolBoxKind.category | string
	categorystyle?: string
	message0?: string
	args0?: any[]
	fields?: any
	name?: string
	type?: string
	custom?: string
	contents?: TToolbokContentDef[];
	inputs?: any
	hidden?: string
}

export type TMetadata = {
	readonly?: boolean,
	property?: boolean
}

export type TInput = {
	type: string;	//variables_get, 
	data?: string;
}

// "block": {
// "type": "variables_get",
// "id": "b;qMrpQd|XQpqwn+XW@4",
// "fields": {
// 	"VAR": {
// 		"id": "99*3xs_.J9FLSB`sp](v"
// 	}
// }
// }

// "block": {
// "type": "ha.be.Spr.Rotasi_get",
// "id": "6lEGu:geSG;~ZlSO_-x{"
// }