import React, { useContext } from "react";
import {
  LandingPageContainer,
  Title,
  TitleContainer,
} from "./LandingPage.style";
import { ThemeContext } from "../../../theme/ThemeContext";
import ThemeToggleButton from "../../custom/ThemeToggleButton";
import {
  getUsersInLocalStorage,
  updateUsersInLocalStorage,
  getItemsInLocalStorage,
  updateItemsInLocalStorage,
  getItemUsersMapInLocalStorage,
  updateItemUsersMapInLocalStorage,
  getItemNameMapInLocalStorage,
  updateItemNameMapInLocalStorage,
  getTaxPercentageInLocalStorage,
  updateTaxPercentageInLocalStorage,
} from "../../../services/LocalStorage.service";
import { useState } from "react";
import { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import GoogleAds from "../../custom/GoogleAds";

function LandingPage() {
  console.log(getItemNameMapInLocalStorage());
  console.log(getItemUsersMapInLocalStorage());
  console.log(getItemsInLocalStorage());
  console.log(getUsersInLocalStorage());
  console.log(getTaxPercentageInLocalStorage());

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [users, setUsers] = useState(getUsersInLocalStorage());
  const [newUser, setNewUser] = useState("");
  const [taxPercentage, setTaxPercentage] = useState(
    getTaxPercentageInLocalStorage()
  );
  const [resultText, setResultText] = useState("");

  const [items, setItems] = useState(getItemsInLocalStorage());
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  const [itemUsersMap, setItemUsersMap] = useState(
    getItemUsersMapInLocalStorage()
  );
  const [itemNameMap, setItemNameMap] = useState(
    getItemNameMapInLocalStorage()
  );

  useEffect(() => {
    updateUsersInLocalStorage(users);
  }, [users]);

  useEffect(() => {
    updateItemsInLocalStorage(items);
  }, [items]);

  useEffect(() => {
    updateItemUsersMapInLocalStorage(itemUsersMap);
  }, [itemUsersMap]);

  useEffect(() => {
    updateItemNameMapInLocalStorage(itemNameMap);
  }, [itemNameMap]);

  useEffect(() => {
    updateTaxPercentageInLocalStorage(taxPercentage);
  }, [taxPercentage]);

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

  function removeNameFromItem(itemId, user) {
    setItemUsersMap((itemUsersMap) => {
      const itemUsers = itemUsersMap[itemId];
      const newUsers = itemUsers.filter((u) => u !== user);
      return {
        ...itemUsersMap,
        [itemId]: newUsers,
      };
    });
  }

  function calculateData() {
    let resultText = "";
    let totalAmount = 0;

    for (let i = 0; i < items.length; i++) {
      totalAmount += items[i].price;
    }

    const totalTax = totalAmount * (taxPercentage / 100);
    // rpund to 2 decimal places
    const totalAmountWithTax = Math.round((totalAmount + totalTax) * 100) / 100;

    resultText += "Total Amount: ₹" + totalAmountWithTax.toString() + "\n\n";

    const userItemsUsedMap = {};
    users.forEach((user) => {
      userItemsUsedMap[user] = [];
    });

    resultText += "All Items:\n\n";

    Object.keys(itemUsersMap).forEach((itemId) => {
      const itemUsers = itemUsersMap[itemId];
      const itemName = itemNameMap[itemId].name;
      const itemPrice = itemNameMap[itemId].price;
      // round to 2 decimal places

      resultText += "○ " + itemName + " - ₹" + itemPrice.toString() + "\n";
      // add item users to result text
      resultText += "\t" + itemUsers.join(", ") + "\n";

      const individualItemPrice =
        Math.round((itemPrice / itemUsers.length) * 100) / 100;

      itemUsers.forEach((user) => {
        userItemsUsedMap[user].push({
          id: itemId,
          name: itemName,
          price: individualItemPrice,
        });
      });
    });

    resultText += "\n\n";
    resultText += "Divisions:\n\n";

    let totalAmountPaid = 0;
    Object.keys(userItemsUsedMap).forEach((user) => {
      const userItems = userItemsUsedMap[user];
      if (userItems.length === 0) {
        return;
      }
      let userTotalAmount = userItems.reduce((acc, item) => {
        return acc + item.price;
      }, 0);

      // round to 2 decimal places

      let userTax = (userTotalAmount * taxPercentage) / 100;
      userTotalAmount += userTax;
      totalAmountPaid += userTotalAmount;

      userTotalAmount = Math.round(userTotalAmount * 100) / 100;
      userTax = Math.round(userTax * 100) / 100;
      resultText += "○ " + user + " - ₹" + userTotalAmount + "\n";
      resultText += "\tTax: ₹" + userTax + "\n";
      resultText += "\tItems: \n";
      userItems.forEach((item) => {
        resultText += "\t ➼ " + item.name + ": ₹" + item.price + "\n";
      });
      resultText += "\n";
    });

    totalAmountPaid = Math.round(totalAmountPaid * 100) / 100;
    resultText += "" + "Collect amount: ₹" + totalAmountPaid.toString() + "\n";
    setResultText(resultText);
  }

  return (
    <LandingPageContainer>
      <GoogleAds slot="8845192027" />
      <TitleContainer>
        <Title>Blit</Title>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </TitleContainer>
      <br />
      <br />

      <p>
        <label>Tax Percentage</label>
        <input
          type="number"
          placeholder="Tax"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(parseInt(e.target.value) || 0)}
        />
      </p>
      <br />

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
            setNewItem((newItem) => ({
              ...newItem,
              price: parseFloat(e.target.value),
            }))
          }
        />
        <br />
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem((newItem) => ({
              ...newItem,
              quantity: parseInt(e.target.value),
            }))
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
                        <li key={item.id + user + "Bleh"}>
                          {user}{" "}
                          <button
                            onClick={() => removeNameFromItem(item.id, user)}
                          >
                            Remove
                          </button>
                        </li>
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

      <button onClick={calculateData}>Calculate</button>
      <br />
      <br />
      <p style={{ whiteSpace: "pre" }}>{resultText}</p>
      {resultText === "" ? null : (
        <CopyToClipboard
          text={resultText}
          onCopy={() => alert("Copied to clipboard")}
        >
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      )}
      <br />
      <br />
      <br />
      <br />
    </LandingPageContainer>
  );
}

export default LandingPage;
