import Title from "@/ui/title/Title";
import locales from "@/locales/locales";
import Admin from "./(components)/Admin";

const locale = locales()

export default function AdminPage() {
  return (
    <div>
        <Admin/>
    </div>
  );
}