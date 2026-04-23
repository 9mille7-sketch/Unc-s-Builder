// Hardware & User Interfaces (placeholder)

export interface UserProfile {
  id: string;
  username: string;
  standing: 'GUEST' | 'PREMIUM' | 'STAFF' | 'OWNER';
  xim_access: boolean;
  zen_access: boolean;
  locked_hwid: string;
  created_at: string;
}

export interface GameMeta {
  id: string;
  game_name: string;
  weapon_name: string;
  v_snap: number;
  h_snap: number;
  v_steady: number;
  h_steady: number;
  jitter_enabled: boolean;
  last_updated: string;
}

export interface UserInjection {
  id: string;
  target_user_id: string;
  staff_id: string;
  payload_base64: string;
  slot_target: number;
  status: 'PENDING' | 'FLASHED';
}
