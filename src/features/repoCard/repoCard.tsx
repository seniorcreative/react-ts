import React, { Component } from "react";
import { GitRepoT } from "../../@types/GitRepo";

type Props = {
    searchResult: GitRepoT
}

class RepoCard extends Component<Props> {
    render() {
        return <div className="col-span-3 md:col-span-1 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                <img src={(`${this.props.searchResult.owner.avatar_url}`)} alt="avatar" className="rounded-full" />
            </div>
            <p className="font-bold">{this.props.searchResult.name}</p>
        </div>
    }
}

export default RepoCard;
