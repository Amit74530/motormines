// app.js - consolidated & search-enabled with Unsplash placeholder images

// Data with Unsplash placeholder images
const bikes = [
  { 
    name:"KTM Duke 390", 
    brand:"KTM", 
    price:195000, 
    year:2019, 
    km:18000, 
    hp:"43 BHP", 
    torque:"37 Nm", 
    mileage:"28 kmpl", 
    owner:"Single Owner", 
    img:"bikes/duke 390.jpg" 
  },
  { 
    name:"Royal Enfield Classic 350", 
    brand:"Royal Enfield", 
    price:145000, 
    year:2018, 
    km:24000, 
    hp:"20 BHP", 
    torque:"28 Nm", 
    mileage:"35 kmpl", 
    owner:"First Owner", 
    img:"bikes/royal.jpg" 
  },
  { 
    name:"Honda Activa 6G", 
    brand:"Honda", 
    price:75000, 
    year:2021, 
    km:8500, 
    hp:"8 BHP", 
    torque:"10 Nm", 
    mileage:"45 kmpl", 
    owner:"Single Owner", 
    img:"bikes/honda.jpg" 
  },
  { 
    name:"Yamaha R15 V3", 
    brand:"Yamaha", 
    price:165000, 
    year:2020, 
    km:16000, 
    hp:"18.6 BHP", 
    torque:"14 Nm", 
    mileage:"40 kmpl", 
    owner:"Second Owner", 
    img:"bikes/yamaha.jpg" 
  },
  { 
    name:"KTM RC 200", 
    brand:"KTM", 
    price:175000, 
    year:2020, 
    km:12000, 
    hp:"25 BHP", 
    torque:"19.2 Nm", 
    mileage:"35 kmpl", 
    owner:"Single Owner", 
    img:"bikes/rc.jpg" 
  },
  { 
    name:"Royal Enfield Himalayan", 
    brand:"Royal Enfield", 
    price:210000, 
    year:2021, 
    km:15000, 
    hp:"24.3 BHP", 
    torque:"32 Nm", 
    mileage:"30 kmpl", 
    owner:"First Owner", 
    img:"bikes/himalayan.jpg" 
  },
  { 
    name:"Honda CB Shine", 
    brand:"Honda", 
    price:65000, 
    year:2019, 
    km:22000, 
    hp:"10 BHP", 
    torque:"10.3 Nm", 
    mileage:"50 kmpl", 
    owner:"Second Owner", 
    img:"bikes/shine.jpg" 
  },
  { 
    name:"Yamaha FZ V3", 
    brand:"Yamaha", 
    price:125000, 
    year:2020, 
    km:18000, 
    hp:"13.2 BHP", 
    torque:"12.8 Nm", 
    mileage:"45 kmpl", 
    owner:"Single Owner", 
    img:"bikes/fz.jpg" 
  }
];

const slider = document.getElementById('slider');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('topSearch');
const searchBtn = document.getElementById('searchBtn');
const searchInfo = document.getElementById('searchResultsInfo');

let currentFilter = 'all';

// ===== COUNTING ANIMATION FOR STATS =====
function animateStats() {
  const statsRow = document.querySelector('.stats-row');
  if (!statsRow) {
    console.log('Stats row not found');
    return;
  }
  
  // Intersection Observer to trigger animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Stats row is in view, starting animations...');
        
        // Define the stats to animate
        const stats = [
          { selector: '.stat-item:nth-child(1) .stat-number', target: 5202, suffix: '' },
          { selector: '.stat-item:nth-child(2) .stat-number', target: 99, suffix: '%' },
          { selector: '.stat-item:nth-child(3) .stat-number', target: 150, suffix: '' },
          { selector: '.stat-item:nth-child(4) .stat-number', target: 24, suffix: '/7' }
        ];
        
        // Reset all stats to 0 first
        stats.forEach(stat => {
          const element = document.querySelector(stat.selector);
          if (element) {
            element.textContent = '0' + stat.suffix;
          }
        });
        
        // Animate each stat with a delay
        stats.forEach((stat, index) => {
          const element = document.querySelector(stat.selector);
          if (element) {
            setTimeout(() => {
              startCounting(element, stat.target, stat.suffix);
              console.log(`Starting animation for stat ${index}: ${stat.target}${stat.suffix}`);
            }, index * 300); // Stagger the animations
          }
        });
        
        observer.disconnect(); // Stop observing after animation starts
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
  
  observer.observe(statsRow);
}

// Count up function
function startCounting(element, target, suffix) {
  const duration = 2000; // 2 seconds
  const start = 0;
  const startTime = performance.now();
  
  // Add animated class for CSS effects
  const parent = element.closest('.stat-item');
  if (parent) parent.classList.add('counting');
  
  const updateCount = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(easeOutQuart * (target - start) + start);
    
    // Update the element text
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      // Ensure final value is exact
      element.textContent = target + suffix;
      if (parent) {
        parent.classList.remove('counting');
        parent.classList.add('animated');
      }
    }
  };
  
  requestAnimationFrame(updateCount);
}

