const fse = require('fs-extra');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build');

fse.removeSync(DIST_DIR);
fse.removeSync(BUILD_DIR);
