async function checkScam() {
  const text = document.getElementById("inputText").value;

  const res = await fetch("http://localhost:5000/api/detect-scam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const data = await res.json();

  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("risk").innerText = `Risk: ${data.risk}`;
  document.getElementById("score").innerText = `Score: ${data.score}/100`;
  document.getElementById("category").innerText = `Category: ${data.category}`;

  const reasonsList = document.getElementById("reasons");
  reasonsList.innerHTML = "";
  data.reasons.forEach(r => {
    const li = document.createElement("li");
    li.innerText = r;
    reasonsList.appendChild(li);
  });

  drawChart(data.scamPercent, data.safePercent);
  saveHistory(text, data.risk);
}

function drawChart(scam, safe) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scamAngle = (scam / 100) * 2 * Math.PI;

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 80, 0, scamAngle);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 80, scamAngle, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();
}

function saveHistory(text, risk) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ text, risk });
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.text} → ${item.risk}`;
    list.appendChild(li);
  });
}

displayHistory();