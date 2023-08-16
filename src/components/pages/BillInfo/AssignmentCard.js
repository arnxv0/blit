import React from "react";
import styled from "styled-components";
import UserCard from "./UserCard";

const Container = styled.div`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.secondaryFontColor};
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 15px;
`;

const HeadingContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryFontColor};
  border-radius: 6px 6px 0px 0px;
  padding: 10px 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.fontColorOnSecondary};
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
`;

const AddDropdown = styled.select`
  background-color: ${({ theme }) => theme.fontColorOnSecondary};
  color: ${({ theme }) => theme.secondaryFontColor};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 10px;
  width: 100px;
  height: 30px;

  &:hover {
    transform: scale(1.02);
  }
`;

export default function AssignmentCard({
  item,
  itemSelected,
  itemUsersMap,
  users,
  removeNameFromItem,
}) {
  return (
    <Container>
      <HeadingContainer>
        <div
          style={{
            width: "50%",
            boxSizing: "border-box",
          }}
        >
          <Text>{item.name}</Text>
          <Text>- {item.price}</Text>
        </div>
        <AddDropdown
          onChange={(e) => {
            itemSelected(item.id, e.target.value);
            return;
          }}
        >
          <option>Assign User</option>
          {users
            .filter((user) => !itemUsersMap[item.id].includes(user))
            .map((user) => (
              <option key={item.id + user}>{user}</option>
            ))}
        </AddDropdown>
      </HeadingContainer>
      <div>
        {itemUsersMap[item.id].map((user) => (
          <UserCard
            key={item.id + user + "Bleh"}
            name={user}
            removeClick={() => removeNameFromItem(item.id, user)}
          />
        ))}
      </div>
    </Container>
  );

  return (
    <Container>
      <table border="1px solid black" cellPadding="10px">
        <tbody>
          <tr>
            <td>{item.name}</td>
            <td>₹{item.price}</td>
            <td>
              <select
                onChange={(e) => {
                  itemSelected(item.id, e.target.value);
                  return;
                }}
              >
                <option>None</option>
                {users
                  .filter((user) => !itemUsersMap[item.id].includes(user))
                  .map((user) => (
                    <option key={item.id + user}>{user}</option>
                  ))}
              </select>
            </td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>
              <ul>
                {itemUsersMap[item.id].map((user) => (
                  <li key={item.id + user + "Bleh"}>
                    {user}{" "}
                    <button onClick={() => removeNameFromItem(item.id, user)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
