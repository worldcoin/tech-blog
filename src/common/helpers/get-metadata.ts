import {calculateReadingTime} from 'common/helpers'
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

export function getMetadata(arg: ReactElement | string, url: string, tag = 'pagemeta') {
  const meta: Partial<PageMeta> = {
    url,
  }

  try {
    const pageString = typeof arg === 'string' ? arg : renderToString(arg)
    const pageHtml = parse(pageString)
    const metaElement = pageHtml.querySelector(tag)

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
    } else {
      meta.title = pageHtml
        .querySelectorAll('h1,h2,h3,h4,h5,h6')
        .sort((a, b) => b.tagName.localeCompare(a.tagName))[0].textContent
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
  } catch (err) {
  } finally {
    return meta as PageMeta
  }
}
