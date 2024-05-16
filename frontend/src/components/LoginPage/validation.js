import * as yup from "yup";
import { PASSWORD_FIELD, USERNAME_FIELD } from "./constants";

export const validationSchema = yup.object().shape({
  [USERNAME_FIELD]: yup.string().required("requiredField"),
  [PASSWORD_FIELD]: yup.string().required("requiredField"),
});
