declare global{
    interface Boolean {
        /**
         * if this boolean value is true the first function is called and return otherwise the second
         * @param callback function called and return if this boolean evaluates to true
         * @param otherWise function called and return if this boolean evaluates to false
         */
        trueThenDo<T = any>(this:boolean,callback:()=>T,otherWise?:()=>T):T|null;
        /**
         * if this boolean value is false the first function is called and return otherwise the second
         * @param callback function called and return if this boolean evaluates to false
         * @param otherWise function called and return if this boolean evaluates to true
         */
        falseThenDo<T = any>(this:boolean,callback:()=>T,otherWise?:()=>T):T|null;
        /**
         * if this boolean value is true the first value is returned
         * @param callback value to return if this boolean evaluates to true
         * @param otherWise value to return if  this boolean evaluates to false
         */
        trueThenReturn<T>(this:boolean,trueValue:T,otherWise?:T):T|null;
        /**
         * if this boolean value is false the first value is returned
         * @param callback value to return if this boolean evaluates to false
         * @param otherWise value to return if  this boolean evaluates to true
         */
        falseThenReturn<T>(this:boolean,falseValue:T,otherWise?:T):T|null;
    }
}
Boolean.prototype.trueThenDo = function<T>(this:boolean,callback:()=>any,otherWise?:()=>T):T|null {
    if(this && callback){return callback()}
    else {if(otherWise)return otherWise()}
    return null;
};
Boolean.prototype.falseThenDo = function<T>(this:boolean,callback:()=>any,otherWise?:()=>T):T|null {
    if(!this && callback){return callback()}
    else {if(otherWise)return otherWise()}
    return null;
};
Boolean.prototype.trueThenReturn = function<T>(this:boolean,trueValue:T,otherWise?:T):T|null{
    if(this){return trueValue}
    else {if(otherWise)return otherWise}
    return null;
};
Boolean.prototype.falseThenReturn = function<T>(this:boolean,falseValue:T,otherWise?:T):T|null{
    if(!this){return falseValue}
    else {if(otherWise)return otherWise}
    return null;
};
export {};