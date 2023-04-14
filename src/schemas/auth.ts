import * as yup from 'yup';
import i18n from '@/translations';

const MIN_PASSWORD_LENGTH = 8;

const login = yup.object({
  name: yup.string().required(i18n.t('schemas:auth.name.required')),
  password: yup.string().required(i18n.t('schemas:auth.password.required')),
});

const passwordRecovery = yup.object({
  email: yup
    .string()
    .required(i18n.t('schemas:auth.email.required'))
    .email(i18n.t('schemas:auth.email.valid')),
});

const register = login.concat(passwordRecovery).shape({
  password: yup
    .string()
    .required(i18n.t('schemas:auth.password.required'))
    .min(
      MIN_PASSWORD_LENGTH,
      i18n.t('schemas:auth.password.minLength', {
        minLength: MIN_PASSWORD_LENGTH,
      }),
    ),
  confirmPassword: yup
    .string()
    .required(i18n.t('schemas:auth.confirmPassword.required'))
    .oneOf([yup.ref('password')], i18n.t('schemas:auth.confirmPassword.match')),
});

export default {
  login,
  passwordRecovery,
  register,
};
