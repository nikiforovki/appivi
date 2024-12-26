import * as yup from 'yup';

const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Номер карты обязателен')
    .min(16, 'Номер карты должен содержать 16 цифр'),
  csv: yup
    .string()
    .required('CSV обязателен')
    .min(3, 'CSV должен содержать 3 цифры'),
  expires: yup
    .string()
    .required('Срок действия обязателен')
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'Срок действия должен быть в формате MM/YY',
    ),
});

export default validationSchema;
