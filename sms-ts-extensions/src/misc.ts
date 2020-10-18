/**
 * checks whether the given parameter is not null nor undefined
 * @param x toCheck
 */
export function isNotNone<T>(x: T | undefined | null): x is T {
    return x != null && x != undefined;
}
/**
 * checks whether the given parameter is null or undefined
 * @param x toCheck
 */
export function isNone<T>(x: T | undefined | null): x is T {
    return !isNotNone(x);
}
/**
 * checks if the given element is not none, if so then applied the given function to it and returns that as a result
 * @param x to check if not none
 * @param notNoneAnd if the element was not none this function is applied to it and the boolean result is returned
 */
export function isNotNoneAnd<T>(x: T | undefined | null, notNoneAnd:(x:T)=>boolean): boolean {
    return isNotNone(x) && notNoneAnd(x as T);
}
/**
 * just a simple function to use if the element has a long name and used frequently in the context to rename it and use it
 * @param x element to rename
 * @param callBack the function to apply to the element
 */
export function takeAndDo<E, T>(x: E, callBack: (x: E) => T): T {
    return callBack(x);
}
/**
 * checks whether the given elemnt is not none and wherther it's an array an if so whether it is empty or not
 * @param x array to check
 */
export function arrNoneOrEmpty<E, T extends Array<E>>(x: T | undefined | null): boolean {
    return !(x as Array<E>)?.length;
}
/**
 * checks whether the given elemnt is not none and wherther it's an array an if so whether it is empty or not
 * if it was null or empty {nullOrEmptyCallback} function is called and its return value is returned
 * otherwise the given {otherwiseCallback} will be applied to the array and its return value is returned
 * @param x array to check
 * @param nullOrEmptyCallback function to call and return if array was null or empty
 * @param otherwiseCallback  function to call and return if array was not null nor empty
 */
export function arrNoneOrEmptyThenDo<E, T extends Array<E>, F>(x: T | undefined | null, nullOrEmptyCallback?: () => F, otherwiseCallback?: (array: T) => F): F | null {
    if (arrNoneOrEmpty(x)) { if (nullOrEmptyCallback) return nullOrEmptyCallback() }
    else { if (otherwiseCallback && x as T) return otherwiseCallback(x as T); }
    return null;
}
/**
 * checks whether the given elemnt is not none and wherther it's an array an if so whether it is empty or not
 * if it was null or empty {nullOrEmptyReturn} will be returned
 * otherwise the given {otherwiseReturn} will be returned
 * @param x array to check
 * @param nullOrEmptyReturn value to return if array was null or empty
 * @param otherwiseReturn  value to return if array was not null nor empty
 */
export function arrNoneOrEmptyThenReturn<E, T extends Array<E>, F>(x: T | undefined | null, nullOrEmptyReturn?: F, otherwiseReturn?: F): F | null {
    if (arrNoneOrEmpty(x)) { if (nullOrEmptyReturn) return nullOrEmptyReturn }
    else { if (otherwiseReturn && x as T) return otherwiseReturn; }
    return null;
}
/**
 * checks whether the given element is not none and if so whether it is a string and is not empty
 * @param x string to check
 */
export function strNoneOrEmpty(x: string | undefined | null) {
    let s = x as string;
    return !(!!s?.replace && s?.length !== 0);
}
