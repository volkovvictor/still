'use client'

import useUsers from "@/store/useUsers";
import AccountInfo from "./AccountInfo";
import UserPhotos from "./userPhotos/UserPhotos";
import Loader from "@/ui/loader/Loader";
export default function Profile() {

    const user = useUsers(state => state.currentUser)

    console.log('user', user)

    return (
        <div style={{ position: 'relative' }}>
            {
                !user
                ? <div style={{ textAlign: "center" }}>Профиль не найден</div>
                : (
                    <>
                        <AccountInfo/>
                        <UserPhotos/>
                    </>
                )
            }
        </div>
    )
}