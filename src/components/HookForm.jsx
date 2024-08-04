import { useForm } from "react-hook-form"
import { TextField } from '@mui/material';

export const HookForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'submit' })


    const onSubmit = () => {
        console.log('submit')
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                {...register('email', {
                    required: { value: true, message: "The email is required" },
                    maxLength: { value: 7, message: "Password`s length must be less than 10 chars" },
                })}
                placeholder='Email'
            />

            {errors.email && <span>{errors.email.message}</span>}
            {/* <p>{errors.email?.message}</p> */}
        </form>
    )
}