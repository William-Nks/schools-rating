const settingsFacade = require('../../models/facades/settings_facade')
const { validationResult } = require('express-validator')
const {createError, createLazyError} = require('../../models/util/errors_util')

const getAllSettings = async (req, res) => {
    const error = req.session.error
    req.session.error = null
    let errors = JSON.stringify(error)
    res.render('settings', {session: req.session, errors})
}

exports.get = async (req, res) => {
    getAllSettings(req, res)
}

exports.post = async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        req.session.error = {pwd: 
            createError('alert-danger', 'Password does not meet the requirements')
        }
        getAllSettings(req, res)
        return
    }

    const {password, confirmPassword} = req.body
    const {email} = req.session.user

    settingsFacade.changePassword({
        email,
        password,
        confirmPassword
    })
    .then((msg) => {
        req.session.error = msg
        getAllSettings(req, res)
    })
    .catch((error) => {
        req.session.error = error
        getAllSettings(req, res)

    })
}