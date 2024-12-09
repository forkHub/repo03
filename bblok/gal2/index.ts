let data: IDir = {
	nama: 'root',
	url: '',
	parent: null,
	member: [
		{
			nama: 'dir1',
			url: './box.png',
			parent: null,
			member: []
		},
		{
			nama: 'dir1',
			url: './box.png',
			parent: null,
			member: []
		},
		{
			nama: 'dir1',
			url: './box.png',
			parent: null,
			member: []
		},
		{
			nama: 'dir1',
			url: './box.png',
			parent: null,
			member: []
		}
	]
}

window.onload = () => {
	let dir: Dir = new Dir();
	dir.fromData(data);
	Dir.cont = document.body as HTMLDivElement;
	Dir.render(dir);
}
