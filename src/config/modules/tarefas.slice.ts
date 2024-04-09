import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api.services";
import { TarefasModel } from "../../models/Tarefas";

export const tarefasThunk = createAsyncThunk("tarefas/get", async () => {
  try {
    const response = await api.get("/tarefas");
    return response.data.data as TarefasModel[];
  } catch (error: any) {
    return error.response.data.message;
  }
});

const tarefasSlice = createSlice({
  name: "Tarefas",
  initialState: [] as TarefasModel[],
  reducers: {
    adicionarTarefa(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      tarefasThunk.fulfilled,
      (_, action: PayloadAction<TarefasModel[]>) => {
        return action.payload;
      }
    );
  },
});

export default tarefasSlice.reducer;

export const { adicionarTarefa } = tarefasSlice.actions;
