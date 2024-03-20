import { z } from "zod";

// 비밀번호 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*#?&]{6,}$/;

// formSchema를 만들어줍니다.
export const LogInFormSchema = z.object({
  // 이메일[이메일 형식, 아이디 입력시 뒤에 select로 사이트 추측](필수)
  email: z.string().email({ message: "올바른 이메일을 입력해주세요."}),
  // 주민번호 앞자리[만 14세 미만이면 가입 불가](필수)
  // 비밀번호[8글자 이상, 20글자 이하, 영문, 숫자, 특수문자, 대문자 포함](필수)
  password: z.string()
    .min(6, { message: "비밀번호는 최소 6글자 이상이어야 합니다."})
    .max(100, { message: "비밀번호는 100글자 이하여야 합니다."})
    .regex(passwordRegex
    ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
});