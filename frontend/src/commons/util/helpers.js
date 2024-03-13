export function isEmailValid(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export const getNextId = (items) => {
  if (!items.length) return 0;
  const ids = items.map((item) => item.id);
  return Math.max(...ids) + 1;
};

export const generateRandomUUID = () => {
  const uuidTemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return uuidTemplate.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const caseInsensitiveCompare = (a = "", b = "") => {
  return a.toUpperCase().includes(b.toUpperCase());
};

export const isValidUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const shortenLink = (link) => {
  if (!link) return "";
  const linkRegex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/;
  const match = link.match(linkRegex);
  console.log(match);
  return match ? match[1] : link;
};

export const formatTime = (minutes) => {
  if (!minutes) {
    return "-";
  }

  const min = minutes % 60;
  const h = Math.floor(minutes / 60);

  if (!h) {
    return `${min}min`;
  }

  if (!min) {
    return `${h}h`;
  }

  return `${h}h ${min}min`;
};

export const getRandomIntInRange = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function minutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  if (!minutes) return `${hours} ${hours === 1 ? "hour" : "hours"}`;

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}

export function getBufferFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

export const mimeMap = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  tiff: "image/tiff",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",
};
