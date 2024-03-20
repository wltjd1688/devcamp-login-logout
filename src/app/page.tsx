"use client";
// Singup page
/** 디자인
 * 1 페이지
 * - 로그인칸 이메일, 비밀번호, 로그인 / 카카오
 * - 이미 회원가입 하셨나요? 로그인하기
 * 2-1 페이지
 * - 회원가입 폼
 * - 구성은 위와 같이 구성함
 * 2-2 페이지
 * - 2페이지와 같음
 * 추가 페이지(토스트)
 * - 회원가입 완료 페이지로 감사인사 띄우기
 */

/** 구성요소(3 step)
 *1페이지
 * - 이름[2글자 이상, 20글자 이하](필수)
 * - 닉네임[2글자 이상, 20글자 이하](필수)
 * - 이메일[이메일 형식, 아이디 입력시 뒤에 select로 사이트 추측](필수)
 * - 성별[남, 여, 선택안함]
 * - 주민번호 앞자리[만 14세 미만이면 가입 불가](필수)
 * - 연락처[숫자만 입력, 10자리 이상](필수)
 * + 주소[우편번호, 주소, 상세주소]
 * 2-1페이지
 * - 비밀번호[8글자 이상, 20글자 이하, 영문, 숫자, 특수문자, 대문자 포함](필수)
 * - 비밀번호 확인(필수)
 * 2-2페이지(추가 질문)
 * - 관심있는 분야[여러개 선택 가능]
 * - 자기소개[100자 이하]
 * 추가 페이지(토스트)
 */

/** 기능
 * - 로그인 페이지에서 회원가입하기 버튼을 클릭하면 오른쪽 그림이 왼쪽으로 이동하면서 왼쪽의 로그인폼을 가리고 오른쪽의 회원가입 폼을 띄워줌
 * - 회원가입 폼은 Tabs로 구성할 예정(2-1, 2-2페이지)
 * - 3페이지는 다이얼 로그로 구성
 */

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import { singUpFormSchema } from "@/vaildators/singup-schema";
import { LogInFormSchema } from "@/vaildators/login-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function StertMembership() {
  // login과 singup을 구분하기 위한 state
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();

  // useForm을 사용하여 form을 만들어줍니다.
  const logInForm = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const singUpForm = useForm<z.infer<typeof singUpFormSchema>>({
    resolver: zodResolver(singUpFormSchema),
    defaultValues: {
      username: "",
      nickname: "",
      email: "",
      gender: "남",
      phone: "",
      password: "",
      passwordConfirm: "",
      interest: "",
      introduce: "",
    },
  });

  function LogInFormSchemaOnSubmit(data: z.infer<typeof LogInFormSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  // form을 제출했을 때 실행되는 함수
  function onSubmit(data: z.infer<typeof singUpFormSchema>) {
    const errors = [];
    // 각 필드가 비어 있는지 확인하여 errors 배열에 추가합니다.
    if (data.username === "") errors.push("이름");
    if (data.nickname === "") errors.push("닉네임");
    if (data.email === "") errors.push("이메일");
    if (data.phone === "") errors.push("연락처");
    if (data.password === "") errors.push("비밀번호");
    if (data.passwordConfirm === "") errors.push("비밀번호 확인");

    // 에러가 있다면 토스트를 통해 지적합니다.
    if (errors.length > 0) {
      const errorMessage = errors.join(", ") + "을(를) 입력해주세요.";
      toast({
        title: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
    } else {
      // 에러가 없다면 form 데이터를 출력합니다.
      alert(JSON.stringify(data, null, 2));
    }
  }

  return (
    <div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Card className=" w-[380px] md:w-[680px] overflow-x-hidden">
          {/* 큰 카드를 만들고, 그림이 넘어가면서 회원가입과 로그인을 나눌것임 
        1. 가로 폭에 따라서 그림을 표시할지 말지를 정함(테블릿 크기를 기준으로 할것)
        2. motion.div를 이용하여 애니메이션을 구성할 것*/}
          <motion.div
            className={cn("space-y-3", { hidden: step === 1 })}
            animate={{ translateX: `${step * -100}%` }}
            transition={{ ease: "easeInOut" }}
          >
            <CardHeader>
              <CardTitle>로그인</CardTitle>
            </CardHeader>
            <Form {...logInForm}>
              <CardContent>
                <form
                  onSubmit={logInForm.handleSubmit(LogInFormSchemaOnSubmit)}
                  className="relative overflow-x-hidden space-y-3"
                >
                  <FormField
                    control={logInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="hello@sparta-devcamp.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={logInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>passowrd</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-[100%] my-5" type="submit">
                    로그인하기
                  </Button>
                </form>
                <hr />
                <p className=" text-sm text-center">
                  아직 회원이 아니신가요?
                  <Button
                    type="button"
                    className={cn({ hidden: step === 1 })}
                    variant="link"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    회원 가입하기
                  </Button>
                </p>
              </CardContent>
            </Form>
            {/* <image href="public/vercel.svg" width={300} /> */}
          </motion.div>
          <motion.div
            className={cn("space-y-3", { hidden: step === 0 })}
            animate={{ translateX: `${(1 - step) * 100}%` }}
            style={{ translateX: `${(1 - step) * 100}%` }}
            transition={{ ease: "easeInOut" }}
          >
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
            </CardHeader>
            <Form {...singUpForm}>
              <CardContent>
                <form
                  onSubmit={singUpForm.handleSubmit(onSubmit)}
                  className="relative overflow-x-hidden space-y-3"
                >
                  <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="space-y-3">
                      <FormField
                        control={singUpForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>이름</FormLabel>
                            <FormControl>
                              <Input placeholder="홍길동" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>닉네임</FormLabel>
                            <FormControl>
                              <Input placeholder="홍길동" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>이메일</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="hello@sparta-devcamp.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>성별</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="남" id="r1" />
                                  <Label htmlFor="r1">남자</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="여" id="r2" />
                                  <Label htmlFor="r2">여자</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="선택안함" id="r3" />
                                  <Label htmlFor="r3">선택안함</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>연락처</FormLabel>
                            <FormControl>
                              <Input placeholder="010000000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="password">
                      <FormField
                        control={singUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>비밀번호</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>비밀번호 확인</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>관심있는 분야</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={singUpForm.control}
                        name="introduce"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>자기소개</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  <Button className="w-[100%] my-5 " type="submit">
                    회원가입 하기
                  </Button>
                </form>
                <div className="mt-2 border-t text-center">
                  <Button
                    type="button"
                    className={cn(" origin-center", { hidden: step === 0 })}
                    onClick={() => {
                      setStep(0);
                    }}
                    variant="ghost"
                  >
                    로그인 화면으로 돌아가기
                  </Button>
                </div>
              </CardContent>
            </Form>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}
