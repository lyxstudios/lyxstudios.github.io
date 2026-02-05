# LYX Studios Website

Welcome to the official LYX Studios GitHub Pages website! This is your hub for getting started guides, staff guides, rules, and important information about our organization.

## 📋 Features

- **Home Page**: Overview of LYX Studios with quick access to all sections
- **Getting Started Guide**: Step-by-step instructions for new members
- **Guides & Tutorials**: Comprehensive guides for users and staff
- **Rules & Policies**: Important rules and community standards
- **Non-Disclosure Agreement (NDA)**: Legal documentation for confidential information
- **Password-Protected Staff Area**: Secure section for staff management and content editing

## 🔐 Staff Area Access

The staff area is protected by a password. Only authorized staff members should have access.

**Default Password**: `LYX2026`

⚠️ **IMPORTANT**: Change this password immediately after your first login! Edit the password in the JavaScript section of `index.html`.

### Staff Features

- Edit all page content (guides, rules, getting started, NDA)
- Create and manage announcements
- View and delete announcements
- All changes are saved locally in your browser using localStorage

## 🚀 How to Use

1. Navigate to each section using the navigation menu
2. For staff access, click "Staff Area" and enter the password
3. Staff members can edit content by selecting the appropriate button in the management panel
4. All edits are automatically saved to browser local storage

## 📝 Content Management

### For Staff Members

1. Click on "Staff Area" in the navigation
2. Enter the staff password
3. Use the management buttons to edit different sections:
   - **Edit Guides**: Modify user and staff guides
   - **Edit Rules**: Update community rules and policies
   - **Edit Getting Started**: Change onboarding instructions
   - **Edit NDA**: Update the non-disclosure agreement
   - **Announcements**: Create and manage announcements

### Saving Changes

All changes are saved to browser localStorage. To persist changes:
- Export your edited content regularly
- Keep backups of important information
- For permanent storage, consider integrating with a backend database

## 🎨 Customization

### Logo
Replace `lyx.png` with your own logo file. The current logo is displayed in the header.

### Colors
- Primary Color: `#ff4500` (Orange-Red)
- Secondary Color: `#ffd700` (Gold)
- Background: Dark gradient (`#1a1a1a` to `#2d2d2d`)

### Password
To change the staff password:
1. Open `index.html`
2. Find the line: `const STAFF_PASSWORD = 'LYX2026';`
3. Replace `'LYX2026'` with your desired password

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔒 Security Notes

- Passwords are checked client-side only. For production use, implement server-side authentication
- Never commit sensitive passwords to version control
- Use HTTPS when deploying to production
- Consider implementing more robust authentication for actual sensitive content

## 📄 License

All content © 2026 LYX Studios. All rights reserved.

## 🤝 Support

For questions or issues with the website, please contact the LYX Studios staff.

---

**Last Updated**: February 5, 2026