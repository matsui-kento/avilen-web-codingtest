process.stdin.resume();
process.stdin.setEncoding("utf8");

let lines = [];
let reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.on("line", (line) => {
  lines.push(line);
});

reader.on("close", () => {
  const firstLine = lines[0].split(" ");
  const targetConcentration = parseInt(firstLine[1], 10);
  const aqueousSolutions = lines[1].split(" ").map((str) => parseInt(str, 10));

  // 水溶液がそれぞれ十分な量があるなら、
  // 目標濃度が、手元にある最も濃度が高いものの濃度以下、かつ最も濃度が低いものの濃度以上であれば、
  // 目標濃度の水溶液は作れる。
  if (
    targetConcentration <= Math.max(...aqueousSolutions) &&
    targetConcentration >= Math.min(...aqueousSolutions)
  ) {
    console.log("Yes");
  } else {
    console.log("No");
  }
});
