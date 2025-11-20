# Interactive Book Website

A beautiful, interactive book website with realistic page-turning animations.

## Features

- ✨ Realistic page-turning animations
- 🖼️ Support for images on each page
- ⚡ Preloads all assets before displaying the book
- 📱 Responsive design
- ⌨️ Keyboard navigation (arrow keys)
- 🎨 Beautiful gradient background
- 📖 Dynamic page system - easily add more pages

## How to Use

### Adding Pages

Edit the `book-data.js` file and add page objects to the `bookPages` array:

```javascript
const bookPages = [
    {
        title: "Page Title",           // Main heading
        subtitle: "Optional Subtitle", // Optional subtitle
        content: "Your text content here...",
        image: "path/to/image.jpg"    // Optional image URL
    },
    // Add more pages...
];
```

### Page Properties

Each page object can have:
- **title** (optional): Main heading of the page
- **subtitle** (optional): Secondary heading
- **content** (optional): Text content for the page
- **image** (optional): URL or path to an image (supports both relative and absolute URLs)

### Adding Images

1. Create an `images` folder in the same directory
2. Add your images to the folder
3. Reference them in `book-data.js`:

```javascript
{
    title: "My Page",
    content: "Some text...",
    image: "images/my-image.jpg"
}
```

Or use external URLs:

```javascript
{
    title: "My Page",
    content: "Some text...",
    image: "https://example.com/image.jpg"
}
```

### Opening the Book

Simply open `index.html` in a web browser. The book will:
1. Show a loading screen
2. Preload all images
3. Display the book with page-turning animations

### Navigation

- Click "Next →" button to turn pages forward
- Click "← Previous" button to go back
- Use keyboard arrow keys: → (right) and ← (left)

## File Structure

```
book/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Book functionality and page-turning logic
├── book-data.js        # Your book content (edit this to add pages)
└── README.md           # This file
```

## Customization

### Colors
Edit `styles.css` to change:
- Background gradient: Search for `background: linear-gradient`
- Page color: `.page { background: #fffef0 }`
- Button colors: `.nav-btn { background: linear-gradient }`

### Page Size
Adjust in `styles.css`:
```css
.book {
    width: 800px;  /* Change width */
    height: 600px; /* Change height */
}
```

### Animation Speed
Modify in `styles.css`:
```css
.page {
    transition: transform 0.8s; /* Change 0.8s to your preferred speed */
}
```

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Tips

- Keep page content concise for better readability
- Use high-quality images (will be resized to fit)
- Images are automatically centered and scaled
- The book is fully responsive and works on mobile devices

Enjoy your interactive book! 📚
# book
