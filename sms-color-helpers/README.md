# sms-color-helpers

This Project is a TS hex to rgb and rgba converter and vice versa.

The Project contains extension Method on the Array and String interfaces, global Functions and a RGBA class that can handle converting a string, a number array, a RGBA object or a Json or JS object that has color Properties (red,green,blue,alpha) to the others.

```typescript
let hexString = "#7d7a45"
console.log(hexString.hexToRGBAString());//will print rgba(125,122,69,1)
console.log(hexString.hexToRGBString());//will print rgb(125,122,69)

let rgbaString = "rgba(41,104,120,1)";
let rgbString = "rgb(41,104,120)";
let array1 = [41,104,120];
let array2 = [41,104,120,1];
let rgba1 = new RGBA(41,104,120);
let rgba2 = new RGBA(41,104,120,1);
let rgba3 = new RGBA(41,104,120,0);

console.log(rgbaString.rgbaToHex());//will print #296878
console.log(rgbString.rgbaToHex());//will print #296878
console.log(array1.toHexColor());//will print #296878
console.log(array2.toHexColor());//will print #296878
console.log(rgba1.hexColor);//will print #296878
console.log(rgba2.hexColor);//will print #296878
console.log(rgba3.hexColor);//will print #29687800


console.log(rgba1.hexColorWithAlpha);//will print #296878ff
console.log(rgba1.hexColorWithoutAlpha);//will print #296878

console.log(rgba3.hexColorWithAlpha);//will print #29687800
console.log(rgba3.hexColorWithoutAlpha);//will print #296878


console.log(rgba1.rgbNumberArray);//will print [41,104,120]
console.log(rgba1.rgbaNumberArray);//will print [41,104,120,1]

console.log(rgba1.toString() === rgbaString);//will print true
console.log(rgba1.toRGBString() === rgbString);//will print true
console.log(array1.toRGBAString() === rgbaString);//will print true
console.log(array1.toRGBString() === rgbString);//will print true
```
#

To instantiate a RGBA Class Object:

```typescript
//THESE WILL ALL GIVE THE SAME OBJECT
let rgba1 = new RGBA();
let rgba2 = new RGBA(0);
let rgba3 = new RGBA(0,0);
let rgba4 = new RGBA(0,0,0);
let rgba5 = new RGBA(0,0,0,1);

let rgbaFromHex1 = RGBA.fromString("#");
let rgbaFromHex2 = RGBA.fromString("#0");
let rgbaFromHex3 = RGBA.fromString("#000");
let rgbaFromHex4 = RGBA.fromString("#000000");
let rgbaFromHex5 = RGBA.fromString("#00000011");

let rgbaFromRgbaString1 = RGBA.fromString("rgba(0)");
let rgbaFromRgbaString2 = RGBA.fromString("(0,)");
let rgbaFromRgbaString3 = RGBA.fromString("(0,0,0)");
let rgbaFromRgbaString4 = RGBA.fromString("0,0,0,1");
let rgbaFromRgbaString5 = RGBA.fromString("rgb(0,0,0)");

let rgbaFromColorObject1 = RGBA.fromObject({red:0});
let rgbaFromColorObject2 = RGBA.fromObject({alpha:1});
let rgbaFromColorObject3 = RGBA.fromObject({red:0,green:0,blue:0,alpha:1});

let hexStringToRGBA1 = "#".toRGBA();
let hexStringToRGBA2 = "#0".toRGBA();
let hexStringToRGBA3 = "#000".toRGBA();
let hexStringToRGBA4 = "#000000".toRGBA();
let hexStringToRGBA5 = "#00000011".toRGBA();

let rgbaStringToRGBA1 = "rgba(0)".toRGBA();
let rgbaStringToRGBA2 = "(0,)".toRGBA();
let rgbaStringToRGBA3 = "(0,0,0)".toRGBA();
let rgbaStringToRGBA4 = "0,0,0,1".toRGBA();
let rgbaStringToRGBA5 = "rgb(0,0,0)".toRGBA();

let arrayToRGBA1 = [0].toRGBA();
let arrayToRGBA2 = [0,0].toRGBA();
let arrayToRGBA3 = [0,0,0].toRGBA();
let arrayToRGBA4 = [0,0,0,1].toRGBA();
```
#


