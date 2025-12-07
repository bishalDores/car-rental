import { CardHeader, CardTitle } from "../ui/card";
import CarItem from "./CarItem";
import { Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "../ui/button";
import type { ICar } from "@go-rental/shared";
import { LoadingSpinner } from "../layout/LoadingSpinner";

type Props = {
  cars: ICar[];
  loading: boolean;
};
const ListHomeCars = ({ cars, loading }: Props) => {
  if (loading) {
    return <LoadingSpinner fullscreen={true} />;
  }
  return (
    <>
      <CardHeader className="p-0">
        <CardTitle className="group flex items-center text-2xl p-0">Rent Car for Your Next Trip</CardTitle>
        <div className="flex">
          <Link to="/search" className="inline-block">
            <Button variant="ghost" className="px-1 ">
              <ArrowLeftRight className="h-4 w-4 me-1" />
              Search cars within location/budget/dates
            </Button>
          </Link>
        </div>
      </CardHeader>
      <div className="text-sm text-muted-foreground">
        {cars &&
          cars.length > 0 &&
          cars.map((car: ICar) => {
            return <CarItem car={car} />;
          })}
      </div>
    </>
  );
};

export default ListHomeCars;
