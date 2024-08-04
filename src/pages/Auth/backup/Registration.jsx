import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../../validation/registrationSchema";
// import { useCheckEmail } from "../../services/queries";
import { Pending } from "@mui/icons-material";
// import { useCreateUser } from "../../services/mutations";
import AuthMutations from "../../services/auth/authUseMutations";
import { useAuth } from "../../providers/AuthProvider";

export const Registration = () => {

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    // resolver: yupResolver(registrationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)

  const handleClickShowPwd = () => setShowPassword(!showPassword);
  const handleMouseDownPwd = () => setShowPassword(!showPassword);

  const handleClickShowConfirmedPwd = () =>
    setShowConfirmedPassword(!showConfirmedPassword);
  const handleMouseDownConfirmedPwd = () =>
    setShowConfirmedPassword(!showConfirmedPassword);

  const mutation = AuthMutations.useRegisterUser()


  // React.useEffect(() => {
  //   if (mutation.isSuccess) {
  //     auth.registration(mutation.data.data);
  //   }
  // }, [mutation.isSuccess]);


  if (mutation.isError) {
    console.log(mutation.error.message)
  }

  const onSubmit = (data) => {
    console.log(data)
    // mutation.mutate(data)
  };


  return (
    <>
      <Typography component="h1" variant="h4">
        Регистрация
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 1,
          maxWidth: "550px",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Имя пользователя"
          name="userName"
          sx={{
            mt: 1,
          }}
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName ? errors.userName.message : ""}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Электронная почта"
          name="email"
          sx={{
            mt: 1,
          }}
          {...register("email", {})}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        <TextField
          margin="normal"
          id="password"
          label="Пароль"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPwd}
                  onMouseDown={handleMouseDownPwd}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />

        <TextField
          margin="normal"
          id="confirmedPassword"
          label="Повторите пароль"
          variant="outlined"
          type={showConfirmedPassword ? "text" : "password"}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmedPwd}
                  onMouseDown={handleMouseDownConfirmedPwd}
                >
                  {showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("confirmedPassword")}
          error={!!errors.confirmedPassword}
          helperText={
            errors.confirmedPassword ? errors.confirmedPassword.message : ""
          }
        />

        <Button
          disableRipple
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            textAlign: "right",
            gap: 2,
          }}
        >
          <Grid item>Уже есть аккаунт?</Grid>
          <Grid item>
            <Link to="/auth/login">Войти в аккаунт</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

