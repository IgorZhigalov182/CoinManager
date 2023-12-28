import React from 'react';
import style from './burgerMenu.module.scss';
import { CSSTransition } from 'react-transition-group';
import Burger from '../burger/Burger';

const BurgerMenu = ({ activeBurgerMenu }) => {
  return (
    <>
      <Burger />
      <CSSTransition
        in={activeBurgerMenu}
        timeout={500}
        unmountOnExit
        classNames={{
          enter: style.my_node_enter,
          enterActive: style.my_node_enter_active,
          exit: style.node_exit,
          exitActive: style.my_node_exit_active
        }}>
        <div className={style.wrapper}>{/* <NavBar /> */}</div>
      </CSSTransition>
    </>
  );
};

export default BurgerMenu;
