// SeniorEase Demo App - ZXing Barcode Scanner Implementation
// Based on the working Android app implementation

const state = {
    items: [],
    scanning: false,
    maxItems: 5
};

// Improved localStorage handling with delays and error catching
function saveCodeCache(code, data) {
    try {
        setTimeout(() => {
            const cacheKey = 'code_cache_' + code;
            const cacheData = {
                data: data,
                timestamp: Date.now(),
                expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 dagen cache
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            console.log('Code cache saved:', code);
        }, 100);
    } catch(e) {
        console.error('Code cache storage failed:', e);
    }
}

function getCodeCache(code) {
    try {
        const cacheKey = 'code_cache_' + code;
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;
        
        const cacheData = JSON.parse(cached);
        // Check if expired
        if (Date.now() > cacheData.expires) {
            localStorage.removeItem(cacheKey);
            return null;
        }
        console.log('Code cache hit:', code);
        return cacheData.data;
    } catch(e) {
        console.error('Code cache retrieval failed:', e);
        return null;
    }
}

// Backward compatibility aliases
function saveISBNCache(isbn, bookData) {
    saveCodeCache(isbn, bookData);
}

function getISBNCache(isbn) {
    return getCodeCache(isbn);
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

// Detect Android device
function isAndroidDevice() {
    return /Android/i.test(navigator.userAgent);
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detect if device is a phone (not tablet)
function isPhoneDevice() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    // Phones typically have smaller screens and no "tablet" in user agent
    const isTablet = /Tablet|iPad/i.test(ua);
    return isMobile && !isTablet;
}

// Check camera permissions
async function checkCameraPermissions() {
    try {
        if (navigator.permissions && navigator.permissions.query) {
            const permission = await navigator.permissions.query({ name: 'camera' });
            console.log('📷 Camera permission status:', permission.state);
            return permission.state === 'granted' || permission.state === 'prompt';
        }
        return true; // Permissions API not supported, assume OK
    } catch (e) {
        console.warn('⚠️ Permission check failed:', e);
        return true; // Assume OK if check fails
    }
}

function scannerSupported() {
    // Check if camera API is available
    const hasCameraAPI = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    // Check if ZXing is loaded (it loads as a global object)
    const hasZXing = typeof ZXing !== 'undefined';
    
    console.log('Scanner support check:', { 
        hasCameraAPI, 
        hasZXing, 
        ZXingAvailable: typeof ZXing,
        isAndroid: isAndroidDevice(),
        isMobile: isMobileDevice()
    });
    
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

    // Check permissions first (especially important for phones)
    const hasPermission = await checkCameraPermissions();
    if (!hasPermission) {
        setScanStatus('Camera toegang geweigerd. Controleer browser instellingen.', true);
        return;
    }

    try {
        state.scanning = true;
        elements.startScan.disabled = true;
        elements.stopScan.disabled = false;
        
        const deviceType = isPhoneDevice() ? 'telefoon' : (isAndroidDevice() ? 'tablet' : 'desktop');
        console.log(`📱 Start scanning op ${deviceType}`);
        
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
        
        // Create video element with Android-optimized attributes
        const cameraContainer = document.getElementById('camera-container');
        // Android requires playsinline, muted, autoplay for smooth camera access
        cameraContainer.innerHTML = '<video id="scanner-video" playsinline webkit-playsinline muted autoplay style="width: 100%; height: 100%; object-fit: cover;"></video>';
        videoElement = document.getElementById('scanner-video');
        
        // Android-specific: Ensure video element is ready
        if (isAndroidDevice()) {
            videoElement.setAttribute('playsinline', 'true');
            videoElement.setAttribute('webkit-playsinline', 'true');
        }

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
                        }
                        
                        setScanStatus(`Barcode gevonden: ${code}`, false, true);
                        
                        // Stop scanner eerst
                        stopScanning();
                        
                        // Device-specific delay: phones need more time than tablets
                        let delay = 300; // Default desktop
                        if (isPhoneDevice()) {
                            delay = 1200; // Phones need most time
                        } else if (isAndroidDevice()) {
                            delay = 800; // Android tablets
                        }
                        console.log(`⏱️ Waiting ${delay}ms before lookup (Device: ${isPhoneDevice() ? 'telefoon' : (isAndroidDevice() ? 'tablet' : 'desktop')})`);
                        
                        // Start lookup NADAT camera gestopt is (cruciaal voor Android!)
                        setTimeout(() => {
                            console.log('🔍 Starting lookup for:', code);
                            lookupCodeDetails(code);
                        }, delay);
                    }
                    // Ignore NotFound (no barcode in frame); log others for debugging
                    if (err && !(err instanceof ZXing.NotFoundException)) {
                        console.error('Scan error:', err);
                    }
                },
                {
                    // Device-specific video constraints for barcode scanning
                    video: (() => {
                        if (isPhoneDevice()) {
                            // Phones: Very conservative constraints for older/slower devices
                            console.log('📱 Using phone-optimized camera constraints');
                            return {
                                width: { min: 320, ideal: 480, max: 640 },
                                height: { min: 240, ideal: 360, max: 480 },
                                facingMode: { ideal: 'environment' },
                                frameRate: { ideal: 10, max: 20 },
                                aspectRatio: { ideal: 1.7777777778 } // 16:9
                            };
                        } else if (isAndroidDevice()) {
                            // Android tablets: Moderate constraints
                            console.log('📱 Using Android tablet camera constraints');
                            return {
                                width: { min: 320, ideal: 640, max: 1280 },
                                height: { min: 240, ideal: 480, max: 720 },
                                facingMode: { ideal: 'environment' },
                                frameRate: { ideal: 15, max: 30 },
                                aspectRatio: { ideal: 1.7777777778 } // 16:9
                            };
                        } else {
                            // Desktop/iPhone: Best quality
                            console.log('💻 Using desktop/iPhone camera constraints');
                            return {
                                width: { min: 640, ideal: 1280 },
                                height: { min: 480, ideal: 720 },
                                facingMode: { ideal: 'environment' },
                                frameRate: { ideal: 30, max: 60 },
                                focusMode: 'continuous'
                            };
                        }
                    })()
                }
            );
        } catch (error) {
            console.error('ZXing error:', error);
            const errorMsg = error.message || error.toString();
            
            // Phone-specific error handling
            if (isPhoneDevice()) {
                if (errorMsg.includes('Permission') || errorMsg.includes('NotAllowedError')) {
                    setScanStatus('Camera toegang geweigerd. Ga naar browser instellingen → Site-instellingen → Camera → Toestaan', true);
                    stopScanning();
                    return;
                } else if (errorMsg.includes('NotFoundError') || errorMsg.includes('DevicesNotFoundError')) {
                    setScanStatus('Geen camera gevonden. Controleer of uw telefoon een achtercamera heeft.', true);
                    stopScanning();
                    return;
                } else if (errorMsg.includes('NotReadableError') || errorMsg.includes('TrackStartError')) {
                    setScanStatus('Camera wordt al gebruikt door een andere app. Sluit andere apps en probeer opnieuw.', true);
                    stopScanning();
                    return;
                }
            }
            
            // Fallback to QuaggaJS on devices that fail with ZXing
            try {
                console.log('🔄 Trying QuaggaJS fallback...');
                await startQuaggaFallback();
                setScanStatus('Fallback scanner actief. Richt op de barcode.', false);
                return;
            } catch (e) {
                console.error('QuaggaJS fallback also failed:', e);
                throw error; // propagate original if fallback also fails
            }
        }

        setScanStatus('Camera actief. Richt op de barcode.', false);

    } catch (error) {
        console.error('Camera error:', error);
        const errorMsg = error.message || error.toString();
        
        // More helpful error messages for phones
        if (isPhoneDevice()) {
            if (errorMsg.includes('Permission') || errorMsg.includes('NotAllowedError')) {
                setScanStatus('❌ Camera toegang geweigerd. Controleer browser instellingen.', true);
            } else if (errorMsg.includes('NotFoundError')) {
                setScanStatus('❌ Geen camera gevonden op dit apparaat.', true);
            } else if (errorMsg.includes('NotReadableError')) {
                setScanStatus('❌ Camera wordt gebruikt door andere app. Sluit apps en probeer opnieuw.', true);
            } else {
                setScanStatus('❌ Camera fout: ' + errorMsg.substring(0, 50), true);
            }
        } else {
            setScanStatus('Camera kon niet worden gestart: ' + errorMsg.substring(0, 50), true);
        }
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
                }
                setScanStatus(`Barcode gevonden: ${code}`, false, true);
                
                // Stop scanner eerst
                stopScanning();
                try { Quagga.stop(); } catch (_) {}
                
                // Device-specific delay: phones need more time than tablets
                let delay = 300; // Default desktop
                if (isPhoneDevice()) {
                    delay = 1200; // Phones need most time
                } else if (isAndroidDevice()) {
                    delay = 800; // Android tablets
                }
                console.log(`⏱️ Waiting ${delay}ms before lookup (Device: ${isPhoneDevice() ? 'telefoon' : (isAndroidDevice() ? 'tablet' : 'desktop')})`);
                
                // Start lookup NADAT camera gestopt is (cruciaal voor Android!)
                setTimeout(() => {
                    console.log('🔍 Starting lookup for:', code);
                    lookupCodeDetails(code);
                }, delay);
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
    if (cameraModal) {
        cameraModal.classList.add('hidden');
    }
    
    // Android: Stop all camera tracks first
    if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => {
            track.stop();
            console.log('📱 Camera track gestopt:', track.kind);
        });
    }
    
    // Stop ZXing
    if (codeReader) {
        try {
            codeReader.reset();
        } catch (e) {
            console.warn('ZXing reset error:', e);
        }
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
    
    // Clear video element (Android needs explicit cleanup)
    if (videoElement) {
        videoElement.srcObject = null;
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load(); // Reset video element
        videoElement = null;
    }
    
    // Clear camera container
    const container = document.querySelector('#camera-container');
    if (container) {
        container.innerHTML = '<div class="camera-overlay"><div class="camera-frame"></div><p class="camera-instructions">Richt de camera op de barcode</p></div>';
    }
    
    console.log('📱 Camera volledig gestopt');
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
    console.log('🔍 lookupCodeDetails called with:', rawCode);
    
    const code = (rawCode || '').trim();
    if (!code) {
        console.log('⚠️ Empty code, skipping lookup');
        setLookupStatus('');
        return;
    }

    const cleanCode = code.replace(/[^0-9X]/gi, '');
    console.log('Cleaned code:', cleanCode);
    
    if (cleanCode.length < 8) {
        console.log('⚠️ Code too short:', cleanCode.length);
        setLookupStatus('');
        return;
    }

    const codeType = detectCodeType(code);
    console.log('Detected code type:', codeType);
    
    // Check cache first
    console.log('Checking cache for:', cleanCode);
    const cachedDetails = getCodeCache(cleanCode);
    if (cachedDetails) {
        console.log('✅ Cache hit!');
        applyLookupDetails(cachedDetails);
        const summary = cachedDetails.title ? cachedDetails.title : (cachedDetails.type === 'Muziek' ? 'muziek' : 'boek');
        setLookupStatus(`Automatisch ingevuld: ${summary} (uit cache)`, 'success');
        return;
    }

    let details = null;
    let hadNetworkError = false;

    // Handle ISBN codes (books)
    if (codeType === 'ISBN-10' || codeType === 'ISBN-13') {
        const isbn = cleanCode.length === 10 ? convertISBN10to13(cleanCode) : cleanCode;
        
        if (!isbn) {
            console.error('❌ Invalid ISBN conversion');
            setLookupStatus('Ongeldige ISBN-code. Controleer de barcode.', 'error');
            return;
        }

        console.log('Cache miss, fetching book data from API...');
        setLookupStatus('Zoeken naar boekinformatie...', 'info');

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
            details.type = 'Boek';
        }
    }
    // Handle EAN/UPC codes (likely music)
    else if (codeType === 'EAN-13' || codeType === 'EAN-8' || codeType === 'UPC-A') {
        console.log('Cache miss, fetching music data from API...');
        setLookupStatus('Zoeken naar muziekinformatie...', 'info');

        try {
            details = await fetchDiscogsData(cleanCode);
        } catch (error) {
            console.warn('Discogs lookup failed', error);
            // Only mark as network error if it's a timeout
            if (error.message && error.message.includes('timeout')) {
                hadNetworkError = true;
            }
        }

        if (!details) {
            try {
                details = await fetchMusicBrainzData(cleanCode);
            } catch (error) {
                console.warn('MusicBrainz lookup failed', error);
                // Only mark as network error if it's a timeout
                if (error.message && error.message.includes('timeout')) {
                    hadNetworkError = true;
                }
            }
        }

        if (details) {
            details.type = 'Muziek';
        } else {
            // Set type to Muziek even if lookup failed, so user can fill manually
            // This helps UX - user knows it's likely music
            if (elements.type) {
                elements.type.value = 'Muziek';
            }
        }
    } else {
        setLookupStatus(`Barcodetype: ${codeType}. Gebruik de knop "Zoek via Google" voor meer informatie.`, 'warning');
        return;
    }

    if (details) {
        console.log('✅ Lookup successful:', details);
        // Save to cache
        saveCodeCache(cleanCode, details);
        applyLookupDetails(details);
        const summary = details.title ? details.title : (details.type === 'Muziek' ? 'muziek' : 'boek');
        setLookupStatus(`Automatisch ingevuld: ${summary}`, 'success');
    } else if (hadNetworkError) {
        console.error('❌ Network error during lookup');
        setLookupStatus('Zoeken mislukt. Controleer uw internetverbinding en probeer opnieuw.', 'error');
    } else {
        console.warn('⚠️ No information found');
        const itemType = codeType === 'EAN-13' || codeType === 'EAN-8' || codeType === 'UPC-A' ? 'muziek' : 'boek';
        setLookupStatus(`Geen ${itemType}informatie gevonden. Vul de velden handmatig in.`, 'warning');
    }
}

