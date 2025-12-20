// PassPilot - JavaScript functionality

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('slide-down');
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Password Generator functionality (only on tools.html)
    initPasswordGenerator();
    
    // Contact Form functionality (only on about.html)
    initContactForm();
});

// =============== PASSWORD GENERATOR FUNCTIONS ===============

function initPasswordGenerator() {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const passwordLength = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');

    if (!generateBtn) return; // Not on tools page

    // Update length display
    if (passwordLength && lengthValue) {
        passwordLength.addEventListener('input', function() {
            lengthValue.textContent = this.value;
        });
    }

    // Generate Password
    generateBtn.addEventListener('click', generatePassword);

    // Copy to Clipboard
    copyBtn.addEventListener('click', copyPassword);
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    // Check if at least one option is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('⚠️ Please select at least one character type!');
        return;
    }

    // Character sets
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characters = '';
    let password = '';

    // Build character set based on selections
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    // Generate password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    // Display password
    const passwordDisplay = document.getElementById('passwordDisplay');
    passwordDisplay.value = password;

    // Update strength indicator
    updatePasswordStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

    // Add animation
    passwordDisplay.classList.add('pulse');
    setTimeout(() => {
        passwordDisplay.classList.remove('pulse');
    }, 600);
}

function updatePasswordStrength(password, length, hasUpper, hasLower, hasNumbers, hasSymbols) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;
    let strengthLabel = '';
    let colorClass = '';

    // Calculate strength score
    if (length >= 8) strength += 25;
    if (length >= 12) strength += 25;
    if (hasUpper) strength += 12.5;
    if (hasLower) strength += 12.5;
    if (hasNumbers) strength += 12.5;
    if (hasSymbols) strength += 12.5;

    // Determine strength level
    if (strength < 40) {
        strengthLabel = '❌ Weak';
        colorClass = 'strength-weak';
    } else if (strength < 60) {
        strengthLabel = '⚠️ Fair';
        colorClass = 'strength-fair';
    } else if (strength < 80) {
        strengthLabel = '✓ Good';
        colorClass = 'strength-good';
    } else {
        strengthLabel = '✅ Strong';
        colorClass = 'strength-strong';
    }

    // Update UI
    strengthBar.style.width = strength + '%';
    strengthBar.className = 'h-3 rounded-full transition-all duration-300 ' + colorClass;
    strengthText.textContent = strengthLabel;
}

function copyPassword() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyMessage = document.getElementById('copyMessage');
    
    if (passwordDisplay.value === 'Click Generate to create password' || passwordDisplay.value === '') {
        alert('⚠️ Generate a password first!');
        return;
    }

    // Copy to clipboard
    passwordDisplay.select();
    passwordDisplay.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        // Show success message
        copyMessage.classList.remove('hidden');
        copyMessage.classList.add('fade-in');
        
        // Hide message after 2 seconds
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        alert('❌ Failed to copy password');
        console.error('Copy failed:', err);
    });
}

// =============== CONTACT FORM FUNCTIONS ===============

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return; // Not on about page

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const formMessage = document.getElementById('contactFormMessage');

        // Basic validation
        if (name === '' || email === '' || message === '') {
            showFormMessage('⚠️ Please fill in all fields!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('⚠️ Please enter a valid email address!', 'error');
            return;
        }

        // Simulate form submission (in real app, this would send to a server)
        showFormMessage('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Clear form
        contactForm.reset();
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('contactFormMessage');
    
    formMessage.textContent = message;
    formMessage.classList.remove('hidden');
    
    if (type === 'success') {
        formMessage.classList.add('text-green-600');
        formMessage.classList.remove('text-red-600');
    } else {
        formMessage.classList.add('text-red-600');
        formMessage.classList.remove('text-green-600');
    }

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// =============== UTILITY FUNCTIONS ===============

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console message
console.log('%c🔐 PassPilot - Secure Password Generator', 'color: #22c55e; font-size: 20px; font-weight: bold;');
console.log('%cNavigate easily through password creation!', 'color: #fbbf24; font-size: 14px;');
