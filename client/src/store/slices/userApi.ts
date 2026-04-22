import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface loginInput {
  email: string;
  password: string;
}

interface registerInput extends loginInput {
  name: string;
}

interface avatarUploadInput {
  image_url: string;
}

interface userProfileUpdateInput {
  name: string;
  email: string;
}

interface userPasswordUpdateInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerInput) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data: loginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (data: avatarUploadInput) => ({
        url: "/upload",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserProfileInfo: builder.mutation({
      query: (data: userProfileUpdateInput) => ({
        url: "/user/update",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword : builder.mutation({
      query: (data: userPasswordUpdateInput) => ({
        url: "/update-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    })
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useUpdateUserProfileInfoMutation,
  useUpdatePasswordMutation
} = userApiSlice;
