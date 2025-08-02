const csrfToken = localStorage.getItem("csrf_token");

// ***********Users********************

export const fetchUsers = async() => {
    try {
        const res = await fetch("https://tamkeen-dev.com/api/users-list?_format=json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken || "",
            },
            credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        return data.rows || [];
    } catch (error) {
        throw error;
    }
};
// ***********deleteUser********************

export const deleteUser = async(uid) => {
    try {
        const res = await fetch(`https://tamkeen-dev.com/api/user/${uid}?_format=json`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken || "",
            },
            credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to delete user");
        return true;
    } catch (error) {
        throw  error;  
    }
};