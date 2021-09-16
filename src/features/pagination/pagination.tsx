/* This example requires Tailwind CSS v2.0+ */
import { Component } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

type Props = {
    total_count: Number,
    history: any
}

class Pagination extends Component<Props> {

    state = {
        currentPage: 1,
        perPage: 12
    }
    
    handleNext = () => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        const nextPage = Math.min((Number(currentUrlParams.get('page_num')) + 1), (Number(this.props.total_count) / this.state.perPage))
        this.setState({ currentPage: nextPage})
        this.props.history.push(`?q=${currentUrlParams.get('q')}&page_num=${nextPage}`) 
    }    

    handlePrev = () => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        const nextPage = Math.max(1, (Number(currentUrlParams.get('page_num')) - 1))
        this.setState({ currentPage: nextPage})
        this.props.history.push(`?q=${currentUrlParams.get('q')}&page_num=${nextPage}`) 
    }


    render() {
        return <div className="rounded-xl mt-20 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={this.handlePrev}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={this.handleNext}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((this.state.currentPage -1)  * this.state.perPage) + 1}</span> to <span className="font-medium">{(this.state.currentPage) * this.state.perPage}</span> of{' '}
                        <span className="font-medium">{this.props.total_count}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={this.handlePrev}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={this.handleNext}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    }
}

export default Pagination;
