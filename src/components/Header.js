import logo from '../images/mesto_logo_white.svg';

function Header () {
  return (
    <header className=" header">
      <a href="#" className="logo-link">
        <img src={logo} alt="лого Mesto" className="logo"/>
      </a>
    </header>
  )
}

export default Header;

