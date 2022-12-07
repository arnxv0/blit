import ls from "localstorage-slim";
ls.config.encrypt = true;
const USERS_KEY = "users";
const ITEMS_KEY = "items";
const ITEM_USER_MAP_KEY = "itemusermap";
const ITEM_NAME_MAP_KEY = "itemnamemap";
const TAX_PERCENTAGE_KEY = "itemtaxpercentage";
const DISCOUNT_KEY = "discount";

const ALL_BILLS_KEY = "allbills";

function getUsersInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[USERS_KEY]) {
    return billData[USERS_KEY];
  }
  return [];
}

function updateUsersInLocalStorage(billId, users) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[USERS_KEY] = users;
  updateBillItemInLocalStorage(billId, billData);
}

function getItemsInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[ITEMS_KEY]) {
    return billData[ITEMS_KEY];
  }
  return [];
}

function updateItemsInLocalStorage(billId, items) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[ITEMS_KEY] = items;
  updateBillItemInLocalStorage(billId, billData);
}

function getItemUsersMapInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[ITEM_USER_MAP_KEY]) {
    return billData[ITEM_USER_MAP_KEY];
  }
  return {};
}

function updateItemUsersMapInLocalStorage(billId, itemUsersMap) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[ITEM_USER_MAP_KEY] = itemUsersMap;
  updateBillItemInLocalStorage(billId, billData);
}

function getItemNameMapInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[ITEM_NAME_MAP_KEY]) {
    return billData[ITEM_NAME_MAP_KEY];
  }

  return {};
}

function updateItemNameMapInLocalStorage(billId, itemNameMap) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[ITEM_NAME_MAP_KEY] = itemNameMap;
  updateBillItemInLocalStorage(billId, billData);
}

function getTaxPercentageInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[TAX_PERCENTAGE_KEY]) {
    return billData[TAX_PERCENTAGE_KEY];
  }

  return 0;
}

function updateTaxPercentageInLocalStorage(billId, taxPercentage) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[TAX_PERCENTAGE_KEY] = taxPercentage;
  updateBillItemInLocalStorage(billId, billData);
}

function getDiscountInLocalStorage(billId) {
  const billData = getBillItemFromLocalStorage(billId);

  if (billData[DISCOUNT_KEY]) {
    return billData[DISCOUNT_KEY];
  }

  return {
    beforeTax: 0,
    afterTax: 0,
  };
}

function updateDiscountInLocalStorage(billId, discount) {
  const billData = getBillItemFromLocalStorage(billId);
  billData[DISCOUNT_KEY] = discount;
  updateBillItemInLocalStorage(billId, billData);
}

function getAllBillsInLocalStorage(billId) {
  const allBills = ls.get(ALL_BILLS_KEY, { decrypt: true });
  if (allBills) {
    return JSON.parse(allBills);
  }
  return [];
}

function updateAllBillsInLocalStorage(allBills) {
  ls.set(ALL_BILLS_KEY, JSON.stringify(allBills), { encrypt: true });
}

function getBillItemFromLocalStorage(billId) {
  const billItem = ls.get(billId, { decrypt: true });
  if (billItem) {
    return JSON.parse(billItem);
  }
  return {};
}

function updateBillItemInLocalStorage(billId, billItem) {
  ls.set(billId, JSON.stringify(billItem), { encrypt: true });
}

function localStorageSpace() {
  var data = "";

  console.log("Current local storage: ");

  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      data += window.localStorage[key];
      console.log(
        key +
          " = " +
          ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) +
          " KB"
      );
    }
  }

  console.log(
    data
      ? "\n" +
          "Total space used: " +
          ((data.length * 16) / (8 * 1024)).toFixed(2) +
          " KB"
      : "Empty (0 KB)"
  );
  console.log(
    data
      ? "Approx. space remaining: " +
          (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
          " KB"
      : "5 MB"
  );
}

export {
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
  updateAllBillsInLocalStorage,
};
