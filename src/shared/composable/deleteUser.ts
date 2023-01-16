import { userStore } from "../store/UserStore"
// // // export const deleteUser = async (id: string) => {
// // //     const UserStore = userStore()
// // //     fetch(UserStore.url + '/' + id, { method: 'DELETE' })
import { db } from '../composable/firebase'
import { doc, deleteDoc, } from "firebase/firestore";

export const deleteUser = async (id: string) => {
    let UserStore = userStore()
    await deleteDoc(doc(db, 'users', id))
    UserStore.users = UserStore.users.filter((user) => user.id !== id)
    UserStore.getData()
}