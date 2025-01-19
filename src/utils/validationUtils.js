export function validateName(name) {
  if (!name) {
    return "Name is required.";
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return "Please enter a valid name (letters only).";
  }
  return null;
}

export function validateEmail(email) {
  if (!email) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
}