// ===== FIXED RENDER CARDS FUNCTION =====
function renderBikes(list) {
  if (!slider) return;
  slider.innerHTML = '';
  
  if (!list || !list.length) {
    slider.innerHTML = '<div style="color:#cfcfcf;padding:14px;text-align:center;width:100%;">No results found.</div>';
    if (searchInfo) { 
      searchInfo.hidden = false; 
      searchInfo.textContent = 'No bikes match your search.'; 
    }
    return;
  }
  
  if (searchInfo) { 
    searchInfo.hidden = true; 
    searchInfo.textContent = ''; 
  }

  list.forEach(b => {
    const card = document.createElement('div');
    card.className = 'slide-card';
    const safeName = b.name.replace(/'/g, "\\'");
    
    // FIXED: Use the correct HTML structure that matches CSS classes
    card.innerHTML = `
      <div class="card-image">
        <img src="${b.img}" class="slide-img" alt="${b.name}" loading="lazy">
        <div class="card-badge">${b.brand}</div>
      </div>
      <div class="card-content">
        <h3>${b.name}</h3>
        <p class="card-meta">${b.year} • ${b.km.toLocaleString("en-IN")} km • ${b.owner}</p>
        <div class="card-specs">
          <div class="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            <span>${b.hp}</span>
          </div>
          <div class="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8l-8 8"></path>
              <path d="M16 16l-8-8"></path>
            </svg>
            <span>${b.torque}</span>
          </div>
          <div class="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L1 21h22L12 2z"></path>
              <path d="M12 6v12"></path>
              <path d="M12 12l4 4"></path>
            </svg>
            <span>${b.mileage}</span>
          </div>
        </div>
        <div class="card-price-row">
          <p class="slide-price">₹ ${b.price.toLocaleString("en-IN")}</p>
          <button class="card-action-btn" onclick="openBikeWhatsApp('${safeName}', ${b.price})">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>
        <button class="mobile-expand-btn" aria-expanded="false">
          <span>View Details</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="card-details-expanded">
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-label">Power</span>
              <span class="detail-value">${b.hp}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Torque</span>
              <span class="detail-value">${b.torque}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Mileage</span>
              <span class="detail-value">${b.mileage}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Owner</span>
              <span class="detail-value">${b.owner}</span>
            </div>
          </div>
          <button class="card-full-btn" onclick="openBikeWhatsApp('${safeName}', ${b.price})">
            Contact Seller via WhatsApp
          </button>
        </div>
      </div>
    `;
    
    slider.appendChild(card);
  });
}

// filtering
function applyFilter() {
  let list = bikes;
  if (currentFilter !== 'all') {
    list = list.filter(b => b.brand === currentFilter);
  }
  
  // apply active search if present
  const q = (searchInput && searchInput.value || '').trim().toLowerCase();
  if (q) {
    list = list.filter(b => {
      return b.name.toLowerCase().includes(q) ||
             b.brand.toLowerCase().includes(q) ||
             String(b.year).includes(q);
    });
  }
  
  renderBikes(list);
}

// slider nav
function slideLeft() { 
  if (!slider) return; 
  slider.scrollBy({ left: -350, behavior: 'smooth' }); 
}

function slideRight() { 
  if (!slider) return; 
  slider.scrollBy({ left: 350, behavior: 'smooth' }); 
}

// smooth scroll to inventory
function scrollToInventory() { 
  const inv = document.getElementById('inventory'); 
  if (inv) inv.scrollIntoView({ behavior: 'smooth' }); 
}

// WhatsApp
function openBikeWhatsApp(name, price) {
  const formatted = price.toLocaleString('en-IN');
  const text = encodeURIComponent(
    `Hello Motormines,\n\nI'm interested in your *${name}*.\nPrice: ₹ ${formatted}\n\nPlease share vehicle condition and service history.\n\nThank you.`
  );
  const wa = "919876543210";
  window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
}

// contact form
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const text = encodeURIComponent(`*New Enquiry from Motormines Website*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nRequirement:\n${message}`);
  const wa = "919876543210";
  window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
  e.target.reset();
}

