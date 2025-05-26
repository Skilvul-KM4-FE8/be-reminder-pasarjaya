module.exports = {
  executablePath: "/Applications/Chromium.app/Contents/MacOS/Chromium" || process.env.PUPPETEER_EXECUTABLE_PATH,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
