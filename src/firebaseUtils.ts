import { type Firestore, collection, getDocs, orderBy, query } from 'firebase/firestore'

export interface FirebaseProps {
    db: Firestore
    collectionName: string
    orderByField: string
    orderDirection?: 'asc' | 'desc'
}

export async function fetchFire<T> (db: Firestore, collectionName: string, orderByField: string, orderDirection: 'asc' | 'desc' = 'asc'): Promise<T[]> {
    const collectionRef = collection(db, collectionName)
    const queryConstraint = query(collectionRef, orderBy(orderByField, orderDirection))
    const querySnapshot = await getDocs(queryConstraint)
    return querySnapshot.docs.map(doc => doc.data()) as T[]
}
