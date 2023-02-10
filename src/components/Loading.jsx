import { Placeholder } from 'semantic-ui-react'

export default function Loading({ length }) {
  const paragraphs = length?.map((_, i) => {
    return (
      <>
        <Placeholder.Paragraph key={i}>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </>
    )
  })

  return (
    <Placeholder>
      {paragraphs}
    </Placeholder>
  )
}
