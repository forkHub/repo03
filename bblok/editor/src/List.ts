export interface List {
	id: string,
	type: string,
	nama: string,
	parentId: string,
	kategori?: string	//dasar, menengah
}

export const demoList: List[] = [
	{
		"id": "kotakmantul",
		"type": "project",
		"nama": "bola memantul",
		"parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "gravitasi",
		"type": "project",
		"nama": "gravitasi memantul",
		"parentId": "-1"
	},
	{
		"id": "alpha",
		"type": "project",
		"nama": "alpha",
		"parentId": "-1"
	},
	{
		"id": "rotasi", "type": "project", "nama": "pusat dan rotasi", "parentId": "-1"
	},
	{
		"id": "drag", "type": "project", "nama": "drag", "parentId": "-1"
	},
	{
		"id": "drag2", "type": "project", "nama": "drag rotasi", "parentId": "-1"
	},
	{
		"id": "brush", "type": "project", "nama": "doodle", "parentId": "-1"
	},
	{
		"id": "dragremote", "type": "project", "nama": "drag remote", "parentId": "-1"
	},
	{
		"id": "putarremote", "type": "project", "nama": "putar remote", "parentId": "-1"
	},
]

//contoh yang lebih berat
demoList.push({
	id: 'interaksi_radius',
	type: 'project',
	nama: "interaksi radius",
	parentId: "-1",
	kategori: "menengah"
});

demoList.push({
	id: 'tata_surya',
	type: 'project',
	nama: "tata surya",
	parentId: "-1",
	kategori: "menengah"
})
