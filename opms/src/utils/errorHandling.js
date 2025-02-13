import { toast } from "react-toastify";

export const showErrorToast = (error) => {
  const message = error?.response?.data?.message || "Something went wrong!";
  toast.error(message, {
    autoClose: false,
    closeOnClick: true,
  });
};

export const showSuccessToast = (message = "Operation successful!") => {
  toast.success(message, {
    autoClose: 3000,
    closeOnClick: true,
  });
};
