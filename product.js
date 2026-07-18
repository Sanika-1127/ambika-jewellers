import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDPd0rVDGNQynXRkM1N5vvnzNdFlQizJY0",
  authDomain: "ambika-jewellers-23b35.firebaseapp.com",
  projectId: "ambika-jewellers-23b35",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 Get product ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 🔥 Get rate
async function getRate(category) {
  const rateDoc = await getDoc(doc(db, "rates", "current"));

  if (!rateDoc.exists()) return 0;

  return Number(rateDoc.data()[category]);
}

// 🔥 Load product
async function loadProduct() {
  try {

    const productDoc = await getDoc(doc(db, "products", id));
    const p = productDoc.data();

    const rate = await getRate(p.category);

    const weight = parseFloat(p.weight);
    const making = Number(p.making);

    const metalPrice = weight * rate;
    const makingCharges = weight * making;
    const total = metalPrice + makingCharges;

    // ✅ DISPLAY
    document.getElementById("name").innerText = p.name;
    document.getElementById("image").src = p.image;

    document.getElementById("weight").innerText =
      "Weight: " + weight + " gm";

    // document.getElementById("making").innerText =
    //   "Making Charges: ₹ " + making + " / gm";

    document.getElementById("price").innerHTML = `
    ${p.category.toUpperCase()} Rate: ₹ ${rate} / gm <br>

   
  `;

    // 🔥 WHATSAPP CODE (SEPARATE)
    const phoneNumber = "919527393518";

    const productUrl = `https://ambika-jewellers96.netlify.app/product.html?id=${id}`;

const message = `
Hello, I want to enquire about *${p.name}*

📦 Weight: ${weight} gm
💰 ${p.category.toUpperCase()} Rate: ₹ ${rate}/gm

🔗 Product:
${productUrl}
`;

    document.getElementById("whatsappBtn").addEventListener("click", () => {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });

  } catch (error) {
    console.error("🔥 Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProduct);

 // Metal Price:
    // ${weight} × ${rate}
    // = ₹ ${metalPrice.toLocaleString()} <br>

    // Making Charges:
    // ${weight} × ${making}
    // = ₹ ${makingCharges.toLocaleString()} <br><br>

    // <strong>Total Price: ₹ ${total.toLocaleString()}</strong>

// 🛠 Making Charges: ₹ ${makingCharges.toLocaleString()}
// 💎 Total Price: ₹ ${total.toLocaleString()}