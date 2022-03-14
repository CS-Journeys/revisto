import Post from "../../../core/models/postModel.js";

// Update collection documents
export const updateReactions = () => {
    Post.updateMany({}, { $set: {
        reactedUsers: [],
        reactions: []
    }});

    return Promise.resolve('ok');
}