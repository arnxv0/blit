import React, { useContext } from "react";
import {
  LandingPageContainer,
  Title,
  TitleContainer,
} from "./LandingPage.style";
import { ThemeContext } from "../../../theme/ThemeContext";
import ThemeToggleButton from "../../custom/ThemeToggleButton";
import { useState } from "react";

function LandingPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  const [itemUsersMap, setItemUsersMap] = useState({});
  const [itemNameMap, setItemNameMap] = useState({});

  function addUser() {
    setUsers((users) => [...users, newUser]);
    setNewUser("");
  }

  function removeUser(user) {
    setUsers((users) => users.filter((u) => u !== user));
    setItemUsersMap((itemUsersMap) => {
      const newMap = { ...itemUsersMap };
      Object.keys(newMap).forEach((item) => {
        newMap[item] = newMap[item].filter((u) => u !== user);
      });
      return newMap;
    });
  }

  function addItem() {
    const newItems = [];
    for (let i = 0; i < newItem.quantity; i++) {
      const uid = Math.random().toString(36).substring(2, 15);
      newItems.push({
        id: uid,
        name: newItem.name,
        price: newItem.price,
      });
      setItemUsersMap((itemUsersMap) => ({
        ...itemUsersMap,
        [uid]: [],
      }));
      setItemNameMap((itemNameMap) => ({
        ...itemNameMap,
        [uid]: { name: newItem.name, price: newItem.price },
      }));
    }

    setItems((items) => {
      return [...items, ...newItems];
    });

    setNewItem({
      name: "",
      price: 0,
      quantity: 1,
    });
  }

  function removeItem(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId));
    setItemUsersMap((itemUsersMap) => {
      const newMap = { ...itemUsersMap };
      delete newMap[itemId];
      return newMap;
    });

    setItemNameMap((itemNameMap) => {
      const newMap = { ...itemNameMap };
      delete newMap[itemId];
      return newMap;
    });
  }

  function itemSelected(itemId, user) {
    setItemUsersMap((itemUsersMap) => {
      const itemUsers = itemUsersMap[itemId];
      const newUsers = itemUsers.includes(user)
        ? [...itemUsers]
        : [...itemUsers, user];
      return {
        ...itemUsersMap,
        [itemId]: newUsers,
      };
    });
  }

  return (
    <LandingPageContainer>
      <TitleContainer>
        <Title>Blit</Title>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </TitleContainer>

      <h3>Users</h3>
      <p>
        <input
          type="text"
          placeholder="Name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user}>
            {user} <button onClick={() => removeUser(user)}>Remove</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />

      <h3>Items</h3>
      <p>
        <input
          type="text"
          placeholder="item Name"
          value={newItem.name}
          onChange={(e) =>
            setNewItem((newItem) => ({ ...newItem, name: e.target.value }))
          }
        />
        <br />
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem((newItem) => ({ ...newItem, price: e.target.value }))
          }
        />
        <br />
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem((newItem) => ({ ...newItem, quantity: e.target.value }))
          }
        />
        <button onClick={addItem}>Add Item</button>
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price} - {item.id} -{" "}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />

      <h3>Assignment</h3>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
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
                        <li key={item.id + user + "Bleh"}>{user}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
          </li>
        ))}
      </ol>
    </LandingPageContainer>
  );
}

export default LandingPage;
