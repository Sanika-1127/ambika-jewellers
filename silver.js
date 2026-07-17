import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDPd0rVDGNQynXRkM1N5vvnzNdFlQizJY0",
  authDomain: "ambika-jewellers-23b35.firebaseapp.com",
  projectId: "ambika-jewellers-23b35",
  storageBucket: "ambika-jewellers-23b35.firebasestorage.app",
  messagingSenderId: "659183861100",
  appId: "1:659183861100:web:719bd592298c46cf9b0749"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 Get SILVER Rate
async function getRate() {
  const rateDoc = await getDoc(doc(db, "rates", "current"));

  if (!rateDoc.exists()) {
    console.error("❌ Rate not found in Firebase");
    return 0;
  }

  const rate = Number(rateDoc.data().silver); // ✅ CHANGED
  console.log("🔥 Latest Silver Rate:", rate);

  return rate;
}

// 🔥 Load Products
async function loadProducts() {
  try {
    const silverRate = await getRate(); // ✅ CHANGED

    const snapshot = await getDocs(collection(db, "products"));

    console.log("✅ Firebase connected");

    snapshot.forEach((docSnap) => {
      const p = docSnap.data();

      // 👉 Only SILVER products
      if (p.category === "silver") { // ✅ CHANGED

        const wrapper = document.querySelector(`#${p.slider} .swiper-wrapper`);

        if (wrapper) {

          const weight = parseFloat(p.weight);
          const making = Number(p.making);

          const price = (weight * silverRate) + making; // ✅ CHANGED

          wrapper.innerHTML += `
            <div class="swiper-slide">
              <div class="new-product-box">

                <a href="product.html?id=${docSnap.id}" class="new-product-img">
                  <img src="${p.image}" alt="product"/>
                  <span>New</span>

                  <button class="new-product-cart-btn">
                    <i class="fa-solid fa-cart-shopping"></i> View Product
                  </button>
                </a>

                <div class="new-product-text">
                  <a href="#" class="new-product-title">${p.name}</a>
                  
                  <span>${weight} gm</span>

                  <strong>₹ ${price.toLocaleString()}</strong>
                </div>

              </div>
            </div>
          `;
        } else {
          console.warn(`❌ Slider not found: ${p.slider}`);
        }
      }
    });

    // 🔥 Update Swiper
    setTimeout(() => {
      if (window.swiper) {
        window.swiper.update();
      }
    }, 300);

  } catch (error) {
    console.error("🔥 Error loading products:", error);
  }
}

// ✅ Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});