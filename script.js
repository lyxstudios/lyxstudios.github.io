// Discord OAuth Configuration
const DISCORD_CONFIG = {
    clientId: '1439594242967339109', // Replace with your Discord Application Client ID
    redirectUri: window.location.origin,
    guildId: '1432065913607291014',
    staffRoleId: '1439398236833054811',
    scopes: ['identify', 'guilds.members.read']
};

// State Management
let userState = {
    isLoggedIn: false,
    user: null,
    isStaff: false
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    checkAuthStatus();
    setupEventListeners();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Footer links
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', (e) => {
            const page = link.getAttribute('data-page');
            if (page) {
                e.preventDefault();
                navigateTo(page);
            }
        });
    });
}

function navigateTo(pageName) {
    // Check if trying to access staff zone
    if (pageName === 'staff' && !userState.isStaff) {
        navigateTo('staff'); // Show access denied
        return;
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
function setupEventListeners() {
    const loginBtn = document.getElementById('discord-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', initiateDiscordLogin);
    }

    const staffLoginPrompt = document.getElementById('staff-login-prompt');
    if (staffLoginPrompt) {
        staffLoginPrompt.addEventListener('click', initiateDiscordLogin);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// Auth Status Check
function checkAuthStatus() {
    // Check if returning from Discord OAuth
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
        // Store token
        sessionStorage.setItem('discord_token', accessToken);
        // Clean URL
        window.location.hash = '';
        // Fetch user data
        fetchUserData(accessToken);
    } else {
        // Check for existing session
        const storedToken = sessionStorage.getItem('discord_token');
        if (storedToken) {
            fetchUserData(storedToken);
        }
    }
}

// Discord OAuth Login
function initiateDiscordLogin() {
    const { clientId, redirectUri, scopes } = DISCORD_CONFIG;
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scopes.join('%20')}`;
    
    window.location.href = authUrl;
}

// Fetch User Data from Discord
async function fetchUserData(token) {
    try {
        // Get user info
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        
        // Get guild member info to check roles
        const memberResponse = await fetch(
            `https://discord.com/api/users/@me/guilds/${DISCORD_CONFIG.guildId}/member`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        let isStaff = false;
        if (memberResponse.ok) {
            const memberData = await memberResponse.json();
            isStaff = memberData.roles.includes(DISCORD_CONFIG.staffRoleId);
        }

        // Update user state
        userState = {
            isLoggedIn: true,
            user: userData,
            isStaff: isStaff
        };

        updateUIForLoggedInUser(userData, isStaff);
    } catch (error) {
        console.error('Error fetching user data:', error);
        // If token is invalid, clear it
        sessionStorage.removeItem('discord_token');
        
        // Show a user-friendly error message
        showNotification('Authentication failed. Please try logging in again.', 'error');
    }
}

// Update UI for Logged In User
function updateUIForLoggedInUser(user, isStaff) {
    // Hide login button
    const loginBtn = document.getElementById('discord-login');
    if (loginBtn) {
        loginBtn.style.display = 'none';
    }

    // Show user info
    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        userInfo.style.display = 'flex';
    }

    // Set avatar
    const avatarImg = document.getElementById('user-avatar');
    if (avatarImg) {
        const avatarUrl = user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
            : 'https://cdn.discordapp.com/embed/avatars/0.png';
        avatarImg.src = avatarUrl;
    }

    // Set username
    const userName = document.getElementById('user-name');
    if (userName) {
        userName.textContent = user.username;
    }

    // Show staff nav if user is staff
    if (isStaff) {
        const staffNav = document.getElementById('staff-nav');
        if (staffNav) {
            staffNav.style.display = 'block';
        }

        // Update staff page
        const staffContent = document.getElementById('staff-content');
        const staffAccessDenied = document.getElementById('staff-access-denied');
        const staffUsername = document.getElementById('staff-username');

        if (staffContent) staffContent.style.display = 'block';
        if (staffAccessDenied) staffAccessDenied.style.display = 'none';
        if (staffUsername) staffUsername.textContent = user.username;
    }

    showNotification(`Welcome back, ${user.username}!`, 'success');
}

// Logout
function logout() {
    // Clear session
    sessionStorage.removeItem('discord_token');
    
    // Reset user state
    userState = {
        isLoggedIn: false,
        user: null,
        isStaff: false
    };

    // Reset UI
    const loginBtn = document.getElementById('discord-login');
    if (loginBtn) {
        loginBtn.style.display = 'flex';
    }

    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        userInfo.style.display = 'none';
    }

    const staffNav = document.getElementById('staff-nav');
    if (staffNav) {
        staffNav.style.display = 'none';
    }

    // Reset staff page
    const staffContent = document.getElementById('staff-content');
    const staffAccessDenied = document.getElementById('staff-access-denied');

    if (staffContent) staffContent.style.display = 'none';
    if (staffAccessDenied) staffAccessDenied.style.display = 'block';

    // Navigate to home
    navigateTo('home');

    showNotification('You have been logged out.', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: ${type === 'success' ? '#cc0000' : type === 'error' ? '#8a0000' : '#cc0000'};
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to the page
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make navigateTo available globally
window.navigateTo = navigateTo;