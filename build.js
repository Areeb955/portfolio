const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const ignore = new Set(['dist','node_modules','.git','build.js','package.json','vercel.json']);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copyDir(src, dst) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (ignore.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}
copyDir(root, dist);

const owner = process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPOSITORY_OWNER || '';
const slug = process.env.VERCEL_GIT_REPO_SLUG || (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || '';
const githubUrl = owner && slug ? `https://github.com/${owner}/${slug}` : '';
const deploymentUrl = deploymentHost ? `https://${deploymentHost}` : '';
const config = `window.__PORTFOLIO_BUILD__ = ${JSON.stringify({ githubUrl, repoName: slug, deploymentUrl }, null, 2)};\n`;
fs.writeFileSync(path.join(dist, 'build-config.js'), config);
console.log('Portfolio build complete.');
console.log('GitHub:', githubUrl || 'not detected');
console.log('Portfolio:', deploymentUrl || 'resolved in browser');
