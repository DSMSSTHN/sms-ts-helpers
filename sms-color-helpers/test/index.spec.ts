import {  hexToRGBA, rbgaToHex, RGBA } from "../src";
import '../src/index'


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
[66,132,140,0.298].toRGBA(),
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
    expect(rgba[i].hexColor).toEqual(hex[i])
  }
  expect(rgba[8].hexColor).toEqual('#ffffff')
  expect(rgba[9].hexColor).toEqual('#000000')
  expect(rgba[10].hexColor).toEqual('#000000')

})