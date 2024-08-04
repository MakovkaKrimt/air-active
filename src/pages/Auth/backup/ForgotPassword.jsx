import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, SvgIcon, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthMutations from "../../services/auth/authUseMutations";
import { useAuth } from "../../providers/AuthProvider";

export const ForgotPassword = () => {

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const mutation = AuthMutations.useRequestResPwd()

  React.useEffect(() => {
    if (mutation.isSuccess) {
      console.log('успех')
    }
  }, [mutation.isSuccess]);


  if (mutation.isError) {
    console.log(mutation.error.message)
  }

  const onSubmit = (data) => {
    mutation.mutate(data)
  };


  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="./media/logo_icon.svg"
        alt="Plus Icon"
        style={{
          width: "150px",
          heigth: "150px",
          background: "cover",
        }}
      />
      <Typography component="h1" variant="h5">
        Сброс пароля
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 2,
          textAlign: 'justify'
        }}
      >
        <Typography
          sx={{
            mb: 2
          }}
          variant="body2"
        >
          Укажите свой email, под которым вы зарегистрированы на сайте и на него будет отправлена информация о восстановлении пароля
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Электронная почта"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{
            mt: 1,
          }}
          {...register("email", {
            required: {
              value: true,
              message: "Введите email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <Button
          // disableRipple
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить запрос
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/auth/login">{"Вернуться к входу"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
