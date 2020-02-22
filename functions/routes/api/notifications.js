const { Auth } = require("../../Util/Auth");
const { db } = require("../../Util/admin");
const express = require("express");
const router = express.Router();

//@route    POST /notifications
//@desc     Mark notifications as read
//@access   Protected
router.post("/", Auth, async (req, res) => {
  let batch = db.batch();
  try {
    req.body.forEach(notificationId => {
      const notification = db.doc(`/notifications/${notificationId}`);
      batch.update(notification, { read: true });
    });
    await batch.commit();
    return res.status(200).json({ message: "Notifications marked read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
});

module.exports = router;
