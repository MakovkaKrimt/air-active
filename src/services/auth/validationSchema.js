import * as yup from "yup";
import { FORM_LABELS, INPUT_TYPES } from "./constants/authConstants";

const { NEW_USERNAME, EMAIL, NEW_PASSWORD, CONFIRMED_PASSWORD } = INPUT_TYPES;
const { VALIDATION } = FORM_LABELS;

const userNameMessages = VALIDATION[NEW_USERNAME];
const emailMessages = VALIDATION[EMAIL];
const newPwdMessages = VALIDATION[NEW_PASSWORD];
const confPwdMessages = VALIDATION[CONFIRMED_PASSWORD];

export const authSchema = yup.object().shape({
  //   [NEW_USERNAME]: yup
  //     .string()
  //     .required(userNameMessages.REQUIRED)
  //     .matches(/^[A-Za-z0-9]+$/, userNameMessages.INVALID_PATTERN)
  //     .min(3, userNameMessages.MIN_LENGTH),
  [EMAIL]: yup
    .string()
    .email(emailMessages.INVALID_PATTERN)
    .required(emailMessages.REQUIRED),
  //   [NEW_PASSWORD]: yup
  //     .string()
  //     .matches(
  //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //       newPwdMessages.INVALID_PATTERN
  //     ),
  //     // .min(8, newPwdMessages.MIN_LENGTH)
  //     // .min(3, userNameMessages.MIN_LENGTH)
  //     .required("Введите пароль"),
  //   [CONFIRMED_PASSWORD]: yup
  //     .string()
  //     .oneOf([yup.ref(NEW_PASSWORD), null], "Пароли не совпадают")
  //     // .min(3, userNameMessages.MIN_LENGTH)
  //     .required("Подтвердите пароль"),
});
