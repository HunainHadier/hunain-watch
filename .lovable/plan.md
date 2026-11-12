# Vintage Luxury Watch Store (frontend demo)

## Look & feel (from reference image)
- Dark walnut/espresso backgrounds, black, warm beige text, subtle gold accents; no bright colors or loud gradients.
- Bold wide uppercase headings (Oswald-style) + italic spaced subheads; elegant serif (Cormorant) for product names; clean sans body (Karla).
- Outlined, slightly rounded uppercase buttons like "CUSTOMIZE YOURS"; gold-filled primary variant.
- Generated premium photography: hero flat-lay on leather/wood, ~8 vintage watch product shots, about/promo images.

## Pages
- Home (/): full-bleed hero "Vintage, Made Yours", featured watches, new arrivals, promotional band.
- Shop (/shop): product grid with category filters (All, Chronograph, Dress, Diver, Field).
- Product details (/product/$id): image, name, price, description, specs table, quantity + Add to Cart.
- Cart (/cart): items, quantity controls, remove, subtotal/total, checkout link.
- Checkout (/checkout): customer + delivery form with validation, order summary, demo confirmation that clears cart.
- About (/about), Contact (/contact: info + validated form), Login (/login), Register (/register with confirm password check).

## Shared
- Sticky navbar with logo, links, cart count badge, login icon; mobile slide-out menu.
- Consistent footer; reusable ProductCard, SectionHeading, PageHeader, form fields.
- Cart state in React context, saved to localStorage; toast feedback on add.

## Technical
- TanStack routes per page with unique head() metadata; sample data in a products module.
- Design tokens in styles.css (oklch), fonts via link in root head; zod for form validation.
- No backend; no extra pages.
