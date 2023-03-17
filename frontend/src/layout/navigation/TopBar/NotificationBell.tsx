import { IconArrowDropDown, IconInfo, IconNotification, IconWithCount } from 'lib/lemon-ui/icons'
import { notificationsLogic } from '~/layout/navigation/TopBar/notificationsLogic'
import { useActions, useValues } from 'kea'
import clsx from 'clsx'
import { Popover } from 'lib/lemon-ui/Popover/Popover'
import { LemonDivider } from 'lib/lemon-ui/LemonDivider'
import { usePageVisibility } from 'lib/hooks/usePageVisibility'
import { ActivityLogRow } from 'lib/components/ActivityLog/ActivityLog'
import './NotificationsBell.scss'
import { Tooltip } from 'lib/lemon-ui/Tooltip'

export function NotificationBell(): JSX.Element {
    const { unreadCount, hasNotifications, notifications, isNotificationPopoverOpen, hasUnread } =
        useValues(notificationsLogic)
    const { toggleNotificationsPopover, togglePolling } = useActions(notificationsLogic)

    usePageVisibility((pageIsVisible) => {
        togglePolling(pageIsVisible)
    })

    return (
        <Popover
            visible={isNotificationPopoverOpen}
            onClickOutside={toggleNotificationsPopover}
            overlay={
                <div className="activity-log notifications-menu">
                    <h5>
                        Notifications{' '}
                        <Tooltip
                            title={
                                'Notifications shows you changes other users make to Insights and Feature Flags that you created.'
                            }
                            placement={'bottom'}
                        >
                            <IconInfo className="text-xl text-muted-alt shrink-0" />
                        </Tooltip>
                    </h5>
                    <LemonDivider />
                    {hasNotifications ? (
                        notifications.map((logItem, index) => (
                            <ActivityLogRow logItem={logItem} key={index} showExtendedDescription={false} />
                        ))
                    ) : (
                        <h5>You're all caught up</h5>
                    )}
                </div>
            }
            className="NotificationsBell-Popover"
        >
            <div
                className={clsx('h-10 items-center cursor-pointer flex text-primary-alt text-2xl')}
                onClick={toggleNotificationsPopover}
                data-attr="notifications-button"
                data-ph-capture-attribute-unread-notifications-count={unreadCount}
            >
                <IconWithCount count={unreadCount} showZero={true} status={hasUnread ? 'primary' : 'muted'}>
                    <IconNotification />
                </IconWithCount>
                <IconArrowDropDown />
            </div>
        </Popover>
    )
}