async function fetchOpenLibraryData(isbn) {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    console.log('📚 Fetching from OpenLibrary:', isbn);
    
    try {
        // Device-specific timeout: phones need more time for slower connections
        const timeoutDuration = isPhoneDevice() ? 15000 : (isAndroidDevice() ? 10000 : 8000);
        const controller = (isAndroidDevice() || isPhoneDevice()) ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => {
            if (controller) controller.abort();
        }, timeoutDuration) : null;
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            cache: 'default'
        };
        
        if (controller) {
            fetchOptions.signal = controller.signal;
        }
        
        const response = await fetch(url, fetchOptions);
        
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.warn('OpenLibrary response not OK:', response.status);
            if (response.status === 404) {
                return null;
            }
            throw new Error(`OpenLibrary responded with ${response.status}`);
        }
        
        const data = await response.json();
        console.log('OpenLibrary data:', data);
        
        const entry = data[`ISBN:${isbn}`];
        if (!entry) {
            console.log('No OpenLibrary entry found for ISBN:', isbn);
            return null;
        }
        
        console.log('✅ OpenLibrary success:', entry.title);
        return {
            title: entry.title || '',
            author: Array.isArray(entry.authors) && entry.authors.length ? entry.authors[0].name : '',
            type: 'Boek'
        };
    } catch (error) {
        // Android: Better error messages for network issues
        if (error.name === 'AbortError') {
            console.error('❌ OpenLibrary timeout (Android)');
            throw new Error('Network timeout - controleer uw internetverbinding');
        }
        console.error('❌ OpenLibrary fetch error:', error);
        throw error;
    }
}

