let listProductos = [
  {
    id: 1,
    title: "Producto 1",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Producto 2",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Producto 3",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Producto 4",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Producto 5",
    price: 100,
    thumbnail: "https://via.placeholder.com/150",
  },
];

class Productos {
  constructor(id, title, price, thumbnail) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

const getAllProductos = async (req, res) => {
  try {
    res.json({ listProductos });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: `El error es ${error}`,
    });
  }
};

const getProductById = (req, res) => {
  try {
    const id = req.params.id;
    let prodcutoById = listProductos.find((product) => product.id == id);
    if (prodcutoById === undefined) throw new Error("Producto no encontrado");
    else res.status(200).send({ producto: prodcutoById });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const addProduct = (req, res) => {
  try {
    const { title, price } = req.body;
    const thumbnail = req.file;
    if (thumbnail) {
      const id = listProductos[listProductos.length - 1].id + 1;
      const newProduct = new Productos(id, title, price, thumbnail.path);
      listProductos.push(newProduct);

      res.status(201).json({
        id: newProduct.id,
      });
    } else {
      throw new Error("No se ha subido la imagen");
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateProducto = (req, res) => {
  try {
    const id = req.params.id;
    const { title, price } = req.body;
    const thumbnail = req.file;

    let productoById = listProductos.find((product) => product.id == id);
    if (productoById == undefined) throw new Error("Producto no encontrado");
    else {
      if (thumbnail) {
        const productoUpDate = new Productos(
          productoById.id,
          title,
          price,
          thumbnail.path
        );
        let index = listProductos.findIndex(
          (product) => product.id == productoUpDate.id
        );
        //Borro el producto viejo por id y lo agrego con el nuevo producto
        listProductos.splice(index, 1, productoUpDate);
        res.status(201).json({ message: "Producto actualizado" });
      } else {
        throw new Error("No se ha subido la imagen");
      }
    }
  } catch (error) {
    return res.status(400).json({
      erorr: error.message,
    });
  }
};

const deleteById = (req, res) => {
  try {
    const id = req.params.id;
    let productoById = listProductos.find((product) => product.id == id);
    if (productoById === undefined) throw new Error("Producto no encontrado");
    else {
      listProductos = listProductos.filter((product) => product.id != id);
      res.status(200).json({ message: "Producto eliminado" });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllProductos,
  getProductById,
  addProduct,
  updateProducto,
  deleteById,
};
