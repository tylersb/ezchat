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
  writeBatch,
  serverTimestamp,
  arrayUnion
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import md5 from 'md5'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

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

// Function for signing in anonymously
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

// Function for signing in with Google as the provider
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

// Function for signing in with Github as the provider
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

// Function for signing in with email and password
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

// Function for registering with email and password
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

// Function for sending a password reset email
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

// Function for logging the user out
const logout = () => {
  signOut(auth)
}

// Function for removing the user from a group
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

// Function for editing a group
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

// Function for deleting a group
const deleteGroup = async (groupId) => {
  try {
    const groupRef = doc(db, 'groups', groupId)
    const messagesRef = collection(db, 'messages')
    const q = query(messagesRef, where('groupId', '==', groupId))
    const querySnapshot = await getDocs(q)
    const batch = writeBatch(db)
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref)
    })
    batch.delete(groupRef)
    await batch.commit()
  } catch (err) {
    console.error(err)
    toast.error('Error when attempting to delete channel', {
      position: 'top-center'
    })
  }
}

// const createOrUpdateLastSeen = async (userId, groupId) => {
//   try {
//     const lastSeenRef = doc(db, 'lastSeen', userId)
//     await setDoc(
//       lastSeenRef,
//       {
//         groups: {
//           [groupId]: serverTimestamp()
//         }
//       },
//       { merge: true }
//     )
//   } catch (err) {
//     console.error(err)
//     toast.error('Error when attempting to update last seen', {
//       position: 'top-center'
//     })
//   }
// }

export const addNewGroup = async (users, createdByUid, type, channelInfo) => {
  try {
    await addDoc(collection(db, 'groups'), {
      createdAt: serverTimestamp(),
      users,
      createdByUid,
      type,
      ...channelInfo
    })
  } catch (err) {
    console.error(err)
    toast.error('An error occured while creating a new channel')
  }
}

export const joinChannel = async (channelId, userId) => {
  try {
    const channelRef = doc(db, 'groups', channelId)
    await updateDoc(channelRef, {
      users: arrayUnion(userId)
    })
  } catch (err) {
    console.error(err)
    toast.error('An error occured while joining a channel')
  }
}

export const uploadFile = async (file, groupId, uid) => {
  try {
    const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      (error) => {
        console.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, 'messages'), {
            groupId,
            content: downloadURL,
            type: 'image',
            createdAt: serverTimestamp(),
            uid
          })
        })
        toast.success('File uploaded successfully', {
          position: 'top-center'
        })
      }
    )
  } catch (err) {
    console.error(err)
    toast.error('An error occured while uploading a file')
  }
}

export const addNewMessage = async (content, groupId, uid, type) => {
  try {
    await addDoc(collection(db, 'messages'), {
      groupId,
      content,
      type,
      createdAt: serverTimestamp(),
      uid
    })
  } catch (err) {
    console.error(err)
    toast.error('An error occured while sending a message')
  }
}

export const findUserByEmail = async (email) => {
  try {
    const userRef = query(
      collection(db, 'users'),
      where('email', '==', email.toLowerCase().trim())
    )
    const userDoc = (await getDocs(userRef)).docs[0].data()
    if (!userDoc) {
      toast.error('No user found with that email', {
        position: 'top-center'
      })
      return
    }
    return userDoc.uid
  } catch (err) {
    console.error(err)
    toast.error('An error occured while finding a user')
  }
}

export const saveUserTheme = async (theme) => {
  try {
    const userRef = collection(db, 'users')
    const q = query(userRef, where('uid', '==', auth.currentUser.uid))
    const userDoc = (await getDocs(q)).docs[0].ref
    await updateDoc(userDoc, {
      theme
    })
  } catch (err) {
    console.error(err)
    toast.error('An error occured while saving your theme')
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
  // createOrUpdateLastSeen,
  logout
}
