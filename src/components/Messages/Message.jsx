import moment from 'moment'
import { Comment, Image } from 'semantic-ui-react'

export default function Message({ message, userData, users }) {
  
  const timeStamp = moment(message?.createdAt?.timestampValue).format(
    'h:mm A'
  )
  
  const userInfo = users?.find((user) => user?.uid === message?.uid?.stringValue)

  return (
    <Comment>
      <Comment.Avatar src={userInfo?.avatar} />
      <Comment.Content>
        <Comment.Author as="a">{userInfo?.name}</Comment.Author>
        <Comment.Metadata>
          <div>{timeStamp}</div>
        </Comment.Metadata>
        <Comment.Text>{message?.content.stringValue}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}
