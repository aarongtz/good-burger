import { createAppSlice } from "@/constants";

import { ModeSwitcherType, ModeTypes } from "@/typings/Navigation";

const initialState: ModeSwitcherType = {
    modeType: ModeTypes.dark
};

const visualModeSlice = createAppSlice({
    name: 'visualModeSlice',
    initialState,
    reducers: {
        toggleType(state){
            if(state.modeType === ModeTypes.dark) {
                state.modeType = ModeTypes.light;
            }
            else {
                state.modeType = ModeTypes.dark;
            }
        }
    }
});

export const { toggleType } = visualModeSlice.actions;


export default visualModeSlice.reducer;