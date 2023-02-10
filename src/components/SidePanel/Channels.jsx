import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy } from 'firebase/firestore'
import { Header, Segment, Comment } from 'semantic-ui-react'
import NewChannelModal from './NewChannelModal'

export default function Channels() {
  const [channels, loading, error] = useCollectionData(
    query(collection(db, 'channels'), orderBy('createdAt')),
    { idField: 'id' }
  )
  const [activeChannel, setActiveChannel] = useState('')

  const handleChannelClick = (channel) => {
    setActiveChannel(channel)
  }

  const displayChannels = channels?.map((channel) => {
    return (
      <Segment
        key={channel.id}
        onClick={() => handleChannelClick(channel)}
        style={{ cursor: 'pointer' }}
        color={channel.id === activeChannel?.id ? 'teal' : 'black'}
      >
        # {channel.name}
      </Segment>
    )
  })

  const displayChannelName = activeChannel?.name ? (
    <Header as="h2" textAlign="center">
      <span># {activeChannel.name}</span>
    </Header>
  ) : null

  return (
    <>
      <NewChannelModal />
      <Header as="h2" textAlign="center">
        <span>Channels</span>
      </Header>
      {displayChannels}
      {displayChannelName}
    </>
  )
}
