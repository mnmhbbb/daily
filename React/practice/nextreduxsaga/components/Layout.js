import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'

const Layout = ({children}) => {
    return(
        <div>
            <div>
                <Link href="/"><a>홈</a></Link>
                <Link href="/profile"><a>프로필</a></Link>
                <Link href="/login"><a>로그인</a></Link>
            </div>
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
  

export default Layout;