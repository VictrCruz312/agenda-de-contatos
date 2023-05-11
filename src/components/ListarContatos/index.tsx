"use client";

import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { ContainerModalStyled, ListContatosStyled } from "./style";
import { GrClose } from "react-icons/gr";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type Contato = {
  id: number;
  nome: string;
  idade: string;
  telefones: string[];
};

const ListarContatos = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [selectedContato, setSelectedContato] = useState<Contato | any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchContatos = async () => {
    const query = new URLSearchParams({
      // nome: "",
      // idade: "",
    });
    const res = await fetch(`/api/contato?${query}`);
    const data = await res.json();
    setContatos(data);
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  const handleEditModalSave = async () => {
    const res = await toast.promise(
      fetch(`/api/contato/${selectedContato?.id}`, {
        method: "PATCH",
        body: JSON.stringify(selectedContato),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        pending: "Salvando",
        success: "Salvo",
        error: "Não foi possível salvar, tente novamente",
      }
    );
    const data = await res.json();
    // atualizar o estado dos contatos com os dados atualizados
    const updatedContatos = contatos.map((c) => (c.id === data.id ? data : c));
    setContatos(updatedContatos);
    setSelectedContato(null);
    setEditModalOpen(false);
  };

  const handleEditModalDelete = async () => {
    const res = await toast.promise(
      fetch(`/api/contato/${selectedContato?.id}`, {
        method: "DELETE",
      }),
      {
        pending: "deletando",
        success: "deletado",
        error: "Não foi possível deletar, tente novamente",
      }
    );
    if (res.ok) {
      const updatedContatos = contatos.filter(
        (c) => c.id !== selectedContato?.id
      );
      setContatos(updatedContatos);
      setSelectedContato(null);
      setEditModalOpen(false);
    }
  };

  const handleCreateSave = async () => {
    const res = await toast.promise(
      fetch("/api/contato/", {
        method: "POST",
        body: JSON.stringify(selectedContato),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        pending: "Salvando",
        success: "Salvo",
        error: "Não foi possível salvar, tente novamente",
      }
    );
    const data = await res.json();
    // atualizar o estado dos contatos com os dados atualizados
    setContatos((contatos) => [...contatos, { ...data, telefones: [] }]);
    setCreateModalOpen(false);
  };

  return (
    <>
      <ListContatosStyled>
        <button
          className="createButton"
          onClick={() => setCreateModalOpen(true)}
        >
          <IoAddOutline />
          {}
        </button>
        <List className="list">
          {contatos.map((contato) => (
            <ListItem className="listItem" key={contato.id}>
              <ListItemButton
                className="listItemButton"
                onClick={() => {
                  setSelectedContato(contato);
                  setEditModalOpen(true);
                }}
              >
                <div className="container">
                  <p>{contato.nome}</p>
                  <p className="idade"> {contato.idade} anos</p>
                </div>
                <div className="telefones">
                  {contato.telefones.map((telefone, index) => (
                    <p key={index}>{telefone}a</p>
                  ))}
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ListContatosStyled>
      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedContato(null);
        }}
      >
        <ContainerModalStyled>
          <div className="container">
            <div className="headerModal">
              <h2>Editar Contato</h2>
              <Button
                onClick={() => {
                  setEditModalOpen(false);
                  setSelectedContato(null);
                }}
              >
                <GrClose />
              </Button>
            </div>
            <TextField
              label="Nome"
              value={selectedContato?.nome || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  nome: e.target.value,
                })
              }
            />
            <TextField
              label="Idade"
              value={selectedContato?.idade || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  idade: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Telefones"
              value={selectedContato?.telefones?.join(", ") || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  telefones: e.target.value.split(", "),
                })
              }
            />
            <div className="buttons">
              <Button variant="contained" onClick={handleEditModalSave}>
                Salvar
              </Button>
              <Button
                className="delete"
                variant="contained"
                onClick={handleEditModalDelete}
              >
                Excluir
              </Button>
            </div>
          </div>
        </ContainerModalStyled>
      </Modal>
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <ContainerModalStyled>
          <div className="container">
            <div className="headerModal">
              <h2>Criar Contato</h2>
              <Button onClick={() => setCreateModalOpen(false)}>
                <GrClose />
              </Button>
            </div>
            <TextField
              label="Nome"
              value={selectedContato?.nome || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  nome: e.target.value,
                })
              }
            />
            <TextField
              label="Idade"
              value={selectedContato?.idade || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  idade: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Telefones"
              value={selectedContato?.telefones?.join(", ") || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedContato({
                  ...selectedContato,
                  telefones: e.target.value.split(", "),
                })
              }
            />
            <div className="buttons">
              <Button variant="contained" onClick={handleCreateSave}>
                Salvar
              </Button>
            </div>
          </div>
        </ContainerModalStyled>
      </Modal>
    </>
  );
};

export default ListarContatos;
