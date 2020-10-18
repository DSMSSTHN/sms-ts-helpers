import '../src/strings';



test("isEmpty",()=>{
    expect(''.isEmpty()).toBe(true);
    expect('asd'.isEmpty()).toBe(false);
})

test("isNotEmpty",()=>{
    expect(''.isNotEmpty()).toBe(false);
    expect('asd'.isNotEmpty()).toBe(true);
})
test("joinValid",()=>{
    expect(' '.joinValids(',',true,'a','  ', 'b ',' c','','d')).toEqual(',a,b,c,d');
    expect(' '.joinValids(',',false,'a','  ', 'b ',' c','','d')).toEqual(' ,a,b , c,d');
})
test("includesAny",()=>{
    expect('abcdef'.includesAny(['a','z','1'])).toBe(true);
    expect('abcdef'.includesAny(['z','1'])).toBe(false);
})
test("includesAll",()=>{
    expect('abcdef'.includesAll(['a','z','1'])).toBe(false);
    expect('abcdef'.includesAll(['z','1'])).toBe(false);
    expect('abcdef'.includesAll(['a','b','c','d'])).toBe(true);
})

test("CompareLower",()=>{
    expect("abcd".compareLower("ab")).toEqual("abcd".localeCompare("ab"));
    expect("ABCD".compareLower("ab")).toEqual("abcd".localeCompare("ab"));
    // expect("abcd".compareLower("ab")).not.toEqual("ABcD".localeCompare("AB"));//TODO: CHECK IF THIS IS NEEDED
})
test("equalsLower",()=>{
    expect("abcd".equalsLower("abcd")).toEqual(true);
    expect("ABCD".equalsLower("abcd")).toEqual(true);
    expect("ABCD ".equalsLower("abcd")).toEqual(false);
    expect("ABCD ".equalsLower("abcd",true)).toEqual(true);
    expect("abcd".equalsLower("ABCD")).toEqual(true);
    expect("ABCD".equalsLower("ABCD")).toEqual(true);
})