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

  @media screen and (max-width: 768px) {
    left: calc(100vw - 99vw);
    right: calc(100vw - 99vw);
  }

  .container {
    width: 80vw;
    height: 60vh;

    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    background: #f1f1f1;
    border-radius: 0.625rem;
    padding: 0.625rem;

    @media screen and (max-width: 768px) {
      width: 96vw;
    }

    .headerModal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3125rem 0.625rem;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;

      height: 341px;
      padding: 1.25rem 0;
      overflow-y: auto;

      .buttonAddNumber {
        width: 13.75rem;
        align-self: center;
        box-shadow: inset -2px -2px 2px 0px;
      }
    }

    .buttons {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      padding: 0 1.25rem 1.25rem 1.25rem;

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
    bottom: 3.125rem;
    right: 1.875rem;
    align-self: flex-end;
    z-index: 3;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.75rem;
    height: 3.75rem;

    margin: 0;
    padding: 0 0 0 0;
    border: none;
    cursor: pointer;

    border: 2px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
      border-radius: 0.625rem;
      background: ${(props) => props.theme.palette.primary.main};
      transition: 0.2s ease-in-out;

      svg {
        color: ${(props) => props.theme.palette.background.paper};
        transition: 0.2s ease-in-out;
      }
    }

    svg {
      width: 3.75rem;
      height: 3.75rem;
      color: ${(props) => props.theme.palette.primary.main};
    }

    :focus {
      outline: none;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    align-items: center;

    width: 100vw;
    height: 80vh;
    overflow-y: auto;

    .listItem {
      width: 80%;
      @media screen and (max-width: 768px) {
        width: 99%;
      }

      .listItemButton {
        background: #f2f2f2;
        border-radius: 0.625rem;

        display: flex;
        flex-direction: column;
        gap: 0.625rem;

        color: ${(props) => props.theme.palette.text.primary};
        border: 2px solid ${(props) => props.theme.palette.primary.main};
        box-shadow: inset 5px -9px 1.25rem 0px ${(props) => props.theme.palette.text.disabled};
        font-size: 18px;
        font-weight: 700;

        .container {
          display: flex;
          gap: 0.625rem;
          position: absolute;
          top: 0;
          padding-top: 0.625rem;
          left: 1.25rem;
          z-index: 2;
          width: 86%;

          background: inherit;
          .idade {
            color: ${(props) => props.theme.palette.text.disabled};
            font-size: 14px;
          }
        }

        .telefones {
          padding: 2.5rem 0 0.625rem 1.25rem;
          max-height: 6.875rem;
          overflow: auto;
          z-index: 1;

          display: flex;
          flex-wrap: wrap;
          gap: 0.9375rem;

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
  gap: 0.625rem;

  .input {
    width: 100%;
  }

  .removeInput {
    svg {
      width: 80%;
      height: 80%;
    }
  }
`);
