export class Polygon {
    constructor() {
        this.node = [];
        this.imgs = [];
        this.segs = [];
    }
    addPoint(x, y) {
        this.node.push(new Basik.Point(x, y));
        let img = Basik.Image.CreateImage(32, 32);
        img.tipeDrag = 1;
        img.ctx.fillStyle = "#ffffff";
        img.ctx.fillRect(0, 0, 16, 16);
        img.x = x;
        img.y = y;
        this.imgs.push(img);
    }
}
