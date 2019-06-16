import {exec} from 'child_process';

const ignoredCommits = [
  'f107f79', '50b53e5', '8da492c', 'b57a9cd', 'e5a6b3b', '220c75d', '985780a', 'b11c291', '22faa4a', 'fb8a5ccb',
  'a7ca8886', 'f51ed4ad', '64d86183', '8a15a5d', '7bcc5f42', 'dc154075', 'dd8fbb95', '94b6aacd', '441854e2', '62310d68',
  'ad4194db', '4ed250f7', 'b805e094', 'da6e92ee', '8c63a103', 'c6935c16', 'cc58687a', '2e76eeaa', '660712e5', 'd96d6a2a',
  '84b5e3fa', 'e42c9248', 'b481d93a', '954e1430', '577b3643', '71155549', 'cd2177f8', 'cf8f4f4d', '139ff5cb', '4474fd62',
  '24c63071', 'ec0e613d', 'e36dc561', 'f23bb9e1', '6ae6f444', '92c4d876', '39dd57ea', '01c21cd5', 'c5038953', '788ee44f',
  '371c3d1f'
];

const tagToSemver = tag => tag.split('.').map(s => s.replace(/^[^\d]*(\d+)[^\d]*$/, '$1')).map(i => +i);

const sortSemversReverse = ([majorA, minorA, patchA], [majorB, minorB, patchB]) => {
  if (majorA !== majorB) return Math.sign(majorB - majorA);
  if (minorA !== minorB) return Math.sign(minorB - minorA);
  if (patchA !== patchB) return Math.sign(patchB - patchA);
  return 0;
};

export default class GitHelper {
  git(cmd, noTrim) {
    return new Promise((res, rej) => exec(`git ${cmd}`, {maxBuffer: 1024 * 1024}, (err, out) => {
      if (err) {
        console.error(`git ${cmd} failed!`);
        return rej(err);
      }
      out = out.toString('utf8');
      if (!noTrim) out = out.replace(/^\s*(.*)\s*$/gm, '$1');
      return res(out);
    }));
  }

