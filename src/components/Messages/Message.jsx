import moment from 'moment'
import { Comment } from 'semantic-ui-react'
import { useRef, useEffect } from 'react'

export default function Message({ message, userData, users }) {
  const timeStamp = moment(message?.createdAt?.timestampValue).format('h:mm A')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    console.log(messagesEndRef)
  }

  useEffect(() => {
    scrollToBottom()
  }, [message])

  const userInfo = users?.find(
    (user) => user?.uid === message?.uid?.stringValue
  )

  return (
    <Comment>
      <Comment.Avatar src={userInfo?.avatar} />
      <Comment.Content>
        <Comment.Author as="a">{userInfo?.name}</Comment.Author>
        <Comment.Metadata>
          <div
          ref={messagesEndRef}
          >{timeStamp}</div>
        </Comment.Metadata>
        <Comment.Text>{message?.content.stringValue}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}