There is also a RGBA class Method and a global Function to check if a color (hexString, rgbString, rgbaString, array, json, RGBA class object) is dark based on its Lumin value, if it's less than 60 is considered dark

```typescript
let stringWhite = "#fff"; //can also be written as "fff" "#FFF" "FFF" "ffff" "fffff" "ffffff" rgb(255,255,255) rgb(255,255,255,1) (255,255,255) ...etc
let stringBlack = "#0"; //can also be written as "0" "0,0,0" [0,0,0] (0,0,0) "#000000" "#00000011"
let arrayWhite = [255,255,255];//can also be written as [255,255,255,1]
let arrayBlack = [0,0,0];//can also be written as [0,0,0,1] or [0,0,0] or [0] !!BUT NOT AS []!!
let jsonWhite = {red:255,green:255,blue:255,alpha:1};// also the alpha value can be left out as in it will default to 1
let jsonBlack = {red:0,green:0,blue:0,alpha:1};// also any of the values can be left out as long as at least on of them is present the colors will default to 0 and alpha to 1
let rgbaWhite = new RGBA(255,255,255);//can also be written as new RGBA(255,255,255,1) or stringWhite.toRGBA() or  arrayWhite.toRGBA() or RGBA.fromObject(jsonWhite)
let rgbaBlack = new RGBA(0,0,0);//can also be written as new RGBA() or stringBlack.toRGBA() or  arrayBlack.toRGBA() or RGBA.fromObject(jsonBlack)

console.log(stringWhite.isDarkColor());//will print false
console.log(stringBlack.isDarkColor());//will print true

console.log(arrayWhite.isDarkColor());//will print false
console.log(arrayBlack.isDarkColor());//will print true

console.log(rgbaWhite.isDark);//will print false
console.log(rgbaBlack.isDark);//will print true

console.log(colorIsDark(jsonWhite));//will print false
console.log(colorIsDark(jsonBlack));//will print true
```
#


The RGBA Class and all the global function also have an additional variable called cycleNumbers default set to false which changes whether to clamp or cycle the color values when a value outside the allowed color values[0-255] and the alpha values[0-1] are given.

```typescript
let rgb1 = new RGBA(255,244,222,0.3);//default false will clamp the numbers
let rgb3 = new RGBA(500000,244,222,0.3,false);//explecity set to false will clamp the numbers
let rgb2 = new RGBA(-1,500,-34,5.3,true);//set to true will cycle the number with modulo

console.log(rgb1.toString());//will print "rgba(255,244,222,0.3)"
console.log(rgb2.toString());//will print "rgba(255,244,222,0.3)"
console.log(rgb3.toString());//will print "rgba(255,244,222,0.3)"
```
#
In the previous Example because of the additional Property rgb1 === rgb3 will return false therefor to compare colors either they should be converted to string or preferably they can be compared using the "sameColor" method of an RGBA object or the static "colorEquals" Method. where both of them take any other object as a parameter(RGBA class instance, hexString, rgbaString, rgbString, array, json color). 

```typescript
let rgb1 = new RGBA(255,244,222,0.3);//default false will clamp the numbers
let rgb2 = new RGBA(500000,244,222,0.3,false);//explecity set to false will clamp the numbers
let rgb3 = new RGBA(-1,500,-34,5.3,true);//set to true will cycle the number with modulo


console.log(rgb1 === rgb2);//will print true
console.log(rgb1 === rgb3);//will print false
console.log(rgb2 === rgb3);//will print false

console.log(rgb1.toString() === rgb3.toString())//will print true

console.log(rgb2.sameColor(rgb3));//will print true

console.log(colorEquals(rgb1,rgb3));//will print true

console.log(rgb3.sameColor("255,244,222,0.3");//will return true
console.log(rgb3.sameColor("#fff4de4d");//will return true
console.log(rgb3.sameColor("fff4de4d");//will return true
console.log(rgb3.sameColor([255,244,222,0.3]);//will return true
console.log(rgb3.sameColor({red:255,green:244,blue:222,alpha:0.3});//will return true

console.log(colorEquals({red:255,green:244,blue:222,alpha:0.3},"fff4de4d");//will return true

/*BUT THIS WILL BE FALSE BECAUSE OF THE ALPHA*/
console.log(rgb1.sameColor(rgb1.toRGBString()))
```


# License:

MIT License

the license is in the root directory of the project