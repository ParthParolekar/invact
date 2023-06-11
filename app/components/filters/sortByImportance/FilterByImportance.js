"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

const FilterByImportance = ({ filters, setFilters }) => {
  const filterByImportanceHandler = (e) => {
    setFilters({ ...filters, filterByImportance: e });
  };

  return (
    <Menu>
      <MenuButton
        m="2"
        flexGrow="1"
        as={Button}
        colorScheme="orange"
        rightIcon={<ChevronDownIcon />}
      >
        Importance
      </MenuButton>
      <MenuList>
        <RadioGroup
          onChange={filterByImportanceHandler}
          defaultValue="ALL"
          colorScheme="orange"
        >
          <Stack direction="column">
            <MenuItem>
              <Radio value="ALL" name="Importance" id="all" checked={false}>
                All
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="IMPORTANT" name="Importance" id="important">
                Important
              </Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="NOT IMPORTANT" name="Importance" id="not-important">
                Not Important
              </Radio>
            </MenuItem>
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default FilterByImportance;
