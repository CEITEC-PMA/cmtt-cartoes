import {
  Button,
  Divider,
  Grid,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { UnDateTimePicker, UnTextField } from "../../forms";
import * as yup from "yup";
import { IUnFormsErrors, UnForm, useUnForm } from "../../forms";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import imagem from "../../../public/dadosMoto.jpg";
import { cpf, cpf as cpfValidator } from "cpf-cnpj-validator";

const MotoTaxi = () => {
  const navigate = useNavigate();
  const { formRef } = useUnForm();
  const handleSave = (dados: any) => {
    console.log(dados);

    schema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        console.log(dadosValidados);
        toast.success("Cadastro feito com sucesso!");

        const pdf = new jsPDF();

        pdf.addImage(imagem, "JPEG", 0, 0, 210, 310);

        pdf.setFontSize(9);

        //cartao de cima
        pdf.text(`${dadosValidados.name}`, 47, 28);
        pdf.text(`${dadosValidados.inscricao}`, 47, 37);
        pdf.text(`${dadosValidados.emissao}`, 47, 46);

        pdf.text(`${dadosValidados.validade}`, 47, 90);
        pdf.text(`${dadosValidados.modelo}`, 47, 102);
        pdf.text(`${dadosValidados.ponto}`, 47, 113);
        pdf.text(`${dadosValidados.grupoSanguineo}`, 78, 113);
        pdf.text(`${dadosValidados.placa}`, 78, 102);
        pdf.text(`${dadosValidados.matricula}`, 78, 90);
        pdf.text(`${dadosValidados.cnh}`, 14, 90);
        pdf.text(`${dadosValidados.marca}`, 14, 102);
        pdf.text(`${dadosValidados.ano}`, 14, 113);

        //segundo cartao
        pdf.text(`${dadosValidados.name}`, 47, 168);
        pdf.text(`${dadosValidados.inscricao}`, 47, 177);
        pdf.text(`${dadosValidados.emissao}`, 47, 187);

        pdf.text(`${dadosValidados.validade}`, 47, 231);
        pdf.text(`${dadosValidados.grupoSanguineo}`, 78, 231);
        pdf.text(`${dadosValidados.modelo}`, 47, 243);
        pdf.text(`${dadosValidados.placa}`, 78, 243);
        pdf.text(`${dadosValidados.ponto}`, 47, 254);
        pdf.text(`${dadosValidados.ponto}`, 78, 254);
        pdf.text(`${dadosValidados.cnh}`, 14, 231);
        pdf.text(`${dadosValidados.marca}`, 14, 243);
        pdf.text(`${dadosValidados.ano}`, 14, 254);

        pdf.save("mototaxi.pdf");

        setTimeout(() => {
          // navigate("/cadastroponto");
        }, 3000);
      })

      .catch((errors: yup.ValidationError) => {
        const validationErrors: IUnFormsErrors = {};
        toast.error("Precisa validar todos os campos!");
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const schema = yup.object().shape({
    placa: yup.string().required().uppercase(),
    modelo: yup.string().required().uppercase(),
    ano: yup.string().required().uppercase(),
    matricula: yup.string().required().uppercase(),
    ponto: yup.string().required().uppercase(),
    marca: yup.string().required().uppercase(),
    inscricao: yup.string().required().uppercase(),
    name: yup.string().required().uppercase(),
    cnh: yup.string().required().uppercase(),
    grupoSanguineo: yup.string().required().uppercase(),
    validade: yup.string().required().uppercase(),
    emissao: yup.string().required().uppercase(),
  });

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <UnForm ref={formRef} onSubmit={handleSave}>
        <Grid container display="flex" justifyContent="center">
          <Grid item my={2}>
            <Typography variant="h6">Cadastro Moto-Taxi</Typography>
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
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="name" label="Nome Completo" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="grupoSanguineo" label="Grupo Sanguineo" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="modelo" label="Modelo" />
          </Grid>
        </Grid>

        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="validade" label="Validade" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="cnh" label="CNH" />
          </Grid>

          <Grid item mb="1rem">
            <UnTextField name="placa" label="Placa" />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="ano" label="Ano" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="matricula" label="Matricula" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="ponto" label="Ponto" />
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Grid item mb="1rem">
            <UnTextField name="marca" label="Marca" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="inscricao" label="inscricao" />
          </Grid>
          <Grid item mb="1rem">
            <UnDateTimePicker name="emissao" label="Data Emissão" />
          </Grid>
        </Grid>

        <Grid container display="flex" direction="row" justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "rgb(243, 192, 32)",
              color: "black",
              width: 200,
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

export default MotoTaxi;
