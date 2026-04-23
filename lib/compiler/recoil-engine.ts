// Multi-Stage Recoil Logic Engine
export const generateRecoilGPC = (meta: any, slot: number) => {
  return `
    // UNC BUILDER V5 - 2026 ARCHITECTURE
    init { if(get_slot() != ${slot}) load_slot(${slot}); }
    
    main {
        if(get_val(BUTTON_5)) { // Fire Pressed
            if(get_ptime(BUTTON_5) < 150) { 
                set_val(STICK_1_Y, ${meta.v_snap}); 
                set_val(STICK_1_X, ${meta.h_snap}); 
            } else { 
                set_val(STICK_1_Y, ${meta.v_steady}); 
                set_val(STICK_1_X, ${meta.h_steady}); 
            }
        }
    }
  `;
};
