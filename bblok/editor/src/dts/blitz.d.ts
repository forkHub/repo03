declare namespace ha.be {
    class Be {
        private static _canvasAr;
        private static _canvasAktif;
        private static _skalaOtomatis;
        private static _merah;
        private static _hijau;
        private static _biru;
        private static _transparan;
        private static warnaBackup;
        static Pause(): void;
        /**
         * Handle saat window di resize
         * @private
         */
        private static windowResize;
        /**
         * mengeset/mengembalikan Kontek yang sedang aktif
         *
         * @param ctx (CanvasRenderingContext2D) | null
         * @returns CanvasRenderingContext2D
         */
        static Kontek(ctx?: CanvasRenderingContext2D): CanvasRenderingContext2D;
        static buatCanvas(canvasEl: HTMLCanvasElement): SprObj;
        static init(canvasBelakang: HTMLCanvasElement, canvasDepan: HTMLCanvasElement): void;
        private static backupWarna;
        private static restoreWarna;
        /**
         *
         * @param merah {angka} warna merah, optional default = 0
         * @param hijau
         * @param biru
         * @param transparan
         */
        static Bersih(merah?: number, hijau?: number, biru?: number, transparan?: number): void;
        /**
         * Update style warna
         * @param r (0-255)
         * @param g (0-255)
         * @param b (0-255)
         * @param a (0-100)
         */
        static Warna(r?: number, g?: number, b?: number, a?: number): void;
        static StrokeColor(r?: number, g?: number, b?: number, a?: number): void;
        private static updateStyleWarna;
        /**
         * Mengembalikan warna merah dari perintah AmbilPixel terakhir
         * @returns (number) warna merah
         */
        static Hijau(): number;
        static Merah(): number;
        /**
         * Mengembalikan warna biru dari perintah AmbilPixel terakhir
         * @returns (number) warna biru
         */
        static Biru(): number;
        /**
         *
         * @returns
         */
        static Transparan(): number;
        /**
         *
         * @returns
         */
        static Kanvas(): HTMLCanvasElement;
        static Grafis(panjang?: number, lebar?: number, canvas?: HTMLCanvasElement, fullScreen?: boolean, input?: boolean): void;
        /**
         * @private
         * helper method
         * */
        private static Grafis2;
        /**
         *
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         */
        static Garis(x1: number, y1: number, x2: number, y2: number): void;
        /**
         *
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @param isi
         * @param garis
         * @param rotasi
         */
        static Kotak(x1: number, y1: number, x2: number, y2: number, isi?: boolean, garis?: boolean, rotasi?: number): void;
        /**
         * Menggambar Oval
         * @param x posisi x
         * @param y posisi y
         * @param radius radius
         * @param skalaX skala horizontal
         * @param skalaY skala vertikal
         * @param rotasi sudut oval
         */
        static Oval(x: number, y: number, radius: number, skalaX?: number, skalaY?: number, rotasi?: number): void;
        static get canvasAktif(): SprObj;
        static set canvasAktif(value: SprObj);
        static get canvasAr(): SprObj[];
        static set canvasAr(value: SprObj[]);
        static get skalaOtomatis(): boolean;
        static set skalaOtomatis(value: boolean);
        static get merah(): number;
        static set merah(value: number);
        static get hijau(): number;
        static set hijau(value: number);
        static get biru(): number;
        static set biru(value: number);
        static get transparan(): number;
        static set transparan(value: number);
    }
}
declare namespace ha.be {
    class Cache {
        private files;
        getGbr(url: string): HTMLImageElement;
        setFile(url: string, img: HTMLImageElement): void;
    }
    export const cache: Cache;
    export {};
}
declare namespace ha.be {
    class Config {
        readonly stroke: Stroke;
        readonly fill: Stroke;
    }
    class RGB {
        private _m;
        private _g;
        private _b;
        get b(): number;
        set b(value: number);
        get g(): number;
        set g(value: number);
        get m(): number;
        set m(value: number);
    }
    class Stroke {
        private _tebal;
        readonly rgb: RGB;
        private _aktif;
        get aktif(): boolean;
        set aktif(value: boolean);
        get tebal(): number;
        set tebal(value: number);
    }
    export var config: Config;
    export {};
}
declare namespace Dict {
    export function create(): DictObj;
    export function setAttr(d: DictObj, key: string, value: any): void;
    export function value(d: DictObj, key: string): any;
    class DictObj {
        readonly attrs: Attr[];
    }
    class Attr {
        private _key;
        private _value;
        get key(): string;
        get value(): any;
        set value(value: any);
        constructor(key: string, value: any);
    }
    export {};
}
declare namespace ha.be {
    class Id {
        private static _id;
        static id(): string;
    }
}
declare enum EInput {
    TOUCH = "touch",
    MOUSE = "mouse",
    KEYB = "keyb",
    DEF = ""
}
declare namespace ha.be {
    class EventHandler {
        move(input: IInput, buffer: HTMLCanvasElement, e: PointerEvent): void;
        down(input: IInput, key: string, type: EInput, pos: IV2D): void;
        up(input: IInput): void;
        private checkTap;
    }
    export class Input {
        private static _inputs;
        private static _debug;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static _inputGlobal;
        private static _evt;
        constructor();
        /**
         * berapa kali tap terjadi sejak pemanggilan terakhir kali
         * @returns (number)
         */
        static JmlTap(): number;
        /**
         * berapa kali pointer diangkat  sejak pemanggilan terakhir kali
         * @returns (number)
         */
        static JmlUp(): number;
        /**
         * berapa jumlah drag selesai sejak pemanggilan terakhir kali
         * @returns
         */
        static JmlDragSelesai(): number;
        /**
         * (depecreated) type input dari event terkhir
         * @returns (EInput)
         */
        static InputType(): EInput;
        /**
         * berapa kali pointer di tekan sejak terakhir kali perintah dipanggil
         * @returns (number)
         */
        static InputHit(): number;
        /**
         * posisi x awal drag
         * @returns (number)
         *
         * */
        static InputXAwal(): number;
        /**
         * posisi y awal drag
         * @returns (number)
         */
        static InputYAwal(): number;
        /**
         * posisi x pointer
         * @returns (number)
         */
        static InputX(): number;
        /**
         * posisi y pointer
         * @returns
         */
        static InputY(): number;
        /**
         * berapa jauh pointer digeser sejajar sumbu x
         * @returns (number)
         */
        static GeserX(): number;
        /**
         * berapa jauh pointer di drag sejajar sumbu y
         * @returns (number)
         */
        static GeserY(): number;
        /**
         * menghapus data input
         */
        static FlushInput(): void;
        /**
         * berapa kali drag dimulai sejak pemanggilan terakhir
         *
         */
        static JmlDragMulai(): number;
        /**
         * mengecek apakah pointer sedang ditekan
         * @returns (boolean)
         */
        static Pencet(): boolean;
        /**
         * mengecheck apakah pointer sedang di drag
         * @returns (boolean)
         */
        static Geser(): boolean;
        private static getMouseKeyId;
        static init(buffer: HTMLCanvasElement): void;
        private static buatInputDefault;
        private static flush;
        private static flushByInput;
        private static getInput;
        private static baru;
        static getPos: (cx: number, cy: number, c: HTMLCanvasElement) => {
            x: number;
            y: number;
        };
        static get inputs(): IInput[];
        static get event(): EventHandler;
        static get global(): IInput;
    }
    export {};
}
/**
 * INTERFACE
*/
interface Ikt {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
}
interface IInput {
    xStart: number;
    yStart: number;
    xDrag: number;
    yDrag: number;
    x: number;
    y: number;
    isDrag: boolean;
    isDown: boolean;
    isTap: boolean;
    hit: number;
    key: string;
    type: EInput;
    timerStart: number;
    timerEnd: number;
    id: number;
    dragJml: number;
    dragSelesaiJml: number;
    tapJml: number;
    upJml: number;
}
interface IV2D {
    x: number;
    y: number;
}
interface IPoint2D {
    x: number;
    y: number;
}
interface IAudio {
    src: string;
    loaded: boolean;
    sound: HTMLAudioElement;
    playedCount: number;
}
declare namespace ha.be {
    class Mat {
        static Jarak(x1: number, y1: number, x2: number, y2: number): number;
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static Sudut(x: number, y: number): number;
        static Pi(): number;
        static Int(n: string): number;
        static Float(n: string): number;
        static Floor(n: number): number;
        static Ceil(n: number): number;
        static Sgn(n: number): number;
        static Abs(n: number): number;
        static Mod(a: number, b: number): number;
        static Sqr(n: number): number;
        static Sin(n: number): number;
        static Cos(n: number): number;
        static Tan(n: number): number;
        static Clamp(n: number, min: number, max: number): number;
    }
}
declare namespace ha.be {
    class Point {
        static create(x?: number, y?: number): IPoint2D;
        static copy(p1: IPoint2D, p2: IPoint2D): void;
        static clone(p: IPoint2D): IPoint2D;
        static sama(p1: IPoint2D, p2: IPoint2D): boolean;
        static putarPoros(p: IPoint2D, xc?: number, yc?: number, deg?: number): void;
        static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D;
        static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D;
    }
}
declare namespace ha.be {
    class Segment {
        static create(v1?: IPoint2D, v2?: IPoint2D): ISegment;
        static boundCollide(seg1: ISegment, seg2: ISegment): boolean;
        static collide(seg1: ISegment, seg2: ISegment): boolean;
        static copy(seg1: ISegment, seg2: ISegment): void;
        static clone(seg: ISegment): ISegment;
        static crossHor(seg: ISegment): boolean;
        static deg(line: ISegment): number;
        static getXAtIdx(seg: ISegment, idx: number): number;
        static getYAtIdx(seg: ISegment, idx: number): number;
        static vecI(seg: ISegment): number;
        static vecJ(seg: ISegment): number;
        static rotate(seg: ISegment, deg?: number, xc?: number, yc?: number): void;
        static minX(seg: ISegment): number;
        static maxX(seg: ISegment): number;
        static minY(seg: ISegment): number;
        static maxY(seg: ISegment): number;
        static translate(seg: ISegment, x?: number, y?: number): void;
        static xHorIdx(seg: ISegment): number;
    }
}
declare namespace ha.be {
    class Kotak {
        static buat(x1?: number, y1?: number, x2?: number, y2?: number): Ikt;
        private static copy;
        private static copyInfo;
        private static collideBound;
        static collide(r1: Ikt, r2: Ikt): boolean;
        private static collideDotBound;
        static collideDot(r: Ikt, x: number, y: number): boolean;
        static minX(r: Ikt): number;
        static maxX(r: Ikt): number;
        static minY(r: Ikt): number;
        static maxY(r: Ikt): number;
        static translate(rect: Ikt, x: number, y: number): void;
        static rotate(r: Ikt, deg: number, xc: number, yc: number, copy?: boolean): Ikt;
    }
}
declare namespace ha.be {
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        static equal(n1: number, n2: number, toleransi?: number): boolean;
        private static quadDeg2;
        /**
         * Menghitung sudut dari posisi relative ke posisi 0,0
         * @param x posisi x
         * @param y posisi y
         * @returns sudut relative ke posisi 0,0
         */
        static sudut(x: number, y: number): number;
        static normalizeDeg(deg: number): number;
        static degDistMax(angleS: number, angleT: number): number;
        static degDistMin(angleS: number, angleT: number): number;
        static jarak(x: number, y: number, xt: number, yt: number): number;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
}
declare namespace ha.be {
    class Sound implements IAudio {
        static readonly list: IAudio[];
        private _src;
        private _loaded;
        private _sound;
        private _playedCount;
        get playedCount(): number;
        set playedCount(value: number);
        get sound(): HTMLAudioElement;
        set sound(value: HTMLAudioElement);
        get loaded(): boolean;
        set loaded(value: boolean);
        get src(): string;
        set src(value: string);
        static Load(url: string): void;
        static Play(s: IAudio): void;
        static SoundEnded(s: IAudio): boolean;
        static SoundLoaded(s: IAudio): boolean;
    }
}
declare namespace ha.be {
    class Teks {
        private static nama;
        private static ukuran;
        private static x;
        private static y;
        private static _stroke;
        private static _jarak;
        private static _fill;
        static get stroke(): boolean;
        static set stroke(value: boolean);
        static get fill(): boolean;
        static set fill(value: boolean);
        static get jarak(): number;
        static set jarak(value: number);
        private static get ctx();
        static Goto(x: number, y: number): void;
        static Write(str: string): void;
        static WriteLn(str: string): void;
        /**
         *
         * @param nama
         */
        static Font(nama?: string): void;
        static FontSize(n?: number): void;
        /**
         *
         * @param rata (string) "center" | "end" | "left" | "right" | "start"
         */
        static Rata(rata?: CanvasTextAlign): void;
        /**
         * menulis teks di kanvas
         * @param teks (string)
         * @param x (number)
         * @param y (number)
         * @param warna (boolean=true) apakah akan mengisi teks dengan warna
         * @param garis (boolean=false) apakah akan menggunakan outline
         */
        static Tulis(teks: string, x: number, y: number, warna?: boolean, garis?: boolean): void;
    }
}
declare const LoadSound: typeof ha.be.Sound.Load;
declare const PlaySound: typeof ha.be.Sound.Play;
declare const SoundEnded: typeof ha.be.Sound.SoundEnded;
declare const SoundLoaded: typeof ha.be.Sound.SoundLoaded;
declare namespace ha.be {
    class SprImg {
        static buatBagiCanvas(canvas: HTMLCanvasElement, w?: number, h?: number, frameW?: number, frameH?: number): SprObj;
        static panjang(gbr: SprObj, pj?: number): number;
        static lebar(gbr: SprObj, lb?: number): number;
        static tabrakan(gbr1: SprObj, x1: number, y1: number, gbr2: SprObj, x2: number, y2: number): boolean;
        static dotDidalamGambar(gbr1: SprObj, x1: number, y1: number, x2: number, y2: number): boolean;
        static muatAnimAsync(url: string, fw: number, fh: number): SprObj;
        static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): SprObj;
        static muatAsync(url: string, onload: () => void): SprObj;
        static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): SprObj;
        static gambarUbin(gbr: SprObj, x?: number, y?: number, frame?: number): void;
        /**
         * mengambil pixel di layar
         * @param x posisi x
         * @param y posisi y
         * @returns (Uint8ClampedArray)
         */
        static AmbilPiksel(x?: number, y?: number): number[];
        /**
         *
         * @param x
         * @param y
         */
        static SetPiksel(x?: number, y?: number): void;
        static gambar(gbr: SprObj, x?: number, y?: number, frame?: number): void;
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        static ukuran(gbr: SprObj, w?: number, h?: number): void;
        static resetRect(img: SprObj): void;
        static rectToImageTransform(image: SprObj, x: number, y: number): void;
    }
}
declare const Graphics: typeof ha.be.Be.Grafis;
/**
 * Clear Screen and optionally use color
 * @param r number = 0 - 255 (optional) the red color
 * @param g
 * @param b
 * @param t
 */
