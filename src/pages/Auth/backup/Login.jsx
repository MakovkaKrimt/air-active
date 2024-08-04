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
import { Link, useNavigate } from "react-router-dom";
import AuthMutations from "../../services/auth/authUseMutations";
import { useAuth } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput";

export const Login = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  const mutation = AuthMutations.useLoginUser()

  React.useEffect(() => {
    if (mutation.isSuccess) {
      auth.login(mutation.data.data);
    }
  }, [mutation.isSuccess]);


  if (mutation.isError) {
    console.log(mutation.error.message)
  }

  const onSubmit = (data) => {
    console.log(data)
    // toast.success('Пользователь успешно залогировался!')
    // navigate("/auth/register");
    // mutation.mutate(data)
  };


  return (
    <>
      <Typography component="h1" variant="h5">
        Вход в аккаунт
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          mt: 1,
        }}
      >
        {/* <TextField
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
        /> */}

        <PasswordInput
          register={register}
          errors={errors}
          labelText='Подтвердите пароль'
        />
        {/* <TextField
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
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="current-password"
          {...register("password", {
            required: {
              value: true,
              message: "Введите пароль",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        /> */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/auth/forgot-password">{"Забыли пароль?"}</Link>
          </Grid>
          <Grid item>
            <Link to="/auth/register">{"Зарегистрироваться"}</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}


// return (
//   <Box
//     sx={{
//       my: 8,
//       mx: 4,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     }}
//   >
//     <img
//       src="./media/logo_icon.svg"
//       alt="Plus Icon"
//       style={{
//         width: "150px",
//         heigth: "150px",
//         background: "cover",
//       }}
//     />
//     <Typography component="h1" variant="h5">
//       Вход в аккаунт
//     </Typography>
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       noValidate
//       sx={{
//         mt: 1,
//       }}
//     >
//       <TextField
//         margin="normal"
//         required
//         fullWidth
//         id="email"
//         label="Электронная почта"
//         name="email"
//         autoComplete="email"
//         autoFocus
//         sx={{
//           mt: 1,
//         }}
//         {...register("email", {
//           required: {
//             value: true,
//             message: "Введите email",
//           },
//         })}
//         error={!!errors.email}
//         helperText={errors.email ? errors.email.message : ""}
//       />

//       <TextField
//         margin="normal"
//         id="password"
//         label="Пароль"
//         variant="outlined"
//         type={showPassword ? "text" : "password"}
//         fullWidth
//         required
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//               >
//                 {showPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         autoComplete="current-password"
//         {...register("password", {
//           required: {
//             value: true,
//             message: "Введите пароль",
//           },
//         })}
//         error={!!errors.password}
//         helperText={errors.password ? errors.password.message : ""}
//       />

//       <Button
//         // disableRipple
//         type="submit"
//         fullWidth
//         variant="contained"
//         sx={{ mt: 3, mb: 2 }}
//       >
//         Войти
//       </Button>
//       <Grid container>
//         <Grid item xs>
//           <Link to="/auth/forgot-password">{"Забыли пароль?"}</Link>
//         </Grid>
//         <Grid item>
//           <Link to="/auth/register">{"Зарегистрироваться"}</Link>
//         </Grid>
//       </Grid>
//     </Box>
//   </Box>
