import { response } from "express";
import productsRepository from "../repositories/products.repository.js";

class ProductsController {
  create(request, response) {
    console.log("body: ", request.body);
    productsRepository.create({
      title: request.body.title,
      price: request.body.price,
    });
    response.send({
      message: "Recibido",
      ok: true,
    });
  }
  getAll(request, response) {
    const products = productsRepository.getAll();
    response.send({
      ok: true,
      products: products,
    });
  }
}
const productsController = new ProductsController();
export default productsController;
