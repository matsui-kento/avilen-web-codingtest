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
  lines.shift();
  for (const line of lines) {
    const count = calculateCount(line);
    console.log(count);
  }
});

const calculateCount = (line) => {
  const [A, B, C] = line.split(" ").map(Number);
  const min = Math.min(A, B, C);
  const max = Math.max(A, B, C);

  // 全て同じ数字の場合
  if (A == B && B == C && C == A) {
    if (A >= 3) {
      return 3;
    } else {
      return -1;
    }
  }

  // 全ての数字が異なり、Bが最大値もしくは最小値の場合
  const isMaxOrMin = B == min || B == max;
  if (A != B && B != C && C != A && isMaxOrMin) {
    return 0;
  }

  // 2つの数字が同じで、Bが最小値の場合
  if (B == min) {
    if (A == C) {
      if (max - min > 1) {
        return 1;
      } else {
        if (min == 1) {
          return -1;
        } else {
          return 2;
        }
      }
    } else if (A == B || C == B) {
      if (min == 1) {
        return -1;
      } else {
        return 1;
      }
    }
  }

  // 2つの数字が同じで、Bが最大値の場合
  if (B == max) {
    if (A == C) {
      if (min == 1) {
        return -1;
      } else {
        return 1;
      }
    } else if (A == B || C == B) {
      if (max - min > 1) {
        return 1;
      } else {
        if (min == 1) {
          return -1;
        } else {
          return 2;
        }
      }
    }
  }

  // 全ての数字が異なり、Bが中間値の場合
  let isReduceMaxForMin1 = false;
  const minDiff = B - min;
  const maxDiff = max - B;

  // 最小値からの距離の方が近い場合
  if (minDiff < maxDiff) {
    if (min == 1) {
      isReduceMaxForMin1 = true;
    } else {
      return minDiff + 1;
    }
  }

  // 最大値からの距離の方が近い
  // もしくは最小値からの方が近いが、最小値が1のため、Bを最小値にできない場合
  if (minDiff > maxDiff || isReduceMaxForMin1) {
    return maxDiff + 1;
  }

  // 最小値からの距離と最大値からの距離が同じ場合
  if (minDiff == maxDiff) {
    if (min == 1) {
      return -1;
    } else {
      return minDiff + 1;
    }
  }
};
