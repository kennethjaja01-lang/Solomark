const $=s=>document.querySelector(s);
const ic=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
const S=[
["Building Construction","Residential buildings, commercial properties, institutional buildings, and associated construction works.","villa","M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6","Modern two-storey villa (illustrative image)"],
["Civil Engineering and Infrastructure","Road works, drainage, external works, site development, and related civil construction projects.","road","M2 20h20M4 20c3-8 5-12 8-12s5 4 8 12M12 8V4","Road paving crew at sunset (illustrative image)"],
["Renovation and Rehabilitation","Building renovations, refurbishment, repairs, facility improvements, and upgrading of existing structures.","reno","M14 6l4 4L8 20H4v-4zM13 7l4 4","Building renovation from scaffolding (illustrative image)"],
["General Contracting","Project coordination, construction execution, contractor coordination, and general contract delivery.","team","M4 5h16v14H4zM4 10h16M9 5v14","Project team reviewing plans on site (illustrative image)"],
["Procurement and Supply","Sourcing and supply of construction materials, equipment, building components, and project-related supplies.","supply","M3 8l9-5 9 5-9 5zM3 8v8l9 5 9-5V8","Construction materials supply yard (illustrative image)"],
["Engineering and Technical Services","Construction support, technical coordination, installation works, and project-specific engineering services within the company's capabilities.","inspect","M12 15a3 3 0 100-6 3 3 0 000 6zM4 12h3M17 12h3M12 4v3M12 17v3","Engineers inspecting a modern building (illustrative image)"]];
const W=[
["Quality-driven workmanship","Careful execution to the agreed specification.","M5 13l4 4L14 7"],
["Planning and coordination","Professional planning of people, materials and sequence.","M4 5h16v14H4zM4 10h16"],
["Clear communication and accountability","Open updates and a clear point of responsibility.","M4 5h16v11H9l-5 4z"],
["Practical, cost-conscious solutions","Sensible options that respect your budget.","M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h9"],
["Safety and standards","Attention to safety and applicable construction standards.","M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"],
["Agreed requirements and timelines","Commitment to agreed project requirements and delivery timelines.","M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z"]];
$("#sv").innerHTML=S.map(s=>`<article class="card"><div class="ph"><img src="/assets/img/${s[2]}.webp" alt="${s[4]}" loading="lazy" width="1200" height="800"></div><div class="bd">${ic(s[3])}<h3>${s[0]}</h3><p>${s[1]}</p><a href="#contact" data-s="${s[0]}">Discuss Your Project</a></div></article>`).join("");
$("#wy").innerHTML=W.map(s=>`<li>${ic(s[2])}<h3>${s[0]}</h3><p>${s[1]}</p></li>`).join("");
$("#fs").innerHTML=S.map(s=>`<li><a href="#contact" data-s="${s[0]}">${s[0]}</a></li>`).join("");
const esc=t=>String(t||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const real=(window.SOLOMARK_PROJECTS||[]).map(p=>({...p,real:1})),ill=window.SOLOMARK_ILLUSTRATIVE||[];
$("#pg").innerHTML=real.concat(ill).slice(0,Math.max(5,real.length+ill.length)).map(p=>`<figure><img src="${esc(p.image)}" alt="${esc(p.alt||p.title)}" loading="lazy">${p.real?"":'<span class="tag">Illustrative</span>'}<figcaption><b>${esc(p.title)}</b><span>${esc([p.category,p.location,p.completed].filter(Boolean).join(" · "))}</span></figcaption></figure>`).join("");
const sel=$("#service");sel.insertAdjacentHTML("beforeend",S.map(s=>s[0]).concat("Other Enquiry").map(o=>`<option>${o}</option>`).join(""));
$("#yr").textContent=new Date().getFullYear();
document.addEventListener("click",e=>{const a=e.target.closest("[data-s]");if(a)sel.value=a.dataset.s});
const hd=$("#top"),mb=$("#mb"),nav=$("#nav");
const onS=()=>hd.classList.toggle("solid",scrollY>40);onS();addEventListener("scroll",onS,{passive:true});
const setNav=o=>{nav.classList.toggle("open",o);mb.setAttribute("aria-expanded",o);mb.querySelector(".sr").textContent=o?"Close menu":"Open menu";if(o)hd.classList.add("solid");else onS()};
mb.onclick=()=>setNav(!nav.classList.contains("open"));nav.onclick=e=>{if(e.target.closest("a"))setNav(false)};
document.onkeydown=e=>{if(e.key==="Escape"&&nav.classList.contains("open")){setNav(false);mb.focus()}};
const fm=$("#fm"),st=$("#st"),sb=$("#sb"),t0=Date.now();
const U="https://owwqkwgziduajsylmtxm.supabase.co/rest/v1/enquiries",K="sb_publishable_Ut7Q1mH8dNZJDQxZP-9otQ_4ExRNcqy";
const R={full_name:v=>v.length>=2||"Enter your full name.",email:v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)||"Enter a valid email address.",phone:v=>/^\+?[\d\s()-]{7,}$/.test(v)||"Enter a valid telephone number.",service:v=>!!v||"Choose the service you need.",location:v=>v.length>=2||"Enter the project location.",description:v=>v.length>=10||"Describe your project in at least 10 characters."};
fm.addEventListener("submit",async e=>{e.preventDefault();st.className="";st.textContent="";const d={};let bad=null;
for(const el of fm.elements){if(!el.name||el.name==="website")continue;d[el.name]=el.value.trim();const r=R[el.name]?R[el.name](d[el.name]):true,p=$("#e-"+el.name);if(p)p.textContent=r===true?"":r;el.setAttribute("aria-invalid",r!==true);if(r!==true&&!bad)bad=el}
if(bad){bad.focus();return}
if(fm.website.value||Date.now()-t0<3000){st.className="bad";st.textContent="Your enquiry was not sent. Please wait a moment and try again, or call 08155775517.";return}
sb.disabled=true;sb.textContent="Sending...";
try{const r=await fetch(U,{method:"POST",headers:{apikey:K,Authorization:"Bearer "+K,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({...d,organisation:d.organisation||null,budget:d.budget||null})});
if(!r.ok)throw new Error(r.status);fm.reset();st.className="ok";st.textContent="Thank you. Your enquiry has been received. We will contact you using the details you gave."}
catch(_){st.className="bad";st.textContent="Your enquiry was not sent. Please try again, or call 08155775517 or email solomarknigltd@gmail.com."}
sb.disabled=false;sb.textContent="Send enquiry"});
