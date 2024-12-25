export interface ImagePreview {
  thumbnail?: string
  fullRes?: string
}

export function parseImages(htmlContent: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const imageSources: ImagePreview[] = []
  doc.querySelectorAll('img').forEach((el) => {
    const thumbnail = el.src.replace('s320', 's720').replace(/(w|h)\d+-(w|h)\d+/, 's720')
    const fullRes = el.closest('a')?.href
    imageSources.push({
      thumbnail,
      fullRes,
    })
  })
  return imageSources.filter(i => !!i.thumbnail)
}

export function parseParagraphs(htmlContent: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const texts: string[] = []
  doc.querySelectorAll('p, div, span').forEach((el) => {
    const text = el.textContent?.trim() ?? ''
    if (text && !texts.includes(text)) {
      texts.push(text)
    }
  })
  return texts
}
