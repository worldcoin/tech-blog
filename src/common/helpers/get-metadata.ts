import {calculateReadingTime} from 'common/helpers/calculate-reading-time'
import {PageMeta} from 'common/types'
import dayjs from 'dayjs'
import parse from 'node-html-parser'
import {ReactElement} from 'react'
import {renderToString} from 'react-dom/server'

/**
 * Parse metadata from ReactElement or html string
 * @param arg {ReactElement | string} React element or html string
 * @param metaTag {string} Sought-for html tag which contains metadata
 */
// eslint-disable-next-line complexity -- cannot simplify
export function getMetadata(arg: ReactElement | string, options?: {tag?: string; url?: string}) {
  const meta: Partial<PageMeta> = {}

  try {
    const pageString = typeof arg === 'string' ? arg : renderToString(arg)
    const pageHtml = parse(pageString)
    const metaElement = pageHtml.querySelector(options?.tag ?? 'pagemeta')

    if (!metaElement) {
      throw new Error('Cannot find meta element')
    }

    const titleElement = metaElement.querySelector(':scope > title')
    const authorElement = metaElement.querySelector(':scope > author')
    const descriptionElement = metaElement.querySelector(':scope > description')
    const dateElement = metaElement.querySelector(':scope > date')
    const posterElement = metaElement.querySelector(':scope > poster')
    const categoryElement = metaElement.querySelector(':scope > category')
    const readTimeElement = metaElement.querySelector(':scope > readtime')

    if (titleElement) {
      meta.title = titleElement?.textContent
    }

    if (descriptionElement) {
      meta.description = descriptionElement?.textContent
    }

    if (authorElement) {
      meta.author = {
        name: authorElement?.textContent,
        picture: authorElement.getAttribute('picture'),
      }
    }

    if (dateElement) {
      meta.date = dayjs(dateElement?.textContent).toDate()
    }

    if (posterElement && posterElement.hasAttribute('src')) {
      meta.poster = posterElement.getAttribute('src')
    }

    if (categoryElement) {
      meta.category = categoryElement.textContent
    }

    if (readTimeElement) {
      meta.readTime = Number(readTimeElement.textContent)
    } else {
      // NOTE: remove meta tag for calculate read time
      metaElement.remove()
      meta.readTime = calculateReadingTime(pageHtml.textContent)
    }

    if (options?.url) {
      meta.url = options.url
    }
  } catch (err) {
  } finally {
    return meta
  }
}
