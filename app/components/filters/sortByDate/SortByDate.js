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

const SortByDate = ({ filters, setFilters }) => {
  const sortByDateHandler = (e) => {
    setFilters({ ...filters, sortByDate: e });
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
        Sort By Date
      </MenuButton>
      <MenuList>
        <RadioGroup
          onChange={sortByDateHandler}
          defaultValue="OLDEST"
          colorScheme="orange"
        >
          <Stack direction="column">
            <MenuItem>
              <Radio value="LATEST">Latest</Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="OLDEST">Oldest</Radio>
            </MenuItem>
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default SortByDate;