declare function Cls(r?: number, g?: number, b?: number, t?: number): void;
declare const Color: typeof ha.be.Be.Warna;
declare const Stroke: typeof ha.be.Be.StrokeColor;
declare const Red: typeof ha.be.Be.Merah;
declare const Green: typeof ha.be.Be.Hijau;
declare const Blue: typeof ha.be.Be.Biru;
declare const Alpha: typeof ha.be.Be.Transparan;
declare const GetPixel: typeof ha.be.SprImg.AmbilPiksel;
declare const SetPixel: typeof ha.be.SprImg.SetPiksel;
declare const Line: typeof ha.be.Be.Garis;
declare const Rect: typeof ha.be.Be.Kotak;
declare const Oval: typeof ha.be.Be.Oval;
declare const CreateDict: typeof Dict.create;
declare const InputHit: typeof ha.be.Input.InputHit;
declare const InputX: typeof ha.be.Input.InputX;
declare const InputY: typeof ha.be.Input.InputY;
declare const InputIsDown: typeof ha.be.Input.Pencet;
declare const FlushInput: typeof ha.be.Input.FlushInput;
declare const InputDragX: typeof ha.be.Input.GeserX;
declare const InputDragY: typeof ha.be.Input.GeserY;
declare const InputIsDragged: typeof ha.be.Input.Geser;
declare const InputType: typeof ha.be.Input.InputType;
declare const InputTapCount: typeof ha.be.Input.JmlTap;
declare const InputDragStartCount: typeof ha.be.Input.JmlDragMulai;
declare const InputDragEndCount: typeof ha.be.Input.JmlDragSelesai;
declare const InputDragStartX: typeof ha.be.Input.InputXAwal;
declare const InputDragStartY: typeof ha.be.Input.InputYAwal;
declare const DistMin: typeof ha.be.Transform.degDistMin;
/**
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
declare function Distance(x1: number, y1: number, x2: number, y2: number): number;
declare namespace ha.be {
    class Spr {
        static readonly daftar: SprObj[];
        private static checkNull;
        static DragMode(s: SprObj, n: number): void;
        /**
         *
         * @param s
         * @returns
         */
        static Dimuat(s: SprObj): boolean;
        /**
         *
         * @param s
         * @returns
         */
        static StatusDrag(s: SprObj): boolean;
        /**
         * [depecrated]
         * @param s
         * @returns
         */
        static kontek(s: SprObj): CanvasRenderingContext2D;
        /**
         * [depecrated]
         * @param s
         * @param pj
         * @returns
         */
        static Panjang(s: SprObj, pj?: number): number;
        /**
         * [depacrated]
         * @param s
         * @param lb
         * @returns
         */
        static Lebar(s: SprObj, lb?: number): number;
        /**
         *
         * @param s
         * @param alpha 0-100s
         * @returns
         */
        static Alpha(s: SprObj, alpha?: number): number;
        /**
         *
         * @param s
         * @param sudut
         * @returns
         */
        static Rotasi(s: SprObj, sudut?: number): number;
        /**
         *
         * @param s
         * @param x
         * @param y
         */
        static Posisi(s: SprObj, x?: number, y?: number): void;
        /**
         *
         * @param s
         * @param x
         * @returns
         */
        static PosisiX(s: SprObj, x?: number | null | undefined): number;
        /**
         *
         * @param s
         * @param y
         * @returns
         */
        static PosisiY(s: SprObj, y?: number | null | undefined): number;
        /**
         *
         * @param s
         * @returns
         */
        static Bound(s: SprObj): Ikt;
        /**
         *
         * @param s
         * @param x
         * @param y
         * @returns
         */
        static Handle(s: SprObj, x?: number, y?: number): void;
        static HandleX(s: SprObj): number;
        static HandleY(s: SprObj): number;
        /**
         *
         * @param s
         * @param w
         * @param h
         */
        static Ukuran(s: SprObj, w: number, h: number): void;
        /**
         *
         * @param s {ISprObj} sprite
         * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
         * @returns
         */
        static Copy(s: SprObj, onload?: () => void): SprObj;
        /**
         *
         */
        static GambarSemua(): void;
        /**
         *
         * @param spr
         * @param spr2
         * @returns
         */
        static Tabrakan(spr: SprObj, spr2: SprObj): boolean;
        static TabrakanXY(spr: SprObj, x1: number, y1: number, spr2: SprObj, x2: number, y2: number): boolean;
        private static muatAnimasiAsyncKanvas;
        /**
         *
         * @param url
         * @param pf
         * @param lf
         * @param bisaDiDrag
         * @param tipeDrag
         * @returns
         */
        static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag?: boolean, tipeDrag?: number): SprObj;
        private static muatAsyncBerbagiKanvas;
        /**
         *
         * @param url (string) url gambar
         * @param bisaDiDrag
         * @param tipeDrag
         * @param onload
         * @returns
         */
        static Muat(url: string, bisaDiDrag?: boolean, tipeDrag?: number, onload?: () => void): SprObj;
        private static register;
        /**
         * Menggambar sprite ke layar
         * @param sprite
         * @param frame
         */
        static Gambar(sprite: SprObj, frame?: number): void;
        /**
         *
         * @param s
         * @param x
         * @param y
         * @param frame
         * @returns
         */
        static GambarXY(s: SprObj, x: number, y: number, frame?: number): void;
        /**
         *
         * @param spr
         * @param sudut
         * @param jarak
         * @param x2
         * @param y2
         * @param skalaX
         * @param skalaY
         */
        static posisiPolar(spr: SprObj, sudut: number, jarak: number, x2: number, y2: number, skalaX?: number, skalaY?: number, tilt?: number): void;
        /**
         *
         * @param spr
         * @param x
         * @param y
         * @param frame
         */
        static Ubin(spr: SprObj, x?: number, y?: number, frame?: number): void;
        /**
         *
         * @param spr
         * @returns
         */
        static StatusMuat(spr?: SprObj): boolean;
    }
}
declare const LoadImage: typeof ha.be.Spr.Muat;
declare const LoadAnimImage: typeof ha.be.Spr.MuatAnimasi;
declare const ResizeImage: typeof ha.be.Spr.Ukuran;
declare const DrawImage: typeof ha.be.Spr.Gambar;
declare const DrawImageXY: typeof ha.be.Spr.GambarXY;
declare const Collide: typeof ha.be.Spr.Tabrakan;
declare const CollideXY: typeof ha.be.Spr.TabrakanXY;
declare const Tile: typeof ha.be.Spr.Ubin;
declare const AllImageLoaded: typeof ha.be.Spr.StatusMuat;
declare const PositionImageXY: typeof ha.be.Spr.Posisi;
declare const PositionImagePolar: typeof ha.be.Spr.posisiPolar;
declare const DrawAllImage: typeof ha.be.Spr.GambarSemua;
declare const CopyImage: typeof ha.be.Spr.Copy;
declare const SpriteKontek: typeof ha.be.Spr.kontek;
declare const Handle: typeof ha.be.Spr.Handle;
declare const Rotation: typeof ha.be.Spr.Rotasi;
declare const Width: typeof ha.be.Spr.Panjang;
declare const Height: typeof ha.be.Spr.Lebar;
declare const ImageLoaded: typeof ha.be.Spr.Dimuat;
declare const ImageXPosition: typeof ha.be.Spr.PosisiX;
declare const ImageYPosition: typeof ha.be.Spr.PosisiY;
declare const ImageAlpha: typeof ha.be.Spr.Alpha;
declare const ImageIsDragged: typeof ha.be.Spr.StatusDrag;
declare const ImageBound: typeof ha.be.Spr.Bound;
/**
 * @memberof Image
 *
 * return Distance between 2 images
 * @param s first Image
 * @param s2 second Image
 */
