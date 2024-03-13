function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function callLocalStorage(name, method = "get", data = {}) {
  if (!name) return {};

  if (method === "get") {
    return getItem(name);
  }

  if (method === "set") {
    return setItem(name, data);
  }

  if (method === "delete") {
    return setItem(name, null);
  }

  return 200;
}

export default callLocalStorage;
