declare global {
    interface Array<T> {
        /**
     * joins the valid (not None and not empty or blank) strings from the array
     * @param seperator the seperator between the joined strings if any was given
     * @param trim whether to trim the valid strings before joining them
     * @param others the other strings as rest parameters
     */
        joinValid(this: string[], seperator?: string, trim?: boolean): string | null;
    }
}
Array.prototype.joinValid = function <T>(this: string[], seperator?: string, trim: boolean = false): string | null {
    let result = '';
    let sep = seperator ?? '';
    this.forEach((o) => {
        if (o && o.trim()) result = (!result ? '' : result + sep) + (trim ? o.trim() : o);
    });
    return result ?? null;
};
export { };