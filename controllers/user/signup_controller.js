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

const loadSignup = (req, res) => {
    render(req, res, 'signup')
}

exports.get = (req, res) => {
    loadSignup(req, res)
}

exports.post = async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        req.session.error = {credential: 
            createError('alert-danger', 'The credentials do not meet the requirements')
        }
        loadSignup(req, res)
        return
    }

    userFacade.signup(req.body)
    .then((email) => {
        req.session.cache = {email}
        res.redirect('/login')
    })
    .catch(({formCache, error}) => {
        req.session.error = error
        req.session.cache = formCache
        loadSignup(req, res)
    })   
}