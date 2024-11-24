import PocketBase from 'pocketbase';

const pb = new PocketBase('https://dbrskaji.pockethost.io');

export const login = async (email: string, password: string) => {
  try {
    const authData = await pb.collection('admins').authWithPassword(email, password);
    
    if (pb.authStore.isValid) {
      return {
        success: true,
        user: pb.authStore.model,
        token: pb.authStore.token
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login.'
    };
  }
};

export const logout = () => {
  try {
    pb.authStore.clear();
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during logout.'
    };
  }
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};

// New function to update user profile
export const updateProfile = async (name: string, email: string) => {
  const user = pb.authStore.model; // Get the current user
  if (!user) {
    return { success: false, error: 'User not authenticated.' };
  }

  try {
    // Update the user profile in the database
    await pb.collection('users').update(user.id, { name, email });
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during profile update.'
    };
  }
};
