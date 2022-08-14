import React, { useEffect, useState } from 'react';
import init, { add, fibonacci_wasm } from "wasm-lib";
import logo from './logo.svg';
import './App.css';

// js原生版的fibonacci (by:菩提树下的杨过 http://yjmyzz.cnblogs.com)
function fibonacci_js(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return fibonacci_js(n - 2) + fibonacci_js(n - 1);
}

function App() {
  const [ans, setAns] = useState(0);
  useEffect(() => {
    init().then(() => {
      setAns(add(1, 1));
    })
  }, [])

  //js版fibonacci测试
  let js_test = (n: number) => {
    let begin = new Date().getTime();
    let result = fibonacci_js(n);
    let end = new Date().getTime();
    console.log(`fibonacci_js(${n})\t= ${result},\t执行时间: ${end - begin} ms`);
  }

  //wasm版fibonacci测试
  let wasm_test = (n: number) => {
    let begin = new Date().getTime();
    let result = fibonacci_wasm(n);
    let end = new Date().getTime();
    console.log(`fibonacci_wasm(${n})\t= ${result},\t执行时间: ${end - begin} ms`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>1 + 1 = {ans}</p>
        <p>
          <button onClick={() => js_test(38)}>原生js测试</button>&nbsp;
          <button onClick={() => wasm_test(38)}>wasm测试</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
