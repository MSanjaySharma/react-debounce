import React, { useState, useMemo, useEffect } from "react";

// components
import Display from "./Display";
import TextInput from "./TextInput";

// utils
import http from "../utils/http";
import { debounce } from "../utils/debounce";

// consts
const API_URL: string = "https://registry.npmjs.org/-/v1/search?text=";
const delay: number = Number(import.meta.env.VITE_DELAY);

// types
import { SearchAPIResponse } from "../types/api.types";
type PackagesList = {
  key: string;
  content: string;
}[];

function DebouncedSearchResult() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [packagesList, setPackagesList] = useState<PackagesList>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  async function searchPackages(queryParam: string) {
    try {
      const { data } = await http<SearchAPIResponse>(`${API_URL}${queryParam}`);

      const formattedPackagesList = data?.objects?.map((packageElement) => ({
        key: packageElement?.package?.date,
        content: packageElement?.package?.name,
      }));

      formattedPackagesList && setPackagesList(formattedPackagesList);
    } catch (e) {
      console.log(e);
    }
  }

  const memoizedDebouncedSearchPackages = useMemo(() => {
    console.log(delay);
    const debouncedSearchFunc = debounce(searchPackages, delay);
    return debouncedSearchFunc;
  }, []);

  useEffect(() => {
    if (searchQuery) {
      memoizedDebouncedSearchPackages(searchQuery);
    } else {
      setPackagesList([]);
    }
  }, [searchQuery, memoizedDebouncedSearchPackages]);

  return (
    <>
      <TextInput onChange={handleChange} />
      <Display displayList={packagesList} />
    </>
  );
}

export default DebouncedSearchResult;
