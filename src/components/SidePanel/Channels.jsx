import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import {
  query,
  collection,
  orderBy,
  addDoc,
  serverTimestamp,
  doc
} from 'firebase/firestore'
import { Header, Grid, List, Icon } from 'semantic-ui-react'
import NewChannelModal from './NewChannelModal'

export default function Channels({
  handleGroupClick,
  activeGroupId,
  userData,
  groups
}) {
  const addNewChannel = async (channel) => {
    try {
      await addDoc(collection(db, 'groups'), {
        ...channel,
        createdAt: serverTimestamp(),
        members: [userData?.uid],
        createdByUid: userData?.uid,
        type: 'channel'
      })
    } catch (err) {
      console.error(err)
      alert('An error occured while creating a new channel')
    }
  }

  const displayChannels = groups?.docs?.map((channel, idx) => {
    if (
      channel._document.data.value.mapValue.fields.type.stringValue !==
      'channel'
    )
      return null
    return (
      <List.Item
        onClick={() => handleGroupClick(channel)}
        style={{ cursor: 'pointer', marginLeft: '2em' }}
        active={channel.id === activeGroupId}
        key={channel.id}
      >
        # {channel._document.data.value.mapValue.fields.name.stringValue}
      </List.Item>
    )
  })

  return (
    <>
      <Grid verticalAlign="middle">
        <Grid.Row
          style={{ padding: '0', height: '1.5em', marginBottom: '.4em' }}
        >
          <Grid.Column floated="left">
            <Icon
              name="caret down"
              size="med"
              style={{
                cursor: 'pointer',
                marginLeft: '2em',
                display: 'inline'
              }}
            />
            <Header as="h4" style={{ display: 'inline' }}>
              Channels
            </Header>
          </Grid.Column>
          <Grid.Column floated="right">
            <NewChannelModal
              addNewChannel={addNewChannel}
              style={{ height: '1.5em' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <List animated divided verticalAlign="middle">
        {displayChannels}
      </List>
    </>
  )
}
