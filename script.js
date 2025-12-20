// Global variables
let audioEnabled = false;
let countdownInterval;
let matrixChars = [];
let canvas, ctx;

// Audio elements
const ambientSound = document.getElementById('ambientSound');
const hoverSound = document.getElementById('hoverSound');
const errorSound = document.getElementById('errorSound');
const bootSound = document.getElementById('bootSound');
const glitchSound = document.getElementById('glitchSound');

// DOM Elements
const logo = document.getElementById('logo');
const logoContainer = document.getElementById('logo-container');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const accessBtn = document.getElementById('access-btn');
const decodeBtn = document.getElementById('decode-btn');
const accessDenied = document.getElementById('access-denied');
const decodeFailure = document.getElementById('decode-failure');
const countdownText = document.getElementById('countdown-text');
const decodeOverlay = document.getElementById('decode-overlay');
const codeStream = document.getElementById('code-stream');
const terminalLog = document.getElementById('terminal-log');
const finalLine = document.getElementById('final-line');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Start the page sequence
    startPageSequence();
    
    // Set up event listeners
    setupEventListeners();
    
    // Create matrix rain effect
    createMatrixRain();
    
    // Start countdown timer
    startCountdown();
});

// Page load sequence
function startPageSequence() {
    // Fade in logo after 1.5 seconds
    setTimeout(() => {
        anime({
            targets: logoContainer,
            opacity: 1,
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        
        // Add pulse effect to logo
        logo.classList.add('pulse');
    }, 1500);
    
    // Show text sequence
    setTimeout(() => {
        showTextSequence();
    }, 4000);
    
    // Show final line briefly
    setTimeout(() => {
        anime({
            targets: finalLine,
            opacity: 0.3,
            duration: 2000,
            easing: 'easeInOutQuad'
        });
        
        // Hide it after a few seconds
        setTimeout(() => {
            anime({
                targets: finalLine,
                opacity: 0,
                duration: 2000,
                easing: 'easeInOutQuad'
            });
        }, 5000);
    }, 10000);
}

// Text sequence animation
function showTextSequence() {
    // Show all lines at once with smooth animation and glitch effects
    line1.classList.remove('hidden');
    line2.classList.remove('hidden');
    line3.classList.remove('hidden');
    
    // Smooth fade in animation
    anime({
        targets: [line1, line2, line3],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 2000,
        elasticity: 0,
        easing: 'easeOutExpo',
        delay: anime.stagger(50)
    });
    
    // Add glitch effects randomly
    setTimeout(() => {
        applyRandomGlitch([line1, line2, line3]);
    }, 2500);
    
    // Add another glitch effect later
    setTimeout(() => {
        applyRandomGlitch([line2]);
    }, 5000);
}

// Create matrix rain effect
function createMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // Create character drops
    for (let i = 0; i < columns; i++) {
        matrixChars[i] = {
            x: i * fontSize,
            y: Math.random() * -500,
            speed: 2 + Math.random() * 5,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: 0.3 + Math.random() * 0.7
        };
    }
    
    // Create canvas for grid
    canvas = document.getElementById('hacking-grid');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Start animation
    animateMatrix();
    drawGrid();
}

// Animate matrix rain
function animateMatrix() {
    const matrixRain = document.getElementById('matrix-rain');
    matrixRain.innerHTML = '';
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    
    for (let i = 0; i < matrixChars.length; i++) {
        const char = matrixChars[i];
        
        // Create span for each character
        const span = document.createElement('span');
        span.style.position = 'absolute';
        span.style.left = char.x + 'px';
        span.style.top = char.y + 'px';
        span.style.color = `rgba(0, 255, 100, ${char.opacity})`;
        span.style.fontSize = '14px';
        span.style.fontFamily = 'monospace';
        span.style.textShadow = '0 0 5px rgba(0, 255, 100, 0.8)';
        span.textContent = char.char;
        matrixRain.appendChild(span);
        
        // Move character down
        char.y += char.speed;
        
        // Reset if off screen
        if (char.y > window.innerHeight) {
            char.y = Math.random() * -100;
            char.char = chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Randomly change character
        if (Math.random() > 0.95) {
            char.char = chars[Math.floor(Math.random() * chars.length)];
        }
    }
    
    requestAnimationFrame(animateMatrix);
}

// Draw hacking grid
function drawGrid() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 100, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    requestAnimationFrame(drawGrid);
}

// Start countdown timer
function startCountdown() {
    // Set target date to January 2nd of next year
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + (targetDate.getMonth() > 0 || targetDate.getDate() > 2 ? 1 : 0));
    targetDate.setMonth(0); // January
    targetDate.setDate(2); // 2nd
    targetDate.setHours(0, 0, 0, 0);
    
    updateCountdown(targetDate);
    
    countdownInterval = setInterval(() => {
        updateCountdown(targetDate);
    }, 1000);
}

