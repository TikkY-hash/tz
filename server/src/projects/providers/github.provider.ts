import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import fetch from 'node-fetch';
import githubConfig from 'src/config/github.config';

@Injectable()
export class GitHubProvider {
  constructor(
    @Inject(githubConfig.KEY)
    private readonly config: ConfigType<typeof githubConfig>,
  ) {}

  async fetchRepoData(path: string) {
    const [owner, repo] = path.split('/');

    if (!owner || !repo) {
      throw new NotFoundException('Invalid repository path');
    }

    const res = await fetch(`${this.config.github}${owner}/${repo}`);

    if (!res.ok) {
      throw new NotFoundException('GitHub repository not found');
    }

    const data = await res.json();

    return {
      name: data.name,
      owner: data.owner.login,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: new Date(data.created_at).getTime(),
    };
  }
}
