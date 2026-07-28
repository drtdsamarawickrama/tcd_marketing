<!-- Beautiful Custom Confirmation Modal -->
<div id="confirm-modal" class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 opacity-0 pointer-events-none transition-all duration-300">
    <div class="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform scale-90 opacity-0 transition-all duration-300" id="confirm-modal-box">
        <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-red-50 text-red-650 flex items-center justify-center text-2xl shrink-0 animate-bounce">
                ⚠️
            </div>
            <div class="space-y-2 grow">
                <h3 class="text-lg font-black text-slate-900">Re-initialize Database?</h3>
                <p class="text-xs text-slate-500 leading-relaxed">
                    Warning: This action will completely reset your database storage. It will drop all tables and delete:
                </p>
                <ul class="text-[11px] text-slate-650 font-semibold list-disc list-inside space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <li>All products and product categories</li>
                    <li>All slides and banners on homepage</li>
                    <li>All user accounts, shopping carts & wishlists</li>
                </ul>
                <p class="text-[11px] text-red-500 font-bold">This operation is permanent and cannot be undone.</p>
            </div>
        </div>
        <div class="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
            <button onclick="closeConfirmModal()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 px-4 rounded-lg transition duration-150">
                No, Cancel
            </button>
            <a href="api/setup_db.php" class="bg-red-600 hover:bg-red-750 text-white font-extrabold text-xs py-2.5 px-5 rounded-lg shadow-md shadow-red-500/10 hover:shadow-lg transition duration-150">
                Yes, Reset DB
            </a>
        </div>
    </div>
</div>

<!-- Javascript triggers for custom confirmation modal -->
<script>
    window.openConfirmModal = function(e) {
        e.preventDefault();
        const modal = document.getElementById('confirm-modal');
        const modalBox = document.getElementById('confirm-modal-box');
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-90', 'opacity-0');
        modalBox.classList.add('scale-100', 'opacity-100');
    };

    window.closeConfirmModal = function() {
        const modal = document.getElementById('confirm-modal');
        const modalBox = document.getElementById('confirm-modal-box');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalBox.classList.remove('scale-100', 'opacity-100');
        modalBox.classList.add('scale-90', 'opacity-0');
    };
</script>
