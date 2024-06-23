import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

async function loadConfig() {
  const response = await fetch('config.json');
  const config = await response.json();
  return config.firebaseConfig;
}

async function main() {
  const firebaseConfig = await loadConfig();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const form = document.getElementById('doaForm');
  const nameInput = document.getElementById('name');
  const doaInput = document.getElementById('doa');
  const list = document.getElementById('list');

  // Fetch and display doas
  async function fetchDoas() {
    const querySnapshot = await getDocs(collection(db, "doas"));
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${doc.data().name}:</strong><br>${doc.data().doa}`;
      list.appendChild(li);
    });
  }

  // Add new doa
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const doa = doaInput.value;

    try {
      await addDoc(collection(db, "doas"), { name, doa });
      nameInput.value = '';
      doaInput.value = '';
      fetchDoas();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

  // Initial fetch
  fetchDoas();


}

main().catch(console.error);