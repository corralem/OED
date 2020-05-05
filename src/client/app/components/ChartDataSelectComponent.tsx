/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import MultiSelectComponent from './MultiSelectComponent';
import { SelectOption } from '../types/items';
import { defineMessages, FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import TooltipHelpComponent from './TooltipHelpComponent';

interface ChartDataSelectProps {
	meters: SelectOption[];
	groups: SelectOption[];
	selectedMeters: SelectOption[];
	selectedGroups: SelectOption[];
	selectMeters(meterIDs: number[]): Promise<any>;
	selectGroups(groupIDs: number[]): Promise<any>;
}
//testing
type ChartDataSelectPropsWithIntl = ChartDataSelectProps & InjectedIntlProps;

/**
 * A component which allows the user to select which data should be displayed on the chart.
 */
class ChartDataSelectComponent extends React.Component<ChartDataSelectPropsWithIntl, {}> {
	constructor(props: ChartDataSelectPropsWithIntl) {
		super(props);
		this.handleMeterSelect = this.handleMeterSelect.bind(this);
		this.handleGroupSelect = this.handleGroupSelect.bind(this);
	}

	public render() {
		const divBottomPadding: React.CSSProperties = {
			paddingBottom: '15px'	
		};
		const labelStyle: React.CSSProperties = {
			fontWeight: 'bold',
			margin: 0
		};
		const messages = defineMessages({
			selectGroups: {	id: 'select.groups' },
			selectMeters: { id: 'select.meters' }
		});
		const { formatMessage } = this.props.intl;

		const handleGroupSelect = (s: SelectOption[]) => this.handleGroupSelect(s);

		return (
			<div>
				<p style={labelStyle}>
					<FormattedMessage id='groups' />:
				</p>
				<div style={divBottomPadding}>
					<MultiSelectComponent
						options={this.props.groups}
						selectedOptions={this.props.selectedGroups}
						placeholder={formatMessage(messages.selectGroups)}
						onValuesChange={handleGroupSelect}
					/>
					<TooltipHelpComponent multiline={true} tip='Groups aggregate (sum the usage) of any combination of groups and meters. <br> You can choose
which groups to include in your graphic from the “Groups” dropdown menu. Note you can type
in text to limit which groups are shown. <br> The Groups button in the top, right side of the window
allow you to see more details about each group and, if you are an admin, to edit the groups.
<br>
Please visit https://openenergydashboard.github.io/help/metersAndGroups for further details
and information.'/>
				</div>
				<p style={labelStyle}>
					<FormattedMessage id='meters' />:
				</p>
				<div style={divBottomPadding}>
					<MultiSelectComponent
						options={this.props.meters}
						selectedOptions={this.props.selectedMeters}
						placeholder={formatMessage(messages.selectMeters)}
						onValuesChange={this.handleMeterSelect}
					/>
					<TooltipHelpComponent multiline={true} tip='Meters are the basic unit of usage and generally represent the readings from a single usage
meter. <br> You can choose which meters to include in your graphic to view from the “Meters:”
dropdown menu. <br>  Note you can type in text to limit which meters are shown. <br> The Meters button
in the top, right side of the window allow you to see more details about each meter and, if you
are an admin, to edit the meters. <br> Please visit
https://openenergydashboard.github.io/help/metersAndGroups for further details and
information.'/>
				</div>
			</div>
		);
	}
	/**
	 * Handles a change in meter selection
	 * @param {Object[]} selection An array of items representing the current selection
	 */
	private handleMeterSelect(selection: SelectOption[]) {
		this.props.selectMeters(selection.map(s => s.value));
	}
	/**
	 * Handles a change in group selection
	 * @param {Object[]} selection An array of items representing the current selection
	 */
	private handleGroupSelect(selection: SelectOption[]) {
		this.props.selectGroups(selection.map(s => s.value));
	}
}

export default injectIntl<ChartDataSelectProps>(ChartDataSelectComponent);
