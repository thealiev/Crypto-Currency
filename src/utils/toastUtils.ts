import { toast } from "react-toastify";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "dark",
  });
};
