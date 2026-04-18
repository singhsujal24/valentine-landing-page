// FAKE API (NEW)
function fetchProducts(mode) {
  return new Promise(resolve => {

    const data = {
      single: [
        { name: "Comfort Insole", price: "₹999", oldPrice: "₹1499", image: "single1.png", category: "sleep", rating: "4.7" },
        { name: "Foot Massager", price: "₹1999", oldPrice: "₹2499", image: "single2.png", category: "gym", rating: "4.5" }
      ],
      couple: [
        { name: "Couple Combo Pack", price: "₹2499", oldPrice: "₹3499", image: "couple1.png", category: "travel", rating: "4.8" },
        { name: "Relax Slippers", price: "₹1799", oldPrice: "₹2299", image: "couple2.png", category: "sleep", rating: "4.6" }
      ]
    };

    setTimeout(() => {
      resolve(data[mode]);
    }, 300); // small delay
  });
}

// ELEMENTS
const singleBtn = document.getElementById("singleBtn");
const coupleBtn = document.getElementById("coupleBtn");

const video = document.getElementById("bgVideo");

const title = document.getElementById("title");
const desc = document.getElementById("desc");

let currentProducts = [];

// LOAD PRODUCTS
function loadProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        
        <div class="badge">SALE</div>

        <img src="${p.image}">
        
        <h3>${p.name}</h3>

        <p class="rating">⭐ ${p.rating}</p>

        <p>
          <span class="old">${p.oldPrice}</span>
          <span class="new">${p.price}</span>
        </p>

        <button class="cart-btn">Add to Cart</button>

      </div>
    `;
  });
}

// FILTER
function filterProducts(category) {
  if (category === "all") {
    loadProducts(currentProducts);
  } else {
    const filtered = currentProducts.filter(p => p.category === category);
    loadProducts(filtered);
  }
}

// SINGLE MODE
singleBtn.onclick = () => {
  document.body.className = "single";

  title.innerText = "For Yourself";
  desc.innerText = "Treat yourself with comfort and care.";

  video.src = "single.mp4";
  video.play();

  singleBtn.classList.add("active");
  coupleBtn.classList.remove("active");

  // API CALL
  fetchProducts("single").then(data => {
    currentProducts = data;
    loadProducts(data);
  });
};

// COUPLE MODE
coupleBtn.onclick = () => {
  document.body.className = "couple";

  title.innerText = "For You & Your Partner ❤️";
  desc.innerText = "Celebrate love with comfort and style.";

  video.src = "couple.mp4";
  video.play();

  coupleBtn.classList.add("active");
  singleBtn.classList.remove("active");

  // API CALL
  fetchProducts("couple").then(data => {
    currentProducts = data;
    loadProducts(data);
  });
};

// DEFAULT LOAD
video.src = "single.mp4";
video.play();

fetchProducts("single").then(data => {
  currentProducts = data;
  loadProducts(data);
});