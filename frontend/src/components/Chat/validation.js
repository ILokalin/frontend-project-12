import * as yup from "yup";
import { MESSAGE_FIELD } from "./constants";

export const validationSchema = yup.object().shape({
  [MESSAGE_FIELD]: yup.string().trim().required("requiredField"),
});
