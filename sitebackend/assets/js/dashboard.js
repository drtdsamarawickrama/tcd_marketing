// Store all items fetched dynamically in JavaScript memory
let itemsList = [];
let selectedCategory = 'all';
let editingItemId = null; // Stores ID of product being edited, null if in Add mode

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
const imageInput = document.getElementById('image');
const previewCard = document.getElementById('preview-card');
const previewImageBg = document.getElementById('preview-image-bg');
const previewImage = document.getElementById('preview-image');
const previewEmoji = document.getElementById('preview-emoji');
const previewBadge = document.getElementById('preview-badge');
const previewTitle = document.getElementById('preview-title');
const previewPrice = document.getElementById('preview-price');
const previewOldPrice = document.getElementById('preview-old-price');
const addForm = document.getElementById('add-product-form');
const formTitleHeading = document.getElementById('form-title-heading');
const formSubmitText = document.getElementById('form-submit-text');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
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
    
    // Update Image or Emoji icon
    const fileInput = document.getElementById('image_file');
    const imageVal = imageInput.value.trim();
    if (fileInput && fileInput.files && fileInput.files[0]) {
        previewImage.src = URL.createObjectURL(fileInput.files[0]);
        previewImage.classList.remove('hidden');
        previewEmoji.classList.add('hidden');
    } else if (imageVal) {
        previewImage.src = imageVal;
        previewImage.classList.remove('hidden');
        previewEmoji.classList.add('hidden');
    } else {
        previewImage.classList.add('hidden');
        previewEmoji.classList.remove('hidden');
        previewEmoji.textContent = iconInput.value ? iconInput.value : '🛏️';
    }
    
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
imageInput.addEventListener('input', updateLivePreview);
if (document.getElementById('image_file')) {
    document.getElementById('image_file').addEventListener('change', updateLivePreview);
}

const categorySubcategories = {
    'living-room': [
        { group: 'Seating', items: [
            { value: 'sofa-sets', label: 'Sofa Sets' },
            { value: 'corner-sofa', label: 'Corner + Chaise Sofa' },
            { value: 'recliner-sofa', label: 'Recliner Sofa' },
            { value: 'single-seaters', label: 'Single Seaters' },
            { value: 'ottoman', label: 'Ottoman' },
            { value: 'sofa-beds', label: 'Sofa Beds' },
            { value: 'wooden-sofa', label: 'Wooden Sofa' }
        ]},
        { group: 'Coffee Tables, TV Stands & Rugs', items: [
            { value: 'coffee-tables', label: 'Coffee Tables & Side Tables' },
            { value: 'tv-stands', label: 'TV Stands & Wall Units' },
            { value: 'cabinets', label: 'Display cabinets & Sideboards' },
            { value: 'shelves', label: 'Wall Shelves & Display Stands' },
            { value: 'rugs', label: 'Rugs' }
        ]}
    ],
    'bedroom': [
        { group: 'Bedroom Furniture', items: [
            { value: 'bedroom-suites', label: 'Bedroom Suites' },
            { value: 'beds', label: 'Beds' },
            { value: 'upholstered-beds', label: 'Upholstered Beds' },
            { value: 'bedside-cupboards', label: 'Bedside Cupboards & Bench' },
            { value: 'wardrobes', label: 'Wardrobes' },
            { value: 'modular-wardrobe', label: 'Modular Wardrobe' },
            { value: 'dressing-tables', label: 'Dressing Tables' },
            { value: 'clothes-racks', label: 'Clothes Racks' },
            { value: 'shoe-racks', label: 'Shoe Racks & Storage' },
            { value: 'iron-tables', label: 'Iron Tables' }
        ]},
        { group: 'Mattress, Pillows & Bedsheet', items: [
            { value: 'spring-mattresses', label: 'Spring Mattresses' },
            { value: 'foam-mattresses', label: 'Foam Mattresses' },
            { value: 'pillows-protectors', label: 'Pillows & Mattress Protectors' }
        ]}
    ],
    'dining': [
        { group: 'Wooden Finish', items: [
            { value: 'wooden-sets', label: 'Wooden Dining Sets' },
            { value: 'wooden-chairs', label: 'Wooden Dining Chairs' },
            { value: 'pantry-cupboards', label: 'Pantry Cupboards' },
            { value: 'dining-cabinets', label: 'Cabinets & Sideboards' }
        ]},
        { group: 'Metal Finish', items: [
            { value: 'metal-sets', label: 'Metal Dining Sets' },
            { value: 'metal-chairs', label: 'Metal Dining Chairs' }
        ]}
    ],
    'office-furniture': [
        { group: 'Tables, Cupboards & Racks', items: [
            { value: 'office-tables', label: 'Office Tables' },
            { value: 'executive-tables', label: 'Executive Tables' },
            { value: 'conference-tables', label: 'Conference & Discussion Tables' },
            { value: 'cupboards-racks', label: 'Cupboards & Racks' },
            { value: 'steel-furniture', label: 'Steel Furniture' },
            { value: 'study-desks', label: 'Study Desks & Computer Tables' },
            { value: 'workstations', label: 'Workstations' },
            { value: 'reception-counters', label: 'Reception Counters' }
        ]},
        { group: 'Seating', items: [
            { value: 'chairs-series', label: 'Office Chairs By Series' },
            { value: 'chairs-models', label: 'All Office Chair Models' },
            { value: 'lobby-seaters', label: 'Lobby Seaters' },
            { value: 'waiting-chairs', label: 'Waiting Chairs' }
        ]},
        { group: 'Secure Storages & Safes', items: [
            { value: 'safes-doors', label: 'Safes & Fire Resistant Doors' },
            { value: 'lockers-safes', label: 'Safety Lockers & Strong Box' }
        ]}
    ],
    'plastic-products': [
        { group: 'Plastic Products', items: [
            { value: 'plastic-chairs', label: 'Plastic Chairs' },
            { value: 'plastic-tables', label: 'Plastic Tables' },
            { value: 'plastic-cupboards', label: 'Plastic Cupboards' },
            { value: 'household', label: 'Household' },
            { value: 'pvc-doors', label: 'PVC Doors & Frames' }
        ]}
    ],
    'electrics': [
        { group: 'Kitchen Appliances', items: [
            { value: 'kitchen-ovens', label: 'Ovens & Microwaves' },
            { value: 'kitchen-blenders', label: 'Blenders & Grinders' },
            { value: 'kitchen-cookers', label: 'Rice Cookers & Kettles' },
            { value: 'kitchen-stoves', label: 'Gas Stoves & Hobs' }
        ]},
        { group: 'Home Appliances', items: [
            { value: 'home-fridges', label: 'Refrigerators' },
            { value: 'home-washers', label: 'Washing Machines' },
            { value: 'home-coolers', label: 'Air Conditioners & Fans' }
        ]},
        { group: 'Audio & Video', items: [
            { value: 'av-tvs', label: 'Televisions' },
            { value: 'av-audio', label: 'Home Theatre & Speakers' }
        ]}
    ]
};

