import useAuth from "@/hooks/useAuth";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  const { auth,logout } = useAuth();

  return (
    <nav  >
      <MaxWidthWrapper className="container flex justify-between items-center py-4 relative z-30">
        <div className="flex items-center">
          <Avatar />
          <h1 className="text-xl font-bold ml-2">Chat App</h1>
        </div>
        <div>
          {auth.accessToken && (
            <Button
              variant="outline"
              className="border-none shadow-none hover:text-red-500"
              onClick={() => {
                logout();}
              }
            >
              Logout
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
