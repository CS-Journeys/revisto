import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { getAuthConfig } from "./authHook";
import { useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import axios from "axios";
import { useEffect, useState } from "react";

//====== POSTS ======
export const useRefreshPosts = (curr) => {
  const [postParams, setParams] = useState("Home");
  const qc = useQueryClient();

  if (curr === "About") {
    return;
  }

  if (curr !== postParams) {
    setParams(curr);
    qc.invalidateQueries("posts");
    qc.invalidateQueries("featuredposts");
  }
};

export const usePosts = (params) => {
  const [posts, setPosts] = useState([]);
  const { ref, inView } = useInView();
  const query = useInfiniteQuery(
    "posts",
    async ({ pageParam = 0 }) => {
      params.page = pageParam;
      const res = await axios.get(
        "/posts",
        { params: params },
        getAuthConfig()
      );
      //Error handling
      if (res.data.err) {
        throw new Error(res.data.err);
      }
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length > 2 && pages[pages.length - 2][0] === lastPage[0]) {
          return null;
        }
        return pages.length;
      }
    }
  );
  useEffect(() => {
    if (query.data) {
      const flat = query.data.pages.map((page) => page.posts).flat();
      // const filter = flat.filter((c, index) => {
      //   return flat.indexOf(c) === index;
      // });
      setPosts(flat);
    }
  }, [query.data]);

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  return {
    posts: posts,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    loadMoreRef: ref,
    hasMore: query.hasNextPage
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

//Gets the featured posts
export const useFeaturedPosts = () => {
    const query = useQuery("featuredposts", async () => {
        const res = await axios.get("/posts/featured");
        if (res.data.err) {
            throw new Error(res.data.err);
        }
        return res.data.posts;
    });
    return {
        posts: query.data,
        isLoading: query.isLoading,
        error: query.error,
    }
}

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
        qc.invalidateQueries("featuredposts");
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
        qc.invalidateQueries("featuredposts");
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
        qc.invalidateQueries("featuredposts");
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

export const useReactPost = () => {
  const mut = useMutation(async ({id, reaction}) => {
      console.log(reaction);
    const res = await axios.patch(
      `/posts/react/${id}`,
      { reaction },
      getAuthConfig()
    );

    //Error handling
    if (res.data.err) {
      throw new Error(res.data.err);
    }
  });
  return {
    isLoading: mut.isLoading,
    error: mut.error,
    reactPost: mut.mutate,
  };
};
