export function parseImages(htmlContent: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const imageSources: string[] = []
  doc.querySelectorAll('img').forEach((el) => {
    imageSources.push(el.src)
  })
  return imageSources.filter(i => !!i)
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
