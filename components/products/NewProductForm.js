import { useState } from "react";

export default function NewProductForm({ categories,  }) {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  return (
    <form>
      <label>
        Product name:{" "}
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
      </label>
      <label>
        Category:{" "}
        <select
          value={categoryId}
          onChange={(e) => setCateogoryId(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
