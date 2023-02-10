export default function Messages() {
  const [messages, loading, error] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {messages &&
        messages.map((msg) => (
          <div key={msg.id}>
            <p>
              <strong>{msg.name}</strong> {msg.text}
            </p>
          </div>
        ))}
    </div>
  )
}