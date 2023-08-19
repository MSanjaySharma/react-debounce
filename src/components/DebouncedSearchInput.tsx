import React, { useState, useEffect } from "react";

// components
import Display from "./Display";
import TextInput from "./TextInput";

// utils
import http from "../utils/http";

// hooks
import useDebounce from "../hooks/useDebounce";

// consts
const API_URL: string = "https://registry.npmjs.org/-/v1/search?text=";
const delay: number = Number(import.meta.env.VITE_DELAY);

// types
import { SearchAPIResponse } from "../types/api.types";
type PackagesList = {
  key: string;
  content: string;
}[];

function DebouncedSearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [packagesList, setPackagesList] = useState<PackagesList>([]);
  const debouncedSearchQuery = useDebounce<string>(searchQuery, delay);

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

  useEffect(() => {
    void searchPackages(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    !searchQuery && setPackagesList([]);
  }, [searchQuery]);

  return (
    <>
      <TextInput onChange={handleChange} />
      <Display displayList={packagesList} />
    </>
  );
}

export default DebouncedSearchInput;
