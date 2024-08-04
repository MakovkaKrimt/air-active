import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormHelperText, TextField } from '@mui/material';
import { authSchema } from "../../services/auth/validationSchema";
import { ErrorRounded } from "@mui/icons-material";
// import { authSchema } from "../../services/auth/validationSchema";

export const INPUT_TYPES = {
    NEW_USERNAME: 'new_username',
    EMAIL: 'email',
    NEW_PASSWORD: 'new_password',
    CONFIRMED_PASSWORD: 'confirmed_password',
    TEST: 'test'
}

const { TEST } = INPUT_TYPES

const testSchema = yup.object().shape({
    [TEST]: yup
        .string()
        .required('Введите поле')
        .min(3, 'Минимальная длина - 3 символа'),
})


export const CustomComp = () => {

    const type = TEST

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'all'
        , resolver: yupResolver(testSchema)
    })


    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <TextField
                name={type}
                {...register(type)}
            />
            <p>{errors[type]?.message}</p>

            <Button type='submit'>Нажми</Button>
        </form>
    )
}