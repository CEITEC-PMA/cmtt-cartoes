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
import imagem from "../../../public/dadosTaxi.jpg";
import { cpf, cpf as cpfValidator } from "cpf-cnpj-validator";

const Taxi = () => {
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

        pdf.setFontSize(10);

        //PARTE DE CIMA DOS CARTOES

        pdf.text(`${dadosValidados.marca}`, 55, 38);
        pdf.text(`${dadosValidados.modelo}`, 55, 48);
        pdf.text(`${dadosValidados.cpf}`, 55, 58);
        pdf.text(`${dadosValidados.rg}`, 55, 68);
        pdf.text(`${dadosValidados.ponto}`, 100, 39);
        pdf.text(`${dadosValidados.chassi}`, 100, 48);
        pdf.text(`${dadosValidados.ano}`, 100, 58);
        pdf.text(`${dadosValidados.orgao}`, 100, 67);
        pdf.text(`${dadosValidados.matricula}`, 145, 39);
        pdf.text(`${dadosValidados.placa}`, 145, 48);
        pdf.text(`${dadosValidados.validade}`, 145, 58);
        pdf.text(`${dadosValidados.dataexpedicao}`, 135, 67);
        pdf.text(`${dadosValidados.endereco}`, 73, 27);
        pdf.text(`${dadosValidados.name}`, 80, 22);

        // PARTE D0 MEIO DOS CARTOES
        //primeiro
        pdf.text(`${dadosValidados.placa}`, 76, 145);
        pdf.text(`${dadosValidados.cor}`, 76, 154);
        pdf.text(`${dadosValidados.matricula}`, 76, 161);
        pdf.text(`${dadosValidados.modelo}`, 38, 145);
        pdf.text(`${dadosValidados.marca}`, 38, 154);
        pdf.text(`${dadosValidados.chassi}`, 38, 162);
        pdf.text(`${dadosValidados.ano}`, 38, 170);
        //segundo
        pdf.text(`${dadosValidados.placa}`, 180, 148);
        pdf.text(`${dadosValidados.cor}`, 179, 156);
        pdf.text(`${dadosValidados.modelo}`, 140, 148);
        pdf.text(`${dadosValidados.marca}`, 140, 157);
        pdf.text(`${dadosValidados.chassi}`, 140, 164);
        pdf.text(`${dadosValidados.ano}`, 140, 172);
        pdf.text(`${dadosValidados.matricula}`, 180, 166);

        //DOIS CARTOES DE BAIXO
        //primeiro
        pdf.setFontSize(8);
        pdf.text(`${dadosValidados.cnh}`, 36, 219);
        pdf.text(`${dadosValidados.cpf}`, 36, 226);
        pdf.text(`${dadosValidados.rg}`, 36, 235);
        pdf.text(`${dadosValidados.name}`, 36, 242);
        //segundo
        pdf.text(`${dadosValidados.matricula}`, 140, 218);
        pdf.text(`${dadosValidados.ponto}`, 140, 239);

        pdf.save("veiculos.pdf");

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
    rg: yup.string().required().uppercase(),
    cpf: yup
      .string()
      .min(11, "Precisa ter pelo menos 11 caracteres")
      .required()
      .transform((value) => {
        if (!value) return value;
        return cpf.format(value);
      }),
    modelo: yup.string().required().uppercase(),
    chassi: yup.string().required().uppercase(),
    ano: yup.string().required().uppercase(),
    matricula: yup.string().required().uppercase(),
    ponto: yup.string().required().uppercase(),
    marca: yup.string().required().uppercase(),
    orgao: yup.string().required().uppercase(),
    validade: yup.string().required().uppercase(),
    dataexpedicao: yup.string().required().uppercase(),
    name: yup.string().required().uppercase(),
    cor: yup.string().required().uppercase(),
    endereco: yup.string().required().uppercase(),
    cnh: yup.string().required().uppercase(),
  });

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <UnForm ref={formRef} onSubmit={handleSave}>
        <Grid container display="flex" justifyContent="center">
          <Grid item my={2}>
            <Typography variant="h6">Cadastro Taxistas</Typography>
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
            <UnTextField name="cpf" label="CPF" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="rg" label="RG" />
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
            <UnTextField name="endereco" label="Endereço" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="modelo" label="Modelo" />
          </Grid>

          <Grid item mb="1rem">
            <UnTextField name="marca" label="Marca" />
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
            <UnTextField name="cor" label="Cor" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="placa" label="Placa" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="chassi" label="Chassi" />
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
            <UnTextField name="orgao" label="ORG. Expedidor" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="validade" label="Validade" />
          </Grid>
          <Grid item mb="1rem">
            <UnTextField name="cnh" label="CNH" />
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
            <UnDateTimePicker name="dataexpedicao" label="Data Expedição" />
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
            Cadastrar
          </Button>
        </Grid>
        <Toaster />
      </UnForm>
    </>
  );
};

export default Taxi;
