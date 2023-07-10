import { LemonTag } from 'lib/lemon-ui/LemonTag/LemonTag'
import { BuilderHog3 } from 'lib/components/hedgehogs'

export function NotebookNodeCannotShare({
    type,
}: {
    type: 'flags' | 'insights' | 'persons' | 'playlists' | 'queries' | 'recordings'
}): JSX.Element {
    return (
        <div
            className={
                'flex py-4 px-8 w-full flex-col justify-center items-center border-2 rounded bg-primary-alt-highlight'
            }
        >
            <div className={'flex flex-row items-center justify-center'}>
                <BuilderHog3 width={75} height={75} />
                <LemonTag type={'highlight'}>Coming soon</LemonTag>
            </div>
            <h2>Shared Notebooks cannot display {type} (yet!).</h2>
        </div>
    )
}