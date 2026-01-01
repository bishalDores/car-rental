import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import { CarTaxiFront, MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { CURRENT_USER, LOGOUT } from "@/graphql/queries/user.queries";
import { useEffect } from "react";
import { isAuthenticatedVar, isLoadingVar, userVar } from "@/apollo/apollo-vars";
import type { CurrentUserQuery } from "@/utils/types";
import { Skeleton } from "../ui/skeleton";
import UserMobileMenu from "../mobile-menu/UserMobileMenu";
import { getInitials } from "@/utils/helpers";

// import AdminMobileMenu from "../mobile-menu/AdminMobileMenu";

const Header = () => {
  const navigate = useNavigate();

  const { loading, data, error } = useQuery<CurrentUserQuery>(CURRENT_USER);

  useEffect(() => {
    if (data?.me) {
      userVar(data.me);
      isAuthenticatedVar(true);
      isLoadingVar(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      userVar(null);
      isAuthenticatedVar(false);
      isLoadingVar(false);
    }
  }, [error]);

  const currentUser = data?.me;

  const [logout] = useLazyQuery(LOGOUT);

  const handleLogout = async () => {
    logout();
    navigate(0);
  };
  return (
    <div className="flex items-center justify-between px-5 py-2 bg-white dark:bg-gray-800 border border-gray-300">
      <Link to="/" className="flex items-center gap-2">
        <CarTaxiFront className="h-8 w-8 text-primary" />
        <span className="text-lg font-semibold text-primary">Go Rental</span>
      </Link>
      <div className="hidden lg:flex gap-4 mr-1">
        {!currentUser && !loading && (
          <Button className="mb-2" asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
        {currentUser ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentUser?.avatar?.url} />
                      <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <p className="ps-2 text-sm">{currentUser?.name}</p>
                {currentUser?.role?.includes("admin") && (
                  <Link to="/admin/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <Link to="/me/bookings">
                  <DropdownMenuItem>My Bookings</DropdownMenuItem>
                </Link>
                <Link to="/me/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          loading && <Skeleton className="h-10 w-10 rounded-full" />
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle />
          <SheetHeader>
            <SheetDescription />
          </SheetHeader>
          <div className="grid w-[250px] p-4">
            <div className="flex items-center mb-3">
              <span className="me-4"></span>
              {!currentUser && !loading && (
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
              {currentUser && (
                <>
                  <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser?.avatar?.url} />
                        <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </Button>
                  <p className="ps-2">{currentUser?.name}</p>
                </>
              )}
            </div>
            {currentUser && (
              <>
                <UserMobileMenu isAdmin={currentUser?.role?.includes("admin") ?? false} />
                <DropdownMenuSeparator />
                <Link to="#" onClick={handleLogout} className="text-lg font-medium hover:underline underline-offset-4">
                  Logout
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
