export const renderReadTime = (readTime: number, short = false) =>
  readTime < 1 ? `<1${short ? 'm' : ' minute'} read` : `${Math.round(readTime)}${short ? 'm' : ' minute'} read`
