const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        photo: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema)