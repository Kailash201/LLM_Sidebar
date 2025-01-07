# Chrome Extension Installation Guide (Developer Mode)

This guide explains how to install the Chrome extension in your browser in developer mode using the contents of the `dist` folder.

---

## Prerequisites

Before installing, ensure you have the following:
- Google Chrome or any Chromium-based browser (e.g., Edge, Brave).
- Access to the `dist` folder containing the built extension files.

---

## Steps to Install

1. **Open Chrome Extensions Page**
   - Open your Chrome browser.
   - Navigate to `chrome://extensions` by typing it into the address bar and pressing Enter.

2. **Enable Developer Mode**
   - In the top-right corner of the Extensions page, toggle the switch for "Developer mode" to enable it.

3. **Load the Extension**
   - Click the "Load unpacked" button in the top-left corner of the Extensions page.
   - In the file picker dialog that appears, navigate to the `dist` folder from this project and select it.

4. **Verify the Extension**
   - The extension should now appear in your list of installed extensions.
   - Ensure it is enabled by toggling the switch next to it.

---

## Troubleshooting

- **Missing `dist` folder**: Ensure that the project has been built. If the folder is missing, run the build script for your project (e.g., `npm run build` or `yarn build`) to generate the `dist` folder.
- **Errors during installation**: Double-check that all required files are present in the `dist` folder, including `manifest.json`.

---

## Notes

- Changes to the source code will require rebuilding the extension and reloading it in Chrome.
- For testing or debugging purposes, open the extension in Chrome and click "Inspect views: background page" for logs and errors.

---

If you encounter any issues or have questions, feel free to reach out for support!
