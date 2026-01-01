import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../layout/LoadingSpinner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMutation, useReactiveVar } from "@apollo/client/react";
import { toast } from "sonner";
import { getInitials } from "@/utils/helpers";
import { userVar } from "@/apollo/apollo-vars";
import { UPLOAD_AVATAR_MUTATION } from "@/graphql/mutations/user.mutation";
import { CURRENT_USER } from "@/graphql/queries/user.queries";

const UploadAvatar = () => {
  const user = useReactiveVar(userVar);
  const [avatar, setAvatar] = useState("");

  const [uploadUserAvatar, { loading, error }] = useMutation(UPLOAD_AVATAR_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER }],
    onCompleted: () => {
      toast.success("Avatar uploaded successfully");
    },
  });

  useEffect(() => {
    if (error) toast.error(error?.message);
  }, [error]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const submitHandler = async () => {
    if (!avatar) return toast.error("Please select avatar");

    await uploadUserAvatar({
      variables: { avatar },
    });
  };
  return (
    <div>
      <Card className="w-full max-w-lg py-6">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Avatar</CardTitle>
          <CardDescription>Upload avatar to update your profile</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 w-full items-center max-w-sm">
            <Label htmlFor="avatar">Avatar</Label>
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={!avatar ? user?.avatar?.url : avatar} />
                <AvatarFallback>{getInitials(user?.name!)}</AvatarFallback>
              </Avatar>
              <Input id="avatar" type="file" accept="images/*" onChange={onChange} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading} onClick={submitHandler}>
            {loading ? <LoadingSpinner /> : "Upload"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadAvatar;
