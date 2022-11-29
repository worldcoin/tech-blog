export const renderReadTime = (readTime: number, short = false) =>
  readTime < 1 ? 'Less than minute read' : `${Math.round(readTime)}${short ? 'm' : ' minute'} read`
