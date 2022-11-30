import clsx from 'clsx'
import {fetchApi} from 'common/helpers'
import {Icon} from 'common/Icon'
import {memo, useCallback, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
type FormValues = Record<string, string>
type Status = 'success' | 'error' | 'default'

type State = {
  status: Status
  isLoading: boolean
}

export const SubscribeFormBase = memo(
  (props: {
    stateToButtonLabel?: (state: State) => string
    stateToCaption?: (state: State) => string
    className?: string
    country?: string
    placeholder?: string
    inputClassName?: string
    isStaticArrow?: boolean
    underline?: 'full' | 'field'
    variant?: 'default' | 'cta'
    staticCaption?: boolean
  }) => {
    const {handleSubmit, formState, register, reset} = useForm<FormValues>({mode: 'all'})
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<Status>('default')
    const buttonLabel = useMemo(() => props.stateToButtonLabel?.({isLoading, status}) || '', [status, isLoading, props])
    const caption = useMemo(() => props.stateToCaption?.({isLoading, status}) || '', [status, isLoading, props])
    const variant = useMemo(() => props.variant ?? 'default', [props.variant])

    const submit = useCallback(
      async (values: FormValues) => {
        if (!values.email) {
          return
        }

        if (status === 'success') {
          reset()
          return setStatus('default')
        }

        try {
          setIsLoading(true)

          const result = await fetchApi(`/subscribe`, {
            body: {...values, ...(props.country && {country: props.country})},
          })

          setIsLoading(false)

          if (result.error) {
            console.error(result)
            return setStatus('error')
          }

          if (result.status === 'errored' || result.status === 'failed') {
            console.error(result)
            return toast.error('Some error occurred, try again later')
          }

          return setStatus('success')
        } catch (error) {
          setIsLoading(false)
          console.log(error)
          return toast.error('Something went wrong')
        }
      },
      [status, reset, props.country],
    )

    return (
      <form
        onSubmit={handleSubmit(submit)}
        className={clsx(
          props.className,
          'group relative grid gap-x-2 grid-cols-1fr/auto py-1 disabled:opacity-50 transition-colors',
          {
            'border-b': props.underline !== 'field',

            'border-dadada focus-within:border-183c4a hover:border-183c4a':
              status === 'default' && variant === 'default',

            'border-010101/20 hover:border-010101 focus-within:border-010101':
              status === 'default' && variant === 'cta',
          },
        )}
      >
        <input
          {...register('email', {required: true})}
          disabled={isLoading}
          className={clsx(
            'text-16 sm:text-14 outline-none disabled:opacity-50 transition-colors bg-transparent',
            {
              'border-b border-inherit': props.underline === 'field',

              'placeholder:text-current [-webkit-text-fill-color:_#8c8c92] group-focus-within:[-webkit-text-fill-color:_#183c4a]':
                status === 'default' && variant === 'default',

              'placeholder:text-current': status === 'default' && variant === 'cta',
            },
            props.inputClassName,
          )}
          placeholder={props.placeholder}
        />

        <div
          className={clsx(
            'absolute -bottom-px h-px from-ff6848 to-7068fa bg-gradient-to-r transition-all duration-700',
            isLoading ? 'w-full' : 'z-[-1] w-0',
          )}
        />

        <button
          type="submit"
          disabled={isLoading || !formState.isValid}
          className={clsx(
            'flex items-center font-normal whitespace-nowrap disabled:opacity-60',
            'disabled:hover:text-current transition-colors',
            {
              'text-8c8c92 hover:text-7068fa': variant === 'default',
              'text-010101 hover:text-7068fa': variant === 'cta',
            },
          )}
        >
          {buttonLabel}

          <Icon
            name="arrow-right"
            className={clsx('ml-2 -mt-0.5 w-[.65em] h-[.65em]', {
              'lg:group-hover:ml-4 lg:group-hover:-mr-2 transition-all': !props.isStaticArrow,
            })}
          />
        </button>

        <div
          className={clsx(
            'grid gap-x-1.5 grid-cols-auto/1fr items-center',
            'transition-all duration-500',
            {'col-span-2 transition-all': props.staticCaption},
            {'mt-2 absolute right-0 -bottom-2 translate-y-full': !props.staticCaption},
            {'h-0 text-[0px]': status === 'default' && props.staticCaption},
            {'h-auto': status !== 'default' && props.staticCaption},
            status === 'error' ? 'text-f1512f' : 'text-183c4a',
            status === 'default' ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Icon name={status === 'error' ? 'exclamation-mark' : 'check'} className="w-3.5 h-3.5" />

          <span>{caption}</span>
        </div>
      </form>
    )
  },
)