// Back to top button functionality
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// expose functions globally used by markup
window.slideLeft = slideLeft;
window.slideRight = slideRight;
window.scrollToInventory = scrollToInventory;
window.openBikeWhatsApp = openBikeWhatsApp;
window.handleFormSubmit = handleFormSubmit;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {

  // footer year
  const yearEl = document.getElementById('year'); 
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // initial render
  renderBikes(bikes);

  // filters
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-brand');
      applyFilter();
    });
  });

  // search interactions - enter and button
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { 
        applyFilter(); 
      }
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function() { 
      applyFilter(); 
    });
  }

  // quick action click handling (can focus search / scroll)
  document.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const type = this.dataset.type;
      if (type && type.includes('buy')) {
        // focus search input on mobile for buying
        if (searchInput) { 
          searchInput.focus(); 
        }
        // scroll to inventory
        const inv = document.getElementById('inventory'); 
        if (inv) inv.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hamburger menu logic + overlay
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (navOverlay) navOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (navOverlay) navOverlay.hidden = true;
    document.body.style.overflow = 'auto';
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(ev) {
      ev.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    navLinks.addEventListener('click', e => e.stopPropagation());
    
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(a => a.addEventListener('click', closeMenu));
    
    document.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
    
    document.addEventListener('keydown', function(e) { 
      if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMenu(); 
      }
    });
  }

  // --- Rotating placeholder ---
  const suggestionSet = new Set();
  bikes.forEach(b => {
    suggestionSet.add(`${b.brand} ${b.name}`);
    suggestionSet.add(`${b.name}`);
    suggestionSet.add(`${b.brand}`);
  });
  
  const suggestions = Array.from(suggestionSet).slice(0, 20);

  if (searchInput && suggestions.length) {
    let si = 0;
    searchInput.placeholder = `Search ${suggestions[si]} or type brand / model`;
    si++;
    
    const rotateInterval = 2200;
    const placeholderTimer = setInterval(() => {
      if (searchInput.value && searchInput.value.trim().length > 0) return;
      searchInput.placeholder = `Search ${suggestions[si]} or type brand / model`;
      si = (si + 1) % suggestions.length;
    }, rotateInterval);

    window.addEventListener('beforeunload', () => clearInterval(placeholderTimer));
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize mobile expand buttons for bike cards
  function initMobileExpandButtons() {
    const expandBtns = document.querySelectorAll('.mobile-expand-btn');
    
    expandBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Close other expanded cards
        if (!isExpanded) {
          expandBtns.forEach(otherBtn => {
            if (otherBtn !== this && otherBtn.getAttribute('aria-expanded') === 'true') {
              otherBtn.setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
      
      // Keyboard accessibility
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }
  
  // Initialize view toggle
  function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const cards = document.querySelectorAll('.slide-card');
    
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        viewBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const view = this.dataset.view;
        cards.forEach(card => {
          if (view === 'compact') {
            card.classList.add('compact-view');
          } else {
            card.classList.remove('compact-view');
          }
        });
      });
    });
  }
  
  // Initialize mobile features toggle
  function initMobileFeaturesToggle() {
    const toggleBtn = document.querySelector('.features-toggle-btn');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
      });
      
      toggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    }
  }
  
  // Initialize all mobile functionality
  setTimeout(() => {
    initMobileExpandButtons();
    initViewToggle();
    initMobileFeaturesToggle();
    animateStats();
  }, 500);

});

// Staggered entrance and keyboard support
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(document.querySelectorAll('.quick-card.modern-card'));

  if (!cards.length) return;

  if (prefersReduced) {
    cards.forEach(c => { 
      c.style.opacity = 1; 
      c.style.transform = 'none'; 
    });
  } else {
    cards.forEach((card, i) => {
      card.style.animationDelay = (i * 80) + 'ms';
      card.addEventListener('keydown', (ev) => {
        if ((ev.key === 'Enter' || ev.key === ' ') && document.activeElement === card) {
          ev.preventDefault();
          card.click();
        }
      });
    });
  }

  cards.forEach(c => c.setAttribute('tabindex', '0'));
})();

 // Simple script to update the mobile dots based on scroll (non-invasive)
    (function () {
      const wrapper = document.querySelector('.cards-scroll-wrapper');
      const dots = document.querySelectorAll('.scroll-dots .dot');
      if (!wrapper || !dots.length) return;

      function updateDots() {
        const scrollLeft = wrapper.scrollLeft;
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        const pct = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        const index = Math.round(pct * (dots.length - 1));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
      wrapper.addEventListener('scroll', updateDots, { passive: true });
      window.addEventListener('resize', updateDots);
      updateDots();
    })();


    // Add this JavaScript for slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.testimonials-slider');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  const dots = document.querySelectorAll('.indicator-dot');
  let currentIndex = 0;
  
  if (slider && prevBtn && nextBtn) {
    // Calculate card width including gap
    const cardStyle = window.getComputedStyle(document.querySelector('.testimonial-card'));
    const cardWidth = parseInt(cardStyle.width) + parseInt(cardStyle.marginRight || 0);
    const gap = 25; // matches CSS gap
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(currentIndex + 1, 4);
      updateSlider();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateSlider();
    });
    
    // Dot click
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
    
    // Update slider position and active dot
    function updateSlider() {
      const scrollAmount = currentIndex * (cardWidth + gap);
      slider.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Update dots on scroll
    slider.addEventListener('scroll', () => {
      const scrollPosition = slider.scrollLeft;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= 4) {
        currentIndex = newIndex;
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
    });
    
    // Initialize
    updateSlider();
  }
});





