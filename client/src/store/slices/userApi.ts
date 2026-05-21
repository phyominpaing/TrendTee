import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface loginInputs {
  email: string;
  password: string;
}

interface registerInputs extends loginInputs {
  name: string;
}

interface avatarUploadInput {
  image_url: string;
}

interface userProfileUpdateInputs {
  name: string;
  email: string;
}

interface userPasswordUpdateInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordInputs {
  token: string;
  newPassword: string;
}

interface ForgotPasswordInput {
  email: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerInputs) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
       invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data: loginInputs) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
       invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
       invalidatesTags: ["User"],
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
      query: (data: userProfileUpdateInputs) => ({
        url: "/user/update",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (data: userPasswordUpdateInputs) => ({
        url: "/update-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: ForgotPasswordInput) => ({
        url: "/forgot-password",
        method: "POST",
        body: {
          email: data.email,
        },
        credentials: "include",
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: ResetPasswordInputs) => ({
        url: `/reset-password/${data.token}`,
        method: "POST",
        body: {
          newPassword: data.newPassword,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useUpdateUserProfileInfoMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = userApiSlice;
