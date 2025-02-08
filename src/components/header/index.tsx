import './styles.css';

import logo from '../../assets/img/logo.svg';

function Header() {
  return (
    <header>
      <div className="dsmeta-logo-container">
        <img src={logo} alt="Vendify" />
        <h1>Vendify</h1>
        <p>
          Desenvolvido por <a href="#!">Ricardo Ferreira Martins</a>
        </p>
      </div>
    </header>
  );
}

export default Header;
