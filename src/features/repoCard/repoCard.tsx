import React, { Component } from "react";
import { GitRepoT } from "../../@types/GitRepo";
import { StarIcon } from '@heroicons/react/outline'

type Props = {
    searchResult: GitRepoT
}

class RepoCard extends Component<Props> {
    render() {
        return <div className="col-span-3 md:col-span-1 p-6 rounded-xl shadow-lg bg-yellow-100">
            <div className="flex justify-between">
                {/* Avatar */}
                <div className="w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                    <img src={(`${this.props.searchResult.owner.avatar_url}`)} alt="avatar" className="rounded-full" />
                </div>
                {/* Text */}
                <p className="flex-auto text-left font-bold pl-5">{this.props.searchResult.name}</p>
                {/* Star Icon */}
                <div className="flex flex-col items-center">
                    <StarIcon className="h-5 w-5 text-blue-500"/>
                    <span className="text-xs">{this.props.searchResult.stargazers_count}</span>
                </div>
            </div>
        </div>
    }
}

export default RepoCard;
