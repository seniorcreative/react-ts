import React, { Component } from "react";
class SearchBar extends Component {
    state = {};
    render() {
        return <div className="grid grid-cols-2 gap-4 items-center mb-6">
            <h1 className="col-span-3 md:col-span-1">What are you looking for?</h1>
            <div className="flex justify-between col-span-3 md:col-span-1">
                <input name="text" type="text" className="rounded-xl shadow-md w-3/4 m-1 px-2 py-3" placeholder="Search" />
                <button className="rounded-xl shadow-md bg-blue text-white w-1/4 m-1 px-10 py-3">Search</button>
            </div>
        </div>
    }
}
export default SearchBar;