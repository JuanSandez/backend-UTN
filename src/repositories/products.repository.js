const products = [
  { title: "Tv noblex", price: 4000, id: 1 },
  { title: "Tv Phillips", price: 5000, id: 2 },
  { title: "Tv Samsung", price: 6000, id: 3 },
];

class Product {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }
}

class ProductsRepository {
  create({ title, price }) {
    const product = (title, price);
    products.push(product);
    console.log(products);
  }

  getAll() {
    return products;
  }
}
const productsRepository = new ProductsRepository();
export default productsRepository;
