export * from './extensions';


export function rbgaToHex(red: number, green: number, blue: number, alpha: number): string {
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1) + (!!alpha || alpha == 1 ? '' :  ((alpha * 255) | 1 << 8).toString(16).slice(1));
}


export function hexToRGBA(hexColor: string): RGBA {
    let filtered = hexColor.toLocaleLowerCase().split('\n')[0].replace(/[^\da-f]/, '');
    if (filtered.length === 0) { return new RGBA(); }
    filtered = filtered.substr(0, Math.min(8, filtered.length));

    let dec = (str: string, start: number, num: number): number => 
    { return num === 1 ? parseInt(str[start], 16) * 17 : parseInt(str[start], 16) * 16 + parseInt(str[start + 1], 16) }
    if (filtered.length === 1) { return new RGBA(dec(filtered, 0, 1)); }
    if (filtered.length === 2) { return new RGBA(dec(filtered, 0, 1), dec(filtered, 1, 1)); }
    if (filtered.length === 3) { return new RGBA(dec(filtered, 0, 1), dec(filtered, 1, 1), dec(filtered, 2, 1)); }
    if (filtered.length === 4) { return new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 1), dec(filtered, 3, 1)); }
    if (filtered.length === 5) { return new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 1)); }
    if (filtered.length === 6) { return new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2)); }
    if (filtered.length === 7) { return new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2), Math.round(dec(filtered, 6, 1) * 100 / 255)/100 ); }
    return new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2), Math.round(dec(filtered, 6, 2) * 1000 / 255)/1000);
    
}

export class RGBA {
    get hexColor(): string { return rbgaToHex(this.red ?? 0, this.green ?? 0, this.blue ?? 0, this.alpha ?? 1) }
    constructor(
        public red: number = 0,
        public green: number = 0,
        public blue: number = 0,
        public alpha: number = 1,
    ) { }
    toString(): string { return `rgba(${this.red ?? 0},${this.green ?? 0},${this.blue ?? 0},${this.alpha ?? 1})` }
    toRGBString(): string { return `rgb(${this.red ?? 0},${this.green ?? 0},${this.blue ?? 0})` }

}

