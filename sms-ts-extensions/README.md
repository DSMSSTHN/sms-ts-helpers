# sms-extensions
 This Project has some extension Methods for some premitive typescript interfaces (String, Array, Bool, Number) and some global function to help.


 #
 
 # String Extension Methods:

 ```typescript
console.log("".isEmpty());//will print true
console.log("".isNotEmpty());//will print false
console.log("abc".isEmpty());//will print false
console.log("abc".isNotEmpty());//will print true

console.log("abc ".joinValids(",",true," def"," ","ghi", ""));//will print "abc,def,ghi"

console.log("abc".includesAny(["a","z","X"[));//will print true
console.log("abc".includesAll(["a","z","X"]));//will print false

console.log("abc".equalsLower("ABC"));//will print true
 ```

 #

 # Array Extension Methods:

  ```typescript
let arr = [5,3,6,2,1,4];
arr.remove(2);
console.log(arr);//will print [5,3,6,1,4]
arr.removeAt(2);
console.log(arr);//will print [5,3,1,4]

arr.addAll(2,6,7,8);
console.log(arr);//will print [5,3,1,4,2,6,7,8]

console.log(arr.first());//will print 5
console.log(arr.last());//will print 8
console.log(arr.firstWhere(element=>element  < 5));//will print 3
console.log(arr.lastWhere(element=>element  < 5));//will print 2

console.log(arr.isEmpty());//will print false
console.log([].isEmpty());//will print true
console.log(arr.isNotEmpty());//will print true
console.log([].isNotEmpty());//will print false

console.log([1,2,3,4,5,6].includesAny([1,2,5,8[));//will print true
console.log([1,2,3,4,5,6].includesAll([1,2,5,8]));//will print false

let b = arr.putFirstThenSort((e1,e2)=>e1 - e2, 2,6);
console.log(b);//will print [2,6,1,3,4,5,7,8]
```

#

# Boolean Extension Methods:

```typescript
true.trueThenDo(()=>console.log("was true"),()=>console.log("was false"));//will print was true
false.trueThenDo(()=>console.log("was true"),()=>console.log("was false"));//will print was false

true.falseThenDo(()=>console.log("was false"),()=>console.log("was true"));//will print was true
false.falseThenDo(()=>console.log("was false"),()=>console.log("was true"));//will print was false


console.log(true.trueThenReturn("was true","was false"));//will print was true
console.log(false.trueThenReturn("was true","was false"));//will print was false

console.log(true.falseThenReturn("was false","was true"));//will print was true
console.log(false.falseThenReturn("was false","was true"));//will print was false
```

#

# Number Extension Methods:

```typescript
let arr1 = (5).generateArray((index)=>"val" + index);
let arr2 = (5).generateArray((index)=>5 * index);
console.log(arr2);//will print ["val0","val1","val2","val3","val4"]
console.log(arr2);//will print [0,5,10,15,20]
```

#

# Global Functions:

```typescript
console.log(isNone(undefined));//will print true
console.log(isNone(null));//will print true
console.log(isNone(""));//will print false
console.log(isNone(0));//will print false

console.log(isNotNone(undefined));//will print false
console.log(isNotNone(null));//will print false
console.log(isNotNone(""));//will print true
console.log(isNotNone(0));//will print true

console.log(isNotNoneAnd(undefined,(value)=>true));//will print false
console.log(isNotNoneAnd("",(value)=>value.isEmpty()));//will print true
console.log(isNotNoneAnd("",(value)=>value.length > 0));//will print false

console.log(arrNoneOrEmpty([]));//will print true
console.log(arrNoneOrEmpty(undefined));//will print true

let arr = arrNoneOrEmptyThenDo([],
            ()=>{console.log("array was empty");return [1,2,3,4]},
            (array)=>{console.log("array was not empty"); return array}
            );//will print array was empty and assign [1,2,3,4] to arr

let arr2 = arrNoneOrEmptyThenDo(arr,
            ()=>{console.log("array was empty");return [1,2,3,4]},
            (array)=>{console.log("array was not empty"); return array}
            );//will print array was not empty and assign arr to arr2

console.log([].arrNoneOrEmptyThenReturn("was empty","was not empty"));//will print was empty
console.log([1,2,3].arrNoneOrEmptyThenReturn("was empty","was not empty"));//will print was not empty

console.log(strNoneOrEmpty(""));//will print true
console.log(strNoneOrEmpty(undefined));//will print true
```

#

# LICENSE:

MIT LICENSE

[link to license](../LICENSE)