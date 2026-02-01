
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const overlay = document.getElementById("overlay");
const videoScreen = document.getElementById("videoScreen");
const video = document.getElementById("valVideo");

let texts = ["NO 🙈","Ehh?! 😳","hahah 😜","Missed!","Impossible 💕","nahi bannana","ja re"];
let i = 0;

function moveNo(){
  const x = Math.random()*300 - 150;
  const y = Math.random()*200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.innerText = texts[i % texts.length];
  i++;
}
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// Main heart + trailing mini hearts
function createHeart(parent,x=null,y=null){
  const heart=document.createElement("div");
  heart.className="heart"; heart.innerText="💖";
  heart.style.left=(x??Math.random()*parent.offsetWidth)+"px";
  heart.style.top=(y??0)+"px";
  heart.style.fontSize=(Math.random()*20+20)+"px";
  parent.appendChild(heart);
  setTimeout(()=>heart.remove(),4000);

  for(let j=0;j<3;j++){
    setTimeout(()=>{
      const trail = document.createElement("div");
      trail.className="trail-heart"; trail.innerText="💖";
      trail.style.left=parseFloat(heart.style.left)+(Math.random()*20-10)+"px";
      trail.style.top=parseFloat(heart.style.top)+"px";
      trail.style.fontSize=(Math.random()*12+8)+"px";
      parent.appendChild(trail);
      setTimeout(()=>trail.remove(),2000);
    }, j*150);
  }
}

// Sparkle
function createSparkle(parent){
  const sparkle=document.createElement("div");
  sparkle.className="sparkle"; sparkle.innerText="✨";
  sparkle.style.left=Math.random()*parent.offsetWidth+"px";
  sparkle.style.fontSize=(Math.random()*10+10)+"px";
  parent.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),3000);
}

// Floating text
function createFloatingText(parent,text){
  const ft=document.createElement("div");
  ft.className="floating-text"; ft.innerText=text;
  ft.style.left=Math.random()*(parent.offsetWidth-100)+"px";
  parent.appendChild(ft);
  setTimeout(()=>ft.remove(),3000);
}

// Overlay animations
let overlayH=setInterval(()=>createHeart(overlay),300);
let overlayS=setInterval(()=>createSparkle(overlay),500);

// Background floating hearts
for(let j=0;j<30;j++){
  const bh=document.createElement("div");
  bh.className="bg-heart"; bh.innerText="💖";
  bh.style.left=Math.random()*window.innerWidth+"px";
  bh.style.top=Math.random()*window.innerHeight+"px";
  bh.style.fontSize=(Math.random()*20+10)+"px";
  bh.style.animationDuration=(5+Math.random()*5)+"s";
  overlay.appendChild(bh);
}

// YES click → video + glow particles
yesBtn.addEventListener("click", ()=>{
  overlay.style.display="none";
  videoScreen.style.display="flex";
  setTimeout(()=> videoScreen.style.opacity=1,50);

  video.currentTime=0;
  video.muted=false;
  video.play().catch(()=> console.log("Tap to play sound"));

  clearInterval(overlayH); clearInterval(overlayS);

  setInterval(()=>createHeart(videoScreen),300);
  setInterval(()=>createSparkle(videoScreen),500);
  setInterval(()=>createFloatingText(videoScreen,"I knew it 💕"),2000);

  // glowing fairy dust
  setInterval(()=>{
    const glow = document.createElement("div");
    glow.className="glow";
    glow.style.left=Math.random()*window.innerWidth+"px";
    glow.style.top=window.innerHeight+"px";
    glow.style.width=(Math.random()*4+2)+"px";
    glow.style.height=(Math.random()*4+2)+"px";
    glow.style.animationDuration=(3+Math.random()*2)+"s";
    videoScreen.appendChild(glow);
    setTimeout(()=>glow.remove(),5000);
  },150);
});

// Click/tap burst hearts
videoScreen.addEventListener("click", e=>{
  for(let j=0;j<5;j++){
    createHeart(videoScreen,e.clientX + (Math.random()*50-25), e.clientY + (Math.random()*50-25));
  }
});

// Follow mouse/finger
videoScreen.addEventListener("mousemove", e=>{
  createHeart(videoScreen,e.clientX + (Math.random()*20-10), e.clientY + (Math.random()*20-10));
});
videoScreen.addEventListener("touchmove", e=>{
  const touch = e.touches[0];
  createHeart(videoScreen,touch.clientX + (Math.random()*20-10), touch.clientY + (Math.random()*20-10));
});
