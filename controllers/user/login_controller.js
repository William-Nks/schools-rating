const userFacade = require('../../models/facades/user_facade')
const { validationResult } = require('express-validator');
const {createError} = require('../../models/util/errors_util')


const render = (req, res, path) => {
    const error = req.session.error
    const cache = req.session.cache
    req.session.error = null
    req.session.cache = null
    let errors = JSON.stringify(error)
    res.render(path, {session: req.session, cache, errors})
}

const loadLogin = (req, res) => {
    render(req, res, 'login')
}

exports.get = (req, res) => {
    loadLogin(req, res)
}

exports.post = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.error = {form: 
            createError('alert-danger', 'The credentials do not meet the requirements')
        }
        loadLogin(req, res)
        return
    }

    userFacade.login(req.body)
    .then((user) => {
        req.session.user = user
        res.redirect('/schools')
    })
    .catch((error) => {
        req.session.error = error
        req.session.cache = {email: req.body.email}
        loadLogin(req, res)
    })
}