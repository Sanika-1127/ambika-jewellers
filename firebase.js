import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPd0rVDGNQynXRkM1N5vvnzNdFlQizJY0",
  authDomain: "ambika-jewellers-23b35.firebaseapp.com",
  projectId: "ambika-jewellers-23b35",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("products");

  async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    let html = "";
    let shownType = new Set();

    snapshot.forEach((doc) => {
      const p = doc.data();

      if (!shownType.has(p.type)) {
        shownType.add(p.type);

        html += `
          <div class="swiper-slide">
            <div class="new-product-box">
              <a href="#" class="new-product-img">
                <img src="${p.image}" />
                <span>New</span>
                <button class="new-product-cart-btn">
                  <i class="fa-solid fa-cart-shopping"></i>Add To Cart
                </button>
              </a>

              <div class="new-product-text">
                <a href="#" class="new-product-title">${p.name}</a>
              </div>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;

    setTimeout(() => {
      if (window.swiper) {
        window.swiper.update();
      }
    }, 100);
  }

  loadProducts();
});