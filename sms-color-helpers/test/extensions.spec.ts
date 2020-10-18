import { RGBA } from '../src';
import '../src/extensions'


const hex = ["#7d7a45",
    "#296878",
    "#223438",
    "#6d2475",
    "#8b6b8f",
    "#527ac4",
    "#3deb40",
    "#42848C4C",
    "#ffffff",
    "#000000",
    "#000000",
]
const arrays = [[125, 122, 69],
[41, 104, 120],
[34, 52, 56],
[109, 36, 117],
[139, 107, 143],
[82, 122, 196],
[61, 235, 64],
[66, 132, 140, 0.298],
[255, 255, 255],
[0],
[0],
];
const rgbaObjects = [new RGBA(125, 122, 69),
new RGBA(41, 104, 120),
new RGBA(34, 52, 56),
new RGBA(109, 36, 117),
new RGBA(139, 107, 143),
new RGBA(82, 122, 196),
new RGBA(61, 235, 64),
new RGBA(66, 132, 140, 0.298),
new RGBA(255, 255, 255),
new RGBA(0),
new RGBA(0),
];
const rgbastring = ['rgba(125,122,69,1)',
    'rgba(41,104,120,1)',
    'rgba(34,52,56,1)',
    'rgba(109,36,117,1)',
    'rgba(139,107,143,1)',
    'rgba(82,122,196,1)',
    'rgba(61,235,64,1)',
    'rgba(66,132,140,0.298)',
    'rgba(255,255,255,1)',
    'rgba(0,0,0,1)',
    'rgba(0,0,0,1)',
];
const rgbstring = ['rgb(125,122,69)',
    'rgb(41,104,120)',
    'rgb(34,52,56)',
    'rgb(109,36,117)',
    'rgb(139,107,143)',
    'rgb(82,122,196)',
    'rgb(61,235,64)',
    'rgb(66,132,140)',
    'rgb(255,255,255)',
    'rgb(0,0,0)',
    'rgb(0,0,0)',
];
test('arrayToRGBA', () => {
    for (let i = 0; i < arrays.length;i++){
    expect(arrays[i].toRGBA()).toEqual(rgbaObjects[i])
    }
})
test('arrayToRGBAString', () => {
    for (let i = 0; i < arrays.length;i++){
    expect(arrays[i].toRGBAString()).toEqual(rgbastring[i])
    }
})
test('arrayToRGBString', () => {
    for (let i = 0; i < arrays.length;i++){
    expect(arrays[i].toRGBString()).toEqual(rgbstring[i])
    }
})
test('arrayToHex', () => {
    for (let i = 0; i < arrays.length;i++){
    expect(arrays[i].toHexColor().toLowerCase()).toEqual(hex[i].toLowerCase())
    }
})
test('arrayIsDark',()=>{
    let light = [[255,255,255,1],[255,255,255,0],[200,190,50,0.524],[180,150,200],[255,200]]
    let dark = [[],[0],[0,0],[0,0,0],[0,0,0,0],[0,0,0,1],[100],[150,10]]
    for (let i = 0; i < light.length ;i++){
      expect(light[i].isDarkColor()).toBe(false)
    }
    for (let i = 0; i < dark.length ;i++){
      expect(dark[i].isDarkColor()).toBe(true)
    }
})

test('stringRGBAToHex',()=>{
    for (let i = 0; i < rgbastring.length;i++){
        expect(rgbastring[i].rgbaToHex()).toEqual(hex[i].toLowerCase())
    }
})
test('stringRGBToHex',()=>{
    for (let i = 0; i < rgbstring.length;i++){
        expect(rgbstring[i].rgbaToHex()).toEqual(hex[i].toLowerCase().substr(0, Math.min(7,hex[i].length)))
    }
})
test('stringHexToRGBA',()=>{
    for (let i = 0; i < hex.length;i++){
        expect(hex[i].hexToRGBAString()).toEqual(rgbastring[i])
    }
})
test('stringHexToRGB',()=>{
    for (let i = 0; i < hex.length;i++){
        expect(hex[i].hexToRGBString()).toEqual(rgbstring[i])
    }
})
test('stringIsDark',()=>{
    let light = ['#ffffff','#fffffff','#fff','#aafbaf','#fba', 'rgba(255,255,255,1)', 'rgb(200,190,150)','200,255,200']
  let dark = ['#','','#0','#000','#000000','#000000','#12314210','rgba(0,0,0,0)',',','rgb(10,15,22)','15,50,0,1']
  for (let i = 0; i < light.length ;i++){
    
    expect(light[i].isDarkColor()).toBe(false)
  }
  for (let i = 0; i < dark.length ;i++){
    expect(dark[i].isDarkColor()).toBe(true)
  }
})