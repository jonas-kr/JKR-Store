import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showErrorAlert = (msg) => {
  toast.error(msg, {
    style: { fontFamily: "Cairo , sans-serif" },
    position: "top-right",
    autoClose: 5000, // Auto-close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    icon: ({ theme, type }) => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFA500">
        <path d="M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"></path>
      </svg>
    )
  });
}