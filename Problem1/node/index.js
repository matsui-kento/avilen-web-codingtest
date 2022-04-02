const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.writeHead(200, { "Content-Type": "text/html" });

  let answer = [];
  let data = "";
  let obj = {};

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    if (data) {
      obj = JSON.parse(data).obj;
      for (let number = 1; number < 31; number++) {
        let matchText = [];
        for (const pattern of obj) {
          if (number % pattern.num == 0) {
            matchText.push(pattern.text);
          }
        }

        if (matchText.length) {
          answer.push(matchText.join(""));
        } else {
          answer.push(number.toString());
        }
      }

      res.write(answer.join(", "));
      res.end();
    } else {
      res.end();
    }
  });
});
server.listen(8080);
