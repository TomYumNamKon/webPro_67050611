const initialEvents = [
  { id: 1, title: "Modern JavaScript & ES6+ Workshop", category: "Tech", speaker: "Dr. Somchai Dev", date: "2026-09-15", seats: 5, description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules", isRegistered: false },
  { id: 2, title: "UX/UI Design System Creation", category: "Design", speaker: "Aj. Ananya Design", date: "2026-09-20", seats: 0, description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS", isRegistered: false },
  { id: 3, title: "Startup Pitching & Funding 101", category: "Business", speaker: "Khun Vorapat VC", date: "2026-09-25", seats: 12, description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี", isRegistered: false },
  { id: 4, title: "Cybersecurity Essentials for Web Apps", category: "Tech", speaker: "Dr. Prasit Security", date: "2026-10-01", seats: 8, description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end", isRegistered: false }
];

const STORAGE_KEY = "smartEventHub_events";
const THEME_KEY = "smartEventHub_theme";

let events = [];
let searchText = "";
let selectedCategory = "";
let sortBy = "date-asc";

function copyEvent(e) {
  return { id: e.id, title: e.title, category: e.category, speaker: e.speaker, date: e.date, seats: e.seats, description: e.description, isRegistered: e.isRegistered };
}

function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  document.getElementById("darkModeBtn").textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
}

function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function loadEvents() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data === null) {
    const result = [];
    for (let i = 0; i < initialEvents.length; i++) result.push(copyEvent(initialEvents[i]));
    return result;
  }
  return JSON.parse(data);
}

function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "eventCard";
  card.dataset.id = event.id;

  const title = document.createElement("h2");
  title.textContent = event.title;

  const category = document.createElement("span");
  category.className = "eventCategory";
  category.textContent = event.category;

  const speaker = document.createElement("p");
  speaker.textContent = "วิทยากร: " + event.speaker;

  const date = document.createElement("p");
  date.textContent = "วันที่จัดงาน: " + event.date;

  const seats = document.createElement("p");
  seats.textContent = "ที่นั่งว่าง: " + event.seats;

  const description = document.createElement("p");
  description.textContent = event.description;

  const registerBtn = document.createElement("button");
  registerBtn.className = "registerBtn";
  if (event.isRegistered) {
    registerBtn.textContent = "ลงทะเบียนแล้ว";
    registerBtn.disabled = true;
  } else if (event.seats <= 0) {
    registerBtn.textContent = "ที่นั่งเต็ม";
    registerBtn.disabled = true;
  } else {
    registerBtn.textContent = "ลงทะเบียน";
    registerBtn.addEventListener("click", function () {
      handleRegister(event.id);
    });
  }

  card.append(title, category, speaker, date, seats, description, registerBtn);
  return card;
}

function renderEvents(list) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  for (let i = 0; i < list.length; i++) container.appendChild(createEventCard(list[i]));
}

// กรอง + เรียงลำดับตาม state ปัจจุบัน
function getVisibleEvents() {
  const term = searchText.trim().toLowerCase();
  const result = [];

  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    const searchOk = term === "" || ev.title.toLowerCase().includes(term) || ev.speaker.toLowerCase().includes(term);
    const categoryOk = selectedCategory === "" || ev.category === selectedCategory;
    if (searchOk && categoryOk) result.push(ev);
  }

  if (sortBy === "date-asc") {
    result.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  } else if (sortBy === "date-desc") {
    result.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  } else if (sortBy === "seats-asc") {
    result.sort(function (a, b) { return a.seats - b.seats; });
  } else if (sortBy === "seats-desc") {
    result.sort(function (a, b) { return b.seats - a.seats; });
  }

  return result;
}

function updateStats(list) {
  let registeredCount = 0;
  let totalSeats = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isRegistered) registeredCount++;
    totalSeats += list[i].seats;
  }
  document.getElementById("statTotal").textContent = list.length;
  document.getElementById("statRegistered").textContent = registeredCount;
  document.getElementById("statSeats").textContent = totalSeats;
}

