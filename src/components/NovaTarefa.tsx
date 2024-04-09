import { Button, Grid, TextField } from "@mui/material";
import { api } from "../services/api.services";
import { useDispatch } from "react-redux";
import { adicionarTarefa } from "../config/modules/tarefas.slice";
import styled from "styled-components";
import { useState } from "react";

const TextFieldStyled = styled(TextField)`
  width: 90%;
  textarea {
    color: white;
  }
  label {
    color: white;
  }
`;

const DivBotaoStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;

  Button {
    border: solid 1px #2e7d32;
    &:hover {
      background-color: #dcf3dd;
    }
  }
`;

export const NovaTarefa = () => {
  const dispatch = useDispatch();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const CriarTarefa = async (event: any) => {
    try {
      event.preventDefault();
      const body = {
        titulo: titulo,
        descricao: descricao,
      };

      const result = await api.post("/tarefas", body);

      console.log(result.data.data, "aqui");

      dispatch(adicionarTarefa(result.data.data));

      event.target.titulo.value = "";
      event.target.descricao.value = "";
      alert("Tarefa criada com sucesso");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={CriarTarefa}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextFieldStyled
              style={{ marginBottom: "30px", marginTop: "30px" }}
              onChange={(event) => setTitulo(event.target.value)}
              id="titulo"
              label="Tarefa"
              placeholder="Tarefa"
              multiline
              variant="outlined"
              color="success"
              focused
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldStyled
              style={{ marginTop: "30px" }}
              onChange={(event) => setDescricao(event.target.value)}
              id="descricao"
              label="Descrição"
              placeholder="Descreva sua tarefa"
              multiline
              variant="outlined"
              color="success"
              focused
            />
          </Grid>
        </Grid>
        <DivBotaoStyled>
          <Button style={{ marginRight: "47px" }} color="success" type="submit">
            Criar
          </Button>
        </DivBotaoStyled>
      </form>
    </>
  );
};
