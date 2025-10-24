// SeniorEase Demo App - ZXing Barcode Scanner Implementation
// Based on the working Android app implementation

const state = {
    items: [],
    scanning: false,
    maxItems: 5
};

// Improved localStorage handling with delays and error catching
function saveISBNCache(isbn, bookData) {
    try {
        setTimeout(() => {
            const cacheKey = 'isbn_cache_' + isbn;
            const cacheData = {
                data: bookData,
                timestamp: Date.now(),
                expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 dagen cache
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            console.log('ISBN cache saved:', isbn);
        }, 100);
    } catch(e) {
        console.error('ISBN cache storage failed:', e);
    }
}

function getISBNCache(isbn) {
    try {
        const cacheKey = 'isbn_cache_' + isbn;
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;
        
        const cacheData = JSON.parse(cached);
        // Check if expired
        if (Date.now() > cacheData.expires) {
            localStorage.removeItem(cacheKey);
            return null;
        }
        console.log('ISBN cache hit:', isbn);
        return cacheData.data;
    } catch(e) {
        console.error('ISBN cache retrieval failed:', e);
        return null;
    }
}

function saveItemsToStorage() {
    try {
        setTimeout(() => {
            localStorage.setItem('seniorease-demo-items', JSON.stringify(state.items));
            console.log('Items saved to storage:', state.items.length);
        }, 100);
    } catch(e) {
        console.error('Storage failed:', e);
        // Gebruiker waarschuwen als opslag vol is
        if (e.name === 'QuotaExceededError') {
            alert('Uw browser opslag is vol. Verwijder oude items of wis browsercache.');
        }
    }
}

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
    limitNotice: document.getElementById('limitNotice'),
    lookupStatus: document.getElementById('lookupStatus'),
    googleLookup: document.getElementById('googleLookup')
};

// ZXing barcode scanner implementation
let codeReader = null;
let videoElement = null;

function scannerSupported() {
    // Check if camera API is available
    const hasCameraAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    // Check if ZXing is loaded (it loads as a global object)
    const hasZXing = typeof ZXing !== 'undefined';
    
    console.log('Scanner support check:', { hasCameraAPI, hasZXing, ZXingAvailable: typeof ZXing });
    
    return hasCameraAPI && hasZXing;
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

        // Initialize ZXing with focused configuration (speeds up detection)
        codeReader = new ZXing.BrowserMultiFormatReader();

        // Restrict to retail formats used in demo for better reliability
        codeReader.hints = new Map([
            [ZXing.DecodeHintType.POSSIBLE_FORMATS, [
                ZXing.BarcodeFormat.EAN_13,
                ZXing.BarcodeFormat.EAN_8,
                ZXing.BarcodeFormat.UPC_A,
                ZXing.BarcodeFormat.UPC_E,
                ZXing.BarcodeFormat.CODE_128
            ]],
            [ZXing.DecodeHintType.TRY_HARDER, true],
            [ZXing.DecodeHintType.CHARACTER_SET, 'UTF-8'],
            [ZXing.DecodeHintType.ASSUME_GS1, false],
            [ZXing.DecodeHintType.PURE_BARCODE, false]
        ]);
        
        // Create video element with better constraints
        const cameraContainer = document.getElementById('camera-container');
        cameraContainer.innerHTML = '<video id="scanner-video" playsinline muted autoplay style="width: 100%; height: 100%; object-fit: cover;"></video>';
        videoElement = document.getElementById('scanner-video');

        // Prefer the back camera if available
        let preferredDeviceId = undefined;
        try {
            const devices = await ZXing.BrowserCodeReader.listVideoInputDevices();
            const back = devices.find(d => /back|rear|environment/i.test(d.label));
            preferredDeviceId = back ? back.deviceId : (devices[0] ? devices[0].deviceId : undefined);
        } catch (_) {}

        // Start decoding with better configuration
        try {
            await codeReader.decodeFromVideoDevice(
                preferredDeviceId,
                videoElement,
                (result, err) => {
                    if (result) {
                        console.log('Barcode gevonden:', result.text);
                        const code = result.text;
                        
                        // Ensure the input field exists and is accessible
                        const codeInput = document.getElementById('code');
                        if (codeInput) {
                            codeInput.value = code;
                            codeInput.dispatchEvent(new Event('input', { bubbles: true }));
                            codeInput.dispatchEvent(new Event('change', { bubbles: true }));
                            // Force focus to trigger any validation
                            codeInput.focus();
                            codeInput.blur();
                        }
                        
                        setScanStatus(`Barcode gevonden: ${code}`, false, true);
                        stopScanning();
                    }
                    // Ignore NotFound (no barcode in frame); log others for debugging
                    if (err && !(err instanceof ZXing.NotFoundException)) {
                        console.error('Scan error:', err);
                    }
                },
                {
                    // Better video constraints for barcode scanning
                    video: {
                        width: { min: 640, ideal: 1280 },
                        height: { min: 480, ideal: 720 },
                        facingMode: { ideal: 'environment' },
                        frameRate: { ideal: 30, max: 60 },
                        focusMode: 'continuous'
                    }
                }
            );
        } catch (error) {
            console.error('ZXing error:', error);
            // Fallback to QuaggaJS on devices that fail with ZXing
            try {
                await startQuaggaFallback();
                setScanStatus('Fallback scanner actief. Richt op de barcode.', false);
                return;
            } catch (e) {
                throw error; // propagate original if fallback also fails
            }
        }

        setScanStatus('Camera actief. Richt op de barcode.', false);

    } catch (error) {
        console.error('Camera error:', error);
        setScanStatus('Camera kon niet worden gestart: ' + error.message, true);
        stopScanning();
    }
}

async function startQuaggaFallback() {
    return new Promise((resolve, reject) => {
        if (typeof Quagga === 'undefined') {
            return reject(new Error('QuaggaJS niet geladen'));
        }
        const config = {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.getElementById('scanner-video'),
                constraints: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                area: { top: '20%', right: '20%', left: '20%', bottom: '20%' }
            },
            decoder: { readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'] },
            locate: true,
            locator: { patchSize: 'medium', halfSample: true },
            numOfWorkers: navigator.hardwareConcurrency || 2
        };

        Quagga.init(config, (err) => {
            if (err) {
                console.error('Quagga init error:', err);
                return reject(err);
            }
            Quagga.start();
            resolve();
        });

        Quagga.onDetected((data) => {
            const code = data?.codeResult?.code;
            if (code) {
                // Ensure the input field exists and is accessible
                const codeInput = document.getElementById('code');
                if (codeInput) {
                    codeInput.value = code;
                    codeInput.dispatchEvent(new Event('input', { bubbles: true }));
                    codeInput.dispatchEvent(new Event('change', { bubbles: true }));
                    // Force focus to trigger any validation
                    codeInput.focus();
                    codeInput.blur();
                }
                setScanStatus(`Barcode gevonden: ${code}`, false, true);
                stopScanning();
                try { Quagga.stop(); } catch (_) {}
            }
        });
    });
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
    
    // Stop QuaggaJS if running
    try {
        if (typeof Quagga !== 'undefined') {
            Quagga.stop();
        }
    } catch (e) {
        console.warn('QuaggaJS stop error:', e);
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

function setLookupStatus(message, tone = 'info') {
    if (!elements.lookupStatus) {
        return;
    }
    const statusEl = elements.lookupStatus;
    if (!message) {
        statusEl.textContent = '';
        statusEl.style.display = 'none';
        statusEl.style.color = '';
        return;
    }
    statusEl.textContent = message;
    statusEl.style.display = 'block';
    const toneColors = {
        success: '#047857',
        error: '#b91c1c',
        warning: '#92400e',
        info: '#4b5563'
    };
    statusEl.style.color = toneColors[tone] || toneColors.info;
}

function handleCodeChange() {
    if (!elements.code) {
        return;
    }
    const code = elements.code.value.trim();
    if (!code) {
        setLookupStatus('');
        return;
    }
    lookupCodeDetails(code);
}

async function lookupCodeDetails(rawCode) {
    const code = (rawCode || '').trim();
    if (!code) {
        setLookupStatus('');
        return;
    }

    const cleanCode = code.replace(/[^0-9X]/gi, '');
    if (cleanCode.length < 8) {
        setLookupStatus('');
        return;
    }

    const type = detectCodeType(code);
    if (type !== 'ISBN-10' && type !== 'ISBN-13') {
        setLookupStatus(`Barcodetype: ${type}. Gebruik de knop "Zoek via Google" voor meer informatie.`, 'warning');
        return;
    }

    const isbn = cleanCode.length === 10 ? convertISBN10to13(cleanCode) : cleanCode;
    if (!isbn) {
        setLookupStatus('Ongeldige ISBN-code. Controleer de barcode.', 'error');
        return;
    }

    // Check cache first
    const cachedDetails = getISBNCache(isbn);
    if (cachedDetails) {
        applyLookupDetails(cachedDetails);
        const summary = cachedDetails.title ? cachedDetails.title : 'boek';
        setLookupStatus(`Automatisch ingevuld: ${summary} (uit cache)`, 'success');
        return;
    }

    setLookupStatus('Zoeken naar boekinformatie...', 'info');

    let details = null;
    let hadNetworkError = false;

    try {
        details = await fetchOpenLibraryData(isbn);
    } catch (error) {
        console.warn('OpenLibrary lookup failed', error);
        hadNetworkError = true;
    }

    if (!details) {
        try {
            details = await fetchGoogleBooksData(isbn);
        } catch (error) {
            console.warn('Google Books lookup failed', error);
            hadNetworkError = true;
        }
    }

    if (details) {
        // Save to cache
        saveISBNCache(isbn, details);
        applyLookupDetails(details);
        const summary = details.title ? details.title : 'boek';
        setLookupStatus(`Automatisch ingevuld: ${summary}`, 'success');
    } else if (hadNetworkError) {
        setLookupStatus('Zoeken mislukt. Controleer uw internetverbinding en probeer opnieuw.', 'error');
    } else {
        setLookupStatus('Geen boekinformatie gevonden. Vul de velden handmatig in.', 'warning');
    }
}

async function fetchOpenLibraryData(isbn) {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error(`OpenLibrary responded with ${response.status}`);
    }
    const data = await response.json();
    const entry = data[`ISBN:${isbn}`];
    if (!entry) {
        return null;
    }
    return {
        title: entry.title || '',
        author: Array.isArray(entry.authors) && entry.authors.length ? entry.authors[0].name : '',
        type: 'Boek'
    };
}

async function fetchGoogleBooksData(isbn) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error(`Google Books responded with ${response.status}`);
    }
    const data = await response.json();
    if (!data.items || !data.items.length) {
        return null;
    }
    const info = data.items[0].volumeInfo || {};
    return {
        title: info.title || '',
        author: Array.isArray(info.authors) ? info.authors.join(', ') : '',
        type: 'Boek'
    };
}

function validateISBN10(isbn) {
    if (isbn.length !== 10) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(isbn[i], 10) * (10 - i);
    }
    const checkDigit = isbn[9].toUpperCase() === 'X' ? 10 : parseInt(isbn[9], 10);
    return (sum + checkDigit) % 11 === 0;
}

function validateISBN13(isbn) {
    if (isbn.length !== 13) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(isbn[i], 10) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(isbn[12], 10);
}

function convertISBN10to13(isbn10) {
    const prefix = '978';
    const core = prefix + isbn10.substring(0, 9);
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(core[i], 10) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return core + checkDigit;
}

function detectCodeType(code) {
    const cleanCode = code.replace(/[^0-9X]/gi, '');
    if (cleanCode.length === 10) {
        return validateISBN10(cleanCode) ? 'ISBN-10' : 'Onbekend';
    }
    if (cleanCode.length === 13) {
        if (cleanCode.startsWith('978') || cleanCode.startsWith('979')) {
            return validateISBN13(cleanCode) ? 'ISBN-13' : 'Onbekend';
        }
        if (cleanCode.startsWith('0') || cleanCode.startsWith('1')) {
            return 'UPC-A';
        }
        return 'EAN-13';
    }
    if (cleanCode.length === 12) {
        return 'UPC-A';
    }
    if (cleanCode.length === 8) {
        return 'EAN-8';
    }
    return 'Onbekend';
}

function applyLookupDetails(details) {
    if (details.title && elements.title && !elements.title.value) {
        elements.title.value = details.title;
    }
    if (details.author && elements.creator && !elements.creator.value) {
        elements.creator.value = details.author;
    }
    if (details.type && elements.type) {
        elements.type.value = details.type;
    }
}

