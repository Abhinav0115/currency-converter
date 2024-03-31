"use client";

import { useEffect, useState } from "react";
import CurrenciesDropdown from "./Dropdown-currencies";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
    //Currencies state
    const [currencies, setCurrencies] = useState([]);

    //Amount state
    const [amount, setAmount] = useState(1);

    //From and To currency state
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    //Conversion state
    const [converting, setConverting] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState(null);

    //Favorites state
    const [favorites, setFavorites] = useState([]);

    //currencies -> api.frankfurter.app/currencies;
    //fetching currencies
    const fetchCurrencies = async () => {
        try {
            const res = await fetch(
                "https://api.frankfurter.app/currencies"
            ).then((res) => res.json());

            setCurrencies(Object.keys(res));
        } catch (error) {
            alert("Error fetching currencies");
            0;
            console.error("currency fetching", error);
        }
    };

    //conversion -> api.frankfurter.app/latest?amount=1&from=USD&to=INR;
    //convert currency
    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);

        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            ).then((res) => res.json());

            setConvertedAmount(res.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            alert("Error while conversion");
            0;
            console.error("conversion error", error);
        } finally {
            setConverting(false);
        }
    };

    //handle favorite currencies
    const handleFavorite = (currency) => {
        let updatedFavorites = [...favorites];
        if (favorites.includes(currency)) {
            updatedFavorites = favorites.filter((fav) => fav !== currency);
        } else {
            updatedFavorites.push(currency);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    //swaping currencies
    const SwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    useEffect(() => {
        const localFavorites = localStorage.getItem("favorites");
        if (localFavorites) {
            setFavorites(JSON.parse(localFavorites));
        } else {
            setFavorites(["INR", "USD"]);
        }

        fetchCurrencies();
    }, []);

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md text-gray-800">
            <h2 className="mb-5 text-3xl font-semibold text-center">
                Currency Convertor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-4 w-full">
                <CurrenciesDropdown
                    currencies={currencies}
                    title="From:"
                    favorites={favorites}
                    handleFavorite={handleFavorite}
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                />
                {/* swap currencies button */}
                <div className=" flex justify-center -mb-5 sm:mb-0">
                    <button
                        onClick={SwapCurrencies}
                        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                    >
                        {/* <HiArrowsUpDown /> */}
                        <HiArrowsRightLeft className="text-xl text-gray-800" />
                    </button>
                </div>
                <CurrenciesDropdown
                    currencies={currencies}
                    title="To:"
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    favorites={favorites}
                    handleFavorite={handleFavorite}
                />
            </div>
            <div className="mt-4 flex items-center gap-4">
                <label
                    htmlFor="amount"
                    className="block text-base font-medium "
                >
                    Amount:
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={convertCurrency}
                    className={`px-4 py-2 text-lg font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1 ${
                        converting ? "animate-pulse" : ""
                    } `}
                >
                    Convert
                </button>
            </div>
            {convertedAmount !== null && (
                <div className="mt-4 text-lg text-emerald-600 font-medium text-center">
                    Converted Amount :{" "}
                    <span className="font-semibold">{convertedAmount}</span>
                </div>
            )}
        </div>
    );
};

export default CurrencyConvertor;
