(() => {
  const screen = document.getElementById("bootScreen");
  const bar = document.getElementById("bootProgress");
  const percent = document.getElementById("bootPercent");
  const status = document.getElementById("bootStatus");
  const start = document.getElementById("startButton");
  const skip = document.getElementById("skipIntro");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let value = 0, timer;
  const messages = [[0,"CHECKING INTERFACE"],[28,"LOADING CORE SYSTEMS"],[58,"CONNECTING ROBOT ARCHIVE"],[84,"CALIBRATING VISUAL LAYER"],[100,"SYSTEM READY"]];
  function closeIntro(){screen.classList.add("exit");document.body.classList.remove("booting");try{sessionStorage.setItem("cr-visited","1")}catch(e){}}
  function update(){
    value = Math.min(100,value + (reduce ? 25 : Math.max(1,Math.round((100-value)*.075))));
    bar.style.width = value + "%";percent.textContent = String(value).padStart(2,"0") + "%";
    const current = messages.filter(m=>value>=m[0]).pop();if(current)status.textContent=current[1];
    if(value>=100){clearInterval(timer);start.disabled=false;start.classList.add("ready");}
  }
  let visited=false;try{visited=sessionStorage.getItem("cr-visited")==="1"}catch(e){}
  if(visited){screen.classList.add("exit");}
  else {document.body.classList.add("booting");timer=setInterval(update,reduce?90:55);}
  start.addEventListener("click",closeIntro);skip.addEventListener("click",()=>{clearInterval(timer);closeIntro()});
})();
