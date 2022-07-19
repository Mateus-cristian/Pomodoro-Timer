import { HeaderContainer } from './styles';
import logo from '../../assets/Logo.png';
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <HeaderContainer>
            <img src={logo} alt="" />
            <nav>
                <NavLink to="/" title='timer'>
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title='histórico'>
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
