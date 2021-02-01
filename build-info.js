const exec = require('child_process').execSync
const pkg = require('./package.json')

// eslint-disable-next-line
const gitBranchCmd = "git branch | grep \\* | cut -d ' ' -f2"
const gitHashCmd = 'git rev-parse --short HEAD'
const gitLastCommit = 'git log -1'

module.exports = () => {
  const build = {
    git: {}
  }

  // 1) Inject package.json version
  build.version = pkg.version

  // 2) Inject git branch
  build.git.branch = exec(gitBranchCmd)
    .toString()
    .replace(/\n$/, '')

  // 3) Inject git hash
  build.git.commitHash = exec(gitHashCmd)
    .toString()
    .replace(/\n$/, '')

  // 3) Inject git hash
  build.git.commitDetails = exec(gitLastCommit).toString()

  return build
}
