import { useState } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

export default function NewChannelModal() {
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
      trigger={<Button>Create Channel</Button>}
    >
      <Modal.Content>
        <Form>
          <Form.Field>
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
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" inverted onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
