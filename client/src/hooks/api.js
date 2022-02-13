import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
//====== USERS ======

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const useMe = () => {
    const query = useQuery("me", async () => {
        const res = await axios.get("/users", getAuthConfig());
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data.user;
    });
    return { user: query.data, isLoading: query.isLoading, error: query.error };
};

//register accepts {email, password, confirm?}
export const useRegister = () => {
    const mut = useMutation(async ({ email, password, confirm }) => {
        if (confirm && password !== confirm) {
            throw new Error("Passwords do not match");
        }
        if (email === "" || password === "" || (confirm && confirm === "")) {
            throw new Error("Please fill out all fields");
        }
        const res = await axios.post(
            "/users/register",
            { email, password },
            getAuthConfig()
        );
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data;
    });
    return { isLoading: mut.isLoading, error: mut.error, register: mut.mutate };
};

export const useLogin = () => {
    const qc = useQueryClient();
    const mut = useMutation(
        async ({ email, password }) => {
            if (email === "" || password === "") {
                throw new Error("Please fill out all fields");
            }
            const res = await axios.post(
                "/users/login",
                { email, password },
                getAuthConfig()
            );
            //Error handling
            if (res.data.err) {
                throw new Error(res.data.err);
            }
            return res.data.token;
        },
        {
            onSuccess: (token) => {
                localStorage.setItem("token", token);
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                qc.invalidateQueries("me");
            },
        }
    );
    return {
        token: mut.data,
        isLoading: mut.isLoading,
        error: mut.error,
        login: mut.mutate,
    };
};

//updateUser accepts {language,region}
export const useUpdateUser = () => {
    const mut = useMutation(async (patch) => {
        const res = await axios.patch("/users", patch, getAuthConfig());
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data;
    });
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        updateUser: mut.mutate,
    };
};

export const useDeleteUser = () => {
    const mut = useMutation(async () => {
        const res = await axios.delete("/users", getAuthConfig());
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data;
    });
    return {
        isLoading: mut.isLoading,
        error: mut.error,
        deleteUser: mut.mutate,
    };
};

//requestReset accepts an email
export const useRequestPasswordReset = () => {
    const mut = useMutation(async (email) => {
        const res = await axios.post(
            "/users/requestReset",
            { email },
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
        requestReset: mut.mutate,
    };
};

//resetPassword accepts {token,password}
export const useResetPassword = () => {
    const mut = useMutation(async ({ token, password }) => {
        const res = await axios.post(
            "/users/resetPassword",
            { token, password },
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
        resetPassword: mut.mutate,
    };
};

//====== POSTS ======

export const usePosts = () => {
    const query = useQuery("posts", async () => {
        const res = await axios.get("/posts", getAuthConfig());
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

export const usePost = (postid) => {
    const query = useQuery(["post", postid], async () => {
        const res = await axios.get(`/posts/id/${postid}`, getAuthConfig());
        //Error handling
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data.post;
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
