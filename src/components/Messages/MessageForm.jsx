import { useState } from 'react'
import { Segment, Input, Button, Form } from 'semantic-ui-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'

export default function MessageForm({ userData, activeGroupId }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async (e) => {
    if (!message.trim()) return
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'messages'), {
        groupId: activeGroupId,
        content: message,
        createdAt: serverTimestamp(),
        uid: userData.uid,
      })
      setMessage('')
      setLoading(false)
    } catch (err) {
      console.error(err)
      alert('An error occured while sending message')
      setLoading(false)
    }
  }

  return (
    <Segment className="message__form">
      <Form
        onSubmit={sendMessage}
        autoComplete="off"
      >
      <Input
        fluid
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition="left"
        placeholder="Write your message"
        className={loading ? 'loading' : ''}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e)
          }
        }}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          disabled={loading}
          type="submit"
        />
        
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
          disabled
        />
      </Button.Group>
      </Form>
    </Segment>
  )
}
