import React from 'react'
import { useValues, useActions, useMountedLogic } from 'kea'
import { PropertyFilters } from 'lib/components/PropertyFilters/PropertyFilters'

import { funnelLogic } from 'scenes/funnels/funnelLogic'
import { ActionFilter } from '../../ActionFilter/ActionFilter'
import { Button, Row } from 'antd'
import { useState } from 'react'
import { SaveModal } from '../../SaveModal'
import { funnelCommandLogic } from './funnelCommandLogic'
import { TestAccountFilter } from 'scenes/insights/TestAccountFilter'
import { InsightTitle } from '../InsightTitle'
import { SaveOutlined } from '@ant-design/icons'
import { isValidPropertyFilter } from 'lib/components/PropertyFilters/utils'
import { featureFlagLogic } from 'lib/logic/featureFlagLogic'
import { FEATURE_FLAGS } from 'lib/constants'
import { ToggleButtonChartFilter } from './ToggleButtonChartFilter'
import { InsightActionBar } from '../InsightActionBar'
import { preflightLogic } from 'scenes/PreflightCheck/logic'

export function FunnelTab(): JSX.Element {
    useMountedLogic(funnelCommandLogic)
    const { isStepsEmpty, filters, stepsWithCount } = useValues(funnelLogic())
    const { featureFlags } = useValues(featureFlagLogic)
    const { preflight } = useValues(preflightLogic)
    const autoCalculate = featureFlags[FEATURE_FLAGS.FUNNEL_BAR_VIZ] && preflight?.is_clickhouse_enabled // Query performance is suboptimal on psql
    const { loadResults, clearFunnel, setFilters, saveFunnelInsight } = useActions(funnelLogic())
    const [savingModal, setSavingModal] = useState<boolean>(false)

    const showModal = (): void => setSavingModal(true)
    const closeModal = (): void => setSavingModal(false)
    const onSubmit = (input: string): void => {
        saveFunnelInsight(input)
        closeModal()
    }

    return (
        <div data-attr="funnel-tab">
            <InsightTitle
                actionBar={
                    autoCalculate ? (
                        <InsightActionBar
                            variant="sidebar"
                            filters={filters}
                            insight="FUNNELS"
                            showReset={!isStepsEmpty || !!filters.properties?.length}
                            onReset={(): void => clearFunnel()}
                        />
                    ) : undefined
                }
            />
            {featureFlags[FEATURE_FLAGS.FUNNEL_BAR_VIZ] && (
                <div style={{ paddingBottom: '1rem' }}>
                    <h4 className="secondary">Graph Type</h4>
                    <ToggleButtonChartFilter />
                </div>
            )}
            <form
                onSubmit={(e): void => {
                    e.preventDefault()
                    loadResults()
                }}
            >
                <h4 className="secondary">Steps</h4>
                <ActionFilter
                    filters={filters}
                    setFilters={(newFilters: Record<string, any>): void => setFilters(newFilters, false)}
                    typeKey={`EditFunnel-action`}
                    hideMathSelector={true}
                    buttonCopy="Add funnel step"
                    showSeriesIndicator={!isStepsEmpty && featureFlags[FEATURE_FLAGS.FUNNEL_BAR_VIZ]}
                    seriesIndicatorType="numeric"
                    fullWidth={featureFlags[FEATURE_FLAGS.FUNNEL_BAR_VIZ]}
                    sortable
                />
                <hr />
                <h4 className="secondary">Filters</h4>
                <PropertyFilters
                    pageKey={`EditFunnel-property`}
                    propertyFilters={filters.properties || []}
                    onChange={(anyProperties) => {
                        setFilters({
                            properties: anyProperties.filter(isValidPropertyFilter),
                        })
                    }}
                />
                <TestAccountFilter filters={filters} onChange={setFilters} />
                {!autoCalculate && (
                    <>
                        <hr />
                        <Row style={{ justifyContent: 'flex-end' }}>
                            {!isStepsEmpty && Array.isArray(stepsWithCount) && !!stepsWithCount.length && (
                                <div style={{ flexGrow: 1 }}>
                                    <Button type="primary" onClick={showModal} icon={<SaveOutlined />}>
                                        Save
                                    </Button>
                                </div>
                            )}
                            {!isStepsEmpty && (
                                <Button onClick={(): void => clearFunnel()} data-attr="save-funnel-clear-button">
                                    Clear
                                </Button>
                            )}
                            <Button
                                style={{ marginLeft: 4 }}
                                type="primary"
                                htmlType="submit"
                                disabled={isStepsEmpty}
                                data-attr="save-funnel-button"
                            >
                                Calculate
                            </Button>
                        </Row>
                    </>
                )}
            </form>
            <SaveModal
                title="Save Funnel"
                prompt="Enter the name of the funnel"
                textLabel="Name"
                visible={savingModal}
                onCancel={closeModal}
                onSubmit={onSubmit}
            />
        </div>
    )
}
