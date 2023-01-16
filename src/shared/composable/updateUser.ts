import { userStore } from "../store/UserStore"
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../composable/firebase'
import type { User } from '../utils/User.interface'

// export const updateUser = async (id: string, newName:string) => {
//     const UserStore = userStore()
//     fetch(UserStore.url + '/' + id, {
//         method: 'PATCH',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: newName
//         })
//     }).catch(err => console.log('Error:', err))
// }
export const updateUser = async (id: string, newUser: User) => {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, {
        name: newUser.name,
        address: newUser.address,
        phone: newUser.phone,
    });
}