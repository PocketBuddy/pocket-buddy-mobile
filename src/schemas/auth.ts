import * as yup from 'yup';
import i18n from '@/translations';

// Min 8, letters, numbers, symbols
const PASSWORD_REGEX = /^(?=.*[a-z,A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRecovery = yup.object({
  email: yup
    .string()
    .required(i18n.t('schemas:auth.email.required'))
    .matches(EMAIL_REGEX, i18n.t('schemas:auth.email.valid')),
});

const login = passwordRecovery.shape({
  password: yup.string().required(i18n.t('schemas:auth.password.required')),
});

const register = login.concat(passwordRecovery).shape({
  name: yup.string().required(i18n.t('schemas:auth.name.required')),
  password: yup
    .string()
    .required(i18n.t('schemas:auth.password.required'))
    .matches(PASSWORD_REGEX, i18n.t('schemas:auth.password.valid')),
  confirmPassword: yup
    .string()
    .required(i18n.t('schemas:auth.confirmPassword.required'))
    .oneOf([yup.ref('password')], i18n.t('schemas:auth.confirmPassword.match')),
});

export default {
  passwordRecovery,
  login,
  register,
};
