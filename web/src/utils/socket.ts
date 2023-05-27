import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_DOMAIN
    : "http://localhost:5000/api";

export const socket = io(URL);
