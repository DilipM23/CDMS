const db = require('../models')

const Faculty = db.cseFaculty

const addFaculty = async (req, res)=>{
    let data = {
        facultyid: req.body.facultyid,
        name: req.body.name,
        gender: req.body.gender,
        designation: req.body.designation,
        experience: req.body.experience,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    }
    const faculty = await Faculty.create(data)
    res.status(200).send(faculty)
}

const getAllFaculty = async (req, res)=>{
    let faculties = await Faculty.findAll({})
    res.status(200).send(faculties)
}

const deleteFaculty = async (req, res) =>{
    let facultyid = req.params.facultyid
    await Faculty.destroy({where: {facultyid: facultyid}})
    res.status(200).send('Faculty deleted')
}

module.exports = {
    addFaculty,
    getAllFaculty,
    deleteFaculty
}