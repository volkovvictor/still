import Input from "@/ui/input/Input";
import locales from "@/locales/locales";

const locale = locales()

export default function Login() {
    return (
        <div>
            <Input label={locale.emailOrPhone} name="login"/>
        </div>
    )
}