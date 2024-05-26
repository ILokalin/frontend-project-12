import * as yup from "yup";
import { FIELD_PASSWORD, FIELD_USERNAME } from "./constants";

export const validationSchema = yup.object().shape({
  [FIELD_USERNAME]: yup.string().required("requiredField"),
  [FIELD_PASSWORD]: yup.string().required("requiredField"),
});
