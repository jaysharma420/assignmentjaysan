const studentmodel = require("../model/studentmodel")
const usermodel = require("../model/usermodel")

const createstudent = async function (req, res) {
    try {
        let data = req.body
        data.userid = req.params.userid

        let { name, marks, subject } = data
        let getdata = await studentmodel.findOne({ name, subject })
        console.log(getdata);
        if (getdata) {
            console.log("inside if");
            let savedata = await studentmodel.findOneAndUpdate(
                { name, subject },
                { $set: { marks: marks + getdata.marks } },
                { new: true }
            )
            return res.status(201).send({ status: true, data: savedata })

        }
        let savedata = await studentmodel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const getstudent = async function (req, res) {
    try {
        let getdata = await studentmodel.find({ userid: req.params.userid, isdeleted: false })
        return res.status(201).send({ status: true, data: getdata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const findstudent = async function (req, res) {
    try {
        let name = req.query.name
        let subject = req.query.subject

        let filter = { isdeleted: false }

        if (name) { filter["name"] = { "$regex": name } }
        if (subject) { filter["subject"] = { "$regex": subject } }

        let data = await studentmodel.find(filter)
        if (data.length == 0) return res.status(404).send({ status: false, message: "no data found" })
        return res.status(200).send({ status: true, data: data })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const updatestudent = async function (req, res) {
    try {

        let { name, subject, marks } = req.body
        let filter = {}
        if (name) { filter["name"] = name }
        if (subject) { filter["subject"] = subject }
        if (marks) { filter["marks"] = marks }
        let savedata = await studentmodel.findByIdAndUpdate(
            { _id: req.params.studentid },
            { $set: filter },
            { new: true }
        )
        return res.status(200).send({ status: true, message: "data has been updated", data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const deletestudent = async function (req, res) {
    try {

        let savedata = await studentmodel.findByIdAndUpdate(
            { _id: req.params.studentid },
            { $set: { isdeleted: true } },
            { new: true }
        )
        return res.status(200).send({ status: true, message: "data has been deleted", data: savedata })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createstudent, getstudent, findstudent, updatestudent, deletestudent }