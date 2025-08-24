import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";

const generateOtp = async () => {
  const plainOtp = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVXYZ")(6);

  return await bcrypt.hash(plainOtp, 10);
};

const verifyOtp = async (plainOtp: string, hash: string) => {
  return await bcrypt.compare(plainOtp, hash);
};

export { generateOtp, verifyOtp };
