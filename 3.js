import fs from "fs";

const data = fs.readFileSync("./inputs/3.txt", "utf-8");

const mulIndexes = findAllIndexes(data, "mul(").map((index) => ({
  type: "mul",
  index: index,
}));
const doIndexes = findAllIndexes(data, "do()").map((index) => ({
  type: "do",
  index: index,
}));
const dontIndexes = findAllIndexes(data, "don't()").map((index) => ({
  type: "dont",
  index: index,
}));

const allIndexes = mulIndexes
  .concat(doIndexes)
  .concat(dontIndexes)
  .sort((a, b) => {
    if (a.index > b.index) return 1;
    else if (a.index < b.index) return -1;
    else return 0;
  });

const usableMulIndexes = [];

let active = true;
allIndexes.forEach((value) => {
  switch (value.type) {
    case "do":
      active = true;
      break;
    case "dont":
      active = false;
      break;
    case "mul":
      if (active) usableMulIndexes.push(value.index);
  }
});

const filteredMulValues = usableMulIndexes
  .map((index) => {
    let filteredString = data.substring(index, index + 12);

    if (filteredString.includes(")")) {
      filteredString = filteredString.substring(
        0,
        filteredString.indexOf(")") + 1
      );

      return filteredString;
    } else return null;
  })
  .filter((v) => v);

const result = filteredMulValues.reduce((inital, accumulator, index) => {
  const response = calculateMul(accumulator);

  if (isNaN(response)) return inital;
  else return inital + response;
}, 0);

console.log(result);

function findAllIndexes(str, substr) {
  const indexes = [];
  let index = str.indexOf(substr);

  while (index !== -1) {
    indexes.push(index);
    index = str.indexOf(substr, index + 1);
  }

  return indexes;
}

function calculateMul(mulString) {
  const startingIndex = mulString.indexOf("(");
  const endingIndex = mulString.indexOf(")");

  const values = mulString
    .substring(startingIndex + 1, endingIndex)
    .split(",")
    .map((v) => parseInt(v));

  const result = values[0] * values[1];

  return result;
}
