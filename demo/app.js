// SeniorEase Demo App - ZXing Barcode Scanner Implementation
// Based on the working Android app implementation

const state = {
    items: [],
    scanning: false,
    maxItems: 5
};

const elements = {
    itemForm: document.getElementById('itemForm'),
    title: document.getElementById('title'),
    type: document.getElementById('type'),
    creator: document.getElementById('creator'),
    code: document.getElementById('code'),
    notes: document.getElementById('notes'),
    addItem: document.getElementById('addItem'),
    startScan: document.getElementById('startScan'),
    stopScan: document.getElementById('stopScan'),
    scanStatus: document.getElementById('scanStatus'),
    itemList: document.getElementById('itemList'),
    itemCount: document.getElementById('itemCount'),
    emptyState: document.getElementById('emptyState'),
    downloadPdf: document.getElementById('downloadPdf'),
    sharePdf: document.getElementById('sharePdf'),
    shareHint: document.getElementById('shareHint'),
    clearDemo: document.getElementById('clearDemo'),
    limitNotice: document.getElementById('limitNotice')
};

// ZXing barcode scanner implementation
let codeReader = null;
let videoElement = null;

function scannerSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && typeof ZXing !== 'undefined';
}

async function startScanning() {
    if (state.scanning) {
        return;
    }

    if (!scannerSupported()) {
        setScanStatus('Barcode scannen wordt niet ondersteund. Vul de code handmatig in.', true);
        return;
    }

    try {
        state.scanning = true;
        elements.startScan.disabled = true;
        elements.stopScan.disabled = false;
        
        setScanStatus('Camera wordt gestart...', false);

        // Show camera modal
        const cameraModal = document.getElementById('cameraModal');
        cameraModal.classList.remove('hidden');

        // Initialize ZXing with better configuration and more barcode formats
        codeReader = new ZXing.BrowserMultiFormatReader();
        
        // Configure for better barcode detection
        codeReader.hints = new Map([
            [ZXing.DecodeHintType.POSSIBLE_FORMATS, [
                ZXing.BarcodeFormat.EAN_13,
                ZXing.BarcodeFormat.EAN_8,
                ZXing.BarcodeFormat.UPC_A,
                ZXing.BarcodeFormat.UPC_E,
                ZXing.BarcodeFormat.CODE_128,
                ZXing.BarcodeFormat.CODE_39,
                ZXing.BarcodeFormat.CODE_93,
                ZXing.BarcodeFormat.CODABAR,
                ZXing.BarcodeFormat.ITF,
                ZXing.BarcodeFormat.RSS_14,
                ZXing.BarcodeFormat.RSS_EXPANDED
            ]],
            [ZXing.DecodeHintType.TRY_HARDER, true],
            [ZXing.DecodeHintType.CHARACTER_SET, 'UTF-8']
        ]);
        
        // Create video element with better constraints
        const cameraContainer = document.getElementById('camera-container');
        cameraContainer.innerHTML = '<video id="scanner-video" style="width: 100%; height: 100%; object-fit: cover;"></video>';
        videoElement = document.getElementById('scanner-video');

        // Start decoding with better configuration
        try {
            await codeReader.decodeFromVideoDevice(
                undefined, // Let ZXing choose the best camera
                videoElement,
                (result, err) => {
                    if (result) {
                        console.log('Barcode gevonden:', result.text);
                        const code = result.text;
                        
                        elements.code.value = code;
                        setScanStatus(`Barcode gevonden: ${code}`, false, true);
                        stopScanning();
                    }
                    if (err && !(err instanceof ZXing.NotFoundException)) {
                        console.error('Scan error:', err);
                    }
                },
                {
                    // Better video constraints for barcode scanning
                    video: {
                        width: { min: 640, ideal: 1280, max: 1920 },
                        height: { min: 480, ideal: 720, max: 1080 },
                        facingMode: { ideal: "environment" }, // Prefer back camera
                        frameRate: { ideal: 30, max: 60 }
                    }
                }
            );
        } catch (error) {
            console.error('ZXing error:', error);
            throw error;
        }

        setScanStatus('Camera actief. Richt op de barcode.', false);

    } catch (error) {
        console.error('Camera error:', error);
        setScanStatus('Camera kon niet worden gestart: ' + error.message, true);
        stopScanning();
    }
}

