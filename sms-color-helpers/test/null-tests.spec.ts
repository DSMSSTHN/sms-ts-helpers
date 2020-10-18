import { rgbaToHex, hexFromRGBAValues, RGBA, hexToRGBA } from "../src/index"





test("hexFromRGBAValues",()=>{
    let u = undefined
    let undefinedHex = hexFromRGBAValues(u,u,u,u)
    let nanHex = hexFromRGBAValues(nNumber(),nNumber(),nNumber(),nNumber())

    expect(undefinedHex).toEqual("#000000")
    expect(nanHex).toEqual("#000000")
    expect(undefinedHex.toRGBA()).toEqual(new RGBA(0,0,0,1))
    expect(undefinedHex.hexToRGBAString()).toEqual("rgba(0,0,0,1)")
    expect(undefinedHex.hexToRGBString()).toEqual("rgb(0,0,0)")

    expect(hexFromRGBAValues(u,u,u,0)).toEqual("#00000000")
})
test("rgbaToHex",()=>{
    let u = undefined
    let undefinedHex = rgbaToHex(undefined)
    let nullHex = rgbaToHex(nString())

    expect(undefinedHex).toEqual("#000000")
    expect(nullHex).toEqual("#000000")
    expect(undefinedHex.toRGBA()).toEqual(new RGBA(0,0,0,1))
    expect(undefinedHex.hexToRGBAString()).toEqual("rgba(0,0,0,1)")
    expect(undefinedHex.hexToRGBString()).toEqual("rgb(0,0,0)")

    expect(hexFromRGBAValues(u,u,u,0)).toEqual("#00000000")
})
test("hexToRGBA",()=>{
    expect(hexToRGBA()).toEqual(new RGBA())
    expect(hexToRGBA(undefined)).toEqual(new RGBA())
    expect(hexToRGBA(nString())).toEqual(new RGBA())
})
test("RGBAObjectToHex",()=>{
    // expect(new RGBA().hexColor).toEqual("#000000")
    // expect(new RGBA(undefined,undefined,undefined,undefined).hexColor).toEqual("#000000")
    expect(new RGBA(nNumber(),nNumber(),nNumber(),nNumber()).hexColor).toEqual("#000000")
})


function nString():string | null{return null}
function nNumber():number{return NaN}