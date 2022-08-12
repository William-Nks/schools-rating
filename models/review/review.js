/**
 * Class Review abstracts simple characteristcs of a review.
 * @version 1.0.0
 */

 class Review {

    constructor() {
        this.comment = ""
        this.rate = 1;
    }

    /**
     * This method sets an ID to the review. This method is chainable
     * @param {number} id - This is the review ID.
     * @returns Review
     */
    setId(id){
        this.id = id; 
        return this;
    }

    /**
     * This method sets a name to the review. This method is chainable
     * @param {string} name - This is the review name.
     * @returns Review
     */
    setName(name){
        this.name = name; 
        return this;
    }

    /**
     * This method sets a comment to the review. This method is chainable
     * @param {string} comment - This is the review comment.
     * @returns Review
     */
    setComment(comment){
        this.comment = comment; 
        return this;
    }

    /**
     * This method sets a rate to the review. This method is chainable.
     * @param {int} rate - This is the review rate. rate type is interger
     * @returns Review
     */
    setRate(rate){
        this.rate = rate; 
        return this;
    }
};

module.exports = Review;