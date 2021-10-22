import Link from 'next/link'
import styled from 'styled-components'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'

const BreadcrumbList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;

  li {
    display: flex;

    &:last-child::after {
      content: '';
    }

    &::after {
      content: '/';
      margin: 0 1rem;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

interface Props {
  stageName: Stage
  proposal: Proposal
}

export function Breadcrumbs({ stageName, proposal }: Props) {
  return (
    <BreadcrumbList>
      <li>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href={`/stages/${stageName}`} passHref>
          <a>{formatStageName(stageName)}</a>
        </Link>
      </li>
      <li>
        <Link
          href={`/stages/${stageName}/${encodeURIComponent(proposal.title)}`}
          passHref
        >
          <a>{proposal.title}</a>
        </Link>
      </li>
    </BreadcrumbList>
  )
}
