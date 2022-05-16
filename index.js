const express = require("express");
const app = express();
const routerProductos = require("./productosRouter");
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerProductos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
