// GitHub's star count for a repository link (https://github.com/<owner>/<repo>).
export function starCountUrl(repositoryUrl: string): string {
  return `${repositoryUrl.replace("https://github.com/", "https://api.github.com/repos/")}/stargazers/count`;
}
