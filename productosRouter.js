const express = require("express");
const router = express.Router();
const uploads = require("./multer/index");
const {
  getAllProductos,
  getProductById,
  addProduct,
  updateProducto,
  deleteById,
} = require("./Productos");

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductById);
router.post("/productos", uploads.single("thumbnail"), addProduct);
router.put("/productos/:id", uploads.single("thumbnail"), updateProducto);
router.delete("/productos/:id", deleteById);

module.exports = router;