function searchCodeOnGoogle() {
    const code = elements.code ? elements.code.value.trim() : '';
    if (!code) {
        alert('Voer eerst een barcode of ISBN in.');
        return;
    }
    const type = detectCodeType(code);
    const query = type.startsWith('ISBN') ? `ISBN ${code}` : code;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
    saveItemsToStorage(); // Gebruik nieuwe safe storage functie
    elements.itemForm.reset();
    setLookupStatus('');
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
        saveItemsToStorage(); // Gebruik nieuwe safe storage functie
        renderItems();
        updateItemCount();
    }
}

function clearDemo() {
    if (confirm('Weet je zeker dat je alle demo-items wilt verwijderen?')) {
        state.items = [];
        saveItemsToStorage(); // Gebruik nieuwe safe storage functie
        renderItems();
        updateItemCount();
        setScanStatus('');
        setLookupStatus('');
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
    
    if (navigator.share) {
        try {
            const pdfFile = new File([pdfBlob], 'seniorease-demo-items.pdf', { type: 'application/pdf' });
            if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
                navigator.share({
                    title: 'SeniorEase Demo Items',
                    text: 'Mijn SeniorEase demo items',
                    files: [pdfFile]
                }).catch(err => {
                    console.error('Share failed:', err);
                    elements.shareHint.textContent = 'Delen mislukt. Gebruik Download PDF.';
                });
            } else {
                // Fallback: share without files
                navigator.share({
                    title: 'SeniorEase Demo Items',
                    text: 'Mijn SeniorEase demo items - download de PDF via de app'
                }).catch(err => {
                    console.error('Share failed:', err);
                    elements.shareHint.textContent = 'Delen mislukt. Gebruik Download PDF.';
                });
            }
        } catch (err) {
            console.error('Share setup failed:', err);
            elements.shareHint.textContent = 'Delen niet ondersteund. Gebruik Download PDF.';
        }
    } else {
        elements.shareHint.textContent = 'Uw apparaat ondersteunt waarschijnlijk geen delen van PDF-bestanden. Gebruik Download PDF.';
    }
}

function checkScannerSupport() {
    // Re-check after a short delay to ensure libraries are loaded
    setTimeout(() => {
        if (!scannerSupported()) {
            elements.startScan.disabled = true;
            
            // Provide helpful error message
            const hasCameraAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            const hasZXing = typeof ZXing !== 'undefined';
            
            if (!hasCameraAPI) {
                setScanStatus('Camera niet beschikbaar. Gebruik een moderne browser (Chrome/Safari).', true);
            } else if (!hasZXing) {
                setScanStatus('Scanner bibliotheek aan het laden... Probeer opnieuw over enkele seconden.', false);
                // Retry check after additional delay
                setTimeout(checkScannerSupport, 2000);
            } else {
                setScanStatus('Barcode scannen wordt niet ondersteund in deze browser.', true);
            }
        } else {
            elements.startScan.disabled = false;
            setScanStatus('');
            console.log('✅ Scanner ready: ZXing loaded successfully');
        }
    }, 500); // Give libraries time to load
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
if (elements.code) {
    elements.code.addEventListener('change', handleCodeChange);
}
if (elements.googleLookup) {
    elements.googleLookup.addEventListener('click', searchCodeOnGoogle);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App initializing...');
    console.log('ZXing available:', typeof ZXing !== 'undefined');
    console.log('Quagga available:', typeof Quagga !== 'undefined');
    console.log('jsPDF available:', typeof window.jspdf !== 'undefined');
    setLookupStatus('');
    
    checkScannerSupport();
    checkShareSupport();
    updateItemCount();
    renderItems();
    
    // Load saved items with improved error handling
    try {
        const saved = localStorage.getItem('seniorease-demo-items');
        if (saved) {
            state.items = JSON.parse(saved);
            console.log('✅ Loaded items from storage:', state.items.length);
            renderItems();
            updateItemCount();
        }
    } catch (e) {
        console.error('❌ Failed to load saved items:', e);
        // Als corrupt data, probeer te clearen
        try {
            localStorage.removeItem('seniorease-demo-items');
            console.log('🧹 Cleared corrupt storage data');
        } catch (clearError) {
            console.error('❌ Could not clear corrupt data:', clearError);
        }
    }
    
    if (elements.code && elements.code.value) {
        handleCodeChange();
    }
});


