"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sampleFormSchema } from "@/vaildators/sample-schema";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();
  // useForm을 사용하여 form을 만들어줍니다.
  const form = useForm<z.infer<typeof sampleFormSchema>>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // form을 제출했을 때 실행되는 함수
  function onSubmit(data: z.infer<typeof sampleFormSchema>) {
    // form 에서 password랑 passwordConfirm을 제외한 모든 데이터가 ""이 아닐때 다음으로 넘김
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
    <div className="min-h-screen">
      <ModeToggle />
      {/* 중앙 로그인 */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>계정을 생성합니다</CardTitle>
            <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative overflow-x-hidden space-y-3"
              >
                <motion.div
                  className={cn("space-y-3")}
                  animate={{ translateX: `${step * -100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>역할</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="역할을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectItem value="admin">관리자</SelectItem>
                            <SelectItem value="user">일반사용자</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  className={cn("space-y-3 absolute top-0 left-0 right-0", {
                    hidden: step === 0,
                  })}
                  animate={{ translateX: `${(1 - step) * 100}%` }}
                  style={{ translateX: `${(1 - step) * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                </motion.div>
                <Button
                  type="button"
                  className={cn({ hidden: step === 1 })}
                  onClick={() => {
                    form.trigger(["phone", "email", "username", "role"]);
                    const phoneState = form.getFieldState("phone");
                    const emailState = form.getFieldState("email");
                    const usernameState = form.getFieldState("username");
                    const roleState = form.getFieldState("role");

                    if (!phoneState.isDirty || phoneState.invalid) return;
                    if (!emailState.isDirty || emailState.invalid) return;
                    if (!usernameState.isDirty || usernameState.invalid) return;
                    if (!roleState.isDirty || roleState.invalid) return;

                    setStep(1);
                  }}
                >
                  다음 단계로
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button className={cn({ hidden: step === 0 })} type="submit">
                  계정 등록하기
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({ hidden: step === 0 })}
                  onClick={() => {
                    setStep(0);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전 단계로
                </Button>
              </form>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  );
}