// Toggle subcategory field container based on chosen category selection
function toggleSubcategoryField() {
    const subField = document.getElementById('subcategory-field');
    const subSelect = document.getElementById('subcategory');
    const subLabel = document.getElementById('subcategory-label');
    if (!subField || !subSelect) return;

    const catValue = categorySelect ? categorySelect.value : '';
    const subcategoriesList = categorySubcategories[catValue];

    if (subcategoriesList) {
        // Backup currently selected value to re-assign if it is valid for new options (for edit mode)
        const currentSelectedVal = subSelect.value;

        // Clear existing options except placeholder
        subSelect.innerHTML = '<option value="">None (Standard Product)</option>';
        
        // Rebuild options dynamically
        subcategoriesList.forEach(grp => {
            const optGroup = document.createElement('optgroup');
            optGroup.label = grp.group;
            grp.items.forEach(itm => {
                const opt = document.createElement('option');
                opt.value = itm.value;
                opt.textContent = itm.label;
                optGroup.appendChild(opt);
            });
            subSelect.appendChild(optGroup);
        });

        // Restore backup selection value if valid
        if (currentSelectedVal) {
            subSelect.value = currentSelectedVal;
        }

        // Set Label text dynamically
        if (subLabel) {
            subLabel.textContent = catValue === 'living-room' 
                ? 'Living Room Subcategory' 
                : catValue === 'bedroom' 
                    ? 'Bedroom Subcategory' 
                    : catValue === 'dining'
                        ? 'Dining Subcategory'
                        : catValue === 'office-furniture'
                            ? 'Office Subcategory'
                            : catValue === 'plastic-products'
                                ? 'Plastic Subcategory'
                                : 'Electrics Subcategory';
        }

        subField.classList.remove('hidden');
    } else {
        subField.classList.add('hidden');
        subSelect.value = ''; // Reset select
    }
}

