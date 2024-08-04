import { Box, TextField, Typography } from '@mui/material';
import { FORM_LABELS } from '../services/auth/constants/authConstants';

const { TEXTS } = FORM_LABELS


const TextInput = ({ type, register, errors }) => {


    const inputProps = {
        id: type,
        name: type,
        required: true,
        fullWidth: true,
        sx: {
            mt: 1,
        },
        ...register(type),
        error: !!errors[type],
        helperText: errors[type] ? errors[type].message : ""
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography
                variant='subtitle1'
                error
            >{TEXTS[type]}</Typography>
            <TextField {...inputProps} />
        </Box >
    )
}

export default TextInput








// return (
//     <>
//         <Typography>{labelText}</Typography>
//         <TextField
//             margin="normal"
//             id="password"
//             label="Пароль"
//             variant="outlined"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             required
//             InputProps={{
//                 endAdornment: (
//                     <InputAdornment position="end">
//                         <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                         >
//                             {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                     </InputAdornment>
//                 ),
//             }}
//             autoComplete="current-password"
//             {...register("password", {
//                 required: {
//                     value: true,
//                     message: "Введите пароль",
//                 },
//             })}
//             error={!!errors.password}
//             helperText={errors.password ? errors.password.message : ""}
//         />
//     </>
// )