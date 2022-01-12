import { useQuery,useMutation } from "react-query";
import axios from "axios";

//USERS

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

//POSTS

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
