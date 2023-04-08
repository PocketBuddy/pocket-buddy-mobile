import * as yup from 'yup';
import i18n from '@/translations';

const MIN_PASSWORD_LENGTH = 8;

const login = yup.object({
  name: yup.string().required(i18n.t('schemas:auth.name.required')),
  password: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      i18n.t('schemas:auth.password.minLength', {
        minLength: MIN_PASSWORD_LENGTH,
      }),
    )
    .required(i18n.t('schemas:auth.password.required')),
});

const passwordRecovery = yup.object({
  email: yup
    .string()
    .email(i18n.t('schemas:auth.email.valid'))
    .required(i18n.t('schemas:auth.email.required')),
});

const register = login.concat(passwordRecovery).shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], i18n.t('schemas:auth.confirmPassword.match'))
    .required(i18n.t('schemas:auth.confirmPassword.required')),
});

export default {
  login,
  passwordRecovery,
  register,
};
