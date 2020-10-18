import '../src/array';
import { isNone } from '../src/misc';


let numArray:number[] = [1,2,3,4,5,6];
let stringArray:string[] = ['1','2','3','4','5','6'];
let emptyArray:any[] = [];

test("remove",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.remove(5)).toBe(5);
    expect(s.remove('5')).toBe('5');
    expect(n.length).toEqual(5);
    expect(s.length).toEqual(5);
    expect(emptyArray.remove('')).toBe(undefined);
    expect(s.remove('10')).toBe(undefined);
    expect(n.remove(10)).toBe(undefined);
})

test("removeAt",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.removeAt(4)).toBe(5);
    expect(s.removeAt(4)).toBe('5');
    expect(n.length).toEqual(5);
    expect(s.length).toEqual(5);
    expect(emptyArray.remove('')).toBe(undefined);
    expect(s.removeAt(10)).toBe(undefined);
    expect(n.removeAt(10)).toBe(undefined);
})
test("first",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.first()).toBe(1);
    expect(s.first()).toBe('1');
    expect(emptyArray.first()).toBe(undefined);
})
test("last",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.last()).toBe(6);
    expect(s.last()).toBe('6');
    expect(emptyArray.last()).toBe(undefined);
})
test("addAll",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    n.addAll(7,8,9);
    s.addAll('7','8','9');
    expect(n.length).toBe(9);
    expect(s.length).toBe(9);
    expect(n.includes(8)).toEqual(true);
    expect(s.includes('8')).toEqual(true);
})
test("isEmpty",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.isEmpty()).toBe(false);
    expect(s.isEmpty()).toBe(false);
    expect(emptyArray.isEmpty()).toBe(true);
    for (let i = 0; i < 6;i++){
        n.removeAt(0);
        s.removeAt(0);
    }
    expect(n.isEmpty()).toBe(true);
    expect(s.isEmpty()).toBe(true);
})
test("isNotEmpty",()=>{
    let n = [...numArray];
    let s = [...stringArray];
    expect(n.isNotEmpty()).toBe(true);
    expect(s.isNotEmpty()).toBe(true);
    expect(emptyArray.isNotEmpty()).toBe(false);
    for (let i = 0; i < 6;i++){
        n.removeAt(0);
        s.removeAt(0);
    }
    expect(n.isNotEmpty()).toBe(false);
    expect(s.isNotEmpty()).toBe(false);
})
test("firstWhere",()=>{
    expect(numArray.firstWhere(n=>n>3)).toEqual(4);
    expect(stringArray.firstWhere(n=>parseInt(n)>3)).toEqual('4');
    expect(emptyArray.firstWhere(n=>parseInt(n)>3)).toEqual(undefined);
})
test("lastWhere",()=>{
    expect(numArray.lastWhere(n=>n>3)).toEqual(6);
    expect(stringArray.lastWhere(n=>parseInt(n)>3)).toEqual('6');
    expect(emptyArray.lastWhere(n=>parseInt(n)>3)).toEqual(undefined);
})
test("includesAny",()=>{
    expect(numArray.includesAny([1,10,500])).toEqual(true);
    expect(numArray.includesAny([10,500])).toEqual(false);
    expect(stringArray.includesAny(['1','10','500'])).toEqual(true);
    expect(stringArray.includesAny(['10','500'])).toEqual(false);
    expect(emptyArray.includesAny(['10','500'])).toEqual(false);
})
test("includesAll",()=>{
    expect(numArray.includesAll([1,10,500])).toEqual(false);
    expect(numArray.includesAll([1,2,4])).toEqual(true);
    expect(stringArray.includesAll(['1','10','500'])).toEqual(false);
    expect(stringArray.includesAll(['1','2','5'])).toEqual(true);
    expect(emptyArray.includesAll(['10','500'])).toEqual(false);
})
test("filterNotNone",()=>{
    let n:any[] = [undefined,...numArray,null,null,0];
    let s:any[] = [undefined,...stringArray,null,null,''];
    expect(n.filterNotNone().length).toEqual(7);
    expect(n.filterNotNone().some(n=>isNone(n))).toEqual(false);
    expect(s.filterNotNone().length).toEqual(7);
    expect(s.filterNotNone().some(s=>isNone(s))).toEqual(false);
})
test("at",()=>{
    expect(numArray.at(3)).toEqual(4);
    expect(stringArray.at(3)).toEqual('4');
    expect(numArray.at(-1)).toEqual(undefined);
    expect(stringArray.at(10)).toEqual(undefined);
    expect(emptyArray.at(0)).toEqual(undefined);
})
test("putFirstThenSort",()=>{
    let n = [5,3,2,6,1,4];
    let s:string[] = ['5','3','2','6','1','4'];
    let nsorted = n.putFirstThenSort((e1,e2)=>e1 - e2,5,6);
    let ssorted = s.putFirstThenSort((e1,e2)=>parseInt(e1) - parseInt(e2),'5','6');
    expect(nsorted).toEqual([5,6,1,2,3,4]);
    expect(ssorted).toEqual(['5','6','1','2','3','4']);
})
