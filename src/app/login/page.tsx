"use client";
// Singup page

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
    if (data.password === data.passwordConfirm) {
      alert(JSON.stringify(data, null, 2));
    } else {
      toast({
        title: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
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
