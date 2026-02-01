
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const overlay = document.getElementById("overlay");
const videoScreen = document.getElementById("videoScreen");
const video = document.getElementById("valVideo");

let texts = ["NO 🙈","Ehh?! 😳","Missed 😜","Impossible 💕"];
let i = 0;

/* NO button move */
function moveNo(){
  const x = Math.random()*300 - 150;
  const y = Math.random()*200 - 100;
  noBtn.style.transform = `translate(${x}px,${y}px)`;
  noBtn.innerText = texts[i % texts.length];
  i++;
}
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);

/* HEART */
function createHeart(parent,x,y){
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = x+"px";
  h.style.top = y+"px";
  parent.appendChild(h);
  setTimeout(()=>h.remove(),4000);
}

/* ✅ MOST IMPORTANT PART (AUDIO FIX) */
yesBtn.addEventListener("click", () => {

  overlay.style.display = "none";
  videoScreen.style.display = "flex";

  // 🔥 THIS IS REQUIRED FOR VERCEL
  video.currentTime = 0;
  video.muted = false;     // ✅ enable sound
  video.volume = 1.0;

  video.play().catch(err=>{
    console.log("Tap required for audio", err);
  });

});


videoScreen.addEventListener("click", e=>{
  for(let i=0;i<5;i++){
    createHeart(videoScreen,e.clientX,e.clientY);
  }
});
