// Store all items fetched dynamically in JavaScript memory
let itemsList = [];
let selectedCategory = 'all';

// Predefined category icons lookup helper
const categoryMeta = {
    'bedroom': { icon: '🛏️', gradient: 'from-amber-200 to-amber-300' },
    'dining': { icon: '🍽️', gradient: 'from-amber-100 to-amber-200' },
    'electrics': { icon: '📺', gradient: 'from-slate-800 to-slate-900 text-white' },
    'living-room': { icon: '🛋️', gradient: 'from-orange-100 to-amber-200' },
    'office-furniture': { icon: '🏢', gradient: 'from-slate-100 to-zinc-200' },
    'plastic-products': { icon: '📦', gradient: 'from-indigo-50 to-blue-100' },
    'budget-items': { icon: '🏷️', gradient: 'from-lime-100 to-yellow-200' }
};

// DOM elements cache
const categorySelect = document.getElementById('category');
const iconInput = document.getElementById('icon');
const bgInput = document.getElementById('image_bg');
const previewCard = document.getElementById('preview-card');
const previewImageBg = document.getElementById('preview-image-bg');
const previewEmoji = document.getElementById('preview-emoji');
const previewBadge = document.getElementById('preview-badge');
const previewTitle = document.getElementById('preview-title');
const previewPrice = document.getElementById('preview-price');
const previewOldPrice = document.getElementById('preview-old-price');
const addForm = document.getElementById('add-product-form');
const productsGrid = document.getElementById('products-grid');
const currentCategoryTitle = document.getElementById('current-category-title');
const itemsFoundLabel = document.getElementById('items-found-label');
const toastBox = document.getElementById('toast-box');

// Fetch all items from API when script starts
function loadItemsFromServer() {
    fetch('api/get_items.php')
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            itemsList = res.data;
            updateSidebarCounters();
            renderItems();
        } else {
            showToast(res.message || 'Error fetching products.', 'error');
        }
    })
    .catch(err => {
        showToast('Error connecting to backend database API.', 'error');
    });
}

// Show custom toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✔' : '❌'}</span> <span>${message}</span>`;
    toastBox.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Live preview synchronization logic
function updateLivePreview() {
    // Update Title
    const title = document.getElementById('name').value;
    previewTitle.textContent = title ? title : 'Solid Wood King Bedroom Set Bed';
    
    // Update Price
    const price = document.getElementById('price').value;
    previewPrice.textContent = price ? price : 'Rs. 89,000';
    
    // Update Old Price
    const oldPrice = document.getElementById('old_price').value;
    if (oldPrice) {
        previewOldPrice.textContent = oldPrice;
        previewOldPrice.style.display = 'block';
    } else {
        previewOldPrice.style.display = 'none';
    }
    
    // Update Badge
    const badge = document.getElementById('badge').value;
    if (badge) {
        previewBadge.textContent = badge.toUpperCase();
        previewBadge.style.display = 'inline-block';
    } else {
        previewBadge.style.display = 'none';
    }
    
    // Update Emoji icon
    previewEmoji.textContent = iconInput.value ? iconInput.value : '🛏️';
    
    // Update gradient background
    const bgClass = bgInput.value;
    // Clean older dynamic tailwind bg classes before adding
    previewImageBg.className = 'h-44 relative flex items-center justify-center overflow-hidden';
    bgClass.split(' ').forEach(cls => {
        if(cls.trim() !== '') previewImageBg.classList.add(cls.trim());
    });
}

// Setup input change event listeners for preview sync
document.getElementById('name').addEventListener('input', updateLivePreview);
document.getElementById('price').addEventListener('input', updateLivePreview);
document.getElementById('old_price').addEventListener('input', updateLivePreview);
document.getElementById('badge').addEventListener('input', updateLivePreview);
iconInput.addEventListener('input', updateLivePreview);

// Auto update emoji & bg gradients depending on chosen category
if (categorySelect) {
    categorySelect.addEventListener('change', function() {
        const selectedOpt = this.options[this.selectedIndex];
        const icon = selectedOpt.getAttribute('data-icon');
        const bg = selectedOpt.getAttribute('data-gradient');
        
        iconInput.value = icon;
        bgInput.value = bg;
        
        // Highlight selected preset gradient indicator
        document.querySelectorAll('.gradient-option').forEach(opt => {
            opt.classList.remove('selected');
            if (opt.getAttribute('data-classes') === bg) {
                opt.classList.add('selected');
            }
        });

        document.getElementById('form-category-indicator').textContent = 'Category: ' + this.value;
        updateLivePreview();
    });
}

