# web-development-part3
# WEDE 5112


# STUDENT INFORMATION

Student Name : Mohlala Leeto Ngwato
Student Number: ST10515948

# PROJECT OVERVIEW

The project is a website designed for a vehicle mechanic workshop. It was designed using html and css for styling.
In the website there are  five html pages the home, enquiry, service, contact and about us pages, there is also one
CSS file. The home page is where you find the information about the workshop and the menu to other page, the enquiry 
page is where to find the menu and the map to the workshop, service page you find the menu and also what the workshop 
specifically specializes about, contact page there is a menu and the contact informations and on the about us page you
will find the history, mission and vision and also images of the workshop. However there is an address of the workshop
on each html page. The CSS page is for styling the website.


# KEY FEATURES AND FUNCIONALITY

The website was designed using html and css. HTML as the foundation of the website and CSS
to add style to the website.


# TIMELINE AND MILESTONES


# PART 2 DETAILS

Part is about applying CSS to the website to modify the website.


# SITEMAP

MOHLALA WORKSHOP WEBSITE -
|
|
|____ [index.html] ----(home page)
|
|
|_____ [enquiries.html]----(Enquiries page)
|
|
|_____ [services.html]------( services page)
|
|
|_____ [contact.html]----(contact page)
|
|
|_____[about_us.html]------( about page)
|
|
|______[styling.css]-------( Decorating style to the html file)
|
|
|_____________[script.js]--------(adding programming language to program some of the website elements)



# CHANGELOG

The modifications  on the html files, I added some comments to my html files.

.On the index file I added a fabicon, new title, the header and the main tags. I
 placed the footer tag in the body tag, and a button tag om the location link. 

.On the enquiry file I added a fabicon, new title, the header and the main tags. I
 placed the footer tag in the body tag. and a button tag om the location link. I 
 also added a map.

 .On the contact file I added a fabicon, new title, the header and the main tags. I
 placed the footer tag in the body tag, and a button tag om the location link. I
 added icons on the contact lists.

.On the service file I added a fabicon, new title, the header and the main tags. I
 placed the footer tag in the body tag, and a button tag om the location link. 

.On about us  file I added a farbicon, new title, the header and the main tags. I
 placed the footer tag in the body tag, and a button tag om the location link. 








 ### Mohlala Workshop Website (Part 3)

## Part 3 features
- Interactive elements: FAQ accordion (index), lightbox gallery (aboutus), Leaflet interactive map (contact), mobile menu toggle, fade-in on scroll and hover effects.
- Dynamic content: service cards are created by JavaScript from the `SERVICES` array in `script.js`.
- Search / filter / sort:services page has live search, category filter and sort by name or price.
- enquiry.html: JS validation with messages beside each field, calculates an estimated cost, shows availability for the chosen date, submits with `fetch` (AJAX) to Formspree.
- contact.html: JS validation, then builds a `mailto:` email to the workshop address.
- SEO: unique title and description per page, one `<h1>` per page, alt text on all images, clean lowercase file names, internal links, `robots.txt`, `sitemap.xml`, mobile viewport tag.
- Security: inputs validated, `maxlength` limits, user text escaped before display, `rel="noopener noreferrer"` on external links, HTTPS via host.
- Page speed: `loading="lazy"` and width/height on images, one deferred script file.

## Setup before submitting
1. In `script.js` set `recipientEmail` and check the map coordinates.
2. Replace `YOUR_FORM_ID` in `enquiry.html` with your Formspree form ID.
3. Replace `YOUR-USERNAME/YOUR-REPO` in `sitemap.xml` and `robots.txt`.
4. Rename `Enquiry.html` to `enquiry.html` in Git (`git mv Enquiry.html enquiry.html`).
5. Compress images (e.g. squoosh.app).

## Off-page SEO plan
- Backlinks: ask local business directories, the Jane Furse community pages and suppliers to link to the site.
- Social media: share photos and offers on Facebook and WhatsApp Status with the site link.
- Local SEO: create a Google Business Profile for the workshop, and use "Jane Furse, Limpopo" in page text.

## Changelog
### Part 2 fixes (add the marker's own feedback points here too)
- `styling.css`: fixed broken first-line comment, which stopped the CSS reset working.
- `styling.css`: removed invalid `h1` colour value; improved menu and button colour contrast.
- `styling.css`: replaced fixed image heights with `max-width:100%; height:auto; object-fit:cover` so images are not squashed.
- All pages: replaced invalid `<image>` tags with `<img>` and added alt text.
- `services.html`: fixed empty `initial-scale=` so the page works on phones.
- `contact.html`, `services.html`: fixed CSS path to `cssfolder/styling.css`.
- All pages: one `<h1>` per page, headings in order, closed the broken `<h1>` tag.
- `contact.html`: merged two `<main>` tags into one; fixed email address; phone numbers now use digit 0.
- `services.html`: services shown from a data array instead of `<h3>` tags used for styling.
- All pages: unique title and description; fixed typos ("fear prices", "certicfate").
- All pages: replaced five script files with one `script.js`.
- `Enquiry.html` renamed to `enquiry.html`.
- `aboutus.html`: "version" corrected to "vision"; grid changed to fit the two boxes.
### Part 3 additions
- Added the accordion, lightbox, Leaflet map, mobile menu, animations, dynamic service cards with search/filter/sort.
- Added JS validation, quote and availability response, AJAX submission and mailto builder.
- Added `robots.txt` and `sitemap.xml`.

## References
- Leaflet: https://leafletjs.com
- OpenStreetMap: https://www.openstreetmap.org
- Formspree: https://formspree.io
- MDN Web Docs (forms, fetch, IntersectionObserver): https://developer.mozilla.org
- Google Search Central SEO starter guide: https://developers.google.com/search/docs
