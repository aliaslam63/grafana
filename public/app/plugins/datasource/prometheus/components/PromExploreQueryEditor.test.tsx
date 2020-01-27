import React from 'react';
import { shallow } from 'enzyme';
import PromExploreQueryEditor from './PromExploreQueryEditor';
import { PromExploreExtraField } from './PromExploreExtraField';
import { PrometheusDatasource } from '../datasource';
import { PromQuery } from '../types';
import { PanelData, LoadingState, dateTime } from '@grafana/data';

const setup = (propOverrides?: object) => {
  const datasourceMock: unknown = {};
  const datasource: PrometheusDatasource = datasourceMock as PrometheusDatasource;
  const onRunQuery = jest.fn();
  const onChange = jest.fn();
  const query: PromQuery = { expr: '', refId: 'A', interval: '1s' };
  const data: PanelData = {
    state: LoadingState.NotStarted,
    series: [],
    request: {
      requestId: '1',
      dashboardId: 1,
      interval: '1s',
      panelId: 1,
      range: {
        from: dateTime('2020-01-01', 'YYYY-MM-DD'),
        to: dateTime('2020-01-02', 'YYYY-MM-DD'),
        raw: {
          from: dateTime('2020-01-01', 'YYYY-MM-DD'),
          to: dateTime('2020-01-02', 'YYYY-MM-DD'),
        },
      },
      scopedVars: {},
      targets: [],
      timezone: 'GMT',
      app: 'Grafana',
      startTime: 0,
    },
    timeRange: {
      from: dateTime('2020-01-01', 'YYYY-MM-DD'),
      to: dateTime('2020-01-02', 'YYYY-MM-DD'),
      raw: {
        from: dateTime('2020-01-01', 'YYYY-MM-DD'),
        to: dateTime('2020-01-02', 'YYYY-MM-DD'),
      },
    },
  };
  const history: any[] = [];
  const exploreMode = 'Metrics';

  const props: any = {
    query,
    data,
    datasource,
    exploreMode,
    history,
    onChange,
    onRunQuery,
  };

  Object.assign(props, propOverrides);

  return shallow(<PromExploreQueryEditor {...props} />);
};

describe('PromExploreQueryEditor', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render PromQueryField with ExtraFieldElement', () => {
    const wrapper = setup();
    const onStepChange = (e: React.SyntheticEvent<HTMLInputElement>) => jest.fn();
    const onReturnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => jest.fn();

    // workaround to "Received: serializes to the same string"
    expect(JSON.stringify(wrapper.prop('ExtraFieldElement'))).toEqual(
      JSON.stringify(
        <PromExploreExtraField
          label={'Step'}
          onChangeFunc={onStepChange}
          onKeyDownFunc={onReturnKeyDown}
          value={'1s'}
        />
      )
    );
  });
});