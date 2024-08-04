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
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import AuthMutations from "../../services/auth/authUseMutations";
import { useAuthStateContext } from "../../providers/AuthProvider";

export const ResetPassword = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const auth = useAuthStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)

  const handleClickShowPwd = () => setShowPassword(!showPassword);
  const handleMouseDownPwd = () => setShowPassword(!showPassword);

  const handleClickShowConfirmedPwd = () =>
    setShowConfirmedPassword(!showConfirmedPassword);
  const handleMouseDownConfirmedPwd = () =>
    setShowConfirmedPassword(!showConfirmedPassword);

  const mutation = AuthMutations.useResetPwd()

  React.useEffect(() => {
    if (mutation.isSuccess) {
      console.log('Пароль успешно изменен!')
    }
  }, [mutation.isSuccess]);


  if (mutation.isError) {
    console.log(mutation.error.response.data.message)
    // console.log(mutation.error.message)
  }

  const onSubmit = (data) => {
    mutation.mutate({ token, email, ...data })
    // console.log(`Data: ${data}`)
    // console.log(`Token: ${searchParams.get('token')}`)
    // console.log(`Email: ${searchParams.get('email')}`)
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
        Новый пароль
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
          Придумайте новый пароль
        </Typography>
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
            <Link to="/login">{"Вернуться к входу"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