  async getCommits(sha1, sha2) {
    const commits = {};
    (await this.git(`log ${sha1}..${sha2} --oneline`))
      .split('\n')
      .map(l => [l.substr(0, l.indexOf(' ')), l.substr(l.indexOf(' ') + 1)])
      .filter(([sha]) => !ignoredCommits.find(ignoredSha => sha.indexOf(ignoredSha) === 0))
      .filter(([sha, message]) => !message.match(/v\d+\.\d+\.\d+/))
      .forEach(([sha, message]) => commits[sha] = message.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    return commits;
  }

  getFile(name, sha) {
    return this.git(`show ${sha}:${name}`, true);
  }

  async getFiles(shas) {
    const files = {};
    const shaArgs = shas.join(' ');

    const changedFiles = (await this.git(`show --name-only --oneline ${shaArgs}`));
    for (let i = 1; i < shas.length; i++) {
      const currentSha = shas[i - 1];
      const startIndex = changedFiles.indexOf(currentSha);
      const endIndex = changedFiles.indexOf(shas[i]);
      const [commitMessage, ...changedFilesForSha] = changedFiles.substring(startIndex, endIndex).split('\n');
      files[currentSha] = changedFilesForSha.filter(file => file.indexOf('src') !== -1);
    }

    const lastSha = shas[shas.length - 1];
    const lastCommitIndex = changedFiles.indexOf(lastSha);
    const [commitMessage, ...changedFilesForSha] = changedFiles.substring(lastCommitIndex).split('\n');
    files[lastSha] = changedFilesForSha.filter(file => file.indexOf('src') !== -1);

    return files;
  }

  getSummary(files, commits) {
    const summary = {};
    Object.keys(files).forEach(sha => {
      files[sha].forEach(file => {
        let category, comp;
        if (file.indexOf('src/pivotal-ui/components/') !== -1) {
          category = 'CSS';
          comp = file.match(/src\/pivotal-ui\/components\/([^/]+)/)[1];
        }
        if (file.indexOf('src/css/') !== -1) {
          category = 'CSS';
          comp = file.match(/src\/css\/([^/]+)/)[1];
        }
        if (file.indexOf('src/pivotal-ui-react/') !== -1) {
          category = 'React';
          comp = file.match(/src\/pivotal-ui-react\/([^/]+)/)[1];
        }
        if (file.indexOf('src/react/') !== -1) {
          category = 'React';
          comp = file.match(/src\/react\/([^/]+)/)[1];
        }
        if (file.indexOf('src/pivotal-ui/prismjs/') !== -1) {
          category = 'JS';
          comp = file.match(/src\/pivotal-ui\/prismjs\/([^/]+)/)[1];
        }
        if (file.indexOf('src/js/') !== -1) {
          category = 'JS';
          comp = file.match(/src\/js\/([^/]+)/)[1];
        }
        if (!category || !comp) return;
        if (!summary[category]) summary[category] = {};
        if (!summary[category][comp]) summary[category][comp] = {};
        summary[category][comp][sha] = commits[sha];
      });
    });
    return summary;
  }

  getForkPoint(branch1, branch2) {
    return this.git(`merge-base ${branch1} ${branch2}`);
  }

  async getLatestCommit(version) {
    const [major] = tagToSemver(version);
    const branches = (await this.git('branch')).split('\n').map(branch => branch.substring(2));
    const branch = `v${major}`;
    try {
      return await this.git(`rev-parse ${version}`);
    } catch (e) {
    }
    return this.git(`log ${branches.indexOf(branch) !== -1 ? branch : 'master'} -1 --oneline --format=format:%H`);
  }

  async getPreviousTagSha(version) {
    const [major, minor, patch] = tagToSemver(version);
    let tags = (await this.git('tag')).split('\n').map(tagToSemver);
    tags = tags.filter(([major, minor, patch]) => !(isNaN(major) || isNaN(minor) || isNaN(patch)));
    tags.sort(sortSemversReverse);
    if (minor === 0 && patch === 0) return this.getForkPoint('master', `v${major - 1}`);
    let previousTag;
    if (patch === 0) {
      previousTag = tags.find(([tagMajor, tagMinor]) => tagMajor === major && tagMinor < minor);
    } else {
      previousTag = tags.find(([tagMajor, tagMinor, tagPatch]) => tagMajor === major && tagMinor === minor && tagPatch < patch);
    }
    if (!previousTag) throw new Error(`Could not find a previous tag for ${version}`);
    return this.getTagSha(`v${previousTag.join('.')}`);
  }

  getTagSha(tag) {
    return this.git(`rev-list -n 1 ${tag}`);
  }

  async getCommitDate(tag) {
    const out = await this.git(`show -s --format=%ct ${tag}`);
    return 1000 * out.split('\n').pop();
  }

  async getTags(firstTag, version) {
    const [firstTagMajor, firstTagMinor, firstTagPatch] = tagToSemver(firstTag);
    const [versionMajor] = tagToSemver(version);
    let tags = (await this.git('tag')).split('\n').map(tagToSemver);
    tags = tags.filter(([major, minor, patch]) => !(isNaN(major) || isNaN(minor) || isNaN(patch)));
    tags.sort(sortSemversReverse);
    return tags.filter(([major2, minor2, patch2]) => {
      if (major2 < firstTagMajor) return;
      if (major2 > versionMajor) return;
      if (major2 <= firstTagMajor && minor2 < firstTagMinor) return;
      if (major2 <= firstTagMajor && minor2 <= firstTagMinor && patch2 < firstTagPatch) return;
      return true;
    }).map(([major2, minor2, patch2]) => `v${major2}.${minor2}.${patch2}`);
  }
};