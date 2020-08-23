// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { CoronaCasesService } from '@demo-monorepo/service-corana';
import { CoronaCase } from '@demo-monorepo/api-interfaces';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from './countries';
import './corona-cases.scss';

export const CoronaCases = () => {
  const [cases, setCases] = useState<CoronaCase[]>();

  const getCoronaCases = useCallback(async () => {
    const res = await CoronaCasesService.getCoronaCases();
    setCases(res);
  }, []);

  useEffect(() => {
    getCoronaCases();
  }, [getCoronaCases]);

  return (
    <div className="corona-cases">
      <div className="title is-4">Covid cases by country</div>
      <div>
        {cases && (
          <ResponsiveChoropleth
            data={cases}
            features={countries.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors={[
              '#61cdbb',
              '#8EC9B2',
              '#BBC5A9',
              '#e8c1a0',
              '#ECA88B',
              '#F08E75',
              '#f47560',
            ]}
            domain={[0, 1000000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            legends={[
              {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                      itemBackground: '#f7fafb',
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default CoronaCases;
