import { isNone, arrNoneOrEmpty, isNotNone } from "./misc";



declare global {
    interface Array<T> {
        /**
         * if exists removes the given item from this array and returns it otherwise this method will return undefined
         * @param item to remove if exists
         */
        remove<T>(this:T[],item:T):T | undefined;
        /**
         * if index is valid this method removes the item at the given index from this array and returns it otherwise this method will return undefined
         * @param index to remove item at
         */
        removeAt<T>(this:T[],index:number):T | undefined;
        /**
         * returns the first item of this array or undefined if array is empty
         */
        first<T>(this:T[]):T|undefined;
        /**
         * returns the last item of this array or undefined if array is empty
         */
        last<T>(this:T[]):T|undefined;
        /**
         * adds all the given values to this array
         * @param newElements rest parameters to add to this array
         */
        addAll<T>(this:T[],...newElements:T[]):any;
        /**
         * checks whether this array is empty
         */
        isEmpty(this: T[]): boolean;
        /**
         * checks whether this array is not empty
         */
        isNotEmpty(this: T[]): boolean;
        /**
         * returns the first item of the array that matches the given predicate or the first item if no predicate was given 
         * or undefined if array is empty
         * @param predicate to match items to
         */
        firstWhere(this: T[], predicate?: (element: T) => boolean): T | undefined;
        /**
         * returns the last item of the array that matches the given predicate or the first item if no predicate was given 
         * or undefined if array is empty
         * @param predicate to match items to
         */
        lastWhere(this: T[], predicate?: (element: T) => boolean): T | undefined;
        /**
         * checks whether this array includes any of the given values
         * @param of values to check if this array includes any of them
         */
        includesAny<T>(this: T[], of: T[]): boolean;
        /**
         * checks whether this array includes all of the given values
         * @param of values to check if this array includes all of them
         */
        includesAll<T>(this:T[],of:T[]):boolean;
        /**
         * filters the items that are not null or undefined from this array
         */
        filterNotNone(this: (T | undefined | null)[]): NonNullable<T>[];
        /**
         * return the item at the given index of this array or undefined if array is empty or the index is not valid
         * @param index 
         */
        at(this: T[], index: number): T | undefined;
        /**
         * puts the {itemsToPutFirst} at the beginning of the array then sorts the rest of the array following them
         * @param sortFunc 
         * @param itemsToPutFirst 
         */
        putFirstThenSort(
            this: T[],
            sortFunc: (item1: T, item2: T) => number,
            ...itemsToPutFirst: T[]
        ): T[];
        /**
         * gets a random item of the array or undefined if array is empty
         */
        getRandomValue<T>(this:T[]):T|undefined ;
    }
}
//TODO: Return Error for not valid
Array.prototype.remove = function <T>(this: T[],item:T): T|undefined {
    if(isNone(item))return undefined;
    let index = this.indexOf(item);
    if(index < 0) return undefined;
    return this.removeAt(index);
};
Array.prototype.removeAt = function <T>(this: T[],index:number): T|undefined {
    if(index < 0 || index > this.length)return undefined;
    let item = this[index];
    this.splice(index,1);
    return item;
};
Array.prototype.first = function <T>(this: T[]):  T|undefined {
    return this.length === 0 ? undefined : this[0];
};
Array.prototype.last = function <T>(this: T[]):  T|undefined {
    return this.length === 0 ? undefined : this[this.length - 1];
};
Array.prototype.addAll = function <T>(this: T[],...newElements:T[]):  any {
    if(!newElements || (newElements?.length??0) === 0){return;}
    newElements.forEach(e=>this.push(e));
};
Array.prototype.isEmpty = function <T>(this: T[]): boolean {
    return this.length === 0;
};

Array.prototype.isNotEmpty = function <T>(this: T[]): boolean {
    return !this.isEmpty();
};


Array.prototype.firstWhere = function <T>(
    this: T[],
    predicate?: (element: T) => boolean
): T | undefined {
    if(this.length === 0){return;}
    if(!predicate){return this[0];}
    for (let i = 0; i < this.length;i++){
        if(predicate(this[i])){return this[i]}
    }
    return undefined;
};

Array.prototype.lastWhere = function <T>(
    this: T[],
    predicate?: (element: T) => boolean
): T | undefined {
    if(this.length === 0){return;}
    if(!predicate){return this[0];}
    for (let i = this.length - 1; i >= 0;i--){
        if(predicate(this[i])){return this[i]}
    }
    return undefined;
};

Array.prototype.includesAny = function <T>(this: T[], of: T[]): boolean {
    return this.isEmpty() ? false : this.some((e) => of.includes(e));
};
Array.prototype.includesAll = function <T>(this: T[], of: T[]): boolean {
    if(arrNoneOrEmpty(of)){return true;}
    return this.isEmpty() ? false : of.every((e) => this.includes(e));
};

Array.prototype.filterNotNone = function <T>(
    this: (T | undefined | null)[]
): NonNullable<T>[] {
    return this.filter((e) => isNotNone(e)) as NonNullable<T>[];
};

Array.prototype.at = function <T>(this: T[], index: number): T | undefined {
    return this.length - 1 >= index ? this[index] : undefined;
};
Array.prototype.putFirstThenSort = function <T>(this: T[], sortFunc: (item1: T, item2: T) => number, ...itemsToPutFirst: T[]): T[] {
    let it = itemsToPutFirst?.filterNotNone();
    if (arrNoneOrEmpty(it)) return this.filterNotNone().sort(sortFunc);
    let filter = this.filter(a => isNotNone(a) && !itemsToPutFirst.includes(a));
    if(arrNoneOrEmpty(filter))return([...it].sort(sortFunc));
    return [...[...it].sort(sortFunc), ...[...filter].sort(sortFunc)];
}
Array.prototype.getRandomValue = function <T>(this: T[]): T|undefined {
    if(this.length === 0)return undefined;
    const rand = Math.floor(Math.random() * this.length);
    return this[rand];
};







export { };
