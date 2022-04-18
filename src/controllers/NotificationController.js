const Notification = require('../models/Notifications')
const isExpired = require("../../utils/checkExpires");
class NotificationController{
    async showNotificationByToUser(req, res){
        if (!isExpired(req, res)) {
            return res.json({
              status: 456,
              error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
            });
        }
        
        const notification = await Notification.find({toUserId: req.user.userId})
        console.log(notification)
    }
}
module.exports = new NotificationController()