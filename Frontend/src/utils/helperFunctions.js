import { jwtDecode } from "jwt-decode";

export const decodedToken = () => {
  return jwtDecode(localStorage.getItem("token"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export function getInitials(phrase) {
  return phrase
    .split(" ") // Split the phrase by spaces
    .map((word) => word[0].toUpperCase()) // Get the first letter of each word and make it uppercase
    .join("");
}

export const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "text-sky-400";
    case "approved":
      return "text-green-800";
    case "rejected":
      return "text-red-500";
    default:
      return "";
  }
};

export const getMenuVisibility = (role, menuItem) => {
  if (role === "admin") {
    return "flex"; // Admin sees all menu items
  }

  if (
    (role === "student" && menuItem === "manage_users") ||
    (role === "staff" && menuItem === "manage_users") ||
    (role === "department_staff" && menuItem === "manage_users")
  ) {
    return "hidden"; // Student or staff cannot see "manage_user"
  }

  if (
    (role === "student" && menuItem === "manage_department") ||
    (role === "staff" && menuItem === "manage_department") ||
    (role === "department_staff" && menuItem === "manage_department")
  ) {
    return "hidden"; // Student or staff cannot see "manage_user"
  }

  if (
    (role === "student" && menuItem === "manage_clearance") ||
    (role === "staff" && menuItem === "manage_clearance")
  ) {
    return "hidden"; // Student or staff cannot see "manage_user"
  }

  return "flex"; // Other menu items are visible
};

export const replaceObjectInArray = (array, id, newStatus) => {
  return array.map((item) =>
    item.id === id ? { ...item, status: newStatus } : item
  );
};

export const baseURL = "http://localhost:8090";

export const generateID = (number) => {
  const year = new Date().getFullYear().toString().slice(-2); // Last two digits of the year
  const prefix = `${year}/U/`;
  const suffix = "/EVE";

  // Ensure the number is padded to 4 digits
  const formattedNumber = number.toString().padStart(4, "0");

  return `${prefix}${formattedNumber}${suffix}`;
};

export const capitalizeEachWord = (str) => {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words back into a single string
};
