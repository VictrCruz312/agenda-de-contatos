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
import {
  ContainerModalStyled,
  ContainerTelefoneStyled,
  ListContatosStyled,
} from "./style";
import { GrClose } from "react-icons/gr";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Header from "../Header";
import { Telefone } from "@prisma/client";

type Contato = {
  id: number;
  nome: string;
  idade: string;
  telefones: Telefone[];
};

export type ISearch = {
  value?: string;
  searchType: "nome" | "telefone";
};

const ListarContatos = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [selectedContato, setSelectedContato] = useState<Contato | any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [search, setSearch] = useState<ISearch>({ searchType: "nome" });
  const [filteredContatos, setFilteredContatos] = useState<Contato[]>([]);

  const fetchContatos = async () => {
    const query = new URLSearchParams({
      // ...search,
    });
    const res = await fetch(`/api/contato?${query}`);
    const data = await res.json();
    setContatos(data);
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  useEffect(() => {
    if (createModalOpen) {
      setSelectedContato({ nome: "", idade: "", telefones: [{ numero: "" }] });
    }
  }, [createModalOpen]);

  useEffect(() => {
    const filtered = contatos.filter((contato) => {
      if (search.value) {
        if (search.searchType === "nome") {
          return contato.nome
            .toLowerCase()
            .includes(search.value.toLowerCase());
        } else if (search.searchType === "telefone") {
          return contato.telefones.some((telefone) =>
            telefone.numero.toLowerCase().includes(search.value!.toLowerCase())
          );
        }
      } else {
        return true;
      }
    });

    setFilteredContatos(filtered);
  }, [search, contatos]);

  const handleEditModalSave = async () => {
    console.log(selectedContato);
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

  const deleteContato = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/contato/${selectedContato?.id}`, {
          method: "DELETE",
        });
        console.log("1213", res);
        if (!res.ok) {
          // Se a resposta não for "ok", dispara um erro
          throw new Error("Erro ao salvar contato");
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  };

  const handleEditModalDelete = async () => {
    try {
      const res: any = await toast.promise(deleteContato(), {
        pending: "deletando",
        success: "deletado",
        error: "Não foi possível deletar, tente novamente",
      });
      if (res.ok) {
        const updatedContatos = contatos.filter(
          (c) => c.id !== selectedContato?.id
        );
        // atualizar o estado dos contatos com os dados atualizados
        setContatos(updatedContatos);
        setSelectedContato(null);
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveContato = async () => {
    const telefones = selectedContato?.telefones.map(
      (tel: Telefone) => tel.numero
    );
    const dataToCreate = {
      nome: selectedContato?.nome,
      idade: selectedContato?.idade,
      telefones: telefones,
    };

    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/contato/", {
          method: "POST",
          body: JSON.stringify(dataToCreate),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          // Se a resposta não for "ok", dispara um erro
          throw new Error("Erro ao salvar contato");
        }
        const data: Contato = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  };

  const handleCreateSave = async () => {
    try {
      const data: any = await toast.promise(saveContato(), {
        pending: "Salvando",
        success: "Salvo",
        error: "Não foi possível salvar, tente novamente",
      });
      // atualizar o estado dos contatos com os dados atualizados
      setContatos((contatos) => [...contatos, { ...data }]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header setSearch={setSearch} search={search} />
      <ListContatosStyled>
        <button
          className="createButton"
          onClick={() => setCreateModalOpen(true)}
        >
          <IoAddOutline />
          {}
        </button>
        <List className="list">
          {filteredContatos.map((contato) => (
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
                    <p key={index}>
                      telefone {index + 1}: {telefone.numero}
                    </p>
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
            <div className="inputs">
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
              {selectedContato?.telefones?.map(
                (telefone: Telefone, index: number) => {
                  return (
                    <ContainerTelefoneStyled key={index}>
                      <TextField
                        className="input"
                        label={`Telefone ${index + 1}`}
                        value={telefone.numero}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSelectedContato({
                            ...selectedContato,
                            telefones: selectedContato.telefones.map(
                              (t: Telefone, i: number) =>
                                i === index
                                  ? { ...t, numero: e.target.value }
                                  : t
                            ),
                          })
                        }
                      />
                      <Button
                        className="removeInput"
                        variant="contained"
                        onClick={() => {
                          setSelectedContato({
                            ...selectedContato,
                            telefones: selectedContato.telefones.filter(
                              (t: Telefone, i: number) => i !== index
                            ),
                          });
                        }}
                      >
                        <GrClose />
                      </Button>
                    </ContainerTelefoneStyled>
                  );
                }
              )}
              <Button
                variant="contained"
                onClick={() =>
                  setSelectedContato((contato: Contato) => {
                    return {
                      ...contato,
                      telefones: [...contato.telefones, { numero: "" }],
                    };
                  })
                }
              >
                Novo numero
              </Button>
            </div>
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
      <Modal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setSelectedContato(null);
        }}
      >
        <ContainerModalStyled>
          <div className="container">
            <div className="headerModal">
              <h2>Criar Contato</h2>
              <Button
                onClick={() => {
                  setCreateModalOpen(false);
                  setSelectedContato(null);
                }}
              >
                <GrClose />
              </Button>
            </div>
            <div className="inputs">
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
              {selectedContato?.telefones?.map(
                (telefone: Telefone, index: number) => {
                  return (
                    <ContainerTelefoneStyled key={index}>
                      <TextField
                        className="input"
                        label={`Telefone ${index + 1}`}
                        value={telefone.numero}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSelectedContato({
                            ...selectedContato,
                            telefones: selectedContato.telefones.map(
                              (t: Telefone, i: number) =>
                                i === index
                                  ? { ...t, numero: e.target.value }
                                  : t
                            ),
                          })
                        }
                      />
                      <Button
                        className="removeInput"
                        variant="contained"
                        onClick={() => {
                          setSelectedContato({
                            ...selectedContato,
                            telefones: selectedContato.telefones.filter(
                              (t: Telefone, i: number) => i !== index
                            ),
                          });
                        }}
                      >
                        <GrClose />
                      </Button>
                    </ContainerTelefoneStyled>
                  );
                }
              )}
              <Button
                variant="contained"
                onClick={() =>
                  setSelectedContato((contato: Contato) => {
                    if (selectedContato === null) {
                      return {
                        nome: "",
                        idade: "",
                        telefones: [{ numero: "" }],
                      };
                    }
                    console.log(contato);
                    return {
                      ...contato,
                      telefones: [...contato.telefones, { numero: "" }],
                    };
                  })
                }
              >
                Novo numero
              </Button>
            </div>
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