declare function Dist2Image(s: ha.be.SprObj, s2: ha.be.SprObj): number;
declare const FontName: typeof ha.be.Teks.Font;
declare const FontSize: typeof ha.be.Teks.FontSize;
declare const Print: typeof ha.be.Teks.Tulis;
declare const Align: typeof ha.be.Teks.Rata;
declare namespace rpg {
    class Conf {
        private _roomUrl;
        private _npc;
        private _trig;
        get roomUrl(): string;
        set roomUrl(value: string);
        get npc(): NPC[];
        set npc(value: NPC[]);
        get trig(): Trig;
        set trig(value: Trig);
    }
    class Trig {
        readonly p: Point;
        private _id;
        static readonly list: Trig[];
        get id(): string;
        set id(value: string);
        private static baru;
        static buat(n: string, x: number, y: number): void;
    }
    class Point {
        private _x;
        private _y;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
    }
    class NPC {
        private _p;
        private _url;
        private _id;
        private static list;
        private static baru;
        static buat(n: string, url: string, x: number, y: number): NPC;
        get id(): string;
        set id(value: string);
        get url(): string;
        set url(value: string);
        get p(): Point;
        set p(value: Point);
    }
    export var conf: Conf;
    export {};
}
declare namespace rpg {
    function render(): void;
}
declare namespace ha.be {
    class SprObj {
        private static _ctrDraw;
        private _url;
        img: HTMLImageElement;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        isAnim: boolean;
        rect: Ikt;
        load: boolean;
        ratioX?: number;
        ratioY?: number;
        private _panjangDiSet;
        private _lebarDiSet;
        private _ctrIdx;
        private _x;
        private _y;
        private _alpha;
        private _frameW;
        private _frameH;
        private _handleX;
        private _handleY;
        private _rotasi;
        private _panjang;
        private _lebar;
        private _dragged;
        private _down;
        private _dragable;
        private _hit;
        private _tipeDrag;
        private _dragSelesaiJml;
        private _dragStartY;
        private _dragStartX;
        private _sudutTekanAwal;
        private _inputId;
        private _sudutAwal;
        get sudutAwal(): number;
        set sudutAwal(value: number);
        get frameW(): number;
        set frameW(value: number);
        get frameH(): number;
        set frameH(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get alpha(): number;
        set alpha(value: number);
        get handleY(): number;
        set handleY(value: number);
        get handleX(): number;
        set handleX(value: number);
        get panjang(): number;
        set panjang(value: number);
        get lebar(): number;
        set lebar(value: number);
        get panjangDiSet(): boolean;
        set panjangDiSet(value: boolean);
        get lebarDiSet(): boolean;
        set lebarDiSet(value: boolean);
        get ctrIdx(): number;
        set ctrIdx(value: number);
        get rotasi(): number;
        set rotasi(value: number);
        constructor(dragable?: boolean);
        get dragSelesaiJml(): number;
        set dragSelesaiJml(value: number);
        get drgStartX(): number;
        set drgStartX(value: number);
        get drgStartY(): number;
        set drgStartY(value: number);
        get dragged(): boolean;
        set dragged(value: boolean);
        get jmlHit(): number;
        set jmlHit(value: number);
        get down(): boolean;
        set down(value: boolean);
        get dragable(): boolean;
        set dragable(value: boolean);
        get sudutTekanAwal(): number;
        set sudutTekanAwal(value: number);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
        get inputId(): number;
        set inputId(value: number);
    }
}
declare namespace ha.be {
    /**
     * Handle interaksi sprite
     */
    class SpriteInteraksi {
        private spriteDown;
        inputDown(pos: any, id: number): void;
        inputMove(pos: any, pointerId: number): void;
        inputUp(): void;
    }
    export const sprInteraksi: SpriteInteraksi;
    export {};
}
declare namespace ha.be {
    class Spr3 {
        static gerakX(s: SprObj, n: number): void;
        static gerakY(s: SprObj, n: number): void;
        static gerakXY(s: SprObj, x: number, y: number): void;
        static gerakSudut(s: SprObj, n: number, sudut: number): void;
        static gerakPutar(s: SprObj, sudut: number, sx: number, sy: number): void;
        static menjauh(s: SprObj, x: number, y: number, jml: number): void;
        static mendekat(s: SprObj, x: number, y: number, jml: number): void;
    }
}
