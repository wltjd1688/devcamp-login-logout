"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function CardWithForm() {
  const { setTheme } = useTheme();

  // 스키마 확인하는 코드
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "이름은 2글자 이상이어야 합니다.",
    }),
    email: z.string().email({
      message: "올바른 이메일을 입력해주세요.",
    }),
    phone: z.string().length(11, {
      message: "연락처는 11자리여야 합니다.",
    }),
    role: z
      .enum(["admin", "user", ""])
      .refine((value) => value !== "", "역할을 선택해주세요."),
    password: z.string()
      .min(6, {
        message: "비밀번호는 최소 6글자 이상이어야 합니다.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{6,}$/
      ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string()
    .min(6, {
      message: "비밀번호는 최소 6글자 이상이어야 합니다.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[a-zA-Z0-9@$!%*#?&]{6,}$/
    ,"비밀번호는 최소 6자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
  });

  // useForm을 사용하여 form을 만들어줍니다.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  function onSubmit(data: z.infer<typeof formSchema>) {
    // form 에서 password랑 passwordConfirm을 제외한 모든 데이터가 ""이 아닐때 다음으로 넘김
    if (data.username !== "" && data.email !== "" && data.phone !== "" && data.role !== "") {
      if (data.password === data.passwordConfirm) {
        alert(JSON.stringify(data, null, 2));
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("필수 정보를 입력해주세요.");
    }
  }

  return (
    <div className="min-h-screen">
      {/* dark, light, system 모드를 토글할 수 있는 버튼을 추가합니다. */}
      <div className="absolute top-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                className="space-y-3"
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
                <Button type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  );
}
