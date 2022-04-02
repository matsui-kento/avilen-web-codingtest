import React from "react";
import axios from "axios";
import "./App.css";

interface Pattern {
  obj: {
    num: number;
    text: string;
  }[];
}

const url = "http://localhost:8080/" as string;
const pattern = {
  obj: [
    { num: 4, text: "fizz" },
    { num: 7, text: "buzz" },
    { num: 8, text: "hoge" },
    { num: 15, text: "huga" },
  ],
} as Pattern;

class App extends React.Component<{}, { ans: string }> {
  constructor(props: any) {
    super(props);
    this.state = { ans: "FizzBuzz" };
    this.func = this.func.bind(this);
  }

  func() {
    axios
      .post(url, pattern)
      .then((response: any) => {
        this.setState({ ans: response.data });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="buttons">
            <button onClick={this.func}>パターンを送信</button>
          </div>
          <div className="result">
            <p>出力結果:{this.state.ans}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
