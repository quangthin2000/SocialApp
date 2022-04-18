const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationSchema);
