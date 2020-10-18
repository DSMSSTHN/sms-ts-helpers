# sms-ts-helpers
 Convenient Type Script Node projects to help with some functionalities

#

 # [sms-color-helpers](./sms-color-helpers)
This Project is a TS hex to rgb and rgba converter and vice versa.

## example:
```typescript
let hexString = "#7d7a45"
console.log(hexString.hexToRGBAString());//will print rgba(125,122,69,1)
console.log(hexString.hexToRGBString());//will print rgb(125,122,69)

let jsonWhite = {red:255,green:255,blue:255,alpha:1};
let jsonBlack = {red:0,green:0,blue:0,alpha:1};

console.log(colorIsDark(jsonWhite));//will print false
console.log(colorIsDark(jsonBlack));//will print true

console.log(colorEquals({red:255,green:244,blue:222,alpha:0.3},"fff4de4d");//will return true
```

#

# [sms-ts-extensions](./sms-ts-extensions)

 This Project has some extension Methods for some premitive typescript interfaces (String, Array, Bool, Number) and some global function to help.

## example:
```typescript
console.log("".isEmpty());//will print true
console.log("abc".isEmpty());//will print false

console.log("abc".includesAny(["a","z","X"[));//will print true
console.log("abc".includesAll(["a","z","X"]));//will print false

console.log("abc ".joinValids(",",true," def"," ","ghi", ""));//will print "abc,def,ghi"


let arr = [5,3,6,2,1,4];
arr.remove(2);
console.log(arr);//will print [5,3,6,1,4]
arr.removeAt(2);
console.log(arr);//will print [5,3,1,4]

arr.addAll(2,6,7,8);
console.log(arr);//will print [5,3,1,4,2,6,7,8]


let arr1 = (5).generateArray((index)=>"val" + index);
let arr2 = (5).generateArray((index)=>5 * index);
console.log(arr2);//will print ["val0","val1","val2","val3","val4"]
console.log(arr2);//will print [0,5,10,15,20]

console.log(arrNoneOrEmpty([]));//will print true
console.log(arrNoneOrEmpty(undefined));//will print true
```