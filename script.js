// ページ切り替え
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function addClickEvent(el, callback) {
  el.addEventListener("click", callback);
  el.addEventListener("touchstart", callback);
}


/* -------------------------
   ステージ1：中央のハート
-------------------------- */
document.getElementById("heart1").onclick = () => {
  showPage("page2");
  startStage2();
};

/* -------------------------
   ステージ2：ランダム5個
-------------------------- */
function startStage2() {
  const area = document.getElementById("stage2");
  area.innerHTML = "";
  let count = 5;

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 80 + "%";
    h.style.top = Math.random() * 60 + "%";

    addClickEvent(h, () => {
      h.remove();
      count--;
      if (count === 0) {
        showPage("page3");
        startStage3();
      }
    });

    area.appendChild(h);
  }
}

/* -------------------------
   ステージ3：動くハート8個
-------------------------- */
function startStage3() {
  const area = document.getElementById("stage3");
  area.innerHTML = "";
  let count = 8;

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";

    let x = Math.random() * 80;
    let y = Math.random() * 60;
    let vx = (Math.random() * 2 - 1) * 0.5;
    let vy = (Math.random() * 2 - 1) * 0.5;

    h.style.left = x + "%";
    h.style.top = y + "%";

    addClickEvent(h, () => {
      h.remove();
      count--;
      if (count === 0) {
        showPage("page4");
        startEnding();   // ← これが正しい
      }

    });


    area.appendChild(h);

    // 移動アニメーション
    setInterval(() => {
      x += vx*0.5;
      y += vy*0.5;

      if (x < 0 || x > 90) vx *= -1;
      if (y < 0 || y > 80) vy *= -1;

      h.style.left = x + "%";
      h.style.top = y + "%";
    }, 20);
  }
}

/* -------------------------
   ステージ4：エンディング
-------------------------- */
function startEnding() {
  const fallArea = document.getElementById("fallArea");
  const bgm = document.getElementById("bgm");

  bgm.play().catch(() => {
    console.log("自動再生がブロックされました");
  });

  setInterval(() => {
    const h = document.createElement("div");
    h.className = "fallHeart";
    h.style.left = Math.random() * 100 + "%";
    fallArea.appendChild(h);

    setTimeout(() => h.remove(), 3000);
  }, 200);
}

