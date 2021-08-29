import styled from 'styled-components'
import { ProposalCard } from './ProposalCard'
import { Proposal, Stage } from '../../types'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  width: 20rem;
  height: 400px;
  border-radius: 1rem;
`

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.card};
  margin: 0;
  padding: 1rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  margin-bottom: 1rem;
`

const ProposalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: 0 1rem;
`

function formatStageName(stageName: Stage) {
  if (stageName === 'inactive') {
    return 'Inactive'
  }

  if (stageName === 'stage4') {
    return 'Stage 4 (Finished)'
  }

  return `Stage ${stageName.split('stage')[1]}`
}

interface Props {
  stage: Stage
  proposals: Proposal[]
}

export function StageCard({ stage, proposals }: Props) {
  return (
    <Card>
      <Heading>{formatStageName(stage)}</Heading>
      <ProposalsContainer>
        {proposals.map((proposal, i) => (
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