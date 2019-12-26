import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect' 

import { auth } from '../../firebase/firebase.utils'

import { ReactComponent as Logo } from '../../assets/cpu.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import './header.styles.scss'


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <div className='options'>
            <Link className='logo-container option' to='/'>
                <Logo className='logo'/>
                <span className="logo-text">ElectroniX</span>
            </Link>        
            <Link className='option shop' to='/shop'>SHOP</Link>
            <CartIcon />
            <Link className='option contact' to='/contact'>CONTACT</Link>            
            {currentUser ?
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
        </div>
        {
            hidden ? null : <CartDropdown />
        }    
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);