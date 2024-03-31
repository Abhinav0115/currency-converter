import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrenciesDropdown = ({
    currencies,
    currency,
    setCurrency,
    title = "",
    favorites,
    handleFavorite,
}) => {
    // Check if the current currency is a favorite
    const isFavorite = (curr) => favorites?.includes(curr);

    return (
        <div
        // className="flex items-center gap-4"
        >
            <label
                className="block text-sm font-medium text-gray-800"
                htmlFor={title}
            >
                {title}
            </label>
            <div className="mt-1 relative">
                <select
                    name="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    id=""
                    className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                >
                    {favorites?.map((currency) => {
                        return (
                            <option
                                className="bg-gray-200 "
                                key={currency}
                                value={currency}
                                aria-label="Favorite"
                            >
                                {currency}
                            </option>
                        );
                    })}
                    <hr />
                    {currencies
                        .filter((fav) => !favorites?.includes(fav))
                        .map((currency) => {
                            return (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            );
                        })}
                </select>
                <button
                    onClick={() => handleFavorite(currency)}
                    className="text-yellow-500 absolute inset-y-0 right-0 pr-5 flex items-center text-base leading-5 "
                >
                    {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    );
};

export default CurrenciesDropdown;
