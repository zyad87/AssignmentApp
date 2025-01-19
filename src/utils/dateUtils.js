export function validateDateOfBirth(dob) {
  if (!dob) {
    return "Date of birth is required.";
  }
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 0) {
    return "Date of birth cannot be in the future.";
  }
  return null;
}
