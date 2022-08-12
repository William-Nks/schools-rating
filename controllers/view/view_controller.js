const viewFacade = require('../../models/facades/view_facade')
const Review = require('../../models/review/review')
const { validationResult } = require('express-validator')
const {createLazyError} = require('../../models/util/errors_util')


const render = (req, res, data={}) => {
    const {error} = req.session
    req.session.error = null
    data.school = req.params.school;
    const errors = JSON.stringify(error)
    res.render('view', {session: req.session, data, errors})
}

exports.get = async (req, res) => {

    const {user} = req.session
    const schoolName = req.params.school
    const userReview = new Review()

    // get all reviews according to school
    viewFacade.getAllReviews(schoolName)
    .then((reviews) => {
        if(user) {
            reviews.forEach(review => {
                if(review.id === user.id) {
                    userReview.setComment(review.comment)
                                .setRate(review.rate)
                }
            })
        }
        render(req, res, {reviews, userReview})
    }).catch((err) => {
        req.session.error = err
        render(req, res, {userReview})
    })
}

exports.post = async (req, res) => {

    const errors = validationResult(req);
    const {user} = req.session
    const {comment, rate} = req.body
    const schoolName = req.params.school

    if (!errors.isEmpty()) {
        const error = createLazyError('alert-danger', 'Field must be filled')
        res.status(400).send(JSON.stringify({comment, rate, errors: error}))
        return
    }

    if(!user) {
        const error = createLazyError('alert-danger', 'You must be logged in to post a comment')
        req.session.error = error
        res.status(401).send(JSON.stringify({comment, rate, status: 401, errors: error}))
        return
    }

    const review = new Review()
    review.setId(user.id)
            .setName(user.name)
            .setComment(comment)
            .setRate(rate)

    viewFacade.addiFNotExistCommentOrUpdate(schoolName, review)
    .then((msg) => {
        res.status(200).send(JSON.stringify({comment, rate, status: 200, errors: msg}))
    }).catch((err) => {
        res.status(500).send(JSON.stringify({comment, rate, status: 500, errors: err}))
    })
}

exports.delete = (req, res) => {

    const {user} = req.session
    const school = req.params.school;
    
    if(user && school) {
        viewFacade.deleteReview(school, user.id)
        .then((msg) => {
            res.status(200).send(JSON.stringify({status: 200, errors: msg}))
        }).catch((err) => {
            res.status(500).send(JSON.stringify({status: 500, errors: err}))
        })
    } else {
        const error = createLazyError('alert-danger', 'You must be logged in to delete a comment')
        req.session.error = error
        res.status(401).send(JSON.stringify({status: 401, errors: error}))
    }
}