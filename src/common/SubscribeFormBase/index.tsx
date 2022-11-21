import clsx from 'clsx'
import {Icon} from 'common/Icon'
import getConfig from 'next/config'
import {memo, useCallback, useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
const {publicRuntimeConfig} = getConfig()
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
    isTransparent?: boolean
    isStaticArrow?: boolean
    underline?: 'full' | 'field'
    staticCaption?: boolean
  }) => {
    const {handleSubmit, formState, register, reset} = useForm<FormValues>({mode: 'all'})
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<Status>('default')

    const buttonLabel = useMemo(() => props.stateToButtonLabel?.({isLoading, status}) || '', [status, isLoading, props])

    const caption = useMemo(() => props.stateToCaption?.({isLoading, status}) || '', [status, isLoading, props])

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

          const response = await fetch(`${publicRuntimeConfig.NEXT_PUBLIC_APP_URL}/api/subscribe`, {
            body: JSON.stringify({...values, ...(props.country && {country: props.country})}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
          })

          setIsLoading(false)
          const result = await response.json()

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
          'text-183c4a',
          {'border-b': props.underline !== 'field'},
          {'border-dadada focus-within:border-183c4a hover:border-183c4a': status === 'default'},
          {'border-183c4a': status !== 'default'},
        )}
      >
        <input
          {...register('email', {required: true})}
          disabled={isLoading}
          className={clsx(
            'text-16 sm:text-14 placeholder:text-8c8c92 outline-none disabled:opacity-50 transition-colors',
            'bg-transparent autofill:[-webkit-text-fill-color:red]',
            {'border-b border-inherit': props.underline === 'field'},
            {'text-8c8c92 group-hover:focus:placeholder:text-8c8c92/0 focus:text-183c4a': status === 'default'},
            {'group-hover:placeholder:text-183c4a group-hover:text-183c4a': status === 'default'},
            {'text-183c4a': status !== 'default'},
            props.inputClassName,
            {'bg-transparent': props.isTransparent},
          )}
          placeholder={props.placeholder}
        />

        <div
          className={clsx(
            'absolute -bottom-px h-px from-ff6848 to-4940e0 bg-gradient-to-r transition-all duration-700',
            isLoading ? 'w-full' : 'z-[-1] w-0',
          )}
        />

        <button
          type="submit"
          disabled={isLoading || !formState.isValid}
          className={clsx(
            'flex items-center font-normal whitespace-nowrap text-8c8c92 hover:text-4940e0 disabled:opacity-60',
            'disabled:hover:text-current transition-colors',
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
