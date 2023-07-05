import { enqueueSnackbar } from "notistack";
async function Sleep(dur) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("slept");
    }, dur);
  });
}

function Success(msg) {
  enqueueSnackbar(msg, {
    autoHideDuration: 1000,
    variant: "success",
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
  });
}
function Fail(msg) {
  enqueueSnackbar(msg, {
    autoHideDuration: 1000,
    variant: "error",
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
  });
}
function isAuthenticated() {
  return localStorage.getItem("firstLogin");
}
function isAdmin() {
  return localStorage.getItem("role") == "admin";
}

function convertDate(date) {
  const dateParts = date.split("/");

  const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
    2,
    "0"
  )}-${dateParts[1].padStart(2, "0")}`;
  return formattedDate;
}

export { Sleep, Success, Fail, isAuthenticated, isAdmin, convertDate };
