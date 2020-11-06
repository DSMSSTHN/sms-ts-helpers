export * from './extensions';

/**
 * converts a rgba color to hex color string 
 * 
 * any values that are undefined will be set to its default value
 * @param red default value 0
 * @param green default value 0
 * @param blue default value 0
 * @param alpha default value 1
 * @param cycleNumbers if values less than min or more than max. whether to clamp them [0-255] or cycle them (mod 256 ...)
 */
export function hexFromRGBAValues(red?: number, green?: number, blue?: number, alpha?: number, cycleNumbers: boolean = false): string {
    let rgba = new RGBA(red, green, blue, alpha, !!cycleNumbers);
    return rgba.hexColor
}

/**
 * converts a hex color to an rgba object
 * @example [ '#f' and 'f' 'fxzc'... will evaluate to rgba(255,0,0,1)         //1 element
 *          '#ff' and 'ff' will evaluate to rgba(255,255,0,1)                 //2elements
 *          '#fff' and 'fff' will evaluate to rgba(255,255,255,1)             //3elements
 *          '#ffff' and 'ffff' will evaluate to rgba(255,255,255,1)           //4elements
 *          '#fff0' and 'fff0' will evaluate to rgba(255,255,255,0)           //4elements
 *          '#00fff' and '0ffff' will evaluate to rgba(0,255,255,1)           //5elements
 *          '#00ff0f' and '0fffff' will evaluate to rgba(0,255,0,1)           //6elements
 *          '#00ff00f' and '0fffff' will evaluate to rgba(0,255,0,1)           //7elements
 *          '#00ff00ff' and '0ffff' will evaluate to rgba(0,255,0,1)          //8elements
 * ]
 * @param hexColor 
 * @param cycleNumbers whether the retuned RGBA object should clamp or cycle its numbers 
 */
export function hexToRGBA(hexColor?: string | null, cycleNumbers: boolean = false): RGBA {
    let filtered = hexColor?.toLocaleLowerCase()?.split('\n')[0]?.replace(/[^0-9a-f]/, '');
    if (!filtered || filtered.length === 0) { let result = new RGBA(); result.cycleNumbers = cycleNumbers; return result }
    filtered = filtered.substr(0, Math.min(8, filtered.length));
    let dec = (str: string, start: number, num: number): number => { return num === 1 ? parseInt(str[start], 16) * 17 : parseInt(str[start], 16) * 16 + parseInt(str[start + 1], 16) };
    let result: RGBA
    switch (filtered.length) {
        case 1:
            result = new RGBA(dec(filtered, 0, 1));
            break;
        case 2:
            result = new RGBA(dec(filtered, 0, 1), dec(filtered, 1, 1));
            break;
        case 3:
            result = new RGBA(dec(filtered, 0, 1), dec(filtered, 1, 1), dec(filtered, 2, 1));
            break;
        case 4:
            result = new RGBA(dec(filtered, 0, 1), dec(filtered, 1, 1), dec(filtered, 2, 1), Math.round(dec(filtered, 3, 1) * 1000 / 255) / 100);
            break;
        case 5:
            result = new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 1));
            break;
        case 6:
            result = new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2));
            break;
        case 7:
            result = new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2), Math.round(dec(filtered, 6, 1) * 1000 / 255) / 100);
            break;
        default:
            result = new RGBA(dec(filtered, 0, 2), dec(filtered, 2, 2), dec(filtered, 4, 2), Math.round(dec(filtered, 6, 2) * 1000 / 255) / 1000);
    }
    result.cycleNumbers = cycleNumbers;
    return result;
}
/**
 * RGBA class representing the Red, Green, Blue and Alpha of the color
 */
