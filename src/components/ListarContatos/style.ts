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
    padding: 0 0 0 3px;
    border: none;
    cursor: pointer;

    border: 2px solid ${(props) => props.theme.palette.primary.main};
    border-radius: 10px;

    svg {
      width: 60px;
      height: 60px;
      color: ${(props) => props.theme.palette.primary.main};
    }

    &:focus {
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
        height: 60px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        color: ${(props) => props.theme.palette.text.primary};
        font-size: 18px;
        font-weight: 700;

        .container {
          display: flex;
          gap: 10px;
          position: absolute;
          top: 10px;
          left: 20px;

          .idade {
            color: ${(props) => props.theme.palette.text.disabled};
            font-size: 14px;
          }
        }

        .telefones {
          display: flex;
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
