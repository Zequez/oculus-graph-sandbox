#!/usr/bin/env bash
set -e
npm run build
cd build
git init .
git add -A
git commit -m "Build `date`"
git remote add origin https://github.com/Zequez/oculus-graph-sandbox.git
git push origin master:gh-pages --force
