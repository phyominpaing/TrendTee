import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import NameUpdateForm from "@/components/profile/NameUpdateForm";
import PasswordUpdateForm from "@/components/profile/PasswordUpdateForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { profileUpdateSchema } from "@/schema/user";
import {
  useCurrentUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileInfoMutation,
  useUploadAvatarMutation,
} from "@/store/slices/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, RefreshCcw, ShieldCheck, X } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

type ProfileFormValues = z.infer<typeof profileUpdateSchema>;

const Profile = () => {
  const {
    isLoading: isGetting,
    isError,
    data: user,
    refetch,
  } = useCurrentUserQuery();
  const [avatar, setAvatar] = useState<string | null>(null);
  // Mutations React Query
  const [uploadAvatarMutation, { isLoading }] = useUploadAvatarMutation();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileInfoMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  // Upload profile image
  const imageOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      toast.error("Profile image size must not be more than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const avatarUploadHandler = async () => {
    if (!avatar) {
      toast.error("Please select your profile image first.");
      return;
    }

    try {
      await uploadAvatarMutation({ image_url: avatar }).unwrap();
      toast.success("Profile image uploaded successfully.");
      setAvatar(null);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload profile image. Please try again.");
    }
  };

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update profile info

  const profileInfoUpdateHandler = async (data: ProfileFormValues) => {
    try {
      // ✅ Update name & email
      await updateUserProfile({
        name: data.name,
        email: data.email,
      }).unwrap();

      // ✅ Update password only if user typed it
      if (data.oldPassword && data.newPassword && data.confirmPassword) {
        await updatePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }).unwrap();

        toast.success("Password updated successfully");
      }

      toast.success("Profile updated successfully");

      // ✅ Reset form
      reset({
        name: data.name,
        email: data.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  if (isGetting) {
    return (
      <section className="mt-6">
        <Card className="overflow-hidden border-slate-200/80 bg-white/90 shadow-xl shadow-slate-900/5">
          <CardContent className="grid gap-8 p-6 md:p-8 lg:grid-cols-[280px_1fr]">
            <div className="space-y-5">
              <div className="h-8 w-28 animate-pulse rounded-full bg-slate-200" />
              <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
            </div>
            <div className="space-y-4">
              <div className="h-8 w-44 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className="mt-6">
        <Card className="border-red-100 bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Unable to load profile
            </CardTitle>
            <CardDescription>
              We could not fetch your account details right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              onClick={() => refetch()}
              className="rounded-xl bg-slate-900 hover:bg-slate-800"
            >
              <RefreshCcw className="size-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <Card className="overflow-hidden border border-white/60 bg-white/90 shadow-2xl shadow-slate-900/10">
        <CardHeader className="border-b border-slate-200 bg-linear-to-r from-slate-50 via-white to-slate-50 px-6 py-6 md:px-8">
          <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your personal profile details and keep your account identity
            up to date.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid items-start gap-8 p-6 md:p-8 lg:grid-cols-[280px_1fr]">
          <div className="self-start rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase text-slate-500">
              Profile
            </div>

            <div className="mt-5 flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={avatar ?? user?.avatar?.[0]?.url} />
                  {!user?.avatar?.[0]?.url && (
                    <AvatarFallback className="text-2xl font-semibold">
                      {user?.name.slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
                >
                  <Camera className="size-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={imageOnChangeHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-4 text-lg font-semibold text-slate-900">
                {user.name}
              </p>

              <p className="text-sm text-slate-500">{user.email}</p>
              <p className="text-sm text-slate-500">{user.role}</p>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              Max profile image size: 10MB
            </p>

            <div className={`relative mt-5 ${!avatar ? "hidden" : ""}`}>
              {/* <Button
                type="button"
                onClick={() => setAvatar(null)}
                className="absolute -top-2.5 -right-1 z-10 h-6 w-6 rounded-full border-2 border-slate-200 bg-white p-0 text-slate-600 shadow-md hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="size-3" />
              </Button> */}

              <Button
                type="button"
                onClick={avatarUploadHandler}
                disabled={!avatar || isLoading}
                className={`h-10 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 ${isLoading ? "animate-pulse" : ""}`}
              >
                Upload
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(profileInfoUpdateHandler)}
            className="space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <NameUpdateForm register={register} error={errors.name} />

              <EmailUpdateForm register={register} error={errors.email} />

              <PasswordUpdateForm
                register={register}
                error={{
                  oldPassword: errors.oldPassword,
                  newPassword: errors.newPassword,
                  confirmPassword: errors.confirmPassword,
                }}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center  gap-3">
                <div className="rounded-xl bg-white p-2 text-slate-600 shadow-sm">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Account Security
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Your account is protected with secure session cookies and
                    server-side authentication checks.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">
                Role and permissions
              </h3>
              <div className="flex items-center gap-3">
                <p className="mt-1 text-sm text-slate-500">
                  Current access level:
                </p>
                <p className="mt-1 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                  {user.role === "admin" ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  !isDirty || isSubmitting || isUpdating || isUpdatingPassword
                }
                className="h-10 rounded-xl bg-slate-900 px-5 text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
