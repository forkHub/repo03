
export class Dialog {
	private static dlg: HTMLDialogElement;

	static show(msg: string) {
		this.dlg = document.body.querySelector("dialog.alert") as HTMLDialogElement;
		this.dlg.querySelector('P').innerHTML = msg;
		(this.dlg as any).showModal();
		(this.dlg.querySelector("button.ok") as HTMLButtonElement).onclick = () => {
			Dialog.klik();
		}
	}

	static klik() {
		(this.dlg as any).close();
	}
}

