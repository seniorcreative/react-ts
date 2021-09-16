import React, { Component } from "react";
import { GitRepoT } from "../../@types/GitRepo";
import { StarIcon, ExternalLinkIcon } from '@heroicons/react/outline'

type Props = {
    searchResult: GitRepoT
}

class RepoCard extends Component<Props> {
    state = {
        tags: [],
        truncated_desc: String,
        first_tag: { name: String, tarball_url: String }
    }
    componentDidMount() {
        // Search for any tags. 
        if (String(this.props.searchResult.description).length > 100) {
            this.setState({ truncated_desc: `${this.props.searchResult.description.substring(0, 100)}&hellip;` })
        } else {
            this.setState({ truncated_desc: this.props.searchResult.description })
        }
        fetch(`${this.props.searchResult.tags_url.toString()}?per_page=5`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({ tags: jsonData })
                this.setState({ first_tag: jsonData[0] })
            })
    }
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
                    <StarIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-xs">{this.props.searchResult.stargazers_count}</span>
                </div>
            </div>
            <div>
                {/* Tag and download link if there is one */}
                {this.state.first_tag && (
                    <div className="rounded-sm bg-white flex justify-start items-center">
                        <p className="font-bold">{this.state.first_tag.name}</p>
                        <p className="text-blue"><a href={this.state.first_tag.tarball_url.toString()} download title="Download the tarball for this tag" rel="noreferrer" target="_blank">Tarball&nbsp;<ExternalLinkIcon className="h-5 w-5 text-blue-500" /></a>
                        </p>
                    </div>
                )}
                {/* Truncated description */}
                <p>{this.state.truncated_desc}</p>
                {/* Main download link */}
                <a className="button rounded-xl bg-black text-white" href={this.props.searchResult.html_url.toString()}>View Repository</a>
            </div>
        </div>
    }
}

export default RepoCard;
