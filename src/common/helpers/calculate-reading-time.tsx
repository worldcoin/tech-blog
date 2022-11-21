export const calculateReadingTime = (data: string) =>
  data.split(/\s+?/).length / Number(process.env.NEXT_PUBLIC_READING_SPEED_IN_WORDS_PER_MINUTE || 200)
