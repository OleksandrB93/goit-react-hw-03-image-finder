import styled from "@emotion/styled";

export const SearchInputSt = styled.input`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  background-color: transparent;
  border: none;
  border-bottom: 2px solid #e8e8e8;
  &:hover,
  &:focus {
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid #e8e8e8;
  }

  ::placeholder {
    color: #000000;
    font-size: 12px;
    font-style: italic;
    text-align: center;
  }
`;
