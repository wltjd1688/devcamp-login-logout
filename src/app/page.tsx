"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SingUpFormSchema } from "@/vaildators/singupschema";
import { ModeToggle } from "@/components/mode-toggle";

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

export default function CardWithForm() {
  // useForm을 사용하여 form을 만들어줍니다.
  const form = useForm<z.infer<typeof SingUpFormSchema>>({
    resolver: zodResolver(SingUpFormSchema),
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
  function onSubmit(data: z.infer<typeof SingUpFormSchema>) {
    // form 에서 password랑 passwordConfirm을 제외한 모든 데이터가 ""이 아닐때 다음으로 넘김
    if (
      data.username !== "" &&
      data.email !== "" &&
      data.phone !== "" &&
      data.role !== ""
    ) {
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
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Form>
        </Card>
      </div>
    </div>
  );
}
