# Innova Decor — edit and publish your website

This is a small static website. Open `index.html` in your browser to preview it. No coding setup, server, or build tools are required. The site files in this folder can be uploaded together as-is.

## Change your business details and colors

Open **`settings.js`** in a text editor (Notepad is fine). This is the one place for your business name, phone, WhatsApp number, email, address, hours, social links, and main colors. Replace the sample values and save.

- Use the full international dialing code for WhatsApp, digits only: India `919876543210` (no `+`, spaces, or hyphens).
- To change the colors, replace the hex values in `colors`. Example: `accent: "#b08d57"`.
- Your logo is used in the header and footer as `images/INNOVA_Decor_Gold_Monogram_Logo-removebg-preview.png`. Replace that image with a new one using the same filename to update the logo without editing the page.
- The phone numbers from the flyer are in `phoneDisplay`, `phoneWhatsApp`, and `otherPhoneNumbers` in `settings.js`.
- To add your social pages, paste the full Instagram profile URL into `instagram` and your YouTube channel URL into `youtube` in `settings.js`. The links appear in the footer. (The Facebook link can be changed there too.)
- The contact form now opens WhatsApp with the visitor’s details and enquiry filled in. The visitor taps **Send** in WhatsApp to submit it. Make sure `phoneWhatsApp` in `settings.js` is your correct WhatsApp number.

## Add or edit a catalogue item

Open **`catalogue.js`**. Each `{ ... }` block is one product. The products pictured on your flyer have been added with their own cropped images in `images/`. Copy a complete block, paste it after another product (add a comma between blocks), and edit its fields:

```js
{ name:"Your product", category:"Furniture", price:"₹12,000",
  image:"images/your-photo.jpg", images:["images/your-photo.jpg"],
  description:"A short description.", size:"50 × 40 cm", material:"Solid wood" }
```

The current categories cover wall panels, flooring, ceilings, wall coverings, partitions, windows and blinds, plus more. The filters are created automatically from the categories in the file. To use your own photo, add it to the `images` folder next to `index.html`, then use its path as shown above. For the best result use a clear, landscape or square image, ideally under 500 KB. Set `price:""` if you prefer to invite enquiries instead.

## Replace the photos

Product photo crops from your supplied flyer are stored in `images/`. To swap a product image, edit its `image` (card photo) and `images` (photos inside the detail popup) in `catalogue.js`. The hero, story, and gallery photos are in `index.html`; search for `images.unsplash.com` to find them. Replace each URL with your own URL or a local path such as `images/living-room.jpg`. Change the accompanying `alt` text to describe your photo.

For mobile compatibility, the uploaded AVIF/WebP product pictures are also supplied as JPGs and the catalogue uses the JPG versions.

## Open the website on a phone

Download the ZIP and extract the whole archive first. Keep `index.html`, the JavaScript/CSS files, and the `images` folder together in the extracted website folder. Then open that `index.html`. Do not open the HTML by itself from inside a ZIP preview or copy only that one file, because the photos are separate files inside `images/`. For a shareable public link, upload the complete extracted folder to Netlify or GitHub Pages.

## Publish for free

### Netlify Drop

1. Make a copy of this whole `outputs` folder on your computer and update `settings.js`, `catalogue.js`, and your images.
2. Sign in to Netlify and open its manual deploy / drag-and-drop page.
3. Drag the website folder (the folder containing `index.html`, `styles.css`, and the JavaScript files) into the deploy area.
4. Netlify gives you a public website address. You can later drag an updated folder to deploy your changes.

### GitHub Pages

1. Create a GitHub repository and upload all these website files and your `images` folder.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Once GitHub finishes publishing, it shows the website link in the Pages settings. Uploading changed files publishes your updates.

## Your files

- `index.html` — page content and section structure
- `settings.js` — business details and colors
- `catalogue.js` — product list
- `styles.css` — visual styling and mobile layout
- `app.js` — filters, popups, carousel, menu, and enquiry behavior
- `images/` — your logo and the product images cropped from the supplied flyer

To customize the design or page layout, get help editing `index.html` and `styles.css`; for day-to-day changes you only need `settings.js` and `catalogue.js`.
