import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useResizeObserver } from 'lib/hooks/useResizeObserver'
import { CSSTransition, Transition } from 'react-transition-group'
import { InsightColor } from '~/types'
import { LemonDivider } from 'lib/components/LemonDivider'
import { LemonButton } from 'lib/components/LemonButton'
import { IconSubtitles, IconSubtitlesOff } from 'lib/components/icons'
import { More } from 'lib/components/LemonButton/More'
import './Card.scss'

export interface Resizeable {
    showResizeHandles?: boolean
    canResizeWidth?: boolean
}

export interface CardMetaProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
    setPrimaryHeight?: (primaryHeight: number | undefined) => void
    areDetailsShown?: boolean
    setAreDetailsShown?: React.Dispatch<React.SetStateAction<boolean>>
    ribbonColor?: InsightColor | null
    /** Whether the editing controls should be enabled or not. */
    showEditingControls?: boolean
    /** Whether the  controls for showing details should be enabled or not. */
    showDetailsControls?: boolean
    meta?: JSX.Element | null
    metaDetails?: JSX.Element | null
    moreButtons?: JSX.Element | null
    topHeading?: JSX.Element | null
}

export function CardMeta({
    setPrimaryHeight,
    ribbonColor,
    showEditingControls,
    showDetailsControls,
    meta,
    metaDetails,
    moreButtons,
    topHeading,
    areDetailsShown,
    setAreDetailsShown,
    className,
}: CardMetaProps): JSX.Element {
    const { ref: primaryRef, height: primaryHeight, width: primaryWidth } = useResizeObserver()
    const { ref: detailsRef, height: detailsHeight } = useResizeObserver()

    useEffect(() => {
        setPrimaryHeight?.(primaryHeight)
    }, [primaryHeight])

    const foldedHeight = `calc(${primaryHeight}px + 1rem /* margins */ + 1px /* border */)`
    const unfoldedHeight = `calc(${primaryHeight}px + ${
        detailsHeight || 0
    }px + 2.5rem /* margins */ + 3px /* border and spacer */)`
    const transitionStyles = primaryHeight
        ? {
              entering: {
                  height: unfoldedHeight,
              },
              entered: {
                  height: unfoldedHeight,
              },
              exiting: { height: foldedHeight },
              exited: { height: foldedHeight },
          }
        : {}

    const showDetailsButtonLabel = !!primaryWidth && primaryWidth > 480

    return (
        <CSSTransition in={areDetailsShown} timeout={200} classNames="CardMeta--expansion">
            {(transitionState) => (
                <div className={clsx('CardMeta', className)} style={transitionStyles[transitionState]}>
                    <div className="CardMeta__primary" ref={primaryRef}>
                        {ribbonColor &&
                            ribbonColor !==
                                InsightColor.White /* White has historically meant no color synonymously to null */ && (
                                <div className={clsx('CardMeta__ribbon', ribbonColor)} />
                            )}
                        <div className="CardMeta__main">
                            <div className="CardMeta__top">
                                <h5>{topHeading}</h5>
                                <div className="CardMeta__controls">
                                    {showDetailsControls && setAreDetailsShown && (
                                        <LemonButton
                                            icon={!areDetailsShown ? <IconSubtitles /> : <IconSubtitlesOff />}
                                            onClick={() => setAreDetailsShown((state) => !state)}
                                            type="tertiary"
                                            status="primary-alt"
                                            size={'small'}
                                        >
                                            {showDetailsButtonLabel && `${!areDetailsShown ? 'Show' : 'Hide'} details`}
                                        </LemonButton>
                                    )}
                                    {showEditingControls && <More overlay={moreButtons} />}
                                </div>
                            </div>
                            {meta}
                        </div>
                    </div>
                    <LemonDivider />
                    <Transition in={areDetailsShown} timeout={200} mountOnEnter unmountOnExit>
                        <div ref={detailsRef}>{metaDetails}</div>
                    </Transition>
                </div>
            )}
        </CSSTransition>
    )
}
