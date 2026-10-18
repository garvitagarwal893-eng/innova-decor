/* Site behavior. Edit your content in settings.js and catalogue.js instead. */
(() => {
  const s = window.SITE_SETTINGS, products = window.PRODUCTS;
  document.documentElement.style.setProperty('--paper', s.colors.paper);
  document.documentElement.style.setProperty('--ink', s.colors.ink);
  document.documentElement.style.setProperty('--accent', s.colors.accent);
  document.documentElement.style.setProperty('--muted', s.colors.muted);
  document.title = `${s.businessName} — Thoughtful interiors, considered details`;
  document.querySelector('meta[name="description"]').content = `Thoughtful interiors, considered details. Discover bespoke interior design and decor in ${s.city} with ${s.businessName}.`;
  document.querySelectorAll('.brand-logo').forEach(el => { el.alt = `${s.businessName} — Interior and Exterior Solutions`; });
  document.querySelectorAll('a[href="tel:+919876543210"]').forEach(a => { a.href = `tel:${s.phoneDisplay.replace(/[^+\d]/g,'')}`; a.innerHTML = `<span>CALL OR WHATSAPP</span>${s.phoneDisplay} ↗`; });
  if (s.otherPhoneNumbers?.length) {
    const extra = document.createElement('div'); extra.className = 'other-contact-numbers';
    extra.innerHTML = `<span>ALSO REACH US</span>${s.otherPhoneNumbers.map(n => `<a href="tel:${n.replace(/[^+\d]/g,'')}">${n}</a>`).join(' · ')}`;
    document.querySelector('.contact-details').insertBefore(extra, document.querySelector('.contact-details').children[1]);
  }
  document.querySelectorAll('a[href="mailto:hello@innovadecor.in"]').forEach(a => { a.href = `mailto:${s.email}`; a.innerHTML = `<span>WRITE US A NOTE</span>${s.email} ↗`; });
  document.querySelectorAll('.contact-line').forEach(a => { if (a.textContent.includes('Jaipur, Rajasthan')) a.innerHTML = `<span>COME SAY HELLO</span>${s.address}`; });
  const floating = document.querySelector('#whatsapp-float'); floating.href = `https://wa.me/${s.phoneWhatsApp}`;
  [['instagram-link', s.instagram], ['youtube-link', s.youtube], ['facebook-link', s.facebook]].forEach(([id, url]) => {
    const link = document.getElementById(id);
    if (link && url) link.href = url;
  });
  document.querySelector('.footer-bottom span:nth-child(2)').textContent = s.hours;
  document.querySelector('#year').textContent = new Date().getFullYear();

  const grid = document.querySelector('#product-grid'), filterBox = document.querySelector('#filters'), search = document.querySelector('#search');
  const categories = ['All', ...new Set(products.map(p => p.category))]; let selected = 'All';
  categories.forEach((category, i) => { const b = document.createElement('button'); b.className = `filter-btn${i===0?' active':''}`; b.textContent = category; b.onclick = () => { selected=category; filterBox.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b)); renderProducts(); }; filterBox.append(b); });
  const waLink = name => `https://wa.me/${s.phoneWhatsApp}?text=${encodeURIComponent(`Hello ${s.businessName}, I'm interested in the ${name}. Could you share more details?`)}`;
  function renderProducts() {
    const q = search.value.trim().toLowerCase(); grid.innerHTML = '';
    const shown = products.filter(p => (selected==='All'||p.category===selected) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q));
    if (!shown.length) { grid.innerHTML = '<p class="empty-results">No pieces found. Try another search.</p>'; return; }
    shown.forEach(p => { const card=document.createElement('article'); card.className='product-card'; card.innerHTML=`<div class="product-photo" role="button" tabindex="0" aria-label="View details for ${p.name}"><img loading="lazy" src="${p.image}" alt="${p.name}, ${p.category.toLowerCase()} by ${s.businessName}"><span class="quick-view">View details ↗</span></div><div class="product-meta"><span class="product-name">${p.name}</span><span class="product-price">${p.price||'Enquire for price'}</span></div><span class="product-category">${p.category}</span><br><a class="product-wa" target="_blank" rel="noopener" href="${waLink(p.name)}">Enquire on WhatsApp ↗</a>`;
      const photo=card.querySelector('.product-photo'); photo.onclick=()=>openProduct(p); photo.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openProduct(p);}; grid.append(card); });
  }
  search.addEventListener('input',renderProducts); renderProducts();
  const pd=document.querySelector('#product-dialog');
  function openProduct(p) { const imgs=(p.images?.length?p.images:[p.image]).slice(0,2); pd.querySelector('.dialog-body').innerHTML=`<div class="dialog-images">${imgs.map(src=>`<img src="${src}" alt="${p.name} detail photo">`).join('')}</div><div class="dialog-copy"><p class="eyebrow">${p.category}</p><h2>${p.name}</h2><p class="dialog-price">${p.price||'Enquire for price'}</p><p>${p.description}</p><dl><dt>Size</dt><dd>${p.size||'Please enquire'}</dd><dt>Material</dt><dd>${p.material||'Please enquire'}</dd></dl><a class="button button-dark" target="_blank" rel="noopener" href="${waLink(p.name)}">Enquire on WhatsApp <span>↗</span></a></div>`; pd.showModal(); }
  pd.querySelector('.dialog-close').onclick=()=>pd.close(); pd.addEventListener('click',e=>{if(e.target===pd)pd.close();});
  const menuBtn=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav'); menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation');}); nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
  const reviews=[['They listened to how we actually live, and made a home that feels more like us than we imagined.','PRIYA & ARJUN','JAIPUR RESIDENCE'],['From the first conversation, the whole process felt easy. We finally have a kitchen that works beautifully for our family.','MEERA SHARMA','KITCHEN RENOVATION'],['The custom pieces are beautiful, and the care they put into every little detail really shows.','KABIR & RHEA','C-SCHEME HOME']]; let ri=0;
  function showReview(){const [q,n,where]=reviews[ri];document.querySelector('#quote-text').textContent=q;document.querySelector('#quote-name').innerHTML=`${n} <span>·</span> ${where}`;document.querySelector('#quote-count').textContent=`0${ri+1} / 0${reviews.length}`;}
  document.querySelector('#prev-quote').onclick=()=>{ri=(ri+reviews.length-1)%reviews.length;showReview();}; document.querySelector('#next-quote').onclick=()=>{ri=(ri+1)%reviews.length;showReview();};
  const lightbox=document.querySelector('#lightbox'); document.querySelectorAll('.gallery-item').forEach(b=>b.onclick=()=>{const img=lightbox.querySelector('img');img.src=b.dataset.full;img.alt=b.querySelector('img').alt;lightbox.showModal();}); lightbox.querySelector('.lightbox-close').onclick=()=>lightbox.close();lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
  document.querySelector('#contact-form').addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const message=`Hello ${s.businessName}, I'd like to enquire.\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nInterested in: ${f.get('interest')}\nMessage: ${f.get('message')||'Please contact me to discuss.'}`;
    const url=`https://wa.me/${s.phoneWhatsApp}?text=${encodeURIComponent(message)}`;
    // Keep this navigation directly in the submit gesture so browsers allow WhatsApp to open.
    window.location.href=url;
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12}); document.querySelectorAll('.product-card,.service-card,.story-copy,.gallery-item').forEach(el=>{el.classList.add('reveal');io.observe(el);}); }
})();