async function fetchGoogleBooksData(isbn) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    console.log('📖 Fetching from Google Books:', isbn);
    
    try {
        // Device-specific timeout: phones need more time for slower connections
        const timeoutDuration = isPhoneDevice() ? 15000 : (isAndroidDevice() ? 10000 : 8000);
        const controller = (isAndroidDevice() || isPhoneDevice()) ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => {
            if (controller) controller.abort();
        }, timeoutDuration) : null;
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            cache: 'default'
        };
        
        if (controller) {
            fetchOptions.signal = controller.signal;
        }
        
        const response = await fetch(url, fetchOptions);
        
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.warn('Google Books response not OK:', response.status);
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Google Books responded with ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Google Books data:', data);
        
        if (!data.items || !data.items.length) {
            console.log('No Google Books entry found for ISBN:', isbn);
            return null;
        }
        
        const info = data.items[0].volumeInfo || {};
        console.log('✅ Google Books success:', info.title);
        
        return {
            title: info.title || '',
            author: Array.isArray(info.authors) ? info.authors.join(', ') : '',
            type: 'Boek'
        };
    } catch (error) {
        // Android: Better error messages for network issues
        if (error.name === 'AbortError') {
            console.error('❌ Google Books timeout (Android)');
            throw new Error('Network timeout - controleer uw internetverbinding');
        }
        console.error('❌ Google Books fetch error:', error);
        throw error;
    }
}

