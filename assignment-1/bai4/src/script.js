// Search functionality
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let products = document.querySelectorAll(".product-item");

searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value.toLowerCase().trim();
  products.forEach((product) => {
    const name = product
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (name.includes(keyword)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
});

// Add product button toggle
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");

addProductBtn.addEventListener("click", function () {
  addProductForm.classList.toggle("hidden");
});

// Cancel button
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", function () {
  addProductForm.classList.add("hidden");
  addProductForm.reset();
  document.getElementById("errorMsg").textContent = "";
});

// Add product form submit
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("newName").value.trim();
  const price = parseFloat(document.getElementById("newPrice").value);
  const desc = document.getElementById("newDesc").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Validation
  if (!name) {
    errorMsg.textContent = "Please enter a product name.";
    return;
  }
  if (isNaN(price) || price <= 0) {
    errorMsg.textContent = "Please enter a valid price greater than 0.";
    return;
  }

  // Clear error
  errorMsg.textContent = "";

  // Create new product article
  const newArticle = document.createElement("article");
  newArticle.className = "product-item";
  newArticle.innerHTML = `
    <h2 class="product-name">${name}</h2>
    <p class="product-desc">${desc}</p>
    <p class="product-price">Price: $${price}</p>
  `;

  // Add to products section at the beginning
  const productList = document.getElementById("product-list");
  productList.insertBefore(newArticle, productList.firstChild);

  // Update products list for search
  products = document.querySelectorAll(".product-item");

  // Reset form and hide
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
