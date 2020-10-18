import '../src/string-array';


test("joinValid",()=>{
    let arr = ['a','  ', 'b ',' c','','d'];
    expect(arr.joinValid(',',true)).toEqual('a,b,c,d');
    expect(arr.joinValid(',',false)).toEqual('a,b , c,d');
})