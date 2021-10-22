import { GetStaticProps } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { getProposalsForStages } from '../../api/getProposalsForStages'
import { StageCard } from '../../components/proposals/StageCard'
import { SearchBar } from '../../components/proposals/SearchBar'
import { ProposalsByStage, allStages } from '../../types'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

interface Props {
  proposals: ProposalsByStage
}

export const getStaticProps: GetStaticProps = async () => {
  const proposals = await getProposalsForStages({
    stages: allStages,
    includeRepoDetails: true
  })

  return {
    props: { proposals },
    revalidate: 1 * 60 * 60 // Revalidate every once per hour
  }
}

export default function ProposalsPage({ proposals }: Props) {
  if (typeof window !== 'undefined') {
    console.log(proposals)
  }

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Head>
        <title>EcmaScript Proposals</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {allStages.map((stage) => (
          <StageCard
            key={stage}
            stage={stage}
            proposals={proposals[stage]}
            searchQuery={searchQuery}
          />
        ))}
      </Container>
    </>
  )
}
