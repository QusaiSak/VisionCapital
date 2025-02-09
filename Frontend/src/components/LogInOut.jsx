import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { LogIn } from 'lucide-react';

const LogInOut = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" className="flex items-center space-x-2">
            Sign In<LogIn/>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default LogInOut;
