import styled from "styled-components";
import { withTheme } from "@mui/styles";

export const ContainerModalStyled = styled.div`
  position: fixed;
  left: calc(100vw - 80vw);
  right: calc(100vw - 80vw);
  top: calc(100vh - 60vh);
  bottom: calc(100vh - 60vh);

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 80vw;
    height: 60vh;

    display: flex;
    flex-direction: column;
    gap: 10px;

    background: #f1f1f1;
    border-radius: 10px;
    padding: 10px;

    .headerModal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 10px;

      padding: 20px 0;
      overflow-y: auto;
    }

    .buttons {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      padding: 0 20px 20px 20px;

      .delete {
        background: red;
      }
    }
  }
`;

export const ListContatosStyled = withTheme(styled.div`
  display: flex;
  flex-direction: column;

  .createButton {
    position: fixed;
    bottom: 50px;
    right: 30px;
    align-self: flex-end;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;

    margin: 0;
    padding: 0 0 0 0;
    border: none;
    cursor: pointer;

    border: 2px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
      border-radius: 10px;
      background: ${(props) => props.theme.palette.primary.main};
      transition: 0.2s ease-in-out;

      svg {
        color: ${(props) => props.theme.palette.background.paper};
        transition: 0.2s ease-in-out;
      }
    }

    svg {
      width: 60px;
      height: 60px;
      color: ${(props) => props.theme.palette.primary.main};
    }

    :focus {
      outline: none;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    width: 100vw;
    height: 80vh;
    overflow-y: auto;

    .listItem {
      width: 80%;

      .listItemButton {
        background: #f2f2f2;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        color: ${(props) => props.theme.palette.text.primary};
        border: 2px solid ${(props) => props.theme.palette.primary.main};
        box-shadow: inset 5px -9px 20px 0px ${(props) => props.theme.palette.text.disabled};
        font-size: 18px;
        font-weight: 700;

        .container {
          display: flex;
          gap: 10px;
          position: absolute;
          top: 10px;
          left: 20px;
          z-index: 2;
          width: 88%;

          background: inherit;
          .idade {
            color: ${(props) => props.theme.palette.text.disabled};
            font-size: 14px;
          }
        }

        .telefones {
          padding: 40px 0 10px 20px;
          max-height: 110px;
          overflow: auto;
          z-index: 1;

          display: flex;
          flex-wrap: wrap;
          gap: 15px;

          width: 100%;

          color: ${(props) => props.theme.palette.text.secondary};
          font-size: 18px;
          font-weight: 800;
        }
      }
    }
  }
`);

export const ContainerTelefoneStyled = withTheme(styled.div`
  display: flex;
  gap: 10px;

  .input {
    width: 100%;
  }

  .removeInput {
    svg {
      width: 100%;
      height: 100%;
    }
  }
`);
