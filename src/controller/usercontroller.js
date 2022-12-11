const usermodel = require("../model/usermodel")
const jwt = require("jsonwebtoken")

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

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data for registration" })

        if (!name) return res.status(400).send({ status: false, message: "please enter name for registration" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "name can have only alphabets and space" })

        if (!password) return res.status(400).send({ status: false, message: "please enter password for registration" })
        if (!pass.test(password)) return res.status(400).send({ status: false, message: "password must have one capital one small one numericand one special character [#?!@$%^&*-] and length between 8-15" })


        let userdata = await usermodel.findOne({ name: name, password: password })

        if (!userdata) return res.status(404).send({ status: false, message: "no user found with this name and passsword" })

        let token = jwt.sign({ id: userdata._id }, "secretkey")

        return res.status(200).send({ status: true, data: { id: userdata._id, token: token } })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { registration, userlogin }