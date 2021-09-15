export type GitRepoT = {
    id: String,
    name: String,
    html_url: String,
    description: String, // Truncate to 100
    stargazers_count:  Number
}