function refresh() {
  const visibleEvents = getVisibleEvents();
  renderEvents(visibleEvents);
  updateStats(visibleEvents);
}

function handleRegister(id) {
  let event = null;
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) event = events[i];
  }
  if (!event || event.isRegistered || event.seats <= 0) return;

  event.seats = event.seats - 1;
  event.isRegistered = true;
  saveEvents();
  refresh();
}

function openModal() {
  document.getElementById("formError").textContent = "";
  document.getElementById("eventForm").reset();
  document.getElementById("modalOverlay").classList.add("show");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("show");
}

function validateEventForm(data) {
  const errors = [];
  if (!data.title) errors.push("กรุณากรอกชื่อกิจกรรม");
  if (!data.category) errors.push("กรุณาเลือกประเภทกิจกรรม");
  if (!data.speaker) errors.push("กรุณากรอกชื่อวิทยากร");

  if (!data.date) {
    errors.push("กรุณาเลือกวันที่จัดงาน");
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(data.date) < today) errors.push("วันที่จัดงานต้องไม่เป็นวันที่ในอดีต");
  }

  if (!Number.isInteger(data.seats) || data.seats <= 0) errors.push("จำนวนที่นั่งต้องเป็นจำนวนเต็มมากกว่า 0");
  if (!data.description) errors.push("กรุณากรอกรายละเอียดกิจกรรม");
  return errors;
}

function handleAddEvent(e) {
  e.preventDefault();

  const data = {
    title: document.getElementById("eventTitleInput").value.trim(),
    category: document.getElementById("eventCategorySelect").value,
    speaker: document.getElementById("eventSpeakerInput").value.trim(),
    date: document.getElementById("eventDateInput").value,
    seats: Number(document.getElementById("eventSeatsInput").value),
    description: document.getElementById("eventDescriptionInput").value.trim()
  };

  const errors = validateEventForm(data);
  const errorBox = document.getElementById("formError");
  if (errors.length > 0) {
    let html = "";
    for (let i = 0; i < errors.length; i++) html += "<div>" + errors[i] + "</div>";
    errorBox.innerHTML = html;
    return;
  }
  errorBox.textContent = "";

  let newId = 0;
  for (let i = 0; i < events.length; i++) {
    if (events[i].id > newId) newId = events[i].id;
  }

  data.id = newId + 1;
  data.isRegistered = false;
  events.push(data);

  saveEvents();
  refresh();
  closeModal();
}

function bindModalControls() {
  document.getElementById("openModalBtn").addEventListener("click", openModal);
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  document.getElementById("cancelBtn").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", function (e) {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.getElementById("eventForm").addEventListener("submit", handleAddEvent);
}

function bindControls() {
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  const resetBtn = document.getElementById("resetBtn");

  searchInput.addEventListener("input", function (e) {
    searchText = e.target.value;
    refresh();
  });
  categorySelect.addEventListener("change", function (e) {
    selectedCategory = e.target.value;
    refresh();
  });
  sortSelect.addEventListener("change", function (e) {
    sortBy = e.target.value;
    refresh();
  });
  resetBtn.addEventListener("click", function () {
    localStorage.removeItem(STORAGE_KEY);
    events = [];
    for (let i = 0; i < initialEvents.length; i++) events.push(copyEvent(initialEvents[i]));
    searchText = "";
    selectedCategory = "";
    sortBy = "date-asc";
    searchInput.value = "";
    categorySelect.value = "";
    sortSelect.value = "date-asc";
    refresh();
  });
}

function initApp() {
  events = loadEvents();
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  document.getElementById("darkModeBtn").addEventListener("click", toggleTheme);
  bindControls();
  bindModalControls();
  refresh();
}

document.addEventListener("DOMContentLoaded", initApp);
