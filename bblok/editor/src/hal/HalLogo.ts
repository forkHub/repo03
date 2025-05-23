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
                <div class='block-cont'>
                    
                </div>
				<div class="link-cont">

				</div>
				<div class="contact-cont">
					rokhman.fajar@gmail.com - 081285382224
				</div>
            </div>
        	`;

		tombol(dlg.querySelector('div.block-cont'));

		// (dlg.querySelector('div.contact-cont') as HTMLDivElement).innerHTML = `

		// `;

		//TODO: daftar wlink 

		function tombol(cont: HTMLDivElement): void {
			let tbl: HTMLButtonElement;


			tbl = document.createElement('button');
			tbl.innerText = 'Mulai';
			tbl.style.margin = '4px';
			tbl.onclick = () => {
				dlg.close();
				Logo.onOk();
			}
			cont.appendChild(tbl);

			tbl = document.createElement('button');
			tbl.innerText = 'Tutorial';
			tbl.classList.add('button');
			tbl.style.margin = '4px';
			tbl.onclick = () => {
				dlg.close();
				window.open("https://www.youtube.com/watch?v=TGR8VJwFFXI&list=PLwxcp0TuEV6inV5eBIgNBG_QL6E4GUonf", "_blank");
			}
			cont.appendChild(tbl);

			//TODO: temporary
			tbl = document.createElement('button');
			tbl.innerText = 'Unduh';
			tbl.classList.add('button');
			tbl.style.margin = '4px';
			tbl.onclick = () => {
				dlg.close();
				window.open("https://drive.google.com/drive/folders/101YzoTecPx7M3slR4zpxT_WiIJYqTZXz?usp=sharing", "_blank");
			}
			cont.appendChild(tbl);
		}
	}
}

