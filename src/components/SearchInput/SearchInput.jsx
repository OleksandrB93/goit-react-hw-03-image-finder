import React from "react";
import PropTypes from 'prop-types';
import { SearchInputSt } from "./SearchInput.styled";

export default function SearchInput({ filter, changeFilterInput }) {
  return (
    <div>
      <SearchInputSt
        type="text"
        name={filter}
        onChange={changeFilterInput}
        placeholder="Please write name"
      />
    </div>
  );
}

SearchInput.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilterInput: PropTypes.func.isRequired,
};