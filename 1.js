import fs from "fs";

const data = fs.readFileSync("./inputs/1.txt", "utf8");
const lines = data.split("\n");

let leftList = [];
let rightList = [];

lines.map((line) => {
  const splitLine = line.split("   ");

  if (splitLine[0]) leftList.push(parseInt(splitLine[0]));
  if (splitLine[1]) rightList.push(parseInt(splitLine[1]));
});

leftList.sort();
rightList.sort();

const partOneResults = leftList.reduce((inital, accumulator, index) => {
  const difference = Math.abs(accumulator - rightList[index]);

  return inital + difference;
}, 0);

console.log(partOneResults);

const partTwoResults = leftList.reduceRight((inital, accumulator, index) => {
  const matches = rightList.filter((v) => v === accumulator);

  const score = accumulator * matches.length;

  return inital + score;
}, 0);

console.log(partTwoResults);
