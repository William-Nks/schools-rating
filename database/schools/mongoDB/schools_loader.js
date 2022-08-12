const mongoose = require('mongoose')
const path = require('path');


const SchoolDAO = require(path.join(__dirname, '../../../models/dao/mongoDB/school_dao'))
const School = require(path.join(__dirname, '../../../models/school/school'))

const createData = () => {
    console.log("Loding schools...")
    const dao = new SchoolDAO()

    const schools = ['ibat', 'delfin', 'isi', 'seda']

    schools.forEach(async (school) => {
        if (!(await dao.isExist(school))) {
            await dao.create(new School(school))
        }
    })
    console.log("Schools loaded")
}

/**
 * If you want to drop the collection everytiem you run the script, pass mode=drop or just drop.
 * @param {String} mode 
 */
exports.loadSchools = (mode="") => {

    if (mode === "drop") {
        console.log("Dropping schools collection...")
        mongoose.connection.dropCollection('schools')
        .then(() => {
            console.log('Dropped collection schools')
            createData()
        }).catch(err => {
            console.log(err)
        })
    } else {
        createData()
    }
}
