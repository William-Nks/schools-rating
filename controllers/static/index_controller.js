exports.get = (req, res) => {
    res.render('index', {session: req.session})
    
}