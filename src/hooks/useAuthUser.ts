import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';

interface AuthUser {
  _id: string;
  username: string;
  permission: string;
  lastLogin?: string | null;
}

export function useAuthUser() {
  return useQuery<AuthUser | null>({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) return null;
        return data;
      } catch (error) {
        console.error('Error fetching auth user:', error);
        return null;
      }
    },
    retry: false,
  });
}
