import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { api } from "../services/api.services";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../config/hook";
import { tarefasThunk } from "../config/modules/tarefas.slice";

const style = {
  display: "flex",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const DivButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  Button {
    border: solid 1px #2e7d32;
    &:hover {
      background-color: #dcf3dd;
    }
  }
`;

interface BasicModalProps {
  id: string;
}

export default function BasicModal(props: BasicModalProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const atualizarTarefa = async (event: any) => {
    event.preventDefault();
    try {
      const body = {
        titulo: event.target.titulo.value,
        descricao: event.target.descricao.value,
      };
      const response = await api.put(`/${props.id}`, body);
      console.log(response, "aqui");
      handleClose();
      dispatch(tarefasThunk);
      console.log(dispatch(tarefasThunk()));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <Grid item xs={12}>
      <Button onClick={handleOpen}>
        <EditIcon color="primary" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
          <form onSubmit={atualizarTarefa} style={{ width: "100%" }}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                id="titulo"
                label="Tarefa"
                placeholder="Tarefa"
                multiline
                variant="outlined"
                color="success"
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                }}
                id="descricao"
                label="Descrição"
                placeholder="Descreva sua tarefa"
                multiline
                variant="outlined"
                color="success"
                focused
                inputProps={{ wrap: "soft" }}
              />
            </Grid>
            <DivButton>
              <Button color="success" type="submit">
                Atualizar
              </Button>
            </DivButton>
          </form>
        </Grid>
      </Modal>
    </Grid>
  );
}
