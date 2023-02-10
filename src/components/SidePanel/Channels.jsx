import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import {
  query,
  collection,
  orderBy,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import { Header, Grid, List, Icon } from 'semantic-ui-react'
import NewChannelModal from './NewChannelModal'

export default function Channels() {
  const [channels, loading, error] = useCollectionData(
    query(collection(db, 'channels'), orderBy('createdAt')),
    { idField: 'id' }
  )
  const [activeChannelId, setActiveChannelId] = useState('')

  const addNewChannel = async (channel) => {
    try {
      await addDoc(collection(db, 'channels'), {
        ...channel,
        createdAt: serverTimestamp()
      })
    } catch (err) {
      console.error(err)
      alert('An error occured while creating a new channel')
    }
  }

  const handleChannelClick = (channel) => {
    setActiveChannelId(channel.id)
  }

  const displayChannels = channels?.map((channel) => {
    return (
      <List.Item
        key={channel.id}
        onClick={() => handleChannelClick(channel)}
        style={{ cursor: 'pointer', marginLeft: '2em' }}
        active={channel.id === activeChannelId}
      >
        # {channel.name}
      </List.Item>
    )
  })

  return (
    <>
      <Grid justifyContent="center" verticalAlign="middle">
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
