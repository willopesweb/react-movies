import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logoutUser } from '../../userUtils';
import './Header.scss';
import { ReactSVG } from 'react-svg';
import Logo from "./logo.svg";
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import SearchBar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import FormLogin from '../FormLogin/FormLogin';

const Header = () => {

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(true);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const dispatch = useDispatch();

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
              to="/favorites"
              title="Favoritos"
              aria-current={window.location.pathname === '/favoritos' ? 'page' : 'false'}
              className='l-header__menu-item'
              onClick={
                (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    setIsModalLoginOpen(true);
                  }
                }
              }
            >
              <Icon size={20} icon="star" />Favoritos
            </NavLink>
            {
              isAuthenticated ? (
                <NavLink
                  to="/"
                  onClick={() => logoutUser(dispatch)}
                >Sair</NavLink>
              ) : (
                <NavLink
                  to="/login"
                  aria-current={window.location.pathname === '/login' ? 'page' : 'false'}
                  className='l-header__menu-item'
                >
                  Login</NavLink>
              )
            }

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

      {isModalLoginOpen && !isAuthenticated && (
        <Modal title="Faça Login para continuar" closeModal={() => setIsModalLoginOpen(false)}>
          <FormLogin additionalClass='c-login--modal' />
        </Modal>
      )}
    </>
  )
}

export default Header