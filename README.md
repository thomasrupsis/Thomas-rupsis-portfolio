# Thomas Rupsis - Personal Portfolio Website

A personal portfolio website for **Thomas Rupsis** — Trumpet Performer & Music Educator (DCI World Champion Lead Trumpet with the Boston Crusaders, National Trumpet Competition Winner & Finalist, and Educator with Vandegrift High School and Canyon Ridge Middle School).

---

## 🎺 Website Features

1. **Top Navigation Banner & Header**:
   - Custom **TR Trumpet Monogram** in Warm Copper and Graphite Charcoal placed cleanly to the left of "Thomas Rupsis".
   - Five dedicated navigation tabs in order:
     - **Home**
     - **About**
     - **Lessons**
     - **Media**
     - **Contact**
   - Responsive mobile navigation drawer for phones and tablets.
   
2. **Design System & Aesthetics**:
   - **Stationary Background Watermark**: Delicate, fixed TR trumpet monogram watermark centered in the viewport, allowing all content and cards to glide smoothly over it during scrolling.
   - **Color Palette**: Light Mode aesthetic matching the TR monogram logo:
     - Warm Copper / Rose Bronze (`#B26B57`, `#C88370`, `#8F4F3D`): Active accents, buttons, and badges.
     - Graphite Charcoal (`#363A3E`, `#1E2124`, `#61676D`): Crisp editorial headings and typography.
     - Warm Alabaster / Porcelain (`#FAF7F5`, `#F3EDE8`): Soft, glare-free light canvas.
   - **Typography**: Editorial serif (*Newsreader*) paired with accessible modern sans-serif (*Inter*).

3. **Curated Pages & Content**:
   - **Home**: Hero banner with Thomas's headshot, key career statistics, distinguished affiliations ticker (Boston Crusaders, NTC, Vandegrift HS, Texas Tech University), and core disciplines.
   - **About**: Detailed biography tracing his musical path from Billings, Montana to Texas Tech University; Lead Trumpet DCI World Championship and Jim Ott High Brass Award history; 2027 Madison Scouts brass staff appointment; FOOSA Philharmonic, Mexico City EuroJazz, and NTC accolades; studio study under Dr. Julia Bell and Dr. Kevin Whalen.
   - **Lessons**: Teaching philosophy ("Playing the trumpet should feel natural and musical", personalized instruction, competitive rates with flexible availability); distinct offering tiers for Middle School, High School, and Clinics & Tech.
   - **Media**: Recordings & excerpts showcase ("Recordings Coming Soon!") featuring placeholders for Solo Repertoire, Chamber & Ensemble, and Marching Arts Excerpts.
   - **Contact**: Dedicated page view highlighting direct contact information and quick messaging.

4. **Persistent Contact Section on Every Page**:
   - Available at the bottom of every page view (Home, About, Lessons, Media, Contact) with uniform 3-column input fields for **Name**, **Email**, and **Phone**, plus **Message** and a warm copper **Send Message** button.

5. **Clean Site Footer**:
   - Lightweight footer on every page with copyright information and quick-jump navigation links.

---

## 🚀 Running Locally

To view or edit the website locally:

```bash
# Navigate to the project directory
cd /Users/thomasrupsis/.gemini/antigravity/scratch/thomas-rupsis-portfolio

# Start a local web server (Python 3)
python3 -m http.server 8085
```

Then open `http://localhost:8085` in your browser.

---

## 🌐 Easy Deployment Options

- **GitHub Pages**: Push this directory to a GitHub repository, head to **Settings > Pages**, and set the branch to `main`.
- **Netlify**: Drag and drop the `thomas-rupsis-portfolio` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop) for instant global hosting.
- **Vercel**: Run `npx vercel` inside this folder to deploy within seconds.
