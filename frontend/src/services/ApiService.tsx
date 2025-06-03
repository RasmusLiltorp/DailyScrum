const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5237/api';

export interface Lobby {
  id: string;
  code: string;
  createdAt: string;
  entries: Entry[];
}

export interface Entry {
  id: string;
  lobbyId: string;
  name: string;
  yesterday: string;
  today: string;
  blockers: string;
  submittedAt: string;
}

export interface CreateEntryDTO {
  name: string;
  yesterday: string;
  today: string;
  blockers: string;
}

const LOBBY_COOKIE_NAME = 'daily_scrum_lobby';
const LAST_CREATED_COOKIE_NAME = 'last_lobby_created_at';

const setCookie = (name: string, value: string, expiryMinutes = 60) => {
  const date = new Date();
  date.setTime(date.getTime() + (expiryMinutes * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null; 
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'An unknown error occurred';
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || `Server returned ${response.status}`;
  } catch (e) {
    errorMessage = `Server returned ${response.status}`;
  }
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage);
};

export const ApiService = {
  canCreateLobby: (): boolean => {
    if (typeof window === 'undefined') return true; 
    
    const lastCreatedAt = getCookie(LAST_CREATED_COOKIE_NAME);
    if (!lastCreatedAt) return true;
    
    const lastCreatedTime = parseInt(lastCreatedAt, 10);
    const now = Date.now();
    
    // Allow creation if more than 1 minute has passed
    return (now - lastCreatedTime) > 60000;
  },
  
  getRecentLobby: (): Lobby | null => {
    if (typeof window === 'undefined') return null;
    
    const lobbyCookie = getCookie(LOBBY_COOKIE_NAME);
    if (!lobbyCookie) return null;
    
    try {
      const lobby = JSON.parse(lobbyCookie) as Lobby;
      const createdAt = new Date(lobby.createdAt).getTime();
      const now = Date.now();
      
      if ((now - createdAt) <= 60000) {
        return lobby;
      } else {
        // Clean up expired cookie
        deleteCookie(LOBBY_COOKIE_NAME);
        return null;
      }
    } catch (e) {
      deleteCookie(LOBBY_COOKIE_NAME);
      return null;
    }
  },
  
  createLobby: async (captchaToken: string): Promise<Lobby> => {
    if (typeof window !== 'undefined' && !ApiService.canCreateLobby()) {
      throw new Error('You can only create one lobby per minute. Please try again later.');
    }
    
    const response = await fetch(`${API_BASE_URL}/lobby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ captchaToken }),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const lobby = await response.json();
    
    // Save lobby data and creation timestamp to cookies
    if (typeof window !== 'undefined') {
      setCookie(LOBBY_COOKIE_NAME, JSON.stringify(lobby), 2);
      setCookie(LAST_CREATED_COOKIE_NAME, Date.now().toString(), 2); 
    }
    
    return lobby;
  },
  
  getLobby: async (code: string): Promise<Lobby> => {
    const response = await fetch(`${API_BASE_URL}/lobby/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    return response.json();
  },
 
  addEntry: async (code: string, entry: CreateEntryDTO): Promise<Entry> => {
    const response = await fetch(`${API_BASE_URL}/lobby/${code}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    return response.json();
  },
};

export default ApiService;