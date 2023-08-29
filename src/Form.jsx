import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Form() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(parseFloat(event.target.value));
  };

  const handleProductDescChange = (event) => {
    setProductDesc(event.target.value);
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: productName,
      price: productPrice,
      desc: productDesc,
      image: "link to image",
      id: uuidv4(),
    };

    try {
      const response = await fetch(
        "https://products-9fd0d-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          body: JSON.stringify(newProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Product added successfully
        console.log("Product added successfully");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setProductName("");
    setProductDesc("");
    setProductPrice("");
  };

  return (
    <div className="form">
      <h2>Add Product</h2>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={productDesc}
          onChange={handleProductDescChange}
        />
      </label>
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={handleProductPriceChange}
        />
      </label>
      <button className="add-btn" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
}

export default Form;
