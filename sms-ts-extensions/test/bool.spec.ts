import '../src/bool';


test("true_falseThenDo",()=>{
    let a = 'a';
    expect(a).toEqual('a');
    true.trueThenDo(()=>{a = 'b';},()=>{a = 'c';})
    expect(a).toEqual('b');
    false.trueThenDo(()=>{a = 'b';},()=>{a = 'c';})
    expect(a).toEqual('c');
    false.falseThenDo(()=>{a = 'd';},()=>{a = 'e';})
    expect(a).toEqual('d');
    true.falseThenDo(()=>{a = 'd';},()=>{a = 'e';})
    expect(a).toEqual('e');
})
test("true_falseThenReturn",()=>{
    expect(true.trueThenReturn('a','b')).toEqual('a');
    expect(false.trueThenReturn('a','b')).toEqual('b');
    expect(true.falseThenReturn('a','b')).toEqual('b');
    expect(false.falseThenReturn('a','b')).toEqual('a');
})