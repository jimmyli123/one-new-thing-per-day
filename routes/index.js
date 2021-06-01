const express = require('express')
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Lesson = require('../models/Lesson')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'loginLayout'
    })
})

// @desc Feed
// @route GET /feed

router.get('/feed', ensureAuth, async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({ createdAt: "desc"}).lean()
        res.render("feed.hbs", {
            lessons,
        })
    } catch (error) {
        console.log(err)
        res.render('error/404')
    }
})


module.exports = router