export class RGBA {
    //Private Variables:
    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;
    private _alpha: number = 1;
    // Public Properties
    get red(): number { return this.fixColor(this._red); }
    get green(): number { return this.fixColor(this._green) }
    get blue(): number { return this.fixColor(this._blue) }
    get alpha(): number { return this.fixAlpha(this._alpha) }
    set red(newValue: number) { this._red = this.fixColor(newValue) }
    set green(newValue: number) { this._green = this.fixColor(newValue) }
    set blue(newValue: number) { this._blue = this.fixColor(newValue) }
    set alpha(newValue: number) { this._alpha = this.fixAlpha(newValue) }
    /**
     * get the hex color string of this rgba color
     */
    get hexColor(): string {
        return `#${this.getHexNum(this.red)}${this.getHexNum(this.green)}${this.getHexNum(this.blue)}${this.alpha === 1 ? '' : this.getHexNum(Math.round(this.alpha * 255))}`
    }
    get hexColorWithAlpha(): string {
        return `#${this.getHexNum(this.red)}${this.getHexNum(this.green)}${this.getHexNum(this.blue)}${this.getHexNum(Math.round(this.alpha * 255))}`
    }
    get hexColorWithoutAlpha(): string {
        return `#${this.getHexNum(this.red)}${this.getHexNum(this.green)}${this.getHexNum(this.blue)}`
    }
    /**
     * whether the color is dark or not based on its Lumin value
     */
    get isDark(): boolean { return 0.2126 * (this.red) + 0.7152 * (this.green) + 0.0722 * (this.blue) < 60 }
    /**
     * return a number array consesting of the red, green and blue values
     */
    get rgbNumberArray(): number[] { return [this.red, this.green, this.blue] }
    /**
     * return a number array consesting of the red, green , blue and alpha values
     */
    get rgbaNumberArray(): number[] { return [this.red, this.green, this.blue, this.alpha] }

    //Constructor:
    /**
     * creates a RGBA Object given the red, green, blue values (will be clamped between 0 and 255) and alpha(will be clamped between 0,1)
     * and given the choice to be cycleNumbers
     * @param _red 
     * @param _green 
     * @param _blue 
     * @param _alpha 
     * @param cycleNumbers if false then the numbers will be clamped to min and max values 
     *                      [ex: given values (red:-10,green:300,blue:-1000,alpha:5.354) will give back values (red:0,green:255,blue:0,alpha:1)]
     *                      if true then colors will be cycleNumbers to mod 256 and alpha will be cycleNumbers to ((alpha * 100000) mod 100000)/100000 ) instead of clamped
     *                      [ex: given values (red:-10,green:300,blue:-1000,alpha:5.354) will give back values (red:246,green:44,blue:24,alpha:1)
     *                           given values (red:-135,green:0,blue:16324,alpha:-1.1) will give back values (red:121,green:0,blue:196,alpha:0.9)
     *                       ]
     */
    constructor(
        red: number = 0,
        green: number = 0,
        blue: number = 0,
        alpha: number = 1,
        public cycleNumbers: boolean = false
    ) {
        this._red = this.fixColor(red)
        this._green = this.fixColor(green)
        this._blue = this.fixColor(blue)
        this._alpha = this.fixAlpha(alpha)
        this.cycleNumbers = !!cycleNumbers
    }


    // Public Methods:
    /**
     * converts the rgba object to an rgba string
     */
    toString(): string { return `rgba(${this.red},${this.green},${this.blue},${this.alpha})` }
    /**
     * converts the rgba object to an rgb string
     */
    toRGBString(): string { return `rgb(${this.red},${this.green},${this.blue})` }

    toRGBA(cycleNumbers: boolean = false): RGBA { return this; }

