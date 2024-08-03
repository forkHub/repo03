
/**
 * LOGO UI
 */
export class Logo {
	static dlg: HTMLDialogElement;
	static onOk: () => void;

	static init() {
		this.dlg = document.createElement('dialog');
		let dlg: any = this.dlg;

		if (!(this.dlg).parentElement) {
			document.body.appendChild(dlg);
		}

		dlg.innerHTML = `
            <div>
                <h1>BASIK BLOK</h1>
				<h3>dibuat dengan Blockly</h3>
                <div class='block-cont'>
                    
                </div>
				<div class="link-cont">

				</div>
            </div>
        	`;

		tombol(dlg.querySelector('div.block-cont'));

		//TODO: daftar wlink 

		function tombol(cont: HTMLDivElement): void {
			let tbl: HTMLButtonElement;


			tbl = document.createElement('button');
			tbl.innerText = 'Start coding';
			tbl.style.margin = '4px';
			tbl.onclick = () => {
				dlg.close();
				Logo.onOk();
			}
			cont.appendChild(tbl);

			tbl = document.createElement('button');
			tbl.innerText = 'Tutorial (Indonesia)';
			tbl.classList.add('button');
			tbl.style.margin = '4px';
			tbl.onclick = () => {
				dlg.close();
				window.open("https://www.youtube.com/watch?v=TGR8VJwFFXI&list=PLwxcp0TuEV6inV5eBIgNBG_QL6E4GUonf", "_blank");
			}
			cont.appendChild(tbl);

			//TODO: temporary
			// tbl = document.createElement('button');
			// tbl.innerText = 'Download';
			// tbl.classList.add('button');
			// tbl.style.margin = '4px';
			// tbl.onclick = () => {
			// 	dlg.close();
			// 	window.open("https://drive.google.com/file/d/1iev3amQ2m7pp6u8l-gmGZ4mGL97dGzgO/view?usp=sharing", "_blank");
			// }
			// cont.appendChild(tbl);
		}
	}
}

