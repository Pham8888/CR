(() => {
  const data={
    CR28:{index:"01",number:"28",kind:"CARE / FAMILY ASSISTANCE",eyebrow:"01 — CARE SERIES",role:"A companion concept for children.",description:"Designed around play, companionship and age-appropriate assistance. CR28 represents a gentle introduction to intelligent robotics.",tags:["COMPANIONSHIP","ASSISTANCE","INTERACTION"]},
    CR17:{index:"02",number:"17",kind:"COMPANION / FOUNDATION MODEL",eyebrow:"02 — COMPANION LINE",role:"The foundation model of the companion line.",description:"CR17 is the first model in the CR17 / CR11 / CR7 companion-robot line, focused on supporting people in everyday life.",tags:["COMPANION","DAILY SUPPORT","INTERACTION"]},
    CR11:{index:"03",number:"11",kind:"COMPANION / REFINEMENT CONCEPT",eyebrow:"03 — COMPANION LINE",role:"An improved companion-robot concept.",description:"CR11 continues the same companion line as CR17, representing a later refinement. The model number itself does not mean a generation.",tags:["COMPANION","REFINEMENT","ADAPTIVE DESIGN"]},
    CR7:{index:"04",number:"07",kind:"COMPANION / ADVANCED CONCEPT",eyebrow:"04 — COMPANION LINE",role:"A further-developed companion-robot concept.",description:"CR7 is part of the same development line as CR17 and CR11, representing a more developed concept direction.",tags:["COMPANION","DEVELOPMENT","HUMAN-CENTERED"]},
    CR9:{index:"05",number:"09",kind:"SPECIALIST / SEPARATE LINE",eyebrow:"05 — SPECIALIST SERIES",role:"A separate specialist robot concept.",description:"CR9 is a distinct specialist line, separate from the companion robots. Its detailed purpose, capabilities and specifications remain to be defined.",tags:["SPECIALIST","SEPARATE LINE","CONCEPT"]}
  };
  const tabs=[...document.querySelectorAll(".model-tab")],robot=document.getElementById("stageRobot");
  let current="CR28";
  function select(id){
    const item=data[id];if(!item)return;current=id;
    tabs.forEach(t=>{const active=t.dataset.model===id;t.classList.toggle("active",active);t.setAttribute("aria-selected",String(active))});
    robot.classList.add("switching");
    setTimeout(()=>{
      document.getElementById("unitClass").textContent=item.kind;
      document.getElementById("robotEyebrow").textContent=item.eyebrow;
      document.getElementById("robotTitle").textContent=id;
      document.getElementById("robotRole").textContent=item.role;
      document.getElementById("robotDescription").textContent=item.description;
      document.getElementById("robotTags").innerHTML=item.tags.map(t=>`<span>${t}</span>`).join("");
      document.getElementById("stageNumber").textContent=item.number;
      document.getElementById("stageModel").textContent=id;
      document.getElementById("stageCount").textContent=item.index+" / 05";
      document.getElementById("unitStatus").textContent="UNIT STATUS: CONCEPT";
      robot.classList.remove("switching");
    },220);
  }
  tabs.forEach(t=>t.addEventListener("click",()=>select(t.dataset.model)));
  document.getElementById("robotNext").addEventListener("click",()=>{const i=tabs.findIndex(t=>t.dataset.model===current);select(tabs[(i+1)%tabs.length].dataset.model)});
})();
