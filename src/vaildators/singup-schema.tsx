import { z } from "zod";

// 비밀번호 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*#?&]{6,}$/;
// 전화번호 정규표현식
const phoneRegex = /^010\d{8}$/;

// formSchema를 만들어줍니다.
export const singUpFormSchema = z.object({
  // 이름[2글자 이상, 20글자 이하](필수)
  username: z
  .string()
  .min(2, { message: "이름은 2글자 이상이어야 합니다."})
  .max(100, { message: "이름은 100글자 이하여야 합니다."}),
  // 닉네임[2글자 이상, 20글자 이하](필수)
  nickname: z
  .string()
  .min(2, { message: "닉네임은 2글자 이상이어야 합니다."})
  .max(100, { message: "닉네임은 100글자 이하여야 합니다."}),
  // 이메일[이메일 형식, 아이디 입력시 뒤에 select로 사이트 추측](필수)
  email: z.string().email({ message: "올바른 이메일을 입력해주세요."}),
  // 성별[남, 여, 선택안함]
  gender_male: z.boolean(),
  gender_female: z.boolean(),
  gender_none: z.boolean(),
  // 주민번호 앞자리[만 14세 미만이면 가입 불가](필수)
  rrn: z.string().length(6, "주민번호 앞자리는 6자리여야 합니다."),
  // 연락처[숫자만 입력, 10자리 이상](필수)
  phone: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine(
      (value) => phoneRegex.test(value),
      "010으로 시작하는 11자리 숫자를 입력해주세요."
    ),
  // 주소[우편번호, 주소, 상세주소]
  address: z.string(),
  // 비밀번호[8글자 이상, 20글자 이하, 영문, 숫자, 특수문자, 대문자 포함](필수)
  password: z.string()
    .min(6, { message: "비밀번호는 최소 6글자 이상이어야 합니다."})
    .max(100, { message: "비밀번호는 100글자 이하여야 합니다."})
    .regex(passwordRegex
    ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
  // 비밀번호 확인(필수)
  passwordConfirm: z.string()
  .min(6, { message: "비밀번호는 최소 6글자 이상이어야 합니다."})
  .max(100, { message: "비밀번호는 100글자 이하여야 합니다."})
  .regex(passwordRegex
  ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
  // 관심있는 분야[여러개 선택 가능]
  interest: z.array(z.string()),
  // 자기소개[100자 이하]
  introduce: z.string().max(100, "자기소개는 100자 이하여야 합니다.")
});