    /**
     * checks whether the other given value (RGBA, string, array, json) equals this RGBA object
     * !!NOTE!!: if given object was not null undefined or nan any not valid values within will be rounded to default
     * 
     * note: alpha will be rounded to 2 numbers after the decimal when comparing [ex: alpha:0.558 will equal alpha:0.551]
     * 
     * @example '15,' and '15,0,0,5' and '0f0000' and  { red: 15 } and { red: 15, alpha: 1 } and [15] and new RGBA(15) will all equal each others
     * 
     * @param other other object to check equality
     * @param cycleNumbers if other object is not RGBA object and has values less than min or more than max. whether to clamp them [0-255] or cycle them (mod 256 ...)
     */
    sameColor(other: any, cycleNumbers: boolean = false): boolean {
        if (!other) { return false }
        if (other.hasOwnProperty('red') || other.hasOwnProperty('green') ||
            other.hasOwnProperty('blue') || other.hasOwnProperty('alpha') || other.hasOwnProperty('cycleNumbers')) {
            let o = !!other.toRGBA ? other.toRGBA(cycleNumbers) : other;
            return this.red === this.fixColor(o.red, cycleNumbers) &&
                this.green === this.fixColor(o.green, cycleNumbers) &&
                this.blue === this.fixColor(o.blue, cycleNumbers) &&
                Math.floor(this.alpha * 100) / 100 === Math.floor(this.fixAlpha(o.alpha, cycleNumbers) * 100) / 100
        }
        return !!other?.toRGBA(cycleNumbers)?.sameColor(this);
    }

    
    /**
     * sets the red of this RGBA object and returns this to enable chaining on initialization or returns a new RGBA with same values as this and new red
     * @param alpha the new red value between 0 and 255
     * @param returnNew whether to change the red of this object and return it or return new RGBA object with same values except red
     */
    withRed(red: number, returnNew: boolean = false): RGBA {
        if (returnNew) { return new RGBA(red, this.green, this.blue, this.alpha,this.cycleNumbers); }
        this.red = red;
        return this;
    }
    /**
     * sets the green of this RGBA object and returns this to enable chaining on initialization or returns a new RGBA with same values as this and new green
     * @param alpha the new green value between 0 and 255
     * @param returnNew whether to change the green of this object and return it or return new RGBA object with same values except green
     */
    withGreen(green: number, returnNew: boolean = false): RGBA {
        if (returnNew) { return new RGBA(this.red, green, this.blue, this.alpha,this.cycleNumbers); }
        this.green = green;
        return this;
    }
    /**
     * sets the blue of this RGBA object and returns this to enable chaining on initialization or returns a new RGBA with same values as this and new blue
     * @param alpha the new blue value between 0 and 255
     * @param returnNew whether to change the blue of this object and return it or return new RGBA object with same values except blue
     */
    withBlue(blue: number, returnNew: boolean = false): RGBA {
        if (returnNew) { return new RGBA(this.red, this.green, blue, this.alpha,this.cycleNumbers); }
        this.blue = blue;
        return this;
    }
    /**
     * sets the alpha of this RGBA object and returns this to enable chaining on initialization or returns a new RGBA with same values as this and new alpha
     * @param alpha the new alpha value between 0 and 1
     * @param returnNew whether to change the alpha of this object and return it or return new RGBA object with same values except alpha
     */
    withAlpha(alpha: number, returnNew: boolean = false): RGBA {
        if (returnNew) { return new RGBA(this.red, this.green, this.blue, alpha,this.cycleNumbers); }
        this.alpha = alpha;
        return this;
    }
    /**
     * darkens the color by decreasing red, green, and blue together by the given value
     * @param darkness the value to darken by, between 0 and 255
     * @param returnNew whether to change the values of this object and return it or return new RGBA object with new values
     */
    darkenBy(darkness:number, returnNew: boolean = false):RGBA{
        if(returnNew){
            let result =  new RGBA(this.red - darkness, this.green - darkness, this.blue - darkness,this.alpha,false);
            result.cycleNumbers = this.cycleNumbers;
            return result;
        }
        let prevCycle = this.cycleNumbers;
        this.cycleNumbers = false
        this.red -= darkness;
        this.green -= darkness;
        this.blue -= darkness;
        this.cycleNumbers = prevCycle;
        return this;
    }
    /**
     * lightens the color by increasing red, green, and blue together by the given value
     * @param darkness the value to lighten by, between 0 and 255
     * @param returnNew whether to change the values of this object and return it or return new RGBA object with new values
     */
    lightenBy(darkness:number, returnNew: boolean = false):RGBA{
        if(returnNew){
            let result =  new RGBA(this.red + darkness, this.green + darkness, this.blue + darkness,this.alpha,false);
            result.cycleNumbers = this.cycleNumbers;
            return result;
        }
        let prevCycle = this.cycleNumbers;
        this.cycleNumbers = false
        this.red += darkness;
        this.green += darkness;
        this.blue += darkness;
        this.cycleNumbers = prevCycle;
        return this;
    }

