import Swal from "sweetalert2";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Success alert
export function showSuccessAlert(title: string, text: string): void {
  Swal.fire({
    title,
    text,
    icon: "success",
    theme: "dark",
  });
}

// Error alert
export function showErrorAlert(title: string, text: string): void {
  Swal.fire({
    title,
    text,
    icon: "error",
    theme: "dark",
  });
}

// Confirmation alert with callback
export function showConfirmationAlert(
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,

  onConfirm: () => void,
): void {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    theme: "dark",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | undefined) {
  let initials;
  if (name?.split(" ").length === undefined) {
    initials = "U";
  } else if (name?.split(" ").length! > 1) {
    initials =
      name?.split(" ")[0][0] +
      name?.split(" ")[name?.split(" ").length - 1][0]!;
  } else {
    initials = name?.[0];
  }
  return initials?.toUpperCase();
}
