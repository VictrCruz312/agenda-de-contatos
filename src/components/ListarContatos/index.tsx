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
import { contatoSchema, formatPhoneNumber } from "../../schema";
import { getIn } from "yup";

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
  const [errors, setErrors] = useState<any>({});

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
    setErrors({});
  }, [selectedContato]);

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
          return contato.telefones.some((telefone) => {
            return telefone.numero
              .replace(/\D/g, "")
              .toLowerCase()
              .includes(search.value!.replace(/\D/g, "").toLowerCase());
          });
        }
      } else {
        return true;
      }
    });

    setFilteredContatos(filtered);
  }, [search, contatos]);

  const validateForm = async () => {
    console.log(selectedContato);
    try {
      await contatoSchema.validate(selectedContato, { abortEarly: false });
    } catch (error: any) {
      const newErrors: any = {};
      error.inner.forEach((fieldError: any) => {
        newErrors[fieldError.path] = fieldError.message;
      });
      setErrors(newErrors);
      throw new Error("campos inválidos");
    }
  };

  const editContato = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        await validateForm();

        const res = await fetch(`/api/contato/${selectedContato?.id}`, {
          method: "PATCH",
          body: JSON.stringify(selectedContato),
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

  const handleEditModalSave = async () => {
    try {
      const data: any = await toast.promise(editContato(), {
        pending: "Salvando",
        success: "Salvo",
        error: "Não foi possível salvar, tente novamente",
      });

      // atualizar o estado dos contatos com os dados atualizados
      const updatedContatos = contatos.map((c) =>
        c.id === data.id ? data : c
      );
      setContatos(updatedContatos);
      setSelectedContato(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContato = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/contato/${selectedContato?.id}`, {
          method: "DELETE",
        });
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
        await validateForm();
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
                      telefone {index + 1}: {formatPhoneNumber(telefone.numero)}
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
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditModalSave();
              }}
            >
              <div className="inputs">
                <TextField
                  label="Nome"
                  required
                  error={Boolean(errors.nome)}
                  helperText={errors.nome}
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
                  required
                  error={Boolean(errors.idade)}
                  helperText={errors.idade}
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
                    const telefoneError = errors[`telefones[${index}].numero`];
                    return (
                      <ContainerTelefoneStyled key={index}>
                        <TextField
                          className="input"
                          label={`Telefone ${index + 1}`}
                          required
                          value={formatPhoneNumber(telefone.numero)}
                          error={Boolean(telefoneError)}
                          helperText={telefoneError}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSelectedContato({
                              ...selectedContato,
                              telefones: selectedContato.telefones.map(
                                (t: Telefone, i: number) =>
                                  i === index
                                    ? {
                                        ...t,
                                        numero: formatPhoneNumber(
                                          e.target.value
                                        ),
                                      }
                                    : t
                              ),
                            })
                          }
                        />
                        <Button
                          className="removeInput"
                          variant="text"
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
                  className="buttonAddNumber"
                  variant="text"
                  onClick={() =>
                    setSelectedContato((contato: Contato) => {
                      return {
                        ...contato,
                        telefones: [...contato.telefones, { numero: "" }],
                      };
                    })
                  }
                >
                  Adicionar novo numero
                </Button>
              </div>
              <div className="buttons">
                <Button variant="contained" type="submit">
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
            </form>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateSave();
              }}
            >
              <div className="inputs">
                <TextField
                  label="Nome"
                  required
                  error={Boolean(errors.nome)}
                  helperText={errors.nome}
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
                  required
                  error={Boolean(errors.idade)}
                  helperText={errors.idade}
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
                    const telefoneError = errors[`telefones[${index}].numero`];
                    return (
                      <ContainerTelefoneStyled key={index}>
                        <TextField
                          className="input"
                          label={`Telefone ${index + 1}`}
                          required
                          value={formatPhoneNumber(telefone.numero)}
                          error={Boolean(telefoneError)}
                          helperText={telefoneError}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSelectedContato({
                              ...selectedContato,
                              telefones: selectedContato.telefones.map(
                                (t: Telefone, i: number) =>
                                  i === index
                                    ? {
                                        ...t,
                                        numero: formatPhoneNumber(
                                          e.target.value
                                        ),
                                      }
                                    : t
                              ),
                            })
                          }
                        />
                        <Button
                          className="removeInput"
                          variant="text"
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
                  className="buttonAddNumber"
                  variant="text"
                  onClick={() =>
                    setSelectedContato((contato: Contato) => {
                      if (selectedContato === null) {
                        return {
                          nome: "",
                          idade: "",
                          telefones: [{ numero: "" }],
                        };
                      }

                      return {
                        ...contato,
                        telefones: [...contato.telefones, { numero: "" }],
                      };
                    })
                  }
                >
                  adicionar novo numero
                </Button>
              </div>
              <div className="buttons">
                <Button variant="contained" type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </ContainerModalStyled>
      </Modal>
    </>
  );
};

export default ListarContatos;