// Update countdown display
function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Set up event listeners
function setupEventListeners() {
    // Enable audio on first interaction
    document.body.addEventListener('click', enableAudio, { once: true });
    
    // Button hover sounds
    accessBtn.addEventListener('mouseenter', () => playHoverSound());
    decodeBtn.addEventListener('mouseenter', () => playHoverSound());
    
    // Button clicks
    accessBtn.addEventListener('click', handleAccessClick);
    decodeBtn.addEventListener('click', handleDecodeClick);
    
    // Add hover effects to all elements
    addHoverEffects();
    
    // Keyboard mute toggle
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            toggleMute();
        }
    });
}

// Enable audio on first interaction
function enableAudio() {
    if (!audioEnabled) {
        audioEnabled = true;
        ambientSound.volume = 0.05;
        ambientSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Play hover sound
function playHoverSound() {
    if (audioEnabled) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.1;
        hoverSound.play().catch(e => console.log("Hover sound failed:", e));
    }
}

// Hide main content with smooth animations
function hideMainContent() {
    // Slide down all content except logo
    const mainContent = document.getElementById('main-content');
    const textSequence = document.getElementById('text-sequence');
    const countdownContainer = document.getElementById('countdown-container');
    const buttons = document.getElementById('buttons');
    const finalLine = document.getElementById('final-line');
    
    // Add slide-down animation class
    if (mainContent) mainContent.classList.add('slide-down');
    
    // Slide up logo
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer) logoContainer.classList.add('slide-up');
}

// Add hover effects to all interactive elements
function addHoverEffects() {
    // Add hover effect to logo
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    }
    
    // Add hover effects to text elements
    const textElements = document.querySelectorAll('#text-sequence p');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
    
    // Add hover effect to timer
    const timer = document.getElementById('timer');
    if (timer) {
        timer.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    }
    
    // Add hover effect to final line
    const finalLine = document.getElementById('final-line');
    if (finalLine) {
        finalLine.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    }
}

// Toggle mute
function toggleMute() {
    if (audioEnabled) {
        const isMuted = !ambientSound.muted;
        ambientSound.muted = isMuted;
        hoverSound.muted = isMuted;
        errorSound.muted = isMuted;
        bootSound.muted = isMuted;
        glitchSound.muted = isMuted;
    }
}

// Handle ACCESS button click
function handleAccessClick() {
    // Show access denied message
    accessDenied.classList.remove('hidden');
    accessDenied.classList.add('fade-in');
    
    // Play error sound
    if (audioEnabled) {
        errorSound.currentTime = 0;
        errorSound.volume = 0.1;
        errorSound.play().catch(e => console.log("Error sound failed:", e));
    }
    
    // Hide message after delay
    setTimeout(() => {
        accessDenied.classList.remove('fade-in');
        accessDenied.classList.add('fade-out');
        setTimeout(() => {
            accessDenied.classList.add('hidden');
            accessDenied.classList.remove('fade-out');
        }, 2000);
    }, 5000);
}

