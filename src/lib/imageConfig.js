// Central image helper: returns src and optionally srcSet for responsive images
export function responsiveImage(path, widths = [320, 640, 960, 1280]) {
  // For Vite static assets under public/, path is served as-is
  const src = path
  const srcSet = widths.map(w => `${path} ${w}w`).join(', ')
  return { src, srcSet }
}
