export const validateRequired = value => value ? undefined : 'Campo Obrigatório'
 
export const validateMaxLength = max => value =>
  value && value.length > max ? `Máximo  ${max} caracteres` : undefined

export const validateMaxLength15 = validateMaxLength(15)

export const validateNumber = value => value && isNaN(Number(value)) ? 'Número inválido' : undefined

export const validateMinValue = min => value =>
  value && value < min ? `Mínimo de ${min}` : undefined

export const validateMinValue18 = validateMinValue(18)

export const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Email inválido' : undefined

export const validateMaxValue = value =>
  value && value > 65 ? 'You might be too old for this' : undefined

export const validateAol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined;

export const validateMatchPasswords = (value, allValues) =>
  value !== allValues.password ? 'Suas senhas não conferem!' : undefined