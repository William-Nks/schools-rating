// Required Modules.
const express = require('express'),
session = require('express-session'),
morgan = require('morgan'),
dotenv = require('dotenv'),
cookieParser = require('cookie-parser')
db = require('./database/mongoDB/connector')
const {policy} = require('./middleware/loggin_checker')
const path = require('path');
const schoolLoader = require('./database/schools/mongoDB/schools_loader')

dotenv.config()
const app = express()
db.conn()

// load required data to database
schoolLoader.loadSchools(process.env.DB_ACTION || '')

// Sets a template engine
app.set('view engine', 'ejs')

// Makes public and storage/images directory accessable.
app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

// sets morgan middçeware
app.use(morgan('dev'))
// This will tell express how to move on to next expression
app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})

// Sets a session and an ID cookie which is the secret parameter
app.use(session({
    secret: process.env.SESSION_SECRET || 'encryption_secret',
    resave: false,
    saveUninitialized: true
}))

const visitor = {access: 'visitor'}
const auth = {access: 'auth'}

app.use('/index', require('./routes/static/index_route'))
app.use('/schools', require('./routes/static/schools_route'))
app.use('/login', policy(visitor), require('./routes/user/login_route'))
app.use('/signup', policy(visitor), require('./routes/user/signup_route'))
app.use('/settings', policy(auth), require('./routes/settings/settings_route'))
app.use('/view', require('./routes/view/view_route'))
app.use('/logout', policy(auth), require('./routes/logout/logout_route')) // logout will clean

app.get('/', (req, res) => {res.redirect('/index')})

app.use((req, res) => {
    res.status(404).render('index', {session: req.session})
})

// Server listener
let server = app.listen(process.env.PORT || 5000, process.env.HOST_NAME || '0.0.0.0', () => {
    console.log("Server is running on port " + server.address().port 
                        + " and address at " + server.address().address)
})