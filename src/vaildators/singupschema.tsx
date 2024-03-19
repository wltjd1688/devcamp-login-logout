import { z } from "zod";

// 비밀번호 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*#?&]{6,}$/;
// 전화번호 정규표현식
const phoneRegex = /^010\d{8}$/;
// 역할 
const roleArray = ["admin", "user"];

// formSchema를 만들어줍니다.
const SingUpFormSchema = z.object({

  username: z
  .string()
  .min(2, { message: "이름은 2글자 이상이어야 합니다."})
  .max(100, { message: "이름은 100글자 이하여야 합니다."}),

  email: z.string().email({ message: "올바른 이메일을 입력해주세요."}),

  phone: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine(
      (value) => phoneRegex.test(value),
      "010으로 시작하는 11자리 숫자를 입력해주세요."
    ),

  role: z
    .string()
    .refine(
      (value) => roleArray.includes(value),
      "역할을 선택해주세요."
    ),

  password: z.string()
    .min(6, { message: "비밀번호는 최소 6글자 이상이어야 합니다."})
    .max(100, { message: "비밀번호는 100글자 이하여야 합니다."})
    .regex(passwordRegex
    ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),

  passwordConfirm: z.string()
  .min(6, { message: "비밀번호는 최소 6글자 이상이어야 합니다."})
  .max(100, { message: "비밀번호는 100글자 이하여야 합니다."})
  .regex(passwordRegex
  ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
});