// Handle DECODE button click
function handleDecodeClick() {
    // Play boot sound
    if (audioEnabled) {
        bootSound.currentTime = 0;
        bootSound.volume = 0.1;
        bootSound.play().catch(e => console.log("Boot sound failed:", e));
    }
    
    // Hide all content except logo with smooth animations
    hideMainContent();
    
    // Show decode overlay after a delay
    setTimeout(() => {
        decodeOverlay.classList.remove('hidden');
        decodeOverlay.classList.add('fade-in');
        
        // Start code stream
        startCodeStream();
        
        // Show terminal logs
        showTerminalLogs();
        
        // Show decode failure after 10 seconds
        setTimeout(() => {
            showDecodeFailure();
        }, 10000);
    }, 1500);
}

// Start code stream animation
function startCodeStream() {
    // Use the provided decoding text
    const decodeText = `[INIT] :: SYSTEM CORE v9.8.21 :: BOOTSTRAP_SEQUENCE

[LOAD] quantum_entropy_pool ............ OK

[LOAD] neural_matrix_driver ............ OK

[LOAD] ai_inference_engine ............. OK

[SYNC] distributed_node_cluster ........ OK

[AUTH] biometric_vector_scan ........... PENDING



>>> establishing secure uplink

>>> tunneling via encrypted mesh network

>>> packet obfuscation enabled

>>> entropy normalization complete



0xA9F3 :: HASHMAP_INJECTION_LAYER_ACTIVE

0xB2C8 :: XOR_CHAIN_ESTABLISHED

0xFF01 :: POLYMORPHIC_KEY_ROTATION_ENGAGED



decrypt_stream() {

    entropy_seed += time_dilation_factor;

    quantum_noise ^= hash_cycle;

    recursive_cipher = AES256 + RSA4096 + SHA3;

}



[SCAN] firewall layers ................ 12 FOUND

[SCAN] intrusion countermeasures ...... ACTIVE

[SCAN] heuristic anomaly detection .... ENABLED

[SCAN] AI watchdog .................... WATCHING



>>> spoofing access vector

>>> forging identity signature

>>> emulating trusted node

>>> injecting synthetic credentials



WARN :: behavioral mismatch detected

WARN :: neural fingerprint deviation

WARN :: clearance threshold exceeded



---------------------------------------

KERNEL_TRACE :: THREAD_001

---------------------------------------

allocating memory buffer

rewriting instruction pointers

masking syscall footprint

bypassing sandbox simulation

mirroring execution state

forking shadow process



[AI] predictive defense response ....... ADAPTIVE

[AI] counter-strategy generated ........ LIVE

[AI] threat classification ............. HIGH



>>> escalating privilege request

>>> recalculating permission graph

>>> attempting root-equivalent access



ERROR :: privilege escalation denied

ERROR :: trust score below minimum

ERROR :: cognitive pattern mismatch



---------------------------------------

CRYPTOGRAPHIC ANALYSIS MODULE

---------------------------------------

loading elliptic curve parameters

deriving asymmetric handshake

validating nonce integrity

verifying checksum cascade

locking entropy vault



hash_sequence = [

    9f2a1c,

    a91f33,

    b4e8d2,

    ff00ab,

    deadbeef,

    c0ffee

]



>>> brute-force simulation initiated

>>> adaptive dictionary generated

>>> machine learning heuristics applied

>>> probability convergence unstable



ALERT :: honeypot triggered

ALERT :: sandbox environment confirmed

ALERT :: trace vector exposed



---------------------------------------

SYSTEM DEFENSE MATRIX

---------------------------------------

deploying counter-intrusion logic

activating black-ice protocols

rerouting signal through null nodes

scrambling execution timeline

initiating memory purge



[SECURITY] quantum lock ................. ENGAGED

[SECURITY] access lattice ............... SEALED

[SECURITY] neural gatekeeper ............ ONLINE



>>> decoding aborted

>>> rolling back execution state

>>> flushing volatile buffers

>>> severing uplink



---------------------------------------

FINAL SYSTEM MESSAGE

---------------------------------------

ACCESS DENIED

UNAUTHORIZED DECODE ATTEMPT

SECURITY CLEARANCE: INSUFFICIENT

TRACE LOGGED

SESSION TERMINATED



>>> initiating shutdown sequence

>>> closing channel in 3...

>>> 2...

>>> 1...



[END OF TRANSMISSION]`;
    
    // Type the code character by character
    let index = 0;
    codeStream.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < decodeText.length) {
            codeStream.textContent += decodeText.charAt(index);
            index++;
            
            // Auto-scroll to bottom
            codeStream.scrollTop = codeStream.scrollHeight;
        } else {
            clearInterval(typeInterval);
            
            // After typing is complete, start scrolling
            setTimeout(() => {
                let scrollPos = 0;
                const scrollInterval = setInterval(() => {
                    scrollPos += 2;
                    codeStream.scrollTop = scrollPos;
                    
                    // Restart scrolling when reaching the end
                    if (scrollPos > codeStream.scrollHeight - codeStream.clientHeight - 50) {
                        scrollPos = 0;
                        codeStream.scrollTop = 0;
                    }
                }, 50);
            }, 1000);
        }
    }, 10);
}

