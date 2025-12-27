import { useQuery } from '@tanstack/react-query';

interface AuthUser {
  _id: string;
  username: string;
  permission: string;
}

export function useAuthUser() {
  return useQuery<AuthUser | null>({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
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
