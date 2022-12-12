import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function PrivateRoute({ children }) {
    const { user } = useGlobalContext();

    if (!user) {
        return <Navigate replace to="/login" />
    }

    return children;
}
