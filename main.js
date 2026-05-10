import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔴 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyDPd0rVDGNQynXRkM1N5vvnzNdFlQizJY0",
    authDomain: "ambika-jewellers-23b35.firebaseapp.com",
    projectId: "ambika-jewellers-23b35",
    storageBucket: "ambika-jewellers-23b35.firebasestorage.app",
    messagingSenderId: "659183861100",
    appId: "1:659183861100:web:719bd592298c46cf9b0749",
    measurementId: "G-LXZYCRGTCT"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load products
async function loadProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));

  let html = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();

    html += `
      <div class="swiper-slide">
        <div class="new-product-box">
          <div class="new-product-img">
            <img src="${p.image}">
          </div>

          <div class="new-product-text">
            <h3>${p.name}</h3>
            <span>${p.weight} gm</span>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}

loadProducts();