import Link from 'next/link'
import styled from 'styled-components'
import { GoThreeBars as MenuIcon, GoX as CloseIcon } from 'react-icons/go'
import { Logo } from '../icons/Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useCallback, useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { useRouter } from 'next/router'

const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.header};
  width: 100%;
  height: ${({ theme }) => theme.sizes.headerHeight};
  box-shadow: 0px 4px 24px rgba(55, 81, 104, 0.1);

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${({ theme }) => theme.sizes.gutter};
  height: 100%;
`

const scrollDisabledClass = 'scroll-disabled'

export function Header() {
  const { route } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen((currIsMenuOpen) => !currIsMenuOpen)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [route])

  useEffect(() => {
    if (!isMobile) {
      return
    }

    isMenuOpen
      ? document.body.classList.add(scrollDisabledClass)
      : document.body.classList.remove(scrollDisabledClass)
  }, [isMobile, isMenuOpen])

  return (
    <StyledHeader>
      <Container>
        <Link href="/" passHref>
          <a>
            <Logo width={175} />
          </a>
        </Link>
        {isMobile && (
          <div onClick={handleMenuClick}>
            {isMenuOpen ? <CloseIcon size="1.75rem" /> : <MenuIcon size="1.75rem" />}
          </div>
        )}
        {(!isMobile || (isMobile && isMenuOpen)) && <Navigation />}
      </Container>
    </StyledHeader>
  )
}
