module.exports = function (router) {

const version = 'v06'
const baseUrl = `/${version}`

// Declare the entry point service - customer account
router.get(`${baseUrl}/index.html`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

// Declare the RACO start point - is this move permanent or temporary?
router.get(`${baseUrl}/report-a-change-once/index.html`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/is-this-move-permanent-or-temporary`)
})

router.post(`${baseUrl}/report-a-change-once/is-this-move-permanent-or-temporary`, function (req, res) {

  // Make a variable and give it the value from 'permanentOrTemporary' to take the value of the radio list name
  var permanentTempMove = req.session.data['permanentOrTemporary']

  // Check whether the variable matches a condition
  if (permanentTempMove == "permanent"){
    // Send user to next page
    res.redirect(`${baseUrl}/report-a-change-once/when-did-you-move-to-your-new-address`)
  } else {
    // Send user to ineligible page
    res.redirect(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/temporary-address`)
  }

})

router.post(`${baseUrl}/report-a-change-once/when-did-you-move-to-your-new-address`, function (req, res) {
  const day = req.body["move-date-day"]
  const month = req.body["move-date-month"]
  const year = req.body["move-date-year"]

  // Create Date object (month is 0-based in JS)
  const enteredDate = new Date(year, month - 1, day)

  // Today's date (with time removed)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check if date is in the future
  if (enteredDate > today) {
    return res.redirect(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/future-date`)
  }

  // Otherwise (today or past)
  res.redirect(`${baseUrl}/report-a-change-once/address/find-your-new-address`)
})

router.post(`${baseUrl}/report-a-change-once/address/find-your-new-address`, function (req, res) {
  const postcode = req.body.postcode
    ?.trim()
    .replace(/\s+/g, '')
    .toUpperCase()

  if (postcode === 'IP331LT') {
    return res.redirect(`${baseUrl}/report-a-change-once/address/no-address-found`)
  }

  res.redirect(`${baseUrl}/report-a-change-once/address/select-your-new-address`)
})

router.post(`${baseUrl}/report-a-change-once/address/select-your-new-address`, function(req, res) {

  // Make a variable and give it the value from 'selectAddress' to take the value of the radio list name
  var selectAddress = req.session.data['selectAddress']

  // Check whether the variable matches a condition
  if (selectAddress == "address-not-listed"){
    // Send user to next page
    res.redirect(`${baseUrl}/report-a-change-once/which-country-is-your-new-address-in`)
  } else {
    // Send user to ineligible page
    res.redirect(`${baseUrl}/report-a-change-once/address/confirm-address`)
  }

})

router.post(`${baseUrl}/report-a-change-once/address/confirm-address`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/check-answers/journey-1`)
})

router.post(`${baseUrl}/report-a-change-once/check-answers/journey-1`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/confirmation`)
})

router.post(`${baseUrl}/report-a-change-once/confirmation`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`/${version}/customer-account/personal-details`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`/${version}/customer-account/personal-details-banner-address-lookup`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`/${version}/customer-account/personal-details-banner-manual-address`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

// No address found - manual adress entry

router.post(`${baseUrl}/report-a-change-once/which-country-is-your-new-address-in`, function (req, res) {

  // Make a variable and give it the value from 'country' to take the value of the radio list name
  var country = req.session.data['country']

  // Check whether the variable matches a condition
  if (country === "england" || country === "wales") { 
    // Send user to next page
    res.redirect(`${baseUrl}/report-a-change-once/have-you-moved-into-a-care-home-or-hospital`)
  } else {
    // Send user to ineligible page
    res.redirect(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales`)
  }

})

router.post(`${baseUrl}/report-a-change-once/have-you-moved-into-a-care-home-or-hospital`, function (req, res) {

  // Make a variable and give it the value from 'careHome' to take the value of the radio list name
  var careHome = req.session.data['careHome']

  // Check whether the variable matches a condition
  if (careHome == "no"){
    // Send user to next page
    res.redirect(`${baseUrl}/report-a-change-once/address/enter-address-manually`)
  } else {
    // Send user to ineligible page
    res.redirect(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/care-home`)
  }

})

router.post(`${baseUrl}/report-a-change-once/address/enter-address-manually`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/address/confirm-manual-address`)
})

router.post(`${baseUrl}/report-a-change-once/address/confirm-manual-address`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/check-answers/journey-2`)
})

router.post(`${baseUrl}/report-a-change-once/check-answers/journey-2`, function(req, res) {
    res.redirect(`${baseUrl}/report-a-change-once/confirmation`)
})

// Declare the entry point service - customer account
router.get(`${baseUrl}/customer-account/personal-details-banner`, function (req, res) {
  const postcode = req.session.data['postcode']
    ?.trim()
    .replace(/\s+/g, '')
    .toUpperCase()

  if (postcode === 'IP331LT') {
    return res.redirect(`${baseUrl}/customer-account/personal-details-banner-manual-address`)
  }

  return res.redirect(`${baseUrl}/customer-account/personal-details-banner-address-lookup`)
})

// Drop out screens
router.post(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/future-date`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/temporary-address`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

router.post(`${baseUrl}/report-a-change-once/you-cannot-use-this-service/care-home`, function(req, res) {
    res.redirect(`${baseUrl}/customer-account/account-home`)
})

}