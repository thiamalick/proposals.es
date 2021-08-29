import styled from 'styled-components'
import { SanitizedHtml } from '../common/SanitizedHtml'
import { Proposal, Stage } from '../../types'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const Container = styled.section`
  font-size: 1rem;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`

const BackButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.card};
  border: 0;
  border-radius: 3px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

interface Props {
  proposal: Proposal
  stage: Stage
  readme: string
}

export function ProposalDetails({ proposal, stage, readme }: Props) {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Container>
      <BackButton onClick={goBack}>Go Back</BackButton>
      <>
        <h3>Authors:</h3>
        {proposal.authors?.join(', ')}
      </>
      <>
        <h3>Champions:</h3>
        {proposal.champions?.join(', ')}
      </>
      {readme ? (
        <>
          <p>
            <a href={proposal.link}>View proposal</a>
          </p>
          <SanitizedHtml html={readme} />
        </>
      ) : (
        <>
          <h1>
            <SanitizedHtml html={proposal.titleHtml} />
          </h1>
          <h2>Stage: {stage}</h2>
          {proposal.lastPresentedHtml && (
            <Row>
              <p>Last presented:</p>
              <SanitizedHtml html={proposal.lastPresentedHtml} />
            </Row>
          )}
          {proposal.rationaleHtml && (
            <Row>
              <p>Rationale:</p>
              <SanitizedHtml html={proposal.rationaleHtml} />
            </Row>
          )}
          <p>
            <a href={proposal.link}>View proposal</a>
          </p>
        </>
      )}
    </Container>
  )
}
