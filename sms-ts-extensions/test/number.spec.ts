import '../src/number';



test("generateArray",()=>{
    let prev = []
    for (let i = 0; i < 10;i++){
        let arr = (i).generateArray((i)=>i);
        if(i != 0){
            prev.push(i - 1);
        }
        expect(arr.length).toEqual(i);
        expect(arr).toEqual(prev);
    }
})