module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "dilip@1602#",
    DB: "cdms",
    dialect: "mysql",

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}