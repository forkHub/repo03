import { Index2 } from "./index2";

export class API2 {
	private static _blockId: string;
	public static get blockId(): string {
		return API2._blockId;
	}
	public static set blockId(value) {
		API2._blockId = value;
	}

	static init() {
		(window as any).API = API2;
	}

	static injectScript(src: string, f: () => void) {
		console.group('inject script');
		console.log('src:', src);
		let script = document.createElement('script');
		script.onload = f;
		script.src = src;
		document.head.appendChild(script);
		console.groupEnd();
	}

	// static high
	static highlight(n: string) {
		Index2.workspace.highlightBlock(n);
	}
}