// Setup preset gradient click actions
document.querySelectorAll('.gradient-option').forEach(option => {
    // Set initial selection highlight
    if(option.getAttribute('data-classes') === bgInput.value) {
        option.classList.add('selected');
    }

    option.addEventListener('click', function() {
        document.querySelectorAll('.gradient-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        bgInput.value = this.getAttribute('data-classes');
        updateLivePreview();
    });
});

// Render card items into the grid UI
function renderItems() {
    productsGrid.innerHTML = '';
    
    // Filter list depending on chosen category
    const filtered = selectedCategory === 'all' 
        ? itemsList 
        : itemsList.filter(item => item.category === selectedCategory);
    
    itemsFoundLabel.textContent = `${filtered.length} Items`;

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full bg-white border border-slate-200 rounded-xl p-16 text-center text-slate-400">
                <span class="text-5xl block mb-3">📦</span>
                <h3 class="font-bold text-slate-700">No items in this category yet</h3>
                <p class="text-sm">Use the form on the left to add a product separately here.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => {
        // Parse ratings to stars characters
        let ratingStars = '';
        for (let i = 0; i < 5; i++) {
            ratingStars += i < parseInt(item.rating) ? '★' : '☆';
        }

        // Parse old price HTML
        const oldPriceHTML = item.old_price 
            ? `<span class="text-[10px] text-zinc-400 line-through leading-none block mb-0.5">${item.old_price}</span>` 
            : '';

        // Parse badge HTML
        const badgeHTML = item.badge 
            ? `<span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider">${item.badge.toUpperCase()}</span>` 
            : '';

        const cardHTML = `
            <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between shadow-sm relative" id="card-${item.id}">
                <div class="h-44 bg-gradient-to-br ${item.image_bg} relative flex items-center justify-center overflow-hidden">
                    ${badgeHTML}
                    <span class="text-5xl group-hover:scale-110 transition duration-200">${item.icon}</span>
                    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                        <button class="bg-red-600 text-white font-extrabold text-xs px-4 py-2 rounded-md hover:bg-red-700 shadow-md" onclick="deleteItem(${item.id})">
                            Delete Item
                        </button>
                    </div>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px] leading-tight">${item.name}</h3>
                        <div class="flex gap-0.5 text-amber-500 mt-2 text-xs">${ratingStars}</div>
                    </div>
                    <div class="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                        <div class="flex flex-col">
                            ${oldPriceHTML}
                            <span class="text-sm font-black text-red-600 leading-none">${item.price}</span>
                        </div>
                        <button class="bg-slate-900 text-white w-8 h-8 rounded-md hover:bg-red-600 transition duration-150 flex items-center justify-center font-bold text-sm">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Category sidebar menu filtering actions
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        selectedCategory = this.getAttribute('data-category');
        
        // Update header title based on active filter
        const nameSpan = this.querySelector('span:not(.text-lg)');
        currentCategoryTitle.textContent = nameSpan ? nameSpan.textContent : 'All Products';
        
        // If filtering by specific category, pre-select it in form dropdown
        if(selectedCategory !== 'all' && categorySelect) {
            categorySelect.value = selectedCategory;
            categorySelect.dispatchEvent(new Event('change'));
        }
        
        renderItems();
    });
});

// Update total badges on sidebar count indicators
function updateSidebarCounters() {
    const badgeAll = document.getElementById('badge-all');
    if (badgeAll) badgeAll.textContent = itemsList.length;
    
    // Loop and count each category's items list
    const categoriesKeys = Object.keys(categoryMeta);
    categoriesKeys.forEach(catKey => {
        const count = itemsList.filter(itm => itm.category === catKey).length;
        const badge = document.getElementById(`badge-${catKey}`);
        if(badge) badge.textContent = count;
    });
}

// Post request using fetch to add a new item
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner"></span> <span>Saving...</span>`;

        // Prepare key form variables payload
        const formData = {
            category: document.getElementById('category').value,
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            old_price: document.getElementById('old_price').value,
            rating: document.getElementById('rating').value,
            badge: document.getElementById('badge').value,
            icon: document.getElementById('icon').value,
            image_bg: document.getElementById('image_bg').value
        };

        fetch('api/add_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;

            if (res.success) {
                showToast('Product added successfully!');
                
                // Add newly inserted product to memory array
                formData.id = res.id;
                itemsList.unshift(formData); // Add to beginning
                
                // Clear form text inputs
                document.getElementById('name').value = '';
                document.getElementById('price').value = '';
                document.getElementById('old_price').value = '';
                document.getElementById('badge').value = '';
                
                // Refresh view
                updateSidebarCounters();
                renderItems();
                updateLivePreview();
            } else {
                showToast(res.message || 'Error occurred while adding product.', 'error');
            }
        })
        .catch(err => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            showToast('Failed to connect to backend server API.', 'error');
        });
    });
}

// Request delete action endpoint using fetch
window.deleteItem = function(id) {
    if(!confirm('Are you sure you want to delete this item?')) return;

    fetch(`api/delete_item.php?id=${id}`)
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            showToast('Product deleted successfully.');
            
            // Filter deleted item out of memory list array
            itemsList = itemsList.filter(item => parseInt(item.id) !== parseInt(id));
            
            // Refresh rendering
            updateSidebarCounters();
            renderItems();
        } else {
            showToast(res.message || 'Could not delete product.', 'error');
        }
    })
    .catch(err => {
        showToast('Connection error during deletion request.', 'error');
    });
};

// Initialize display list on page load
document.addEventListener('DOMContentLoaded', () => {
    loadItemsFromServer();
    updateLivePreview();
});
