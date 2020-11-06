import { RGBA } from ".";

declare global{
    interface Array<T>{
        /**
         * converts the number array to an RGBA object 
         * [ex: {[], [0],[0,0],[0,0,0] and [0,0,0,1] will return RGBA{red:0,green:0,blue:0,alpha:1}}
         *      {[1] will return RGBA{red:1,green:0,blue:0,alpha:1}}
         *      {[135,50] will return RGBA{red:135,green:50,blue:0,alpha:1}}
         *      ...
         * ]
         */
        toRGBA(this:number[], cycleNumbers?:boolean):RGBA;
        /**
         * converts the number array to an RGBA object and returns whether it's dark or not based on its lumin value
         * [ex: {[255,255,255] and [200,222,255,1] will return false}
         *      {[], [0],[0,0,0] and [1,15,53,1] will return true}
         * ]
         */
        isDarkColor(this:number[], cycleNumbers?:boolean):boolean;
        /**
         * converts the numbers from rgba values to a hex string 
         * [ex: {[255,255,255] will return '#ffffff'}
         *      {[255,255,255,0] will return '#ffffff00'}
         *      {[], [0],[0,0,0],[0,0,0,1] and will return '#000000'}
         *      {[0,0,0,0]and will return '#00000000'}
         *      ...
         * ]
         */
        toHexColor(this:number[], cycleNumbers?:boolean):string;
        /**
         * get first four values of the array or (0 for red,green,blue and 1 for alpha) if absent and returns a rgba string 
         * of the shape: 'rgba(red,green,blue,alpha)'
         */
        toRGBAString(this:number[], cycleNumbers?:boolean):string;
        /**
         * get first three values of the array or 0 if absent and returns a rgba string 
         * of the shape: 'rgb(red,green,blue)'
         */
        toRGBString(this:number[], cycleNumbers?:boolean):string;
        
    }
    interface String{
        toRGBA(this:string, cycleNumbers?:boolean):RGBA;
        /**
         * converts the number array to an RGBA object and returns whether it's dark or not based on its lumin value
         * [ex: {'255,255,255', 'fff', '#fff', '#ffffff', '#fba9ff' and '200,222,255,1' will return false}
         *      {'', '0','000','#0','#','#000','121212','12121211','0,0,0', '' and '1,15,53,1' will return true}
         * ]
         */
        isDarkColor(this:string, cycleNumbers?:boolean):boolean;
        /**
         * converts the numbers from rgba values to a hex string 
         * [ex: {'255,255,255'  will return '#ffffff'}
         *      {'[255,255,255,0]' will return '#ffffff00'}
         *      {'','0','0,0,0' and  will return '#000000'}
         *      {'0,0,0,0' will return '#00000000'}
         *      ...
         * ]
         */
        rgbaToHex(this:string, cycleNumbers?:boolean):string;
        /**
         * converts the hex string to a rgba string 
         * of the shape: 'rgba(red,green,blue,alpha)'
         */
        hexToRGBAString(this:string, cycleNumbers?:boolean):string;
        /**
         * converts the hex string to a rgba string 
         * of the shape: 'rgb(red,green,blue)'
         */
        hexToRGBString(this:string, cycleNumbers?:boolean ):string;
    }
}


Array.prototype.toRGBA = function(this:number[], cycleNumbers:boolean = false):RGBA{
    let legal = (i:number):boolean=>i < this.length;
    let num = (i:number):number=>legal(i) ? this[i] : (i === 3 ? 1 : 0)
    let s = new RGBA(num(0),num(1),num(2),num(3),!!cycleNumbers)
    return new RGBA(num(0),num(1),num(2),num(3),!!cycleNumbers)
}
Array.prototype.isDarkColor = function(this:number[], cycleNumbers:boolean = false):boolean{
    return this.toRGBA(!!cycleNumbers).isDark
}
Array.prototype.toHexColor = function(this:number[], cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).hexColor
}
Array.prototype.toRGBAString = function(this:number[], cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).toString()
}
Array.prototype.toRGBString = function(this:number[], cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).toRGBString()
}


String.prototype.toRGBA = function(this:string, cycleNumbers:boolean = false):RGBA{
    return RGBA.fromString(this,!!cycleNumbers);
}
String.prototype.isDarkColor = function(this:string, cycleNumbers:boolean = false):boolean{
    return this.toRGBA(!!cycleNumbers).isDark
}
String.prototype.rgbaToHex = function(this:string, cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).hexColor
}
String.prototype.hexToRGBAString = function(this:string, cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).toString()
}
String.prototype.hexToRGBString = function(this:string, cycleNumbers:boolean = false):string{
    return this.toRGBA(!!cycleNumbers).toRGBString()
}



export {}