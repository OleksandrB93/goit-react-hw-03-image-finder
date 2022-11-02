import PropTypes from "prop-types";
import React from "react";
import { DeleteBtn, List, Item, UserInfo, Avatar } from "./ContactLIst.styled";

export default function ContactList({ contacts, deleteContact }) {
  return (
    <List>
      {contacts.map(({ id, name, phoneNumber, img }) => {
        return (
          <Item key={id}>
            <Avatar
              src={
                img || "https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
              }
              alt="avatar"
            />
            <UserInfo>
              {name}: {phoneNumber}
            </UserInfo>
            <DeleteBtn type="button" onClick={() => deleteContact(id)}>
              Delete
            </DeleteBtn>
          </Item>
        );
      })}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