// Show terminal logs
function showTerminalLogs() {
    const logs = [
        "[SYS] Initializing quantum decryption matrix",
        "[NET] Establishing secure tunnel",
        "[AUTH] Spoofing biometric signature",
        "[FIRE] Firewall layers penetrated: 3/12",
        "[MEM] Allocating neural buffer space",
        "[CRYPT] Engaging polymorphic cipher engine",
        "[AI] Predictive defense adapting",
        "[INTRUSION] Countermeasure activated",
        "[WARN] Anomaly detection triggered",
        "[SEC] Quantum lock engaging",
        "[FAIL] Access denied - insufficient clearance"
    ];
    
    let index = 0;
    
    const logInterval = setInterval(() => {
        if (index < logs.length) {
            const logEntry = document.createElement('div');
            logEntry.textContent = logs[index];
            logEntry.style.marginBottom = '8px';
            logEntry.style.color = '#0f0';
            logEntry.style.textShadow = '0 0 3px rgba(0, 255, 0, 0.7)';
            terminalLog.appendChild(logEntry);
            terminalLog.scrollTop = terminalLog.scrollHeight;
            index++;
        } else {
            clearInterval(logInterval);
        }
    }, 1000);
}

// Apply random glitch effect to elements
function applyRandomGlitch(elements) {
    if (Math.random() > 0.3) { // 70% chance to apply glitch
        const element = elements[Math.floor(Math.random() * elements.length)];
        applyGlitchEffect(element);
        
        // Occasionally apply to another element
        if (Math.random() > 0.7 && elements.length > 1) {
            setTimeout(() => {
                const otherElement = elements[Math.floor(Math.random() * elements.length)];
                if (otherElement !== element) {
                    applyGlitchEffect(otherElement);
                }
            }, 300);
        }
    }
}

// Show decode failure
function showDecodeFailure() {
    // Play glitch sound
    if (audioEnabled) {
        glitchSound.currentTime = 0;
        glitchSound.volume = 0.1;
        glitchSound.play().catch(e => console.log("Glitch sound failed:", e));
    }
    
    // Hide decode overlay and show failure message
    decodeOverlay.classList.add('hidden');
    decodeFailure.classList.remove('hidden');
    decodeFailure.classList.add('fade-in');
    
    // Apply glitch effect to failure message
    setTimeout(() => {
        applyGlitchEffect(decodeFailure.querySelector('h2'));
    }, 500);
    
    // Countdown sequence from 5
    let count = 5;
    countdownText.textContent = `Shutting down in ${count}...`;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownText.textContent = `Shutting down in ${count}...`;
            // Apply glitch effect on each count
            applyGlitchEffect(countdownText);
        } else {
            countdownText.textContent = `Shutting down in ${count}...`;
            clearInterval(countdownInterval);
            
            // Close page after final count
            setTimeout(() => {
                decodeFailure.classList.remove('fade-in');
                decodeFailure.classList.add('fade-out');
                setTimeout(() => {
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }, 1000);
}