export function parseImages(htmlContent: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const imageSources: string[] = []
  doc.querySelectorAll('img').forEach((el) => {
    imageSources.push(el.src)
  })
  return imageSources
}

export function parseParagraphs(htmlContent: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const texts: string[] = []
  doc.querySelectorAll('p').forEach((el) => {
    texts.push(el.innerText.trim())
  })
  return texts
}
