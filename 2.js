import fs from "fs";

const data = fs.readFileSync("./inputs/2.txt", "utf-8");
const lines = data.split("\n");

const validLines = lines.reduce((inital, accumulator, index) => {
  const values = accumulator.split(" ").map((v) => parseInt(v));

  let passing = checkLine(values);

  if (!passing) {
    values.forEach((value, index) => {
      const newValues = values.filter((v, ii) => ii !== index);
      const isValid = checkLine(newValues);

      if (isValid) passing = true;
    });
  }

  if (passing) return inital + 1;
  else return inital;
}, 0);

console.log(validLines);

function checkLine(values) {
  let direction; // 1 = ascending, -1 = descending

  let passing = true;

  if (values[0] < values[1]) direction = 1;
  else if (values[0] > values[1]) direction = -1;
  else passing = false;

  values.forEach((value, index) => {
    if (values[index + 1]) {
      if (direction === 1) {
        if (value >= values[index + 1]) passing = false;
      } else if (direction === -1) {
        if (value <= values[index + 1]) passing = false;
      }

      if (Math.abs(value - values[index + 1]) > 3) passing = false;
    }
  });

  return passing;
}
