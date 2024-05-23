const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.*$_!\\\-+@;:/\\\\|])[A-Za-z\d.*$_!\\\-+@;:/\\\\|]{12,250}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z]{3,50}$/;

export const isValidPassword = (password: string) => {
  return (
    password.length >= 12 &&
    password.length <= 250 &&
    PASSWORD_REGEX.test(password)
  );
};

export const isValidEmail = (email: string) => {
  return !!email.match(EMAIL_REGEX);
};

export const isValidName = (name: string) => {
  return !!name.match(NAME_REGEX);
};
