export default function Notification({ title, description, onClose }) {
  return (
    <div className="fixed top-15 right-5 drop p-4 w-80 flex flex-col justify-center z-50">
      <div className="font-bold text-lg mb-2">{title}</div>
      <div className="text-sm mb-3">{description}</div>
      <button
        className="absolute top-0 right-2 text-3xl"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
