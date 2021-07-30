import { Button, Grid } from "@material-ui/core";
import { Avatar, CircularProgress } from "material-ui";
import React, { useEffect } from "react";
import { useState } from "react";
import { GetData, PostForm } from "../../Services/ApiService";
import User from "../../Assets/user.png";

export const ProfileImage = () => {
  const [edit, setEdit] = useState(false);
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | undefined | null>(null);
  const [imageId, setImageId] = useState<number | null>();

  useEffect(() => {
    GetData("Identity/UserInfo").then((res) => setImageId(res.profileId));
  }, [edit]);

  const handleSubmit = () => {
    if (!file) return;

    const form = new FormData();
    form.append("image", file as File, file?.name);

    setSending(true);
    PostForm("Identity/Image", form)
      .then(() => {
        setEdit(false);
        setSending(false);
      })
      .catch();
  };

  const input = React.createRef<HTMLInputElement>();

  return (
    <Grid xs={12} justify="center" alignItems="center" container>
      <Grid xs={6}>
        <Avatar
          src={
            edit && file && file !== null
              ? URL.createObjectURL(file)
              : imageId && imageId !== null
              ? "https://api.alorotbe.com/Media/" + imageId
              : User
          }
          size={150}
        />
      </Grid>
      <Grid xs={6}>
        {edit ? (
          <>
            <input
              ref={input}
              type="file"
              onChange={(e) =>
                setFile((e.target as HTMLInputElement)?.files?.item(0))
              }
              style={{ display: "none" }}
            />
            <Button
              disabled={sending}
              style={{ margin: 10 }}
              onClick={() => input.current?.click()}
              variant="contained"
              color="secondary"
            >
              انتخاب فایل
            </Button>
            <Button
              style={{ margin: 10 }}
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              {sending ? <CircularProgress size={20} /> : "ارسال"}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={() => setEdit(true)}
            color="secondary"
          >
            ویرایش
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
