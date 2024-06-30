export class Iframe {
	private static dlg: HTMLDialogElement = document.createElement('dialog');

	static init() {
		this.dlg.innerHTML = `
			<iframe></iframe>
		`
	}

	static play() {
		console.log("init");
		let simpan = window.localStorage.getItem("blocklycode");
		let iframe = this.dlg.querySelector('iframe') as HTMLIFrameElement;
		let doc = iframe.contentWindow.document;
		doc.open();
		doc.write(simpan);
		doc.close();
		document.body.appendChild(this.dlg);
		this.dlg.showModal();
	}
}
