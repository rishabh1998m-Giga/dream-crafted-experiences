# Editorial image redesign

## What will change
- Remove the “Why Dream Corner” philosophy section from the homepage.
- Redesign Selected Work as a varied editorial sequence rather than six matching rectangular cards, while preserving the sideways scroll and project details.
- Give the story imagery an asymmetric layered composition with distinctive silhouettes and controlled overlap.
- Replace the square social grid with a rhythmic gallery using mixed portrait, landscape, and inset crops.
- Restyle service image previews with a more sculptural framed treatment instead of a plain rectangle.
- Keep all existing photos, wording, links, interactions, and the overall purple, ivory, and gold visual language.

## Responsive behavior
- Preserve the cinematic horizontal experience on larger screens.
- Use a smooth swipeable editorial strip on phones, with stable image dimensions and no clipped text or horizontal page overflow.
- Simplify overlaps on narrow screens so every image remains clear and touch-friendly.

## Verification
- Check the full homepage at desktop and phone widths.
- Confirm sideways scrolling, service previews, links, and image loading still work.
- Confirm the homepage has no layout overflow, runtime errors, or build errors.

## Technical details
- Update the homepage section composition and the existing image-bearing components only.
- Build the new silhouettes with CSS clipping, selective corner geometry, offsets, and layered borders using the current semantic design tokens.
- Remove the philosophy import and render call without deleting unrelated reusable code.
