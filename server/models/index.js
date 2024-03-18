const dbConfig = require('../config/dbConfig.js')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            aquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate()
.then(() =>{
    console.log('Connected to database');
})
.catch(err => {
    console.log('Error: '+err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.cseStudents = require('./cseStudentModel.js')(sequelize, DataTypes)
db.cseStudentAcademics = require('./cseStudentAcademicsModel.js')(sequelize, DataTypes)
db.cseFaculty = require('./cseFacultyModel.js')(sequelize, DataTypes)
db.credentials = require('./credentialsModel.js')(sequelize, DataTypes)

db.cseStudents.hasOne(db.cseStudentAcademics,{foreignKey: "usn"})
db.cseStudentAcademics.belongsTo(db.cseStudents, {foreignKey: "usn"})

db.sequelize.sync({ force: false, alter: true})
.then(()=>{
    console.log('re-sync done');
})


module.exports = db