    // Private Methods:
    /**
     * this method clamps or cycles the given color number value with min 0 and max 255
     * @param color to clamp or cycle
     * @param cycleNumbers if other object is not RGBA object and has values less than min or more than max. whether to clamp them [0-255] or cycle it (mod 256)
     */
    private fixColor(color: number, cycleNumbers: boolean = this.cycleNumbers): number {
        if (color === undefined || color === null || isNaN(color)) { return 0; }
        if (cycleNumbers) {

            if (color < 0) { return -(-color % 256) + 256; }
            return color % 256;
        }
        return Math.max(0, Math.min(255, color));
    }
    /**
     * converts the number to a string of its hex value
     * @param number 
     */
    private getHexNum(number: number): string {
        let hexValue = number.toString(16)
        if (hexValue.length === 1) { return hexValue + hexValue }
        return hexValue
    }
    /**
     *  this method clamps or cycles the given alpha number value with min 0 and max 1 with 5 digit precision
     * @param alpha to clamp or cycle
     * @param cycleNumbers if other object is not RGBA object and has values less than min or more than max. whether to clamp them [0-255] or cycle it
     */
    private fixAlpha(alpha: number, cycleNumbers: boolean = this.cycleNumbers): number {
        if (alpha === undefined || alpha === null || isNaN(alpha)) { return 1; }
        if (cycleNumbers) {
            if (alpha < 0) { return (-(-(alpha * 100000) % 100000) + 100000) / 100000; }
            return (alpha * 100000) % 100000 / 100000;
        }
        let result = Math.max(0, Math.min(1, alpha));
        return result;
    }