function stopScanning() {
    state.scanning = false;
    elements.startScan.disabled = !scannerSupported();
    elements.stopScan.disabled = true;
    
    // Hide camera modal
    const cameraModal = document.getElementById('cameraModal');
    cameraModal.classList.add('hidden');
    
    // Stop ZXing
    if (codeReader) {
        codeReader.reset();
        codeReader = null;
    }
    
    // Clear video element
    if (videoElement) {
        videoElement.srcObject = null;
        videoElement = null;
    }
    
    // Clear camera container
    const container = document.querySelector('#camera-container');
    container.innerHTML = '<div class="camera-overlay"><div class="camera-frame"></div><p class="camera-instructions">Richt de camera op de barcode</p></div>';
}

function closeCameraModal() {
    stopScanning();
}

function setScanStatus(message, isError = false, isSuccess = false) {
    elements.scanStatus.textContent = message;
    elements.scanStatus.className = 'help-text';
    
    if (isError) {
        elements.scanStatus.style.color = '#dc2626';
    } else if (isSuccess) {
        elements.scanStatus.style.color = '#059669';
    } else {
        elements.scanStatus.style.color = '#6b7280';
    }
}

function updateItemCount() {
    const count = state.items.length;
    elements.itemCount.textContent = `${count} / ${state.maxItems}`;
    
    if (count >= state.maxItems) {
        elements.limitNotice.textContent = `Demo limiet bereikt (${state.maxItems} items). Koop de volledige app voor onbeperkt gebruik.`;
        elements.limitNotice.style.display = 'block';
    } else {
        elements.limitNotice.style.display = 'none';
    }
}

function renderItems() {
    if (state.items.length === 0) {
        elements.itemList.innerHTML = '';
        elements.emptyState.style.display = 'block';
        elements.downloadPdf.disabled = true;
        elements.sharePdf.disabled = true;
        return;
    }

    elements.emptyState.style.display = 'none';
    elements.downloadPdf.disabled = false;
    elements.sharePdf.disabled = false;

    elements.itemList.innerHTML = state.items.map((item, index) => `
        <li class="item-card">
            <div class="item-info">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="item-meta">
                    <span class="item-type">${escapeHtml(item.type)}</span>
                    ${item.creator ? `<span class="item-creator">door ${escapeHtml(item.creator)}</span>` : ''}
                </p>
                ${item.code ? `<p class="item-code">Code: ${escapeHtml(item.code)}</p>` : ''}
                ${item.notes ? `<p class="item-notes">${escapeHtml(item.notes)}</p>` : ''}
            </div>
            <div class="item-actions">
                <button onclick="editItem(${index})" class="secondary-action" type="button">Bewerk</button>
                <button onclick="deleteItem(${index})" class="danger-action" type="button">Verwijder</button>
            </div>
        </li>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addItem(event) {
    event.preventDefault();
    
    if (state.items.length >= state.maxItems) {
        alert(`Demo limiet bereikt (${state.maxItems} items). Koop de volledige app voor onbeperkt gebruik.`);
        return;
    }

    const item = {
        title: elements.title.value.trim(),
        type: elements.type.value,
        creator: elements.creator.value.trim(),
        code: elements.code.value.trim(),
        notes: elements.notes.value.trim(),
        addedAt: new Date().toISOString()
    };

    if (!item.title) {
        alert('Titel is verplicht');
        return;
    }

    state.items.push(item);
    elements.itemForm.reset();
    renderItems();
    updateItemCount();
    setScanStatus('');
}

function editItem(index) {
    const item = state.items[index];
    elements.title.value = item.title;
    elements.type.value = item.type;
    elements.creator.value = item.creator;
    elements.code.value = item.code;
    elements.notes.value = item.notes;
    
    // Scroll to form
    elements.itemForm.scrollIntoView({ behavior: 'smooth' });
}

function deleteItem(index) {
    if (confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
        state.items.splice(index, 1);
        renderItems();
        updateItemCount();
    }
}

function clearDemo() {
    if (confirm('Weet je zeker dat je alle demo-items wilt verwijderen?')) {
        state.items = [];
        renderItems();
        updateItemCount();
        setScanStatus('');
    }
}

function downloadPdf() {
    if (state.items.length === 0) {
        alert('Geen items om te exporteren');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('SeniorEase Demo - Mijn Items', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, 20, 40);
    doc.text(`Aantal items: ${state.items.length}`, 20, 50);
    
    // Items
    let y = 70;
    state.items.forEach((item, index) => {
        if (y > 250) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${item.title}`, 20, y);
        y += 10;
        
        doc.setFontSize(10);
        doc.text(`Type: ${item.type}`, 20, y);
        y += 6;
        
        if (item.creator) {
            doc.text(`Auteur/Artiest: ${item.creator}`, 20, y);
            y += 6;
        }
        
        if (item.code) {
            doc.text(`Code: ${item.code}`, 20, y);
            y += 6;
        }
        
        if (item.notes) {
            doc.text(`Notitie: ${item.notes}`, 20, y);
            y += 6;
        }
        
        y += 10;
    });
    
    doc.save('seniorease-demo-items.pdf');
}

