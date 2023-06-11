"use client";

import { Button, Flex, Input, filter } from "@chakra-ui/react";
import SortByDate from "./sortByDate/SortByDate";
import FilterByImportance from "./sortByImportance/FilterByImportance";

const Filters = ({ filters, setFilters, notes, setDisplayNotes }) => {
  const applyFilters = () => {
    let tempNotes = [...notes];
    if (filters.filterByImportance !== "ALL") {
      if (filters.filterByImportance === "IMPORTANT") {
        tempNotes = tempNotes.filter((note) => note.important === true);
      }
      if (filters.filterByImportance === "NOT IMPORTANT") {
        tempNotes = tempNotes.filter((note) => note.important === false);
      }
    }

    if (filters.sortByDate === "OLDEST") {
      tempNotes = tempNotes.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    if (filters.sortByDate === "LATEST") {
      tempNotes = tempNotes.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (filters.search.length > 0) {
      tempNotes = tempNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          note.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setDisplayNotes(tempNotes);
  };

  const resetFilters = () => {
    setDisplayNotes(notes);
    setFilters({
      sortByDate: "OLDEST",
      filterByImportance: "ALL",
      search: "",
    });
  };
  return (
    <Flex direction="column" backgroundColor="gray.800" p={4} rounded={6}>
      <Flex direction={["column", "row"]} justifyContent="space-between">
        <SortByDate filters={filters} setFilters={setFilters} />
        <FilterByImportance filters={filters} setFilters={setFilters} />
      </Flex>

      <Input
        type="text"
        mb={3}
        color="orange.400"
        borderColor="orange"
        placeholder="Search for notes by title or description"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <Button
        mt={2}
        colorScheme={"orange"}
        variant="solid"
        onClick={applyFilters}
      >
        Apply
      </Button>
      <Button
        mt={2}
        colorScheme={"orange"}
        variant="outline"
        onClick={resetFilters}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default Filters;
