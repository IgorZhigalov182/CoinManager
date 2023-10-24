import React from 'react';
import PropTypes from 'prop-types';
import style from './themesSwitcher.module.scss';
import { useTheme } from '../../../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const switchMode = () => (theme === 'dark' ? setTheme('light') : setTheme('dark'));

  return (
    <div className={style.toggle_switch}>
      <label className={style.switch_label}>
        <input
          type="checkbox"
          className={style.checkbox}
          onChange={switchMode}
          checked={theme === 'dark' ? true : false}
        />
        <span className={style.slider}></span>
      </label>
    </div>
  );
};

ThemeSwitcher.propTypes = {
  theme: PropTypes.object,
};

export default ThemeSwitcher;
