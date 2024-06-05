import { PropsWithChildren } from 'react';
import styles from './Header.module.scss';
import { ReactSVG } from 'react-svg';
import Logo from "./logo.svg";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles['l-header']}>
      <div className={styles['l-header__content']}>
        <ReactSVG
          src={Logo}
          fallback={() => <span>Error!</span>}
          beforeInjection={(svg) => {
            svg.classList.add(styles['l-header__logo'])
          }} />
        <nav className={styles['l-header__menu']}>
          {children}
        </nav>
      </div>
    </header>
  )
}

export default Header