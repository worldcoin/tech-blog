import {SubscribeFormBase} from 'common/SubscribeFormBase'
import {memo, useCallback} from 'react'

export const SubscribeForm = memo(
  (props: {
    buttonLabel?: string
    className?: string
    placeholder?: string
    inputClassName?: string
    isStaticArrow?: boolean
    underline?: 'full' | 'field'
    variant?: 'default' | 'cta'
  }) => {
    const stateToButtonLabel = useCallback(
      ({status}: {status: string}) => {
        if (status === 'success') {
          return 'Add another email'
        }

        return props.buttonLabel || 'Submit'
      },
      [props.buttonLabel],
    )

    const stateToCaption = useCallback(({status}: {status: string}) => {
      if (status !== 'success') {
        return 'Invalid email address'
      }

      return 'You successfully signed up'
    }, [])

    return (
      <SubscribeFormBase
        className={props.className}
        inputClassName={props.inputClassName}
        stateToButtonLabel={stateToButtonLabel}
        stateToCaption={stateToCaption}
        placeholder={props.placeholder ? props.placeholder : 'Get Email Updates'}
        isStaticArrow={props.isStaticArrow}
        underline={props.underline}
        variant={props.variant}
      />
    )
  },
)
