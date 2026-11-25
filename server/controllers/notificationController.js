const Notification = require("../models/Notification");

const getUserId = (req) => req.user?.id || req.user?._id;

// GET MY NOTIFICATIONS
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = getUserId(req);

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "name")
      .populate("product", "title images")
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    return res.status(200).json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch notifications.",
      error: error.message,
    });
  }
};

// MARK ONE NOTIFICATION AS READ
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: getUserId(req),
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not update notification.",
      error: error.message,
    });
  }
};

// MARK ALL NOTIFICATIONS AS READ
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        recipient: getUserId(req),
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      },
    );

    return res.status(200).json({
      message: "All notifications marked as read.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not update notifications.",
      error: error.message,
    });
  }
};

// DELETE ONE NOTIFICATION
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: getUserId(req),
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not delete notification.",
      error: error.message,
    });
  }
};
