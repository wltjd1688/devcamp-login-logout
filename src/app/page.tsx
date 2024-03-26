import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
