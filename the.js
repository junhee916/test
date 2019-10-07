// 1) 원시타입 primitive types

// var a = "dddddd"
// var b = 123
// var c = true
// var d = undefined
// var c = null

// 2) value types vs reference type

// var a = 3

// function test (v=3) {
//     v = 6
//     console.log(v)
// }

// test(a)
// console.log(a)

// var ages = [3, 4, 7, 2, 5]

// function tests(a){
//     a[0] = 99
//     console.log(a)
// }

// tests(ages)
// console.log(ages)

// 3) implicit암시적, explicit명시적 //형변환
// 엔진이바꾸느냐 vs 내가바꾸느냐

console.log(Number("2"))

// 4) == vs ===   공통점 : 비교한다    차이점 : == 두개는=>암시적형변환을 해줌   === 세개는 암시적형변환을 안해줌(있는그대로)

console.log( 2 === Number("2") )