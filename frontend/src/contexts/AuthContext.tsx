import React, { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "../lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOutUser: async () => {} })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const signOutUser = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
