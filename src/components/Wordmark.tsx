export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-montserrat ${className}`}>
      <span className="font-normal">NOR</span>
      <span className="font-bold">LABS</span>
    </span>
  );
}
