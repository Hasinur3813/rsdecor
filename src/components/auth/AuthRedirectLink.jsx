import Link from "next/link";

export default function AuthRedirectLink({ text, linkText, href }) {
  return (
    <p className="text-center text-sm text-gray-500 mt-6">
      {text}{" "}
      <Link
        href={href}
        className="text-[#C8956C] font-semibold hover:underline transition-all"
      >
        {linkText}
      </Link>
    </p>
  );
}
