import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://syxuyepnbutpssmtnfce.supabase.co',
    'sb_publishable_G4DpE_b8q90fZUmVDIakfg_xGOCuZ_S'
  )
}
