import React, { Component } from "react";
import { GitRepoT } from "../../@types/GitRepo";

type Props = {
    searchResult: GitRepoT
}

class RepoCard extends Component<Props> {
    render() {
        return <div className="col-span-3 md:col-span-1 p-6 rounded-xl shadow-lg">
            <p className="text-bold">{this.props.searchResult.name}</p>
        </div>
    }
}

export default RepoCard;
