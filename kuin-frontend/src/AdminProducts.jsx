import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProducts.css";

function AdminProducts() {

  const API_URL = "http://localhost:8085/products";
  const SERVER_URL = "http://localhost:8085";

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Leggings",
    subcategory: "Regular Leggings",
    description: "",
    price: "",
    stock: "",
    images: []
  });


  // =========================
  // GET PRODUCTS
  // =========================

  const fetchProducts = () => {

    fetch(API_URL)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();

      })
      .then((data) => {

        setProducts(data);

      })
      .catch((error) => {

        console.error(
          "Error fetching products:",
          error
        );

      });

  };


  useEffect(() => {

    fetchProducts();

  }, []);


  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // CATEGORY CHANGE
  // =========================

  const handleCategoryChange = (e) => {

    const category = e.target.value;

    let subcategory = "";

    if (category === "Leggings") {
      subcategory = "Regular Leggings";
    }

    else if (category === "Kurtis") {
      subcategory = "Printed Kurtis";
    }

    else if (category === "Tops") {
      subcategory = "Casual Tops";
    }

    else if (category === "Dresses") {
      subcategory = "Casual Dresses";
    }

    setFormData({
      ...formData,
      category: category,
      subcategory: subcategory
    });

  };


  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {

    const selectedFiles = Array.from(
      e.target.files
    );

    if (selectedFiles.length === 0) {
      return;
    }

    if (selectedFiles.length > 5) {

      alert(
        "You can select a maximum of 5 images."
      );

      e.target.value = "";
      return;
    }

    // Check that all selected files are images
    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {

      alert(
        "Please select image files only."
      );

      e.target.value = "";
      return;
    }

    setFormData({
      ...formData,
      images: selectedFiles
    });

  };


  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setFormData({
      name: "",
      category: "Leggings",
      subcategory: "Regular Leggings",
      description: "",
      price: "",
      stock: "",
      images: []
    });

    setEditingId(null);
    setShowForm(false);

  };


  // =========================
  // ADD PRODUCT WITH IMAGES
  // =========================

  const handleAddProduct = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      formData.stock === ""
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    if (formData.images.length === 0) {

      alert(
        "Please select at least one product image."
      );

      return;
    }

    if (formData.images.length > 5) {

      alert(
        "You can select a maximum of 5 images."
      );

      return;
    }


    const product = {

      productName: formData.name,

      category: formData.category,

      subcategory: formData.subcategory,

      description: formData.description,

      price: Number(formData.price),

      stockQuantity: Number(formData.stock)

    };


    // =========================
    // CREATE FORM DATA
    // =========================

    const data = new FormData();


    // Product JSON
    data.append(
      "product",
      new Blob(
        [JSON.stringify(product)],
        {
          type: "application/json"
        }
      )
    );


    // Images
    formData.images.forEach((image) => {

      data.append(
        "images",
        image
      );

    });


    console.log(
      "Uploading product:",
      product
    );

    console.log(
      "Images:",
      formData.images
    );


    try {

      const response = await fetch(
        `${API_URL}/with-images`,
        {
          method: "POST",
          body: data
        }
      );


      const responseText =
        await response.text();


      console.log(
        "Backend response:",
        responseText
      );


      if (!response.ok) {

        alert(
          `Failed to add product.\n\nStatus: ${response.status}\n\n${responseText}`
        );

        return;
      }


      alert(
        "Product added successfully!"
      );


      resetForm();

      fetchProducts();


    } catch (error) {

      console.error(
        "Image upload error:",
        error
      );

      alert(
        `Cannot connect to backend.\n\n${error.message}`
      );

    }

  };


  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (product) => {

    setEditingId(product.id);

    setFormData({

      name: product.productName,

      category: product.category,

      subcategory: product.subcategory,

      description:
        product.description || "",

      price: product.price,

      stock: product.stockQuantity,

      images: []

    });

    setShowForm(true);

  };


  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleUpdate = async (e) => {

    e.preventDefault();


    const product = {

      productName: formData.name,

      category: formData.category,

      subcategory: formData.subcategory,

      description: formData.description,

      price: Number(formData.price),

      stockQuantity: Number(formData.stock)

    };


    try {

      const response = await fetch(
        `${API_URL}/${editingId}`,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(product)

        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Backend error:",
          response.status,
          errorText
        );

        alert(
          `Failed to update product.\nStatus: ${response.status}\n${errorText}`
        );

        return;
      }


      alert(
        "Product updated successfully!"
      );


      resetForm();

      fetchProducts();


    } catch (error) {

      console.error(
        "Error updating product:",
        error
      );

      alert(
        "Failed to update product."
      );

    }

  };


  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to delete product"
        );

      }


      alert(
        "Product deleted successfully!"
      );


      fetchProducts();


    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

      alert(
        "Failed to delete product."
      );

    }

  };


  // =========================
  // IMAGE URL
  // =========================

  const getImageUrl = (product) => {

    // New uploaded images
    if (
      product.images &&
      product.images.length > 0
    ) {

      const image =
        product.images[0].imageUrl;

      if (image.startsWith("http")) {
        return image;
      }

      return `${SERVER_URL}${image}`;
    }


    // Old image URL
    if (product.imageUrl) {
      return product.imageUrl;
    }


    return "";
  };


  return (

    <div className="admin-products-page">


      {/* =========================
          HEADER
      ========================= */}

      <header className="admin-products-header">

        <div>

          <Link
            to="/admin/dashboard"
            className="admin-back-link"
          >
            ← Dashboard
          </Link>

          <h1>
            PRODUCT MANAGEMENT
          </h1>

        </div>


        <button
          className="add-product-btn"
          onClick={() => {

            resetForm();
            setShowForm(true);

          }}
        >
          + ADD NEW PRODUCT
        </button>

      </header>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (

        <section className="product-form-section">


          <div className="product-form-header">

            <div>

              <p>
                {editingId
                  ? "EDIT PRODUCT"
                  : "NEW PRODUCT"}
              </p>

              <h2>
                {editingId
                  ? "UPDATE PRODUCT"
                  : "ADD NEW PRODUCT"}
              </h2>

            </div>


            <button
              className="close-form-btn"
              onClick={resetForm}
            >
              ×
            </button>

          </div>


          <form
            className="product-form"
            onSubmit={
              editingId
                ? handleUpdate
                : handleAddProduct
            }
          >


            {/* =========================
                NAME + PRICE
            ========================= */}

            <div className="form-row">

              <div className="form-field">

                <label>
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="form-field">

                <label>
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* =========================
                CATEGORY + SUBCATEGORY
            ========================= */}

            <div className="form-row">


              <div className="form-field">

                <label>
                  Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >

                  <option value="Leggings">
                    Leggings
                  </option>

                  <option value="Kurtis">
                    Kurtis
                  </option>

                  <option value="Tops">
                    Tops
                  </option>

                  <option value="Dresses">
                    Dresses
                  </option>

                </select>

              </div>


              <div className="form-field">

                <label>
                  Subcategory *
                </label>

                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >

                  {formData.category ===
                    "Leggings" && (
                    <>
                      <option value="Regular Leggings">
                        Regular Leggings
                      </option>

                      <option value="Kurti Leggings">
                        Kurti Leggings
                      </option>

                      <option value="Shimmer Leggings">
                        Shimmer Leggings
                      </option>
                    </>
                  )}


                  {formData.category ===
                    "Kurtis" && (
                    <>
                      <option value="Printed Kurtis">
                        Printed Kurtis
                      </option>

                      <option value="Cotton Kurtis">
                        Cotton Kurtis
                      </option>

                      <option value="Designer Kurtis">
                        Designer Kurtis
                      </option>
                    </>
                  )}


                  {formData.category ===
                    "Tops" && (
                    <>
                      <option value="Casual Tops">
                        Casual Tops
                      </option>

                      <option value="Party Tops">
                        Party Tops
                      </option>
                    </>
                  )}


                  {formData.category ===
                    "Dresses" && (
                    <>
                      <option value="Casual Dresses">
                        Casual Dresses
                      </option>

                      <option value="Party Dresses">
                        Party Dresses
                      </option>
                    </>
                  )}

                </select>

              </div>

            </div>


            {/* =========================
                DESCRIPTION
            ========================= */}

            <div className="form-field">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />

            </div>


            {/* =========================
                STOCK
            ========================= */}

            <div className="form-field">

              <label>
                Stock Quantity *
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Enter stock quantity"
                min="0"
                value={formData.stock}
                onChange={handleChange}
              />

            </div>


            {/* =========================
                PRODUCT IMAGES
            ========================= */}

            {!editingId && (

              <div className="form-field">

                <label>
                  Product Images *
                </label>


                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />


                <small>
                  Select up to 5 images
                  from your Gallery /
                  File Explorer.
                </small>


                {/* IMAGE PREVIEW */}

                {formData.images.length > 0 && (

                  <div className="selected-images">

                    {formData.images.map(
                      (image, index) => (

                        <div
                          className="selected-image"
                          key={index}
                        >

                          <img
                            src={
                              URL.createObjectURL(
                                image
                              )
                            }
                            alt={
                              `Product ${index + 1}`
                            }
                          />

                          <span>
                            Image {index + 1}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            )}


            {/* =========================
                BUTTONS
            ========================= */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-product-btn"
                onClick={resetForm}
              >
                CANCEL
              </button>


              <button
                type="submit"
                className="save-product-btn"
              >

                {editingId
                  ? "UPDATE PRODUCT"
                  : "ADD PRODUCT"}

              </button>

            </div>

          </form>

        </section>

      )}


      {/* =========================
          PRODUCT TABLE
      ========================= */}

      <section className="admin-product-list">

        <div className="product-list-heading">

          <div>

            <p>
              KUIN COLLECTION
            </p>

            <h2>
              ALL PRODUCTS
            </h2>

          </div>

          <span>
            {products.length} Products
          </span>

        </div>


        <div className="product-table-wrapper">

          <table className="product-table">

            <thead>

              <tr>

                <th>PRODUCT</th>

                <th>CATEGORY</th>

                <th>PRICE</th>

                <th>STOCK</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {products.map(
                (product) => (

                <tr key={product.id}>


                  <td>

                    <div
                      className="admin-product-info"
                    >

                      <img
                        src={getImageUrl(product)}
                        alt={
                          product.productName
                        }
                      />


                      <div>

                        <strong>
                          {product.productName}
                        </strong>

                        <span>
                          {product.subcategory}
                        </span>

                      </div>

                    </div>

                  </td>


                  <td>
                    {product.category}
                  </td>


                  <td>
                    ₹{product.price}
                  </td>


                  <td>

                    <span
                      className={
                        product.stockQuantity <= 5
                          ? "low-stock"
                          : "in-stock"
                      }
                    >
                      {product.stockQuantity}
                    </span>

                  </td>


                  <td>

                    <div
                      className="product-actions"
                    >

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        EDIT
                      </button>


                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >
                        DELETE
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );

}

export default AdminProducts;