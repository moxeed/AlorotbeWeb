import { Button, Grid, Input } from "@material-ui/core";
import { Avatar, CircularProgress } from "material-ui";
import { send } from "process";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { GetData, PostForm } from "../../Services/ApiService";

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
    <Grid xs={12} justify="center" container>
      <Grid xs={12}>
        <Avatar
          src={
            edit && file && file !== null
              ? URL.createObjectURL(file)
              : "https://api.alorotbe.com/Media/" + imageId
          }
          size={150}
        />
      </Grid>
      <Grid>
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
              color="primary"
            >
              انتخاب فایل
            </Button>
            <Button
              style={{ margin: 10 }}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              {sending ? <CircularProgress size={20} /> : "ارسال"}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={() => setEdit(true)}
            color="primary"
          >
            ویرایش
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
