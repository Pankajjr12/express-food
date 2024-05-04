export function generatePassword() {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const length = 8;

  let password = '';

  // Append an uppercase letter
  const uppercaseIndex = Math.floor(Math.random() * uppercaseLetters.length);
  password += uppercaseLetters[uppercaseIndex];

  // Append a number
  const numberIndex = Math.floor(Math.random() * numbers.length);
  password += numbers[numberIndex];

  // Fill the remaining characters with lowercase letters
  for (let i = 0; i < length - 2; i++) {
      const lowercaseIndex = Math.floor(Math.random() * lowercaseLetters.length);
      password += lowercaseLetters[lowercaseIndex];
  }

  // Shuffle the password to randomize the position of the uppercase letter and number
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}
