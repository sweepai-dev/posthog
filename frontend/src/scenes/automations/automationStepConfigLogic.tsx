import { actions, kea, path, reducers, selectors } from 'kea'
import type { automationStepConfigLogicType } from './automationStepConfigLogicType'
import { AnyAutomationStep, AutomationStepCategory, AutomationStepConfigType, AutomationStepKind } from './schema'

import {
    GithubIcon,
    IconAction,
    IconApps,
    IconArticle,
    IconCoffee,
    IconCohort,
    IconEvent,
    IconFlag,
    IconMonitor,
    IconPerson,
    IconSlack,
    IconWebhook,
} from 'lib/lemon-ui/icons'

const stepOptions: AnyAutomationStep[] = [
    { kind: AutomationStepKind.EventSource, id: 'Event sent', category: AutomationStepCategory.Source },
    { kind: AutomationStepKind.ActionSource, id: 'Action triggered', category: AutomationStepCategory.Source },
    { kind: AutomationStepKind.PauseForLogic, id: 'Pause for', category: AutomationStepCategory.Logic },
    { kind: AutomationStepKind.PauseUntilLogic, id: 'Pause until', category: AutomationStepCategory.Logic },
    {
        kind: AutomationStepKind.GithubIssueDestination,
        id: 'Create a Github ticket',
        category: AutomationStepCategory.Destination,
    },
    {
        kind: AutomationStepKind.UserPropertyDestination,
        id: 'Set user property',
        category: AutomationStepCategory.Destination,
    },
    { kind: AutomationStepKind.CohortDestination, id: 'Add to cohort', category: AutomationStepCategory.Destination },
    {
        kind: AutomationStepKind.FeatureFlagDestination,
        id: 'Add to feature flags',
        category: AutomationStepCategory.Destination,
    },
    { kind: AutomationStepKind.WebhookDestination, id: 'Send a webhook', category: AutomationStepCategory.Destination },
    { kind: AutomationStepKind.SlackDestination, id: 'Send to slack', category: AutomationStepCategory.Destination },
    { kind: AutomationStepKind.ZapierDestination, id: 'Send to Zapier', category: AutomationStepCategory.Destination },
    { kind: AutomationStepKind.EmailDestination, id: 'Send an email', category: AutomationStepCategory.Destination },
    {
        kind: AutomationStepKind.InAppMessageDestination,
        id: 'In-app message',
        category: AutomationStepCategory.Destination,
    },
]

export const kindToConfig: Record<string, AutomationStepConfigType> = {
    'Event sent': { icon: <IconEvent />, label: 'Event sent' },
    'Action triggered': { icon: <IconAction />, label: 'Action triggered' },
    'Pause for': { icon: <IconCoffee />, label: 'Pause for' },
    'Pause until': { icon: <IconCoffee />, label: 'Pause until' },
    'Create a Github ticket': { icon: <GithubIcon />, label: 'Create a Github ticket' },
    'Set user property': { icon: <IconPerson />, label: 'Set user property' },
    'Add to cohort': { icon: <IconCohort />, label: 'Add to cohort' },
    'Add to feature flags': { icon: <IconFlag />, label: 'Add to feature flags' },
    'Send a webhook': { icon: <IconWebhook />, label: 'Send a webhook' },
    'Send to slack': { icon: <IconSlack />, label: 'Send to slack' },
    'Send to Zapier': { icon: <IconApps />, label: 'Send to Zapier' },
    'Send an email': { icon: <IconArticle />, label: 'Send an email' },
    'In-app message': { icon: <IconMonitor />, label: 'In-app message' },
}

export const automationStepConfigLogic = kea<automationStepConfigLogicType>([
    path(['scenes', 'automations', 'automationStepConfigLogic']),
    actions({
        openStepConfig: true,
        closeStepConfig: true,
        setActiveStepId: (id: string) => ({ id }),
    }),
    reducers({
        stepConfigOpen: [
            false as boolean,
            {
                openStepConfig: () => true,
                closeStepConfig: () => false,
            },
        ],
        activeStepId: [
            null as null | string,
            {
                setActiveStepId: (_, { id }) => id,
                closeStepConfig: () => null,
            },
        ],
        stepOptions: [stepOptions as AnyAutomationStep[], {}],
        stepCategories: [Object.values(AutomationStepCategory), {}],
    }),
    selectors({
        activeStep: [
            (selectors) => [selectors.activeStepId],
            (activeStepId: string): AnyAutomationStep | null => {
                return stepOptions.find((step) => step.id === activeStepId) || null
            },
        ],
        activeStepConfig: [
            (selectors) => [selectors.activeStep],
            (activeStep: AnyAutomationStep | null): AutomationStepConfigType | null => {
                if (!activeStep) {
                    return null
                }
                return kindToConfig[activeStep.id]
            },
        ],
    }),
])