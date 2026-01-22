// ========================================
// APP STATE
// ========================================
const appState = {
    speechSynthesis: window.speechSynthesis,
    currentUtterance: null,
    availableVoices: [],
    isPaused: false,
    currentText: '',
    totalChars: 0,
    currentCharIndex: 0
};

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    // Upload
    uploadArea: document.getElementById('uploadArea'),
    pdfInput: document.getElementById('pdfInput'),
    fileInfo: document.getElementById('fileInfo'),
    fileName: document.getElementById('fileName'),
    clearFile: document.getElementById('clearFile'),
    
    // Text Editor
    textArea: document.getElementById('textArea'),
    charCount: document.getElementById('charCount'),
    clearText: document.getElementById('clearText'),
    
    // Controls
    voiceSelect: document.getElementById('voiceSelect'),
    rateControl: document.getElementById('rateControl'),
    rateValue: document.getElementById('rateValue'),
    pitchControl: document.getElementById('pitchControl'),
    pitchValue: document.getElementById('pitchValue'),
    volumeControl: document.getElementById('volumeControl'),
    volumeValue: document.getElementById('volumeValue'),
    
    // Playback
    playBtn: document.getElementById('playBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    stopBtn: document.getElementById('stopBtn'),
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    currentWord: document.getElementById('currentWord'),
    progressPercent: document.getElementById('progressPercent'),
    statusMessage: document.getElementById('statusMessage')
};

// ========================================
// INITIALIZATION
// ========================================
function init() {
    loadVoices();
    setupEventListeners();
    updateCharCount();
    
    // Load voices when they change (needed for some browsers)
    if (appState.speechSynthesis.onvoiceschanged !== undefined) {
        appState.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

// ========================================
// VOICE MANAGEMENT
// ========================================
function loadVoices() {
    appState.availableVoices = appState.speechSynthesis.getVoices();
    
    if (appState.availableVoices.length > 0) {
        populateVoiceSelect();
    }
}

function populateVoiceSelect() {
    elements.voiceSelect.innerHTML = '';
    
    // Filter English voices and group by type
    const englishVoices = appState.availableVoices.filter(voice => 
        voice.lang.startsWith('en')
    );
    
    // If no English voices, use all voices
    const voices = englishVoices.length > 0 ? englishVoices : appState.availableVoices;
    
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        
        // Mark default voice
        if (voice.default) {
            option.textContent += ' - Default';
            option.selected = true;
        }
        
        elements.voiceSelect.appendChild(option);
    });
}

// ========================================
// PDF HANDLING
// ========================================
function setupEventListeners() {
    // Upload area
    elements.uploadArea.addEventListener('click', () => elements.pdfInput.click());
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);
    elements.pdfInput.addEventListener('change', handleFileSelect);
    elements.clearFile.addEventListener('click', clearFile);
    
    // Text editor
    elements.textArea.addEventListener('input', updateCharCount);
    elements.clearText.addEventListener('click', clearTextArea);
    
    // Controls
    elements.rateControl.addEventListener('input', updateRateValue);
    elements.pitchControl.addEventListener('input', updatePitchValue);
    elements.volumeControl.addEventListener('input', updateVolumeValue);
    
    // Playback
    elements.playBtn.addEventListener('click', playText);
    elements.pauseBtn.addEventListener('click', pauseText);
    elements.stopBtn.addEventListener('click', stopText);
}

function handleDragOver(e) {
    e.preventDefault();
    elements.uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
        processPDF(files[0]);
    } else {
        showStatus('Please drop a valid PDF file', 'error');
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        processPDF(file);
    }
}

async function processPDF(file) {
    try {
        showStatus('Extracting text from PDF...', 'loading');
        
        // Display file info
        elements.fileName.textContent = file.name;
        elements.fileInfo.style.display = 'flex';
        
        // Read PDF file
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        // Extract text from all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }
        
        // Set extracted text
        elements.textArea.value = fullText.trim();
        updateCharCount();
        
        showStatus(`Successfully extracted text from ${pdf.numPages} page(s)`, 'success');
        
    } catch (error) {
        console.error('Error processing PDF:', error);
        showStatus('Error extracting text from PDF', 'error');
    }
}

function clearFile() {
    elements.pdfInput.value = '';
    elements.fileInfo.style.display = 'none';
    showStatus('PDF file removed', 'info');
}

// ========================================
// TEXT EDITOR
// ========================================
function updateCharCount() {
    const text = elements.textArea.value;
    const count = text.length;
    elements.charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
}

function clearTextArea() {
    elements.textArea.value = '';
    updateCharCount();
    showStatus('Text cleared', 'info');
}

// ========================================
// CONTROLS
// ========================================
function updateRateValue() {
    const value = parseFloat(elements.rateControl.value);
    elements.rateValue.textContent = `${value.toFixed(1)}x`;
}

