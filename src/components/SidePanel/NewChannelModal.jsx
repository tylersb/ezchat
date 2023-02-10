import { useState } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'


export default function NewChannelModal({ addNewChannel }) {
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState({
    name: '',
    details: ''
  })

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={
        <Button style={{ background: 'transparent', color: 'white' }}
          floated="right"
        >
          <Icon name="add" 
            size="tiny"
          />
        </Button>
      }
    >
      <Modal.Content>
        <Form>
          <Form.Field
          >
            <label>Channel Name</label>
            <input
              placeholder="Channel Name"
              value={channel.name}
              onChange={(e) => setChannel({ ...channel, name: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Channel Details</label>
            <input
              placeholder="Channel Details"
              value={channel.details}
              onChange={(e) =>
                setChannel({ ...channel, details: e.target.value })
              }
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={
          () => {
            addNewChannel(channel)
            setOpen(false)
            setChannel({ name: '', details: '' })
          }
        }>
          <Icon name="checkmark" /> Add
        </Button>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
