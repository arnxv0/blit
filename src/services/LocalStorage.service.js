import ls from "localstorage-slim";
ls.config.encrypt = true;
const USERS_KEY = "users";
const ITEMS_KEY = "items";
const ITEM_USER_MAP_KEY = "itemusermap";
const ITEM_NAME_MAP_KEY = "itemnamemap";
const TAX_PERCENTAGE_KEY = "itemtaxpercentage";

function getUsersInLocalStorage() {
  const users = ls.get(USERS_KEY, { decrypt: true });
  if (users) {
    return JSON.parse(users);
  }
  return [];
}

function updateUsersInLocalStorage(users) {
  ls.set(USERS_KEY, JSON.stringify(users), { encrypt: true });
}

function getItemsInLocalStorage() {
  const items = ls.get(ITEMS_KEY, { decrypt: true });
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

function updateItemsInLocalStorage(items) {
  ls.set(ITEMS_KEY, JSON.stringify(items), { encrypt: true });
}

function getItemUsersMapInLocalStorage() {
  const itemUsersMap = ls.get(ITEM_USER_MAP_KEY, { decrypt: true });
  if (itemUsersMap) {
    return JSON.parse(itemUsersMap);
  }
  return {};
}

function updateItemUsersMapInLocalStorage(itemUsersMap) {
  ls.set(ITEM_USER_MAP_KEY, JSON.stringify(itemUsersMap), { encrypt: true });
}

function getItemNameMapInLocalStorage() {
  const itemNameMap = ls.get(ITEM_NAME_MAP_KEY, { decrypt: true });
  if (itemNameMap) {
    return JSON.parse(itemNameMap);
  }
  return {};
}

function updateItemNameMapInLocalStorage(itemNameMap) {
  ls.set(ITEM_NAME_MAP_KEY, JSON.stringify(itemNameMap), { encrypt: true });
}

function getTaxPercentageInLocalStorage() {
  const taxPercentage = ls.get(TAX_PERCENTAGE_KEY, { decrypt: true });
  if (taxPercentage) {
    return JSON.parse(taxPercentage);
  }
  return 0;
}

function updateTaxPercentageInLocalStorage(taxPercentage) {
  ls.set(TAX_PERCENTAGE_KEY, JSON.stringify(taxPercentage), { encrypt: true });
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
};
