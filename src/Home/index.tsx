import clsx from 'clsx'
import {Cta} from 'common/Cta'
import {layout} from 'common/styles'
import {SubscribeForm} from 'common/SubscribeForm'
import {HomePageProps} from 'pages'
import {Fragment, memo} from 'react'
import {BlogList} from './BlogList'
import {Hero} from './Hero'

export const Home = memo(function Home(props: HomePageProps) {
  return (
    <Fragment>
      <Hero />
      <BlogList categories={props.categories} posts={props.posts} />

      <section
        className={clsx(
          'flex flex-col gap-12 md:gap-0 md:flex-row justify-between items-center py-28',
          'bg-dde7ea text-010101 dark:bg-7068fa dark:text-ffffff',
          layout.paddingHorizontal,
        )}
      >
        <p className="text-24 md:text-32">
          Stay up to date with <br className="hidden md:inline" /> all things crypto.
        </p>

        <SubscribeForm
          className="text-20"
          inputClassName="!text-20 md:min-w-[428px]"
          placeholder="Enter email"
          underline="field"
          variant="cta"
        />
      </section>

      {/* FIXME: add link */}
      <Cta href={'#!'} text={'Faq'} className="bg-010101 text-ffffff">
        Have questions?
      </Cta>
    </Fragment>
  )
})
