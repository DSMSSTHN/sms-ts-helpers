declare global {
    interface Number {
        /**
         * create an array with this number of elemets using the generation function
         * @param generationFunc the function used to generate the array based on the index
         */
        generateArray<T>(this: number, generationFunc: (index: number) => T): T[];
    }
}
Number.prototype.generateArray = function <T>(this: number, generationFunc: (index: number) => T): T[] {
    let result: T[] = [];
    if (this === 0) return [];
    if (this > 0) {
        for (let i = 0; i < this; i++) {
            result.push(generationFunc(i));
        }
    } else {
        for (let i = this - 1; i >= 0; i--) {
            result.push(generationFunc(i));
        }
    }
    return result;
}
export { };