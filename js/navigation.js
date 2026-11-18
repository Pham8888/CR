(() => {
  const links=[...document.querySelectorAll(".side-link")];
  const sections=["home","about","robots","evolution","technology","contact"].map(id=>document.getElementById(id));
  const current=document.getElementById("currentSection");
  const mobile=document.getElementById("mobilePanel"),toggle=document.getElementById("menuToggle");
  const close=()=>{mobile.classList.remove("open");mobile.setAttribute("aria-hidden","true");toggle.classList.remove("open");toggle.setAttribute("aria-expanded","false")};
  toggle.addEventListener("click",()=>{const open=!mobile.classList.contains("open");mobile.classList.toggle("open",open);mobile.setAttribute("aria-hidden",String(!open));toggle.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open))});
  mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const i=sections.indexOf(entry.target);links.forEach((a,n)=>a.classList.toggle("active",n===i));current.textContent=String(i+1).padStart(2,"0")}}),{threshold:.35});
    sections.forEach(s=>io.observe(s));
  }
})();
