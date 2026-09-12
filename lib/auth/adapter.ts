import type { User } from 'firebase/auth'
import { firebaseAuth, googleProvider } from '@/lib/firebase/client'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export type AuthMode = 'signin' | 'signup'
export type AuthResult = { user: User | null; mode: 'firebase' | 'demo' }

export async function authenticate(email: string, password: string, mode: AuthMode, demo = false): Promise<AuthResult> {
  if (demo || !firebaseAuth) return { user: null, mode: 'demo' }
  const result = mode === 'signin'
    ? await signInWithEmailAndPassword(firebaseAuth, email, password)
    : await createUserWithEmailAndPassword(firebaseAuth, email, password)
  return { user: result.user, mode: 'firebase' }
}

export async function authenticateWithGoogle(demo = false): Promise<AuthResult> {
  if (demo || !firebaseAuth) return { user: null, mode: 'demo' }
  const result = await signInWithPopup(firebaseAuth, googleProvider)
  return { user: result.user, mode: 'firebase' }
}

export async function signOutCurrentUser() {
  if (firebaseAuth) await signOut(firebaseAuth)
}
