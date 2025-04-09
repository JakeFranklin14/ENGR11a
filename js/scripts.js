// === Image Zoom Modal Script ===
document.addEventListener('DOMContentLoaded', () => {
    const zoomModal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    let originalRect = null;
  
    function openModalImage(img) {
      originalRect = img.getBoundingClientRect();
      zoomedImage.src = img.src;
  
      zoomedImage.style.top = originalRect.top + 'px';
      zoomedImage.style.left = originalRect.left + 'px';
      zoomedImage.style.width = originalRect.width + 'px';
      zoomedImage.style.height = originalRect.height + 'px';
  
      zoomModal.style.display = 'flex';
  
      setTimeout(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
  
        const scaleFactor = Math.min(vw * 0.9 / naturalWidth, vh * 0.9 / naturalHeight);
        const targetWidth = naturalWidth * scaleFactor;
        const targetHeight = naturalHeight * scaleFactor;
  
        zoomedImage.style.top = (vh - targetHeight) / 2 + 'px';
        zoomedImage.style.left = (vw - targetWidth) / 2 + 'px';
        zoomedImage.style.width = targetWidth + 'px';
        zoomedImage.style.height = targetHeight + 'px';
      }, 10);
    }
  
    function closeZoomModal() {
      if (!originalRect) return;
  
      zoomedImage.style.top = originalRect.top + 'px';
      zoomedImage.style.left = originalRect.left + 'px';
      zoomedImage.style.width = originalRect.width + 'px';
      zoomedImage.style.height = originalRect.height + 'px';
  
      zoomModal.classList.add('zooming-out');
  
      setTimeout(() => {
        zoomModal.style.display = 'none';
        zoomModal.classList.remove('zooming-out');
        zoomedImage.src = '';
        originalRect = null;
      }, 300);
    }
  
    // Attach handlers
    zoomModal.addEventListener('click', closeZoomModal);
    document.querySelectorAll('.write-up-image').forEach(img => {
      img.addEventListener('click', () => openModalImage(img));
    });
  
    // ESC support
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && zoomModal.style.display === 'flex') {
        closeZoomModal();
      }
    });
  });