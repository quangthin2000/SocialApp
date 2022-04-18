const Comment = require("../models/Comment");
const isExpired = require("../../utils/checkExpires");
class CommentController {
  /*
   * @POST: comment/
   * @Access: khi da login
   * @DESC: Tạo một bài comment mới
   */
  async create(req, res) {
    if (!isExpired(req, res)) {
      return res.json({
        status: 456,
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    try {
      const { content, postId } = req.body;
      console.log(req.body);
      const newComment = new Comment({
        content,
        userId: req.user.userId,
        postId: postId,
      });
      await newComment.save();
      return res.json({
        data: newComment,
        msg: "Bình luận thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Lỗi server",
      });
    }
  }
  /*
   * @POST: comment/:postId
   * @Access: khi da login
   * @DESC: Hiển thị tất cả các comment của một bài viết nào đó
   */
  async showCommentByPost(req, res) {
    if (!isExpired(req, res)) {
      return res.json({
        status: 456,
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const postId = req.params.postId;
    const comments = await Comment.find({ postId: postId }).populate("userId");
    try {
      if (comments.length > 0) {
        return res.status(200).json({
          data: comments,
          msg: "Hiển thị thành công",
        });
      } else {
        return res.status(400).json({
          msg: "Không có bình luận nào",
        });
      }
    } catch (error) {
      return res.status(500).json("Lỗi server");
    }
  }

  /*
   * @PUT: comment/:id
   * @Access: khi da login và đúng comment mình đã viết
   * @DESC: chỉnh sửa nội dung comment
   */
  async edit(req, res) {
    if (!isExpired(req, res)) {
      return res.json({
        status: 456,
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }
    const id = req.params.id;
    const comment = await Comment.findOne({ _id: id });
    if (!comment) {
      return res.status(404).json("Comment không tồn tại");
    }
    // console.log("cmt.userId:",comment.userId)
    if (comment.userId.toString() !== req.user.userId)
      return res.status(401).json("Bạn không có quyển sửa comment");
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.json({
        data: updatedComment,
        success: "Chỉnh sửa thành công",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Chỉnh sửa thất bại",
      });
    }
  }
  /*
   * @DELETE: comment/:id
   * @Access: khi da login
   * @DESC: Xóa một comment
   */
  async destroy(req, res) {
    if (!isExpired(req, res)) {
      return res.json({
        status: 456,
        error: "Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại",
      });
    }

    const id = req.params.id;
    const comment = await Comment.findOne({ _id: id });
    if (!comment) {
      return res.status(404).json("Comment không tồn tại");
    }

    if (comment.userId.toString() !== req.user.userId)
      return res.status(401).json("Bạn không có quyển xóa comment");
    try {
      await Comment.findByIdAndDelete(id);
      return res.status(200).json({
        msg: "Xóa thành công",
      });
    } catch (error) {
      return res.status(400).json({ msg: "Xóa thất bại" });
    }
  }
}
module.exports = new CommentController();