function sharePdf() {
    if (state.items.length === 0) {
        alert('Geen items om te delen');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('SeniorEase Demo - Mijn Items', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, 20, 40);
    doc.text(`Aantal items: ${state.items.length}`, 20, 50);
    
    // Items
    let y = 70;
    state.items.forEach((item, index) => {
        if (y > 250) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${item.title}`, 20, y);
        y += 10;
        
        doc.setFontSize(10);
        doc.text(`Type: ${item.type}`, 20, y);
        y += 6;
        
        if (item.creator) {
            doc.text(`Auteur/Artiest: ${item.creator}`, 20, y);
            y += 6;
        }
        
        if (item.code) {
            doc.text(`Code: ${item.code}`, 20, y);
            y += 6;
        }
        
        if (item.notes) {
            doc.text(`Notitie: ${item.notes}`, 20, y);
            y += 6;
        }
        
        y += 10;
    });
    
    const pdfBlob = doc.output('blob');
    
    if (navigator.share && navigator.canShare({ files: [pdfBlob] })) {
        navigator.share({
            title: 'SeniorEase Demo Items',
            text: 'Mijn SeniorEase demo items',
            files: [new File([pdfBlob], 'seniorease-demo-items.pdf', { type: 'application/pdf' })]
        }).catch(err => {
            console.error('Share failed:', err);
            elements.shareHint.textContent = 'Delen mislukt. Gebruik Download PDF.';
        });
    } else {
        elements.shareHint.textContent = 'Uw apparaat ondersteunt waarschijnlijk geen delen van PDF-bestanden. Gebruik Download PDF.';
    }
}

function checkScannerSupport() {
    if (!scannerSupported()) {
        elements.startScan.disabled = true;
        setScanStatus('Barcode scannen wordt niet ondersteund in deze browser.', true);
    } else {
        elements.startScan.disabled = false;
        setScanStatus('');
    }
}

function checkShareSupport() {
    if (!navigator.share) {
        elements.shareHint.textContent = 'Uw apparaat ondersteunt waarschijnlijk geen delen van PDF-bestanden. Gebruik Download PDF.';
    } else {
        elements.shareHint.textContent = '';
    }
}

// Event listeners
elements.itemForm.addEventListener('submit', addItem);
elements.startScan.addEventListener('click', startScanning);
elements.stopScan.addEventListener('click', stopScanning);
elements.downloadPdf.addEventListener('click', downloadPdf);
elements.sharePdf.addEventListener('click', sharePdf);
elements.clearDemo.addEventListener('click', clearDemo);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkScannerSupport();
    checkShareSupport();
    updateItemCount();
    renderItems();
    
    // Load saved items
    const saved = localStorage.getItem('seniorease-demo-items');
    if (saved) {
        try {
            state.items = JSON.parse(saved);
            renderItems();
            updateItemCount();
        } catch (e) {
            console.error('Failed to load saved items:', e);
        }
    }
    
    // Save items on change
    const originalPush = state.items.push;
    state.items.push = function(...args) {
        const result = originalPush.apply(this, args);
        localStorage.setItem('seniorease-demo-items', JSON.stringify(state.items));
        return result;
    };
    
    const originalSplice = state.items.splice;
    state.items.splice = function(...args) {
        const result = originalSplice.apply(this, args);
        localStorage.setItem('seniorease-demo-items', JSON.stringify(state.items));
        return result;
    };
});
