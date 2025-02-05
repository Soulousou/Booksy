import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    // Fetch user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("/profile");
                console.log("Context :", data)
                if (data) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            }
        };
        fetchProfile();
    }, []); 

    // Function to manually refresh the user profile
    const refreshProfile = async () => {
        try {
            const { data } = await axios.get("/profile");
            if (data) {
                setUser(data);
            }
        } catch (err) {
            console.error("Failed to refresh user profile:", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, refreshProfile }}>
            {children}
        </UserContext.Provider>
    );
}