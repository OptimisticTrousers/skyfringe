import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_BASE_DOMAIN

export const socket = io(URL);
