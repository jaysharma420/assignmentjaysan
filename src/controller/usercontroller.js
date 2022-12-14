const usermodel = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

let reg = /^[a-zA-Z_ ]{2,50}$/
let pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/

const registration = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data for registration" })
        let { name, password } = data

        if (!name) return res.status(400).send({ status: false, message: "please enter name for registration" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "name can have only alphabets and space" })

        if (!password) return res.status(400).send({ status: false, message: "please enter password for registration" })
        if (!pass.test(password)) return res.status(400).send({ status: false, message: "password must have one capital one small one numericand one special character [#?!@$%^&*-] and length between 8-15" })

        data.password = await bcrypt.hash(password, 10)


        let savedata = await usermodel.create(data)
        return res.status(200).send({ data: savedata })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const userlogin = async function (req, res) {
    try {
        let name = req.body.name
        let password = req.body.password

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "please provide name and password for login" })

        if (!name) return res.status(400).send({ status: false, message: "please enter name" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "name can have only alphabets and space" })

        if (!password) return res.status(400).send({ status: false, message: "please enter password for login" })
        if (!pass.test(password)) return res.status(400).send({ status: false, message: "password must have one capital one small one numericand one special character [#?!@$%^&*-] and length between 8-15" })

        let data = await usermodel.findOne({ name: name })
        if (!data) {
            return res.status(404).send({ status: false, message: "User not found with this name" })
        }
        let checkpassword = await bcrypt.compare(password, data.password);
        if (!checkpassword) return res.status(400).send({ status: false, message: "login failed this password not matches with name" })

        let token = jwt.sign({ id: data._id }, "secretkey")

        return res.status(200).send({ status: true, data: { id: data._id, token: token } })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { registration, userlogin }











// let arr = ["abc","cde","egf","pok","tyr"]

// let result = []

// for(let i=0;i<arr.length;i++){
//     let s = arr[i][0].toUpperCase() + arr[i].slice(1)
//     result.push(s)
// }

// console.log(result);

// let arr = ["abc","cde","egf","pok","tyr"]
// // output = ["Abc","Cde","Egf","Pok","Tyr"]

// for(let i=0;i<arr.length;i++){
//     arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
// }

// console.log(arr);


// let s = [2,5,9,6,8,4]
// s[0] = 96
// console.log(s);

// let s = "qaeiotgdrhbxooo" ; let k=3

// let obj = {'a':1,'b':1,'c':1,'d':1,'f':1}

// let v=0; let ss = 0;let se = k-1

// for(let i=0;i<k;i++){
//     if(obj[s[i]]) v++
// }

// let max=v

// for(let i=k;i<s.length;i++){
//     if(obj[s[i]]) v++
//     if(obj[s[i-k]]) v--
//     if(v>max) { ss=i-k+1;se=i}
// }
// console.log(ss,se);

// let sub=''

// for(let i=ss;i<=se;i++){
//     sub+=s[ss]
// }

// // console.log(sub);


// let arr = [1,1,2,2,3,3,4,4,5,8,8]

// function jay(arr) {
    
//     let start = 0;
//     let end = arr.length-1

//     while(start<=end){
//         let mid = Math.floor(start+end/2)

//         if(arr[mid-1]==arr[mid]){
//             if((mid-start+1)%2==1) {end = mid-2}
//            else start=mid+1
//         }
//        else if(arr[mid+1]==arr[mid]){
//             if((end-mid+1)%2==1) { start = mid+2 }
//            else end=mid-1
//        }
//        else return arr[mid]

//     }
// };

// console.log(jay(arr));


// let a = Number.MAX_VALUE
// console.log(a);