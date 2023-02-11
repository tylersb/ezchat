import { Header, Segment, Icon, Grid } from 'semantic-ui-react'

export default function MessagesHeader({ userData, activeGroupId, groups }) {
  const totalMembers = groups?.docs?.find((group) => group.id === activeGroupId)
    ?._document?.data?.value?.mapValue?.fields?.members?.arrayValue?.values
    ?.length

  return (
    <Segment
      style={{
        height: '7vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        style={{
          marginLeft: '0'
        }}
      >
        <Grid.Row
          style={{
            height: '50%',
            padding: '0',
            margin: '0'
          }}
        >
          <Header
            fluid="true"
            as="h2"
            floated="left"
            style={{ marginBottom: 0 }}
          >
            <span>
              {
                groups?.docs?.find((group) => group.id === activeGroupId)
                  ?._document?.data?.value?.mapValue?.fields?.name?.stringValue
              }
            </span>
          </Header>
        </Grid.Row>
        <Grid.Row
          style={{
            height: '50%',
            padding: '0',
            margin: '0'
          }}
        >
          <Header.Subheader>
            {totalMembers} {totalMembers === 1 ? 'user' : 'users'}
          </Header.Subheader>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
