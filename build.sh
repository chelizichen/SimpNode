#!/bin/bash  

readonly ServerName="TestNodeServer"
rm -r ./build
rm ./$ServerName.tar.gz
mkdir ./build

npm run build

cp ./simp.yaml ./build/
cp package.json ./build/
cp package-lock.json ./build/

cd build 
npm i --production
cd ..
tar -cvf $ServerName.tar.gz ./build