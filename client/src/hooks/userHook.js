import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAuthConfig } from "./authHook";
import axios from "axios";

//====== USERS ======

/**
 * useMe apiHook to get the current user data.
 * @returns {Object} Query user data, isLoading, and error
 */
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
        async ({ email, password, rememberMe }) => {
            if (email === "" || password === "") {
                throw new Error("Please fill out all fields");
            }
            const res = await axios.post(
                "/users/login",
                { email, password, rememberMe },
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