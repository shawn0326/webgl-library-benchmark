# WebGL Library Benchmark

A benchmark project for comparing the performance of popular WebGL libraries: **t3d**, **three.js**, and **Babylon.js**.

This project provides a series of standardized rendering tests to evaluate the performance of these libraries under various conditions.

## How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start a local server:**
    Run a simple HTTP server from the project root. For example, with Node.js:
    ```bash
    npx serve
    ```
3.  **Open in browser:**
    Visit `http://localhost:<port>` in your web browser (the port depends on the server you use, e.g., `serve` often uses `http://localhost:3000`).

## Benchmark Results

Detailed test results are documented in [**BENCHMARK.md**](./BENCHMARK.md).

[Online tests](https://shawn0326.github.io/webgl-library-benchmark/)

## Disclaimer

**Please note:** These tests are only single-item tests under limited conditions. The results are for reference only and do not represent the performance level of the engines in actual, complex projects.
