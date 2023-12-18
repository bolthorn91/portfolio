import { useAuth } from "hooks/useAuth"

export const MainComponent = ({children}) => {
    useAuth()
    return children;
}