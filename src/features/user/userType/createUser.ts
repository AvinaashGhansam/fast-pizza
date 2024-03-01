export interface UserState {
  username: string;
  status?: "idle" | "loading" | "error";
  position?: { latitude: string; longitude: string };
  address?: string;
  error?: string;
}