    // Public Static Methods:
    /**
     * converts the given hex or rgb or rgba string to an RGBA object 
     * @param string it can be given a hex [ex: either with # like '#1baf15' and '#121212bb'  or without like '1baf15' and '121212bb']
     *              or an rgb or rgba color string with numbers seperated by comma 
     *              [ex: rgb(25,52,63) - rgba(25,52,63,1) - rgba(25,52,63) - (25,52,63) - 25,52,63 all will result in the same object]
     */
    static fromString(string: string, clamped: boolean = false): RGBA {
        if (!string || !string.trim()) {
            console.log(`Given string was ${string === '' ? 'empty' : string}`);
            let resut = new RGBA();
            return resut;
        }
        if (string.includes('#')) return hexToRGBA(string)
        let regex = /\-{0,1}\d+(\.{0,1}\d+){0,1}/g;
        if (string.includes(',')) return string.match(regex)?.slice(0, 4)?.map(ds => parseFloat(ds) || 0)?.toRGBA() || hexToRGBA(string);
        return hexToRGBA(string);
    }
    /**
     * converts the given object to an rgba object given the fact that it shall have reg, green, blue, alpha and cycleNumbers properties 
     * or at least some of them and the rest will be given the default values 
     * (red, green, blue: are default to 0. alpha is default to 1, cycleNumbers is default to false)
     * @param obj the js Object or json object to convert to RGBA
     */
    static fromObject(obj: any, cycleNumbers: boolean = false) {
        return new RGBA(
            obj?.red,
            obj?.green,
            obj?.blue,
            obj?.alpha,
            !!obj?.cycleNumbers || !!cycleNumbers
        );
    }
    /**
     * this method checks whether the given value is a color 
     * 
     * -VALUES that are considered Color are:
     *      RGBA Object from this class,
     *      hex string (any string that has # in it or is not empty, contains numbers [0-9a-fA-f] and has no commas is considered a hex)
     *      rgb and rgba strings (any string that doesn't have # in it and has a comma in it is considerd an rgb or rgba string)
     *      json/js Object (any object that has any of the properties {red,green,blue,alpha,cycleNumbers} is considered a json object)
     *      array of numbers (any array of numbers will evaluate to true)
     * 
     * @example THESE WILL RETURN TRUE: ['#fff' , '#151342252341ddvxcvs' , '1bf3e1' , 'rgba(1,5)' , 'rgba(-20,0,300,5)' , 'rgb(100,500,3)' 
     *          , '50,3,1' , '50,' and ',' , [100,50,255,1] , [1] , {red:50,green:3,blue:35,alpha:} , {red:50} , {cycleNumbers:false}]
     * 
     * @example THESE WILL RETURN FALSE: ['' , undefined , null , 0 , 'qsr' , '#' , ['asd','sgs'] , {r:5,g:30,b:50}]
     * 
     * @param obj 
     */
    static isColor(obj: any) {
        if (!obj) { return false; }
        if (obj.hasOwnProperty('red') || obj.hasOwnProperty('green') || obj.hasOwnProperty('blue') || obj.hasOwnProperty('alpha') || obj.hasOwnProperty('cycleNumbers')) {
            return true;
        }
        if (obj as String && !!obj.replace) {
            let str = (obj as String)
            let repl = str?.replace(/[^0-9a-f,]/gi, '')
            return !!repl
        }
        if (obj as Number[]) {
            let arr = (obj as Number[])?.length
            return !!arr && !!(parseInt(obj[0]) + 1) && !!obj.toRGBA
        }
        return false;
    }
    /**
     * this method checks whether given two objects have the same color values
     * 
     * -VALUES that are considered Color are:
     *      RGBA Object from this class,
     *      hex string (any string that has # in it or is not empty, contains numbers [0-9a-fA-f] and has no commas is considered a hex)
     *      rgb and rgba strings (any string that doesn't have # in it and has a comma in it is considerd an rgb or rgba string)
     *      json/js Object (any object that has any of the properties {red,green,blue,alpha,cycleNumbers} is considered a json object)
     *      array of numbers (any array of numbers will evaluate to true)
     * 
     * @example THESE WILL RETURN TRUE: 
     * ['#fff' , 'ffffff' , 'ffffffff' , 'fffvfff' , rgba(255,255,255,1) , [255,255,255,1] , {red:255,green:255,blue:255}
     * '#' , ',' , '#0' , '0000' , 'rgba(0,0,0,1)' , '(0,0), , [0] and {red:0} , {red:0,green:0,blue:0,alpha:1}]
     * 
     * @example THESE WILL RETURN FALSE: 
     * [('#fff' and rgba(255,255,255,0) because alpha default is 1)
     * ('#00000000' and rgb(0,0,0) also because of alpha)
     * (rgba(0,0,0,0) and rgb(0,0,0))
     * ('121212' and rgba(255,200,10))
     * ....
     * ]
     * 
     * @param obj 
     */
    static colorEquals(obj1: any, obj2: any, cycleNumbers: boolean = false): boolean {
        if (!obj1 || !obj2) { return false }

        if ((!!obj1.toRGBA && obj1.toRGBA(cycleNumbers).sameColor(obj2, cycleNumbers)) || (!!obj2.toRGBA && obj2.toRGBA(cycleNumbers).sameColor(obj1, cycleNumbers))) {
            return true;
        }
        if (
            (obj1.hasOwnProperty('red') || obj1.hasOwnProperty('green') || obj1.hasOwnProperty('blue') || obj1.hasOwnProperty('alpha')) &&
            (obj2.hasOwnProperty('red') || obj2.hasOwnProperty('green') || obj2.hasOwnProperty('blue') || obj2.hasOwnProperty('alpha'))
        ) {
            return RGBA.fromObject(obj1, cycleNumbers).sameColor(RGBA.fromObject(obj2, cycleNumbers));
        }
        return false;
    }
}

/**
 * whether the color is dark or not based on its Lumin value
 * @param color 
 */
export function colorIsDark(color?: RGBA | string, cycleNumbers: boolean = false): boolean {
    return !color ? true : ((color as RGBA).isDark || RGBA.fromString(color as string, !!cycleNumbers).isDark)
}
/**
 * converts an rgba color to hex color string
 * @param rgba either an RGBA object, or an rgb or rgba string
 */
export function rgbaToHex(rgba?: RGBA | string | any, cycleNumbers: boolean = false): string {
    return (rgba as RGBA)?.hexColor || isRGBAObject(rgba) ? RGBA.fromObject(rgba).hexColor : RGBA.fromString(rgba as string, !!cycleNumbers).hexColor
}

function isRGBAObject(obj: any) {
    return !!obj &&
        (obj.hasOwnProperty("red") || obj.hasOwnProperty("blue") ||
            obj.hasOwnProperty("green") || obj.hasOwnProperty("alpha") ||
            obj.hasOwnProperty("cycleNumbers")
        )
}