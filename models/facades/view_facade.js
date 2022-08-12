const SchoolDAO = require('../../models/dao/mongoDB/school_dao'),
Review = require('../review/review')
const {createError, createLazyError} = require('../util/errors_util')


/**
 * Create comment takes a review and saves it to the database.
 * @param {Review} review 
 */
exports.addiFNotExistCommentOrUpdate = async (schoolName, review) => {

    const dao = new SchoolDAO()

    return new Promise(async (resolve, reject) => {
        const school = await dao.getByName(schoolName)
        if (!school) {
            reject(createLazyError('alert-danger', 'School not found'))
        }
        const reviewExist = await dao.isReviewExist(schoolName, review.id)
        if (reviewExist) {
            dao.updateReview(schoolName, review)
            .then(() => {
                resolve(createLazyError('alert-success', 'Review updated'))
            }).catch(err => {
                reject(createLazyError('alert-danger', 'Error updating review'))
            })
        } else {
            dao.addReview(schoolName, review)
            .then(() => {
                resolve(createLazyError('alert-success', 'Comment posted'))
            }).catch(err => {
                reject(createLazyError('alert-danger', 'Error posting comment'))
            })
        }
    })
}

exports.getAllReviews = async (schoolName) => {
    const dao = new SchoolDAO()
    return new Promise(async (resolve, reject) => {
        const school = await dao.getByName(schoolName)
        if (!school) {
            reject(createLazyError('alert-danger', 'School not found'))
        }
        resolve(school.reviews)
    })
}

exports.deleteReview = async (schoolName, userId) => {
    const dao = new SchoolDAO()
    return new Promise(async (resolve, reject) => {
        const school = await dao.getByName(schoolName)
        if (!school) {
            reject(createLazyError('alert-danger', 'School not found'))
        }
        dao.deleteReview(userId)
        .then(() => {
            resolve(createLazyError('alert-success', 'Review deleted'))
        }).catch(err => {
            reject(createLazyError('alert-danger', 'Error deleting review'))
        })
    })
}