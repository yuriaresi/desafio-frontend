import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../config/hook";
import { tarefasThunk } from "../config/modules/tarefas.slice";
import { api } from "../services/api.services";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./Modal";
import styled from "styled-components";

const DivBotao = styled.div`
  display: flex;
  align-items: center;
`;

const DivTarefa = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Tarefas = () => {
  const dispatch = useAppDispatch();
  const tarefas = useAppSelector((state) => state.tarefas);

  useEffect(() => {
    dispatch(tarefasThunk());
  }, [dispatch]);

  const deletarTarefa = async (id: string) => {
    try {
      const response = await api.delete(`/${id}`);
      console.log(response);
      dispatch(tarefasThunk());
      return alert("Tarefa deletada com sucesso");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <>
      {tarefas.map((item, index) => (
        <Grid style={{ margin: "5px" }} key={index} item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <DivTarefa>
                <h2>{item.titulo}</h2>
                <DivBotao>
                  <Button onClick={() => deletarTarefa(item.id!)}>
                    <DeleteIcon color="error" />
                  </Button>
                  <BasicModal id={item.id!} />
                </DivBotao>
              </DivTarefa>
            </AccordionSummary>
            <AccordionDetails>{item.descricao}</AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </>
  );
};
