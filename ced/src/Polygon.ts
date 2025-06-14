export class Polygon {
    readonly node: Basik.Point[] = [];
    readonly imgs: Basik.ImageObj[] = [];
    readonly segs: Basik.Segment[] = [];

    addPoint(x: number, y: number) {
        this.node.push(new Basik.Point(x, y));
        let img: Basik.ImageObj = Basik.Image.CreateImage(32, 32);
        img.tipeDrag = 1;
        img.ctx.fillStyle = "#ffffff";
        img.ctx.fillRect(0, 0, 16, 16);
        img.x = x;
        img.y = y;
        this.imgs.push(img);
    }

}