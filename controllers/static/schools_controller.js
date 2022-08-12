exports.get = (req, res) => {
    res.render('schools', {session: req.session})
    
}