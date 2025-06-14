export interface List {
	id: string,
	type: string,
	nama: string,
	parentId: string,
	kategori?: string	//dasar, mahir
}

export const demoList: List[] = [
	{
		"id": "kotakmantul",
		"type": "project",
		"nama": "bola memantul",
		"parentId": "-1",
		"kategori": "mahir"
	},
	{
		"id": "gravitasi",
		"type": "project",
		"nama": "gravitasi memantul",
		"parentId": "-1",
		"kategori": "mahir"
	},
	{
		"id": "alpha",
		"type": "project",
		"nama": "alpha",
		"parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "rotasi", "type": "project", "nama": "pusat dan rotasi", "parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "drag", "type": "project", "nama": "drag", "parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "drag2", "type": "project", "nama": "drag rotasi", "parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "brush", "type": "project", "nama": "doodle", "parentId": "-1",
		"kategori": "mahir"
	},
	{
		"id": "dragremote", "type": "project", "nama": "drag remote", "parentId": "-1",
		"kategori": "dasar"
	},
	{
		"id": "putarremote", "type": "project", "nama": "putar remote", "parentId": "-1",
		"kategori": "dasar"
	},
]

//contoh yang lebih berat
demoList.push({
	id: 'interaksi_radius',
	type: 'project',
	nama: "interaksi radius",
	parentId: "-1",
	kategori: "mahir"
});

demoList.push({
	id: 'tata_surya',
	type: 'project',
	nama: "tata surya",
	parentId: "-1",
	kategori: "mahir"
})

demoList.push({
	id: 'tata_surya3',
	type: 'project',
	nama: "tata surya 3",
	parentId: "-1",
	kategori: "mahir"
})
