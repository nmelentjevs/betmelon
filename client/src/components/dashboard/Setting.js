import React from 'react';

import styled from 'styled-components';
import Toggle from './Toggle';

const SettingFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px white solid;
  padding-bottom: 10px;
  margin-top: 10px;
`;

const Setting = ({
  text,
  setFunction,
  toggleId,
  handleChange,
  name,
  currentSetting
}) => (
  <SettingFlex>
    <span>{text}</span>
    <Toggle
      onclick={setFunction}
      id={toggleId}
      handleChange={handleChange}
      name={name}
      currentSetting={currentSetting}
    />
  </SettingFlex>
);

export default Setting;
