import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Button>Ai study content gen</Button>

      <UserButton/>
    </div>
  );
}
