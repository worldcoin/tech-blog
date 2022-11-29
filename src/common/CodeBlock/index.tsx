import Highlight, {defaultProps, Language, Prism} from 'prism-react-renderer'
import {Fragment, memo, ReactNode, useMemo} from 'react'

if (typeof global !== 'undefined') {
  // @ts-expect-error
  global.Prism = Prism
} else if (typeof window !== 'undefined') {
  // @ts-expect-error
  window.Prism = Prism
}

require('prismjs/components/prism-java')

export const CodeBlock = memo(function CodeBlock(props: {
  children?: ReactNode
  className?: string
  language?: Language
  showLines?: boolean
}) {
  const language = useMemo(
    () => props.language || props.className?.match(/language-(.*)\b/)?.[1] || 'javascript',
    [props],
  )

  if (!props.children) {
    return null
  }

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      language={language as Language}
      code={String(props.children).trimEnd()}
    >
      {({className, style, tokens, getTokenProps}) => (
        <code className={className} style={style}>
          {tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line
                .filter((token) => {
                  return !token.empty
                })
                .map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({token})} />
                ))}

              {tokens.length > 1 && '\n'}
            </Fragment>
          ))}
        </code>
      )}
    </Highlight>
  )
})
