// helpers/checkUserRegistration.js

export const checkUserRegistration = async (nickname) => {
  try {
    const response = await fetch(`/api/users?nickname=${nickname}`);
    if (response.ok) {
      const data = await response.json();
      return { found: data.found, user: data.user };
    } else {
      console.error("Failed to check user registration");
      return { found: false };
    }
  } catch (error) {
    console.error("Error checking registration:", error);
    return { found: false }; // Set status gagal jika terjadi error
  }
};