// Auto update emoji & bg gradients depending on chosen category
if (categorySelect) {
    categorySelect.addEventListener('change', function() {
        toggleSubcategoryField();

        // Skip auto-fill if currently in editing mode
        if (editingItemId !== null) return;

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

        // Parse image or icon element HTML representation
        const imageHTML = item.image 
            ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-200" />`
            : `<span class="text-5xl group-hover:scale-110 transition duration-200">${item.icon}</span>`;

        const cardHTML = `
            <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between shadow-sm relative" id="card-${item.id}">
                <div class="h-44 bg-linear-to-br ${item.image_bg} relative flex items-center justify-center overflow-hidden">
                    ${badgeHTML}
                    ${imageHTML}
                    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col gap-2.5 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                        <button class="bg-blue-600 text-white font-extrabold text-xs px-4 py-2 rounded-md hover:bg-blue-700 shadow-md w-28" onclick="editItem(${item.id})">
                            Edit Item
                        </button>
                        <button class="bg-red-600 text-white font-extrabold text-xs px-4 py-2 rounded-md hover:bg-red-700 shadow-md w-28" onclick="deleteItem(${item.id})">
                            Delete Item
                        </button>
                    </div>
                </div>
                <div class="p-4 grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 line-clamp-2 min-h-10 leading-tight">${item.name}</h3>
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
        if(selectedCategory !== 'all' && categorySelect && editingItemId === null) {
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

// Switch form state to edit mode
window.editItem = function(id) {
    const item = itemsList.find(itm => parseInt(itm.id) === parseInt(id));
    if (!item) return;

    editingItemId = id;

    // Fill form inputs
    document.getElementById('category').value = item.category;
    document.getElementById('name').value = item.name;
    document.getElementById('price').value = item.price;
    document.getElementById('old_price').value = item.old_price || '';
    document.getElementById('rating').value = item.rating;
    document.getElementById('badge').value = item.badge || '';
    document.getElementById('image').value = item.image || '';
    document.getElementById('tag').value = item.tag || '';
    document.getElementById('subcategory').value = item.subcategory || '';
    document.getElementById('icon').value = item.icon;
    document.getElementById('image_bg').value = item.image_bg;
    document.getElementById('description').value = item.description || '';
    document.getElementById('dimensions').value = item.dimensions || '';
    document.getElementById('warranty').value = item.warranty || '';

    // Fill gallery_urls textarea from additional_images JSON array (one URL per line)
    if (item.additional_images) {
        try {
            const galleryArr = JSON.parse(item.additional_images);
            document.getElementById('gallery_urls').value = Array.isArray(galleryArr) ? galleryArr.join('\n') : '';
        } catch(e) {
            document.getElementById('gallery_urls').value = '';
        }
    } else {
        document.getElementById('gallery_urls').value = '';
    }
    // Clear gallery file input as we can't pre-fill file inputs
    document.getElementById('gallery_files').value = '';
    
    // Toggle subcategory field visibility
    toggleSubcategoryField();

    // Highlight selected gradient in option panel UI
    document.querySelectorAll('.gradient-option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.getAttribute('data-classes') === item.image_bg) {
            opt.classList.add('selected');
        }
    });

    document.getElementById('form-category-indicator').textContent = 'Category: ' + item.category;

    // Update form header title and button text labels
    formTitleHeading.textContent = 'Edit Product';
    formSubmitText.textContent = 'Update Product';
    cancelEditBtn.classList.remove('hidden');

    // Update live preview & scroll smooth to view editing form
    updateLivePreview();
    document.getElementById('add-product-form').scrollIntoView({ behavior: 'smooth' });
};

// Cancel edit and reset to original add state mode
window.cancelEdit = function() {
    editingItemId = null;
    addForm.reset();

    // Also clear gallery fields that reset() might miss
    document.getElementById('gallery_urls').value = '';
    document.getElementById('gallery_files').value = '';

    // Reset headers and buttons representation
    formTitleHeading.textContent = 'Add New Product';
    formSubmitText.textContent = 'Add Product to Category';
    cancelEditBtn.classList.add('hidden');

    // Trigger categories change event helper to reset gradients and icon emojis
    if(categorySelect) {
        categorySelect.dispatchEvent(new Event('change'));
    }

    updateLivePreview();
};

if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', window.cancelEdit);
}

// Post request using fetch to add or update an item
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('form-submit-btn');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner"></span> <span>${editingItemId ? 'Updating...' : 'Saving...'}</span>`;

        // Prepare key form variables payload using FormData for file uploads support
        const formData = new FormData();
        formData.append('category', document.getElementById('category').value);
        formData.append('name', document.getElementById('name').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('old_price', document.getElementById('old_price').value);
        formData.append('rating', document.getElementById('rating').value);
        formData.append('badge', document.getElementById('badge').value);
        formData.append('icon', document.getElementById('icon').value);
        formData.append('image_bg', document.getElementById('image_bg').value);
        formData.append('image', document.getElementById('image').value);
        formData.append('tag', document.getElementById('tag').value);
        formData.append('subcategory', document.getElementById('subcategory').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('dimensions', document.getElementById('dimensions').value);
        formData.append('warranty', document.getElementById('warranty').value);

        // Append main image file if selected
        const fileInput = document.getElementById('image_file');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            formData.append('image_file', fileInput.files[0]);
        }

        // Append gallery image files (multiple select)
        const galleryFilesInput = document.getElementById('gallery_files');
        if (galleryFilesInput && galleryFilesInput.files && galleryFilesInput.files.length > 0) {
            for (let i = 0; i < galleryFilesInput.files.length; i++) {
                formData.append('gallery_files[]', galleryFilesInput.files[i]);
            }
        }

        // Append gallery URLs textarea (one per line)
        const galleryUrlsVal = document.getElementById('gallery_urls').value.trim();
        if (galleryUrlsVal) {
            formData.append('gallery_urls', galleryUrlsVal);
        }

        // When editing, pass existing additional_images so backend preserves if no new files uploaded
        if (editingItemId !== null) {
            formData.append('id', editingItemId);
            const existingItem = itemsList.find(itm => parseInt(itm.id) === parseInt(editingItemId));
            if (existingItem && existingItem.additional_images && !galleryUrlsVal && (!galleryFilesInput || galleryFilesInput.files.length === 0)) {
                formData.append('additional_images', existingItem.additional_images);
            }
        }

        const targetApi = editingItemId !== null ? 'api/update_item.php' : 'api/add_item.php';

        fetch(targetApi, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;

            if (res.success) {
                const plainItem = {
                    id: editingItemId !== null ? editingItemId : res.id,
                    category: document.getElementById('category').value,
                    name: document.getElementById('name').value,
                    price: document.getElementById('price').value,
                    old_price: document.getElementById('old_price').value,
                    rating: parseInt(document.getElementById('rating').value),
                    badge: document.getElementById('badge').value,
                    icon: document.getElementById('icon').value,
                    image_bg: document.getElementById('image_bg').value,
                    image: res.image || document.getElementById('image').value,
                    tag: document.getElementById('tag').value,
                    subcategory: document.getElementById('subcategory').value,
                    description: document.getElementById('description').value,
                    dimensions: document.getElementById('dimensions').value,
                    warranty: document.getElementById('warranty').value,
                    // Store additional_images from response (updated JSON) or keep existing
                    additional_images: res.additional_images !== undefined ? res.additional_images : null
                };

                if (editingItemId !== null) {
                    showToast('Product updated successfully!');
                    
                    // Update matching object details in memory array
                    const idx = itemsList.findIndex(itm => parseInt(itm.id) === parseInt(editingItemId));
                    if (idx !== -1) {
                        itemsList[idx] = plainItem;
                    }
                    
                    // Reset back to Add mode
                    cancelEdit();
                } else {
                    showToast('Product added successfully!');
                    
                    // Add newly inserted product to memory array
                    itemsList.unshift(plainItem); // Add to beginning
                    
                    // Clear form text inputs
                    document.getElementById('name').value = '';
                    document.getElementById('price').value = '';
                    document.getElementById('old_price').value = '';
                    document.getElementById('badge').value = '';
                    document.getElementById('image').value = '';
                    if (document.getElementById('image_file')) {
                        document.getElementById('image_file').value = '';
                    }
                    document.getElementById('tag').value = '';
                    document.getElementById('subcategory').value = '';
                    document.getElementById('description').value = '';
                    document.getElementById('dimensions').value = '';
                    document.getElementById('warranty').value = '';
                    toggleSubcategoryField();
                }
                
                // Refresh view
                updateSidebarCounters();
                renderItems();
                updateLivePreview();
            } else {
                showToast(res.message || 'Error occurred while saving product.', 'error');
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
            
            // If the item deleted was currently being edited, cancel the edit mode
            if (editingItemId !== null && parseInt(editingItemId) === parseInt(id)) {
                cancelEdit();
            }

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
    toggleSubcategoryField();

    // Mobile Sidebar Responsive Toggle Logic
    const sidebarMenu = document.getElementById('sidebar-menu');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    function openMobileSidebar() {
        if (sidebarMenu && sidebarOverlay) {
            sidebarMenu.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        }
    }

    function closeMobileSidebar() {
        if (sidebarMenu && sidebarOverlay) {
            sidebarMenu.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    }

    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', openMobileSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileSidebar);

    // Close sidebar on mobile when a category item is clicked
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeMobileSidebar();
            }
        });
    });

    // Check if redirect query 'cat' exists in URL and filter automatically
    const urlParams = new URLSearchParams(window.location.search);
    const catQuery = urlParams.get('cat');
    if (catQuery) {
        const targetItem = document.querySelector(`.category-item[data-category="${catQuery}"]`);
        if (targetItem) {
            // Trigger click simulation
            targetItem.click();
            // Clean up the URL query parameter in the browser bar
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});
