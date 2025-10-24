// Search functionality
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const products = document.querySelectorAll(".product.item");

searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value.toLowerCase().trim();
  products.forEach((product) => {
    const name = product.querySelector("h2").textContent.toLowerCase();
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

// Add product form submit
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  // Create new product article
  const newArticle = document.createElement("article");
  newArticle.className = "product item";
  newArticle.innerHTML = `
    <h2>${name}</h2>
    <img src="${image}" alt="${name}">
    <p>Price: $${price}</p>
  `;

  // Add to products section
  document.querySelector(".products.section").appendChild(newArticle);

  // Reset form and hide
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
