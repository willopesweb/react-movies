import { useState } from 'react';
import './Header.scss';
import { ReactSVG } from 'react-svg';
import Logo from "./logo.svg";
import { NavLink, NavLinkProps } from 'react-router-dom';
import Icon from '../Icon';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import FormLogin from '../FormLogin/FormLogin';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(true);

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(true);

  const handleBeforeInjection = (svg: SVGSVGElement) => {
    svg.classList.add('l-header__logo');
  };

  return (
    <>
      <header className='l-header'>
        <div className='l-header__content' >

          <NavLink to="/" end>
            <ReactSVG
              src={Logo}
              fallback={() => <span>TMDB</span>}
              beforeInjection={handleBeforeInjection} />
          </NavLink>

          <div className={isMobileSearchActive ? 'l-header__search is-active' : 'l-header__search'}>
            <SearchBar />
          </div>
          <nav className={isMobileMenuActive ? 'l-header__menu is-active' : 'l-header__menu'} aria-label="Menu principal"
          >
            <NavLink to="/"
              end
              aria-current={window.location.pathname === '/' ? 'page' : 'false'}
              className='l-header__menu-item'
            >
              <Icon size={20} icon="favorite" />Início
            </NavLink>
            <NavLink
              to="/favoritos"
              aria-current={window.location.pathname === '/favoritos' ? 'page' : 'false'}
              className='l-header__menu-item'
            >
              <Icon size={20} icon="star" />Favoritos</NavLink>
            <NavLink
              to="/login"
              aria-current={window.location.pathname === '/login' ? 'page' : 'false'}
              className='l-header__menu-item'
            >
              Login</NavLink>
          </nav>
          <div className={'l-header__buttons'}>
            <button onClick={() => setIsMobileSearchActive(!isMobileSearchActive)} >
              <Icon size={30} icon="search" className={isMobileSearchActive ? 'is-active' : ''} />
            </button>

            <button onClick={() => setIsMobileMenuActive(!isMobileMenuActive)} >
              <Icon size={30} icon="menu" className={isMobileMenuActive ? 'is-active' : ''} />
            </button>
          </div>
        </div>
      </header>

      {isModalLoginOpen && (
        <Modal title="Faça Login para continuar" closeModal={() => setIsModalLoginOpen(false)}>
          <FormLogin additionalClass='c-login--modal' />
        </Modal>
      )}
    </>
  )
}

export default Header