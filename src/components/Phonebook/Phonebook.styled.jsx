import styled from "@emotion/styled";

export const NameLabel = styled.label`
  margin-right: 15px;
`;

export const Input = styled.input`
  margin-left: 3px;
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
`;
export const AddContactBtn = styled.button`
  max-height: 25px;
  margin-left: 10px;
  border: 1px solid #a7a7a7ec;
  border-radius: 5px;
  transition: all 250ms;

  &:hover {
    color: #ffffff;
    background: rgb(255, 111, 174);
    background: linear-gradient(
      27deg,
      rgba(255, 111, 174, 1) 0%,
      rgba(98, 170, 255, 1) 100%
    );
    box-shadow: rgb(255, 254, 254) 0px 0px 3px;
  }
`;
