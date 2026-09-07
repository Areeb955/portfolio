const menuButton=document.getElementById('menuButton');
const mobileMenu=document.getElementById('mobileMenu');
menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);mobileMenu.setAttribute('aria-hidden',!open)});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const certificates=[
  {src:'assets/certificates/air-eagle.jpg',title:'Air Eagle (Pvt) Ltd',year:'2026 · Web Development',type:'INTERNSHIP COMPLETION LETTER'},
  {src:'assets/certificates/pakistan-airports-authority.jpg',title:'Pakistan Airports Authority',year:'2025 · Information Technology',type:'CERTIFICATE OF INTERNSHIP'},
  {src:'assets/certificates/airsial.jpg',title:'AirSial Limited',year:'2025 · Operations & IT',type:'INTERNSHIP COMPLETION LETTER'},
  {src:'assets/certificates/big-futur-digital.jpg',title:'BIG Futur Digital',year:'2024 · Web Development',type:'INTERNSHIP COMPLETION'}
];
let currentCert=0;
const certImage=document.getElementById('certificateImage');
const certTitle=document.getElementById('certificateTitle');
const certYear=document.getElementById('certificateYear');
const certType=document.getElementById('certificateType');
const tabs=[...document.querySelectorAll('.cert-tab')];
function selectCert(index){currentCert=Number(index);const c=certificates[currentCert];certImage.src=c.src;certTitle.textContent=c.title;certYear.textContent=c.year;certType.textContent=c.type;tabs.forEach((t,i)=>t.classList.toggle('active',i===currentCert));}
tabs.forEach(t=>t.addEventListener('click',()=>selectCert(t.dataset.cert)));

document.querySelectorAll('.certificate-link').forEach(btn=>btn.addEventListener('click',()=>{selectCert(btn.dataset.cert);document.getElementById('certificates').scrollIntoView({behavior:'smooth'});setTimeout(openModal,420)}));
const modal=document.getElementById('modal');const modalImage=document.getElementById('modalImage');
function openModal(){modalImage.src=certificates[currentCert].src;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.getElementById('openCertificate').addEventListener('click',openModal);
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalPrev').addEventListener('click',()=>{selectCert((currentCert+certificates.length-1)%certificates.length);modalImage.src=certificates[currentCert].src});
document.getElementById('modalNext').addEventListener('click',()=>{selectCert((currentCert+1)%certificates.length);modalImage.src=certificates[currentCert].src});
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(modal.classList.contains('open')&&e.key==='ArrowLeft')document.getElementById('modalPrev').click();if(modal.classList.contains('open')&&e.key==='ArrowRight')document.getElementById('modalNext').click()});

// Vercel/GitHub smart links
(function(){
  const cfg=window.__PORTFOLIO_BUILD__||{};
  const liveUrl=cfg.deploymentUrl || window.location.origin;
  const portfolioLink=document.getElementById('portfolioLink');
  const portfolioText=document.getElementById('portfolioUrlText');
  if(portfolioLink){ portfolioLink.href=liveUrl; }
  if(portfolioText){
    try{ portfolioText.textContent=new URL(liveUrl).host+' ↗'; }
    catch(e){ portfolioText.textContent='Open live portfolio ↗'; }
  }
  const githubLinks=[document.getElementById('githubLink'),document.getElementById('contactGithubLink')].filter(Boolean);
  const githubText=document.getElementById('githubLinkText');
  if(cfg.githubUrl){
    githubLinks.forEach(a=>{a.href=cfg.githubUrl;a.removeAttribute('aria-disabled');a.classList.remove('disabled-link')});
    if(githubText) githubText.textContent=(cfg.repoName||'Open repository')+' ↗';
  } else {
    githubLinks.forEach(a=>{a.href='https://github.com/';a.classList.add('disabled-link');a.title='Deploy this portfolio to Vercel by importing your GitHub repository to auto-link it here.'});
    if(githubText) githubText.textContent='GitHub repo auto-links after Vercel Git import';
  }
})();
