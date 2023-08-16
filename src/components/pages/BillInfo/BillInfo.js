import React from "react";
import {
  BigButton,
  BillInfoContainer,
  Title,
  TitleContainer,
} from "./BillInfo.style";
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
  getDiscountInLocalStorage,
  updateDiscountInLocalStorage,
  getAllBillsInLocalStorage,
} from "../../../services/LocalStorage.service";
import { useState } from "react";
import { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Header from "../../custom/Header";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import NumberInput from "./NumberInput";
import CustomSubHeading from "./CustomSubHeading";
import AddButton from "./AddButton";
import UserCard from "./UserCard";
import ItemCard from "./ItemCard";
import AssignmentCard from "./AssignmentCard";

function BillInfo() {
  const navigate = useNavigate();
  const { billId } = useParams();

  useEffect(() => {
    const allBills = getAllBillsInLocalStorage();
    const allBillIds = allBills.map((bill) => bill.id);

    if (!billId) {
      navigate("/notfound");
    }

    if (!allBillIds.includes(billId)) {
      navigate("/notfound");
    }
  }, [billId]);

  //   console.log(getItemNameMapInLocalStorage());
  //   console.log(getItemUsersMapInLocalStorage());
  //   console.log(getItemsInLocalStorage());
  //   console.log(getUsersInLocalStorage());
  //   console.log(getTaxPercentageInLocalStorage());

  const [users, setUsers] = useState(getUsersInLocalStorage(billId));
  const [newUser, setNewUser] = useState("");
  const [taxPercentage, setTaxPercentage] = useState(
    getTaxPercentageInLocalStorage(billId)
  );
  const [resultText, setResultText] = useState("");
  const [discount, setDiscount] = useState(getDiscountInLocalStorage(billId));

  const [items, setItems] = useState(getItemsInLocalStorage(billId));
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  const [itemUsersMap, setItemUsersMap] = useState(
    getItemUsersMapInLocalStorage(billId)
  );
  const [itemNameMap, setItemNameMap] = useState(
    getItemNameMapInLocalStorage(billId)
  );

  useEffect(() => {
    updateUsersInLocalStorage(billId, users);
  }, [users]);

  useEffect(() => {
    updateItemsInLocalStorage(billId, items);
  }, [items]);

  useEffect(() => {
    updateItemUsersMapInLocalStorage(billId, itemUsersMap);
  }, [itemUsersMap]);

  useEffect(() => {
    updateItemNameMapInLocalStorage(billId, itemNameMap);
  }, [itemNameMap]);

  useEffect(() => {
    updateTaxPercentageInLocalStorage(billId, taxPercentage);
  }, [taxPercentage]);

  useEffect(() => {
    updateDiscountInLocalStorage(billId, discount);
  }, [discount]);

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

    let totalAmountWoTaxWoDiscount = totalAmount;

    // add discount before tax
    totalAmount -= discount.beforeTax;

    // rpund to 2 decimal places
    const totalTax = totalAmount * (taxPercentage / 100);
    let totalAmountWithTax = Math.round((totalAmount + totalTax) * 100) / 100;

    let totalAmountWTaxW1Discount = totalAmountWithTax;

    // add discount after tax
    totalAmountWithTax -= discount.afterTax;

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

      let userTotalDiscount = 0;

      if (discount.beforeTax > 0) {
        userTotalAmount -=
          (userTotalAmount / totalAmountWoTaxWoDiscount) * discount.beforeTax;
        userTotalDiscount +=
          (userTotalAmount / totalAmountWoTaxWoDiscount) * discount.beforeTax;
      }

      let userTax = (userTotalAmount * taxPercentage) / 100;

      userTotalAmount += userTax;

      if (discount.afterTax > 0) {
        userTotalAmount -=
          (userTotalAmount / totalAmountWTaxW1Discount) * discount.afterTax;
        userTotalDiscount +=
          (userTotalAmount / totalAmountWTaxW1Discount) * discount.afterTax;
      }

      totalAmountPaid += userTotalAmount;

      userTotalAmount = Math.round(userTotalAmount * 100) / 100;
      userTotalDiscount = Math.round(userTotalDiscount * 100) / 100;
      userTax = Math.round(userTax * 100) / 100;
      resultText += "○ " + user + " - ₹" + userTotalAmount + "\n";
      resultText += "\tTax: ₹" + userTax + "\n";
      resultText += "\tDiscount: ₹" + userTotalDiscount + "\n";
      resultText += "\tItems: \n";
      userItems.forEach((item) => {
        resultText += "\t ➼ " + item.name + ": ₹" + item.price + "\n";
      });
      resultText += "\n";
    });

    totalAmountPaid = Math.round(totalAmountPaid * 100) / 100;
    resultText += "Collect amount: ₹" + totalAmountPaid.toString() + "\n";
    setResultText(resultText);
  }

  return (
    <BillInfoContainer>
      <Header />
      <br />
      <br />

      <NumberInput
        label="Tax Percentage"
        type="number"
        placeholder="Tax"
        value={taxPercentage}
        onChange={(e) => setTaxPercentage(parseInt(e.target.value) || 0)}
      />
      <NumberInput
        label={"Before tax discount (in currency)"}
        type="number"
        placeholder="Before tax discount"
        value={discount.beforeTax}
        onChange={(e) =>
          setDiscount((d) => ({
            ...d,
            beforeTax: parseInt(e.target.value) || 0,
          }))
        }
      />
      <NumberInput
        label={"After tax discount (in currency)"}
        type="number"
        placeholder="after tax discount"
        value={discount.afterTax}
        onChange={(e) =>
          setDiscount((d) => ({
            ...d,
            afterTax: parseInt(e.target.value) || 0,
          }))
        }
      />
      <br />

      <CustomSubHeading>Users</CustomSubHeading>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          style={{
            width: "100%",
            padding: "12px 20px",
            margin: "0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          type="text"
          placeholder="Name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <AddButton onClick={addUser}>Add User</AddButton>
      </div>
      <div>
        {users.map((user) => (
          <UserCard
            key={user}
            removeClick={() => removeUser(user)}
            name={user}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <CustomSubHeading>Items</CustomSubHeading>
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
        <AddButton onClick={addItem}>Add Item</AddButton>
      </p>
      <div>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            removeClick={() => removeItem(item.id)}
            item={item}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <CustomSubHeading>Assignment</CustomSubHeading>
      {items.map((item) => (
        <AssignmentCard
          key={item.id}
          item={item}
          itemSelected={itemSelected}
          users={users}
          removeNameFromItem={removeNameFromItem}
          itemUsersMap={itemUsersMap}
        />
      ))}
      <BigButton onClick={calculateData}>Calculate</BigButton>

      <p style={{ whiteSpace: "pre" }}>{resultText}</p>
      {resultText === "" ? null : (
        <CopyToClipboard
          text={resultText}
          onCopy={() => alert("Copied to clipboard")}
        >
          <BigButton>Copy to clipboard</BigButton>
        </CopyToClipboard>
      )}
    </BillInfoContainer>
  );
}

export default BillInfo;
