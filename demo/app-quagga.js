(function () {
    const STORAGE_KEY = 'seniorease-demo-items';
    const ITEM_LIMIT = 5;

    const elements = {
        limitNotice: document.getElementById('limitNotice'),
        itemForm: document.getElementById('itemForm'),
        title: document.getElementById('title'),
        type: document.getElementById('type'),
        creator: document.getElementById('creator'),
        code: document.getElementById('code'),
        notes: document.getElementById('notes'),
        addItem: document.getElementById('addItem'),
        itemList: document.getElementById('itemList'),
        emptyState: document.getElementById('emptyState'),
        itemCount: document.getElementById('itemCount'),
        downloadPdf: document.getElementById('downloadPdf'),
        sharePdf: document.getElementById('sharePdf'),
        shareHint: document.getElementById('shareHint'),
        clearDemo: document.getElementById('clearDemo'),
        startScan: document.getElementById('startScan'),
        stopScan: document.getElementById('stopScan'),
        scanStatus: document.getElementById('scanStatus'),
        videoWrapper: document.getElementById('videoWrapper')
    };

    const state = {
        items: [],
        scanning: false
    };

    function init() {
        loadItems();
        render();
        bindEvents();
        updateShareHint();
        checkScannerSupport();
    }

    function loadItems() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                state.items = [];
                return;
            }
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                state.items = parsed.slice(0, ITEM_LIMIT);
            } else {
                state.items = [];
            }
        } catch (error) {
            console.warn('Kon opgeslagen demo-items niet laden:', error);
            state.items = [];
        }
    }

    function saveItems() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch (error) {
            console.warn('Kon demo-items niet opslaan:', error);
        }
    }

    function bindEvents() {
        elements.itemForm.addEventListener('submit', handleAddItem);
        elements.itemList.addEventListener('click', handleListClick);
        elements.downloadPdf.addEventListener('click', handleDownloadPdf);
        elements.sharePdf.addEventListener('click', handleSharePdf);
        elements.clearDemo.addEventListener('click', resetDemo);
        elements.startScan.addEventListener('click', startScanning);
        elements.stopScan.addEventListener('click', stopScanning);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopScanning();
            }
        });
        window.addEventListener('beforeunload', stopScanning);
    }

    function render() {
        renderItems();
        updateLimitNotice();
        updateActionButtons();
        updateShareHint();
    }

    function renderItems() {
        elements.itemList.innerHTML = '';

        if (state.items.length === 0) {
            elements.emptyState.hidden = false;
            elements.itemCount.textContent = `0 / ${ITEM_LIMIT}`;
            return;
        }

        elements.emptyState.hidden = true;
        elements.itemCount.textContent = `${state.items.length} / ${ITEM_LIMIT}`;

        state.items.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'item';
            li.dataset.id = item.id;

            const header = document.createElement('header');
            const title = document.createElement('h3');
            title.textContent = item.title || 'Onbenoemd item';

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-button';
            removeBtn.dataset.action = 'remove';
            removeBtn.textContent = 'Verwijder';

            header.append(title, removeBtn);
            li.appendChild(header);

            const meta = document.createElement('dl');

            appendMeta(meta, 'Type', item.type || 'Onbekend');
            appendMeta(meta, 'Auteur / artiest', item.creator || 'Niet ingesteld');
            appendMeta(meta, 'Barcode / code', item.code || 'Niet ingevoerd');

            if (item.notes) {
                appendMeta(meta, 'Notitie', item.notes);
            }

            li.appendChild(meta);
            elements.itemList.appendChild(li);
        });
    }

    function appendMeta(container, label, value) {
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        container.append(dt, dd);
    }

    function updateLimitNotice() {
        const remaining = ITEM_LIMIT - state.items.length;
        if (remaining > 1) {
            elements.limitNotice.textContent = `U kunt nog ${remaining} items toevoegen in deze demo.`;
        } else if (remaining === 1) {
            elements.limitNotice.textContent = 'U kunt nog één item toevoegen in deze demo.';
        } else {
            elements.limitNotice.textContent = 'Limiet bereikt. Verwijder een item om ruimte vrij te maken.';
        }
    }

    function updateActionButtons() {
        const limitReached = state.items.length >= ITEM_LIMIT;
        elements.addItem.disabled = limitReached;
        elements.downloadPdf.disabled = state.items.length === 0;
        elements.sharePdf.disabled = state.items.length === 0 || !canShareFiles();

        if (limitReached) {
            elements.addItem.textContent = 'Limiet bereikt';
        } else {
            elements.addItem.textContent = 'Bewaar item';
        }
    }

    function createId() {
        if (window.crypto?.randomUUID) {
            return crypto.randomUUID();
        }
        return `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function handleAddItem(event) {
        event.preventDefault();

        if (state.items.length >= ITEM_LIMIT) {
            updateLimitNotice();
            return;
        }

        const item = {
            id: createId(),
            title: elements.title.value.trim(),
            type: elements.type.value || 'Onbekend',
            creator: elements.creator.value.trim(),
            code: elements.code.value.trim(),
            notes: elements.notes.value.trim()
        };

        if (!item.title) {
            elements.title.focus();
            return;
        }

        state.items.push(item);
        saveItems();
        render();
        elements.itemForm.reset();
        elements.title.focus();
    }

    function handleListClick(event) {
        const target = event.target;
        if (target.dataset.action !== 'remove') {
            return;
        }

        const id = target.closest('li')?.dataset.id;
        if (!id) {
            return;
        }

        state.items = state.items.filter((item) => item.id !== id);
        saveItems();
        render();
    }

    function createPdfDocument() {
        const { jsPDF } = window.jspdf || {};
        if (!jsPDF) {
            throw new Error('De PDF-bibliotheek kon niet worden geladen.');
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('SeniorEase demo-overzicht', 14, 20);
        doc.setFontSize(12);
        doc.text(`Datum: ${new Date().toLocaleDateString('nl-NL')}`, 14, 28);

        let y = 40;
        state.items.forEach((item, index) => {
            doc.setFont('Helvetica', 'bold');
            doc.text(`${index + 1}. ${item.title || 'Onbenoemd item'}`, 14, y);
            y += 6;
            doc.setFont('Helvetica', 'normal');

            const rows = [
                `Type: ${item.type || 'Onbekend'}`,
                `Auteur / artiest: ${item.creator || '-'}`,
                `Barcode / code: ${item.code || '-'}`
            ];

            rows.forEach((row) => {
                doc.text(row, 16, y);
                y += 6;
            });

            if (item.notes) {
                const lines = doc.splitTextToSize(`Notitie: ${item.notes}`, 180);
                doc.text(lines, 16, y);
                y += lines.length * 6;
            }

            y += 6;

            if (y > 270 && index < state.items.length - 1) {
                doc.addPage();
                y = 20;
            }
        });

        return doc;
    }

    async function generatePdfBlob() {
        const doc = createPdfDocument();
        return doc.output('blob');
    }

    function handleDownloadPdf() {
        generatePdfBlob()
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'seniorease-demo.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                elements.shareHint.textContent = 'PDF opgeslagen. Kijk in uw downloadmap voor het bestand.';
            })
            .catch((error) => {
                console.error('PDF kon niet worden aangemaakt:', error);
                elements.shareHint.textContent = 'PDF kon niet worden aangemaakt. Probeer het opnieuw.';
            });
    }

    async function handleSharePdf() {
        if (!canShareFiles()) {
            updateShareHint();
            return;
        }

        try {
            const blob = await generatePdfBlob();
            const file = new File([blob], 'seniorease-demo.pdf', { type: 'application/pdf' });
            await navigator.share({
                files: [file],
                title: 'SeniorEase demo',
                text: 'Overzicht van mijn vijf demo-items.'
            });
            elements.shareHint.textContent = 'PDF gedeeld.';
        } catch (error) {
            console.error('Delen mislukt:', error);
            elements.shareHint.textContent = 'Delen is niet gelukt. Probeer het later opnieuw.';
        }
    }

    function canShareFiles() {
        const share = navigator.share && navigator.canShare;
        if (!share) {
            return false;
        }
        try {
            return navigator.canShare({ files: [new File([''], 'test.txt', { type: 'text/plain' })] });
        } catch {
            return false;
        }
    }

    function updateShareHint() {
        if (state.items.length === 0) {
            elements.shareHint.textContent = 'Voeg eerst items toe om te exporteren of te delen.';
            return;
        }

        if (!canShareFiles()) {
            elements.shareHint.textContent = 'Uw apparaat ondersteunt waarschijnlijk geen delen van PDF-bestanden. Gebruik Download PDF.';
        } else {
            elements.shareHint.textContent = '';
        }
    }

    function scannerSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && typeof Quagga !== 'undefined';
    }

    function isSamsungDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('samsung') || userAgent.includes('galaxy');
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

                // Zorg dat je element bestaat en zichtbaar is
                const target = document.querySelector('#camera-container');
                if (!target) {
                    console.error('Camera container niet gevonden!');
                    setScanStatus('Camera container niet gevonden!', true);
                    stopScanning();
                    return;
                }

                // QuaggaJS configuration with exact back camera
                const config = {
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: target,
                        constraints: {
                            video: {
                                facingMode: { exact: "environment" } // Force achtercamera
                            },
                            width: 640,
                            height: 480
                        },
                    },
                    decoder: {
                        readers: ["ean_reader", "code_128_reader", "code_39_reader"]
                    },
                    locate: true,
                    locator: {
                        patchSize: "medium",
                        halfSample: true
                    }
                };

                // Initialize QuaggaJS
                Quagga.init(config, function(err) {
                    if (err) {
                        console.error('Quagga initialization error:', err);
                        setScanStatus('Camera kon niet worden gestart. Probeer opnieuw.', true);
                        stopScanning();
                        return;
                    }
                    
                    console.log("Quagga initialization finished. Ready to start");
                    Quagga.start();
                    setScanStatus('Camera actief. Richt op de barcode.', false);
                });

                // Listen for frame processing (debugging)
                Quagga.onProcessed(function(result) {
                    console.log('Frame verwerkt');
                });

                // Listen for successful barcode detection
                Quagga.onDetected(function(result) {
                    console.log('Barcode gevonden:', result.codeResult.code);
                    const code = result.codeResult.code;
                    
                    elements.code.value = code;
                    setScanStatus(`Barcode gevonden: ${code}`, false, true);
                    stopScanning();
                });

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
            
            // Stop QuaggaJS
            if (typeof Quagga !== 'undefined') {
                Quagga.stop();
            }
            
            // Clear camera container
            const container = document.querySelector('#camera-container');
            container.innerHTML = '';
        }

        function closeCameraModal() {
            stopScanning();
        }

    function checkScannerSupport() {
        if (!scannerSupported()) {
            elements.startScan.disabled = true;
            setScanStatus('Barcode scannen wordt niet ondersteund in deze browser.', true);
        } else {
            setScanStatus('Gebruik Start om een barcode te scannen.', false);
            
            // Show Samsung-specific hints
            if (isSamsungDevice()) {
                const samsungHint = document.getElementById('samsungHint');
                if (samsungHint) {
                    samsungHint.style.display = 'block';
                }
            }
        }
    }

    function setScanStatus(message, isError, persistSuccess) {
        elements.scanStatus.textContent = message;
        elements.scanStatus.classList.remove('error', 'success');
        if (isError) {
            elements.scanStatus.classList.add('error');
        } else if (persistSuccess) {
            elements.scanStatus.classList.add('success');
        }
    }

    function resetDemo() {
        if (!state.items.length) {
            return;
        }

        const confirmed = window.confirm('Weet u zeker dat u de demo wilt resetten? Alle opgeslagen items worden verwijderd.');
        if (!confirmed) {
            return;
        }

        stopScanning();
        state.items = [];
        saveItems();
        render();
        setScanStatus('', false);
        elements.shareHint.textContent = 'Demo is gereset.';
    }

    init();
})();
