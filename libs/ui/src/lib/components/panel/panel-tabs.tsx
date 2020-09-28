import React, { FunctionComponent, useCallback } from 'react';
import './panel.scss';

export interface PanelTabsProps {
  tabs: string[];
  justifyContent?: 'left' | 'center';
  currentTab?: string;
  onChange: (tab: string) => void;
}

export const PanelTabs: FunctionComponent<PanelTabsProps> = ({
  tabs,
  currentTab,
  justifyContent = 'center',
  onChange,
}) => {
  const handleTabChange = useCallback(
    (event, tab) => {
      event.preventDefault();

      if (!onChange) {
        return;
      }

      onChange(tab);
    },
    [onChange]
  );

  return (
    <div className="panel-tabs" style={{ justifyContent }}>
      {tabs?.map((tab, i) => (
        <a
          key={tab + i}
          className={currentTab === tab ? 'is-active' : ''}
          href={`#${tab}`}
          onClick={(event) => handleTabChange(event, tab)}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default PanelTabs;
