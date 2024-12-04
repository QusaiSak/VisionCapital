import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
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
        <UserButton>
          <Button variant="solid" className="flex items-center space-x-2">
            <span>Profile</span>
          </Button>
        </UserButton>
      </SignedIn>
    </header>
  );
}

export default LogInOut;
