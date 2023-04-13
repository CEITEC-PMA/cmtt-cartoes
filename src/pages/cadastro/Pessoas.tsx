import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { IUnFormsErrors, UnForm, UnTextField, useUnForm } from "../../forms";
import * as yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import Veiculos from "./Taxi";
import jsPDF from "jspdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import imagem from "../../../public/dadosTaxi.jpg";

const Pessoas = () => {
  const navigate = useNavigate();

  const { saveAndClose, isSaveAndClose } = useUnForm();
  const [isLoading, setIsLoading] = useState(false);
  const { formRef } = useUnForm();

  const handleSave = (dados: any) => {
    console.log(dados);

    schema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        console.log(dadosValidados);
        toast.success("Cadastro feito com sucesso!");

        setTimeout(() => {
          // navigate("/cadastroveiculos");
        }, 500);
      })

      .catch((errors: yup.ValidationError) => {
        toast.error("Precisa validar todos os campos!");
        const validationErrors: IUnFormsErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    rg: yup.string().required(),
    cpf: yup.string().min(11, "O CPF precisa de 11 números").required(),
    numeroCnh: yup.string().required(),
    categoriaCnh: yup.string().required(),
    validadeCnh: yup.string().required(),
    endereco: yup.string().required(),
    cidade: yup.string().required(),
    cep: yup.string().required(),
    numeroRegistro: yup.string().required(),
    numeroInscricao: yup.string().required(),
    grupoSanguineo: yup.string().required(),
  });

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <UnForm ref={formRef} onSubmit={handleSave}>
        <Grid container display="flex" justifyContent="center">
          <Grid item my={2}>
            <Typography variant="h6">Cadastro Pessoas</Typography>
          </Grid>
        </Grid>
        <Grid container display="flex" justifyContent="center">
          <Grid item mb={2}>
            <Divider sx={{ width: 500 }} />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction={smDown ? "column" : "row"}
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="name" label="Nome" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="rg" label="RG" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="cpf" label="CPF" />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction={smDown ? "column" : "row"}
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="numeroCnh" label="Número a CNH" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="categoriaCnh" label="Categoria da CNH" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="validadeCnh" label="Validade da CNH" />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction={smDown ? "column" : "row"}
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="endereco" label="Endereco" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="cidade" label="Cidade" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="cep" label="CEP" />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction={smDown ? "column" : "row"}
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <UnTextField name="numeroRegistro" label="N registro" />
          </Grid>
          <Grid item>
            <UnTextField name="numeroInscricao" label="N incricao" />
          </Grid>
          <Grid item>
            <UnTextField name="grupoSanguineo" label="Grupo sanguineo" />
          </Grid>
        </Grid>

        <Grid
          container
          display="flex"
          direction={smDown ? "column" : "row"}
          justifyContent="center"
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "rgb(243, 192, 32)",
              color: "black",
              width: 200,
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            Finalizar
          </Button>
        </Grid>
        <Toaster />
      </UnForm>
    </>
  );
};

export default Pessoas;
