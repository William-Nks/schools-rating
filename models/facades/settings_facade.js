const {createLazyError, createError} = require('../util/errors_util')
const UserDAO = require('../dao/mongoDB/user_dao'),
util = require('../util/validators')


exports.changePassword = async (userObject) => {
    
    const {email, password, confirmPassword} = userObject
    let pwdError

    if(!util.checkPassword(password, confirmPassword))
        pwdError = createError('alert-danger', 'Password is not equal')

    const userDAO = new UserDAO()
    const user = await userDAO.getByEmail(email)

    return new Promise((resolve, reject) => {

        if (!pwdError) {
            user.password = util.encrypt(password)
            userDAO.updatePassword(user)
            .then(() => resolve(
                createLazyError('alert-success', 'Password was changed successfully')
            ))
            .catch((error) => reject(error))
        } else {
            reject({pwd: pwdError})
        }
    })
}