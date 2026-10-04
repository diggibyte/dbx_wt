# Diggibyte × Databricks World Tour booth page

Interactive "Roll the cube" page for the Databricks World Tour (Mumbai) booth.
Visitors roll a cube to pick an industry; the page shows the storyline, three use cases
(Genie + Ontology, Lakebase, Databricks Apps) and a live-demo flow.

## Structure

```
index.html            Page markup (header, cube section, use-case grid)
css/styles.css        All styling; brand colours are CSS variables in :root
js/storylines.js      Content: industries, use cases, demo steps, industry icons
js/app.js             Cube rotation, reveal animation, attract mode
assets/img/           Diggibyte logo, Databricks logo, Mumbai skyline
assets/icons/         Genie and Lakebase icons
```

No build step and no dependencies. Plain HTML, CSS and JavaScript.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Common edits

| Change | Where |
|---|---|
| Headline and sub-headline | `index.html`, `<header class="hero">` |
| Industry storylines, use cases, demo steps | `js/storylines.js`, `ROWS` |
| Technology names and taglines | `js/storylines.js`, `TECH` |
| Brand colours, fonts | `css/styles.css`, `:root` |
| Auto-roll timing (idle 40 s, then every 20 s) | `js/app.js`, `userAct()` |
| Logos and skyline image | `assets/img/` (keep the same file names) |

## Booth tips

- Press **Space** or the **Roll the cube** button to roll.
- After 40 seconds without interaction the cube rolls on its own every 20 seconds.
- Run the browser in full-screen (F11) on the booth display.

## Notes

- Company names, people and figures in the storylines are illustrative.
- Make sure you have the rights to use the Mumbai skyline illustration and partner logos.
