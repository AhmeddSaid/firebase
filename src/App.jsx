import { useState, useEffect } from "react";
import Form from "./Form";

function App() {
  const [products, setProducts] = useState([]);

  // fetch data form API
  useEffect(function () {
    getProducts();
  }, []);

  // fetch products
  async function getProducts() {
    try {
      const res = await fetch(
        "https://products-9fd0d-default-rtdb.firebaseio.com/products.json"
      );

      if (res.ok) {
        const data = await res.json();
        // extract items from the data object
        const productArray = Object.values(data).filter(
          (item) => typeof item === "object"
        );
        setProducts(productArray);
      }
      // const data = await res.json();
      // console.log(data);
      // setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteItemById = async (itemId) => {
    const productsUrl =
      "https://products-9fd0d-default-rtdb.firebaseio.com/products.json";

    try {
      // Fetch the list of products
      const response = await fetch(productsUrl);
      const productsData = await response.json();

      // Find the item with the matching ID
      const itemToDeleteKey = Object.keys(productsData).find(
        (key) => productsData[key].id === itemId
      );

      if (itemToDeleteKey) {
        // Delete the item
        const deleteUrl = `https://products-9fd0d-default-rtdb.firebaseio.com/products/${itemToDeleteKey}.json`;
        const deleteResponse = await fetch(deleteUrl, {
          method: "DELETE",
        });

        if (deleteResponse.ok) {
          console.log("Item deleted successfully");
        } else {
          console.error("Error deleting item");
        }
      } else {
        console.error("Item not found");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDelete = (itemid) => {
    deleteItemById(itemid);
  };

  console.log(products);
  return (
    <div className="app">
      <Form />
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <li key={product.id} className="product">
            <h1>Name : {product.name}</h1>
            <h2>Description : {product.desc}</h2>
            <h3>Price : {product.price}$</h3>
            <button
              className="delete-btn"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default App;
