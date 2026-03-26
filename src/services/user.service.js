const BASE_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`);

    if (res.status !== 200) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }

    return await res.json();
  } catch (err) {
    console.error("GET USERS ERROR:", err.message);
    throw err; // pass to UI
  }
};

export const createUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 201) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    return await res.json();
  } catch (err) {
    console.error("CREATE USER ERROR:", err.message);
    throw err;
  }
};