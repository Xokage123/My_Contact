import * as yup from 'yup';

import { schemaText } from 'const';

import { CONTACT_FIELD } from "api/type";

const contactSchema = yup.object({
  [CONTACT_FIELD.first_name]: yup.string().required(schemaText.required),
  [CONTACT_FIELD.second_name]: yup.string().required(schemaText.required),
  [CONTACT_FIELD.last_name]: yup.string(),
  [CONTACT_FIELD.phone]: yup.string().required(schemaText.required).matches(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g, 'Некорректный номер'),
})

export default contactSchema