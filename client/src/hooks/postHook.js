import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAuthConfig } from "./authHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//====== POSTS ======

export const usePosts = (params) => {
    const query = useQuery("posts", async () => {
        const res = await axios.get("/posts", {params : params}, getAuthConfig());

        //Error handling
        if (res.data.err) { throw new Error(res.data.err); }

        return res.data.posts;
    });
    return {
        posts: query.data,
        isLoading: query.isLoading,
        error: query.error,
    };
};

export const usePost = (postid) => {
    const nav = useNavigate();
    const query = useQuery(["post", postid], async () => {
        const res = await axios
            .get(`/posts/id/${postid}`, getAuthConfig())
            .catch((err) => nav("/404"));
        // Ensure we do not read from undefined (404 page), could be a better way to do this.
        if (res) {
            return res.data.post;
        } else {
            return undefined;
        }
    });

    return { post: query.data, isLoading: query.isLoading, error: query.error };
};

//Gets the post of the logged in user
export const useMyPosts = () => {
    const query = useQuery("myposts", async () => {
        const res = await axios.get("/posts/user", getAuthConfig());
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data.posts;
    });
    return {
        posts: query.data,
        isLoading: query.isLoading,
        error: query.error,
    };
};

//createPost returns id onSuccess
export const useCreatePost = () => {
    const qc = useQueryClient();
    const mut = useMutation(
        async ({ title, content }) => {
            const res = await axios.post(
                "/posts",
                { title, content },
                getAuthConfig()
            );
            //Error handling
            if (res.data.err) {
                throw new Error(res.data.err);
            }
            return res.data.id;
        },
        {
            onSuccess: (id) => {
                qc.invalidateQueries("posts");
                qc.invalidateQueries("myposts");
            },
        }
    );
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        createPost: mut.mutate,
    };
};

//deletePost accespts an id
export const useDeletePost = () => {
    const qc = useQueryClient();
    const mut = useMutation(
        async (id) => {
            const res = await axios.delete(`/posts/id/${id}`, getAuthConfig());
            //Error handling
            if (res.data.err) {
                throw new Error(res.data.err);
            }
            return res.data;
        },
        {
            onSuccess: (id) => {
                qc.invalidateQueries("posts");
                qc.invalidateQueries("myposts");
            },
        }
    );
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        deletePost: mut.mutate,
    };
};

//updatePost accespts {id,title,content}
export const useUpdatePost = () => {
    const qc = useQueryClient();
    const mut = useMutation(
        async ({ id, title, content }) => {
            const res = await axios.patch(
                `/posts/id/${id}`,
                { title, content },
                getAuthConfig()
            );
            //Error handling
            if (res.data.err) {
                throw new Error(res.data.err);
            }
            return { id, title, content };
        },
        {
            onSuccess: (data) => {
                qc.invalidateQueries(["post", data.id]);
                qc.invalidateQueries("myposts");
                qc.invalidateQueries("posts");
            },
        }
    );
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        updatePost: mut.mutate,
    };
};

//reportPost accespts an {id,report (string)}
export const useReportPost = () => {
    const mut = useMutation(async ({ id, reason }) => {
        const res = await axios.post(
            `/posts/report/${id}`,
            { reason },
            getAuthConfig()
        );
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data;
    });
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        reportPost: mut.mutate,
    };
};
