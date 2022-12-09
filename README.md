<img src="https://raw.githubusercontent.com/worldcoin/tech-blog/bda6d68b1c82af85a61aad2017beac47336aa458/worldcoin-logo.svg?token=AETZVSMKV5LN4V7B46FYZ5TDSODPG" alt="Worldcoin logo" width="300" />

# Worldcoin Tech Blog

The Worldcoin Tech Blog contains articles on AI, Cryptography & Blockchain, Hardware and various other relevant topics at Worldcoin.

## 🧑‍💻 Local development

These instructions contain steps to run the blog website from scratch, feel free to skip parts that do not apply.

1. Install Node.js through [nvm](https://github.com/nvm-sh/nvm). If you have issues installing `nvm`, check their repo.

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
   # once nvm is installed
   nvm install 18
   # install `yarn` package manager
   corepack enable
   corepack prepare yarn@stable --activate
   ```

2. After cloning the repository, run the following commands in the project directory

   ```bash
    nvm use 18 # to activate correct Node.js version
    yarn # to install all dependencies
   ```

3. Run the project, which will be available in `http://localhost:3000`

   ```bash
   yarn dev
   ```

## ✍️ Writing an article

The following recommendations will be useful when writing an article:

1. Create your article either with Markdown or mdx on `src/pages/blog`. Use a URL-friendly slug.
2. Use only the categories defined in `types.ts`
3. Images can be added in `public/images/blog/[your-article-slug]/`.
4. If this is your first article, add your profile pic on `public/images/authors` (`webp` format preferred).
5. If cspell is showing an incorrect spelling mistake, just add the new word in `cspell.json`
6. When you open a PR, the CI will run on GitHub actions to make sure your PR doesn't break anything.
7. Before merging with main, request a review of your article with either the marketing or comms department. (TODO: Add slack handles for respective departments and necessary group reviews before merging new articles with main)
