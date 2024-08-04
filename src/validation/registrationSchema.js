import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  username: yup.string().required("Придумайте имя"),
  email: yup
    .string()
    .email("Некорректно введенный email")
    .required("Введите email"),
  password: yup
    .string()
    .test(
      "len",
      "Используйте пароль не менее 7 символов",
      (val) => val === undefined || val.length === 0 || val.length >= 8
    )
    .required("Введите пароль"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});
