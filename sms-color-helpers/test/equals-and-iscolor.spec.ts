import { RGBA } from "../src"

const rgbStrings = ['rgb(5,15,250)', '(200,-10,300)', '20,20,20', '15,']
const rgbaString = ['rgba(5,15,250,1)', '(200,-10,300,1)', '20,20,20,1', '15,0,0,5', '255,255,255,0', '0,0,0,0.508']
const hex = ['#050ffa', 'c800ff', '141414', '0f0000', '#ffffff00', '00000080']
const rgbJson = [
    { red: 5, green: 15, blue: 250 },
    { red: 200, green: -10, blue: 300 },
    { red: 20, green: 20, blue: 20 },
    { red: 15 },
]
const rgbaJson = [
    { red: 5, green: 15, blue: 250, alpha: 1 },
    { red: 200, green: -10, blue: 300, alpha: 1 },
    { red: 20, green: 20, blue: 20, alpha: 1 },
    { red: 15, alpha: 1 },
    { red: 255, green: 255, blue: 255, alpha: 0 },
    { red: 0, green: 0, blue: 0, alpha: 0.508 },
]
const arrays = [[5, 15, 250], [200, -10, 300], [20, 20, 20], [15], [255, 255, 255, 0], [0, 0, 0, 0.508]]
const rgbaObjects = [new RGBA(5, 15, 250), new RGBA(200, -10, 300), new RGBA(20, 20, 20), new RGBA(15), new RGBA(255, 255, 255, 0), new RGBA(0, 0, 0, 0.508)]
const smallLength = rgbStrings.length
const length = rgbaObjects.length

test("isColor", () => {
    expect(RGBA.isColor("0")).toEqual(true)
    for (let i = 0; i < length; i++) {
        let values: any[] = [rgbaString[i], hex[i], rgbaJson[i], arrays[i], rgbaObjects[i]]
        if (i < smallLength) {
            values.push(rgbStrings[i])
            values.push(rgbJson[i])
        }
        values.forEach(color => {
            expect(RGBA.isColor(color)).toEqual(true)
        });
    }
})

test("colorEquals", () => {
    for (let i = 0; i < length; i++) {
        let values: any[] = [rgbaString[i], hex[i], rgbaJson[i], arrays[i], rgbaObjects[i]]
        
        if (i < smallLength) {
            values.push(rgbStrings[i])
            /* values.push(rgbJson[i]) */
        }
        values.forEach(color1 => {
            values.forEach(color2 => {
                expect(RGBA.colorEquals(color1, color2)).toEqual(true)
            })
        });
    }
})
test("sameColor", () => {

    for (let i = 0; i < length; i++) {
        let to: any[] = [rgbaString[i], hex[i], arrays[i], rgbaObjects[i]]
        let from: any[] = [rgbaJson[i]]
        if (i < smallLength) {
            to.push(rgbStrings[i])
            from.push(rgbJson[i])
        }
        to.forEach(color1 => {
            from.forEach(color2 => {
                expect(color1.toRGBA().sameColor(color2)).toEqual(true)
                expect(RGBA.fromObject(color2).sameColor(color1)).toEqual(true)
                expect(rgbaObjects[i].sameColor(color2)).toEqual(true);
            })
            expect(rgbaObjects[i].sameColor(color1)).toEqual(true);
        });
    }
})
test("isNotColor", () => {
    let notColor:any[] = ['',null,undefined,0,5,'((','GX', ['dsa','fa']]
    notColor.forEach(nc=>expect(RGBA.isColor(nc)).toEqual(false))
})
test("colorNotEquals", () => {
    for (let i = 0; i < length - 1; i++) {
        
        let values1: any[] = [rgbaString[i], hex[i], rgbaJson[i], arrays[i], rgbaObjects[i]]
        let values2: any[] = [rgbaString[i + 1], hex[i + 1], rgbaJson[i + 1], arrays[i + 1], rgbaObjects[i + 1]]
        if (i < smallLength - 1) {
            values1.push(rgbStrings[i])
            values2.push(rgbStrings[i + 1])
            values1.push(rgbJson[i])
            values2.push(rgbJson[i + 1])
        }
        values1.forEach(color1 => {
            values2.forEach(color2 => {
                expect(RGBA.colorEquals(color1, color2)).toEqual(false)
            })
        });
    }
})
test("notSameColor", () => {

    for (let i = 0; i < length - 1; i++) {
        let to1: any[] = [rgbaString[i], hex[i], arrays[i], rgbaObjects[i]]
        let from1: any[] = [rgbaJson[i]]
        let to2: any[] = [rgbaString[i + 1], hex[i + 1], arrays[i + 1], rgbaObjects[i + 1]]
        let from2: any[] = [rgbaJson[i + 1]]
        if (i < smallLength - 1) {
            to1.push(rgbStrings[i])
            from1.push(rgbJson[i])
            to2.push(rgbStrings[i + 1])
            from2.push(rgbJson[i + 1])
        }
        to1.forEach(color1 => {
            from2.forEach(color2 => {
                expect(color1.toRGBA().sameColor(color2)).toEqual(false)
                expect(RGBA.fromObject(color2).sameColor(color1)).toEqual(false)
                expect(rgbaObjects[i].sameColor(color2)).toEqual(false);
            })
            expect(rgbaObjects[i + 1].sameColor(color1)).toEqual(false);
        });
        to2.forEach(color1 => {
            from1.forEach(color2 => {
                expect(color1.toRGBA().sameColor(color2)).toEqual(false)
                expect(RGBA.fromObject(color2).sameColor(color1)).toEqual(false)
                expect(rgbaObjects[i + 1].sameColor(color2)).toEqual(false);
            })
            
                expect(rgbaObjects[i].sameColor(color1)).toEqual(false);
            
        });
    }
})