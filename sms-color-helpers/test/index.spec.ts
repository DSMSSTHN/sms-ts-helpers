import { colorIsDark, hexToRGBA, hexFromRGBAValues, RGBA } from "../src/index";
import '../src/index';
import '../src/extensions'


const hex = ["#7d7a45",
  "#296878",
  "#223438",
  "#6d2475",
  "#8b6b8f",
  "#527ac4",
  "#3deb40",
  "#42848C4C",
  "#fff",
  "#0",
  "#",
]
const rgba = [[125, 122, 69].toRGBA(),
[41, 104, 120].toRGBA(),
[34, 52, 56].toRGBA(),
[109, 36, 117].toRGBA(),
[139, 107, 143].toRGBA(),
[82, 122, 196].toRGBA(),
[61, 235, 64].toRGBA(),
[66, 132, 140, 0.298].toRGBA(),
[255, 255, 255].toRGBA(),
[0].toRGBA(),
[0].toRGBA(),
]

test("hexToRGBA", () => {

  for (let i = 0; i < 10; i++) {
    expect(hexToRGBA(hex[i])).toEqual(rgba[i])
  }
})

test("rgbaToHex", () => {
  for (let i = 0; i < 7; i++) {
    expect(rgba[i].hexColor).toEqual(hex[i].toLowerCase())
  }
  expect(rgba[8].hexColor).toEqual('#ffffff')
  expect(rgba[9].hexColor).toEqual('#000000')
  expect(rgba[10].hexColor).toEqual('#000000')

})

test("colorIsDark", () => {
  let light = ['#ffffff','#fffffff','#fff','#aafbaf','#fba', 'rgba(255,255,255,1)', 'rgb(200,190,150)','200,255,200']
  let dark = ['#','','#0','#000','#000000','#000000','#12314210','rgba(0,0,0,0)',',','rgb(10,15,22)','15,50,0,1']
  for (let i = 0; i < light.length ;i++){
    
    expect(colorIsDark(light[i])).toBe(false)
  }
  for (let i = 0; i < dark.length ;i++){
    expect(colorIsDark(dark[i])).toBe(true)
  }
})

test("clampAndCycle",()=>{
  console.log("started");
  let rgb1 = new RGBA(255,244,222,0.3);
  let rgb2 = new RGBA(-1,500,-34,5.3,true);
  let rgb3 = new RGBA(500000,244,222,0.3,false);
  expect(rgb1.sameColor(rgb2)).toEqual(true)
  expect(rgb2.sameColor(rgb3)).toEqual(true)
})