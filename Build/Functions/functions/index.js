const {onRequest} = require("firebase-functions/v2/https");
const axios = require("axios"); // axios 사용
const logger = require("firebase-functions/logger");

// 기본 라우팅 함수
exports.router = onRequest((req, res) => {
  const path = req.path;

  if (path === "/") {
    logger.info("url: /");
    res.send("Welcome to the homepage!");
  } else if (path === "/hello") {
    logger.info("url: /hello");
    res.send("Hello, Firebase!");
  } else {
    logger.info("url: Not found");
    res.status(404).send("Not Found");
  }
});

// GitHub API 호출 함수
exports.getGitHubData = onRequest(async (req, res) => {
  try {
    logger.info("GitHub API reuqest was successful");
    const response = await axios.get("https://api.github.com");
    res.status(200).send(response.data); // GitHub API 응답 반환
  } catch (error) {
    logger.error("GitHub API reuqest failed", error);
    res.status(500).send("Error retrieving data from GitHub API");
  }
});

