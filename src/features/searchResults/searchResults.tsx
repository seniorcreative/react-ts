import React, { Component } from "react";

type Props = {
    searchResults: Array<Object>
}

class SearchResults extends Component<Props> {
    render() {
        return <div>Results: {this.props.searchResults.length}
            <section className="grid grid-cols-1 md:grid-cols-4">
                {this.props.searchResults.map((searchResult, index) =>
                    <div className="col-span-1" key={index}>search result index {index}</div>
                )}
            </section>
        </div>
    };
}
export default SearchResults;