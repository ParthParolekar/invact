"use client";

import { Button, Flex } from "@chakra-ui/react";
import SortByDate from "./sortByDate/SortByDate";
import FilterByImportance from "./sortByImportance/FilterByImportance";

const Filters = ({ filters, setFilters, applyFilters }) => {
  return (
    <Flex direction="column">
      <Flex direction={["column", "row"]} justifyContent="space-between">
        <SortByDate filters={filters} setFilters={setFilters} />
        <FilterByImportance filters={filters} setFilters={setFilters} />
      </Flex>
      <Button colorScheme={"orange"} variant="outline" onClick={applyFilters}>
        Apply
      </Button>
    </Flex>
  );
};

export default Filters;
