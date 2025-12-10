// app.js

// Bike Data
const bikes = [
    {
        name: "KTM Duke 390",
        brand: "KTM",
        price: 195000,
        year: 2019,
        km: 18000,
        hp: "43 BHP",
        torque: "37 Nm",
        mileage: "28 kmpl",
        owner: "Single Owner",
        img: "images/bikes/bike1.jpg"
    },
    {
        name: "Royal Enfield Classic 350",
        brand: "Royal Enfield",
        price: 145000,
        year: 2018,
        km: 24000,
        hp: "20 BHP",
        torque: "28 Nm",
        mileage: "35 kmpl",
        owner: "First Owner",
        img: "images/bikes/bike2.jpg"
    },
    {
        name: "Honda Activa 6G",
        brand: "Honda",
        price: 75000,
        year: 2021,
        km: 8500,
        hp: "8 BHP",
        torque: "10 Nm",
        mileage: "45 kmpl",
        owner: "Single Owner",
        img: "images/bikes/bike3.jpg"
    },
    {
        name: "Yamaha R15 V3",
        brand: "Yamaha",
        price: 165000,
        year: 2020,
        km: 16000,
        hp: "18.6 BHP",
        torque: "14 Nm",
        mileage: "40 kmpl",
        owner: "Second Owner",
        img: "images/bikes/bike4.jpg"
    },
    {
        name: "KTM RC 200",
        brand: "KTM",
        price: 175000,
        year: 2020,
        km: 12000,
        hp: "25 BHP",
        torque: "19.2 Nm",
        mileage: "35 kmpl",
        owner: "Single Owner",
        img: "images/bikes/bike1.jpg"
    },
    {
        name: "Royal Enfield Himalayan",
        brand: "Royal Enfield",
        price: 210000,
        year: 2021,
        km: 15000,
        hp: "24.3 BHP",
        torque: "32 Nm",
        mileage: "30 kmpl",
        owner: "First Owner",
        img: "images/bikes/bike2.jpg"
    },
    {
        name: "Honda CB Shine",
        brand: "Honda",
        price: 65000,
        year: 2019,
        km: 22000,
        hp: "10 BHP",
        torque: "10.3 Nm",
        mileage: "50 kmpl",
        owner: "Second Owner",
        img: "images/bikes/bike3.jpg"
    },
    {
        name: "Yamaha FZ V3",
        brand: "Yamaha",
        price: 125000,
        year: 2020,
        km: 18000,
        hp: "13.2 BHP",
        torque: "12.8 Nm",
        mileage: "45 kmpl",
        owner: "Single Owner",
        img: "images/bikes/bike4.jpg"
    }
];

// DOM Elements
const slider = document.getElementById('slider');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Initial render of all bikes
    renderBikes(bikes);
    
    // Setup filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            currentFilter = this.getAttribute('data-brand');
            applyFilter();
        });
    });
});

// Render bikes to slider
function renderBikes(list) {
    slider.innerHTML = "";
    
    list.forEach(b => {
        const card = document.createElement("div");
        card.className = "slide-card";
        
        // Escape any single quotes in bike name for JavaScript string
        const safeName = b.name.replace(/'/g, "\\'");
        
        card.innerHTML = `
            <img src="${b.img}" class="slide-img" alt="${b.name}">
            <h3>${b.name}</h3>
            <p class="slide-meta">${b.brand} • ${b.year} • ${b.km.toLocaleString("en-IN")} km</p>
            <ul class="slide-specs">
                <li>⚙ Power: ${b.hp}</li>
                <li>🌀 Torque: ${b.torque}</li>
                <li>⛽ Mileage: ${b.mileage}</li>
                <li>👤 ${b.owner}</li>
            </ul>
            <p class="slide-price">₹ ${b.price.toLocaleString("en-IN")}</p>
            <button class="btn-outline" onclick="openBikeWhatsApp('${safeName}', ${b.price})">
                Enquire
            </button>
        `;
        slider.appendChild(card);
    });
}

// Apply brand filter
function applyFilter() {
    let filteredBikes;
    
    if (currentFilter === 'all') {
        filteredBikes = bikes;
    } else {
        filteredBikes = bikes.filter(bike => bike.brand === currentFilter);
    }
    
    renderBikes(filteredBikes);
}

// Slider navigation functions
function slideLeft() {
    slider.scrollBy({ left: -350, behavior: "smooth" });
}

function slideRight() {
    slider.scrollBy({ left: 350, behavior: "smooth" });
}

// Scroll to inventory section
function scrollToInventory() {
    document.getElementById('inventory').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Open WhatsApp for bike enquiry
function openBikeWhatsApp(name, price) {
    // Format price with Indian numbering system
    const formattedPrice = price.toLocaleString("en-IN");
    
    // Create formatted WhatsApp message using markdown syntax for better readability
    // Using asterisks for bold text as per WhatsApp formatting rules [citation:4][citation:8]
    const text = encodeURIComponent(
        `Hello Motormines,\n\n` +
        `I'm interested in your *${name}*.\n` +
        `Price: ₹ ${formattedPrice}\n\n` +
        `Please share more details about:\n` +
        `• Vehicle condition\n` +
        `• Service history\n` +
        `• Test ride availability\n` +
        `• Best price\n\n` +
        `Thank you!`
    );
    
    // WhatsApp number (replace with actual business number)
    const wa = "919876543210";
    window.open(`https://wa.me/${wa}?text=${text}`, "_blank");
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    
    // Create a formatted WhatsApp message with proper formatting
    // Using WhatsApp's markdown syntax for better structure [citation:4][citation:8]
    const text = encodeURIComponent(
        `*New enquiry from Motormines website*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n\n` +
        `*Requirement:*\n${message}\n\n` +
        `_Submitted via motormines.com_`
    );
    
    const wa = "919876543210"; // Replace with actual business number
    window.open(`https://wa.me/${wa}?text=${text}`, "_blank");
    
    // Reset form
    e.target.reset();
}

// Make functions globally available
window.slideLeft = slideLeft;
window.slideRight = slideRight;
window.scrollToInventory = scrollToInventory;
window.openBikeWhatsApp = openBikeWhatsApp;
window.handleFormSubmit = handleFormSubmit;

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Set footer year (existing code)
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Initial render of all bikes (existing code)
    renderBikes(bikes);
    
    // Setup filter button event listeners (existing code)
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-brand');
            applyFilter();
        });
    });
});