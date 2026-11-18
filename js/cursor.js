(() => {
  const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring"),spot=document.querySelector(".mouse-spot");
  if(!window.matchMedia("(pointer:fine)").matches)return;
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,sx=x,sy=y;
  document.addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;document.body.classList.add("cursor-on");spot.style.left=x+"px";spot.style.top=y+"px"});
  document.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-on"));
  function frame(){rx+=(x-rx)*.22;ry+=(y-ry)*.22;sx+=(rx-sx)*.18;sy+=(ry-sy)*.18;dot.style.transform=`translate3d(${x-3.5}px,${y-3.5}px,0)`;ring.style.transform=`translate3d(${rx-17}px,${ry-17}px,0)`;requestAnimationFrame(frame)}
  frame();
  document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"))});
})();
