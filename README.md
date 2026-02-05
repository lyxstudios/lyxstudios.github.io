# LYX Studios Website 🎮

A modern, feature-rich website for LYX Studios with Discord authentication and staff zone access control.

## Features ✨

- **Home Page**: Server overview with features showcase
- **Start Guide**: Comprehensive getting started guide for new players
- **Help Section**: FAQ, troubleshooting, and keybinds reference
- **Store**: VIP packages and in-game items
- **Staff Zone**: Restricted area for staff members only (requires Discord authentication)
- **Discord OAuth**: Login with Discord to access staff features
- **Role-Based Access**: Automatic staff role verification

## Setup Instructions 🛠️

### 1. Discord Application Setup

To enable Discord authentication, you need to create a Discord application:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it "LYX Studios" (or your preferred name)
4. Go to the "OAuth2" section
5. Add a redirect URL: `https://yourdomain.com` (or `http://localhost` for testing)
6. Copy your **Client ID**

### 2. Configure the Website

Edit `script.js` and replace the placeholder in the `DISCORD_CONFIG` object:

```javascript
const DISCORD_CONFIG = {
    clientId: 'YOUR_DISCORD_CLIENT_ID', // Replace with your actual Client ID
    redirectUri: window.location.origin,
    guildId: '1432065913607291014',
    staffRoleId: '1439398236833054811',
    scopes: ['identify', 'guilds.members.read']
};
```

**Important**: Replace `'YOUR_DISCORD_CLIENT_ID'` with your actual Discord Application Client ID.

### 3. Add the LYX Logo

Place your `lyx.png` logo file in the same directory as the HTML file.

### 4. Host the Website

You can host this website on:
- **GitHub Pages**: Free and easy
  1. Create a GitHub repository
  2. Push your files
  3. Enable GitHub Pages in repository settings
  4. Update the OAuth redirect URI to your GitHub Pages URL

- **Netlify/Vercel**: Free hosting with custom domains
- **Your own server**: Any web hosting service

### 5. Update Discord OAuth Redirect URI

After hosting, update your Discord application's OAuth2 redirect URI to match your website URL.

## Discord Configuration Details 📋

### Current Settings:
- **Guild ID**: 1432065913607291014
- **Staff Role ID**: 1439398236833054811

These IDs are configured in the code. Users with the staff role in your Discord server will have access to the Staff Zone.

## OAuth Scopes Explained 🔐

The website requests the following Discord scopes:
- `identify`: Get basic user information (username, avatar)
- `guilds.members.read`: Check if user has the staff role in your server

## File Structure 📁

```
├── index.html          # Main HTML file
├── style.css           # Styling and theme
├── script.js           # Discord OAuth and navigation logic
├── lyx.png            # Server logo (you need to add this)
└── README.md          # This file
```

## Pages Overview 📄

### Home
- Hero section with logo
- Feature cards showcasing server highlights
- Call-to-action buttons

### Start Guide
- Step-by-step setup instructions
- Server rules
- Pro tips for new players

### Help
- Common issues and solutions
- Keybinds reference
- Contact support options

### Store
- VIP packages (Bronze, Silver, Gold)
- Vehicle packages
- Property packages
- Starter pack

### Staff Zone (Restricted)
- Staff guidelines and rules
- Command reference
- Punishment guidelines
- Best practices
- Staff contacts

## Customization 🎨

### Colors
Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #cc0000;      /* Red */
    --secondary-color: #ff0000;    /* Bright red */
    --dark-bg: #0a0a0a;           /* Almost black */
    --accent: #ff0000;            /* Red accent */
}
```

### Content
- Edit `index.html` to update text content
- Modify sections, add/remove features
- Update prices in the store section

### Adding New Pages
1. Add a new page div in `index.html`:
   ```html
   <div id="newpage-page" class="page">
       <!-- Your content -->
   </div>
   ```

2. Add navigation link:
   ```html
   <li><a href="#" data-page="newpage" class="nav-link">New Page</a></li>
   ```

## Security Notes 🔒

- Never expose your Discord Client Secret
- The current implementation uses implicit OAuth flow (suitable for static sites)
- For production, consider using a backend server to handle OAuth tokens securely
- Keep your Discord Bot Token private (not needed for this implementation)

## Testing Locally 💻

1. Open `index.html` in a web browser
2. For OAuth to work locally, set redirect URI to `http://localhost` or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use any other local server
   ```

## Troubleshooting 🔧

### OAuth Not Working
- Verify Client ID is correct
- Check redirect URI matches in Discord app settings
- Ensure you're accessing via the correct URL

### Staff Zone Not Showing
- Verify you're logged in with Discord
- Check that your Discord account has the staff role
- Confirm role ID is correct in `script.js`

### Logo Not Displaying
- Ensure `lyx.png` is in the same directory
- Check file name matches exactly (case-sensitive)
- Clear browser cache

## Browser Support 🌐

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License 📄

This website is created for LYX Studios. Feel free to modify and customize as needed.

## Credits 👏

Created for LYX Studios - Your Ultimate Roleplay Experience

---

**Need Help?** Join the LYX Studios Discord server for support!