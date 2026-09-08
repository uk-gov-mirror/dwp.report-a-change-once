//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Require any prototype version specific routes files

require('./routes/v06')(router)
require('./routes/v05')(router)
require('./routes/v04')(router)

// Add your routes here

router.post('/v03-journey-1/starting-question', function (req, res) {
    const change = req.body['what-do-you-need-to-change']
    if (change === 'address') {
        res.redirect('/v03-journey-1/task-list.html')
    }else if (change === 'other') {
        res.redirect('/v03-journey-1/my-change-is-not-listed')
    }else {
        res.redirect('/v03-journey-1/starting-question')
    }
})