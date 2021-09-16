import { Component } from "react";
import { GitRepoT } from "../../@types/GitRepo";
import { StarIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import './repoCard.css';

type Props = {
    searchResult: GitRepoT
}

class RepoCard extends Component<Props> {
    state = {
        tags: [],
        truncated_desc: String,
        first_tag: { name: String, tarball_url: String },
    }
    componentDidMount() {
        if (String(this.props.searchResult.description).length > 100) {
            this.setState({ truncated_desc: `${this.props.searchResult.description.substring(0, 100)}&hellip;` });
        } else {
            this.setState({ truncated_desc: this.props.searchResult.description });
        }
        this.fetchTags();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.searchResult.tags_url !== this.props.searchResult.tags_url) {
            this.fetchTags();
        }
    }

    fetchTags = () => {
        // Search for any tags. 
        fetch(`${this.props.searchResult.tags_url.toString()}?per_page=1`, { headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${process.env.REACT_APP_PERSONAL_TOKEN}`
        }})
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
                {/* Truncated description */}
                <p className="my-2 desc-panel">{this.state.truncated_desc.toString()}</p>
                {/* Main download link */}
                <a className="block font-bold text-black link-btn" href={this.props.searchResult.html_url.toString()} rel="noreferrer" target="_blank">View Repository</a>
                {/* Tag and download link if there is one */}
                {this.state.first_tag && (
                    <a href={this.state.first_tag.tarball_url.toString()} download title="Download the tarball for this tag" rel="noreferrer" target="_blank" className="rounded-md p-3 bg-yellow-300 w-full flex justify-between items-center">
                        <p className="flex-auto text-sm">Tag <strong>{this.state.first_tag.name.toString()}</strong></p>
                        <p className="text-indigo flex justify-between text-sm w-1/3">Tarball&nbsp;<ExternalLinkIcon className="h-5 w-5" /></p>
                    </a>
                )}
            </div>
        </div>
    }
}

export default RepoCard;