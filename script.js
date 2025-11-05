const updates = {
    web: [
    { text: "📢 New React course launched on freeCodeCamp.", category: "course" },
    { text: "💼 Job opening: Frontend Developer at TechSpark.", category: "job" },
    { text: "🧠 Webinar: UI/UX Best Practices for 2025.", category: "event" }
  ],
  data: [
    "📊 IBM's free Data Science course is live now.",
    "📢 Hiring: Data Analyst at Infosys.",
    "📚 New book released: 'Practical ML in Python'."
  ],
  civil: [
    "📰 UPSC 2025 Prelims notification out.",
    "🎯 Strategy session by Toppers this Sunday.",
    "📘 Download free mock tests for MPSC & UPSC."
  ]
};
let selectedField = "";
let currentUpdates = [];
const careerSelect = document.getElementById("careerSelect");
const searchInput = document.getElementById("searchInput");
const updatesContainer = document.getElementById("updates");

careerSelect.addEventListener("change", function () {
  selectedField = this.value;
  searchInput.value = ""; // Clear previous search
  renderUpdates(updates[selectedField] || []);
});
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = currentUpdates.filter(update =>
    update.toLowerCase().includes(query)
  );
  renderUpdates(filtered);
});


document.getElementById('careerSelect').addEventListener('change', function () {
  const field = this.value;
  const updatesContainer = document.getElementById('updates');
  updatesContainer.innerHTML = "";

  if (updates[field]) {
    updates[field].forEach(update => {
      const card = document.createElement('div');
      card.className = 'update-card';
      card.innerText = update;
      updatesContainer.appendChild(card);
    });
  }
});

function showUpdates() {
  const career = document.getElementById("career").value;
  const updatesDiv = document.getElementById("updates");
  updatesDiv.innerHTML = "";

  if (!career) {
    updatesDiv.innerHTML = "<p>Please select a valid field.</p>";
    return;
  }

  db.collection("career_updates")
    .where("field", "==", career)
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        updatesDiv.innerHTML = "<p>No updates available.</p>";
      } else {
        snapshot.forEach(doc => {
          const data = doc.data();
          const div = document.createElement("div");
          div.className = "update-item";
          div.innerText = data.title;
          updatesDiv.appendChild(div);
        });
      }
    })
    .catch(error => {
      console.error("Error fetching updates: ", error);
    });
}
