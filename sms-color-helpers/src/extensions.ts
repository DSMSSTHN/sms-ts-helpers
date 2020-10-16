import { RGBA } from ".";

declare global{
    interface Array<T>{
        toRGBA(this:number[]):RGBA;
    }
}


Array.prototype.toRGBA = function<T>(this:number[]):RGBA{
    let legal = (i:number):boolean=>i < this.length;
    let num = (i:number):number=>legal(i) ? this[i] : (i == 3 ? 1 : 0)
    return new RGBA(num(0),num(1),num(2),num(3))
}




export {}