/**
 * Enum representing the types of toast messages.
 * @readonly
 * @enum {string}
 */
export const ToastType = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Default: "default",
};

/**
 * Displays a toast message on the screen.
 *
 * @param {string} message - The message to be displayed in the toast.
 * @param {ToastType} [type=ToastType.Default] - The type of the toast message. Default is 'default'.
 * @param {number} [duration=5000] - The duration in milliseconds for which the toast should be displayed. Default is 5000 milliseconds.
 */
export function showToast(message, type = ToastType.Default, duration = 5000) {
  // Create the toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.position = "fixed";
    toastContainer.style.top = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  // Create the toast element
  const toast = document.createElement("div");
  toast.className =
    "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-xl";

  // Dynamically set the icon and color based on the type
  let iconColor, backgroundColor, iconPath;
  switch (type) {
    case ToastType.Success:
      iconColor = "text-green-500";
      backgroundColor = "bg-green-100";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z";
      break;
    case ToastType.Error:
      iconColor = "text-red-500";
      backgroundColor = "bg-red-100";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z";
      break;
    case ToastType.Warning:
      iconColor = "text-orange-500";
      backgroundColor = "bg-orange-100";
      iconPath =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z";
      break;
    default:
      // TODO: Replace with brand logo iconPath
      iconColor = "text-blue-500";
      backgroundColor = "bg-blue-100";
      iconPath =
        "M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z";
  }

  toast.innerHTML = `
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor} ${backgroundColor} rounded-lg">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="${iconPath}"/>
          </svg>
          <span class="sr-only">Icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">${message}</div>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
    `;

  // Add close functionality to the button
  toast.querySelector("button").addEventListener("click", () => {
    toastContainer.removeChild(toast);
  });

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Automatically remove the toast after 'duration' milliseconds
  setTimeout(() => {
    if (toast.parentNode === toastContainer) {
      toastContainer.removeChild(toast);
    }
  }, duration);
}
