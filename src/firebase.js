// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import md5 from 'md5'
import { toast } from 'react-toastify'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
// const analytics = getAnalytics(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const getGravatarURL = (email) => {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase()

  // Create an MD5 hash of the final string
  const hash = md5(address)

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`
}

const logInAnonymously = async () => {
  try {
    const res = await signInAnonymously(auth)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: 'Anonymous',
        authProvider: 'anonymous',
        email: '',
        avatar: getGravatarURL(user.uid)
      })
    }
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        avatar: getGravatarURL(user.email)
      })
    }
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'github',
        email: user.email,
        avatar: getGravatarURL(user.email)
      })
    }
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      avatar: getGravatarURL(email)
    })
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    toast.success('Password reset email sent', {
      position: 'top-center'
    })
  } catch (err) {
    console.error(err)
    toast.error(err.message, {
      position: 'top-center'
    })
  }
}

const logout = () => {
  signOut(auth)
}

const leaveGroup = async (groupId, userId) => {
  try {
    const groupRef = doc(db, 'groups', groupId)
    await updateDoc(groupRef, {
      users: arrayRemove(userId)
    })
  } catch (err) {
    console.error(err)
    toast.error('Error when attempting to leave group', {
      position: 'top-center'
    })
  }
}

const editGroup = async (groupId, { name, description }) => {
  try {
    console.log(name, description, groupId)
    const groupRef = doc(db, 'groups', groupId)
    await updateDoc(groupRef, {
      name: name,
      description: description
    })
  } catch (err) {
    console.error(err)
    toast.error('Error when attempting to edit channel', {
      position: 'top-center'
    })
  }
}

const deleteGroup = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId)
    // const messagesRef = collection(
    //   db,
    //   'messages',
    //   where('groupId', '==', groupId)
    // )
    // const messages = await getDocs(messagesRef)
    // messages.forEach(async (message) => {
    //   await deleteDoc(message)
    // })
    await deleteDoc(groupRef)
  } catch (err) {
    console.error(err)
    toast.error('Error when attempting to delete channel', {
      position: 'top-center'
    })
  }
}

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logInAnonymously,
  leaveGroup,
  editGroup,
  deleteGroup,
  logout
}
