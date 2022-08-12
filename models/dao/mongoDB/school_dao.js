const School = require('../../../database/schools/mongoDB/schools_schema')


class SchoolDAO {

    async create (schoolName){
        const school = new School(schoolName)
        return await school.save()
    }

    async addReview (school, review){
        const {id, name, comment, rate} = review
        return await School.updateOne(
            {"school": school},
            {
                $push: {
                    "reviews": {"id": id, "name": name, "comment": comment, "rate": rate}
                }
            }
        )
    }

    async deleteReview(userId) {
        return await School.updateOne(
            {"reviews.id": userId},
            {
                $pull: {
                    "reviews": {"id": userId}
                }
            }
        )
    }

    async updateReview(schoolName, review) {
        return await School.updateOne(
            {"school": schoolName, "reviews.id": review.id},
            {
                $set: {
                    "reviews.$.name": review.name,
                    "reviews.$.comment": review.comment,
                    "reviews.$.rate": review.rate
                }
            }
        )
    }

    async getReviewById(id) {
        return await School.findOne({"reviews.id": id})
    }

    async isReviewExist(school, userId) {
        const review = await School.findOne({"school": school, "reviews.id": userId})
        return (review) ? true : false;
    }

    async getByName(name) {
        return await School.findOne({"school": name})
    }

    async getById(id) {
        return await School.findById(id)
    }

    async isExist(schoolName) {
        const school = await School.findOne({"school": schoolName})
        return (school) ? true : false;
    }

    async getAll() {
        return await School.find()
    }
}

module.exports = SchoolDAO