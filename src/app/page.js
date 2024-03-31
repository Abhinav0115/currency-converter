import CurrencyConvertor from "@/components/currency-convertor";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center bg-stone-200 min-h-screen">
            <div className="container">
                <CurrencyConvertor />
            </div>
            <div className="absolute bottom-0">
                Build using{" "}
                <Link
                    href={"https://www.frankfurter.app/docs/"}
                    target="_blank"
                    className="text-teal-700 font-medium hover:underline"
                >
                    Frankfurter API
                </Link>
            </div>
        </div>
    );
}
