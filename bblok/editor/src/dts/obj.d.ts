declare namespace ha {
    class Obj {
        static klon(): void;
        static cariAr(objAr: Array<any>, key: string, res: any[]): void;
        static cariKey(obj: any, key: string, res: any[]): void;
        static cariFuncAr(objAr: Array<any>, func: (obj: any) => boolean, res: any[]): void;
        static cariFunc(obj: any, func: (objP: any) => boolean, res: any[]): void;
    }
}
