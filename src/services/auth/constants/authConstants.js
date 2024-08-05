export const INPUT_TYPES = {
  NEW_USERNAME: "new_username",
  EMAIL: "email",
  NEW_PASSWORD: "new_password",
  CONFIRMED_PASSWORD: "confirmed_password",
};

export const REGISTER_INPUTS = [
  //   INPUT_TYPES.NEW_USERNAME,

  INPUT_TYPES.EMAIL,
  INPUT_TYPES.NEW_PASSWORD,
  // INPUT_TYPES.CONFIRMED_PASSWORD,
];

export const AUTOCOMPLITE_INPUT_TYPES = {
  [INPUT_TYPES.NEW_USERNAME]: "username",
  [INPUT_TYPES.EMAIL]: "email",
  [INPUT_TYPES.NEW_PASSWORD]: "new_password",
  [INPUT_TYPES.CONFIRMED_PASSWORD]: "new_password",
};

export const FORM_LABELS = {
  TITLES: {
    REGISTER: "Регистрация",
    LOGIN: "Логин",
    FORGOT_PWD: "Воостановление пароля",
    RESET_PWD: "Смена пароля",
  },

  TEXTS: {
    [INPUT_TYPES.NEW_USERNAME]: "Имя пользователя",
    [INPUT_TYPES.EMAIL]: "Электронная почта",
    [INPUT_TYPES.NEW_PASSWORD]: "Придумайте пароль",
    [INPUT_TYPES.CONFIRMED_PASSWORD]: "Повторите пароль",
  },

  HELPERS: {
    [INPUT_TYPES.NEW_USERNAME]:
      "Придумайте имя пользователя, содержащее английские буквы и цифры общей длиной более 3 символов",
    [INPUT_TYPES.NEW_PASSWORD]:
      "Придумайте пароль, содержащий как минимум одну цифру, одну прописную и одну строчную букву общей длиной более 8 символов",

    // [INPUT_TYPES.EMAIL]: 'Электронная почта',
    // [INPUT_TYPES.NEW_PASSWORD]: 'Придумайте пароль',
    // [INPUT_TYPES.CONFIRMED_PASSWORD]: 'Повторите пароль',
  },

  VALIDATION: {
    [INPUT_TYPES.NEW_USERNAME]: {
      REQUIRED: "Введите имя",
      MIN_LENGTH: "Длина должна быть не менее 3 символов",
      INVALID_PATTERN: "Некорректно введенное имя",
    },
    [INPUT_TYPES.EMAIL]: {
      REQUIRED: "Введите email",
      INVALID_PATTERN: "Некорректно введенный email",
      EXISTS: "Пользователь с таким email уже существует",
    },
    [INPUT_TYPES.NEW_PASSWORD]: {
      REQUIRED: "Введите пароль",
      MIN_LENGTH: "Длина должна быть не менее 8 символов",
      MAX_LENGTH: "Длина должна быть не более 16 символов",
      INVALID_PATTERN: "Некорректно введенный пароль",
    },
  },

  BUTTONS: {
    REGISTER: "Зарегестрироваться",
    LOGIN: "Войти",
    FORGOT_PWD: "Оправить",
    RESET_PWD: "Сохранить изменения",
  },
  LINKS: {
    REGISTER: {
      HAS_ACCOUNT: "Уже есть аккаунт?",
      LOGIN: "Войти в аккаунт",
    },
  },
};

// REGISTER: {
//     TEXTS: {
//         TITLE: 'Регистрация',
//         USERNAME: 'Придумайте имя пользователя',
//         EMAIL: 'Электронная почта',
//         PASSWORD: 'Придумайте пароль',
//         CONFIRM_PWD: 'Подтвердите пароль',
//         BUTTON: 'Зарегистрироваться'
//     },
//     ERRORS: {
//         USERNAME: 'Укажите имя',
//         EMAIL: 'Укажите e-mail',
//         PASSWORD: 'Придумайте пароль',
//         CONFIRM_PWD: 'Подтвердите пароль'
//     }
// },
// LOGIN: {
//     TEXTS: {
//         TITLE: 'Регистрация',
//         USERNAME: 'Придумайте имя пользователя',
//         EMAIL: 'Электронная почта',
//         PASSWORD: 'Придумайте пароль',
//         CONFIRM_PWD: 'Подтвердите пароль',
//         BUTTON: 'Зарегистрироваться'
//     },
//     ERRORS: {
//         USERNAME: 'Укажите имя',
//         EMAIL: 'Укажите e-mail',
//         PASSWORD: 'Придумайте пароль',
//         CONFIRM_PWD: 'Подтвердите пароль'
//     }
