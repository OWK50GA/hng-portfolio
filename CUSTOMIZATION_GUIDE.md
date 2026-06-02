# Portfolio Customization Guide

Quick reference for customizing your portfolio design.

---

## 🎨 Colors & Design Tokens

**File:** `src/app/globals.css`

```css
:root {
  /* Page background - change the main background color */
  --bg-base:      #0d0d0d;   /* Main dark background */
  
  /* Card backgrounds */
  --bg-card:      #111111;   /* Section card background */
  --bg-card-tint: #0f1a18;   /* Project cards (subtle teal tint) */

  /* Accent colors - the two main brand colors */
  --accent-teal:  #2dd4bf;   /* Technical sections (projects, skills) */
  --accent-amber: #fb923c;   /* Learning reflection section */

  /* Borders */
  --border-neutral: #2a2a2a; /* Neutral section borders */

  /* Text colors */
  --text-primary:   #f0f0f0;  /* Headings, important text */
  --text-secondary: #9ca3af;  /* Body text */
  --text-dim:       #6b7280;  /* Meta text, pills */

  /* Accent fills - subtle background tints */
  --fill-teal:  rgba(45, 212, 191, 0.06);  /* Deep dive sub-boxes */
  --fill-amber: rgba(251, 146, 60, 0.07);
}
```

**Quick changes:**
- Want a lighter background? Change `--bg-base` to `#1a1a1a` or lighter
- Want different brand colors? Update `--accent-teal` and `--accent-amber`
- Need more contrast? Adjust `--text-primary` to `#ffffff`

---

## 📐 Layout & Spacing

**File:** `src/app/page.tsx`

### Current Setup (Full-width with responsive padding):

```tsx
<main className="min-h-screen bg-[var(--bg-base)] py-8 sm:py-12 lg:py-16">
  <div className="w-full space-y-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
```

### Padding Options:

**Current responsive padding:**
- Mobile: `px-4` (1rem / 16px)
- Small tablets: `px-8` (2rem / 32px)
- Medium tablets: `px-12` (3rem / 48px)
- Desktop: `px-16` (4rem / 64px)
- Large screens: `px-24` (6rem / 96px)

**Alternative: Centered with max-width:**
```tsx
<div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
```

Max-width options:
- `max-w-3xl` → 768px (narrow, article-style)
- `max-w-4xl` → 896px
- `max-w-5xl` → 1024px (comfortable)
- `max-w-6xl` → 1152px
- `max-w-7xl` → 1280px (wide)

**Section spacing:**
- `space-y-6` → 1.5rem gap between sections
- Want more space? Use `space-y-8` or `space-y-10`

---

## 🔧 Component-Specific Customizations

### 1. Section Cards (`src/components/ui/SectionCard.tsx`)

**Border radius:**
```tsx
className="rounded-xl border bg-[var(--bg-card)] p-5 sm:p-6"
```
- `rounded-xl` → large rounded corners
- Change to `rounded-lg` for less rounding, or `rounded-2xl` for more

**Padding:**
- `p-5 sm:p-6` → padding inside each section card
- Increase to `p-6 sm:p-8` for more breathing room

### 2. Project Cards (`src/components/ui/ProjectCard.tsx`)

**Card styling:**
```tsx
className="rounded-lg border border-[var(--accent-teal)]/30 bg-[var(--bg-card-tint)] p-4"
```
- Border opacity: `/30` → change to `/40` or `/50` for stronger borders
- Padding: `p-4` → increase to `p-5` or `p-6` for more space

### 3. Hero Section (`src/components/sections/HeroSection.tsx`)

**Avatar size:**
```tsx
className="... w-14 h-14 ..."
```
- `w-14 h-14` → 56px circle
- Change to `w-16 h-16` (64px) or `w-20 h-20` (80px) for larger avatar

**Name heading size:**
```tsx
<h1 className="text-[2rem] font-bold ...">
```
- `text-[2rem]` → 32px
- Increase to `text-4xl` (36px) or `text-5xl` (48px) for bigger impact

### 4. Projects Grid (`src/components/sections/HngProjectsSection.tsx`)

**Grid columns:**
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
```
- Mobile: 1 column
- Small screens: 2 columns
- Large screens: 3 columns

**To show more cards per row:**
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
```

**To adjust gap between cards:**
- `gap-4` → 1rem (16px)
- Increase to `gap-6` or `gap-8` for more space

---

## 📝 Content Changes

**File:** `src/data/hng-projects.ts`

All your portfolio content lives here:

- `hero` → Your name, title, bio, social links
- `projects` → HNG project descriptions and metrics
- `deepDive` → Featured case study (currently Stage 4b)
- `skills` → Skill groups with stage references
- `reflections` → Honest reflection paragraphs
- `contact` → Social/contact links

Just edit the strings in this file to update your content.

---

## 🎯 Quick Wins

### Make text larger everywhere:
In `src/app/globals.css`, add to the `@theme inline` block:
```css
--font-size-base: 1rem;  /* Increase to 1.125rem for 18px base */
```

### More spacing between sections:
In `src/app/page.tsx`:
```tsx
<div className="... space-y-8">  <!-- was space-y-6 -->
```

### Lighter background:
In `src/app/globals.css`:
```css
--bg-base: #1a1a1a;  /* was #0d0d0d */
--bg-card: #1f1f1f;  /* was #111111 */
```

### Different accent color:
In `src/app/globals.css`:
```css
--accent-teal: #10b981;  /* Green instead of teal */
```

---

## 🔍 Where to Find Things

| What you want to change | File to edit |
|------------------------|--------------|
| Colors, fonts | `src/app/globals.css` |
| Page layout, spacing | `src/app/page.tsx` |
| Section card style | `src/components/ui/SectionCard.tsx` |
| Project card style | `src/components/ui/ProjectCard.tsx` |
| Text content | `src/data/hng-projects.ts` |
| Hero appearance | `src/components/sections/HeroSection.tsx` |
| Projects grid layout | `src/components/sections/HngProjectsSection.tsx` |

---

## 💡 Pro Tips

1. **Preview changes instantly:** Run `pnpm dev` and open http://localhost:3000
2. **All spacing uses Tailwind:** `p-4` = padding, `gap-4` = gap, `space-y-6` = vertical spacing
3. **Responsive breakpoints:**
   - `sm:` → 640px+
   - `md:` → 768px+
   - `lg:` → 1024px+
   - `xl:` → 1280px+
4. **CSS variables:** All `var(--name)` values are defined in `globals.css`

---

Need help with something specific? Check the file paths above and look for the relevant className or CSS variable!
