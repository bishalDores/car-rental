import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import ListHomeCars from "./car/ListHomeCars";
import { GET_ALL_CARS } from "@/graphql/queries/car.queries";
import Filters from "./layout/Filters";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AlertCard from "./layout/AlertCard";
// import { LoadingSpinner } from "./layout/LoadingSpinner";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const transmission = searchParams.get("transmission") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const filters = {
    status: "Active",
    ...(category && { category }),
    ...(brand && { brand }),
    ...(transmission && { transmission }),
  };
  const variables = {
    filters,
    query,
    page,
  };
  const { data, loading, error } = useQuery(GET_ALL_CARS, { variables });

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Something went wrong. Try again later.");
    }
  }, [error]);

  return (
    <main className="my-8 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10">
      <div className="md:col-span-2 lg:col-span-2 flex flex-col">
        <Filters />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 md:col-span-4 lg:col-span-4 flex flex-col">
        <ListHomeCars cars={data?.getAllCars?.cars} loading={loading} pagination={data?.getAllCars.pagination} />
      </div>
      <div className="md:col-span-6 lg:col-span-4 flex flex-col">
        <div className="flex items-center justify-center h-screen">
          <AlertCard title="Error" description="Error Messages" />
        </div>
        {/* Google Map Component */}
      </div>
    </main>
  );
};

export default Home;
