import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore'
import { firebaseDb } from '@/lib/firebase/client'
import { normalizeSavedDocuments, type SavedDocument } from '@/lib/document/storage'

function documentsCollection(uid: string) {
  return collection(firebaseDb, 'users', uid, 'documents')
}

function assertUser(uid: string) {
  if (!uid) throw new Error('A signed-in user is required.')
}

export async function getCloudDocuments(uid: string): Promise<SavedDocument[]> {
  assertUser(uid)
  const snapshot = await getDocs(query(documentsCollection(uid), orderBy('updatedAt', 'desc')))
  return normalizeSavedDocuments(snapshot.docs.map((item) => item.data()))
}

export async function saveCloudDocument(uid: string, document: SavedDocument): Promise<SavedDocument> {
  assertUser(uid)
  await setDoc(doc(documentsCollection(uid), document.id), document)
  return document
}

export async function deleteCloudDocument(uid: string, documentId: string) {
  assertUser(uid)
  await deleteDoc(doc(documentsCollection(uid), documentId))
}

export async function duplicateCloudDocument(uid: string, source: SavedDocument): Promise<SavedDocument> {
  assertUser(uid)
  const now = new Date().toISOString()
  const copy: SavedDocument = {
    ...source,
    id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: `${source.title} copy`,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  }
  await saveCloudDocument(uid, copy)
  return copy
}
