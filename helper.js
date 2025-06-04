export const validateForm = ({ username, password }) => {
  const errors = {};
  if (/\s/.test(username)) {
    errors.username = "Username must not contain spaces.";
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters, contain at least one number, and one special character.";
  }

  return errors;
};

export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  if (parts.length > 2) return parts[0];
  else return null; 
};