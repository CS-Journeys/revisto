import { useQuery,useMutation } from "react-query";
import axios from "axios";

//====== USERS ======

export const useMe = () => {
  const query = useQuery("me", async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get("/users", config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data.user;
  });
  return { user: query.data, isLoading: query.isLoading, error: query.error };
};

export const useRegister = () => {
  const mut = useMutation(async ({email,password}) => {
    const res = await axios.post("/users/register", { email, password });
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return {isLoading:mut.isLoading,error:mut.error,register:mut.mutate};
}

export const useLogin = () => {
  const mut = useMutation(async ({email,password}) => {
    const res = await axios.post("/users/login", { email, password });
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data.token;
  });
  return {token:mut.data,isLoading:mut.isLoading,error:mut.error,login:mut.mutate};
}

//updateUser accepts {language,region}
export const useUpdateUser = () => {
  const mut = useMutation(async (patch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.patch("/users", patch, config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return { isLoading: mut.isLoading, error: mut.error, updateUser: mut.mutate };
};

export const useDeleteUser = () => {
  const mut = useMutation(async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.delete("/users", config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return { isLoading: mut.isLoading, error: mut.error, deleteUser: mut.mutate };
};

//requestReset accepts an email
export const useRequestPasswordReset = () => {
  const mut = useMutation(async (email) => {
    const res = await axios.post("/users/requestReset", { email });
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return { isLoading: mut.isLoading, error: mut.error, requestReset: mut.mutate };
};

//resetPassword accepts {token,password}
export const useResetPassword = () => {
  const mut = useMutation(async ({ token, password }) => {
    const res = await axios.post("/users/resetPassword", { token, password });
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return { isLoading: mut.isLoading, error: mut.error, resetPassword: mut.mutate };
};

//====== POSTS ======

export const usePosts = () => {
  const query = useQuery("posts", async () => {
    const res = await axios.get("/posts");
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data.posts;
  });
  return { posts: query.data, isLoading: query.isLoading, error: query.error };
};

export const usePost = (postid) => {
  const query = useQuery(["post", postid], async () => {
    const res = await axios.get(`/posts/id/${postid}`);
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
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get("/posts/user", config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data.posts;
  });
  return { posts: query.data, isLoading: query.isLoading, error: query.error };
};

//createPost returns id onSuccess
export const useCreatePost = () => {
  const mut = useMutation(async ({title,content}) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.post("/posts", { title, content }, config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data.id;
  });
  return {isLoading:mut.isLoading,error:mut.error,createPost:mut.mutate};
}

//deletePost accespts an id 
export const useDeletePost = () => {
  const mut = useMutation(async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.delete(`/posts/id/${id}`, config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return {isLoading:mut.isLoading,error:mut.error,deletePost:mut.mutate};
}

//updatePost accespts {id,title,content}
export const useUpdatePost = () => {
  const mut = useMutation(async ({id,title,content}) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.patch(`/posts/id/${id}`, { title, content }, config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return {isLoading:mut.isLoading,error:mut.error,updatePost:mut.mutate};
}

//reportPost accespts an {id,report (string)}
export const useReportPost = () => {
  const mut = useMutation(async ({id,reason}) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.post(`/posts/report/${id}`, {reason}, config);
    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
    return res.data;
  });
  return {isLoading:mut.isLoading,error:mut.error,reportPost:mut.mutate};
}