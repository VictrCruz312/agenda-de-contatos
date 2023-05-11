import * as Yup from "yup";

export const contatoSchema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  idade: Yup.number()
    .typeError("A idade deve ser um número")
    .min(1, "A idade deve ser maior ou igual a 1")
    .max(125, "A idade deve ser menor ou igual a 125"),
  telefones: Yup.array().of(
    Yup.object().shape({
      numero: Yup.string()
        .required("Telefone é obrigatório")
        .matches(
          /^\(\d{2}\) \d{4,5}-\d{4}$/,
          "Telefone inválido, ex: DDD + NÚMERO (xx) xxxx-xxxx ou (xx) xxxxx-xxxx"
        ),
    })
  ),
});

export const formatPhoneNumber = (phoneNumberString: string | undefined) => {
  if (!phoneNumberString) {
    return "";
  }

  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  const maxLength = 11;
  const digits = cleaned.slice(0, maxLength);

  const match = digits.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumberString;
};
