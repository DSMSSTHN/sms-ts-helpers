import { arrNoneOrEmpty, isNone, isNotNone, strNoneOrEmpty } from "./misc";


declare global {
  interface String {
    /**
     * whether the string is empty
     */
    isEmpty(this: string): boolean;
    /**
     * whether the string is not empty 
     */
    isNotEmpty(this: string): boolean;
    /**
     * joins the string with the valid (not None and not empty or blank) other strings given
     * @param seperator the seperator between the joined strings if any was given
     * @param trim whether to trim the valid strings before joining them
     * @param others the other strings as rest parameters
     */
    joinValids(this: string, seperator?: string,trim?:boolean, ...others: string[]): string;
    /**
     * whether the string includes any of the other strings given
     * @param of the other string to match any of them
     * @param ignoreCase whether to ignore case while checking
     */
    includesAny(this: string, of: string[], ignoreCase?:boolean): boolean;
     /**
     * whether the string includes all of the other strings given
     * @param of the other string to match all of them
     * @param ignoreCase whether to ignore case while checking
     */
    includesAll(this: string, of: string[], ignoreCase?:boolean): boolean;
    /**
     * converts both strings to lower cases before comparing them
     * @param other the other string to compare
     * @param trim whether to trim the strings before comparing
     */
    compareLower(this: string, other: string, trim?: boolean): number;
    /**
     * checks whether both strings are equal after converting both of them to lower case
     * @param other 
     * @param trim whether to trim the strings before comparing
     */
    equalsLower(this: string, other: string, trim?: boolean): boolean;
  }
}

String.prototype.isEmpty = function (this: string): boolean {
  return this.length === 0;
};

String.prototype.isNotEmpty = function (this: string): boolean {
  return !this.isEmpty();
};
String.prototype.joinValids = function (
  this: string,
  seperator?: string,
  trim:boolean = false,
  ...others: string[]
): string {
  let result = trim ? this.trim() :  this;
  let sep = seperator ?? "";
  others?.forEach((o) => {
    if (!!o && !!o.trim()) result += sep + (trim ? o.trim() : o);
  });
  return result;
};
String.prototype.includesAny = function (this: string, of: string[], ignoreCase:boolean = false): boolean {
  if(this.length === 0 || arrNoneOrEmpty(of)){return false;}
  let lThis = !!ignoreCase ? this.toLowerCase() : this;
  let lOf = !!ignoreCase ? of.map(o =>o?.toLowerCase()??'') : of;
  return lOf.some((e) => lThis.includes(e));
};
String.prototype.includesAll = function (this: string, of: string[], ignoreCase:boolean = false): boolean {
  if(this.length === 0 || arrNoneOrEmpty(of)){return false;}
  let lThis = !!ignoreCase ? this.toLowerCase() : this;
  let lOf = !!ignoreCase ? of.map(o =>o?.toLowerCase()??'') : of;
  return lOf.every((e) => lThis.includes(e));
};


String.prototype.compareLower = function (this: string, other?: string, trim?: boolean): number {
  if(strNoneOrEmpty(other)){
    return 1;
  }
  let s1 = !!trim ? this.trim().toLocaleLowerCase() : this.toLocaleLowerCase();
  let s2 = !!trim ? other?.trim().toLocaleLowerCase() : other?.toLocaleLowerCase();
  return s1.localeCompare(s2??'');
};
String.prototype.equalsLower = function (this: string, other?: string, trim?: boolean): boolean {
  if(strNoneOrEmpty(other)){
    return false;
  }
  let s1 = !!trim ? this.trim().toLocaleLowerCase() : this.toLocaleLowerCase();
  let s2 = !!trim ? other?.trim().toLocaleLowerCase() : other?.toLocaleLowerCase();
  return s1 === s2;
};
export {};
