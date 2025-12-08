import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateSearchParams } from "@/utils/helpers";
import { CarBrand, CarCategories, CarTransmissions } from "@go-rental/shared";

const Filters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category"),
    brand: searchParams.get("brand"),
    transmission: searchParams.get("transmission"),
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && !location.search) {
      setFilters({
        category: null,
        brand: null,
        transmission: null,
      });
    }
  }, [location]);
  useEffect(() => {
    if (searchQuery === "") {
      searchParams.delete("query");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [searchParams, navigate, searchQuery]);

  const updateURLParams = (filters: { category: string | null; brand: string | null; transmission: string | null }) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value as string);
      } else {
        searchParams.delete(key);
      }
    });

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = updateSearchParams(searchParams, "query", searchQuery);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleCheckboxChange = (type: string, value: string) => {
    setFilters((prev) => {
      //   return {
      //     ...prev,
      //     [type]: prev[type as keyof typeof prev] === value ? null : value,
      //   };
      const updatedFilters = {
        ...filters,
        [type]: prev[type as keyof typeof prev] === value ? null : value,
      };
      updateURLParams(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start bg-muted/25">
          <div className="grid gap-0.5">
            <div className="text-sm text-muted-foreground">
              <div className="filter-section my-8">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mt-4 my-2">Type keyword</h2>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full rounded-lg bg-background pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Car Type</h2>
                {CarCategories?.map((category) => (
                  <div key={category} className="flex items-center space-x-2 my-2">
                    <Checkbox
                      id="category"
                      name="category"
                      value={category}
                      onCheckedChange={() => handleCheckboxChange("category", category)}
                      checked={filters.category === category}
                    />
                    <label htmlFor="carType" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Select Brand</h2>
                {CarBrand?.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 my-2">
                    <Checkbox
                      id="brand"
                      name="brand"
                      value={brand}
                      onCheckedChange={() => handleCheckboxChange("brand", brand)}
                      checked={filters.brand === brand}
                    />
                    <label htmlFor="carBrand" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Transmission</h2>
                {CarTransmissions?.map((transmission) => (
                  <div key={transmission} className="flex items-center space-x-2 my-2">
                    <Checkbox
                      id="transmission"
                      name="transmission"
                      value={transmission}
                      onCheckedChange={() => handleCheckboxChange("transmission", transmission)}
                      checked={filters.transmission === transmission}
                    />
                    <label
                      htmlFor="carTransmission"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {transmission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Filters;
