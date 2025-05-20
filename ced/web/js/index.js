import { Polygon } from "./Polygon.js";
window.onload = () => {
    let g = Basik.Graphic;
    let img = Basik.Image;
    g.Start(640, 480);
    let p = new Polygon();
    p.addPoint(100, 100);
    p.addPoint(200, 200);
    console.log(Basik.ImgImpl.daftar);
    function update() {
        g.Cls();
        img.DrawAll();
        // g.context.fillRect(0, 0, 10, 10);
        g.context.drawImage(p.imgs[0].canvas, 110, 110);
        img.Draw(p.imgs[0]);
    }
    window.requestAnimationFrame(update);
};
