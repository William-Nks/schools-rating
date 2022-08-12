module.exports.policy = (rule={}) => {
    
    
    return (req, res, next) => {
        
        const {access} = rule

        if(!req.session.user && access == 'auth')
            res.redirect('/login')

        if (req.session.user && access == 'visitor')
            res.redirect('/index')

        next()
    }
}