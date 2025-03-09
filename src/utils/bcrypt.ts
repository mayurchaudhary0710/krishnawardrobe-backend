import * as bcrypt from 'bcrypt';

export const hashGenerator = async (
  password: string | object,
  saltRounds: number = 10,
): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(`Error generating hash: ${err.message}`);
  }
};

// Compare Password: compares user password with stored hash
export const comparePassword = async (
  userpassword: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(userpassword, hash);
  } catch (err) {
    throw new Error(`Error comparing passwords: ${err.message}`);
  }
};
