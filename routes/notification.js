const route = require('express').Router()
const verify = require('../src/middleware/auth')
const notificationController = require('../src/controllers/NotificationController')

route.get('/', verify, notificationController.showNotificationByToUser)

module.exports = route