import Layout from "./components/user/Layout";

export default function App() {
  return <Layout />;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service worker registered"))
        .catch((err) =>
          console.error("Service worker registration failed:", err)
        );
    } else {
      console.log("Service worker already registered");
    }
  });
}
