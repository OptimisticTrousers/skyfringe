"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const commentController_1 = require("../controllers/commentController");
const multerPostKey_1 = __importDefault(require("../middleware/multerPostKey"));
const validatePostId_1 = __importDefault(require("../middleware/validatePostId"));
const validateCommentId_1 = __importDefault(require("../middleware/validateCommentId"));
const router = (0, express_1.Router)();
router.route("/").get(postController_1.post_list).post(multerPostKey_1.default, postController_1.post_create);
router
    .route("/:postId")
    .put(validatePostId_1.default, multerPostKey_1.default, postController_1.post_update)
    .delete(validatePostId_1.default, multerPostKey_1.default, postController_1.post_delete);
router.route("/:postId/likes").put(validatePostId_1.default, postController_1.post_like);
router
    .route("/:postId/comments")
    .get(validatePostId_1.default, commentController_1.comment_list)
    .post(validatePostId_1.default, commentController_1.comment_create);
router
    .route("/:postId/comments/:commentId")
    .put(validatePostId_1.default, validateCommentId_1.default, commentController_1.comment_update)
    .delete(validatePostId_1.default, validateCommentId_1.default, commentController_1.comment_delete);
router
    .route("/:postId/comments/:commentId/likes")
    .put(validatePostId_1.default, validateCommentId_1.default, commentController_1.comment_like);
exports.default = router;
