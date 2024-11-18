document.querySelectorAll('.image-gallery .image-item img').forEach(img => {
    img.addEventListener('click', function () {
        const imageUrl = img.getAttribute('data-bs-image');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.setAttribute('src', imageUrl);
    });
});