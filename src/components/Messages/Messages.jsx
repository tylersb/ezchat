import { query, collection, orderBy, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'

export default function Messages() {
  const [messages, loading, error] = useCollectionData(
    query(collection(db, 'messages'), orderBy('createdAt')),
    { idField: 'id' }
  )


  return (
    <div>
      <h1>Messages</h1>
    </div>
  )
}