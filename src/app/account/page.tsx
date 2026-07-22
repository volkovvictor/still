import Title from "@/ui/title/Title";
import AccountInfo from "./(components)/AccountInfo";
import UserPhotos from "./(components)/userPhotos/UserPhotos";
import locales from "@/locales/locales";
import Photos from "@/components/photos/Photos";

const locale = locales()

export default function Account() {
    return (
        <div>
            <Title title={locale.account}/>
            <AccountInfo/>
            <UserPhotos/>
        </div>
    )
}