async function checkScam() {
  const text = document.getElementById("inputText").value;

  if (!text.trim()) {
    alert("Please enter a message");
    return;
  }

  try {
    const res = await fetch("https://scam-backend-2bse.onrender.com/api/detect-scam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    document.getElementById("resultBox").classList.remove("hidden");

    // ✅ Risk with icons
    let riskText = "";
    let color = "";

    if (data.risk === "Low") {
      riskText = "✔ Safe Message (Low Risk)";
      color = "green";
    } else if (data.risk === "Medium") {
      riskText = "⚠ Medium Risk";
      color = "orange";
    } else {
      riskText = "❌ High Risk";
      color = "red";
    }

    const riskElement = document.getElementById("risk");
    riskElement.innerText = riskText;
    riskElement.style.color = color;

    document.getElementById("score").innerText = `Score: ${data.score}/100`;
    document.getElementById("category").innerText = `Category: ${data.category}`;

    // Reasons
    const reasonsList = document.getElementById("reasons");
    reasonsList.innerHTML = "";
    data.reasons.forEach(r => {
      const li = document.createElement("li");
      li.innerText = r;
      reasonsList.appendChild(li);
    });

    drawChart(data.scamPercent, data.safePercent);
    saveHistory(text, data.risk);

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
  }
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

  history.push({
    text,
    risk,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("history", JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const list = document.getElementById("historyList");

  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.text} → ${item.risk} (${item.time})`;
    list.appendChild(li);
  });
}

displayHistory();