async function fetchDiscogsData(ean) {
    // Discogs API via CORS proxy for demo purposes
    // Note: In production, use a proper backend proxy or Discogs API with OAuth
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.discogs.com/database/search?barcode=${ean}&type=release`)}`;
    console.log('🎵 Fetching from Discogs:', ean);
    
    try {
        const timeoutDuration = isPhoneDevice() ? 15000 : (isAndroidDevice() ? 10000 : 8000);
        const controller = (isAndroidDevice() || isPhoneDevice()) ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => {
            if (controller) controller.abort();
        }, timeoutDuration) : null;
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            cache: 'default'
        };
        
        if (controller) {
            fetchOptions.signal = controller.signal;
        }
        
        const response = await fetch(proxyUrl, fetchOptions);
        
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.warn('Discogs proxy response not OK:', response.status);
            return null;
        }
        
        const proxyData = await response.json();
        if (!proxyData.contents) {
            return null;
        }
        
        const data = JSON.parse(proxyData.contents);
        console.log('Discogs data:', data);
        
        if (!data.results || !data.results.length) {
            console.log('No Discogs entry found for EAN:', ean);
            return null;
        }
        
        const release = data.results[0];
        console.log('✅ Discogs success:', release.title);
        
        // Extract artist and title from Discogs format "Artist - Title"
        let artist = '';
        let title = release.title || '';
        
        if (title.includes(' - ')) {
            const parts = title.split(' - ');
            artist = parts[0].trim();
            title = parts.slice(1).join(' - ').trim();
        } else {
            // Try to get artist from extra artist info
            if (release.extraartists && release.extraartists.length > 0) {
                artist = release.extraartists[0].name;
            } else if (release.artist) {
                artist = release.artist;
            }
        }
        
        return {
            title: title || '',
            author: artist || '',
            type: 'Muziek'
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('❌ Discogs timeout');
            throw new Error('Network timeout - controleer uw internetverbinding');
        }
        // CORS or other errors - return null to try next API
        console.warn('❌ Discogs fetch error (may be CORS):', error.message);
        return null;
    }
}

