const Review = require("../review/review");

/**
 * Class School abstracts simple characteristcs of a school.
 * @version 1.0.0
 */

 class School {

    constructor(school="", reviews=[]){
        this.school = school;
        this.reviews = reviews // Array type
    }

    /**
     * This method sets a name for the school. This method is chainable.
     * @param {String} school 
     * @returns School
     */
    setSchoolName(school){
        this.school = school;
        return this;
    }

    /**
     * This function is recommened to added a review
     * to handle the object in different situation or/ and
     * update a data.
     * @param {Review} review - Review of the school
     */
    addReview(review){
        this.reviews.push({review})
    }

    /**
     * This function adds reviews to the school.
     * @param {Array} reviews - Array of reviews
     */
    addAllReviews(reviews){
        for(let i = 0; i < reviews.length; i++){
            this.addReview(reviews[i])
        }
    }

    /**
     * This function returns the average rate of the school.
     * @returns number
     */
    getRateAverage(){
        let sum = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            sum += this.reviews[i].rate;
        }
        return sum / this.reviews.length
    }

    /**
     * This function takes an ID to return a review.
     * If review is not found it returns a null.
     * @param {number} id - ID of the review
     * @returns Object
     */
    getReviewById(id){
        for (const prop in this.reviews){
            const review = this.reviews[prop];
            if (review.id === id)
                return review
        }
        return null
    }

    /**
     * This function updates a review. It takes one parameter.
     * If a review is found and updated it returns true. Otherwise false.
     * @param {Review} review - Review of the school
     * @returns boolean
     */
    updateReview(review){
        for (const prop in this.reviews){
            const review = this.reviews[prop]
            if (review.id === id){
                this.reviews[prop].comment = review.comment
                this.reviews[prop].rate = review.rate
                return true
            }
        }
        return false
    }

    /**
     * This function deletes a review based on an ID.
     * If a review is found and deleted it returns true. Otherwise false.
     * @param {number} id - ID of the review
     * @returns boolean
     */
    deleteReviewById(id){
        for (let i = 0; i < this.reviews.length; i++) {
            const tempReview = this.reviews[i]
            if (tempReview.id === id){
                this.reviews.splice(i, 1)
                return true
            }
        }
        return false
    }

    /**
     * This function returns all reviews of the school.
     * @returns Review
     */
    getReviews(){
        return this.reviews
    }
}

module.exports = School