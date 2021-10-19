import Link from 'next/link'
import styled from 'styled-components'
import { ProposalCard } from './ProposalCard'
import { Proposal, Stage } from '../../types'
import { formatStageName } from '../../utils/format'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  height: 25rem;
  box-shadow: 0px 2px 8px #e7f0f3;
`

const Heading = styled.h2`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.25rem;
  font-weight: 800;
  background: ${({ theme }) => theme.colors.card};
  margin: 0;
  padding: 1.5rem 2.5rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const ProposalsContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem 2.5rem;
  gap: 2rem;
  flex: 1;
  display: flex;
  overflow: scroll;
`

interface Props {
  stage: Stage
  proposals: Proposal[]
  searchQuery?: string
}

export function StageCard({ stage, proposals, searchQuery }: Props) {
  const proposalsToShow = proposals
    .sort((a, b) => (b?.stars ?? 0) - (a?.stars ?? 0))
    .filter((proposal) =>
      !searchQuery || searchQuery.length < 2
        ? true
        : proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return proposalsToShow.length === 0 ? null : (
    <Card>
      <Link href={`/${stage}`}>
        <Heading>{formatStageName(stage)}</Heading>
      </Link>
      <ProposalsContainer>
        {proposalsToShow.map((proposal, i) => (
          <ProposalCard
            stage={stage}
            proposal={proposal}
            index={i}
            key={`${stage}-proposal-${i}`}
          />
        ))}
      </ProposalsContainer>
    </Card>
  )
}