async function fetchMusicBrainzData(ean) {
    // MusicBrainz uses barcode lookup via their web service
    // Note: MusicBrainz requires proper User-Agent header and may have CORS restrictions
    // Using a CORS proxy for demo purposes
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://musicbrainz.org/ws/2/release?query=barcode:${ean}&fmt=json&limit=1`)}`;
    console.log('🎵 Fetching from MusicBrainz:', ean);
    
    try {
        const timeoutDuration = isPhoneDevice() ? 15000 : (isAndroidDevice() ? 10000 : 8000);
        const controller = (isAndroidDevice() || isPhoneDevice()) ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => {
            if (controller) controller.abort();
        }, timeoutDuration) : null;
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            cache: 'default'
        };
        
        if (controller) {
            fetchOptions.signal = controller.signal;
        }
        
        const response = await fetch(proxyUrl, fetchOptions);
        
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!response.ok) {
            console.warn('MusicBrainz proxy response not OK:', response.status);
            return null;
        }
        
        const proxyData = await response.json();
        if (!proxyData.contents) {
            return null;
        }
        
        const data = JSON.parse(proxyData.contents);
        console.log('MusicBrainz data:', data);
        
        if (!data.releases || !data.releases.length) {
            console.log('No MusicBrainz entry found for EAN:', ean);
            return null;
        }
        
        const release = data.releases[0];
        console.log('✅ MusicBrainz success:', release.title);
        
        // Get artist from artist-credit array
        let artist = '';
        if (release['artist-credit'] && release['artist-credit'].length > 0) {
            artist = release['artist-credit'][0].name || '';
        }
        
        return {
            title: release.title || '',
            author: artist || '',
            type: 'Muziek'
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('❌ MusicBrainz timeout');
            throw new Error('Network timeout - controleer uw internetverbinding');
        }
        // CORS or other errors - return null
        console.warn('❌ MusicBrainz fetch error (may be CORS):', error.message);
        return null;
    }
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
        // EAN-13 codes that are not ISBN are likely music (CD/LP)
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
    // Debounce timer voor input event
    let lookupTimeout = null;
    
    elements.code.addEventListener('input', () => {
        // Clear vorige timeout
        if (lookupTimeout) {
            clearTimeout(lookupTimeout);
        }
        // Wacht 500ms na laatste input voordat lookup start
        lookupTimeout = setTimeout(() => {
            handleCodeChange();
        }, 500);
    });
    
    elements.code.addEventListener('change', handleCodeChange);
}
if (elements.googleLookup) {
    elements.googleLookup.addEventListener('click', searchCodeOnGoogle);
}

// Android-specific: Stop camera when app goes to background
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.scanning) {
        console.log('📱 App naar achtergrond - camera stoppen');
        stopScanning();
    }
});

// Android-specific: Stop camera before page unload
window.addEventListener('beforeunload', () => {
    if (state.scanning) {
        console.log('📱 Page unloading - camera stoppen');
        stopScanning();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App initializing...');
    console.log('ZXing available:', typeof ZXing !== 'undefined');
    console.log('Quagga available:', typeof Quagga !== 'undefined');
    console.log('jsPDF available:', typeof window.jspdf !== 'undefined');
    console.log('Device info:', { 
        isAndroid: isAndroidDevice(), 
        isMobile: isMobileDevice(),
        isPhone: isPhoneDevice(),
        deviceType: isPhoneDevice() ? 'telefoon' : (isAndroidDevice() ? 'tablet' : 'desktop'),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
    });
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


