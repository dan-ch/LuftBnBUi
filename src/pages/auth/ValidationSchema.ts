import * as yup from "yup";

const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

const validationCredentials = {
  email: yup.string().email("Zły email").required("Email jest wymagany"),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(8, "Hasło jest za krótkie")
    .max(30, "Hasło jest za długie")
    .matches(REGEX_PASSWORD, "Hasło musi zawierać co najmniej jedną wielką i małą literę, znak specjalny oraz cyfrę"),
};

export const signUpSchema = yup.object().shape({
  ...validationCredentials,
  firstName: yup
    .string()
    .required("Imię jest wymagane")
    .min(3, "Imię jest za krótkie")
    .max(15, "Imię jest za długie"),
  lastName: yup
    .string()
    .required("Nazwisko jest wymagane")
    .min(3, "Nazwisko jest za krótkie")
    .max(15, "Nazwisko jest za długie"),
  password_confirmation: yup
    .string()
    .required("Musisz potwierdzić swoje hasło")
    .min(8, "Hasło jest za krótkie")
    .max(30, "Hasło jest za długie")
    .matches(REGEX_PASSWORD, "Hasło musi zawierać co najmniej jedną wielką i małą literę, znak specjalny oraz cyfrę"),
});

export const signInSchema = yup.object().shape(validationCredentials);
