import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { StarIcon } from '../common/icons/StarIcon'
import { ChampionedProposal } from '../../api/getAllChampions'
import { AwardIcon, PenIcon } from '../common/'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  div {
    transition: all 0.4s ease;
  }
`

const Badge = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;

  span {
    font-size: 0.9rem;
  }
`

const ChampionBadge = styled(Badge)`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.badge};
  color: ${({ theme }) => theme.colors.badgeText};
  border-radius: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`

const StarsBadge = styled(Badge)`
  .feather-star {
    transition: fill 0.4s ease;
    align-self: center;
  }
`

const ProposalLink = styled.a<{ cardWidth?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors.stageCard};
  border: ${({ theme }) => theme.borders.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.foreground};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-weight: 800;
  text-decoration: none;
  width: ${({ cardWidth }) => cardWidth ?? '100%'};
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};

    .feather-star {
      fill: ${({ theme }) => theme.colors.black};
    }

    ${ChampionBadge} {
      background: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`
const NoResults = styled.p`
  margin: 2rem;
  font-weight: bold;
`

type Badge = 'stars' | 'author' | 'champion'

interface Props {
  proposals: ChampionedProposal[]
  badges?: Badge[]
  searchQuery?: string
  cardWidth?: string
}

export function ProposalList({ proposals, badges, searchQuery, cardWidth }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = !isMobile && isMobile != null

  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.trim().length < 1
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return proposalsToShow.length === 0 ? (
    <NoResults>No search results for this stage.</NoResults>
  ) : (
    <ul>
      {proposalsToShow.map((proposal) => (
        <li key={proposal.title}>
          <Link href={`/proposals/${encodeURIComponent(proposal.title)}`} passHref>
            <ProposalLink cardWidth={cardWidth}>
              <SanitizedHtml html={proposal.titleHtml} />
              <Badges>
                {isDesktop && badges?.includes('author') && proposal.isAuthor ? (
                  <ChampionBadge>
                    <PenIcon />
                    <span>Author</span>
                  </ChampionBadge>
                ) : null}
                {isDesktop && badges?.includes('champion') && proposal.isChampion ? (
                  <ChampionBadge>
                    <AwardIcon />
                    <span>Champion</span>
                  </ChampionBadge>
                ) : null}
                {badges?.includes('stars') && proposal.stars != null ? (
                  <StarsBadge>
                    <StarIcon />
                    <span>{proposal.stars}</span>
                  </StarsBadge>
                ) : null}
              </Badges>
            </ProposalLink>
          </Link>
        </li>
      ))}
    </ul>
  )
}
