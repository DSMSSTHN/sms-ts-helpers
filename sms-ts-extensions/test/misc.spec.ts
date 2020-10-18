import { arrNoneOrEmpty, arrNoneOrEmptyThenReturn, arrNoneOrEmptyThenDo, isNone, isNotNone, isNotNoneAnd, takeAndDo, strNoneOrEmpty } from "../src/misc"



test("isNotNone", () => {
    expect(isNotNone(null)).toBe(false);
    expect(isNotNone(undefined)).toBe(false);
    expect(isNotNone(5)).toBe(true);
    expect(isNotNone(0)).toBe(true);
    expect(isNotNone("asd")).toBe(true);
    expect(isNotNone("")).toBe(true);
    expect(isNotNone({})).toBe(true);
})
test("isNone", () => {
    expect(isNone(null)).toBe(true);
    expect(isNone(undefined)).toBe(true);
    expect(isNone(5)).toBe(false);
    expect(isNone(0)).toBe(false);
    expect(isNone("asd")).toBe(false);
    expect(isNone("")).toBe(false);
    expect(isNone({})).toBe(false);
})
test("isNotNoneAnd", () => {
    expect(isNotNoneAnd(null, () => true)).toBe(false);
    expect(isNotNoneAnd(undefined, () => true)).toBe(false);
    expect(isNotNoneAnd(5, (n) => n !== 5)).toBe(false);
    expect(isNotNoneAnd(0, (n) => n < 5)).toBe(true);
    expect(isNotNoneAnd("asd",(s) => s.length === 0)).toBe(false);
    expect(isNotNoneAnd("",(s) => s.length === 0)).toBe(true);
})
test("takeAndDo",()=>{
    let a = {a:'a'};
    expect(a.a).toEqual('a');
    takeAndDo(a,(b)=>{b.a = 'b';})
    expect(a.a).toEqual('b');
    takeAndDo(a,(b)=>{b.a = 'c';})
    expect(a.a).toEqual('c');
    takeAndDo(a,(b)=>{b.a = 'd';})
    expect(a.a).toEqual('d');
    takeAndDo(a,(b)=>{b.a = 'e';})
    expect(a.a).toEqual('e');
})

test("arrNoneOrEmpty",()=>{
    expect(arrNoneOrEmpty([])).toBe(true);
    expect(arrNoneOrEmpty([1,2,3])).toBe(false);
    expect(arrNoneOrEmptyThenDo([])).toBe(null);
    expect(arrNoneOrEmptyThenDo([],()=>50,(arr)=>arr.length)).toBe(50);
    expect(arrNoneOrEmptyThenDo([1,2,3],()=>50,(arr)=>arr.length)).toBe(3);
    expect(arrNoneOrEmptyThenReturn([],50,3)).toBe(50);
    expect(arrNoneOrEmptyThenReturn([1,2,3],50,3)).toBe(3);
})

test("strNoneOrEmpty",()=>{
    expect(strNoneOrEmpty(null)).toBe(true);
    expect(strNoneOrEmpty(undefined)).toBe(true);
    expect(strNoneOrEmpty('')).toBe(true);
    expect(strNoneOrEmpty('as')).toBe(false);
})