import { Theme } from 'styled-components'

const white = '#FFFFFF'
const gray = '#1B1D23'
const darkGray = '#15161B'
const black = '#0F1013'
const yellow = '#FCB500'

export const darkTheme: Theme = {
  sizes: {
    gutter: '5%',
    headerHeight: '115px',
    footerHeight: '50px'
  },
  colors: {
    background: gray,
    foreground: white,
    primary: yellow,
    header: darkGray,
    card: black,
    footer: darkGray
  }
}
