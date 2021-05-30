module.exports = {
  index(req, res) {
    return res.sendFile("index.html", { root: "src/views" });
  },
};
