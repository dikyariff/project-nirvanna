import { ModeToggle } from "@/components/ui/atoms/ModeToggle";
import { UserButton } from "@clerk/nextjs/app-beta";

export default function Home() {
  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
