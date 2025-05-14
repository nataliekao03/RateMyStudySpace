export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 py-6">
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold">Rate My Study Space </span>
    </footer>
  );
}
