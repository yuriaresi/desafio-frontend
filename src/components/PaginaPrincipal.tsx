import { Container, Typography } from "@mui/material";
import { NovaTarefa } from "./NovaTarefa";
import { Tarefas } from "./ListaDeTarefas";
import { useAppDispatch, useAppSelector } from "../config/hook";
import { useEffect } from "react";
import { tarefasThunk } from "../config/modules/tarefas.slice";
import styled from "styled-components";

const TituloStyled = styled.h1`
  display: flex;
  justify-content: center;
`;
const TypographyStyled = styled(Typography)`
  display: flex;
  justify-content: center;
`;
export const PaginaPrincipal = () => {
  const dispatch = useAppDispatch();
  const tarefas = useAppSelector((state) => state.tarefas);

  useEffect(() => {
    dispatch(tarefasThunk());
  }, [dispatch]);
  console.log(tarefas);

  return (
    <>
      <Container>
        <TypographyStyled
          style={{ marginTop: "50px" }}
          variant="h2"
          gutterBottom
        >
          Lista de tarefas
        </TypographyStyled>

        <NovaTarefa />
        {tarefas.length === 0 ? (
          <TituloStyled>Crie uma nova tarefa.</TituloStyled>
        ) : (
          <Tarefas />
        )}
      </Container>
    </>
  );
};