function updatePitchValue() {
    const value = parseFloat(elements.pitchControl.value);
    elements.pitchValue.textContent = value.toFixed(1);
}

function updateVolumeValue() {
    const value = parseFloat(elements.volumeControl.value);
    elements.volumeValue.textContent = `${Math.round(value * 100)}%`;
}

// ========================================
// TEXT-TO-SPEECH
// ========================================
function playText() {
    const text = elements.textArea.value.trim();
    
    if (!text) {
        showStatus('Please enter or upload text to speak', 'error');
        return;
    }
    
    // If paused, resume
    if (appState.isPaused && appState.currentUtterance) {
        appState.speechSynthesis.resume();
        appState.isPaused = false;
        updatePlaybackUI(true);
        showStatus('Resuming speech...', 'info');
        return;
    }
    
    // Stop any ongoing speech
    if (appState.speechSynthesis.speaking) {
        appState.speechSynthesis.cancel();
    }
    
    // Create utterance
    appState.currentText = text;
    appState.totalChars = text.length;
    appState.currentCharIndex = 0;
    
    const utterance = new SpeechSynthesisUtterance(text);
    appState.currentUtterance = utterance;
    
    // Set voice
    const selectedVoiceIndex = elements.voiceSelect.value;
    const voices = appState.availableVoices.filter(voice => 
        voice.lang.startsWith('en')
    );
    const voiceList = voices.length > 0 ? voices : appState.availableVoices;
    utterance.voice = voiceList[selectedVoiceIndex];
    
    // Set parameters
    utterance.rate = parseFloat(elements.rateControl.value);
    utterance.pitch = parseFloat(elements.pitchControl.value);
    utterance.volume = parseFloat(elements.volumeControl.value);
    
    // Event handlers
    utterance.onstart = () => {
        updatePlaybackUI(true);
        showProgress(true);
        showStatus('Speaking...', 'speaking');
    };
    
    utterance.onboundary = (event) => {
        if (event.name === 'word') {
            appState.currentCharIndex = event.charIndex;
            updateProgress();
            
            // Highlight current word
            const currentWord = text.substr(event.charIndex, event.charLength || 10);
            elements.currentWord.textContent = currentWord;
        }
    };
    
    utterance.onend = () => {
        updatePlaybackUI(false);
        showProgress(false);
        showStatus('Speech completed', 'success');
        resetProgress();
    };
    
    utterance.onerror = (event) => {
        console.error('Speech error:', event);
        updatePlaybackUI(false);
        showStatus('Error during speech synthesis', 'error');
    };
    
    // Start speaking
    appState.speechSynthesis.speak(utterance);
}

function pauseText() {
    if (appState.speechSynthesis.speaking && !appState.isPaused) {
        appState.speechSynthesis.pause();
        appState.isPaused = true;
        updatePlaybackUI(false, true);
        showStatus('Speech paused', 'info');
    }
}

function stopText() {
    if (appState.speechSynthesis.speaking || appState.isPaused) {
        appState.speechSynthesis.cancel();
        appState.isPaused = false;
        updatePlaybackUI(false);
        showProgress(false);
        resetProgress();
        showStatus('Speech stopped', 'info');
    }
}

// ========================================
// UI UPDATES
// ========================================
function updatePlaybackUI(isPlaying, isPaused = false) {
    if (isPlaying) {
        elements.playBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.stopBtn.disabled = false;
    } else if (isPaused) {
        elements.playBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.stopBtn.disabled = false;
    } else {
        elements.playBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.stopBtn.disabled = true;
    }
}

function showProgress(show) {
    elements.progressContainer.style.display = show ? 'block' : 'none';
}

function updateProgress() {
    const percent = (appState.currentCharIndex / appState.totalChars) * 100;
    elements.progressFill.style.width = `${percent}%`;
    elements.progressPercent.textContent = `${Math.round(percent)}%`;
}

function resetProgress() {
    elements.progressFill.style.width = '0%';
    elements.progressPercent.textContent = '0%';
    elements.currentWord.textContent = 'Ready to play';
}

function showStatus(message, type = 'info') {
    const statusSpan = elements.statusMessage.querySelector('span');
    const statusIcon = elements.statusMessage.querySelector('.status-icon');
    
    statusSpan.textContent = message;
    
    // Update icon color based on type
    const colors = {
        info: '#667eea',
        success: '#43e97b',
        error: '#f5576c',
        loading: '#4facfe',
        speaking: '#00f2fe'
    };
    
    statusIcon.style.stroke = colors[type] || colors.info;
    
    // Add animation
    elements.statusMessage.style.animation = 'none';
    setTimeout(() => {
        elements.statusMessage.style.animation = 'fadeIn 0.3s ease';
    }, 10);
}

// ========================================
// START APPLICATION
// ========================================
document.addEventListener('DOMContentLoaded', init);
